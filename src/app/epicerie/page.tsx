'use client'

import { useLanguage } from '@/lib/LanguageContext'

export default function Page() {
  const { t } = useLanguage()
  return (
    <div className="min-h-screen pt-24 px-[5vw] flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-syne text-5xl font-extrabold text-[#0F0A06] tracking-tight mb-4">
          {t('Page en construction', 'Page under construction')}
        </h1>
        <p className="text-[#9A8878] font-inter">
          {t('Cette section arrive bientôt.', 'This section is coming soon.')}
        </p>
      </div>
    </div>
  )
}
