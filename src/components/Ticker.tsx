'use client'
import { useLanguage } from '@/lib/LanguageContext'

const itemsFr = [
  'Couscous Royal', 'Boucherie Halal', 'Brik à l\'Œuf', 'Épicerie Maghrébine',
  'Kafteji Merguez', 'Commande sans frais Uber', 'Mosli d\'Agneau',
  'Livraison 5km', 'Thé à la Menthe', 'Doigts de Fatma',
]

const itemsEn = [
  'Royal Couscous', 'Halal Butcher', 'Egg Brik', 'Maghrebi Grocery',
  'Kafteji Merguez', 'Order with no Uber fees', 'Lamb Mosli',
  '5km Delivery', 'Mint Tea', 'Fatma\'s Fingers',
]

export default function Ticker() {
  const { lang } = useLanguage()
  const items = lang === 'en' ? itemsEn : itemsFr
  const doubled = [...items, ...items]
  return (
    <div className="bg-[#C41E1E] overflow-hidden py-3 relative">
      <div className="flex animate-ticker whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-5 px-5 text-[11px] tracking-[0.16em] uppercase text-white/85 font-inter">
            {item}
            <span className="inline-block w-1 h-1 rounded-full bg-white/30 flex-shrink-0" />
          </span>
        ))}
      </div>
    </div>
  )
}
