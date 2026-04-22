'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

export type Lang = 'fr' | 'en'

interface LanguageContextValue {
  lang: Lang
  setLang: (l: Lang) => void
  t: <T>(fr: T, en: T) => T
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

const STORAGE_KEY = 'soukelbey-lang'

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('fr')

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved === 'fr' || saved === 'en') {
        setLangState(saved)
      }
    } catch {
      // localStorage unavailable (SSR / privacy mode) — keep default
    }
  }, [])

  // Update <html lang="…"> whenever language changes
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang
    }
  }, [lang])

  const setLang = (l: Lang) => {
    setLangState(l)
    try {
      localStorage.setItem(STORAGE_KEY, l)
    } catch {
      // swallow storage errors
    }
  }

  // Helper: pick the right value based on current language
  const t = <T,>(fr: T, en: T): T => (lang === 'en' ? en : fr)

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    // Safe fallback if the hook is called outside a provider (e.g. tests)
    return {
      lang: 'fr' as Lang,
      setLang: () => {},
      t: <T,>(fr: T, _en: T): T => fr,
    }
  }
  return ctx
}
