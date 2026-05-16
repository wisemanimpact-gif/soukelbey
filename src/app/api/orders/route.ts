import { NextRequest, NextResponse } from 'next/server'
import { menuItems } from '@/lib/menu'

// Build a quick lookup so we can tag each Stripe line with [PLAT] / [SANDWICH]
// — that way the kitchen sees the prep type at a glance in the Stripe receipt,
// the confirmation email and the dashboard.
const itemTypeById = new Map(menuItems.map(m => [m.id, m.category]))
const tagFor = (itemId: string): string => {
  const cat = itemTypeById.get(itemId)
  if (cat === 'plats') return '[PLAT] '
  if (cat === 'sandwichs') return '[SANDWICH] '
  return ''
}

// ─── Stripe Checkout Session ─────────────────────────────────
// Receives the cart + customer info from /commander, creates a
// Stripe Checkout Session, and returns the hosted-checkout URL.
//
// Required env vars (see .env.local.example):
//   STRIPE_SECRET_KEY
//   NEXT_PUBLIC_SITE_URL
//
// NOTE: Next.js `output: 'export'` strips API routes from the
// static build output. To run this endpoint in production you
// need a Node.js runtime (e.g. WCH Node.js app, Vercel, Netlify
// functions, or a small Express proxy). The static front-end
// posts to `/api/orders` — point that path to your Node host.

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// Quebec sales tax — matches the rates shown to the customer
const TPS_RATE = 0.05
const TVQ_RATE = 0.09975
const round2 = (n: number) => Math.round(n * 100) / 100

type Line = {
  itemId: string
  name: string
  size?: string
  unitPrice: number
  qty: number
}

type Payload = {
  lines: Line[]
  customer: { name: string; email: string; phone: string }
  pickup: { date: string; time: string }
  note?: string
  totals?: { subtotal: number; tps: number; tvq: number; total: number }
  lang?: 'fr' | 'en'
}

function isValid(payload: unknown): payload is Payload {
  if (!payload || typeof payload !== 'object') return false
  const p = payload as Payload
  if (!Array.isArray(p.lines) || p.lines.length === 0) return false
  for (const l of p.lines) {
    if (
      typeof l.itemId !== 'string' ||
      typeof l.name !== 'string' ||
      typeof l.unitPrice !== 'number' ||
      l.unitPrice <= 0 ||
      typeof l.qty !== 'number' ||
      l.qty <= 0 ||
      l.qty > 99
    ) {
      return false
    }
  }
  if (
    !p.customer ||
    !p.customer.name?.trim() ||
    !p.customer.email?.trim() ||
    !p.customer.phone?.trim()
  ) return false
  if (!p.pickup?.date || !p.pickup?.time) return false
  return true
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    if (!isValid(body)) {
      return NextResponse.json(
        { error: 'Invalid order payload' },
        { status: 400 },
      )
    }

    const { lines, customer, pickup, note, lang } = body

    const secretKey = process.env.STRIPE_SECRET_KEY
    if (!secretKey) {
      console.error('Missing STRIPE_SECRET_KEY')
      return NextResponse.json(
        { error: 'Stripe is not configured on the server.' },
        { status: 500 },
      )
    }

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
      req.headers.get('origin') ||
      'http://localhost:3000'

    // Recompute totals server-side so the customer can never tamper with prices
    const subtotal = round2(lines.reduce((s, l) => s + l.unitPrice * l.qty, 0))
    const tps = round2(subtotal * TPS_RATE)
    const tvq = round2(subtotal * TVQ_RATE)

    // Dynamic import — only loads on the server, doesn't break static export
    const Stripe = (await import('stripe')).default
    const stripe = new Stripe(secretKey, { apiVersion: '2025-02-24.acacia' })

    // Build line items in cents — tag plats / sandwichs so Dave can tell
    // at a glance what kind of prep each line needs.
    const lineItems = lines.map(l => {
      const tag = tagFor(l.itemId)
      const displayName = l.size ? `${l.name} (${l.size})` : l.name
      return {
        quantity: l.qty,
        price_data: {
          currency: 'cad',
          unit_amount: Math.round(l.unitPrice * 100),
          product_data: {
            name: `${tag}${displayName}`,
            metadata: {
              itemId: l.itemId,
              size: l.size ?? '',
              type: itemTypeById.get(l.itemId) ?? '',
            },
          },
        },
      }
    })

    // Add the two Quebec taxes as separate line items
    if (tps > 0) {
      lineItems.push({
        quantity: 1,
        price_data: {
          currency: 'cad',
          unit_amount: Math.round(tps * 100),
          product_data: {
            name: lang === 'en' ? 'GST (5%)' : 'TPS (5%)',
            metadata: { itemId: 'tax-tps', size: '', type: '' },
          },
        },
      })
    }
    if (tvq > 0) {
      lineItems.push({
        quantity: 1,
        price_data: {
          currency: 'cad',
          unit_amount: Math.round(tvq * 100),
          product_data: {
            name: lang === 'en' ? 'QST (9.975%)' : 'TVQ (9.975%)',
            metadata: { itemId: 'tax-tvq', size: '', type: '' },
          },
        },
      })
    }

    // Compact summary for SMS / email — Stripe metadata values capped at 500 chars
    const itemSummary = lines
      .map(l => {
        const tag = tagFor(l.itemId)
        const label = l.size ? `${l.name} (${l.size})` : l.name
        return `${l.qty}× ${tag}${label}`
      })
      .join(' | ')
      .slice(0, 480)

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      // Apple Pay & Google Pay are auto-enabled when 'card' is present
      // (provided your Stripe account + domain are configured).
      payment_method_types: ['card'],
      line_items: lineItems,
      customer_email: customer.email,
      // Match locale to the page the user came from
      locale: lang === 'en' ? 'en' : 'fr-CA',
      success_url: `${siteUrl}/commander/?success=1&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/commander/?canceled=1`,
      metadata: {
        customerName: customer.name,
        customerPhone: customer.phone,
        customerEmail: customer.email,
        pickupDate: pickup.date,
        pickupTime: pickup.time,
        note: (note ?? '').slice(0, 480),
        items: itemSummary,
        lang: lang ?? 'fr',
      },
    })

    return NextResponse.json({ url: session.url, sessionId: session.id })
  } catch (err) {
    console.error('Orders API error:', err)
    return NextResponse.json(
      { error: 'Server error creating checkout session.' },
      { status: 500 },
    )
  }
}
