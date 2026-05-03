import { NextRequest, NextResponse } from 'next/server'

// ─── Stripe Webhook Handler ──────────────────────────────────
// Stripe POSTs `checkout.session.completed` here when a payment
// is confirmed.  We:
//   1. Verify the signature  (rejects forged calls)
//   2. Send a confirmation EMAIL to the customer (nodemailer)
//   3. Send an SMS to the restaurant via Twilio
//      → Skipped silently if any TWILIO_* env var is missing
//
// Required env vars (see .env.local.example):
//   STRIPE_SECRET_KEY
//   STRIPE_WEBHOOK_SECRET
//   EMAIL_USER, EMAIL_PASS, EMAIL_TO
//   TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN,
//   TWILIO_PHONE_NUMBER, RESTAURANT_PHONE  (all optional)
//
// Webhook URL to register in Stripe Dashboard:
//   POST  https://<your-host>/api/webhook/stripe
//   Event: checkout.session.completed
//
// IMPORTANT: This route reads the raw request body for signature
// verification, so it MUST run on the Node.js runtime (not Edge)
// and MUST NOT be statically prerendered.

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

type OrderMetadata = {
  customerName?: string
  customerPhone?: string
  customerEmail?: string
  pickupDate?: string
  pickupTime?: string
  note?: string
  items?: string
  lang?: string
}

export async function POST(req: NextRequest) {
  const secretKey = process.env.STRIPE_SECRET_KEY
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!secretKey || !webhookSecret) {
    console.error('Stripe webhook: missing STRIPE_SECRET_KEY or STRIPE_WEBHOOK_SECRET')
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 })
  }

  const sig = req.headers.get('stripe-signature')
  if (!sig) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 })
  }

  // Read RAW body — required for signature verification
  const rawBody = await req.text()

  let event: import('stripe').Stripe.Event
  try {
    const Stripe = (await import('stripe')).default
    const stripe = new Stripe(secretKey, { apiVersion: '2025-02-24.acacia' })
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret)
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'unknown'
    console.error('Stripe webhook signature verification failed:', msg)
    return NextResponse.json({ error: `Webhook signature error: ${msg}` }, { status: 400 })
  }

  // We only care about a successfully completed checkout
  if (event.type !== 'checkout.session.completed') {
    return NextResponse.json({ received: true, ignored: event.type })
  }

  const session = event.data.object as import('stripe').Stripe.Checkout.Session
  const meta = (session.metadata ?? {}) as OrderMetadata

  const totalCents = session.amount_total ?? 0
  const totalStr = `$${(totalCents / 100).toFixed(2)} ${(session.currency ?? 'cad').toUpperCase()}`
  const lang = (meta.lang === 'en' ? 'en' : 'fr') as 'fr' | 'en'

  // Run notifications in parallel; never let one failure block the other
  await Promise.allSettled([
    sendCustomerEmail({ session, meta, totalStr, lang }),
    sendRestaurantSms({ meta, totalStr }),
  ])

  return NextResponse.json({ received: true })
}

// ─── EMAIL (nodemailer) ──────────────────────────────────────
async function sendCustomerEmail({
  session,
  meta,
  totalStr,
  lang,
}: {
  session: import('stripe').Stripe.Checkout.Session
  meta: OrderMetadata
  totalStr: string
  lang: 'fr' | 'en'
}) {
  const { EMAIL_USER, EMAIL_PASS, EMAIL_TO } = process.env
  if (!EMAIL_USER || !EMAIL_PASS) {
    console.log('📧 Email skipped (no EMAIL_USER / EMAIL_PASS set).')
    return
  }

  const customerEmail = meta.customerEmail || session.customer_details?.email
  if (!customerEmail) {
    console.log('📧 Email skipped (no customer email).')
    return
  }

  const restaurantTo = EMAIL_TO || 'soukelbey2montagnes@gmail.com'

  const itemsBlock = (meta.items ?? '').split(' | ').filter(Boolean).join('\n  • ')
  const pickup = `${meta.pickupDate ?? '?'} @ ${meta.pickupTime ?? '?'}`

  const subject =
    lang === 'en'
      ? `Souk El Bey — Order confirmed (#${session.id.slice(-8)})`
      : `Souk El Bey — Commande confirmée (n° ${session.id.slice(-8)})`

  const customerBody =
    lang === 'en'
      ? `Hi ${meta.customerName ?? ''},

Thank you for your order at Souk El Bey!

Pickup:    ${pickup}
Total:     ${totalStr}

Your items:
  • ${itemsBlock || '(see Stripe receipt)'}

${meta.note ? `Note: ${meta.note}\n\n` : ''}Please come to 1910 chemin d'Oka, Deux-Montagnes (QC) at the time above.
If you have any question, call us at +1 514-916-2478.

— Souk El Bey
soukelbey.ca`
      : `Bonjour ${meta.customerName ?? ''},

Merci pour votre commande chez Souk El Bey !

Cueillette : ${pickup}
Total      : ${totalStr}

Vos articles :
  • ${itemsBlock || '(voir reçu Stripe)'}

${meta.note ? `Note : ${meta.note}\n\n` : ''}Présentez-vous au 1910 chemin d'Oka, Deux-Montagnes (QC) à l'heure indiquée.
Pour toute question, appelez-nous au +1 514-916-2478.

— Souk El Bey
soukelbey.ca`

  // BCC the restaurant on every order
  const restaurantBody = `🧆 NOUVELLE COMMANDE PAYÉE — SOUK EL BEY
=====================================
Client    : ${meta.customerName ?? '—'}
Tél       : ${meta.customerPhone ?? '—'}
Courriel  : ${customerEmail}
Cueillette: ${pickup}
Total     : ${totalStr}
Stripe ID : ${session.id}

Articles :
  • ${itemsBlock || '(voir reçu Stripe)'}

${meta.note ? `Note : ${meta.note}` : ''}
=====================================`

  try {
    const nodemailer = await import('nodemailer')
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: EMAIL_USER, pass: EMAIL_PASS },
    })

    await Promise.all([
      transporter.sendMail({
        from: EMAIL_USER,
        to: customerEmail,
        subject,
        text: customerBody,
      }),
      transporter.sendMail({
        from: EMAIL_USER,
        to: restaurantTo,
        subject: `🧆 Commande payée — ${meta.customerName ?? ''} (${totalStr})`,
        text: restaurantBody,
      }),
    ])
  } catch (err) {
    console.error('Email sending failed:', err)
  }
}

// ─── SMS (Twilio) ────────────────────────────────────────────
async function sendRestaurantSms({
  meta,
  totalStr,
}: {
  meta: OrderMetadata
  totalStr: string
}) {
  const {
    TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN,
    TWILIO_PHONE_NUMBER,
    RESTAURANT_PHONE,
  } = process.env

  // Restaurant number defaults to the one in the spec
  const toNumber = RESTAURANT_PHONE || '+15149162478'

  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_PHONE_NUMBER) {
    console.log('📱 SMS skipped (Twilio env vars missing).')
    return
  }

  const itemsLine = (meta.items ?? '').replace(/ \| /g, ', ')

  const body =
    `🧆 Souk El Bey — nouvelle commande\n` +
    `${meta.customerName ?? ''} · ${meta.customerPhone ?? ''}\n` +
    `Cueillette: ${meta.pickupDate ?? '?'} @ ${meta.pickupTime ?? '?'}\n` +
    `Total: ${totalStr}\n` +
    `${itemsLine ? itemsLine.slice(0, 600) : ''}` +
    `${meta.note ? `\nNote: ${meta.note}` : ''}`

  try {
    const twilioMod = await import('twilio')
    const client = twilioMod.default(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
    await client.messages.create({
      from: TWILIO_PHONE_NUMBER,
      to: toNumber,
      body,
    })
  } catch (err) {
    console.error('Twilio SMS failed:', err)
  }
}
