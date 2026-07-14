'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Package, Wrench, Weight, Container, Building, Settings, Thermometer, Cpu } from 'lucide-react'

const types = [
  { icon: Package, label: 'Carga Seca General', color: 'text-blue-500', bg: 'bg-blue-50' },
  { icon: Wrench, label: 'Carga Industrial', color: 'text-gray-600', bg: 'bg-gray-50' },
  { icon: Weight, label: 'Carga Pesada', color: 'text-orange-500', bg: 'bg-orange-50' },
  { icon: Container, label: 'Contenedores', color: 'text-[#003B8E]', bg: 'bg-blue-50' },
  { icon: Building, label: 'Materiales de Construcción', color: 'text-amber-600', bg: 'bg-amber-50' },
  { icon: Settings, label: 'Equipos Industriales', color: 'text-slate-600', bg: 'bg-slate-50' },
  { icon: Thermometer, label: 'Carga Refrigerada', color: 'text-cyan-500', bg: 'bg-cyan-50' },
  { icon: Cpu, label: 'Tecnología y Equipos Sensibles', color: 'text-purple-500', bg: 'bg-purple-50' },
]

export default function CargoTypes() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <section id="mercancias" ref={ref} className="py-24 bg-[#F5F7FA]" aria-labelledby="cargo-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block text-[#FFC300] font-display font-700 text-sm tracking-widest uppercase mb-3 bg-[#003B8E] px-4 py-1.5 rounded-full">
            Tipos de Mercancía
          </span>
          <h2 id="cargo-heading" className="font-display font-800 text-3xl sm:text-4xl text-[#001F5B] mb-4 tracking-tight">
            Transportamos todo tipo de carga
          </h2>
          <p className="text-gray-500 text-lg">
            Experiencia y equipamiento para manejar con seguridad cualquier tipo de mercancía.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {types.map(({ icon: Icon, label, color, bg }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className="group bg-white rounded-2xl p-5 border border-gray-100 hover:border-[#003B8E]/30 shadow-sm hover:shadow-premium transition-all duration-300 hover:-translate-y-1 text-center cursor-default"
            >
              <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                <Icon className={`w-6 h-6 ${color}`} aria-hidden="true" />
              </div>
              <p className="font-display font-600 text-[#001F5B] text-sm leading-tight">{label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
