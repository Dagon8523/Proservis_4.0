'use client'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Shield, CheckCircle, Star, Globe } from 'lucide-react'

const cards = [
  {
    icon: Shield,
    title: 'Seguridad',
    description: 'Protocolos estrictos de manejo y transporte. Su mercancía llega en perfectas condiciones.',
    accent: 'from-blue-600/10 to-blue-400/5',
    border: 'border-blue-200/60',
  },
  {
    icon: CheckCircle,
    title: 'Cumplimiento',
    description: 'Seguimiento en tiempo real y tiempos de entrega garantizados. Sin sorpresas.',
    accent: 'from-[#FFC300]/12 to-amber-400/5',
    border: 'border-amber-200/60',
  },
  {
    icon: Star,
    title: 'Experiencia',
    description: 'Más de 10 años en logística colombiana. Equipo capacitado y comprometido con la excelencia.',
    accent: 'from-[#003B8E]/10 to-[#005BB5]/5',
    border: 'border-[#003B8E]/20',
  },
  {
    icon: Globe,
    title: 'Cobertura Nacional',
    description: 'Desde Bogotá a cualquier ciudad del país. Zonas industriales, mineras y de difícil acceso.',
    accent: 'from-emerald-600/8 to-emerald-400/4',
    border: 'border-emerald-200/50',
  },
]

export default function WhyUs() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="por-que" ref={ref} className="py-24 bg-white" aria-labelledby="why-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block text-[#FFC300] font-display font-700 text-sm tracking-widest uppercase mb-3 bg-[#FFC300]/10 px-4 py-1.5 rounded-full">
            Por qué elegirnos
          </span>
          <h2 id="why-heading" className="font-display font-800 text-3xl sm:text-4xl text-[#001F5B] mb-4 tracking-tight">
            ¿Por qué elegir PROSERVIS?
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed">
            Más de una década de experiencia respaldando empresas en todo el territorio colombiano.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map(({ icon: Icon, title, description, accent, border }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.1, ease: 'easeOut' }}
              className={`group relative bg-gradient-to-br ${accent} border ${border} rounded-2xl p-6 hover:shadow-premium-hover transition-all duration-350 hover:-translate-y-1.5 cursor-default`}
            >
              {/* Icon */}
              <div className="w-12 h-12 bg-[#003B8E] rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#FFC300] transition-colors duration-300 shadow-premium">
                <Icon className="w-6 h-6 text-white group-hover:text-[#001F5B] transition-colors duration-300" aria-hidden="true" />
              </div>

              {/* Content */}
              <h3 className="font-display font-700 text-[#001F5B] text-lg mb-2">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{description}</p>

              {/* Hover accent line */}
              <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-[#FFC300] to-[#003B8E] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-350 origin-left" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
