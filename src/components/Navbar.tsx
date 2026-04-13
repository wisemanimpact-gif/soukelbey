'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const links = [
  { href: '/restaurant', fr: 'Restaurant', en: 'Restaurant' },
  { href: '/boucherie',  fr: 'Boucherie',  en: 'Butcher'    },
  { href: '/epicerie',   fr: 'Épicerie',   en: 'Grocery'    },
  { href: '/blog',       fr: 'Blog',       en: 'Blog'        },
  { href: '/#contact',   fr: 'Contact',    en: 'Contact'     },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [lang, setLang]         = useState<'fr'|'en'>('fr')
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[5vw] h-16 transition-all duration-300 ${
        scrolled ? 'bg-[#FAFAF8]/96 backdrop-blur-xl border-b border-black/7 shadow-sm' : 'bg-transparent'
      }`}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5 no-underline">
        <div className="w-8 h-8 rounded-full bg-[#C41E1E] flex items-center justify-center flex-shrink-0">
          <svg viewBox="0 0 22 22" width="20" height="20" fill="none">
            <path d="M5 15 Q5.5 8 11 6.5 Q16.5 8 17 15Z" fill="white"/>
            <ellipse cx="11" cy="15.3" rx="7" ry="2" fill="rgba(255,255,255,0.35)"/>
            <line x1="11" y1="6.5" x2="15.5" y2="5" stroke="rgba(0,0,0,0.4)" strokeWidth="0.7"/>
            <circle cx="16" cy="4.5" r="1.2" fill="rgba(0,0,0,0.4)"/>
            <path d="M7.5 18 Q9.5 16.5 11 17.5 Q12.5 16.5 14.5 18" stroke="rgba(0,0,0,0.55)" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
            <path d="M7.5 18 Q6 19.5 5.5 19M14.5 18 Q16 19.5 16.5 19" stroke="rgba(0,0,0,0.45)" strokeWidth="1" fill="none" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="flex flex-col leading-none">
          <span className="text-[8px] tracking-[0.2em] uppercase text-[#9A8878] font-inter">Souk</span>
          <span className={`font-syne text-[17px] font-bold leading-none ${scrolled ? 'text-[#0F0A06]' : 'text-white'}`}>
            El <span className="text-[#C41E1E]">Bey</span>
          </span>
        </div>
      </Link>

      {/* Desktop links */}
      <ul className="hidden md:flex gap-7 list-none m-0 p-0">
        {links.map(l => (
          <li key={l.href}>
            <Link
              href={l.href}
              className={`text-[11px] tracking-[0.08em] no-underline transition-colors ${
                scrolled ? 'text-[#4A3828] hover:text-[#C41E1E]' : 'text-white/70 hover:text-white'
              }`}
            >
              {lang === 'fr' ? l.fr : l.en}
            </Link>
          </li>
        ))}
      </ul>

      {/* Right controls */}
      <div className="flex items-center gap-2.5">
        {/* Lang toggle */}
        <div className={`flex rounded overflow-hidden border ${scrolled ? 'border-black/12' : 'border-white/25'}`}>
          {(['fr','en'] as const).map(l => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-2.5 py-1 text-[10px] tracking-[0.08em] border-none cursor-pointer font-inter transition-all ${
                lang === l ? 'bg-[#C41E1E] text-white' : scrolled ? 'bg-transparent text-[#9A8878]' : 'bg-transparent text-white/60'
              }`}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>

        {/* CTA */}
        <Link
          href="/commander"
          className="bg-[#C41E1E] text-white px-4 py-2 text-[11px] tracking-[0.08em] rounded-sm font-medium hover:bg-[#A81818] transition-colors no-underline hidden sm:block"
        >
          Commander →
        </Link>

        {/* Mobile hamburger */}
        <button className="md:hidden flex flex-col gap-1 p-1" onClick={() => setOpen(!open)}>
          <span className={`block w-5 h-0.5 ${scrolled ? 'bg-[#0F0A06]' : 'bg-white'} transition-all`}/>
          <span className={`block w-5 h-0.5 ${scrolled ? 'bg-[#0F0A06]' : 'bg-white'} transition-all`}/>
          <span className={`block w-5 h-0.5 ${scrolled ? 'bg-[#0F0A06]' : 'bg-white'} transition-all`}/>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="absolute top-16 left-0 right-0 bg-[#FAFAF8] border-b border-black/7 py-4 md:hidden">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block px-8 py-3 text-[12px] tracking-[0.08em] text-[#4A3828] hover:text-[#C41E1E] no-underline"
            >
              {lang === 'fr' ? l.fr : l.en}
            </Link>
          ))}
          <div className="px-8 pt-2">
            <Link href="/commander" className="block text-center bg-[#C41E1E] text-white py-3 text-[11px] tracking-[0.1em] rounded-sm font-medium">
              Commander →
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
