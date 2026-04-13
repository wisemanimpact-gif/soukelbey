// ─── SEO / AEO METADATA ──────────────────────────────────────
// Centralized SEO config. Edit once, applies everywhere.

export const siteMeta = {
  name: 'Souk El Bey',
  tagline: 'Restaurant Tunisien, Boucherie Halal & Épicerie — Deux-Montagnes, QC',
  url: 'https://soukelbey.ca',
  description: {
    fr: 'Restaurant tunisien authentique, boucherie halal certifiée et épicerie maghrébine à Deux-Montagnes, Québec. Couscous royal, brik, kafteji, merguez — commandez en ligne sans frais.',
    en: 'Authentic Tunisian restaurant, certified halal butcher and Maghreb grocery in Deux-Montagnes, Quebec. Couscous royal, brik, kafteji, merguez — order online with no platform fees.',
  },
  keywords: [
    'restaurant tunisien Deux-Montagnes',
    'restaurant halal Québec',
    'boucherie halal Deux-Montagnes',
    'couscous tunisien Québec',
    'épicerie maghrébine Rive-Nord',
    'commander tunisien en ligne',
    'halal butcher Quebec',
    'Tunisian food Montreal',
  ],
  address: {
    street: '1910 chemin d\'Oka',
    city: 'Deux-Montagnes',
    province: 'QC',
    postalCode: 'J7R 1N4',
    country: 'CA',
  },
  phone: '+15149162478',
  email: 'soukelbey2montagnes@gmail.com',
  hours: {
    fr: 'Mar–Sam 10h–20h · Dim 11h–20h · Lun fermé',
    en: 'Tue–Sat 10am–8pm · Sun 11am–8pm · Mon closed',
  },
  social: {
    facebook: 'https://www.facebook.com/people/SOUK-El-BEY/61566128896402/',
  },
}

// JSON-LD structured data for Google & AI (AEO)
export const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: siteMeta.name,
  description: siteMeta.description.fr,
  url: siteMeta.url,
  telephone: siteMeta.phone,
  email: siteMeta.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: siteMeta.address.street,
    addressLocality: siteMeta.address.city,
    addressRegion: siteMeta.address.province,
    postalCode: siteMeta.address.postalCode,
    addressCountry: siteMeta.address.country,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 45.5598,
    longitude: -73.8836,
  },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Tuesday','Wednesday','Thursday','Friday','Saturday'], opens: '10:00', closes: '20:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Sunday'], opens: '11:00', closes: '20:00' },
  ],
  servesCuisine: ['Tunisian', 'North African', 'Maghrebi', 'Halal'],
  priceRange: '$$',
  hasMenu: `${siteMeta.url}/menu`,
  acceptsReservations: true,
  keywords: siteMeta.keywords.join(', '),
}
