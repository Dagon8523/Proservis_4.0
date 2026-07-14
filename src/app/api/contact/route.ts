import { NextRequest, NextResponse } from 'next/server'
import { ContactFormData } from '@/types'

// Rate limiting simple en memoria (producción: usar Redis/Upstash)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const limit = rateLimitMap.get(ip)
  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60 * 1000 })
    return true
  }
  if (limit.count >= 3) return false
  limit.count++
  return true
}

function validateForm(data: ContactFormData): string | null {
  if (!data.nombre?.trim() || data.nombre.trim().length < 2) return 'Nombre inválido'
  if (!data.correo?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) return 'Correo inválido'
  if (!data.telefono?.match(/^[0-9+\s\-()]{7,15}$/)) return 'Teléfono inválido'
  if (!data.ciudadOrigen?.trim()) return 'Ciudad origen requerida'
  if (!data.ciudadDestino?.trim()) return 'Ciudad destino requerida'
  if (!data.tipoCarga?.trim()) return 'Tipo de carga requerido'
  return null
}

function buildEmailHtml(data: ContactFormData): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f5f7fa; padding: 20px; border-radius: 12px;">
      <div style="background: #003B8E; padding: 24px; border-radius: 8px 8px 0 0; text-align: center;">
        <h1 style="color: #FFC300; margin: 0; font-size: 24px;">PROSERVIS S.A.S.</h1>
        <p style="color: #fff; margin: 8px 0 0; font-size: 14px;">Nueva Solicitud de Cotización</p>
      </div>
      <div style="background: #fff; padding: 24px; border-radius: 0 0 8px 8px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px; font-weight: bold; color: #003B8E; width: 40%;">Nombre:</td><td style="padding: 8px;">${data.nombre}</td></tr>
          <tr style="background: #f5f7fa;"><td style="padding: 8px; font-weight: bold; color: #003B8E;">Empresa:</td><td style="padding: 8px;">${data.empresa || 'No especificada'}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; color: #003B8E;">Teléfono:</td><td style="padding: 8px;">${data.telefono}</td></tr>
          <tr style="background: #f5f7fa;"><td style="padding: 8px; font-weight: bold; color: #003B8E;">Correo:</td><td style="padding: 8px;">${data.correo}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; color: #003B8E;">Ciudad Origen:</td><td style="padding: 8px;">${data.ciudadOrigen}</td></tr>
          <tr style="background: #f5f7fa;"><td style="padding: 8px; font-weight: bold; color: #003B8E;">Ciudad Destino:</td><td style="padding: 8px;">${data.ciudadDestino}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; color: #003B8E;">Tipo de Carga:</td><td style="padding: 8px;">${data.tipoCarga}</td></tr>
          <tr style="background: #f5f7fa;"><td style="padding: 8px; font-weight: bold; color: #003B8E;">Peso Aprox.:</td><td style="padding: 8px;">${data.pesoAproximado || 'No especificado'}</td></tr>
        </table>
        ${data.mensaje ? `<div style="margin-top: 16px; padding: 16px; background: #f5f7fa; border-radius: 8px; border-left: 4px solid #FFC300;"><strong style="color: #003B8E;">Mensaje:</strong><p style="margin: 8px 0 0;">${data.mensaje}</p></div>` : ''}
        <p style="margin-top: 24px; font-size: 12px; color: #666;">Enviado desde el formulario web de PROSERVIS S.A.S. | ${new Date().toLocaleString('es-CO')}</p>
      </div>
    </div>
  `
}

function buildSubject(data: ContactFormData): string {
  return `Cotización: ${data.tipoCarga} | ${data.ciudadOrigen} → ${data.ciudadDestino} | ${data.nombre}`
}

/**
 * Opción A (recomendada): Resend.
 * Solo requiere una variable de entorno: RESEND_API_KEY.
 * No necesita contraseña de aplicación de Gmail ni configuración SMTP.
 * 1) Crear cuenta gratis en https://resend.com
 * 2) Generar API Key
 * 3) Pegarla en .env.local como RESEND_API_KEY=re_xxxxxxxx
 * 4) (Opcional) Verificar un dominio propio en Resend para enviar desde
 *    notificaciones@proservis.com.co. Mientras no se verifique un dominio,
 *    Resend permite enviar de forma inmediata usando su remitente de pruebas
 *    onboarding@resend.dev, lo cual es suficiente para producción ligera.
 */
async function sendEmailResend(data: ContactFormData): Promise<void> {
  const { Resend } = await import('resend')
  const resend = new Resend(process.env.RESEND_API_KEY)

  const fromAddress = process.env.RESEND_FROM || 'PROSERVIS Web <onboarding@resend.dev>'

  const { error } = await resend.emails.send({
    from: fromAddress,
    to: process.env.CONTACT_EMAIL || 'proservisvigia@gmail.com',
    replyTo: data.correo,
    subject: buildSubject(data),
    html: buildEmailHtml(data),
  })

  if (error) {
    throw new Error(typeof error === 'string' ? error : error.message || 'Error enviando con Resend')
  }
}

/**
 * Opción B (alternativa): SMTP con Nodemailer (Gmail u otro proveedor).
 * Requiere SMTP_USER + SMTP_PASS (contraseña de aplicación, no la contraseña normal de Gmail).
 * Se usa automáticamente solo si no hay RESEND_API_KEY configurada.
 */
async function sendEmailNodemailer(data: ContactFormData): Promise<void> {
  const nodemailer = await import('nodemailer')

  const transporter = nodemailer.default.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  await transporter.sendMail({
    from: `"PROSERVIS Web" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_EMAIL || 'proservisvigia@gmail.com',
    replyTo: data.correo,
    subject: buildSubject(data),
    html: buildEmailHtml(data),
  })
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'

    if (!checkRateLimit(ip)) {
      return NextResponse.json({ success: false, message: 'Demasiadas solicitudes. Intente en un minuto.' }, { status: 429 })
    }

    const body: ContactFormData = await request.json()

    // Honeypot anti-spam
    if (body.honeypot) {
      return NextResponse.json({ success: true, message: 'Formulario enviado correctamente.' })
    }

    const validationError = validateForm(body)
    if (validationError) {
      return NextResponse.json({ success: false, message: validationError }, { status: 400 })
    }

    if (process.env.RESEND_API_KEY) {
      // ✅ Resend configurado: forma recomendada, solo con la API key.
      await sendEmailResend(body)
    } else if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      // Alternativa SMTP/Nodemailer configurada.
      await sendEmailNodemailer(body)
    } else {
      // Modo demo: ninguna credencial configurada aún, se registra en consola.
      console.log('📦 PROSERVIS - Nueva cotización recibida (modo demo, configure RESEND_API_KEY):', {
        nombre: body.nombre,
        correo: body.correo,
        ruta: `${body.ciudadOrigen} → ${body.ciudadDestino}`,
        carga: body.tipoCarga,
      })
    }

    return NextResponse.json({
      success: true,
      message: '¡Cotización enviada! Nos comunicaremos con usted en menos de 2 horas.',
    })
  } catch (error) {
    console.error('Error en /api/contact:', error)
    return NextResponse.json({ success: false, message: 'Error al enviar. Contáctenos por WhatsApp.' }, { status: 500 })
  }
}
