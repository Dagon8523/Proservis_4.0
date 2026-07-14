'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Truck, Building2, Factory, Package, Wrench, Zap, ArrowRight } from 'lucide-react'

const services = [
  {
    icon: Truck,
    title: 'Transporte Nacional',
    desc: 'Cobertura en todo el territorio colombiano. Tractomulas, doble troque y camiones sencillos.',
    gradient: 'from-[#003B8E] to-[#005BB5]',
    tag: 'Todo el país',
  },
  {
    icon: Building2,
    title: 'Distribución Urbana',
    desc: 'Entrega eficiente en zonas urbanas con camionetas, NHR, NPR y NKR.',
    gradient: 'from-[#001F5B] to-[#003B8E]',
    tag: 'Ciudad',
  },
  {
    icon: Factory,
    title: 'Transporte Industrial',
    desc: 'Manejo especializado de carga industrial con protocolos de seguridad estrictos.',
    gradient: 'from-[#005BB5] to-[#003B8E]',
    tag: 'Especializado',
  },
  {
    icon: Package,
    title: 'Carga Sobredimensionada',
    desc: 'Planchones y cama baja para cargas que superan dimensiones estándar.',
    gradient: 'from-[#003B8E] to-[#001F5B]',
    tag: 'Extradimensión',
  },
  {
    icon: Wrench,
    title: 'Maquinaria Pesada',
    desc: 'Traslado de maquinaria pesada y equipos industriales con camabajas especializadas.',
    gradient: 'from-[#001F5B] to-[#005BB5]',
    tag: 'Pesada',
  },
  {
    icon: Zap,
    title: 'Transporte Especial',
    desc: 'Furgones secos y refrigerados para mercancía sensible, frágil o con cadena de frío.',
    gradient: 'from-[#005BB5] to-[#001F5B]',
    tag: 'Especial',
  },
]

export default function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <section id="servicios" ref={ref} className="py-24 bg-[#F5F7FA]" aria-labelledby="services-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block text-[#FFC300] font-display font-700 text-sm tracking-widest uppercase mb-3 bg-[#003B8E] px-4 py-1.5 rounded-full">
            Nuestros Servicios
          </span>
          <h2 id="services-heading" className="font-display font-800 text-3xl sm:text-4xl text-[#001F5B] mb-4 tracking-tight">
            Soluciones para cada necesidad logística
          </h2>
          <p className="text-gray-500 text-lg">
            Una flota versátil y un equipo experto para cualquier tipo de carga y destino.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(({ icon: Icon, title, desc, gradient, tag }, i) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 36 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.05 + i * 0.08 }}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-premium hover:shadow-premium-hover transition-all duration-350 hover:-translate-y-2"
            >
              {/* Top gradient bar */}
              <div className={`h-1 bg-gradient-to-r ${gradient}`} />

              <div className="p-6">
                {/* Icon + Tag */}
                <div className="flex items-start justify-between mb-5">
                  <div className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center shadow-premium group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" aria-hidden="true" />
                  </div>
                  <span className="text-xs font-600 text-[#003B8E] bg-[#003B8E]/8 px-2.5 py-1 rounded-full">
                    {tag}
                  </span>
                </div>

                <h3 className="font-display font-700 text-[#001F5B] text-lg mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">{desc}</p>

                <a
                  href="#contacto"
                  className="inline-flex items-center gap-1.5 text-sm font-600 text-[#003B8E] hover:text-[#FFC300] group/link transition-colors duration-200"
                >
                  Cotizar este servicio
                  <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform duration-200" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
