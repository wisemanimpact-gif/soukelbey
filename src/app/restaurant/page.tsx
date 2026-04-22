'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { menuItems, categories } from '@/lib/menu'
import { useLanguage } from '@/lib/LanguageContext'

export default function RestaurantPage() {
  const { lang, t } = useLanguage()
  const [activeCategory, setActiveCategory] = useState('pizzas')
  const filtered = menuItems.filter(item => item.category === activeCategory)

  const iftarItems = lang === 'en'
    ? [
        'Lben & Dates',
        'Vermicelli soup / Lentil soup',
        'Green salad & Grilled salad',
        'Main course of your choice',
        'Fatma\'s fingers / Tuna brik',
        'Mint tea',
      ]
    : [
        'Lben & Dattes',
        'Soupe langue d\'oiseaux / Soupe lentilles',
        'Salade verte & Salade grillée',
        'Plat principal au choix',
        'Doigts de Fatma / Brick au thon',
        'Thé à la menthe',
      ]

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative h-[55vh] min-h-[420px] flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/story-food.jpg"
            alt="Restaurant Souk El Bey"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#080402]/97 via-[#080402]/55 to-[#080402]/20" />
        <div className="relative z-10 px-[5vw] pb-14 w-full">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-7 h-px bg-[#C4931A]" />
            <span className="text-[10px] tracking-[0.2em] uppercase text-white/45 font-inter">
              {t(
                'Restaurant · Cuisine Tunisienne · Sur place · À emporter · Livraison',
                'Restaurant · Tunisian Cuisine · Dine-in · Takeout · Delivery'
              )}
            </span>
          </div>
          <h1 className="font-syne text-[clamp(44px,7vw,88px)] text-white leading-[0.92] font-extrabold tracking-[-0.03em]">
            {t(<>Notre <em className="font-normal text-white/40">carte</em></>,
               <>Our <em className="font-normal text-white/40">menu</em></>)}
          </h1>
        </div>
      </section>

      {/* ── MENU IFTAR SPECIAL ── */}
      <section className="bg-[#0B0705] px-[5vw] py-20 overflow-hidden">
        <div className="flex items-center gap-2.5 mb-10">
          <div className="w-4 h-px bg-[#E8B84B]" />
          <span className="text-[10px] tracking-[0.2em] uppercase text-[#E8B84B] font-medium font-inter">
            {t('Offre spéciale', 'Special offer')}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="font-syne text-[clamp(34px,4.5vw,58px)] font-extrabold text-white leading-[0.95] tracking-[-0.03em] mb-6">
              {t(<>Menu<br /><em className="font-normal text-[#E8B84B]">Iftar</em>{' '}<span className="text-[#C41E1E]">Ramadan</span></>,
                 <>Ramadan<br /><em className="font-normal text-[#E8B84B]">Iftar</em>{' '}<span className="text-[#C41E1E]">Menu</span></>)}
            </h2>
            <p className="text-[15px] text-white/50 leading-[1.85] font-light font-inter mb-8 max-w-[440px]">
              {t(
                'Un festin complet pour rompre le jeûne — soupe, salades, plat principal, thé à la menthe et plus. Livraison à partir de 15h00, dans un rayon de 5 km.',
                'A complete feast to break the fast — soup, salads, main course, mint tea and more. Delivery starting at 3:00 PM, within a 5 km radius.'
              )}
            </p>

            <div className="space-y-2 mb-10">
              {iftarItems.map(item => (
                <div key={item} className="flex items-center gap-3 text-[13.5px] text-white/65 font-inter font-light">
                  <span className="text-[#C4931A] text-[10px]">☽</span>
                  {item}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-baseline gap-1">
                <span className="font-syne text-[52px] font-extrabold text-[#E8B84B] leading-none tracking-[-0.04em]">34</span>
                <span className="font-syne text-[28px] font-extrabold text-[#E8B84B]/70 tracking-[-0.02em]">{t(',99$', '.99$')}</span>
              </div>
              <div className="text-[11px] text-white/30 leading-[1.6] font-inter">
                {t(<>Par personne<br />Livraison dès 15h00<br /><span className="text-[#C4931A]">~5 km autour</span></>,
                   <>Per person<br />Delivery from 3:00 PM<br /><span className="text-[#C4931A]">~5 km radius</span></>)}
              </div>
            </div>

            <Link
              href="/commander"
              className="inline-block mt-8 bg-[#C41E1E] text-white px-8 py-3.5 text-[12px] tracking-[0.08em] uppercase font-medium font-inter rounded-sm hover:bg-[#A81818] hover:-translate-y-0.5 transition-all no-underline"
            >
              {t('Commander mon Iftar →', 'Order my Iftar →')}
            </Link>
          </div>

          <div className="relative">
            <div className="relative rounded-sm overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.6)]">
              <Image
                src="/images/640390323_122188440398537629_3537345496558182014_n.jpg"
                alt="Menu Iftar Souk El Bey"
                width={600}
                height={800}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-[#C41E1E] flex flex-col items-center justify-center shadow-xl border-4 border-[#0B0705]">
              <span className="font-syne text-[22px] font-extrabold text-white leading-none tracking-[-0.03em]">34</span>
              <span className="text-[10px] text-white/80 font-inter">{t(',99$', '.99$')}</span>
            </div>
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-[#C4931A]/30 to-transparent" />

      {/* ── FRICASSÉ HIGHLIGHT ── */}
      <section className="bg-[#0F0A06] overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 items-stretch">
          <div className="relative min-h-[320px]">
            <Image
              src="/images/fricasseTunesein.png"
              alt="Fricassé Tunisien"
              fill
              className="object-cover"
            />
          </div>
          <div className="px-[5vw] py-14 flex flex-col justify-center">
            <p className="text-[10px] tracking-[0.18em] uppercase text-[#E8B84B] flex items-center gap-2 mb-4 font-medium font-inter">
              <span className="w-4 h-px bg-[#E8B84B]" /> {t('À ne pas manquer', 'Must try')}
            </p>
            <h2 className="font-syne text-[clamp(28px,3.5vw,46px)] font-extrabold text-white leading-[0.95] tracking-[-0.03em] mb-4">
              {t(<>Le Fricassé<br /><em className="font-normal text-[#E8B84B]">tunisien.</em></>,
                 <>The Tunisian<br /><em className="font-normal text-[#E8B84B]">Fricassé.</em></>)}
            </h2>
            <p className="text-[14px] text-white/45 leading-[1.85] font-light font-inter max-w-[400px] mb-4">
              {t(
                'Mini sandwich de beignet garni à la sauce harissa, pomme de terre, thon, œuf dur et olives. Un classique de la street food tunisienne — à commander 1 heure à l\'avance.',
                'A mini fried-dough sandwich filled with harissa sauce, potato, tuna, hard-boiled egg and olives. A Tunisian street-food classic — order 1 hour in advance.'
              )}
            </p>
            <span className="font-syne text-[36px] font-extrabold text-[#E8B84B] leading-none tracking-[-0.03em]">
              2<span className="text-[22px] text-[#E8B84B]/70">{t(',99$', '.99$')}</span>
            </span>
          </div>
        </div>
      </section>

      {/* ── MENU COMPLET ── */}
      <section id="menu" className="bg-[#FAFAF8] px-[5vw] py-20">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-5 mb-12">
          <div>
            <p className="text-[10px] tracking-[0.18em] uppercase text-[#C41E1E] flex items-center gap-2 mb-4 font-medium font-inter">
              <span className="w-4 h-px bg-[#C41E1E]" /> {t('Notre carte', 'Our menu')}
            </p>
            <h2 className="font-syne text-[clamp(34px,4.5vw,58px)] font-extrabold text-[#0F0A06] leading-[0.95] tracking-[-0.03em]">
              {t(<>Menu <em className="font-normal text-[#9A8878]">complet.</em></>,
                 <>Full <em className="font-normal text-[#9A8878]">menu.</em></>)}
            </h2>
          </div>
          <Link
            href="/commander"
            className="self-end bg-[#C41E1E] text-white px-6 py-3 text-[11px] tracking-[0.08em] uppercase font-medium font-inter rounded-sm hover:bg-[#A81818] transition-colors no-underline"
          >
            {t('Commander en ligne →', 'Order online →')}
          </Link>
        </div>

        {/* Category tabs */}
        <div className="flex gap-1 mb-10 border-b border-black/8 overflow-x-auto">
          {categories.map(cat => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-5 py-3 text-[11px] tracking-[0.08em] uppercase font-medium font-inter transition-all rounded-t-sm border-b-2 -mb-px cursor-pointer whitespace-nowrap ${
                activeCategory === cat.key
                  ? 'text-[#C41E1E] border-[#C41E1E] bg-white'
                  : 'text-[#9A8878] border-transparent hover:text-[#0F0A06] hover:border-black/20'
              }`}
            >
              {cat.label[lang]}
            </button>
          ))}
        </div>

        {/* Menu grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-black/8 border border-black/8">
          {filtered.map(item => (
            <div
              key={item.id}
              className="bg-white p-7 group hover:bg-[#FAFAF8] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all relative"
            >
              <div className="absolute top-0 left-0 w-0.5 h-0 bg-[#C41E1E] group-hover:h-full transition-all duration-300" />
              <div className="flex justify-between items-start gap-2.5 mb-2">
                <div>
                  <h3 className="font-syne text-[18px] font-bold text-[#0F0A06] tracking-[-0.01em] leading-snug">
                    {item.name[lang]}
                  </h3>
                  <p className="text-[10px] tracking-[0.1em] uppercase text-[#9A8878] font-inter mt-1">
                    {lang === 'fr' ? item.name.en : item.name.fr}
                  </p>
                </div>
                {item.sizes ? (
                  <div className="flex flex-col items-end gap-0.5 flex-shrink-0">
                    {item.sizes.map(s => (
                      <div key={s.label} className="flex items-center gap-1.5">
                        <span className="text-[10px] text-[#9A8878] font-inter font-medium">{s.label}</span>
                        <span className="font-syne text-[16px] font-extrabold text-[#C41E1E] tracking-[-0.02em]">
                          ${s.price.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <span className="font-syne text-[20px] font-extrabold text-[#C41E1E] tracking-[-0.02em] flex-shrink-0">
                    ${item.price.toFixed(2)}
                  </span>
                )}
              </div>
              <hr className="border-black/7 my-2.5" />
              <p className="text-[13px] text-[#4A3828] leading-[1.75] font-light font-inter">
                {item.description[lang]}
              </p>
              {item.badge && (
                <span className="inline-block mt-3 text-[9px] tracking-[0.12em] uppercase text-[#C41E1E] border border-[#C41E1E]/20 px-2 py-0.5 rounded-sm font-inter">
                  {item.badge[lang]}
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── PLAT DU JOUR BANNER ── */}
      <section className="bg-[#F4EDD8] px-[5vw] py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-sm overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
            <Image
              src="/images/story-main.jpg"
              alt="Couscous Pure Tunisien"
              width={600}
              height={800}
              className="w-full h-auto object-cover"
            />
          </div>
          <div>
            <p className="text-[10px] tracking-[0.18em] uppercase text-[#C41E1E] flex items-center gap-2 mb-5 font-medium font-inter">
              <span className="w-4 h-px bg-[#C41E1E]" /> {t('Plat du jour', 'Daily special')}
            </p>
            <h2 className="font-syne text-[clamp(30px,3.5vw,50px)] font-extrabold text-[#0F0A06] leading-[0.95] tracking-[-0.03em] mb-5">
              {t(<>Couscous<br /><em className="font-normal text-[#9A8878]">pure</em>{' '}<span className="text-[#C41E1E]">Tunisien.</span></>,
                 <>Pure<br /><em className="font-normal text-[#9A8878]">Tunisian</em>{' '}<span className="text-[#C41E1E]">Couscous.</span></>)}
            </h2>
            <p className="text-[15px] text-[#4A3828] leading-[1.85] font-light font-inter mb-6">
              {t(
                <>Semoule fine, souris d&apos;agneau braisée, légumes du marché et bouillon maison aux pois chiches. <strong className="font-medium">Le goût de la Tunisie dans chaque bouchée.</strong></>,
                <>Fine semolina, braised lamb shank, market vegetables and homemade chickpea broth. <strong className="font-medium">The taste of Tunisia in every bite.</strong></>
              )}
            </p>
            <div className="flex items-center gap-3 bg-white border border-black/8 px-5 py-4 rounded-sm mb-8 inline-flex w-fit">
              <span className="text-2xl">🇹🇳</span>
              <span className="text-[12px] text-[#4A3828] font-inter font-light leading-[1.5]">
                {t(<>Vivez l&apos;âme de Sidi Bou Saïd<br /><strong className="font-medium text-[#0F0A06]">chez Souk El Bey</strong></>,
                   <>Experience the soul of Sidi Bou Saïd<br /><strong className="font-medium text-[#0F0A06]">at Souk El Bey</strong></>)}
              </span>
            </div>
            <div className="block">
              <Link
                href="/commander"
                className="inline-block bg-[#0F0A06] text-white px-7 py-3.5 text-[11px] tracking-[0.08em] uppercase font-medium font-inter rounded-sm hover:bg-[#C41E1E] transition-colors no-underline"
              >
                {t('Commander ce plat →', 'Order this dish →')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── INFO BAR ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 bg-[#C41E1E]">
        {[
          ['📍', t('Adresse', 'Address'),    '1910 chemin d\'Oka\nDeux-Montagnes, QC'],
          ['🕐', t('Horaires', 'Hours'),     t('Mar–Sam 10h–20h\nDim 11h–20h', 'Tue–Sat 10am–8pm\nSun 11am–8pm')],
          ['📞', t('Téléphone', 'Phone'),    '514-916-2478'],
          ['🛵', t('Livraison', 'Delivery'), t('À partir de 15h00\nDans un rayon de 5km', 'From 3:00 PM\nWithin a 5 km radius')],
        ].map(([icon, title, text], i) => (
          <div key={String(title)} className={`px-6 py-7 text-center ${i < 3 ? 'border-r border-white/12' : ''}`}>
            <div className="text-xl mb-2.5 opacity-65">{icon}</div>
            <strong className="block text-[10px] tracking-[0.14em] uppercase text-white/55 mb-2 font-medium font-inter">{title}</strong>
            <span className="text-[13px] text-white font-light leading-[1.6] font-inter whitespace-pre-line">{text}</span>
          </div>
        ))}
      </div>
    </>
  )
}
