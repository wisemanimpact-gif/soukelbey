'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react'
import type { MenuItem } from '@/lib/menu'

// ─── Types ───────────────────────────────────────────────────
export type CartLine = {
  key: string          // unique per line  (item.id + size)
  itemId: string
  nameFr: string
  nameEn: string
  size?: string
  unitPrice: number
  qty: number
}

interface CartContextValue {
  cart: CartLine[]
  addItem: (item: MenuItem, size?: { label: string; price: number }) => void
  updateQty: (key: string, delta: number) => void
  removeLine: (key: string) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)
const STORAGE_KEY = 'soukelbey-cart'

// ─── Provider ────────────────────────────────────────────────
export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([])
  const [hydrated, setHydrated] = useState(false)

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed)) {
          setCart(parsed)
        }
      }
    } catch {
      // localStorage unavailable or corrupted — start empty
    }
    setHydrated(true)
  }, [])

  // Persist on every change (skip the very first render before hydration)
  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
    } catch {
      // storage full / blocked — ignore
    }
  }, [cart, hydrated])

  const addItem = useCallback(
    (item: MenuItem, size?: { label: string; price: number }) => {
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
    },
    [],
  )

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

  const clearCart = useCallback(() => {
    setCart([])
  }, [])

  return (
    <CartContext.Provider value={{ cart, addItem, updateQty, removeLine, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

// ─── Hook ────────────────────────────────────────────────────
export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) {
    // Safe fallback when used outside the provider (tests / SSR edge cases)
    return {
      cart: [],
      addItem: () => {},
      updateQty: () => {},
      removeLine: () => {},
      clearCart: () => {},
    }
  }
  return ctx
}
