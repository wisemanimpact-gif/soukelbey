'use client'

import Image from 'next/image'
import { useLanguage } from '@/lib/LanguageContext'

const sections = [
  {
    key: 'boeuf',
    titleFr: 'Boeuf', titleEn: 'Beef',
    subtitleFr: '& Veau', subtitleEn: '& Veal',
    labelFr: 'Viandes rouges', labelEn: 'Red meats',
    accent: '#C41E1E',
    imagePlaceholder: '/images/boeuf.png',
    imageAlt: 'Boeuf & Veau',
    itemsFr: [
      'Filet mignon',
      'Boston',
      'Faux filet',
      'Jarret sans os',
      'Jarret avec os',
      'Foie de boeuf',
      'Côtes de veau',
      'Épaule de veau',
      'Viande hachée',
      'Steak et cubes',
    ],
    itemsEn: [
      'Filet mignon',
      'Boston cut',
      'Ribeye',
      'Boneless shank',
      'Bone-in shank',
      'Beef liver',
      'Veal chops',
      'Veal shoulder',
      'Ground beef',
      'Steak and cubes',
    ],
  },
  {
    key: 'agneau',
    titleFr: 'Agneau', titleEn: 'Lamb',
    subtitleFr: 'Halal', subtitleEn: 'Halal',
    labelFr: 'Agneau frais', labelEn: 'Fresh lamb',
    accent: '#C4931A',
    imagePlaceholder: '/images/agneau.png',
    imageAlt: 'Agneau',
    itemsFr: [
      'Côtelettes',
      'Gigot',
      'Épaule',
      'Foie',
      'Cœur et reins',
      'Pattes brûlées',
      'Tête brûlée',
      'Merguez',
    ],
    itemsEn: [
      'Chops',
      'Leg of lamb',
      'Shoulder',
      'Liver',
      'Heart and kidneys',
      'Seared feet',
      'Seared head',
      'Merguez',
    ],
  },
  {
    key: 'poulet',
    titleFr: 'Poulet', titleEn: 'Chicken',
    subtitleFr: 'Frais', subtitleEn: 'Fresh',
    labelFr: 'Volaille fraîche', labelEn: 'Fresh poultry',
    accent: '#C41E1E',
    imagePlaceholder: '/images/poulet.png',
    imageAlt: 'Poulet',
    itemsFr: [
      'Poitrine de poulet',
      'Cuisse de poulet',
      'Pilons',
      'Poulet entier',
      'Poulet mariné',
    ],
    itemsEn: [
      'Chicken breast',
      'Chicken thigh',
      'Drumsticks',
      'Whole chicken',
      'Marinated chicken',
    ],
  },
]

export default function BoucheriePage() {
  const { lang, t } = useLanguage()

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative bg-[#0F0A06] pt-32 pb-20 px-[5vw] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)', backgroundSize: '12px 12px' }}
        />
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-7 h-px bg-[#C4931A]" />
            <span className="text-[10px] tracking-[0.22em] uppercase text-white/40 font-inter">
              {t(
                'Boucherie Halal · Viandes fraîches · Fraîcheur quotidienne',
                'Halal Butcher · Fresh meats · Fresh daily'
              )}
            </span>
          </div>
          <h1 className="font-syne text-[clamp(52px,8vw,96px)] text-white leading-[0.9] font-extrabold tracking-[-0.03em]">
            {t(<>Notre <em className="font-normal text-white/30">boucherie</em></>,
               <>Our <em className="font-normal text-white/30">butcher shop</em></>)}
          </h1>
          <p className="mt-6 text-[15px] text-white/45 leading-[1.85] font-light font-inter max-w-[480px]">
            {t(
              'Viandes fraîches sélectionnées avec soin — boeuf, veau, agneau et poulet halal. Qualité garantie, coupées à la demande.',
              'Fresh meats carefully selected — beef, veal, lamb and halal chicken. Guaranteed quality, cut to order.'
            )}
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C4931A]/40 to-transparent" />
      </section>

      {/* ── SECTIONS ── */}
      {sections.map((section, idx) => {
        const isEven = idx % 2 === 0
        const items = lang === 'en' ? section.itemsEn : section.itemsFr
        return (
          <section
            key={section.key}
            className={`px-[5vw] py-20 ${isEven ? 'bg-[#FAFAF8]' : 'bg-white'}`}
          >
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

              <div className={`${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                <div className="relative rounded-sm overflow-hidden aspect-[4/3] bg-[#F4EDD8] shadow-[0_24px_64px_rgba(0,0,0,0.10)]">
                  <Image
                    src={section.imagePlaceholder}
                    alt={section.imageAlt}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="mt-4 h-0.5 w-16 rounded-full" style={{ backgroundColor: section.accent }} />
              </div>

              <div className={`${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                <div className="flex items-center gap-2.5 mb-5">
                  <div className="w-4 h-px" style={{ backgroundColor: section.accent }} />
                  <span className="text-[10px] tracking-[0.2em] uppercase font-inter font-medium"
                    style={{ color: section.accent }}>
                    {lang === 'en' ? section.labelEn : section.labelFr}
                  </span>
                </div>

                <h2 className="font-syne text-[clamp(42px,5.5vw,68px)] font-extrabold text-[#0F0A06] leading-[0.92] tracking-[-0.03em] mb-10">
                  {lang === 'en' ? section.titleEn : section.titleFr}<br />
                  <em className="font-normal text-[#9A8878]">{lang === 'en' ? section.subtitleEn : section.subtitleFr}</em>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-0">
                  {items.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 py-3.5 border-b border-black/[0.06] group"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-transform group-hover:scale-150"
                        style={{ backgroundColor: section.accent }}
                      />
                      <span className="font-syne text-[17px] font-semibold text-[#0F0A06] tracking-[-0.01em]">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )
      })}

      <div className="h-px bg-gradient-to-r from-transparent via-[#C4931A]/30 to-transparent" />

      {/* ── HALAL BANNER ── */}
      <section className="bg-[#0F0A06] px-[5vw] py-16">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 rounded-full bg-[#C4931A]/15 border border-[#C4931A]/30 flex items-center justify-center flex-shrink-0">
              <span className="text-[#C4931A] font-syne font-extrabold text-[13px] tracking-[0.05em]">HALAL</span>
            </div>
            <div>
              <p className="font-syne text-[22px] font-extrabold text-white tracking-[-0.02em]">
                {t('100% Halal certifié', '100% Halal certified')}
              </p>
              <p className="text-[13px] text-white/40 font-inter font-light mt-0.5">
                {t(
                  'Toutes nos viandes sont certifiées halal — fraîches et coupées à la demande.',
                  'All our meats are halal certified — fresh and cut to order.'
                )}
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:items-end gap-1 text-[13px] text-white/40 font-inter font-light">
            <span>📍 1910 chemin d&apos;Oka, Deux-Montagnes, QC</span>
            <span>📞 514-916-2478</span>
            <span className="text-[#C4931A]">{t('Mar–Sam 10h–20h · Dim 11h–20h', 'Tue–Sat 10am–8pm · Sun 11am–8pm')}</span>
          </div>
        </div>
      </section>
    </>
  )
}
