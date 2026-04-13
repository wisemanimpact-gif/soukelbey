// ─── MENU DATA ───────────────────────────────────────────────
// Edit this file to update your menu — no code knowledge needed.
// Just change the text between the quotes and prices.

export type MenuItem = {
  id: string
  name: { fr: string; en: string }
  description: { fr: string; en: string }
  price: number
  category: 'plats' | 'sandwichs' | 'grillades' | 'douceurs'
  badge?: { fr: string; en: string }
}

export const menuItems: MenuItem[] = [
  {
    id: 'couscous-royal',
    name: { fr: 'Couscous Royal', en: 'Couscous Royal' },
    description: {
      fr: 'Semoule fine, légumes mijotés, souris d\'agneau braisée, merguez grillées et bouillon parfumé au ras-el-hanout.',
      en: 'Fine semolina, braised vegetables, lamb shank, grilled merguez and ras-el-hanout broth.',
    },
    price: 19.99,
    category: 'plats',
    badge: { fr: 'Signature maison', en: 'House Signature' },
  },
  {
    id: 'brik-oeuf',
    name: { fr: 'Brik à l\'œuf', en: 'Egg Brik' },
    description: {
      fr: 'Feuille de brick dorée, œuf, thon, câpres et harissa maison. Croustillante à l\'extérieur, fondante dedans.',
      en: 'Golden brick pastry, egg, tuna, capers and house harissa. Crispy outside, melting inside.',
    },
    price: 8.99,
    category: 'plats',
    badge: { fr: 'Entrée', en: 'Starter' },
  },
  {
    id: 'kafteji-merguez',
    name: { fr: 'Kafteji Merguez', en: 'Kafteji with Merguez' },
    description: {
      fr: 'Légumes frits à la tunisienne, merguez maison, œuf et sauce tomate épicée. Servi avec pain artisanal.',
      en: 'Tunisian fried vegetables, house merguez, egg and spiced tomato sauce. Served with artisan bread.',
    },
    price: 14.99,
    category: 'plats',
    badge: { fr: 'Populaire', en: 'Popular' },
  },
  {
    id: 'mosli-agneau',
    name: { fr: 'Mosli d\'Agneau', en: 'Braised Lamb Mosli' },
    description: {
      fr: 'Agneau mijoté lentement avec légumes, pois chiches et épices douces. Un classique des grandes occasions.',
      en: 'Slow-braised lamb with vegetables, chickpeas and gentle spices. A festive classic.',
    },
    price: 24.99,
    category: 'plats',
    badge: { fr: 'Spécialité', en: 'Specialty' },
  },
  {
    id: 'ojja-merguez',
    name: { fr: 'Ojja Merguez', en: 'Merguez Shakshuka' },
    description: {
      fr: 'Œufs mijotés dans sauce tomate aux poivrons grillés et merguez maison. Servi fumant dans la poêle.',
      en: 'Eggs simmered in roasted pepper tomato sauce with house merguez. Served sizzling in the pan.',
    },
    price: 13.99,
    category: 'plats',
  },
  {
    id: 'makloub-thon',
    name: { fr: 'Makloub Thon', en: 'Tuna Makloub' },
    description: {
      fr: 'Sandwich tunisien garni de thon, harissa, olives, câpres, frites et salade fraîche sur pain maison.',
      en: 'Tunisian sandwich with tuna, harissa, olives, capers, fries and fresh salad on house bread.',
    },
    price: 11.99,
    category: 'sandwichs',
  },
  {
    id: 'merguez-grillee',
    name: { fr: 'Merguez Grillées', en: 'Grilled Merguez' },
    description: {
      fr: 'Merguez maison bœuf & agneau, grillées à la braise. Servies avec pain, harissa et salade méchouia.',
      en: 'House beef & lamb merguez, charcoal grilled. Served with bread, harissa and mechouia salad.',
    },
    price: 16.99,
    category: 'grillades',
  },
  {
    id: 'baklava',
    name: { fr: 'Baklava Maison', en: 'House Baklava' },
    description: {
      fr: 'Feuilleté croustillant aux pistaches et amandes, imbibé de sirop de miel et d\'eau de rose.',
      en: 'Crispy pistachio and almond filo, soaked in honey and rose water syrup.',
    },
    price: 4.99,
    category: 'douceurs',
  },
]

export const categories = [
  { key: 'plats',     label: { fr: 'Plats',     en: 'Mains'    } },
  { key: 'sandwichs', label: { fr: 'Sandwichs', en: 'Sandwiches' } },
  { key: 'grillades', label: { fr: 'Grillades', en: 'Grills'    } },
  { key: 'douceurs',  label: { fr: 'Douceurs',  en: 'Sweets'   } },
]
