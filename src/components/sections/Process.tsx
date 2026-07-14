'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FileText, Calculator, MapPin, Radio, Package, CheckCircle } from 'lucide-react'

const steps = [
  { icon: FileText, label: 'Solicitud', desc: 'Nos contactas con tu requerimiento', num: '01' },
  { icon: Calculator, label: 'Cotización', desc: 'Enviamos propuesta en menos de 2h', num: '02' },
  { icon: MapPin, label: 'Recolección', desc: 'Recogemos la carga en tu punto', num: '03' },
  { icon: Radio, label: 'Seguimiento', desc: 'Rastreo en tiempo real de tu carga', num: '04' },
  { icon: Package, label: 'Entrega', desc: 'Entrega puntual en el destino', num: '05' },
  { icon: CheckCircle, label: 'Confirmación', desc: 'Soporte y confirmación de entrega', num: '06' },
]

export default function Process() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="proceso" ref={ref} className="py-24 bg-white" aria-labelledby="process-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block text-[#FFC300] font-display font-700 text-sm tracking-widest uppercase mb-3 bg-[#FFC300]/10 px-4 py-1.5 rounded-full">
            Nuestro Proceso
          </span>
          <h2 id="process-heading" className="font-display font-800 text-3xl sm:text-4xl text-[#001F5B] mb-4 tracking-tight">
            Simple, transparente y eficiente
          </h2>
          <p className="text-gray-500 text-lg">
            Seis pasos que garantizan el éxito de cada operación logística.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-10 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#003B8E]/20 to-transparent" aria-hidden="true" />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {steps.map(({ icon: Icon, label, desc, num }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                className="flex flex-col items-center text-center group"
              >
                {/* Step circle */}
                <div className="relative mb-4">
                  <div className="w-20 h-20 bg-[#F5F7FA] group-hover:bg-[#003B8E] border-2 border-[#003B8E]/20 group-hover:border-[#FFC300] rounded-2xl flex items-center justify-center transition-all duration-350 shadow-sm group-hover:shadow-premium">
                    <Icon className="w-8 h-8 text-[#003B8E] group-hover:text-[#FFC300] transition-colors duration-300" aria-hidden="true" />
                  </div>
                  {/* Number badge */}
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-[#FFC300] text-[#001F5B] text-[10px] font-display font-800 rounded-full flex items-center justify-center">
                    {num}
                  </span>
                </div>

                <h3 className="font-display font-700 text-[#001F5B] text-sm mb-1">{label}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
