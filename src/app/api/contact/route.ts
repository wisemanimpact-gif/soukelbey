import { NextRequest, NextResponse } from 'next/server'

// ─── EMAIL CONFIG ─────────────────────────────────────────────
// Set these in your .env.local file:
//   EMAIL_USER=your-gmail@gmail.com
//   EMAIL_PASS=your-app-password   (Google App Password, not your real password)
//   EMAIL_TO=soukelbey2montagnes@gmail.com

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { type, firstName, lastName, phone, time, note } = body

    // Validate required fields
    if (!firstName || !lastName || !phone) {
      return NextResponse.json({ error: 'Champs requis manquants' }, { status: 400 })
    }

    // Format email content
    const typeLabel = type === 'pickup' ? '🏪 Cueillette au comptoir' : '🚗 Livraison locale'
    const timeLabel: Record<string, string> = {
      asap: 'Dès que possible', '30min': 'Dans 30 min', '1h': 'Dans 1 heure', custom: 'Autre heure',
    }

    const emailBody = `
🧆 NOUVELLE COMMANDE — SOUK EL BEY
=====================================
Nom:    ${firstName} ${lastName}
Tél:    ${phone}
Type:   ${typeLabel}
Heure:  ${timeLabel[time] || time}
Note:   ${note || '—'}
=====================================
Répondre à ce courriel ou appeler le client directement.
    `.trim()

    // Dynamic import to avoid issues with static export
    // On WCH with Node.js, this will work at runtime
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const nodemailer = await import('nodemailer')
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
      })
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_TO || 'soukelbey2montagnes@gmail.com',
        subject: `🧆 Nouvelle commande — ${firstName} ${lastName} (${typeLabel})`,
        text: emailBody,
      })
    } else {
      // Dev mode — just log to console
      console.log('📧 ORDER (no email config):\n', emailBody)
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
