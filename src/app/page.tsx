'use client'

import Image from 'next/image'
import Link from 'next/link'
import Ticker from '@/components/Ticker'
import OrderForm from '@/components/OrderForm'
import { menuItems } from '@/lib/menu'
import { useLanguage } from '@/lib/LanguageContext'

const pillars = [
  {
    num: '01', icon: '🍽️', fr: 'Restaurant', en: 'Restaurant',
    subFr: 'Sur place · À emporter · Livraison', subEn: 'Dine in · Takeout · Delivery',
    href: '/restaurant',
    descFr: 'Couscous royal, brik croustillante, kafteji merguez, mosli d\'agneau — des classiques tunisiens préparés à la commande avec amour.',
    descEn: 'Royal couscous, crispy brik, kafteji merguez, lamb mosli — Tunisian classics prepared to order with love.',
    linkFr: 'Voir le menu', linkEn: 'View menu',
  },
  {
    num: '02', icon: '🥩', fr: 'Boucherie Halal', en: 'Halal Butcher',
    subFr: 'Viandes fraîches · Certifié halal', subEn: 'Fresh meats · Halal certified',
    href: '/boucherie',
    descFr: 'Bœuf, agneau, poulet fermier découpés artisanalement. Frais chaque matin, certifiés halal, selon les traditions tunisiennes.',
    descEn: 'Beef, lamb and farm-raised chicken cut by hand. Fresh every morning, halal certified, in the Tunisian tradition.',
    linkFr: 'Nos coupes', linkEn: 'Our cuts',
  },
  {
    num: '03', icon: '🧆', fr: 'Épicerie', en: 'Grocery',
    subFr: 'Importé du Maghreb · Authentique', subEn: 'Imported from the Maghreb · Authentic',
    href: '/epicerie',
    descFr: 'Épices, conserves, pâtisseries orientales, semoule, huile d\'olive — sélection raffinée importée directement de Tunisie.',
    descEn: 'Spices, preserves, oriental pastries, semolina, olive oil — a refined selection imported directly from Tunisia.',
    linkFr: 'Explorer', linkEn: 'Explore',
  },
]

const steps = [
  {
    num: '01', fr: 'Choisissez', en: 'Choose',
    descFr: 'Parcourez notre menu complet — plats, sandwichs, grillades et douceurs tunisiennes.',
    descEn: 'Browse our full menu — mains, sandwiches, grills and Tunisian treats.',
  },
  {
    num: '02', fr: 'Commandez', en: 'Order',
    descFr: 'Remplissez le formulaire — type de commande, heure, et coordonnées. Simple et rapide.',
    descEn: 'Fill out the form — order type, time, and contact info. Simple and quick.',
  },
  {
    num: '03', fr: 'Confirmation', en: 'Confirm',
    descFr: 'Nous vous contactons par texto ou courriel pour confirmer et vous donner le temps exact.',
    descEn: 'We\'ll contact you by text or email to confirm and give you the exact time.',
  },
  {
    num: '04', fr: 'Savourez', en: 'Enjoy',
    descFr: 'Cueillette au comptoir ou livraison locale — profitez de la vraie cuisine tunisienne.',
    descEn: 'Pickup at the counter or local delivery — enjoy real Tunisian cooking.',
  },
]

const testimonials = [
  {
    stars: 5,
    textFr: 'La nourriture était délicieuse, pleine de saveurs. Mon partenaire tunisien a dit que c\'était exactement comme en Tunisie. À seulement 20 minutes de Oka.',
    textEn: 'The food was delicious, full of flavor. My Tunisian partner said it was exactly like in Tunisia. Only 20 minutes from Oka.',
    author: 'Gesenia M.', source: 'Google Reviews',
  },
  {
    stars: 5,
    textFr: 'Poulet rôti finement assaisonné, trois salades tunisiennes et pain traditionnel pour 25$. Un endroit incroyable, chaleureux. À découvrir absolument.',
    textEn: 'Finely seasoned roast chicken, three Tunisian salads and traditional bread for $25. An amazing, warm place. A must-discover.',
    author: 'Google Customer', source: 'Deux-Montagnes, QC',
  },
  {
    stars: 5,
    textFr: 'Personnel très accueillant, service rapide. Boucherie halal de grande qualité. La cuisine tunisienne n\'était pas aussi bonne depuis très longtemps.',
    textEn: 'Very welcoming staff, quick service. Top-quality halal butcher. Tunisian food hasn\'t been this good in a very long time.',
    author: 'Visitor', source: 'Facebook · Montréal',
  },
]

const blogPosts = [
  {
    catFr: 'Recette', catEn: 'Recipe',
    titleFr: 'Comment préparer un couscous tunisien authentique à la maison',
    titleEn: 'How to prepare an authentic Tunisian couscous at home',
    excerptFr: 'Semoule, bouillon maison et mélange d\'épices — les secrets du couscous traditionnel.',
    excerptEn: 'Semolina, homemade broth and a spice mix — the secrets of traditional couscous.',
    dateFr: '12 avril 2025', dateEn: 'April 12, 2025',
    slug: 'couscous-tunisien-maison', bg: 'from-[#2A0A04] to-[#8A2010]',
  },
  {
    catFr: 'Épicerie', catEn: 'Grocery',
    titleFr: 'Les 10 épices tunisiennes essentielles à avoir dans votre cuisine',
    titleEn: 'The 10 essential Tunisian spices to keep in your kitchen',
    excerptFr: 'Du ras-el-hanout à la tabel — notre guide complet des épices du Maghreb.',
    excerptEn: 'From ras-el-hanout to tabel — our complete guide to Maghrebi spices.',
    dateFr: '28 mars 2025', dateEn: 'March 28, 2025',
    slug: 'epices-tunisiennes-essentielles', bg: 'from-[#0A2A04] to-[#207010]',
  },
  {
    catFr: 'Communauté', catEn: 'Community',
    titleFr: 'Ramadan 2025 : nos menus iftar spéciaux à Deux-Montagnes',
    titleEn: 'Ramadan 2025: our special iftar menus in Deux-Montagnes',
    excerptFr: 'Mosli, brik, chorba et thé à la menthe — nos offres pour le mois sacré.',
    excerptEn: 'Mosli, brik, chorba and mint tea — our offerings for the holy month.',
    dateFr: '15 mars 2025', dateEn: 'March 15, 2025',
    slug: 'ramadan-2025-menu-iftar', bg: 'from-[#04102A] to-[#0A2880]',
  },
]

const featuredItems = menuItems.filter(m => m.category === 'plats').slice(0, 6)

export default function Home() {
  const { lang, t } = useLanguage()

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative h-screen min-h-[620px] flex flex-col justify-end overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <Image src="/images/hero.jpg" alt="Souk El Bey — Restaurant Tunisien" fill className="object-cover" priority />
        </div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080402]/95 via-[#080402]/50 to-[#080402]/10" />

        {/* Content */}
        <div className="relative z-10 px-[5vw] pb-[8vh] w-full">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-7 h-px bg-[#C4931A]" />
            <span className="text-[10px] tracking-[0.2em] uppercase text-white/45 font-inter">
              {t(
                'Restaurant · Boucherie Halal · Épicerie · Deux-Montagnes, QC',
                'Restaurant · Halal Butcher · Grocery · Deux-Montagnes, QC'
              )}
            </span>
          </div>
          <h1 className="font-syne text-[clamp(56px,9vw,116px)] text-white leading-[0.92] font-extrabold tracking-[-0.03em] mb-7">
            {t(<>Saveurs<br /><em className="font-normal text-white/45">authentiques</em><br /><span className="text-[#002868]">de Tunisie.</span></>,
               <>Authentic<br /><em className="font-normal text-white/45">flavors</em><br /><span className="text-[#002868]">of Tunisia.</span></>)}
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 flex-wrap">
            <div>
              <p className="text-[15px] text-white/50 leading-[1.75] max-w-[460px] mb-7 font-light font-inter">
                {t(
                  'Couscous royal, brik croustillante, boucherie halal certifiée et épicerie maghrébine. Un voyage culinaire à 20 minutes de Montréal.',
                  'Royal couscous, crispy brik, certified halal butcher and Maghrebi grocery. A culinary journey 20 minutes from Montreal.'
                )}
              </p>
              <div className="flex gap-3 flex-wrap">
                <Link href="/commander" className="bg-[#C41E1E] text-white px-8 py-3.5 text-[12px] tracking-[0.08em] uppercase font-medium font-inter rounded-sm hover:bg-[#A81818] hover:-translate-y-0.5 transition-all no-underline">
                  {t('Commander en ligne', 'Order online')}
                </Link>
                <Link href="/restaurant#menu" className="text-white/70 border border-white/25 px-6 py-3.5 text-[12px] tracking-[0.06em] uppercase font-inter rounded-sm hover:border-white/60 hover:text-white transition-all no-underline">
                  {t('Voir le menu ↓', 'View the menu ↓')}
                </Link>
              </div>
            </div>
            <div className="flex gap-8">
              {[
                ['4.8', t('Google · 86 avis', 'Google · 86 reviews')],
                ['3',   t('Concepts', 'Concepts')],
                ['100%', t('Halal certifié', 'Halal certified')],
              ].map(([n,l], i, arr) => (
                <div key={String(l)} className="flex items-center gap-8">
                  <div className="text-right">
                    <span className="font-syne text-[38px] font-extrabold text-white leading-none tracking-[-0.03em] block">{n}</span>
                    <span className="text-[10px] text-white/35 tracking-[0.1em] uppercase mt-1 block font-inter">{l}</span>
                  </div>
                  {i < arr.length - 1 && <div className="w-px h-11 bg-white/10" />}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute right-[5vw] bottom-[10vh] z-10 flex flex-col items-center gap-1.5">
          <div className="w-px h-12 bg-white/12 relative overflow-hidden">
            <div className="absolute left-0 w-px h-5 bg-[#E8B84B] animate-scroll-dot" />
          </div>
          <span className="text-[9px] tracking-[0.2em] uppercase text-white/30 [writing-mode:vertical-lr] font-inter">Scroll</span>
        </div>
      </section>

      {/* ── TICKER ── */}
      <Ticker />

      {/* ── BOUCHERIE ── */}
      <section className="grid grid-cols-1 md:grid-cols-2">
        <div className="min-h-[520px] bg-[#EDE0C4] flex items-center justify-center relative overflow-hidden">
          <Image src="/images/boucherie.png" alt={t('Boucherie halal — viandes fraîches', 'Halal butcher — fresh meats') as string} fill className="object-cover" />
          <div className="absolute top-8 right-8 z-20 w-20 h-20 rounded-full bg-white border-2 border-[#C4931A] flex flex-col items-center justify-center shadow-lg">
            <span className="text-xl text-[#C4931A]">☪</span>
            <span className="text-[7px] tracking-[0.14em] uppercase text-[#4A3828] font-medium font-inter mt-0.5">Halal</span>
            <span className="text-[7px] tracking-[0.1em] uppercase text-[#9A8878] font-inter">{t('Certifié', 'Certified')}</span>
          </div>
        </div>

        <div className="bg-[#0F0A06] px-[5vw] py-20 flex flex-col justify-center">
          <p className="text-[10px] tracking-[0.18em] uppercase text-[#E8B84B] flex items-center gap-2 mb-5 font-medium font-inter">
            <span className="w-4 h-px bg-[#E8B84B]" /> {t('Boucherie Halal', 'Halal Butcher')}
          </p>
          <h2 className="font-syne text-[clamp(28px,3vw,44px)] font-extrabold text-white leading-[1.05] tracking-[-0.03em] mb-5">
            {t(<>Fraîcheur<br />& tradition<br /><em className="font-normal text-[#E8B84B]">halal.</em></>,
               <>Freshness<br />& halal<br /><em className="font-normal text-[#E8B84B]">tradition.</em></>)}
          </h2>
          <p className="text-[14px] text-white/45 leading-[1.85] font-light font-inter mb-8">
            {t(
              'Nos bouchers sélectionnent et découpent chaque pièce selon les traditions artisanales. Qualité certifiée, fraîcheur garantie chaque matin.',
              'Our butchers select and cut every piece according to artisan traditions. Certified quality, freshness guaranteed every morning.'
            )}
          </p>
          <div className="grid grid-cols-2 gap-px bg-white/5 mb-8">
            {[
              [t('Bœuf', 'Beef'),           t('Côtes, épaule, haché maison',  'Ribs, shoulder, house-ground')],
              [t('Agneau', 'Lamb'),         t('Gigot, côtelettes, carré',     'Leg, chops, rack')],
              [t('Poulet fermier', 'Farm chicken'), t('Entier, filets, cuisses', 'Whole, fillets, thighs')],
              [t('Merguez maison', 'House merguez'), t('Bœuf & agneau épicé',   'Spiced beef & lamb')],
            ].map(([title,sub]) => (
              <div key={String(title)} className="bg-white/2 hover:bg-white/6 transition-colors p-4 cursor-pointer">
                <strong className="font-syne text-[15px] font-bold text-white block mb-0.5 tracking-[-0.01em]">{title}</strong>
                <span className="text-[11px] text-white/35 font-inter">{sub}</span>
              </div>
            ))}
          </div>
          <Link href="/boucherie" className="self-start text-[#E8B84B] border border-[#C4931A]/35 px-5 py-2.5 text-[11px] tracking-[0.08em] uppercase font-medium font-inter rounded-sm hover:bg-[#C4931A]/10 hover:border-[#E8B84B] transition-all no-underline">
            {t('Explorer la boucherie →', 'Explore the butcher →')}
          </Link>
        </div>
      </section>

      {/* ── STORY ── */}
      <section id="story" className="bg-[#FAFAF8] px-[5vw] py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="grid grid-cols-2 gap-2">
            <div className="col-span-2 h-[280px] bg-[#EDE0C4] rounded-sm relative overflow-hidden">
              <Image src="/images/story-main.jpg" alt="Restaurant Souk El Bey" fill className="object-cover" />
            </div>
            <div className="h-[150px] bg-[#E8D9B5] rounded-sm relative overflow-hidden">
              <Image src="/images/story-food.jpg" alt="Couscous Tunisien" fill className="object-cover" />
            </div>
            <div className="h-[150px] bg-[#EDE0C4] rounded-sm flex items-center justify-center relative overflow-hidden">
              <span className="text-[9px] tracking-[0.1em] uppercase text-[#9A8878] font-inter">📸 {t('Épicerie', 'Grocery')}</span>
            </div>
          </div>

          <div>
            <p className="text-[10px] tracking-[0.18em] uppercase text-[#C41E1E] flex items-center gap-2 mb-5 font-medium font-inter">
              <span className="w-4 h-px bg-[#C41E1E]" /> {t('Notre histoire', 'Our story')}
            </p>
            <h2 className="font-syne text-[clamp(34px,4vw,56px)] font-extrabold text-[#0F0A06] leading-[0.95] tracking-[-0.03em] mb-6">
              {t(<>Un souk tunisien<br /><em className="font-normal text-[#9A8878]">au cœur</em><br />du Québec.</>,
                 <>A Tunisian souk<br /><em className="font-normal text-[#9A8878]">at the heart</em><br />of Quebec.</>)}
            </h2>
            <p className="text-[15px] text-[#4A3828] leading-[1.85] mb-4 font-light font-inter">
              {t(
                'Fondé avec la passion de partager les saveurs du Maghreb, Souk El Bey est bien plus qu\'un restaurant. C\'est un lieu de rencontre, un voyage culinaire vers les marchés animés de Tunis, Sfax et Sousse.',
                'Founded with a passion for sharing the flavors of the Maghreb, Souk El Bey is much more than a restaurant. It\'s a meeting place, a culinary journey to the lively markets of Tunis, Sfax and Sousse.'
              )}
            </p>
            <p className="text-[15px] text-[#4A3828] leading-[1.85] mb-8 font-light font-inter">
              {t(
                'Chaque plat raconte une histoire — des recettes transmises de génération en génération, réinterprétées avec les meilleurs produits du Québec.',
                'Every dish tells a story — recipes passed down through generations, reimagined with Quebec\'s best ingredients.'
              )}
            </p>
            <div className="grid grid-cols-3 border border-black/8 mb-8">
              {[
                ['86+', t('Avis Google', 'Google reviews')],
                ['100%', t('Halal certifié', 'Halal certified')],
                ['2021', t('Fondé', 'Founded')],
              ].map(([n,l]) => (
                <div key={String(l)} className="bg-white p-5 text-center border-r last:border-r-0 border-black/8">
                  <span className="font-syne text-[30px] font-extrabold text-[#C41E1E] block leading-none tracking-[-0.03em]">{n}</span>
                  <span className="text-[10px] tracking-[0.1em] uppercase text-[#9A8878] mt-1 block font-inter">{l}</span>
                </div>
              ))}
            </div>
            <Link href="/restaurant" className="inline-block bg-[#0F0A06] text-white px-6 py-3 text-[11px] tracking-[0.08em] uppercase font-medium font-inter rounded-sm hover:bg-[#C41E1E] transition-colors no-underline">
              {t('Notre histoire →', 'Our story →')}
            </Link>
          </div>
        </div>
      </section>

      {/* ── MENU ── */}
      <section id="menu" className="bg-[#F4EDD8] px-[5vw] py-24">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-5 mb-10">
          <div>
            <p className="text-[10px] tracking-[0.18em] uppercase text-[#C41E1E] flex items-center gap-2 mb-4 font-medium font-inter">
              <span className="w-4 h-px bg-[#C41E1E]" /> {t('Notre carte', 'Our menu')}
            </p>
            <h2 className="font-syne text-[clamp(34px,4.5vw,58px)] font-extrabold text-[#0F0A06] leading-[0.95] tracking-[-0.03em]">
              {t(<>Plats <em className="font-normal text-[#9A8878]">populaires.</em></>,
                 <>Popular <em className="font-normal text-[#9A8878]">dishes.</em></>)}
            </h2>
          </div>
          <Link href="/restaurant#menu" className="text-[11px] tracking-[0.08em] text-[#9A8878] hover:text-[#C41E1E] transition-colors font-inter no-underline self-end">
            {t('Menu complet →', 'Full menu →')}
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-black/8">
          {featuredItems.map(item => (
            <div key={item.id} className="bg-white p-7 group hover:bg-[#FAFAF8] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all relative">
              <div className="absolute top-0 left-0 w-0.5 h-0 bg-[#C41E1E] group-hover:h-full transition-all duration-300" />
              <div className="flex justify-between items-start gap-2.5 mb-2">
                <div>
                  <h3 className="font-syne text-[18px] font-bold text-[#0F0A06] tracking-[-0.01em] leading-snug">{item.name[lang]}</h3>
                  <p className="text-[10px] tracking-[0.1em] uppercase text-[#9A8878] font-inter mt-1">{lang === 'fr' ? item.name.en : item.name.fr}</p>
                </div>
                <span className="font-syne text-[20px] font-extrabold text-[#C41E1E] tracking-[-0.02em] flex-shrink-0">
                  ${item.price.toFixed(2)}
                </span>
              </div>
              <hr className="border-black/7 my-2.5" />
              <p className="text-[13px] text-[#4A3828] leading-[1.75] font-light font-inter">{item.description[lang]}</p>
              {item.badge && (
                <span className="inline-block mt-3 text-[9px] tracking-[0.12em] uppercase text-[#C41E1E] border border-[#C41E1E]/20 px-2 py-0.5 rounded-sm font-inter">
                  {item.badge[lang]}
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-3 justify-center mt-10">
          <Link href="/restaurant#menu" className="bg-[#0F0A06] text-white px-7 py-3 text-[11px] tracking-[0.08em] uppercase font-medium font-inter rounded-sm hover:bg-[#C41E1E] transition-colors no-underline">
            {t('Menu complet', 'Full menu')}
          </Link>
          <Link href="/commander" className="bg-transparent text-[#0F0A06] border border-[#0F0A06]/25 px-6 py-3 text-[11px] tracking-[0.08em] uppercase font-inter rounded-sm hover:bg-[#0F0A06] hover:text-white transition-all no-underline">
            {t('Commander →', 'Order →')}
          </Link>
        </div>
      </section>

      {/* ── OFFRE SPÉCIALE ── */}
      <section className="bg-[#0B0705] px-[5vw] py-16 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="relative rounded-sm overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.5)]">
            <Image
              src="/images/apresHero.png"
              alt="Offre Spéciale — 2 Pizzas + 1 Burger à 29,99$"
              width={600}
              height={700}
              className="w-full h-auto object-cover"
            />
          </div>
          <div>
            <p className="text-[10px] tracking-[0.18em] uppercase text-[#E8B84B] flex items-center gap-2 mb-5 font-medium font-inter">
              <span className="w-4 h-px bg-[#E8B84B]" /> {t('Offre spéciale', 'Special deal')}
            </p>
            <h2 className="font-syne text-[clamp(30px,4vw,52px)] font-extrabold text-white leading-[0.95] tracking-[-0.03em] mb-5">
              {t(
                <>2 Pizzas<br />+ 1 Burger<br /><em className="font-normal text-[#E8B84B]">pour emporter.</em></>,
                <>2 Pizzas<br />+ 1 Burger<br /><em className="font-normal text-[#E8B84B]">to go.</em></>
              )}
            </h2>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="font-syne text-[60px] font-extrabold text-[#E8B84B] leading-none tracking-[-0.04em]">29</span>
              <span className="font-syne text-[30px] font-extrabold text-[#E8B84B]/70 tracking-[-0.02em]">{t(',99$', '.99$')}</span>
            </div>
            <p className="text-[14px] text-white/45 leading-[1.8] font-light font-inter max-w-[380px] mb-8">
              {t(
                '2 pizzas 12" de votre choix et 1 burger classique — l\'offre idéale pour partager en famille ou entre amis.',
                'Two 12" pizzas of your choice and one classic burger — the perfect deal to share with family or friends.'
              )}
            </p>
            <Link
              href="/commander"
              className="inline-block bg-[#C41E1E] text-white px-8 py-3.5 text-[12px] tracking-[0.08em] uppercase font-medium font-inter rounded-sm hover:bg-[#A81818] hover:-translate-y-0.5 transition-all no-underline"
            >
              {t('Commander cette offre →', 'Order this deal →')}
            </Link>
          </div>
        </div>
      </section>

      {/* ── ORDER ── */}
      <section id="commander" className="grid grid-cols-1 md:grid-cols-2 min-h-[640px]">
        <div className="bg-[#0F0A06] px-[5vw] py-20 flex flex-col justify-center relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-[#C41E1E]/5" />
          <p className="text-[10px] tracking-[0.18em] uppercase text-[#E8B84B] flex items-center gap-2 mb-5 font-medium font-inter">
            <span className="w-4 h-px bg-[#E8B84B]" /> {t('Commande directe', 'Direct order')}
          </p>
          <h2 className="font-syne text-[clamp(30px,3.5vw,48px)] font-extrabold text-white leading-[1] tracking-[-0.03em] mb-4">
            {t(<>Commandez<br /><em className="font-normal text-[#E8B84B]">sans Uber.</em></>,
               <>Order<br /><em className="font-normal text-[#E8B84B]">without Uber.</em></>)}
          </h2>
          <p className="text-[14px] text-white/45 leading-[1.8] font-light font-inter max-w-[380px] mb-7">
            {t(
              'Fini les 30% de commission. Commandez directement chez nous — vous payez le vrai prix, on garde la totalité.',
              'No more 30% commission. Order directly from us — you pay the real price, and we keep all of it.'
            )}
          </p>
          <div className="inline-flex items-center gap-3.5 bg-[#C4931A]/10 border border-[#C4931A]/20 px-4 py-3.5 rounded-sm mb-8">
            <span className="font-syne text-[36px] font-extrabold text-[#E8B84B] leading-none tracking-[-0.03em]">~30%</span>
            <div className="text-[12px] text-white/45 leading-[1.5] font-inter">
              {t(
                <>économisé sur chaque commande<br /><span className="text-white/25">saved on every order</span></>,
                <>saved on every order<br /><span className="text-white/25">économisé sur chaque commande</span></>
              )}
            </div>
          </div>
          <ul className="flex flex-col gap-3">
            {(lang === 'en'
              ? ['Secure payment via Stripe (soon)', 'Ready in 20–30 minutes', 'Pickup or 5km delivery', 'Text & email confirmation']
              : ['Paiement sécurisé via Stripe (bientôt)', 'Prêt en 20–30 minutes', 'Cueillette ou livraison 5km', 'Confirmation texto & courriel']
            ).map(f => (
              <li key={f} className="flex items-center gap-3 text-[13px] text-white/55 font-light font-inter">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C41E1E] flex-shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-[#FAFAF8] px-[5vw] py-20 flex flex-col justify-center">
          <OrderForm />
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="bg-white px-[5vw] py-24">
        <p className="text-[10px] tracking-[0.18em] uppercase text-[#C41E1E] flex items-center gap-2 mb-4 font-medium font-inter">
          <span className="w-4 h-px bg-[#C41E1E]" /> {t('Comment commander', 'How to order')}
        </p>
        <h2 className="font-syne text-[clamp(34px,4.5vw,58px)] font-extrabold text-[#0F0A06] leading-[0.95] tracking-[-0.03em] mb-14">
          {t(<>Votre commande<br /><em className="font-normal text-[#9A8878]">en 4 étapes.</em></>,
             <>Your order<br /><em className="font-normal text-[#9A8878]">in 4 steps.</em></>)}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-black/7 border border-black/7">
          {steps.map(s => (
            <div key={s.num} className="bg-white p-9 hover:bg-[#FAFAF8] transition-colors">
              <span className="font-syne text-[11px] font-bold text-[#C41E1E] tracking-[0.08em] block mb-4">{s.num}</span>
              <h4 className="font-syne text-[18px] font-bold text-[#0F0A06] tracking-[-0.02em] mb-2">{lang === 'en' ? s.en : s.fr}</h4>
              <p className="text-[13px] text-[#4A3828] leading-[1.75] font-light font-inter">{lang === 'en' ? s.descEn : s.descFr}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="bg-[#FAFAF8] px-[5vw] py-24">
        <p className="text-[10px] tracking-[0.18em] uppercase text-[#C41E1E] flex items-center gap-2 mb-4 font-medium font-inter">
          <span className="w-4 h-px bg-[#C41E1E]" /> {t('Avis clients', 'Reviews')}
        </p>
        <h2 className="font-syne text-[clamp(34px,4.5vw,58px)] font-extrabold text-[#0F0A06] leading-[0.95] tracking-[-0.03em] mb-12">
          {t(<>Ce que disent<br /><em className="font-normal text-[#9A8878]">nos clients.</em></>,
             <>What our<br /><em className="font-normal text-[#9A8878]">customers say.</em></>)}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black/7 border border-black/7">
          {testimonials.map((tm, i) => (
            <div key={i} className="bg-white p-9">
              <div className="flex gap-1 mb-5">
                {Array.from({ length: tm.stars }).map((_, j) => (
                  <div key={j} className="w-3 h-3 bg-[#C4931A]" style={{ clipPath: 'polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)' }} />
                ))}
              </div>
              <blockquote className="text-[15px] text-[#0F0A06] leading-[1.7] italic mb-6 font-light font-inter">
                {lang === 'en' ? tm.textEn : tm.textFr}
              </blockquote>
              <div>
                <strong className="text-[12px] text-[#0F0A06] font-medium block font-inter">{tm.author}</strong>
                <span className="text-[11px] text-[#9A8878] font-inter">{tm.source}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── BLOG ── */}
      <section className="bg-[#F4EDD8] px-[5vw] py-24">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-5 mb-10">
          <div>
            <p className="text-[10px] tracking-[0.18em] uppercase text-[#C41E1E] flex items-center gap-2 mb-4 font-medium font-inter">
              <span className="w-4 h-px bg-[#C41E1E]" /> {t('Blog & Actualités', 'Blog & News')}
            </p>
            <h2 className="font-syne text-[clamp(34px,4.5vw,58px)] font-extrabold text-[#0F0A06] leading-[0.95] tracking-[-0.03em]">
              {t(<>Recettes &<br /><em className="font-normal text-[#9A8878]">communauté.</em></>,
                 <>Recipes &<br /><em className="font-normal text-[#9A8878]">community.</em></>)}
            </h2>
          </div>
          <Link href="/blog" className="text-[11px] tracking-[0.08em] border border-[#0F0A06]/25 text-[#0F0A06] px-5 py-2.5 rounded-sm hover:bg-[#0F0A06] hover:text-white transition-all no-underline self-end font-inter">
            {t('Tous les articles →', 'All articles →')}
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black/8">
          {blogPosts.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="bg-white group hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(0,0,0,0.09)] transition-all no-underline block">
              <div className={`h-48 bg-gradient-to-br ${post.bg} flex items-center justify-center relative`}>
                <span className="text-[9px] tracking-[0.12em] uppercase text-white/20 font-inter">📸 {t('Photo article', 'Article photo')}</span>
                <span className="absolute top-3.5 left-3.5 text-[9px] tracking-[0.14em] uppercase bg-white/12 text-white px-2 py-1 rounded-sm backdrop-blur-sm font-inter">{lang === 'en' ? post.catEn : post.catFr}</span>
              </div>
              <div className="p-6">
                <h4 className="font-syne text-[17px] font-bold text-[#0F0A06] tracking-[-0.01em] leading-snug mb-2">{lang === 'en' ? post.titleEn : post.titleFr}</h4>
                <p className="text-[13px] text-[#4A3828] leading-[1.7] font-light font-inter">{lang === 'en' ? post.excerptEn : post.excerptFr}</p>
                <div className="flex justify-between items-center mt-3.5 pt-3 border-t border-black/7">
                  <span className="text-[11px] text-[#9A8878] font-inter">{lang === 'en' ? post.dateEn : post.dateFr}</span>
                  <span className="text-[11px] text-[#C41E1E] font-medium font-inter">{t('Lire →', 'Read →')}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── INFO BAR ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 bg-[#C41E1E]">
        {[
          ['📍', t('Adresse', 'Address'), '1910 chemin d\'Oka\nDeux-Montagnes, QC'],
          ['🕐', t('Horaires', 'Hours'),  t('Mar–Sam 10h–20h\nDim 11h–20h', 'Tue–Sat 10am–8pm\nSun 11am–8pm')],
          ['📞', t('Téléphone', 'Phone'), '514-916-2478'],
          ['🛒', t('Commande en ligne', 'Online order'), t('Cueillette & livraison\nSans frais de plateforme', 'Pickup & delivery\nNo platform fees')],
        ].map(([icon,title,text], i) => (
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
