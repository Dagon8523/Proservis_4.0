'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Target, Eye, History, Heart } from 'lucide-react'

const sections = [
  {
    icon: Target,
    title: 'Misión',
    content: 'Brindar soluciones logísticas eficientes y seguras, garantizando el transporte y manejo adecuado de la carga de nuestros clientes, mediante un servicio oportuno, tecnología y un equipo humano comprometido con la excelencia.',
    color: 'from-[#003B8E] to-[#005BB5]',
  },
  {
    icon: Eye,
    title: 'Visión',
    content: 'Ser reconocidos a nivel nacional como una empresa líder en el sector logístico, destacándonos por nuestra confiabilidad, innovación y calidad en el servicio, logrando relaciones duraderas con nuestros clientes y aliados estratégicos.',
    color: 'from-[#001F5B] to-[#003B8E]',
  },
  {
    icon: History,
    title: 'Historia',
    content: 'PROSERVIS S.A.S. nace con el objetivo de ofrecer soluciones logísticas confiables y eficientes en el mercado colombiano. Desde sus inicios, la empresa ha trabajado con compromiso y responsabilidad, creciendo progresivamente y fortaleciendo sus servicios para adaptarse a las exigencias del sector.',
    color: 'from-[#005BB5] to-[#003B8E]',
  },
  {
    icon: Heart,
    title: 'Valores',
    content: 'Trabajamos bajo principios de responsabilidad, puntualidad, seguridad, compromiso y transparencia, garantizando un servicio logístico confiable, eficiente y orientado a satisfacer las necesidades de nuestros clientes.',
    color: 'from-[#003B8E] to-[#001F5B]',
    values: ['Responsabilidad', 'Puntualidad', 'Seguridad', 'Compromiso', 'Transparencia'],
  },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <section id="nosotros" ref={ref} className="py-24 bg-white" aria-labelledby="about-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block text-[#FFC300] font-display font-700 text-sm tracking-widest uppercase mb-3 bg-[#FFC300]/10 px-4 py-1.5 rounded-full">
            Sobre Nosotros
          </span>
          <h2 id="about-heading" className="font-display font-800 text-3xl sm:text-4xl text-[#001F5B] mb-4 tracking-tight">
            Tu mercancía en las mejores manos
          </h2>
          <p className="text-gray-500 text-lg">
            Una empresa colombiana comprometida con la excelencia logística.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {sections.map(({ icon: Icon, title, content, color, values }, i) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.1 }}
              className="group relative bg-[#F5F7FA] hover:bg-white border border-gray-100 hover:border-[#003B8E]/20 rounded-2xl p-7 transition-all duration-350 hover:shadow-premium"
            >
              {/* Icon header */}
              <div className="flex items-center gap-4 mb-5">
                <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center shadow-premium flex-shrink-0 group-hover:scale-105 transition-transform duration-300`}>
                  <Icon className="w-6 h-6 text-white" aria-hidden="true" />
                </div>
                <h3 className="font-display font-700 text-[#001F5B] text-xl">{title}</h3>
              </div>

              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">{content}</p>

              {values && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {values.map((v) => (
                    <span key={v} className="text-xs font-600 text-[#003B8E] bg-[#003B8E]/8 px-3 py-1 rounded-full">
                      {v}
                    </span>
                  ))}
                </div>
              )}

              {/* Accent line */}
              <div className={`absolute left-0 top-6 bottom-6 w-1 bg-gradient-to-b ${color} rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
