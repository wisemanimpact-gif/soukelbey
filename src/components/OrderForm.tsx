'use client'
import { useState } from 'react'

type FormState = 'idle' | 'loading' | 'success' | 'error'

export default function OrderForm() {
  const [state, setState] = useState<FormState>('idle')
  const [form, setForm] = useState({
    type: 'pickup', firstName: '', lastName: '', phone: '', time: 'asap', note: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setState('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setState(res.ok ? 'success' : 'error')
    } catch {
      setState('error')
    }
  }

  const field = (label: string, children: React.ReactNode) => (
    <div className="mb-4">
      <label className="block text-[9px] tracking-[0.16em] uppercase text-[#9A8878] mb-1.5 font-medium font-inter">
        {label}
      </label>
      {children}
    </div>
  )

  const inputCls = "w-full px-3.5 py-2.5 border border-black/12 rounded-sm bg-white text-[14px] text-[#0F0A06] font-light font-inter focus:outline-none focus:border-[#C41E1E] focus:ring-2 focus:ring-[#C41E1E]/8 transition-all"

  if (state === 'success') return (
    <div className="flex flex-col items-center justify-center py-16 gap-4">
      <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-2xl">✓</div>
      <h3 className="font-syne text-xl font-bold text-[#0F0A06]">Commande reçue !</h3>
      <p className="text-[14px] text-[#9A8878] text-center max-w-sm font-light">
        Nous vous contactons dans les prochaines minutes pour confirmer votre commande.
      </p>
      <button onClick={() => setState('idle')} className="mt-4 text-[11px] text-[#C41E1E] underline">
        Nouvelle commande
      </button>
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <h3 className="font-syne text-2xl font-bold text-[#0F0A06] mb-1">Passer une commande</h3>
      <p className="text-[13px] text-[#9A8878] mb-7 font-light">
        Nous vous contactons pour confirmer votre commande.
      </p>

      {field('Type de commande', (
        <select
          value={form.type}
          onChange={e => setForm({...form, type: e.target.value})}
          className={inputCls}
        >
          <option value="pickup">🏪 Cueillette au comptoir · Pickup</option>
          <option value="delivery">🚗 Livraison locale · Local Delivery</option>
        </select>
      ))}

      <div className="grid grid-cols-2 gap-3">
        {field('Prénom · First name', (
          <input
            required
            type="text"
            placeholder="Jean"
            value={form.firstName}
            onChange={e => setForm({...form, firstName: e.target.value})}
            className={inputCls}
          />
        ))}
        {field('Nom · Last name', (
          <input
            required
            type="text"
            placeholder="Dupont"
            value={form.lastName}
            onChange={e => setForm({...form, lastName: e.target.value})}
            className={inputCls}
          />
        ))}
      </div>

      {field('Téléphone · Phone', (
        <input
          required
          type="tel"
          placeholder="514-000-0000"
          value={form.phone}
          onChange={e => setForm({...form, phone: e.target.value})}
          className={inputCls}
        />
      ))}

      {field('Heure souhaitée · Preferred time', (
        <select
          value={form.time}
          onChange={e => setForm({...form, time: e.target.value})}
          className={inputCls}
        >
          <option value="asap">Dès que possible · ASAP</option>
          <option value="30min">Dans 30 min</option>
          <option value="1h">Dans 1 heure</option>
          <option value="custom">Autre heure</option>
        </select>
      ))}

      {field('Note (optionnel) · Note (optional)', (
        <textarea
          rows={2}
          placeholder="Allergies, demandes spéciales..."
          value={form.note}
          onChange={e => setForm({...form, note: e.target.value})}
          className={`${inputCls} resize-none`}
        />
      ))}

      <button
        type="submit"
        disabled={state === 'loading'}
        className="w-full bg-[#C41E1E] text-white py-3.5 text-[11px] tracking-[0.1em] uppercase font-medium font-inter rounded-sm mt-1 transition-all hover:bg-[#A81818] hover:shadow-[0_6px_20px_rgba(196,30,30,0.3)] hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {state === 'loading' ? 'Envoi en cours...' : 'Voir le menu & commander →'}
      </button>

      {state === 'error' && (
        <p className="text-center text-[12px] text-red-600 mt-3">
          Une erreur est survenue. Appelez-nous au 514-916-2478.
        </p>
      )}

      <p className="text-[10px] text-[#9A8878] text-center mt-2.5 tracking-[0.04em]">
        🔒 Vos données sont sécurisées et ne sont jamais partagées
      </p>
    </form>
  )
}
