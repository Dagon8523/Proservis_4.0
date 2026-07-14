'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, MessageCircle, Truck } from 'lucide-react'

export default function ContactCTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })

  return (
    <section ref={ref} className="py-28 bg-[#001F5B] relative overflow-hidden" aria-labelledby="cta-heading">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#003B8E] rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#FFC300]/8 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFC300]/20 to-transparent" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="w-16 h-16 bg-[#FFC300] rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-yellow"
        >
          <Truck className="w-8 h-8 text-[#001F5B]" aria-hidden="true" />
        </motion.div>

        <motion.h2
          id="cta-heading"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display font-800 text-3xl sm:text-5xl text-white mb-5 tracking-tight text-balance"
        >
          ¿Necesita transportar su mercancía?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white/65 text-lg sm:text-xl mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Cotización en menos de 2 horas. Atención personalizada para cada necesidad logística de su empresa.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#contacto"
            className="inline-flex items-center justify-center gap-2 bg-[#FFC300] text-[#001F5B] px-8 py-4 rounded-2xl font-display font-700 text-base hover:bg-yellow-400 transition-all duration-200 shadow-yellow hover:shadow-xl hover:-translate-y-0.5"
          >
            Solicitar Cotización
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="https://wa.me/573114880034?text=Hola%20PROSERVIS%2C%20necesito%20cotizar%20un%20servicio%20de%20transporte."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-white/10 text-white border border-white/20 px-8 py-4 rounded-2xl font-display font-600 text-base hover:bg-white/18 transition-all duration-200 hover:-translate-y-0.5"
          >
            <MessageCircle className="w-4 h-4" />
            Contactar por WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  )
}
