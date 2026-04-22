'use client'
import { useState } from 'react'
import { useLanguage } from '@/lib/LanguageContext'

type FormState = 'idle' | 'loading' | 'success' | 'error'

export default function OrderForm() {
  const { t } = useLanguage()
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
      <h3 className="font-syne text-xl font-bold text-[#0F0A06]">
        {t('Commande reçue !', 'Order received!')}
      </h3>
      <p className="text-[14px] text-[#9A8878] text-center max-w-sm font-light">
        {t(
          'Nous vous contactons dans les prochaines minutes pour confirmer votre commande.',
          'We\'ll contact you in the next few minutes to confirm your order.'
        )}
      </p>
      <button onClick={() => setState('idle')} className="mt-4 text-[11px] text-[#C41E1E] underline">
        {t('Nouvelle commande', 'New order')}
      </button>
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <h3 className="font-syne text-2xl font-bold text-[#0F0A06] mb-1">
        {t('Passer une commande', 'Place an order')}
      </h3>
      <p className="text-[13px] text-[#9A8878] mb-7 font-light">
        {t(
          'Nous vous contactons pour confirmer votre commande.',
          'We\'ll contact you to confirm your order.'
        )}
      </p>

      {field(t('Type de commande', 'Order type'), (
        <select
          value={form.type}
          onChange={e => setForm({...form, type: e.target.value})}
          className={inputCls}
        >
          <option value="pickup">{t('🏪 Cueillette au comptoir', '🏪 Pickup at counter')}</option>
          <option value="delivery">{t('🚗 Livraison locale', '🚗 Local delivery')}</option>
        </select>
      ))}

      <div className="grid grid-cols-2 gap-3">
        {field(t('Prénom', 'First name'), (
          <input
            required
            type="text"
            placeholder={t('Jean', 'John')}
            value={form.firstName}
            onChange={e => setForm({...form, firstName: e.target.value})}
            className={inputCls}
          />
        ))}
        {field(t('Nom', 'Last name'), (
          <input
            required
            type="text"
            placeholder={t('Dupont', 'Doe')}
            value={form.lastName}
            onChange={e => setForm({...form, lastName: e.target.value})}
            className={inputCls}
          />
        ))}
      </div>

      {field(t('Téléphone', 'Phone'), (
        <input
          required
          type="tel"
          placeholder="514-000-0000"
          value={form.phone}
          onChange={e => setForm({...form, phone: e.target.value})}
          className={inputCls}
        />
      ))}

      {field(t('Heure souhaitée', 'Preferred time'), (
        <select
          value={form.time}
          onChange={e => setForm({...form, time: e.target.value})}
          className={inputCls}
        >
          <option value="asap">{t('Dès que possible', 'As soon as possible')}</option>
          <option value="30min">{t('Dans 30 min', 'In 30 min')}</option>
          <option value="1h">{t('Dans 1 heure', 'In 1 hour')}</option>
          <option value="custom">{t('Autre heure', 'Other time')}</option>
        </select>
      ))}

      {field(t('Note (optionnel)', 'Note (optional)'), (
        <textarea
          rows={2}
          placeholder={t('Allergies, demandes spéciales...', 'Allergies, special requests...')}
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
        {state === 'loading'
          ? t('Envoi en cours...', 'Sending...')
          : t('Voir le menu & commander →', 'View the menu & order →')}
      </button>

      {state === 'error' && (
        <p className="text-center text-[12px] text-red-600 mt-3">
          {t(
            'Une erreur est survenue. Appelez-nous au 514-916-2478.',
            'Something went wrong. Please call us at 514-916-2478.'
          )}
        </p>
      )}

      <p className="text-[10px] text-[#9A8878] text-center mt-2.5 tracking-[0.04em]">
        {t(
          '🔒 Vos données sont sécurisées et ne sont jamais partagées',
          '🔒 Your data is secure and never shared'
        )}
      </p>
    </form>
  )
}
