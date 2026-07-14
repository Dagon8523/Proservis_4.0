'use client'
import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Send, Phone, Mail, MessageCircle, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import type { ContactFormData, ApiResponse } from '@/types'

const cargoOptions = [
  'Carga seca general',
  'Carga industrial',
  'Carga pesada / sobredimensionada',
  'Maquinaria y equipos',
  'Materiales de construcción',
  'Carga refrigerada',
  'Equipos tecnológicos',
  'Contenedores',
  'Otro',
]

const cities = ['Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena', 'Bucaramanga', 'Pereira', 'Manizales', 'Villavicencio', 'Cúcuta', 'Otra ciudad']

const initialForm: ContactFormData = {
  nombre: '', empresa: '', telefono: '', correo: '',
  ciudadOrigen: '', ciudadDestino: '', tipoCarga: '', pesoAproximado: '', mensaje: '', honeypot: '',
}

export default function ContactForm() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })
  const [form, setForm] = useState<ContactFormData>(initialForm)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data: ApiResponse = await res.json()

      if (data.success) {
        setStatus('success')
        setMessage(data.message)
        setForm(initialForm)
      } else {
        setStatus('error')
        setMessage(data.message)
      }
    } catch {
      setStatus('error')
      setMessage('Error de conexión. Por favor contacte por WhatsApp.')
    }
  }

  return (
    <section id="contacto" ref={ref} className="py-24 bg-[#F5F7FA]" aria-labelledby="contact-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block text-[#FFC300] font-display font-700 text-sm tracking-widest uppercase mb-3 bg-[#FFC300]/10 px-4 py-1.5 rounded-full">
              Contacto
            </span>
            <h2 id="contact-heading" className="font-display font-800 text-3xl sm:text-4xl text-[#001F5B] mb-5 tracking-tight">
              Solicite su cotización ahora
            </h2>
            <p className="text-gray-500 text-lg mb-10 leading-relaxed">
              Complete el formulario y nuestro equipo le responderá en menos de 2 horas con una propuesta personalizada.
            </p>

            {/* Contact channels */}
            <div className="space-y-4">
              <a href="tel:3114880034" className="flex items-center gap-4 group">
                <div className="w-11 h-11 bg-[#003B8E] rounded-xl flex items-center justify-center group-hover:bg-[#FFC300] transition-colors duration-300 flex-shrink-0">
                  <Phone className="w-5 h-5 text-white group-hover:text-[#001F5B] transition-colors duration-300" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">Teléfonos</p>
                  <p className="font-display font-600 text-[#001F5B] group-hover:text-[#003B8E] transition-colors">
                    311 488 0034 / 314 480 7148
                  </p>
                </div>
              </a>

              <a href="mailto:COMERCIAL@PROSERVIS.COM" className="flex items-center gap-4 group">
                <div className="w-11 h-11 bg-[#003B8E] rounded-xl flex items-center justify-center group-hover:bg-[#FFC300] transition-colors duration-300 flex-shrink-0">
                  <Mail className="w-5 h-5 text-white group-hover:text-[#001F5B] transition-colors duration-300" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">Correo comercial</p>
                  <p className="font-display font-600 text-[#001F5B] group-hover:text-[#003B8E] transition-colors text-sm sm:text-base">
                    COMERCIAL@PROSERVIS.COM
                  </p>
                </div>
              </a>

              <a
                href="https://wa.me/573114880034?text=Hola%20PROSERVIS%2C%20necesito%20información%20sobre%20transporte%20de%20carga."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
              >
                <div className="w-11 h-11 bg-green-500 rounded-xl flex items-center justify-center group-hover:bg-green-600 transition-colors duration-300 flex-shrink-0">
                  <MessageCircle className="w-5 h-5 text-white" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">WhatsApp</p>
                  <p className="font-display font-600 text-[#001F5B] group-hover:text-green-600 transition-colors">
                    Escribir ahora →
                  </p>
                </div>
              </a>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 bg-[#F5F7FA] border border-gray-200 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-base" aria-hidden="true">📍</span>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">Dirección</p>
                  <p className="font-display font-600 text-[#001F5B]">Calle 8A N°33-04</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-3xl shadow-premium p-7 sm:p-9"
              noValidate
              aria-label="Formulario de cotización"
            >
              {/* Honeypot */}
              <input
                type="text"
                name="honeypot"
                value={form.honeypot}
                onChange={handleChange}
                className="hidden"
                tabIndex={-1}
                aria-hidden="true"
                autoComplete="off"
              />

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <FormField label="Nombre completo *" id="nombre" name="nombre" type="text" value={form.nombre} onChange={handleChange} placeholder="Juan Pérez" required />
                <FormField label="Empresa" id="empresa" name="empresa" type="text" value={form.empresa} onChange={handleChange} placeholder="Mi Empresa S.A.S." />
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <FormField label="Teléfono *" id="telefono" name="telefono" type="tel" value={form.telefono} onChange={handleChange} placeholder="300 000 0000" required />
                <FormField label="Correo electrónico *" id="correo" name="correo" type="email" value={form.correo} onChange={handleChange} placeholder="correo@empresa.com" required />
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <SelectField label="Ciudad origen *" id="ciudadOrigen" name="ciudadOrigen" value={form.ciudadOrigen} onChange={handleChange} options={cities} required />
                <SelectField label="Ciudad destino *" id="ciudadDestino" name="ciudadDestino" value={form.ciudadDestino} onChange={handleChange} options={cities} required />
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <SelectField label="Tipo de carga *" id="tipoCarga" name="tipoCarga" value={form.tipoCarga} onChange={handleChange} options={cargoOptions} required />
                <FormField label="Peso aproximado" id="pesoAproximado" name="pesoAproximado" type="text" value={form.pesoAproximado} onChange={handleChange} placeholder="Ej: 5 ton, 500 kg" />
              </div>

              <div className="mb-5">
                <label htmlFor="mensaje" className="block text-xs font-600 text-gray-600 mb-1.5 uppercase tracking-wide">
                  Información adicional
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  value={form.mensaje}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Describa su carga, requisitos especiales, fechas, etc."
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#003B8E] focus:ring-2 focus:ring-[#003B8E]/10 transition-all duration-200 resize-none"
                />
              </div>

              {/* Status messages */}
              {status === 'success' && (
                <div className="flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 mb-4 text-sm" role="alert">
                  <CheckCircle className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                  {message}
                </div>
              )}
              {status === 'error' && (
                <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 mb-4 text-sm" role="alert">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full flex items-center justify-center gap-2.5 bg-[#FFC300] text-[#001F5B] py-4 rounded-2xl font-display font-700 text-base hover:bg-yellow-400 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 shadow-yellow hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
              >
                {status === 'loading' ? (
                  <><Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> Enviando...</>
                ) : (
                  <><Send className="w-4 h-4" aria-hidden="true" /> Enviar Solicitud de Cotización</>
                )}
              </button>

              <p className="text-xs text-gray-400 text-center mt-3">
                Le responderemos en menos de 2 horas en horario hábil.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Reusable sub-components
function FormField({
  label, id, name, type, value, onChange, placeholder, required,
}: {
  label: string; id: string; name: string; type: string
  value: string; onChange: React.ChangeEventHandler<HTMLInputElement>
  placeholder?: string; required?: boolean
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-600 text-gray-600 mb-1.5 uppercase tracking-wide">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        autoComplete={type === 'email' ? 'email' : type === 'tel' ? 'tel' : 'off'}
        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#003B8E] focus:ring-2 focus:ring-[#003B8E]/10 transition-all duration-200"
      />
    </div>
  )
}

function SelectField({
  label, id, name, value, onChange, options, required,
}: {
  label: string; id: string; name: string; value: string
  onChange: React.ChangeEventHandler<HTMLSelectElement>
  options: string[]; required?: boolean
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-600 text-gray-600 mb-1.5 uppercase tracking-wide">
        {label}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-[#003B8E] focus:ring-2 focus:ring-[#003B8E]/10 transition-all duration-200 bg-white"
      >
        <option value="">Seleccionar...</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  )
}
