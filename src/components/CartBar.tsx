'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useCart } from '@/lib/CartContext'
import { useLanguage } from '@/lib/LanguageContext'

/**
 * Floating cart bar — sticky at the bottom of every page.
 * Appears only when the cart has at least 1 item, and is hidden on the
 * /commander page since the full cart panel is already visible there.
 */
export default function CartBar() {
  const { cart } = useCart()
  const { t } = useLanguage()
  const pathname = usePathname()

  // Only render after client mount to avoid hydration mismatch with localStorage
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const count = cart.reduce((s, l) => s + l.qty, 0)
  const total = cart.reduce((s, l) => s + l.unitPrice * l.qty, 0)

  // Hide on the order page (the page has its own cart UI)
  const isOrderPage = pathname?.startsWith('/commander')

  if (!mounted || count === 0 || isOrderPage) return null

  return (
    <div
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-md"
      role="region"
      aria-label={t('Aperçu du panier', 'Cart preview') as string}
    >
      <Link
        href="/commander"
        className="group flex items-center justify-between gap-4 bg-[#C41E1E] text-white px-5 py-3.5 rounded-sm shadow-[0_12px_32px_rgba(196,30,30,0.35)] hover:bg-[#A81818] hover:-translate-y-0.5 transition-all no-underline"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative flex-shrink-0">
            {/* Simple bag icon (no external library) */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 rounded-full bg-white text-[#C41E1E] text-[10px] font-bold font-inter flex items-center justify-center leading-none">
              {count}
            </span>
          </div>
          <div className="flex flex-col leading-tight min-w-0">
            <span className="text-[10px] tracking-[0.14em] uppercase text-white/70 font-inter">
              {t('Votre commande', 'Your order')}
            </span>
            <span className="font-syne text-[15px] font-bold tracking-[-0.01em] truncate">
              {count} {count > 1 ? t('articles', 'items') : t('article', 'item')}
              {' · '}
              ${total.toFixed(2)}
            </span>
          </div>
        </div>
        <span className="flex-shrink-0 text-[11px] tracking-[0.1em] uppercase font-medium font-inter inline-flex items-center gap-1.5">
          {t('Voir', 'View')}
          <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </span>
      </Link>
    </div>
  )
}
