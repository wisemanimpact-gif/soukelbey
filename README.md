# Souk El Bey — Website

**Stack:** Next.js 14 · TypeScript · Tailwind CSS  
**Hosting:** WCH (Web Hosting Canada) via static export  
**Domain:** soukelbey.ca

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

## Add your photos

Replace the placeholder `<div>` blocks in `src/app/page.tsx` with:

```jsx
<Image src="/images/hero.jpg" alt="Souk El Bey" fill className="object-cover" priority />
```

Put your photos in `public/images/`:
- `hero.jpg` — hero background (1920×1080)
- `story-main.jpg` — restaurant ambiance
- `story-food.jpg` — signature dish
- `story-shop.jpg` — épicerie
- `boucherie.jpg` — butcher / meat
- `og-image.jpg` — social share preview (1200×630)

## Update your menu

Edit `src/lib/menu.ts` — no coding required, just change text and prices.

## Update contact/SEO info

Edit `src/lib/seo.ts` — address, phone, hours, social links.

## Setup email notifications

```bash
cp .env.local.example .env.local
# Fill in your Gmail + App Password
```

## Deploy on WCH

1. `npm run build` — generates `out/` folder
2. Push to GitHub
3. WCH cPanel → Git Version Control → connect your repo
4. Set deploy path to `out/` or `public_html/`

## Add Stripe (next step)

Ask Claude: "Add Stripe checkout to the order form"
