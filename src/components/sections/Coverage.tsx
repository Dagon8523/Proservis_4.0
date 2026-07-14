'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { MapPin, Radio, Wifi } from 'lucide-react'

const cities = [
  { name: 'Bogotá', x: 49.5, y: 52.5, main: true, label: 'right' },
  { name: 'Medellín', x: 35.5, y: 42.5, label: 'left' },
  { name: 'Cali', x: 31.5, y: 57.5, label: 'left' },
  { name: 'Barranquilla', x: 42.5, y: 16.5, label: 'right' },
  { name: 'Cartagena', x: 34.5, y: 20.5, label: 'left' },
  { name: 'Bucaramanga', x: 53.5, y: 36.5, label: 'right' },
  { name: 'Pereira', x: 37.8, y: 48.5, label: 'left' },
  { name: 'Manizales', x: 39.5, y: 45.2, label: 'right' },
  { name: 'Villavicencio', x: 57.5, y: 57.5, label: 'right' },
  { name: 'Cúcuta', x: 62.5, y: 31.5, label: 'right' },
]

export default function Coverage() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const bogota = cities.find((city) => city.main)!

  return (
    <section id="cobertura" ref={ref} className="relative overflow-hidden bg-[#001F5B] py-24" aria-labelledby="coverage-heading">
      <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden="true">
        <div className="absolute -left-48 top-24 h-96 w-96 rounded-full bg-[#005BB5]/25 blur-3xl" />
        <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#003B8E]/50 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#FFC300]/25 bg-[#FFC300]/10 px-4 py-1.5 font-display text-sm font-bold uppercase tracking-[0.18em] text-[#FFC300]">
            <Radio className="h-3.5 w-3.5" aria-hidden="true" />
            Cobertura nacional
          </span>
          <h2 id="coverage-heading" className="mb-4 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Conectamos su carga con todo Colombia
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-white/65">
            Desde Bogotá coordinamos operaciones hacia las principales ciudades del país, incluyendo zonas industriales, mineras y de difícil acceso.
          </p>
        </motion.div>

        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_.95fr]">
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-[2rem] border border-cyan-400/20 bg-gradient-to-br from-[#003B8E]/55 via-[#002A72]/65 to-[#001747]/90 p-5 shadow-2xl shadow-black/25 sm:p-8">
              <div
                className="absolute inset-0 opacity-[0.12]"
                style={{
                  backgroundImage: 'linear-gradient(rgba(45,212,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(45,212,255,.8) 1px, transparent 1px)',
                  backgroundSize: '38px 38px',
                }}
                aria-hidden="true"
              />

              <div className="absolute left-5 top-5 z-30 flex items-center gap-2 rounded-full border border-cyan-300/20 bg-[#001F5B]/75 px-3 py-2 backdrop-blur-md">
                <Wifi className="h-3.5 w-3.5 text-[#FFC300]" aria-hidden="true" />
                <span className="text-[11px] font-semibold text-white/80">Red logística activa</span>
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              </div>

              <div className="relative mx-auto aspect-[203/235] w-full max-w-[430px]">
                <img
                  src="/images/colombia-network-map.png"
                  alt="Mapa tecnológico de Colombia con red de cobertura nacional"
                  className="absolute inset-0 h-full w-full object-contain drop-shadow-[0_0_28px_rgba(0,210,255,.35)]"
                />

                <svg className="absolute inset-0 z-10 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                  <defs>
                    <linearGradient id="routeGradient" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#FFC300" />
                      <stop offset="100%" stopColor="#25D9FF" />
                    </linearGradient>
                    <filter id="routeGlow">
                      <feGaussianBlur stdDeviation="0.6" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {cities.filter((city) => !city.main).map((city, index) => (
                    <motion.line
                      key={city.name}
                      x1={bogota.x}
                      y1={bogota.y}
                      x2={city.x}
                      y2={city.y}
                      stroke="url(#routeGradient)"
                      strokeWidth="0.42"
                      strokeDasharray="1.8 1.8"
                      filter="url(#routeGlow)"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={inView ? { pathLength: 1, opacity: 0.72 } : {}}
                      transition={{ duration: 1.25, delay: 0.45 + index * 0.08 }}
                    />
                  ))}
                </svg>

                {cities.map((city, index) => (
                  <motion.div
                    key={city.name}
                    className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${city.x}%`, top: `${city.y}%` }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={inView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ type: 'spring', stiffness: 220, damping: 16, delay: 0.35 + index * 0.07 }}
                  >
                    <span className={`absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full ${city.main ? 'h-9 w-9 bg-[#FFC300]/25' : 'h-6 w-6 bg-cyan-300/15'} animate-ping`} />
                    <span className={`relative block rounded-full border-2 shadow-[0_0_14px_rgba(37,217,255,.75)] ${city.main ? 'h-4 w-4 border-[#FFC300] bg-[#FFC300]' : 'h-3 w-3 border-cyan-200 bg-[#005BB5]'}`} />
                    <span
                      className={`absolute top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md border border-white/10 bg-[#001F5B]/80 px-1.5 py-0.5 text-[9px] font-semibold text-white shadow-lg backdrop-blur-sm sm:text-[10px] ${city.label === 'left' ? 'right-full mr-2' : 'left-full ml-2'} ${city.main ? 'text-[#FFC300]' : ''}`}
                    >
                      {city.name}
                    </span>
                  </motion.div>
                ))}
              </div>

              <div className="relative z-20 mt-2 flex items-center justify-center gap-5 text-[11px] text-white/55">
                <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#FFC300]" />Centro de operación</span>
                <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-cyan-300" />Ciudades principales</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
            <div className="grid grid-cols-2 gap-3">
              {cities.map((city, index) => (
                <motion.div
                  key={city.name}
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.45 + index * 0.06 }}
                  className={`group flex items-center gap-3 rounded-xl border px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#FFC300]/45 hover:bg-[#005BB5]/30 ${city.main ? 'border-[#FFC300]/45 bg-[#FFC300]/10' : 'border-[#005BB5]/35 bg-[#003B8E]/35'}`}
                >
                  <span className={`grid h-8 w-8 flex-shrink-0 place-items-center rounded-lg ${city.main ? 'bg-[#FFC300]/15' : 'bg-[#005BB5]/20'}`}>
                    <MapPin className={`h-4 w-4 ${city.main ? 'text-[#FFC300]' : 'text-cyan-300'}`} aria-hidden="true" />
                  </span>
                  <div>
                    <span className={`block font-display text-sm font-semibold ${city.main ? 'text-[#FFC300]' : 'text-white'}`}>{city.name}</span>
                    {city.main && <span className="block text-[10px] text-[#FFC300]/70">Sede principal</span>}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9 }}
              className="mt-7 rounded-2xl border border-cyan-300/20 bg-gradient-to-r from-[#003B8E]/55 to-[#005BB5]/25 p-5 shadow-xl shadow-black/10"
            >
              <p className="text-sm leading-relaxed text-white/80">
                <strong className="text-white">También llegamos a zonas industriales, mineras y rurales</strong> a lo largo del territorio nacional. Si su destino no está en la lista, consúltenos.
              </p>
              <a href="#contacto" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#FFC300] transition-transform hover:translate-x-1">
                Consultar disponibilidad en mi ciudad <span aria-hidden="true">→</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
