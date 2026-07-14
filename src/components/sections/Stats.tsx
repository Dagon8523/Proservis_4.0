'use client'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, useEffect } from 'react'

const stats = [
  { value: 10, suffix: '+', label: 'Años de experiencia', sub: 'En logística colombiana' },
  { value: 500, suffix: '+', label: 'Servicios realizados', sub: 'Con éxito y puntualidad' },
  { value: 32, suffix: '', label: 'Departamentos cubiertos', sub: 'A nivel nacional' },
  { value: 95, suffix: '%', label: 'Satisfacción del cliente', sub: 'Comprometidos con la calidad' },
]

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const motionVal = useMotionValue(0)
  const spring = useSpring(motionVal, { stiffness: 50, damping: 20 })
  const display = useTransform(spring, (v) => `${Math.round(v)}${suffix}`)

  useEffect(() => {
    if (inView) motionVal.set(value)
  }, [inView, value, motionVal])

  return (
    <motion.span ref={ref} className="tabular-nums">
      {display}
    </motion.span>
  )
}

export default function Stats() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section ref={ref} className="py-20 bg-gradient-to-r from-[#001F5B] via-[#003B8E] to-[#005BB5]" aria-label="Estadísticas de PROSERVIS">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map(({ value, suffix, label, sub }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              className="text-center group"
            >
              <div className="font-display font-800 text-4xl sm:text-5xl text-[#FFC300] mb-2 tabular-nums">
                <AnimatedCounter value={value} suffix={suffix} />
              </div>
              <div className="font-display font-700 text-white text-sm sm:text-base mb-1">{label}</div>
              <div className="text-white/50 text-xs sm:text-sm">{sub}</div>
            </motion.div>
          ))}
        </div>

        {/* 24/7 badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-10 flex justify-center"
        >
          <div className="inline-flex items-center gap-3 bg-[#FFC300]/12 border border-[#FFC300]/25 rounded-2xl px-6 py-3">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-white/80 text-sm font-medium">Atención 24/7 — Siempre disponibles para su operación</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
