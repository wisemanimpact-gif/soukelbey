// ─── MENU DATA ───────────────────────────────────────────────
// Edit this file to update your menu — no code knowledge needed.
// Just change the text between the quotes and prices.

export type MenuItem = {
  id: string
  name: { fr: string; en: string }
  description: { fr: string; en: string }
  price: number
  sizes?: { label: string; price: number }[]
  category: 'pizzas' | 'plats' | 'grillades' | 'salades' | 'sandwichs' | 'extras' | 'boissons'
  badge?: { fr: string; en: string }
}

export const menuItems: MenuItem[] = [

  // ── PIZZAS ──────────────────────────────────────────────────
  {
    id: 'pizza-margherita',
    name: { fr: 'Margherita', en: 'Margherita' },
    description: {
      fr: 'Sauce tomate et mozzarella.',
      en: 'Tomato sauce and mozzarella.',
    },
    price: 12.99,
    sizes: [
      { label: '12"', price: 12.99 },
      { label: '16"', price: 16.99 },
    ],
    category: 'pizzas',
  },
  {
    id: 'pizza-neptune',
    name: { fr: 'Neptune', en: 'Neptune' },
    description: {
      fr: 'Sauce tomate, mozzarella, thon, olives et persil.',
      en: 'Tomato sauce, mozzarella, tuna, olives and parsley.',
    },
    price: 15.99,
    sizes: [
      { label: '12"', price: 15.99 },
      { label: '16"', price: 18.99 },
    ],
    category: 'pizzas',
  },
  {
    id: 'pizza-vegetarienne',
    name: { fr: 'Végétarienne', en: 'Vegetarian' },
    description: {
      fr: 'Sauce tomate, mozzarella, oignons, poivrons et champignons.',
      en: 'Tomato sauce, mozzarella, onions, peppers and mushrooms.',
    },
    price: 13.99,
    sizes: [
      { label: '12"', price: 13.99 },
      { label: '16"', price: 16.99 },
    ],
    category: 'pizzas',
  },
  {
    id: 'pizza-la-reine',
    name: { fr: 'La Reine', en: 'La Reine' },
    description: {
      fr: 'Sauce tomate, mozzarella, jambon de dinde et champignons.',
      en: 'Tomato sauce, mozzarella, turkey ham and mushrooms.',
    },
    price: 14.99,
    sizes: [
      { label: '12"', price: 14.99 },
      { label: '16"', price: 17.99 },
    ],
    category: 'pizzas',
  },
  {
    id: 'pizza-peperoni',
    name: { fr: 'Peperoni', en: 'Pepperoni' },
    description: {
      fr: 'Sauce tomate, mozzarella et peperoni.',
      en: 'Tomato sauce, mozzarella and pepperoni.',
    },
    price: 14.99,
    sizes: [
      { label: '12"', price: 14.99 },
      { label: '16"', price: 17.99 },
    ],
    category: 'pizzas',
  },
  {
    id: 'pizza-poulet',
    name: { fr: 'Poulet', en: 'Chicken' },
    description: {
      fr: 'Sauce tomate, mozzarella, poulet sauté, oignons et poivrons.',
      en: 'Tomato sauce, mozzarella, sautéed chicken, onions and peppers.',
    },
    price: 15.99,
    sizes: [
      { label: '12"', price: 15.99 },
      { label: '16"', price: 18.99 },
    ],
    category: 'pizzas',
  },
  {
    id: 'pizza-mexicaine',
    name: { fr: 'Mexicaine', en: 'Mexican' },
    description: {
      fr: 'Sauce tomate, mozzarella, oignons, poivrons et viande hachée.',
      en: 'Tomato sauce, mozzarella, onions, peppers and ground beef.',
    },
    price: 16.99,
    sizes: [
      { label: '12"', price: 16.99 },
      { label: '16"', price: 19.99 },
    ],
    category: 'pizzas',
  },
  {
    id: 'pizza-fruits-de-mer',
    name: { fr: 'Fruits de Mer', en: 'Seafood' },
    description: {
      fr: 'Sauce tomate, mozzarella, crevettes, calamars et moules.',
      en: 'Tomato sauce, mozzarella, shrimp, calamari and mussels.',
    },
    price: 18.99,
    sizes: [
      { label: '12"', price: 18.99 },
      { label: '16"', price: 24.99 },
    ],
    category: 'pizzas',
    badge: { fr: 'Populaire', en: 'Popular' },
  },

  // ── PLATS ───────────────────────────────────────────────────
  {
    id: 'kafteji',
    name: { fr: 'Kafteji', en: 'Kafteji' },
    description: {
      fr: 'Tastira (poivrons, piments et tomates et frites hachés), œuf au plat et frites.',
      en: 'Tastira (chopped peppers, chili and tomatoes with fries), fried egg and fries.',
    },
    price: 12.99,
    category: 'plats',
  },
  {
    id: 'tunisien',
    name: { fr: 'Tunisien', en: 'Tunisian' },
    description: {
      fr: 'Salade grillée, purée de carottes, cubes de pommes de terre, salade verte, œuf coulant, thon, olives et câpres.',
      en: 'Grilled salad, carrot purée, potato cubes, green salad, soft egg, tuna, olives and capers.',
    },
    price: 12.99,
    category: 'plats',
  },
  {
    id: 'ojja-merguez',
    name: { fr: 'Ojja Merguez', en: 'Merguez Shakshuka' },
    description: {
      fr: 'Sauce tomates, poivrons, merguez en morceaux et 2 œufs.',
      en: 'Tomato sauce, peppers, merguez pieces and 2 eggs.',
    },
    price: 16.99,
    category: 'plats',
  },
  {
    id: 'ojja-fruits-de-mer',
    name: { fr: 'Ojja Fruits de Mer', en: 'Seafood Shakshuka' },
    description: {
      fr: 'Sauce tomates, poivrons, crevettes, calamars, moules et 2 œufs.',
      en: 'Tomato sauce, peppers, shrimp, calamari, mussels and 2 eggs.',
    },
    price: 22.99,
    category: 'plats',
    badge: { fr: 'Spécialité', en: 'Specialty' },
  },
  {
    id: 'escalope-poulet-panee',
    name: { fr: 'Escalope de Poulet Panée', en: 'Breaded Chicken Escalope' },
    description: {
      fr: 'Servi avec une sauce blanche aux champignons, salade verte et frites.',
      en: 'Served with a mushroom white sauce, green salad and fries.',
    },
    price: 15.99,
    category: 'plats',
  },
  {
    id: 'escalope-poulet-grille',
    name: { fr: 'Escalope de Poulet Grillée', en: 'Grilled Chicken Escalope' },
    description: {
      fr: 'Servi avec une salade grillée, salade verte et frites.',
      en: 'Served with a grilled salad, green salad and fries.',
    },
    price: 15.99,
    category: 'plats',
  },
  {
    id: 'daurade-grillee',
    name: { fr: 'Daurade Grillée', en: 'Grilled Sea Bream' },
    description: {
      fr: 'Servie avec une tastira, salade verte et frites.',
      en: 'Served with tastira, green salad and fries.',
    },
    price: 18.99,
    category: 'plats',
  },
  {
    id: 'spaghetti-fruits-de-mer',
    name: { fr: 'Spaghetti aux Fruits de Mer', en: 'Seafood Spaghetti' },
    description: {
      fr: 'En sauce tomates ou en sauce blanche.',
      en: 'In tomato sauce or white sauce.',
    },
    price: 23.99,
    category: 'plats',
  },
  {
    id: 'penne-puttanesca',
    name: { fr: 'Penne Alla Puttanesca', en: 'Penne Alla Puttanesca' },
    description: {
      fr: 'Sauce tomate, piments, olives, câpres, thon et parmesan.',
      en: 'Tomato sauce, chili, olives, capers, tuna and parmesan.',
    },
    price: 17.99,
    category: 'plats',
  },
  {
    id: 'couscous-agneau-legumes',
    name: { fr: 'Couscous à l\'Agneau et Légumes', en: 'Lamb & Vegetable Couscous' },
    description: {
      fr: 'Semoule fine, légumes mijotés et agneau tendre, bouillon parfumé aux épices tunisiennes.',
      en: 'Fine semolina, braised vegetables and tender lamb, broth spiced with Tunisian spices.',
    },
    price: 19.99,
    category: 'plats',
    badge: { fr: 'Signature maison', en: 'House Signature' },
  },

  // ── GRILLADES ───────────────────────────────────────────────
  {
    id: 'grillade-mixte-1',
    name: { fr: 'Grillade Mixte — 1 personne', en: 'Mixed Grill — 1 person' },
    description: {
      fr: '1 brochette de kefta, 1 brochette de poulet, 1 côtelette d\'agneau, 2 merguez. Accompagnée de tastira, salade grillée et frites.',
      en: '1 kefta skewer, 1 chicken skewer, 1 lamb chop, 2 merguez. Served with tastira, grilled salad and fries.',
    },
    price: 29.99,
    category: 'grillades',
  },
  {
    id: 'grillade-mixte-2',
    name: { fr: 'Grillade Mixte — 2 personnes', en: 'Mixed Grill — 2 persons' },
    description: {
      fr: '1 côte de bœuf, 2 brochettes de kefta, 2 brochettes de poulet, 4 côtelettes d\'agneau, 4 merguez. Accompagnée de tastira, salade grillée, salade verte et frites.',
      en: '1 beef rib, 2 kefta skewers, 2 chicken skewers, 4 lamb chops, 4 merguez. Served with tastira, grilled salad, green salad and fries.',
    },
    price: 59.99,
    category: 'grillades',
    badge: { fr: 'Pour 2', en: 'For 2' },
  },
  {
    id: 'grillade-mixte-4',
    name: { fr: 'Grillade Mixte Souk El Bey "Terre et Mer" — 4 personnes', en: 'Souk El Bey Mixed Grill "Land & Sea" — 4 persons' },
    description: {
      fr: '2 côtes de bœuf, 4 brochettes de kefta, 4 brochettes de poulet, 4 côtelettes d\'agneau, 4 merguez, 2 daurades, 4 brochettes de crevettes, calamars dorés. Accompagnée de tastira, salade grillée, salade verte et frites.',
      en: '2 beef ribs, 4 kefta skewers, 4 chicken skewers, 4 lamb chops, 4 merguez, 2 sea bream, 4 shrimp skewers, golden calamari. Served with tastira, grilled salad, green salad and fries.',
    },
    price: 159.99,
    category: 'grillades',
    badge: { fr: 'Pour 4', en: 'For 4' },
  },

  // ── SALADES & HORS D'ŒUVRE ───────────────────────────────────
  {
    id: 'salade-souk-el-bey',
    name: { fr: 'Salade Souk El Bey', en: 'Souk El Bey Salad' },
    description: {
      fr: 'Salade grillée, salade de pomme de terre, purée de carotte à la tunisienne et salade verte.',
      en: 'Grilled salad, potato salad, Tunisian carrot purée and green salad.',
    },
    price: 12.99,
    category: 'salades',
    badge: { fr: 'Maison', en: 'House' },
  },
  {
    id: 'salade-cesar',
    name: { fr: 'Salade César', en: 'Caesar Salad' },
    description: {
      fr: 'Laitue, sauce césar, blanc de poulet, croutons de pain et parmesan.',
      en: 'Lettuce, caesar dressing, chicken breast, croutons and parmesan.',
    },
    price: 14.99,
    category: 'salades',
  },
  {
    id: 'salade-grecque',
    name: { fr: 'Salade Grecque', en: 'Greek Salad' },
    description: {
      fr: 'Tomates, oignons, concombres, poivrons, olives Kalamata et feta.',
      en: 'Tomatoes, onions, cucumbers, peppers, Kalamata olives and feta.',
    },
    price: 13.99,
    category: 'salades',
  },
  {
    id: 'omelette-souk-el-bey',
    name: { fr: 'Omelette Souk El Bey', en: 'Souk El Bey Omelette' },
    description: {
      fr: '3 œufs, fromage, oignon, persil, olives, câpres et thon.',
      en: '3 eggs, cheese, onion, parsley, olives, capers and tuna.',
    },
    price: 15.99,
    category: 'salades',
  },
  {
    id: 'brick-thon',
    name: { fr: 'Brick au Thon', en: 'Tuna Brick' },
    description: {
      fr: 'Feuille de brick croustillante garnie de thon, œuf et épices tunisiennes.',
      en: 'Crispy brick pastry filled with tuna, egg and Tunisian spices.',
    },
    price: 5.99,
    category: 'salades',
  },
  {
    id: 'brick-chevrettes',
    name: { fr: 'Brick aux Chevrettes', en: 'Shrimp Brick' },
    description: {
      fr: 'Feuille de brick croustillante garnie de chevrettes et épices.',
      en: 'Crispy brick pastry filled with shrimp and spices.',
    },
    price: 6.99,
    category: 'salades',
  },
  {
    id: 'brick-viande',
    name: { fr: 'Brick à la Viande Hachée', en: 'Ground Beef Brick' },
    description: {
      fr: 'Feuille de brick croustillante garnie de viande hachée épicée.',
      en: 'Crispy brick pastry filled with spiced ground beef.',
    },
    price: 6.99,
    category: 'salades',
  },
  {
    id: 'fricasse',
    name: { fr: 'Fricassé', en: 'Fricassé' },
    description: {
      fr: 'Mini sandwich de beignet à la sauce harissa, pomme de terre, thon, œuf dur et olives. Uniquement sur commande 1 heure à l\'avance.',
      en: 'Mini donut sandwich with harissa sauce, potato, tuna, hard-boiled egg and olives. Order 1 hour in advance.',
    },
    price: 2.99,
    category: 'salades',
    badge: { fr: 'Sur commande', en: 'Pre-order' },
  },

  // ── SANDWICHS ────────────────────────────────────────────────
  {
    id: 'sandwich-kafteji',
    name: { fr: 'Kafteji', en: 'Kafteji' },
    description: {
      fr: 'Tomates, poivrons et piments frits et hachés, accompagnés d\'un œuf au plat et frites.',
      en: 'Fried and chopped tomatoes, peppers and chili, with a fried egg and fries.',
    },
    price: 11.99,
    category: 'sandwichs',
  },
  {
    id: 'sandwich-tunisien',
    name: { fr: 'Tunisien', en: 'Tunisian' },
    description: {
      fr: 'Salade grillée, pommes de terre cuites, chapati omok houriya (purée de carottes épicée), thon, œuf dur et olives.',
      en: 'Grilled salad, cooked potatoes, chapati omok houriya (spiced carrot purée), tuna, hard-boiled egg and olives.',
    },
    price: 12.99,
    category: 'sandwichs',
  },
  {
    id: 'sandwich-chapati',
    name: { fr: 'Chapati Souk El Bey', en: 'Souk El Bey Chapati' },
    description: {
      fr: 'Sauce harissa et mayonnaise, salade grillée, omelette au fromage et persil, thon et olives.',
      en: 'Harissa and mayonnaise sauce, grilled salad, cheese and parsley omelette, tuna and olives.',
    },
    price: 11.99,
    category: 'sandwichs',
    badge: { fr: 'Maison', en: 'House' },
  },
  {
    id: 'sandwich-merguez',
    name: { fr: 'Merguez', en: 'Merguez' },
    description: {
      fr: 'Sauce harissa et mayonnaise, salade grillée, oignons, tomates, 2 merguez en morceaux et frites.',
      en: 'Harissa and mayonnaise sauce, grilled salad, onions, tomatoes, 2 merguez pieces and fries.',
    },
    price: 14.99,
    category: 'sandwichs',
  },
  {
    id: 'sandwich-escalope',
    name: { fr: 'Escalope de Poulet', en: 'Chicken Escalope' },
    description: {
      fr: 'Sauce harissa et mayonnaise, salade grillée, escalope de poulet grillée.',
      en: 'Harissa and mayonnaise sauce, grilled salad, grilled chicken escalope.',
    },
    price: 13.99,
    category: 'sandwichs',
  },
  {
    id: 'baguette-farcie',
    name: { fr: 'Baguette Farcie', en: 'Stuffed Baguette' },
    description: {
      fr: 'Pate à pizza roulée, blanc de poulet sauté ou viande hachée ou thon, oignons, fromage et olives.',
      en: 'Rolled pizza dough, sautéed chicken or ground beef or tuna, onions, cheese and olives.',
    },
    price: 14.99,
    category: 'sandwichs',
  },
  {
    id: 'makloub',
    name: { fr: 'Makloub', en: 'Makloub' },
    description: {
      fr: 'Pate à pizza étalée, blanc de poulet sauté ou viande hachée ou thon, fromage gratiné, oignons, tomates, laitue et olives.',
      en: 'Flat pizza dough, sautéed chicken or ground beef or tuna, melted cheese, onions, tomatoes, lettuce and olives.',
    },
    price: 15.99,
    category: 'sandwichs',
  },
  {
    id: 'calzzone',
    name: { fr: 'Calzzone', en: 'Calzone' },
    description: {
      fr: 'Pate à pizza fermée en demi-lune, sauce tomate, mozzarella, thon, oignons, olives, persil et tranche de cheddar.',
      en: 'Folded pizza dough, tomato sauce, mozzarella, tuna, onions, olives, parsley and cheddar slice.',
    },
    price: 17.99,
    category: 'sandwichs',
  },
  {
    id: 'hamburger-classique',
    name: { fr: 'Hamburger Classique', en: 'Classic Burger' },
    description: {
      fr: 'Sauce relish, oignons, tomates, laitue, galette de viande, tranche de cheddar et cornichons.',
      en: 'Relish sauce, onions, tomatoes, lettuce, beef patty, cheddar slice and pickles.',
    },
    price: 11.99,
    category: 'sandwichs',
  },
  {
    id: 'chicken-burger-classique',
    name: { fr: 'Chicken Burger Classique', en: 'Classic Chicken Burger' },
    description: {
      fr: 'Sauce relish, oignons, tomates, laitue, escalope de poulet pané, tranche de cheddar et cornichons.',
      en: 'Relish sauce, onions, tomatoes, lettuce, breaded chicken escalope, cheddar slice and pickles.',
    },
    price: 11.99,
    category: 'sandwichs',
  },

  // ── EXTRAS ──────────────────────────────────────────────────
  {
    id: 'extra-cotelette-agneau',
    name: { fr: 'Côtelette d\'Agneau', en: 'Lamb Chop' },
    description: { fr: 'Extra côtelette d\'agneau grillée.', en: 'Extra grilled lamb chop.' },
    price: 8.99,
    category: 'extras',
  },
  {
    id: 'extra-merguez-poulet',
    name: { fr: 'Merguez / Poulet / Galette de Viande', en: 'Merguez / Chicken / Beef Patty' },
    description: { fr: 'Extra au choix : merguez, poulet ou galette de viande.', en: 'Choice of extra: merguez, chicken or beef patty.' },
    price: 4.99,
    category: 'extras',
  },
  {
    id: 'extra-thon',
    name: { fr: 'Thon', en: 'Tuna' },
    description: { fr: 'Extra thon.', en: 'Extra tuna.' },
    price: 2.99,
    category: 'extras',
  },
  {
    id: 'extra-fromage',
    name: { fr: 'Fromage Cheddar / Mozzarella', en: 'Cheddar / Mozzarella' },
    description: { fr: 'Extra fromage cheddar ou mozzarella.', en: 'Extra cheddar or mozzarella cheese.' },
    price: 2.99,
    category: 'extras',
  },
  {
    id: 'extra-frites',
    name: { fr: 'Frites', en: 'Fries' },
    description: { fr: 'Portion de frites.', en: 'Portion of fries.' },
    price: 3.99,
    category: 'extras',
  },
  {
    id: 'extra-pain-tabouna',
    name: { fr: 'Pain Tabouna Fait Maison', en: 'Homemade Tabouna Bread' },
    description: { fr: 'Pain tabouna traditionnel fait maison.', en: 'Traditional homemade tabouna bread.' },
    price: 1.99,
    category: 'extras',
  },

  // ── BOISSONS ────────────────────────────────────────────────
  {
    id: 'cafe',
    name: { fr: 'Café', en: 'Coffee' },
    description: { fr: 'Café servi chaud.', en: 'Hot coffee.' },
    price: 3.49,
    category: 'boissons',
  },
  {
    id: 'the-vert',
    name: { fr: 'Thé Vert', en: 'Green Tea' },
    description: { fr: 'Thé vert servi chaud.', en: 'Hot green tea.' },
    price: 3.49,
    category: 'boissons',
  },
  {
    id: 'eau-minerale',
    name: { fr: 'Eau Minérale', en: 'Mineral Water' },
    description: { fr: 'Bouteille d\'eau minérale.', en: 'Bottle of mineral water.' },
    price: 1.99,
    category: 'boissons',
  },
  {
    id: 'boisson-gazeuse',
    name: { fr: 'Boisson Gazeuse', en: 'Soft Drink' },
    description: { fr: 'Boisson gazeuse en canette.', en: 'Canned soft drink.' },
    price: 2.99,
    category: 'boissons',
  },
  {
    id: 'jus',
    name: { fr: 'Jus', en: 'Juice' },
    description: { fr: 'Jus de fruits frais.', en: 'Fresh fruit juice.' },
    price: 2.49,
    category: 'boissons',
  },
  {
    id: 'citronnade',
    name: { fr: 'Citronnade', en: 'Lemonade' },
    description: { fr: 'Citronnade fraîche maison.', en: 'Fresh homemade lemonade.' },
    price: 5.99,
    category: 'boissons',
    badge: { fr: 'Maison', en: 'House' },
  },
]

export const categories = [
  { key: 'pizzas',    label: { fr: 'Pizzas',            en: 'Pizzas'      } },
  { key: 'plats',     label: { fr: 'Plats',             en: 'Mains'       } },
  { key: 'grillades', label: { fr: 'Grillades',         en: 'Grills'      } },
  { key: 'salades',   label: { fr: 'Salades & Entrées', en: 'Salads'      } },
  { key: 'sandwichs', label: { fr: 'Sandwichs',         en: 'Sandwiches'  } },
  { key: 'extras',    label: { fr: 'Extras',            en: 'Extras'      } },
  { key: 'boissons',  label: { fr: 'Boissons',          en: 'Drinks'      } },
]
