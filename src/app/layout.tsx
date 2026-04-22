import type { Metadata } from 'next'
import './globals.css'
import { siteMeta, jsonLd } from '@/lib/seo'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { LanguageProvider } from '@/lib/LanguageContext'

export const metadata: Metadata = {
  metadataBase: new URL(siteMeta.url),
  title: {
    default: `${siteMeta.name} — ${siteMeta.tagline}`,
    template: `%s | ${siteMeta.name}`,
  },
  description: siteMeta.description.fr,
  keywords: siteMeta.keywords,
  openGraph: {
    type: 'website',
    locale: 'fr_CA',
    alternateLocale: 'en_CA',
    url: siteMeta.url,
    siteName: siteMeta.name,
    title: `${siteMeta.name} — ${siteMeta.tagline}`,
    description: siteMeta.description.fr,
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: siteMeta.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteMeta.name} — ${siteMeta.tagline}`,
    description: siteMeta.description.fr,
  },
  alternates: {
    canonical: siteMeta.url,
    languages: { 'fr-CA': siteMeta.url, 'en-CA': `${siteMeta.url}/en` },
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <LanguageProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}
