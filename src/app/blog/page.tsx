'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/LanguageContext'

const articles = [
  {
    slug: 'viande-halal',
    categoryFr: 'Guide · Boucherie', categoryEn: 'Guide · Butcher',
    titleFr: "C'est quoi la viande halal?",
    titleEn: 'What is halal meat?',
    excerptFr:
      "Halal, ça veut dire quoi exactement? On vous explique simplement l'origine, les règles et pourquoi ça compte pour nous chez Souk El Bey.",
    excerptEn:
      'What exactly does "halal" mean? We explain the origins, the rules and why it matters to us at Souk El Bey.',
    date: '2024',
    readTimeFr: '3 min', readTimeEn: '3 min',
    accent: '#C41E1E',
  },
  {
    slug: 'parties-agneau',
    categoryFr: 'Guide · Agneau', categoryEn: 'Guide · Lamb',
    titleFr: "Les différentes parties de l'agneau",
    titleEn: 'The different cuts of lamb',
    excerptFr:
      "Gigot, épaule, côtelettes, collier… Vous ne savez pas quelle coupe choisir? On vous guide pour comprendre chaque morceau et comment le cuisiner.",
    excerptEn:
      "Leg, shoulder, chops, neck… Not sure which cut to choose? We'll guide you through each piece and how to cook it.",
    date: '2024',
    readTimeFr: '4 min', readTimeEn: '4 min',
    accent: '#C4931A',
  },
]

export default function BlogPage() {
  const { lang, t } = useLanguage()

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative bg-[#0F0A06] pt-32 pb-20 px-[5vw] overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)',
            backgroundSize: '12px 12px',
          }}
        />
        <div className="relative z-10">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-7 h-px bg-[#C4931A]" />
            <span className="text-[10px] tracking-[0.22em] uppercase text-white/40 font-inter">
              {t('Blog · Conseils · Guides', 'Blog · Tips · Guides')}
            </span>
          </div>
          <h1 className="font-syne text-[clamp(52px,8vw,96px)] text-white leading-[0.9] font-extrabold tracking-[-0.03em]">
            {t(<>Le <em className="font-normal text-white/30">blog</em></>,
               <>The <em className="font-normal text-white/30">blog</em></>)}
          </h1>
          <p className="mt-6 text-[15px] text-white/45 leading-[1.85] font-light font-inter max-w-[480px]">
            {t(
              'Conseils, guides et informations sur la viande halal, la cuisine tunisienne et bien plus.',
              'Tips, guides and insights about halal meat, Tunisian cuisine and much more.'
            )}
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C4931A]/40 to-transparent" />
      </section>

      {/* ── ARTICLES ── */}
      <section className="bg-[#FAFAF8] px-[5vw] py-20">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="group block bg-white border border-black/[0.07] rounded-sm overflow-hidden hover:shadow-[0_16px_48px_rgba(0,0,0,0.10)] hover:-translate-y-1 transition-all no-underline"
            >
              <div className="relative h-52 bg-[#F4EDD8] flex items-center justify-center overflow-hidden">
                <div className="flex flex-col items-center gap-2 text-[#9A8878]">
                  <div className="w-12 h-12 rounded-full border-2 border-dashed border-[#9A8878]/40 flex items-center justify-center">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-50">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                      <circle cx="8.5" cy="8.5" r="1.5"/>
                      <polyline points="21 15 16 10 5 21"/>
                    </svg>
                  </div>
                  <span className="text-[10px] tracking-[0.12em] uppercase font-inter font-medium opacity-50">
                    {t('Photo à venir', 'Photo coming soon')}
                  </span>
                </div>
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ backgroundColor: article.accent }}
                />
              </div>

              <div className="p-7">
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="text-[9px] tracking-[0.16em] uppercase font-inter font-semibold"
                    style={{ color: article.accent }}
                  >
                    {lang === 'en' ? article.categoryEn : article.categoryFr}
                  </span>
                  <span className="text-[#9A8878] text-[9px]">·</span>
                  <span className="text-[9px] text-[#9A8878] font-inter tracking-[0.1em] uppercase">
                    {lang === 'en' ? article.readTimeEn : article.readTimeFr} {t('de lecture', 'read')}
                  </span>
                </div>
                <h2 className="font-syne text-[20px] font-extrabold text-[#0F0A06] tracking-[-0.02em] leading-snug mb-3 group-hover:text-[#C41E1E] transition-colors">
                  {lang === 'en' ? article.titleEn : article.titleFr}
                </h2>
                <p className="text-[13.5px] text-[#4A3828] font-inter font-light leading-[1.75]">
                  {lang === 'en' ? article.excerptEn : article.excerptFr}
                </p>
                <div className="mt-5 flex items-center gap-1.5 text-[11px] font-inter font-medium tracking-[0.06em] uppercase" style={{ color: article.accent }}>
                  {t('Lire l\'article', 'Read article')}
                  <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
