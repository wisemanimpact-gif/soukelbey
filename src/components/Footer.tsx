'use client'
import Link from 'next/link'
import { siteMeta } from '@/lib/seo'
import { useLanguage } from '@/lib/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()

  const navCol = [
    {
      title: t('Menu', 'Menu'),
      links: [
        { href: '/restaurant',      label: t('Restaurant', 'Restaurant') },
        { href: '/restaurant#menu', label: t('Menu complet', 'Full menu') },
        { href: '/boucherie',       label: t('Boucherie', 'Butcher') },
        { href: '/epicerie',        label: t('Épicerie', 'Grocery') },
        { href: '/commander',       label: t('Commander en ligne', 'Order online') },
      ],
    },
    {
      title: t('Infos', 'Info'),
      links: [
        { href: '/#story', label: t('Notre histoire', 'Our story') },
        { href: '/blog',   label: t('Blog', 'Blog') },
        { href: '/#contact', label: t('Contact', 'Contact') },
      ],
    },
    {
      title: t('Contact', 'Contact'),
      links: [
        { href: `tel:${siteMeta.phone}`, label: '514-916-2478' },
        { href: `https://${siteMeta.url}`, label: 'soukelbey.ca' },
        { href: 'https://maps.google.com/?q=1910+chemin+d\'Oka+Deux-Montagnes', label: '1910 ch. d\'Oka' },
        { href: siteMeta.social.facebook, label: 'Facebook' },
      ],
    },
  ]

  return (
    <footer className="bg-[#0F0A06] pt-20 pb-9 px-[5vw]">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-14 pb-14 border-b border-white/7 mb-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-full bg-[#C41E1E] flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 22 22" width="20" height="20" fill="none">
                <path d="M5 15 Q5.5 8 11 6.5 Q16.5 8 17 15Z" fill="white"/>
                <ellipse cx="11" cy="15.3" rx="7" ry="2" fill="rgba(255,255,255,0.35)"/>
                <path d="M7.5 18 Q9.5 16.5 11 17.5 Q12.5 16.5 14.5 18" stroke="rgba(0,0,0,0.55)" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="font-syne text-[18px] font-bold text-white">
              Souk El <span className="text-[#C41E1E]">Bey</span>
            </span>
          </div>
          <p className="text-[13px] text-white/35 leading-[1.85] max-w-[260px] font-light mb-6">
            {t(
              'Votre destination tunisienne au Québec depuis 2021. Restaurant, boucherie halal & épicerie — à 20 min de Montréal.',
              'Your Tunisian destination in Quebec since 2021. Restaurant, halal butcher & grocery — 20 min from Montreal.'
            )}
          </p>
          <div className="flex gap-2">
            {[
              { href: siteMeta.social.facebook, label: 'Facebook' },
              { href: '#', label: 'Instagram' },
              { href: 'https://maps.google.com/?q=Souk+El+Bey+Deux-Montagnes', label: 'Maps' },
            ].map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 border border-white/10 rounded-sm text-[10px] tracking-[0.08em] uppercase text-white/40 hover:border-white/35 hover:text-white/70 transition-all no-underline"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* Nav columns */}
        {navCol.map(col => (
          <div key={col.title}>
            <h4 className="text-[10px] tracking-[0.16em] uppercase text-white/25 mb-4 font-medium">{col.title}</h4>
            <ul className="list-none m-0 p-0 flex flex-col gap-2.5">
              {col.links.map(l => (
                <li key={l.label}>
                  <Link href={l.href} className="text-[13px] text-white/45 hover:text-white no-underline font-light transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap justify-between items-center gap-3">
        <span className="text-[11px] text-white/18">
          {t(
            '© 2025 Souk El Bey · soukelbey.ca · Tous droits réservés',
            '© 2025 Souk El Bey · soukelbey.ca · All rights reserved'
          )}
        </span>
        <span className="text-[11px] text-white/18">Deux-Montagnes, Québec 🇨🇦</span>
      </div>
    </footer>
  )
}
