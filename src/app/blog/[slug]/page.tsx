export default function BlogPost({ params }: { params: { slug: string } }) {
  return (
    <div className="min-h-screen pt-24 px-[5vw] max-w-3xl mx-auto py-24">
      <p className="text-[10px] tracking-[0.18em] uppercase text-[#C41E1E] font-inter mb-4">Blog</p>
      <h1 className="font-syne text-4xl font-extrabold text-[#0F0A06] tracking-tight mb-8">
        Article: {params.slug}
      </h1>
      <p className="text-[#4A3828] font-inter font-light leading-relaxed">
        Contenu de l'article à venir. Remplacez ce fichier par votre contenu Markdown.
      </p>
    </div>
  )
}
