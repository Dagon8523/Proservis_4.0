'use client'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { Truck, Weight, MapPin, Layers } from 'lucide-react'

const fleet = [
  { name: 'Camionetas de Carga', capacity: 'Hasta 1.5 ton', apps: 'Mensajería y carga liviana', coverage: 'Urbana / Regional', emoji: '🚐' },
  { name: 'NHR', capacity: '1.5 – 3 ton', apps: 'Distribución urbana', coverage: 'Urbana', emoji: '🚛' },
  { name: 'NPR', capacity: '3 – 5 ton', apps: 'Carga media urbana', coverage: 'Urbana / Interurbana', emoji: '🚛' },
  { name: 'NKR', capacity: '5 – 8 ton', apps: 'Distribución y pymes', coverage: 'Regional', emoji: '🚚' },
  { name: 'Camión Sencillo', capacity: '8 – 12 ton', apps: 'Transporte regional', coverage: 'Regional / Nacional', emoji: '🚚' },
  { name: 'Doble Troque', capacity: '15 – 25 ton', apps: 'Carga pesada y voluminosa', coverage: 'Nacional', emoji: '🚛' },
  { name: 'Tractomula', capacity: '25 – 34 ton', apps: 'Grandes volúmenes nacionales', coverage: 'Nacional', emoji: '🚛' },
  { name: 'Cama Baja', capacity: 'Sobredimensionada', apps: 'Maquinaria pesada, equipos', coverage: 'Nacional', emoji: '🏗️' },
  { name: 'Planchón', capacity: 'Hasta 30 ton', apps: 'Materiales construcción, big bags', coverage: 'Nacional', emoji: '🏗️' },
  { name: 'Furgón Seco/Refrigerado', capacity: 'Hasta 25 ton', apps: 'Mercancía protegida / cadena frío', coverage: 'Nacional', emoji: '❄️' },
]

export default function Fleet() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section id="flota" ref={ref} className="py-24 bg-white" aria-labelledby="fleet-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block text-[#FFC300] font-display font-700 text-sm tracking-widest uppercase mb-3 bg-[#FFC300]/10 px-4 py-1.5 rounded-full">
            Nuestra Flota
          </span>
          <h2 id="fleet-heading" className="font-display font-800 text-3xl sm:text-4xl text-[#001F5B] mb-4 tracking-tight">
            Vehículos para cada tipo de carga
          </h2>
          <p className="text-gray-500 text-lg">
            Flota versátil y mantenida para garantizar confiabilidad en cada operación.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {fleet.map((vehicle, i) => (
            <motion.div
              key={vehicle.name}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.45, delay: 0.04 * i }}
              onHoverStart={() => setHovered(i)}
              onHoverEnd={() => setHovered(null)}
              className="group relative bg-[#F5F7FA] hover:bg-[#003B8E] border border-gray-100 hover:border-[#003B8E] rounded-2xl p-4 cursor-default transition-all duration-300 hover:shadow-premium hover:-translate-y-1 overflow-hidden"
              role="article"
              aria-label={vehicle.name}
            >
              {/* Front face */}
              <AnimatePresence mode="wait">
                {hovered !== i ? (
                  <motion.div key="front" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
                    <div className="text-3xl mb-3 text-center" aria-hidden="true">{vehicle.emoji}</div>
                    <h3 className="font-display font-700 text-[#001F5B] text-xs sm:text-sm text-center leading-tight">
                      {vehicle.name}
                    </h3>
                  </motion.div>
                ) : (
                  <motion.div
                    key="back"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-white space-y-2"
                  >
                    <div className="flex items-center gap-1.5">
                      <Weight className="w-3 h-3 text-[#FFC300] flex-shrink-0" aria-hidden="true" />
                      <span className="text-xs font-600 text-[#FFC300]">Cap.</span>
                      <span className="text-xs text-white/80">{vehicle.capacity}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Layers className="w-3 h-3 text-[#FFC300] flex-shrink-0" aria-hidden="true" />
                      <span className="text-xs text-white/80 leading-tight">{vehicle.apps}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-[#FFC300] flex-shrink-0" aria-hidden="true" />
                      <span className="text-xs text-white/80">{vehicle.coverage}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Yellow accent on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FFC300] scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10 text-center"
        >
          <p className="text-gray-400 text-sm mb-4">¿Necesita un vehículo específico para su carga?</p>
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 bg-[#003B8E] text-white px-6 py-3 rounded-xl font-display font-600 text-sm hover:bg-[#001F5B] transition-all duration-200 shadow-premium hover:shadow-premium-hover"
          >
            <Truck className="w-4 h-4" aria-hidden="true" />
            Consultar disponibilidad
          </a>
        </motion.div>
      </div>
    </section>
  )
}
