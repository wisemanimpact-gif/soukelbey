import Image from 'next/image'
import Link from 'next/link'
import Ticker from '@/components/Ticker'
import OrderForm from '@/components/OrderForm'
import { menuItems } from '@/lib/menu'

const pillars = [
  { num: '01', icon: '🍽️', fr: 'Restaurant', en: 'Restaurant', sub: 'Dine in · Takeout · Delivery', href: '/restaurant',
    desc: 'Couscous royal, brik croustillante, kafteji merguez, mosli d\'agneau — des classiques tunisiens préparés à la commande avec amour.',
    link: { fr: 'Voir le menu', en: 'View menu' } },
  { num: '02', icon: '🥩', fr: 'Boucherie Halal', en: 'Halal Butcher', sub: 'Viandes fraîches · Certifié halal', href: '/boucherie',
    desc: 'Bœuf, agneau, poulet fermier découpés artisanalement. Frais chaque matin, certifiés halal, selon les traditions tunisiennes.',
    link: { fr: 'Nos coupes', en: 'Our cuts' } },
  { num: '03', icon: '🧆', fr: 'Épicerie', en: 'Grocery', sub: 'Importé du Maghreb · Authentique', href: '/epicerie',
    desc: 'Épices, conserves, pâtisseries orientales, semoule, huile d\'olive — sélection raffinée importée directement de Tunisie.',
    link: { fr: 'Explorer', en: 'Explore' } },
]

const steps = [
  { num: '01', fr: 'Choisissez', en: 'Choose', desc: 'Parcourez notre menu complet — plats, sandwichs, grillades et douceurs tunisiennes.' },
  { num: '02', fr: 'Commandez', en: 'Order', desc: 'Remplissez le formulaire — type de commande, heure, et coordonnées. Simple et rapide.' },
  { num: '03', fr: 'Confirmation', en: 'Confirm', desc: 'Nous vous contactons par texto ou courriel pour confirmer et vous donner le temps exact.' },
  { num: '04', fr: 'Savourez', en: 'Enjoy', desc: 'Cueillette au comptoir ou livraison locale — profitez de la vraie cuisine tunisienne.' },
]

const testimonials = [
  { stars: 5, text: 'La nourriture était délicieuse, pleine de saveurs. Mon partenaire tunisien a dit que c\'était exactement comme en Tunisie. À seulement 20 minutes de Oka.', author: 'Gesenia M.', source: 'Google Reviews' },
  { stars: 5, text: 'Poulet rôti finement assaisonné, trois salades tunisiennes et pain traditionnel pour 25$. Un endroit incroyable, chaleureux. À découvrir absolument.', author: 'Client Google', source: 'Deux-Montagnes, QC' },
  { stars: 5, text: 'Personnel très accueillant, service rapide. Boucherie halal de grande qualité. La cuisine tunisienne n\'était pas aussi bonne depuis très longtemps.', author: 'Visiteur', source: 'Facebook · Montréal' },
]

const blogPosts = [
  { cat: 'Recette', title: 'Comment préparer un couscous tunisien authentique à la maison', excerpt: 'Semoule, bouillon maison et mélange d\'épices — les secrets du couscous traditionnel.', date: '12 avril 2025', slug: 'couscous-tunisien-maison', bg: 'from-[#2A0A04] to-[#8A2010]' },
  { cat: 'Épicerie', title: 'Les 10 épices tunisiennes essentielles à avoir dans votre cuisine', excerpt: 'Du ras-el-hanout à la tabel — notre guide complet des épices du Maghreb.', date: '28 mars 2025', slug: 'epices-tunisiennes-essentielles', bg: 'from-[#0A2A04] to-[#207010]' },
  { cat: 'Communauté', title: 'Ramadan 2025 : nos menus iftar spéciaux à Deux-Montagnes', excerpt: 'Mosli, brik, chorba et thé à la menthe — nos offres pour le mois sacré.', date: '15 mars 2025', slug: 'ramadan-2025-menu-iftar', bg: 'from-[#04102A] to-[#0A2880]' },
]

const featuredItems = menuItems.filter(m => m.category === 'plats').slice(0, 6)

export default function Home() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative h-screen min-h-[620px] flex flex-col justify-end overflow-hidden">
        {/* Background — replace with your photo */}
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
              Restaurant · Boucherie Halal · Épicerie · Deux-Montagnes, QC
            </span>
          </div>
          <h1 className="font-syne text-[clamp(56px,9vw,116px)] text-white leading-[0.92] font-extrabold tracking-[-0.03em] mb-7">
            Saveurs<br />
            <em className="font-normal text-white/45">authentiques</em><br />
            <span className="text-[#C4931A]">de Tunisie.</span>
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 flex-wrap">
            <div>
              <p className="text-[15px] text-white/50 leading-[1.75] max-w-[460px] mb-7 font-light font-inter">
                Couscous royal, brik croustillante, boucherie halal certifiée et épicerie maghrébine. Un voyage culinaire à 20 minutes de Montréal.
              </p>
              <div className="flex gap-3 flex-wrap">
                <Link href="/commander" className="bg-[#C41E1E] text-white px-8 py-3.5 text-[12px] tracking-[0.08em] uppercase font-medium font-inter rounded-sm hover:bg-[#A81818] hover:-translate-y-0.5 transition-all no-underline">
                  Commander en ligne
                </Link>
                <Link href="/restaurant#menu" className="text-white/70 border border-white/25 px-6 py-3.5 text-[12px] tracking-[0.06em] uppercase font-inter rounded-sm hover:border-white/60 hover:text-white transition-all no-underline">
                  Voir le menu ↓
                </Link>
              </div>
            </div>
            <div className="flex gap-8">
              {[['4.8','Google · 86 avis'],['3','Concepts'],['100%','Halal certifié']].map(([n,l], i, arr) => (
                <div key={l} className="flex items-center gap-8">
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

      {/* ── PILLARS ── */}
      <section className="bg-white border-t border-black/7">
        <div className="px-[5vw] py-16 border-b border-black/7">
          <p className="text-[10px] tracking-[0.18em] uppercase text-[#C41E1E] flex items-center gap-2 mb-4 font-medium font-inter">
            <span className="w-4 h-px bg-[#C41E1E]" /> Ce qu'on offre · What we offer
          </p>
          <h2 className="font-syne text-[clamp(36px,5vw,64px)] font-extrabold text-[#0F0A06] leading-[0.95] tracking-[-0.03em]">
            Trois concepts,<br /><em className="font-normal text-[#9A8878]">une seule adresse.</em>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3">
          {pillars.map((p, i) => (
            <div key={p.num} className={`relative p-12 group cursor-pointer hover:bg-[#FAFAF8] transition-colors ${i < 2 ? 'md:border-r border-black/7' : ''} border-b md:border-b-0 border-black/7`}>
              {/* Top accent line on hover */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#C41E1E] to-[#C4931A] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              <span className="font-syne text-[11px] font-bold text-[#C41E1E] tracking-[0.1em] block mb-5">{p.num}</span>
              <span className="text-3xl block mb-5">{p.icon}</span>
              <h3 className="font-syne text-[22px] font-bold text-[#0F0A06] tracking-[-0.02em] mb-1">{p.fr}</h3>
              <p className="text-[10px] tracking-[0.1em] uppercase text-[#9A8878] font-inter mb-4">{p.sub}</p>
              <p className="text-[13.5px] text-[#4A3828] leading-[1.8] mb-6 font-light font-inter">{p.desc}</p>
              <Link href={p.href} className="text-[11px] tracking-[0.06em] text-[#C41E1E] font-medium font-inter no-underline inline-flex items-center gap-2 group-hover:gap-3.5 transition-all">
                {p.link.fr} →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── STORY ── */}
      <section id="story" className="bg-[#FAFAF8] px-[5vw] py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          {/* Photo grid */}
          <div className="grid grid-cols-2 gap-2">
            {/* Main photo */}
            <div className="col-span-2 h-[280px] bg-[#EDE0C4] rounded-sm relative overflow-hidden">
              <Image src="/images/story-main.jpg" alt="Restaurant Souk El Bey — Ambiance" fill className="object-cover" />
            </div>
            <div className="h-[150px] bg-[#E8D9B5] rounded-sm relative overflow-hidden">
              <Image src="/images/story-food.jpg" alt="Couscous Tunisien — Plat signature" fill className="object-cover" />
            </div>
            <div className="h-[150px] bg-[#EDE0C4] rounded-sm flex items-center justify-center relative overflow-hidden">
              {/* REPLACE: <Image src="/images/story-shop.jpg" alt="Épicerie" fill className="object-cover" /> */}
              <span className="text-[9px] tracking-[0.1em] uppercase text-[#9A8878] font-inter">📸 Épicerie</span>
            </div>
          </div>

          {/* Text */}
          <div>
            <p className="text-[10px] tracking-[0.18em] uppercase text-[#C41E1E] flex items-center gap-2 mb-5 font-medium font-inter">
              <span className="w-4 h-px bg-[#C41E1E]" /> Notre histoire · Our story
            </p>
            <h2 className="font-syne text-[clamp(34px,4vw,56px)] font-extrabold text-[#0F0A06] leading-[0.95] tracking-[-0.03em] mb-6">
              Un souk tunisien<br /><em className="font-normal text-[#9A8878]">au cœur</em><br />du Québec.
            </h2>
            <p className="text-[15px] text-[#4A3828] leading-[1.85] mb-4 font-light font-inter">
              Fondé avec la passion de partager les saveurs du Maghreb, Souk El Bey est bien plus qu'un restaurant. C'est un lieu de rencontre, un voyage culinaire vers les marchés animés de Tunis, Sfax et Sousse.
            </p>
            <p className="text-[15px] text-[#4A3828] leading-[1.85] mb-8 font-light font-inter">
              Chaque plat raconte une histoire — des recettes transmises de génération en génération, réinterprétées avec les meilleurs produits du Québec.
            </p>
            <div className="grid grid-cols-3 border border-black/8 mb-8">
              {[['86+','Avis Google'],['100%','Halal certifié'],['2021','Fondé']].map(([n,l]) => (
                <div key={l} className="bg-white p-5 text-center border-r last:border-r-0 border-black/8">
                  <span className="font-syne text-[30px] font-extrabold text-[#C41E1E] block leading-none tracking-[-0.03em]">{n}</span>
                  <span className="text-[10px] tracking-[0.1em] uppercase text-[#9A8878] mt-1 block font-inter">{l}</span>
                </div>
              ))}
            </div>
            <Link href="/restaurant" className="inline-block bg-[#0F0A06] text-white px-6 py-3 text-[11px] tracking-[0.08em] uppercase font-medium font-inter rounded-sm hover:bg-[#C41E1E] transition-colors no-underline">
              Notre histoire →
            </Link>
          </div>
        </div>
      </section>

      {/* ── MENU ── */}
      <section id="menu" className="bg-[#F4EDD8] px-[5vw] py-24">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-5 mb-10">
          <div>
            <p className="text-[10px] tracking-[0.18em] uppercase text-[#C41E1E] flex items-center gap-2 mb-4 font-medium font-inter">
              <span className="w-4 h-px bg-[#C41E1E]" /> Notre carte · Our menu
            </p>
            <h2 className="font-syne text-[clamp(34px,4.5vw,58px)] font-extrabold text-[#0F0A06] leading-[0.95] tracking-[-0.03em]">
              Plats <em className="font-normal text-[#9A8878]">populaires.</em>
            </h2>
          </div>
          <Link href="/restaurant#menu" className="text-[11px] tracking-[0.08em] text-[#9A8878] hover:text-[#C41E1E] transition-colors font-inter no-underline self-end">
            Menu complet →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-black/8">
          {featuredItems.map(item => (
            <div key={item.id} className="bg-white p-7 group hover:bg-[#FAFAF8] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all relative">
              <div className="absolute top-0 left-0 w-0.5 h-0 bg-[#C41E1E] group-hover:h-full transition-all duration-300" />
              <div className="flex justify-between items-start gap-2.5 mb-2">
                <div>
                  <h3 className="font-syne text-[18px] font-bold text-[#0F0A06] tracking-[-0.01em] leading-snug">{item.name.fr}</h3>
                  <p className="text-[10px] tracking-[0.1em] uppercase text-[#9A8878] font-inter mt-1">{item.name.en}</p>
                </div>
                <span className="font-syne text-[20px] font-extrabold text-[#C41E1E] tracking-[-0.02em] flex-shrink-0">
                  ${item.price.toFixed(2)}
                </span>
              </div>
              <hr className="border-black/7 my-2.5" />
              <p className="text-[13px] text-[#4A3828] leading-[1.75] font-light font-inter">{item.description.fr}</p>
              {item.badge && (
                <span className="inline-block mt-3 text-[9px] tracking-[0.12em] uppercase text-[#C41E1E] border border-[#C41E1E]/20 px-2 py-0.5 rounded-sm font-inter">
                  {item.badge.fr}
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-3 justify-center mt-10">
          <Link href="/restaurant#menu" className="bg-[#0F0A06] text-white px-7 py-3 text-[11px] tracking-[0.08em] uppercase font-medium font-inter rounded-sm hover:bg-[#C41E1E] transition-colors no-underline">
            Menu complet
          </Link>
          <Link href="/commander" className="bg-transparent text-[#0F0A06] border border-[#0F0A06]/25 px-6 py-3 text-[11px] tracking-[0.08em] uppercase font-inter rounded-sm hover:bg-[#0F0A06] hover:text-white transition-all no-underline">
            Commander →
          </Link>
        </div>
      </section>

      {/* ── ORDER ── */}
      <section id="commander" className="grid grid-cols-1 md:grid-cols-2 min-h-[640px]">
        {/* Left — dark pitch */}
        <div className="bg-[#0F0A06] px-[5vw] py-20 flex flex-col justify-center relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-[#C41E1E]/5" />
          <p className="text-[10px] tracking-[0.18em] uppercase text-[#E8B84B] flex items-center gap-2 mb-5 font-medium font-inter">
            <span className="w-4 h-px bg-[#E8B84B]" /> Commande directe · Direct Order
          </p>
          <h2 className="font-syne text-[clamp(30px,3.5vw,48px)] font-extrabold text-white leading-[1] tracking-[-0.03em] mb-4">
            Commandez<br /><em className="font-normal text-[#E8B84B]">sans Uber.</em>
          </h2>
          <p className="text-[14px] text-white/45 leading-[1.8] font-light font-inter max-w-[380px] mb-7">
            Fini les 30% de commission. Commandez directement chez nous — vous payez le vrai prix, on garde la totalité.
          </p>
          <div className="inline-flex items-center gap-3.5 bg-[#C4931A]/10 border border-[#C4931A]/20 px-4 py-3.5 rounded-sm mb-8">
            <span className="font-syne text-[36px] font-extrabold text-[#E8B84B] leading-none tracking-[-0.03em]">~30%</span>
            <div className="text-[12px] text-white/45 leading-[1.5] font-inter">
              économisé sur chaque commande<br />
              <span className="text-white/25">saved on every order</span>
            </div>
          </div>
          <ul className="flex flex-col gap-3">
            {['Paiement sécurisé via Stripe (bientôt)','Prêt en 20–30 minutes','Cueillette ou livraison 5km','Confirmation texto & courriel'].map(f => (
              <li key={f} className="flex items-center gap-3 text-[13px] text-white/55 font-light font-inter">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C41E1E] flex-shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* Right — form */}
        <div className="bg-[#FAFAF8] px-[5vw] py-20 flex flex-col justify-center">
          <OrderForm />
        </div>
      </section>

      {/* ── BOUCHERIE ── */}
      <section className="grid grid-cols-1 md:grid-cols-2">
        {/* Photo */}
        <div className="min-h-[520px] bg-[#EDE0C4] flex items-center justify-center relative overflow-hidden">
          {/* REPLACE: <Image src="/images/boucherie.jpg" alt="Boucherie Halal Souk El Bey" fill className="object-cover" /> */}
          <span className="text-[11px] tracking-[0.12em] uppercase text-[#9A8878] font-inter relative z-10">📸 Photo boucherie / viandes</span>
          <div className="absolute top-8 right-8 z-20 w-20 h-20 rounded-full bg-white border-2 border-[#C4931A] flex flex-col items-center justify-center shadow-lg">
            <span className="text-xl text-[#C4931A]">☪</span>
            <span className="text-[7px] tracking-[0.14em] uppercase text-[#4A3828] font-medium font-inter mt-0.5">Halal</span>
            <span className="text-[7px] tracking-[0.1em] uppercase text-[#9A8878] font-inter">Certifié</span>
          </div>
        </div>

        {/* Content */}
        <div className="bg-[#0F0A06] px-[5vw] py-20 flex flex-col justify-center">
          <p className="text-[10px] tracking-[0.18em] uppercase text-[#E8B84B] flex items-center gap-2 mb-5 font-medium font-inter">
            <span className="w-4 h-px bg-[#E8B84B]" /> Boucherie Halal · Halal Butcher
          </p>
          <h2 className="font-syne text-[clamp(28px,3vw,44px)] font-extrabold text-white leading-[1.05] tracking-[-0.03em] mb-5">
            Fraîcheur<br />& tradition<br /><em className="font-normal text-[#E8B84B]">halal.</em>
          </h2>
          <p className="text-[14px] text-white/45 leading-[1.85] font-light font-inter mb-8">
            Nos bouchers sélectionnent et découpent chaque pièce selon les traditions artisanales. Qualité certifiée, fraîcheur garantie chaque matin.
          </p>
          <div className="grid grid-cols-2 gap-px bg-white/5 mb-8">
            {[['Bœuf','Côtes, épaule, haché maison'],['Agneau','Gigot, côtelettes, carré'],['Poulet fermier','Entier, filets, cuisses'],['Merguez maison','Bœuf & agneau épicé']].map(([t,s]) => (
              <div key={t} className="bg-white/2 hover:bg-white/6 transition-colors p-4 cursor-pointer">
                <strong className="font-syne text-[15px] font-bold text-white block mb-0.5 tracking-[-0.01em]">{t}</strong>
                <span className="text-[11px] text-white/35 font-inter">{s}</span>
              </div>
            ))}
          </div>
          <Link href="/boucherie" className="self-start text-[#E8B84B] border border-[#C4931A]/35 px-5 py-2.5 text-[11px] tracking-[0.08em] uppercase font-medium font-inter rounded-sm hover:bg-[#C4931A]/10 hover:border-[#E8B84B] transition-all no-underline">
            Explorer la boucherie →
          </Link>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="bg-white px-[5vw] py-24">
        <p className="text-[10px] tracking-[0.18em] uppercase text-[#C41E1E] flex items-center gap-2 mb-4 font-medium font-inter">
          <span className="w-4 h-px bg-[#C41E1E]" /> Comment commander · How to order
        </p>
        <h2 className="font-syne text-[clamp(34px,4.5vw,58px)] font-extrabold text-[#0F0A06] leading-[0.95] tracking-[-0.03em] mb-14">
          Votre commande<br /><em className="font-normal text-[#9A8878]">en 4 étapes.</em>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-black/7 border border-black/7">
          {steps.map(s => (
            <div key={s.num} className="bg-white p-9 hover:bg-[#FAFAF8] transition-colors">
              <span className="font-syne text-[11px] font-bold text-[#C41E1E] tracking-[0.08em] block mb-4">{s.num}</span>
              <h4 className="font-syne text-[18px] font-bold text-[#0F0A06] tracking-[-0.02em] mb-2">{s.fr}</h4>
              <p className="text-[13px] text-[#4A3828] leading-[1.75] font-light font-inter">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="bg-[#FAFAF8] px-[5vw] py-24">
        <p className="text-[10px] tracking-[0.18em] uppercase text-[#C41E1E] flex items-center gap-2 mb-4 font-medium font-inter">
          <span className="w-4 h-px bg-[#C41E1E]" /> Avis clients · Reviews
        </p>
        <h2 className="font-syne text-[clamp(34px,4.5vw,58px)] font-extrabold text-[#0F0A06] leading-[0.95] tracking-[-0.03em] mb-12">
          Ce que disent<br /><em className="font-normal text-[#9A8878]">nos clients.</em>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black/7 border border-black/7">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white p-9">
              <div className="flex gap-1 mb-5">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <div key={j} className="w-3 h-3 bg-[#C4931A]" style={{ clipPath: 'polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)' }} />
                ))}
              </div>
              <blockquote className="text-[15px] text-[#0F0A06] leading-[1.7] italic mb-6 font-light font-inter">
                {t.text}
              </blockquote>
              <div>
                <strong className="text-[12px] text-[#0F0A06] font-medium block font-inter">{t.author}</strong>
                <span className="text-[11px] text-[#9A8878] font-inter">{t.source}</span>
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
              <span className="w-4 h-px bg-[#C41E1E]" /> Blog & Actualités
            </p>
            <h2 className="font-syne text-[clamp(34px,4.5vw,58px)] font-extrabold text-[#0F0A06] leading-[0.95] tracking-[-0.03em]">
              Recettes &<br /><em className="font-normal text-[#9A8878]">communauté.</em>
            </h2>
          </div>
          <Link href="/blog" className="text-[11px] tracking-[0.08em] border border-[#0F0A06]/25 text-[#0F0A06] px-5 py-2.5 rounded-sm hover:bg-[#0F0A06] hover:text-white transition-all no-underline self-end font-inter">
            Tous les articles →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black/8">
          {blogPosts.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="bg-white group hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(0,0,0,0.09)] transition-all no-underline block">
              <div className={`h-48 bg-gradient-to-br ${post.bg} flex items-center justify-center relative`}>
                <span className="text-[9px] tracking-[0.12em] uppercase text-white/20 font-inter">📸 Photo article</span>
                <span className="absolute top-3.5 left-3.5 text-[9px] tracking-[0.14em] uppercase bg-white/12 text-white px-2 py-1 rounded-sm backdrop-blur-sm font-inter">{post.cat}</span>
              </div>
              <div className="p-6">
                <h4 className="font-syne text-[17px] font-bold text-[#0F0A06] tracking-[-0.01em] leading-snug mb-2">{post.title}</h4>
                <p className="text-[13px] text-[#4A3828] leading-[1.7] font-light font-inter">{post.excerpt}</p>
                <div className="flex justify-between items-center mt-3.5 pt-3 border-t border-black/7">
                  <span className="text-[11px] text-[#9A8878] font-inter">{post.date}</span>
                  <span className="text-[11px] text-[#C41E1E] font-medium font-inter">Lire →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── INFO BAR ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 bg-[#C41E1E]">
        {[
          ['📍','Adresse','1910 chemin d\'Oka\nDeux-Montagnes, QC'],
          ['🕐','Horaires','Mar–Sam 10h–20h\nDim 11h–20h'],
          ['📞','Téléphone','514-916-2478'],
          ['🛒','Commande en ligne','Cueillette & livraison\nSans frais de plateforme'],
        ].map(([icon,title,text], i) => (
          <div key={title} className={`px-6 py-7 text-center ${i < 3 ? 'border-r border-white/12' : ''}`}>
            <div className="text-xl mb-2.5 opacity-65">{icon}</div>
            <strong className="block text-[10px] tracking-[0.14em] uppercase text-white/55 mb-2 font-medium font-inter">{title}</strong>
            <span className="text-[13px] text-white font-light leading-[1.6] font-inter whitespace-pre-line">{text}</span>
          </div>
        ))}
      </div>
    </>
  )
}
