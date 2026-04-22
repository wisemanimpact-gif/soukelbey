'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/lib/LanguageContext'

/* ── Shared photo placeholder ── */
function PhotoPlaceholder({ captionFr, captionEn }: { captionFr?: string; captionEn?: string }) {
  const { lang } = useLanguage()
  const caption = lang === 'en' ? captionEn : captionFr
  return (
    <div className="my-10">
      <div className="relative rounded-sm overflow-hidden bg-[#F4EDD8] aspect-[16/9] flex flex-col items-center justify-center gap-3 text-[#9A8878]">
        <div className="w-16 h-16 rounded-full border-2 border-dashed border-[#9A8878]/40 flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-50">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
        </div>
        <span className="text-[11px] tracking-[0.12em] uppercase font-inter font-medium opacity-50">
          {lang === 'en' ? 'Photo coming soon' : 'Photo à venir'}
        </span>
      </div>
      {caption && (
        <p className="text-center text-[12px] text-[#9A8878] font-inter font-light mt-2 italic">
          {caption}
        </p>
      )}
    </div>
  )
}

/* ── Article: Viande Halal ── */
function ArticleViandHalal() {
  const { lang, t } = useLanguage()
  return (
    <>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[9px] tracking-[0.16em] uppercase font-inter font-semibold text-[#C41E1E]">
          {t('Guide · Boucherie', 'Guide · Butcher')}
        </span>
        <span className="text-[#9A8878] text-[9px]">·</span>
        <span className="text-[9px] text-[#9A8878] font-inter tracking-[0.1em] uppercase">
          {t('3 min de lecture', '3 min read')}
        </span>
      </div>

      <h1 className="font-syne text-[clamp(34px,5vw,58px)] font-extrabold text-[#0F0A06] leading-[0.95] tracking-[-0.03em] mb-8">
        {t(<>C&apos;est quoi la<br /><em className="font-normal text-[#9A8878]">viande halal?</em></>,
           <>What is<br /><em className="font-normal text-[#9A8878]">halal meat?</em></>)}
      </h1>

      <div className="my-10">
        <div className="relative rounded-sm overflow-hidden aspect-[16/9]">
          <Image
            src="/images/paturage-halal.png"
            alt={t('Moutons en pâturage — élevage halal', 'Sheep in pasture — halal farming')}
            fill
            className="object-cover"
          />
        </div>
        <p className="text-center text-[12px] text-[#9A8878] font-inter font-light mt-2 italic">
          {t(
            'Des animaux élevés en plein air — un gage de qualité halal',
            'Animals raised outdoors — a mark of halal quality'
          )}
        </p>
      </div>

      <div className="prose-content space-y-6 text-[15px] text-[#4A3828] font-inter font-light leading-[1.85]">
        {lang === 'en' ? (
          <>
            <p>
              The word <strong className="font-semibold text-[#0F0A06]">halal</strong> comes from Arabic and simply means <em>&ldquo;permitted&rdquo;</em> or <em>&ldquo;lawful&rdquo;</em>. When it comes to meat, it refers to a specific set of rules that govern how the animal is raised, slaughtered and prepared.
            </p>

            <h2 className="font-syne text-[24px] font-extrabold text-[#0F0A06] tracking-[-0.02em] pt-4">
              The main rules
            </h2>
            <p>
              For meat to be considered halal, several conditions must be met. The animal must be in good health at the time of slaughter. The killing is done with a single precise cut to the throat, using a very sharp knife, to minimize suffering. An invocation in the name of God — <em>&ldquo;Bismillah&rdquo;</em> — is spoken at the moment of slaughter. The blood must be fully drained from the carcass. Since the animal is not electrocuted, stress hormones are not retained in its blood — resulting in meat with a purer, more flavorful taste.
            </p>

            <h2 className="font-syne text-[24px] font-extrabold text-[#0F0A06] tracking-[-0.02em] pt-4">
              Why does it matter?
            </h2>
            <p>
              For millions of Muslims, consuming halal meat is a religious obligation. But beyond religion, many consumers — Muslim or not — appreciate halal meat for its freshness and the strict standards around it.
            </p>

            <PhotoPlaceholder
              captionFr="Coupes fraîches du jour — Souk El Bey"
              captionEn="Fresh cuts of the day — Souk El Bey"
            />

            <h2 className="font-syne text-[24px] font-extrabold text-[#0F0A06] tracking-[-0.02em] pt-4">
              At Souk El Bey
            </h2>
            <p>
              Here, all our meats — beef, veal, lamb and chicken — are <strong className="font-semibold text-[#0F0A06]">100% halal certified</strong>. We work directly with trusted suppliers to guarantee fresh, quality meat, cut to order. You can place an order in store or call us at <strong className="font-semibold text-[#0F0A06]">514-916-2478</strong>.
            </p>
          </>
        ) : (
          <>
            <p>
              Le mot <strong className="font-semibold text-[#0F0A06]">halal</strong> vient de l&apos;arabe et signifie simplement <em>«&nbsp;permis&nbsp;»</em> ou <em>«&nbsp;licite&nbsp;»</em>. En ce qui concerne la viande, c&apos;est un ensemble de règles précises qui encadrent la façon dont l&apos;animal est élevé, abattu et préparé.
            </p>

            <h2 className="font-syne text-[24px] font-extrabold text-[#0F0A06] tracking-[-0.02em] pt-4">
              Les règles principales
            </h2>
            <p>
              Pour qu&apos;une viande soit considérée halal, plusieurs conditions doivent être respectées. L&apos;animal doit être en bonne santé au moment de l&apos;abattage. La mise à mort se fait d&apos;un seul geste précis à la gorge, avec un couteau très aiguisé, pour minimiser la souffrance. Une invocation au nom de Dieu — <em>«&nbsp;Bismillah&nbsp;»</em> — est prononcée au moment de l&apos;abattage. Le sang doit être entièrement évacué de la carcasse. Puisque l&apos;animal n&apos;est pas électrocuté, il ne retient pas les hormone de stress dans son sang — ce qui donne une viande au goût plus pur et plus savoureux.
            </p>

            <h2 className="font-syne text-[24px] font-extrabold text-[#0F0A06] tracking-[-0.02em] pt-4">
              Pourquoi c&apos;est important?
            </h2>
            <p>
              Pour des millions de musulmans, consommer de la viande halal est une obligation religieuse. Mais au-delà de la religion, beaucoup de consommateurs — musulmans ou non — apprécient la viande halal pour sa fraîcheur et les standards stricts qui l&apos;entourent.
            </p>

            <PhotoPlaceholder
              captionFr="Coupes fraîches du jour — Souk El Bey"
              captionEn="Fresh cuts of the day — Souk El Bey"
            />

            <h2 className="font-syne text-[24px] font-extrabold text-[#0F0A06] tracking-[-0.02em] pt-4">
              Chez Souk El Bey
            </h2>
            <p>
              Chez nous, toutes nos viandes — boeuf, veau, agneau et poulet — sont <strong className="font-semibold text-[#0F0A06]">100% halal certifiées</strong>. On travaille directement avec des fournisseurs de confiance pour vous garantir une viande fraîche, de qualité, coupée à la demande. Vous pouvez passer commande en magasin ou nous appeler au <strong className="font-semibold text-[#0F0A06]">514-916-2478</strong>.
            </p>
          </>
        )}
      </div>
    </>
  )
}

/* ── Article: Parties de l'agneau ── */
function ArticlePartiesAgneau() {
  const { lang, t } = useLanguage()

  const parts = [
    {
      nameFr: 'Gigot entier', nameEn: 'Whole leg',
      descFr: "La cuisse arrière dans sa totalité. Idéal pour les grandes rôtis, savoureux et très tendre quand il est cuit lentement.",
      descEn: 'The entire back leg. Ideal for large roasts — flavorful and very tender when slow-cooked.',
    },
    {
      nameFr: 'Selle', nameEn: 'Saddle',
      descFr: "Partie haute du gigot, fine et très tendre. Parfaite rôtie avec des herbes ou en médaillons.",
      descEn: 'The upper part of the leg, fine and very tender. Perfect roasted with herbs or as medallions.',
    },
    {
      nameFr: 'Gigot raccourci', nameEn: 'Short leg',
      descFr: "Morceau plus compact du gigot. Bien adapté aux grillades et aux rôtis familiaux.",
      descEn: 'A more compact cut of the leg. Well suited for grilling and family roasts.',
    },
    {
      nameFr: 'Filet et côte de filet', nameEn: 'Fillet & loin chop',
      descFr: "Le cœur du gigot, tendre et délicat. Excellent à la poêle, au barbecue ou en brochettes.",
      descEn: 'The heart of the leg, tender and delicate. Excellent pan-fried, grilled or on skewers.',
    },
    {
      nameFr: 'Côte seconde et côte première', nameEn: 'Second & first rib',
      descFr: "Côtes fines et goûteuses. Idéales grillées ou poêlées, elles offrent une belle texture juteuse.",
      descEn: 'Fine, flavorful ribs. Ideal grilled or pan-fried — they offer a nice juicy texture.',
    },
    {
      nameFr: 'Haut de côtes', nameEn: 'Top rib',
      descFr: "Section généreuse et fondante. Parfaite pour braiser et mijoter longtemps.",
      descEn: 'A generous, melting section. Perfect for braising and slow-cooking.',
    },
    {
      nameFr: 'Poitrine', nameEn: 'Breast',
      descFr: "Morceau plus gras et riche en saveurs. Superbe pour les plats mijotés, les confits ou les tajines.",
      descEn: 'A fattier, more flavorful piece. Superb for stews, confits and tagines.',
    },
    {
      nameFr: 'Côte découverte', nameEn: 'Open rib',
      descFr: "Côte de devant avec un peu de gras. À griller ou rôtir pour une viande juteuse et parfumée.",
      descEn: 'A front rib with some fat. Grill or roast it for juicy, fragrant meat.',
    },
    {
      nameFr: 'Épaule', nameEn: 'Shoulder',
      descFr: "Morceau de l'avant, plus persillé que le gigot. Idéal pour les ragoûts, tajines ou cuisson lente au four.",
      descEn: 'A front cut, more marbled than the leg. Ideal for stews, tagines or slow oven cooking.',
    },
    {
      nameFr: 'Collier', nameEn: 'Neck',
      descFr: "Le cou de l'agneau, très savoureux. À mijoter longuement pour les soupes, couscous ou plats en sauce.",
      descEn: "The lamb's neck — very flavorful. Slow-simmer it for soups, couscous or saucy dishes.",
    },
  ]

  return (
    <>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[9px] tracking-[0.16em] uppercase font-inter font-semibold text-[#C4931A]">
          {t('Guide · Agneau', 'Guide · Lamb')}
        </span>
        <span className="text-[#9A8878] text-[9px]">·</span>
        <span className="text-[9px] text-[#9A8878] font-inter tracking-[0.1em] uppercase">
          {t('4 min de lecture', '4 min read')}
        </span>
      </div>

      <h1 className="font-syne text-[clamp(34px,5vw,58px)] font-extrabold text-[#0F0A06] leading-[0.95] tracking-[-0.03em] mb-8">
        {t(<>Les différentes<br /><em className="font-normal text-[#9A8878]">parties de l&apos;agneau</em></>,
           <>The different<br /><em className="font-normal text-[#9A8878]">cuts of lamb</em></>)}
      </h1>

      <div className="my-10">
        <div className="relative rounded-sm overflow-hidden aspect-[16/9]">
          <Image
            src="/images/coupe-agneau.png"
            alt={t("Diagramme des coupes de l'agneau", 'Lamb cut diagram')}
            fill
            className="object-cover"
          />
        </div>
        <p className="text-center text-[12px] text-[#9A8878] font-inter font-light mt-2 italic">
          {t(
            "Coupe classique de l'agneau, inspirée du guide de découpe",
            'Classic lamb cuts, inspired by the traditional butcher guide'
          )}
        </p>
      </div>

      <p className="text-[15px] text-[#4A3828] font-inter font-light leading-[1.85] mb-10">
        {t(
          "Vous êtes à la boucherie et vous ne savez pas quelle coupe choisir? Pas de panique. Voici un guide simple pour comprendre chaque morceau de l'agneau et savoir comment le préparer.",
          "At the butcher and not sure which cut to choose? Don't worry. Here's a simple guide to understanding each lamb cut and how to prepare it."
        )}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-black/[0.07] border border-black/[0.07] mb-10">
        {parts.map((part) => (
          <div key={part.nameFr} className="bg-white p-6 group hover:bg-[#FAFAF8] transition-colors relative">
            <div className="absolute top-0 left-0 w-0.5 h-0 bg-[#C4931A] group-hover:h-full transition-all duration-300" />
            <h3 className="font-syne text-[18px] font-extrabold text-[#0F0A06] tracking-[-0.01em] mb-2">
              {lang === 'en' ? part.nameEn : part.nameFr}
            </h3>
            <p className="text-[13.5px] text-[#4A3828] font-inter font-light leading-[1.75]">
              {lang === 'en' ? part.descEn : part.descFr}
            </p>
          </div>
        ))}
      </div>

      <PhotoPlaceholder
        captionFr="Agneau frais disponible à la boucherie Souk El Bey"
        captionEn="Fresh lamb available at Souk El Bey butcher"
      />

      <p className="text-[15px] text-[#4A3828] font-inter font-light leading-[1.85]">
        {t(
          <>Chez <strong className="font-semibold text-[#0F0A06]">Souk El Bey</strong>, tous nos agneaux sont halal certifiés et coupés à la demande. N&apos;hésitez pas à demander conseil à notre boucher — il sera heureux de vous guider selon votre recette. Appelez-nous au <strong className="font-semibold text-[#0F0A06]">514-916-2478</strong>.</>,
          <>At <strong className="font-semibold text-[#0F0A06]">Souk El Bey</strong>, all our lamb is halal certified and cut to order. Feel free to ask our butcher for advice — he&apos;ll be happy to guide you based on your recipe. Call us at <strong className="font-semibold text-[#0F0A06]">514-916-2478</strong>.</>
        )}
      </p>
    </>
  )
}

/* ── Main client component ── */
export default function BlogPostClient({ slug }: { slug: string }) {
  const { t } = useLanguage()

  const renderContent = () => {
    if (slug === 'viande-halal') return <ArticleViandHalal />
    if (slug === 'parties-agneau') return <ArticlePartiesAgneau />
    return (
      <>
        <p className="text-[10px] tracking-[0.18em] uppercase text-[#C41E1E] font-inter mb-4">
          {t('Blog', 'Blog')}
        </p>
        <h1 className="font-syne text-4xl font-extrabold text-[#0F0A06] tracking-tight mb-8">
          {t('Article:', 'Article:')} {slug}
        </h1>
        <p className="text-[#4A3828] font-inter font-light leading-relaxed">
          {t("Contenu de l'article à venir.", 'Article content coming soon.')}
        </p>
      </>
    )
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-32 pb-24 px-[5vw]">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-[11px] tracking-[0.1em] uppercase font-inter font-medium text-[#9A8878] hover:text-[#0F0A06] transition-colors no-underline mb-12"
        >
          ← {t('Retour au blog', 'Back to blog')}
        </Link>

        {renderContent()}

        <div className="mt-16 pt-10 border-t border-black/[0.07]">
          <p className="text-[12px] text-[#9A8878] font-inter font-light">
            📍 Souk El Bey — 1910 chemin d&apos;Oka, Deux-Montagnes, QC &nbsp;·&nbsp; 514-916-2478
          </p>
        </div>
      </div>
    </div>
  )
}
