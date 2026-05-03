'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import Link from 'next/link'
import { menuItems, categories, type MenuItem } from '@/lib/menu'
import { useLanguage } from '@/lib/LanguageContext'

// ─── TAX CONSTANTS (Quebec) ──────────────────────────────────
const TPS_RATE = 0.05      // GST
const TVQ_RATE = 0.09975   // QST

// ─── TYPES ───────────────────────────────────────────────────
type CartLine = {
  key: string          // unique per line  (item.id + size)
  itemId: string
  nameFr: string
  nameEn: string
  size?: string
  unitPrice: number
  qty: number
}

type CheckoutPayload = {
  lines: Array<{
    itemId: string
    name: string
    size?: string
    unitPrice: number
    qty: number
  }>
  customer: {
    name: string
    email: string
    phone: string
  }
  pickup: {
    date: string         // YYYY-MM-DD
    time: string         // HH:mm
  }
  note?: string
  totals: {
    subtotal: number
    tps: number
    tvq: number
    total: number
  }
  lang: 'fr' | 'en'
}

// ─── HELPERS ────────────────────────────────────────────────
function generateTimeSlots(): string[] {
  // 10:00 → 19:00 inclusive, every 30 min
  const slots: string[] = []
  for (let h = 10; h <= 19; h++) {
    slots.push(`${String(h).padStart(2, '0')}:00`)
    if (h < 19) slots.push(`${String(h).padStart(2, '0')}:30`)
  }
  return slots
}

function todayISO(): string {
  const d = new Date()
  // Local date (not UTC) to avoid timezone shift
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const round2 = (n: number) => Math.round(n * 100) / 100

// Restaurant categories only (everything currently in menu.ts is restaurant)
const RESTAURANT_CATEGORIES = categories.map(c => c.key)

// ─── PAGE ───────────────────────────────────────────────────
export default function CommanderPage() {
  const { lang, t } = useLanguage()

  // Detect success / cancel return from Stripe
  const [returnState, setReturnState] = useState<'idle' | 'success' | 'canceled'>('idle')
  const [returnSessionId, setReturnSessionId] = useState<string | null>(null)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    if (params.get('success') === '1') {
      setReturnState('success')
      setReturnSessionId(params.get('session_id'))
    } else if (params.get('canceled') === '1') {
      setReturnState('canceled')
    }
  }, [])

  // Active category tab
  const [activeCategory, setActiveCategory] = useState<string>(RESTAURANT_CATEGORIES[0])
  const visibleItems = useMemo(
    () => menuItems.filter(i => i.category === activeCategory),
    [activeCategory],
  )

  // Cart
  const [cart, setCart] = useState<CartLine[]>([])
  const [showMobileCart, setShowMobileCart] = useState(false)

  const addToCart = useCallback((item: MenuItem, size?: { label: string; price: number }) => {
    const unitPrice = size ? size.price : item.price
    const key = size ? `${item.id}::${size.label}` : item.id
    setCart(prev => {
      const existing = prev.find(l => l.key === key)
      if (existing) {
        return prev.map(l => (l.key === key ? { ...l, qty: l.qty + 1 } : l))
      }
      return [
        ...prev,
        {
          key,
          itemId: item.id,
          nameFr: item.name.fr,
          nameEn: item.name.en,
          size: size?.label,
          unitPrice,
          qty: 1,
        },
      ]
    })
  }, [])

  const updateQty = useCallback((key: string, delta: number) => {
    setCart(prev =>
      prev
        .map(l => (l.key === key ? { ...l, qty: l.qty + delta } : l))
        .filter(l => l.qty > 0),
    )
  }, [])

  const removeLine = useCallback((key: string) => {
    setCart(prev => prev.filter(l => l.key !== key))
  }, [])

  // Totals
  const subtotal = useMemo(
    () => round2(cart.reduce((s, l) => s + l.unitPrice * l.qty, 0)),
    [cart],
  )
  const tps = round2(subtotal * TPS_RATE)
  const tvq = round2(subtotal * TVQ_RATE)
  const total = round2(subtotal + tps + tvq)

  // Customer form + pickup
  const [customer, setCustomer] = useState({ name: '', email: '', phone: '' })
  const [pickup, setPickup] = useState({
    date: todayISO(),
    time: '12:00',
  })
  const [note, setNote] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const timeSlots = useMemo(generateTimeSlots, [])
  const minDate = todayISO()

  const canSubmit =
    cart.length > 0 &&
    customer.name.trim() &&
    customer.email.trim() &&
    customer.phone.trim() &&
    pickup.date &&
    pickup.time &&
    !submitting

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return
    setSubmitError(null)
    setSubmitting(true)

    const payload: CheckoutPayload = {
      lines: cart.map(l => ({
        itemId: l.itemId,
        name: lang === 'en' ? l.nameEn : l.nameFr,
        size: l.size,
        unitPrice: l.unitPrice,
        qty: l.qty,
      })),
      customer: {
        name: customer.name.trim(),
        email: customer.email.trim(),
        phone: customer.phone.trim(),
      },
      pickup,
      note: note.trim() || undefined,
      totals: { subtotal, tps, tvq, total },
      lang,
    }

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok || !data.url) {
        throw new Error(data.error || 'Stripe session error')
      }
      // Redirect to Stripe Checkout
      window.location.href = data.url as string
    } catch (err) {
      console.error(err)
      setSubmitError(
        t(
          'Le paiement n’a pas pu démarrer. Veuillez réessayer ou nous appeler au 514-916-2478.',
          'Payment could not start. Please try again or call us at 514-916-2478.',
        ),
      )
      setSubmitting(false)
    }
  }

  // ─── SUCCESS VIEW ─────────────────────────────────────────
  if (returnState === 'success') {
    return (
      <div className="min-h-screen pt-24 px-[5vw] flex items-center justify-center bg-[#FAFAF8]">
        <div className="max-w-xl w-full bg-white border border-black/8 rounded-sm p-10 text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center text-3xl">
            ✓
          </div>
          <h1 className="font-syne text-3xl sm:text-4xl font-extrabold text-[#0F0A06] tracking-tight mb-3">
            {t('Commande confirmée !', 'Order confirmed!')}
          </h1>
          <p className="text-[14px] text-[#4A3828] font-light leading-[1.7] font-inter mb-2">
            {t(
              'Votre paiement a été reçu et votre commande est transmise à la cuisine.',
              'Your payment was received and your order has been sent to the kitchen.',
            )}
          </p>
          <p className="text-[13px] text-[#9A8878] font-light font-inter mb-8">
            {t(
              'Un courriel de confirmation vient d’être envoyé. Présentez-vous à l’heure de cueillette choisie.',
              'A confirmation email has just been sent. Please come at your chosen pickup time.',
            )}
          </p>
          {returnSessionId && (
            <p className="text-[10px] tracking-[0.12em] uppercase text-[#9A8878] font-inter mb-8">
              {t('N° de commande', 'Order #')}: {returnSessionId.slice(-10)}
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-block bg-[#0F0A06] text-white px-7 py-3 text-[11px] tracking-[0.1em] uppercase font-medium font-inter rounded-sm hover:bg-[#C41E1E] transition-colors no-underline"
            >
              {t('Retour à l’accueil', 'Back to home')}
            </Link>
            <Link
              href="/commander"
              className="inline-block bg-white border border-black/15 text-[#0F0A06] px-7 py-3 text-[11px] tracking-[0.1em] uppercase font-medium font-inter rounded-sm hover:border-[#C41E1E] hover:text-[#C41E1E] transition-colors no-underline"
            >
              {t('Nouvelle commande', 'New order')}
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // ─── MAIN ORDER VIEW ──────────────────────────────────────
  const cartCount = cart.reduce((s, l) => s + l.qty, 0)

  return (
    <div className="min-h-screen pt-20 bg-[#FAFAF8]">
      {/* ── HEADER ── */}
      <section className="bg-[#0F0A06] px-[5vw] pt-14 pb-12">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-7 h-px bg-[#C4931A]" />
          <span className="text-[10px] tracking-[0.2em] uppercase text-white/45 font-inter">
            {t('Commande à emporter', 'Takeout order')}
          </span>
        </div>
        <h1 className="font-syne text-[clamp(38px,6vw,72px)] text-white leading-[0.95] font-extrabold tracking-[-0.03em] mb-3">
          {t(
            <>
              Commandez en{' '}
              <em className="font-normal text-[#C4931A]">ligne.</em>
            </>,
            <>
              Order <em className="font-normal text-[#C4931A]">online.</em>
            </>,
          )}
        </h1>
        <p className="text-[14px] sm:text-[15px] text-white/55 font-light font-inter max-w-xl">
          {t(
            'Choisissez vos plats, payez en toute sécurité, et venez chercher votre commande à l’heure qui vous convient.',
            'Pick your dishes, pay securely, and come to pick up your order at the time that suits you.',
          )}
        </p>

        {returnState === 'canceled' && (
          <div className="mt-6 inline-block bg-[#C41E1E]/15 border border-[#C41E1E]/30 text-white px-5 py-3 rounded-sm text-[12px] font-inter">
            {t(
              'Le paiement a été annulé. Votre panier est encore là — vous pouvez réessayer.',
              'The payment was canceled. Your cart is still here — you can try again.',
            )}
          </div>
        )}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_400px]">
        {/* ── MENU COLUMN ── */}
        <div className="px-[5vw] lg:pl-[5vw] lg:pr-8 py-12">
          <div className="flex items-center justify-between gap-4 mb-6">
            <h2 className="font-syne text-2xl sm:text-3xl font-extrabold text-[#0F0A06] tracking-tight">
              {t('Notre menu', 'Our menu')}
            </h2>
            {/* Mobile cart toggle */}
            <button
              type="button"
              onClick={() => setShowMobileCart(true)}
              className="lg:hidden relative bg-[#C41E1E] text-white px-4 py-2 rounded-sm text-[11px] tracking-[0.08em] uppercase font-medium font-inter"
            >
              {t('Panier', 'Cart')}
              {cartCount > 0 && (
                <span className="ml-2 inline-flex items-center justify-center min-w-[20px] h-5 px-1 rounded-full bg-white text-[#C41E1E] text-[11px] font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Category tabs */}
          <div className="flex gap-1 mb-8 border-b border-black/8 overflow-x-auto -mx-[5vw] px-[5vw] lg:mx-0 lg:px-0">
            {categories.map(cat => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4 sm:px-5 py-3 text-[11px] tracking-[0.08em] uppercase font-medium font-inter transition-all rounded-t-sm border-b-2 -mb-px cursor-pointer whitespace-nowrap ${
                  activeCategory === cat.key
                    ? 'text-[#C41E1E] border-[#C41E1E] bg-white'
                    : 'text-[#9A8878] border-transparent hover:text-[#0F0A06] hover:border-black/20'
                }`}
              >
                {cat.label[lang]}
              </button>
            ))}
          </div>

          {/* Items grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {visibleItems.map(item => (
              <MenuCard
                key={item.id}
                item={item}
                lang={lang}
                onAdd={addToCart}
                cart={cart}
                onUpdateQty={updateQty}
              />
            ))}
          </div>
        </div>

        {/* ── CART SIDEBAR (desktop) ── */}
        <aside className="hidden lg:block bg-white border-l border-black/8 px-7 py-12 sticky top-16 self-start max-h-[calc(100vh-4rem)] overflow-y-auto">
          <CartPanel
            lang={lang}
            t={t}
            cart={cart}
            subtotal={subtotal}
            tps={tps}
            tvq={tvq}
            total={total}
            onUpdateQty={updateQty}
            onRemove={removeLine}
            customer={customer}
            setCustomer={setCustomer}
            pickup={pickup}
            setPickup={setPickup}
            note={note}
            setNote={setNote}
            timeSlots={timeSlots}
            minDate={minDate}
            submitting={submitting}
            submitError={submitError}
            canSubmit={Boolean(canSubmit)}
            onSubmit={handleSubmit}
          />
        </aside>
      </div>

      {/* ── MOBILE CART OVERLAY ── */}
      {showMobileCart && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/40 flex justify-end" onClick={() => setShowMobileCart(false)}>
          <div
            className="bg-white w-full max-w-md h-full overflow-y-auto px-6 py-6 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-syne text-xl font-bold text-[#0F0A06]">
                {t('Votre panier', 'Your cart')}
              </h3>
              <button
                type="button"
                onClick={() => setShowMobileCart(false)}
                className="text-[#9A8878] text-2xl leading-none"
                aria-label={t('Fermer', 'Close')}
              >
                ×
              </button>
            </div>
            <CartPanel
              lang={lang}
              t={t}
              cart={cart}
              subtotal={subtotal}
              tps={tps}
              tvq={tvq}
              total={total}
              onUpdateQty={updateQty}
              onRemove={removeLine}
              customer={customer}
              setCustomer={setCustomer}
              pickup={pickup}
              setPickup={setPickup}
              note={note}
              setNote={setNote}
              timeSlots={timeSlots}
              minDate={minDate}
              submitting={submitting}
              submitError={submitError}
              canSubmit={Boolean(canSubmit)}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      )}
    </div>
  )
}

// ─── MENU CARD ─────────────────────────────────────────────
function MenuCard({
  item,
  lang,
  onAdd,
  cart,
  onUpdateQty,
}: {
  item: MenuItem
  lang: 'fr' | 'en'
  onAdd: (item: MenuItem, size?: { label: string; price: number }) => void
  cart: CartLine[]
  onUpdateQty: (key: string, delta: number) => void
}) {
  // For sized items, render a row per size with its own +/- control.
  // For simple items, render a single +/- control.
  const lines = item.sizes
    ? item.sizes.map(s => ({
        key: `${item.id}::${s.label}`,
        label: s.label,
        price: s.price,
        size: s,
      }))
    : [{ key: item.id, label: '', price: item.price, size: undefined as undefined | { label: string; price: number } }]

  return (
    <div className="bg-white border border-black/8 rounded-sm p-5 flex flex-col">
      <div className="flex justify-between items-start gap-3 mb-1">
        <div className="min-w-0">
          <h3 className="font-syne text-[16px] font-bold text-[#0F0A06] tracking-[-0.01em] leading-snug">
            {item.name[lang]}
          </h3>
          <p className="text-[10px] tracking-[0.1em] uppercase text-[#9A8878] font-inter mt-1">
            {lang === 'fr' ? item.name.en : item.name.fr}
          </p>
        </div>
        {item.badge && (
          <span className="flex-shrink-0 text-[9px] tracking-[0.12em] uppercase text-[#C41E1E] border border-[#C41E1E]/25 px-2 py-0.5 rounded-sm font-inter">
            {item.badge[lang]}
          </span>
        )}
      </div>

      <p className="text-[13px] text-[#4A3828] leading-[1.6] font-light font-inter my-3">
        {item.description[lang]}
      </p>

      <div className="mt-auto flex flex-col gap-2 pt-2 border-t border-black/8">
        {lines.map(line => {
          const cartLine = cart.find(l => l.key === line.key)
          const qty = cartLine?.qty ?? 0
          return (
            <div key={line.key} className="flex items-center justify-between gap-3">
              <div className="flex items-baseline gap-2">
                {line.label && (
                  <span className="text-[10px] tracking-[0.08em] uppercase text-[#9A8878] font-inter font-medium">
                    {line.label}
                  </span>
                )}
                <span className="font-syne text-[16px] font-extrabold text-[#C41E1E] tracking-[-0.02em]">
                  ${line.price.toFixed(2)}
                </span>
              </div>
              {qty === 0 ? (
                <button
                  type="button"
                  onClick={() => onAdd(item, line.size)}
                  className="bg-[#0F0A06] text-white px-4 py-1.5 text-[11px] tracking-[0.08em] uppercase font-medium font-inter rounded-sm hover:bg-[#C41E1E] transition-colors"
                >
                  +
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onUpdateQty(line.key, -1)}
                    className="w-7 h-7 flex items-center justify-center bg-white border border-black/15 text-[#0F0A06] rounded-sm hover:border-[#C41E1E] hover:text-[#C41E1E] transition-colors"
                    aria-label="−"
                  >
                    −
                  </button>
                  <span className="font-inter font-medium text-[13px] text-[#0F0A06] min-w-[18px] text-center">
                    {qty}
                  </span>
                  <button
                    type="button"
                    onClick={() => onUpdateQty(line.key, 1)}
                    className="w-7 h-7 flex items-center justify-center bg-[#C41E1E] text-white rounded-sm hover:bg-[#A81818] transition-colors"
                    aria-label="+"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── CART PANEL ────────────────────────────────────────────
function CartPanel({
  lang,
  t,
  cart,
  subtotal,
  tps,
  tvq,
  total,
  onUpdateQty,
  onRemove,
  customer,
  setCustomer,
  pickup,
  setPickup,
  note,
  setNote,
  timeSlots,
  minDate,
  submitting,
  submitError,
  canSubmit,
  onSubmit,
}: {
  lang: 'fr' | 'en'
  t: <T>(fr: T, en: T) => T
  cart: CartLine[]
  subtotal: number
  tps: number
  tvq: number
  total: number
  onUpdateQty: (key: string, delta: number) => void
  onRemove: (key: string) => void
  customer: { name: string; email: string; phone: string }
  setCustomer: React.Dispatch<React.SetStateAction<{ name: string; email: string; phone: string }>>
  pickup: { date: string; time: string }
  setPickup: React.Dispatch<React.SetStateAction<{ date: string; time: string }>>
  note: string
  setNote: (v: string) => void
  timeSlots: string[]
  minDate: string
  submitting: boolean
  submitError: string | null
  canSubmit: boolean
  onSubmit: (e: React.FormEvent) => void
}) {
  const inputCls =
    'w-full px-3.5 py-2.5 border border-black/12 rounded-sm bg-white text-[14px] text-[#0F0A06] font-light font-inter focus:outline-none focus:border-[#C41E1E] focus:ring-2 focus:ring-[#C41E1E]/8 transition-all'
  const labelCls = 'block text-[9px] tracking-[0.16em] uppercase text-[#9A8878] mb-1.5 font-medium font-inter'

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-7">
      {/* ── ITEMS ── */}
      <div>
        <h3 className="font-syne text-xl font-bold text-[#0F0A06] mb-4">
          {t('Votre panier', 'Your cart')}
        </h3>
        {cart.length === 0 ? (
          <p className="text-[13px] text-[#9A8878] font-light font-inter italic">
            {t('Votre panier est vide.', 'Your cart is empty.')}
          </p>
        ) : (
          <ul className="flex flex-col divide-y divide-black/8">
            {cart.map(l => (
              <li key={l.key} className="py-3 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[13px] font-medium text-[#0F0A06] font-inter leading-tight">
                    {lang === 'en' ? l.nameEn : l.nameFr}
                    {l.size && (
                      <span className="ml-1.5 text-[10px] tracking-[0.08em] uppercase text-[#9A8878] font-medium">
                        {l.size}
                      </span>
                    )}
                  </p>
                  <p className="text-[11px] text-[#9A8878] font-inter mt-0.5">
                    ${l.unitPrice.toFixed(2)} × {l.qty}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => onUpdateQty(l.key, -1)}
                    className="w-6 h-6 flex items-center justify-center bg-white border border-black/15 text-[#0F0A06] rounded-sm text-[13px] hover:border-[#C41E1E]"
                    aria-label="−"
                  >
                    −
                  </button>
                  <span className="font-inter text-[12px] min-w-[18px] text-center text-[#0F0A06]">
                    {l.qty}
                  </span>
                  <button
                    type="button"
                    onClick={() => onUpdateQty(l.key, 1)}
                    className="w-6 h-6 flex items-center justify-center bg-[#C41E1E] text-white rounded-sm text-[13px] hover:bg-[#A81818]"
                    aria-label="+"
                  >
                    +
                  </button>
                  <button
                    type="button"
                    onClick={() => onRemove(l.key)}
                    className="ml-1 text-[#9A8878] hover:text-[#C41E1E] text-[16px] leading-none"
                    aria-label={t('Retirer', 'Remove')}
                  >
                    ×
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ── TOTALS ── */}
      {cart.length > 0 && (
        <div className="border-t border-black/8 pt-4 space-y-1.5 text-[13px] font-inter text-[#4A3828]">
          <div className="flex justify-between">
            <span>{t('Sous-total', 'Subtotal')}</span>
            <span className="font-medium">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>{t('TPS (5%)', 'GST (5%)')}</span>
            <span>${tps.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>{t('TVQ (9.975%)', 'QST (9.975%)')}</span>
            <span>${tvq.toFixed(2)}</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-black/8 mt-2">
            <span className="font-syne text-[15px] font-bold text-[#0F0A06] uppercase tracking-[0.04em]">
              {t('Total', 'Total')}
            </span>
            <span className="font-syne text-[20px] font-extrabold text-[#C41E1E] tracking-[-0.02em]">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>
      )}

      {/* ── CUSTOMER ── */}
      <div>
        <h4 className="font-syne text-[14px] font-bold text-[#0F0A06] uppercase tracking-[0.08em] mb-3">
          {t('Vos coordonnées', 'Your details')}
        </h4>
        <div className="space-y-3">
          <div>
            <label className={labelCls}>{t('Nom complet', 'Full name')}</label>
            <input
              required
              type="text"
              value={customer.name}
              onChange={e => setCustomer(c => ({ ...c, name: e.target.value }))}
              placeholder={t('Jean Dupont', 'John Doe')}
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>{t('Téléphone', 'Phone')}</label>
            <input
              required
              type="tel"
              value={customer.phone}
              onChange={e => setCustomer(c => ({ ...c, phone: e.target.value }))}
              placeholder="514-000-0000"
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>{t('Courriel', 'Email')}</label>
            <input
              required
              type="email"
              value={customer.email}
              onChange={e => setCustomer(c => ({ ...c, email: e.target.value }))}
              placeholder="vous@exemple.com"
              className={inputCls}
            />
          </div>
        </div>
      </div>

      {/* ── PICKUP ── */}
      <div>
        <h4 className="font-syne text-[14px] font-bold text-[#0F0A06] uppercase tracking-[0.08em] mb-3">
          {t('Heure de cueillette', 'Pickup time')}
        </h4>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelCls}>{t('Date', 'Date')}</label>
            <input
              required
              type="date"
              min={minDate}
              value={pickup.date}
              onChange={e => setPickup(p => ({ ...p, date: e.target.value }))}
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>{t('Heure', 'Time')}</label>
            <select
              required
              value={pickup.time}
              onChange={e => setPickup(p => ({ ...p, time: e.target.value }))}
              className={inputCls}
            >
              {timeSlots.map(s => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>
        <p className="text-[10px] text-[#9A8878] font-inter mt-2 leading-[1.5]">
          {t(
            'Créneaux disponibles de 10 h 00 à 19 h 00 (toutes les 30 min).',
            'Available slots from 10:00 AM to 7:00 PM (every 30 min).',
          )}
        </p>
      </div>

      {/* ── NOTE ── */}
      <div>
        <label className={labelCls}>{t('Note (optionnel)', 'Note (optional)')}</label>
        <textarea
          rows={2}
          value={note}
          onChange={e => setNote(e.target.value)}
          placeholder={t('Allergies, demandes spéciales…', 'Allergies, special requests…')}
          className={`${inputCls} resize-none`}
        />
      </div>

      {/* ── SUBMIT ── */}
      <div>
        <button
          type="submit"
          disabled={!canSubmit}
          className="w-full bg-[#C41E1E] text-white py-3.5 text-[12px] tracking-[0.1em] uppercase font-medium font-inter rounded-sm transition-all hover:bg-[#A81818] hover:shadow-[0_6px_20px_rgba(196,30,30,0.3)] hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none disabled:hover:shadow-none"
        >
          {submitting
            ? t('Redirection vers le paiement…', 'Redirecting to payment…')
            : cart.length === 0
              ? t('Ajoutez des plats au panier', 'Add items to your cart')
              : t(
                  `Payer $${total.toFixed(2)} →`,
                  `Pay $${total.toFixed(2)} →`,
                )}
        </button>
        {submitError && (
          <p className="text-center text-[12px] text-[#C41E1E] mt-3 font-inter">
            {submitError}
          </p>
        )}
        <p className="text-[10px] text-[#9A8878] text-center mt-3 font-inter leading-[1.6]">
          {t(
            '🔒 Paiement sécurisé via Stripe — carte de crédit, Apple Pay, Google Pay.',
            '🔒 Secure payment via Stripe — credit card, Apple Pay, Google Pay.',
          )}
        </p>
      </div>
    </form>
  )
}
