import Link from 'next/link'
import Image from 'next/image'

export function generateStaticParams() {
  return [
    { slug: 'viande-halal' },
    { slug: 'parties-agneau' },
    { slug: 'article-1' },
    { slug: 'article-2' },
    { slug: 'article-3' },
  ]
}

/* ── Shared photo placeholder ── */
function PhotoPlaceholder({ caption }: { caption?: string }) {
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
          Photo à venir
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
  return (
    <>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[9px] tracking-[0.16em] uppercase font-inter font-semibold text-[#C41E1E]">
          Guide · Boucherie
        </span>
        <span className="text-[#9A8878] text-[9px]">·</span>
        <span className="text-[9px] text-[#9A8878] font-inter tracking-[0.1em] uppercase">3 min de lecture</span>
      </div>

      <h1 className="font-syne text-[clamp(34px,5vw,58px)] font-extrabold text-[#0F0A06] leading-[0.95] tracking-[-0.03em] mb-8">
        C'est quoi la<br />
        <em className="font-normal text-[#9A8878]">viande halal?</em>
      </h1>

      <div className="my-10">
        <div className="relative rounded-sm overflow-hidden aspect-[16/9]">
          <Image
            src="/images/paturage-halal.png"
            alt="Moutons en pâturage — élevage halal"
            fill
            className="object-cover"
          />
        </div>
        <p className="text-center text-[12px] text-[#9A8878] font-inter font-light mt-2 italic">
          Des animaux élevés en plein air — un gage de qualité halal
        </p>
      </div>

      <div className="prose-content space-y-6 text-[15px] text-[#4A3828] font-inter font-light leading-[1.85]">
        <p>
          Le mot <strong className="font-semibold text-[#0F0A06]">halal</strong> vient de l'arabe et signifie simplement <em>«&nbsp;permis&nbsp;»</em> ou <em>«&nbsp;licite&nbsp;»</em>. En ce qui concerne la viande, c'est un ensemble de règles précises qui encadrent la façon dont l'animal est élevé, abattu et préparé.
        </p>

        <h2 className="font-syne text-[24px] font-extrabold text-[#0F0A06] tracking-[-0.02em] pt-4">
          Les règles principales
        </h2>
        <p>
          Pour qu'une viande soit considérée halal, plusieurs conditions doivent être respectées. L'animal doit être en bonne santé au moment de l'abattage. La mise à mort se fait d'un seul geste précis à la gorge, avec un couteau très aiguisé, pour minimiser la souffrance. Une invocation au nom de Dieu — <em>«&nbsp;Bismillah&nbsp;»</em> — est prononcée au moment de l'abattage. Le sang doit être entièrement évacué de la carcasse. Puisque l'animal n'est pas électrocuté, il ne retient pas les hormone de stress dans son sang — ce qui donne une viande au goût plus pur et plus savoureux.
        </p>

        <h2 className="font-syne text-[24px] font-extrabold text-[#0F0A06] tracking-[-0.02em] pt-4">
          Pourquoi c'est important?
        </h2>
        <p>
          Pour des millions de musulmans, consommer de la viande halal est une obligation religieuse. Mais au-delà de la religion, beaucoup de consommateurs — musulmans ou non — apprécient la viande halal pour sa fraîcheur et les standards stricts qui l'entourent. l
        </p>

        <PhotoPlaceholder caption="Coupes fraîches du jour — Souk El Bey" />

        <h2 className="font-syne text-[24px] font-extrabold text-[#0F0A06] tracking-[-0.02em] pt-4">
          Chez Souk El Bey
        </h2>
        <p>
          Chez nous, toutes nos viandes — boeuf, veau, agneau et poulet — sont <strong className="font-semibold text-[#0F0A06]">100% halal certifiées</strong>. On travaille directement avec des fournisseurs de confiance pour vous garantir une viande fraîche, de qualité, coupée à la demande. Vous pouvez passer commande en magasin ou nous appeler au <strong className="font-semibold text-[#0F0A06]">514-916-2478</strong>.
        </p>
      </div>
    </>
  )
}

/* ── Article: Parties de l'agneau ── */
function ArticlePartiesAgneau() {
  const parts = [
    { name: 'Gigot entier', desc: "La cuisse arrière dans sa totalité. Idéal pour les grandes rôtis, savoureux et très tendre quand il est cuit lentement." },
    { name: 'Selle', desc: "Partie haute du gigot, fine et très tendre. Parfaite rôtie avec des herbes ou en médaillons." },
    { name: 'Gigot raccourci', desc: "Morceau plus compact du gigot. Bien adapté aux grillades et aux rôtis familiaux." },
    { name: 'Filet et côte de filet', desc: "Le cœur du gigot, tendre et délicat. Excellent à la poêle, au barbecue ou en brochettes." },
    { name: 'Côte seconde et côte première', desc: "Côtes fines et goûteuses. Idéales grillées ou poêlées, elles offrent une belle texture juteuse." },
    { name: 'Haut de côtes', desc: "Section généreuse et fondante. Parfaite pour braiser et mijoter longtemps." },
    { name: 'Poitrine', desc: "Morceau plus gras et riche en saveurs. Superbe pour les plats mijotés, les confits ou les tajines." },
    { name: 'Côte découverte', desc: "Côte de devant avec un peu de gras. À griller ou rôtir pour une viande juteuse et parfumée." },
    { name: 'Épaule', desc: "Morceau de l'avant, plus persillé que le gigot. Idéal pour les ragoûts, tajines ou cuisson lente au four." },
    { name: 'Collier', desc: "Le cou de l'agneau, très savoureux. À mijoter longuement pour les soupes, couscous ou plats en sauce." },
  ]

  return (
    <>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[9px] tracking-[0.16em] uppercase font-inter font-semibold text-[#C4931A]">
          Guide · Agneau
        </span>
        <span className="text-[#9A8878] text-[9px]">·</span>
        <span className="text-[9px] text-[#9A8878] font-inter tracking-[0.1em] uppercase">4 min de lecture</span>
      </div>

      <h1 className="font-syne text-[clamp(34px,5vw,58px)] font-extrabold text-[#0F0A06] leading-[0.95] tracking-[-0.03em] mb-8">
        Les différentes<br />
        <em className="font-normal text-[#9A8878]">parties de l'agneau</em>
      </h1>

      <div className="my-10">
        <div className="relative rounded-sm overflow-hidden aspect-[16/9]">
          <Image
            src="/images/coupe-agneau.png"
            alt="Diagramme des coupes de l'agneau"
            fill
            className="object-cover"
          />
        </div>
        <p className="text-center text-[12px] text-[#9A8878] font-inter font-light mt-2 italic">
          Coupe classique de l'agneau, inspirée du guide de découpe
        </p>
      </div>

      <p className="text-[15px] text-[#4A3828] font-inter font-light leading-[1.85] mb-10">
        Vous êtes à la boucherie et vous ne savez pas quelle coupe choisir? Pas de panique. Voici un guide simple pour comprendre chaque morceau de l'agneau et savoir comment le préparer.
      </p>

      {/* Parts grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-black/[0.07] border border-black/[0.07] mb-10">
        {parts.map((part) => (
          <div key={part.name} className="bg-white p-6 group hover:bg-[#FAFAF8] transition-colors relative">
            <div className="absolute top-0 left-0 w-0.5 h-0 bg-[#C4931A] group-hover:h-full transition-all duration-300" />
            <h3 className="font-syne text-[18px] font-extrabold text-[#0F0A06] tracking-[-0.01em] mb-2">
              {part.name}
            </h3>
            <p className="text-[13.5px] text-[#4A3828] font-inter font-light leading-[1.75]">
              {part.desc}
            </p>
          </div>
        ))}
      </div>

      <PhotoPlaceholder caption="Agneau frais disponible à la boucherie Souk El Bey" />

      <p className="text-[15px] text-[#4A3828] font-inter font-light leading-[1.85]">
        Chez <strong className="font-semibold text-[#0F0A06]">Souk El Bey</strong>, tous nos agneaux sont halal certifiés et coupés à la demande. N'hésitez pas à demander conseil à notre boucher — il sera heureux de vous guider selon votre recette. Appelez-nous au <strong className="font-semibold text-[#0F0A06]">514-916-2478</strong>.
      </p>
    </>
  )
}

/* ── Main component ── */
export default function BlogPost({ params }: { params: { slug: string } }) {
  const renderContent = () => {
    if (params.slug === 'viande-halal') return <ArticleViandHalal />
    if (params.slug === 'parties-agneau') return <ArticlePartiesAgneau />
    return (
      <>
        <p className="text-[10px] tracking-[0.18em] uppercase text-[#C41E1E] font-inter mb-4">Blog</p>
        <h1 className="font-syne text-4xl font-extrabold text-[#0F0A06] tracking-tight mb-8">
          Article: {params.slug}
        </h1>
        <p className="text-[#4A3828] font-inter font-light leading-relaxed">
          Contenu de l'article à venir.
        </p>
      </>
    )
  }

  return (
    <>
      <div className="min-h-screen bg-[#FAFAF8] pt-32 pb-24 px-[5vw]">
        <div className="max-w-2xl mx-auto">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[11px] tracking-[0.1em] uppercase font-inter font-medium text-[#9A8878] hover:text-[#0F0A06] transition-colors no-underline mb-12"
          >
            ← Retour au blog
          </Link>

          {renderContent()}

          {/* Divider */}
          <div className="mt-16 pt-10 border-t border-black/[0.07]">
            <p className="text-[12px] text-[#9A8878] font-inter font-light">
              📍 Souk El Bey — 1910 chemin d'Oka, Deux-Montagnes, QC &nbsp;·&nbsp; 514-916-2478
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
