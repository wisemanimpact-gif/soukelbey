import BlogPostClient from './BlogPostClient'

export function generateStaticParams() {
  return [
    { slug: 'viande-halal' },
    { slug: 'parties-agneau' },
    { slug: 'article-1' },
    { slug: 'article-2' },
    { slug: 'article-3' },
  ]
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  return <BlogPostClient slug={params.slug} />
}
