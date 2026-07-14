'use client'
import { motion } from 'framer-motion'
import { ArrowRight, MessageCircle, Shield, Clock, MapPin, Headphones } from 'lucide-react'
import Image from 'next/image'

const indicators = [
  { icon: MapPin, label: 'Cobertura Nacional' },
  { icon: Clock, label: 'Entregas Puntuales' },
  { icon: Shield, label: 'Seguimiento de Carga' },
  { icon: Headphones, label: 'Atención 24/7' },
]

export default function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden" aria-label="Sección principal">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/gallery-1-tractomula.jpg"
          alt="Tractocamión en carretera colombiana al amanecer"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#001F5B]/95 via-[#003B8E]/80 to-[#001F5B]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#001F5B]/70 via-transparent to-transparent" />
      </div>

      {/* Animated route SVG */}
      <div className="absolute inset-0 z-1 pointer-events-none overflow-hidden">
        <svg className="absolute bottom-0 left-0 w-full h-32 opacity-20" viewBox="0 0 1440 128" fill="none" aria-hidden="true">
          <path className="route-path" d="M0 64 Q360 20 720 64 T1440 64" stroke="#FFC300" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path className="route-path" style={{ animationDelay: '1s' }} d="M0 80 Q480 40 960 80 T1440 80" stroke="#FFC300" strokeWidth="1" fill="none" strokeDasharray="8 8" />
        </svg>

        {/* Animated truck icon */}
        <div className="absolute bottom-16 left-1/4 truck-move" aria-hidden="true">
          <svg width="48" height="32" viewBox="0 0 48 32" fill="none" opacity="0.4">
            <rect x="4" y="8" width="28" height="18" rx="2" fill="#FFC300" />
            <rect x="32" y="12" width="12" height="14" rx="2" fill="#FFC300" opacity="0.7" />
            <circle cx="10" cy="26" r="4" fill="#003B8E" stroke="#FFC300" strokeWidth="1.5" />
            <circle cx="24" cy="26" r="4" fill="#003B8E" stroke="#FFC300" strokeWidth="1.5" />
            <circle cx="38" cy="26" r="4" fill="#003B8E" stroke="#FFC300" strokeWidth="1.5" />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-[#FFC300]/15 border border-[#FFC300]/30 text-[#FFC300] px-4 py-1.5 rounded-full text-sm font-medium mb-6 backdrop-blur-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFC300] animate-pulse" />
            Empresa Colombiana de Logística
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-800 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white leading-[1.08] tracking-tight text-balance mb-6"
          >
            Movemos su carga con{' '}
            <span className="text-[#FFC300]">seguridad</span>,<br className="hidden sm:block" />{' '}
            rapidez y confianza.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/75 text-lg sm:text-xl mb-10 max-w-xl leading-relaxed"
          >
            Soluciones logísticas integrales para empresas en todo Colombia. Flota versátil, equipo capacitado y atención personalizada.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 mb-14"
          >
            <a
              href="#contacto"
              className="inline-flex items-center justify-center gap-2 bg-[#FFC300] text-[#001F5B] px-7 py-4 rounded-2xl font-display font-700 text-base hover:bg-yellow-400 transition-all duration-200 shadow-yellow hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
            >
              Solicitar Cotización
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="https://wa.me/573114880034?text=Hola%20PROSERVIS%2C%20necesito%20información%20sobre%20transporte%20de%20carga."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white/10 text-white border border-white/25 px-7 py-4 rounded-2xl font-display font-600 text-base hover:bg-white/18 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5"
            >
              <MessageCircle className="w-4 h-4" />
              Contactar por WhatsApp
            </a>
          </motion.div>

          {/* Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3"
          >
            {indicators.map(({ icon: Icon, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.08 }}
                className="flex items-center gap-2.5 glass-card rounded-xl px-3.5 py-2.5"
              >
                <div className="w-7 h-7 rounded-lg bg-[#FFC300] flex items-center justify-center flex-shrink-0">
                  <Icon className="w-3.5 h-3.5 text-[#001F5B]" />
                </div>
                <span className="text-[#001F5B] text-xs font-semibold leading-tight">{label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5"
        aria-hidden="true"
      >
        <span className="text-white/40 text-xs tracking-widest uppercase">Descubrir</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/0 to-[#FFC300]/60 animate-pulse-slow" />
      </motion.div>
    </section>
  )
}