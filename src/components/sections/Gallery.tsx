'use client'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import Image from 'next/image'
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react'

// Fotografías generadas para PROSERVIS (branding propio, sin dependencias externas)
const galleryImages = [
  { src: '/images/gallery-1-tractomula.jpg', alt: 'Tractomula en carretera nacional' },
  { src: '/images/gallery-2-descarga.jpg', alt: 'Descarga de mercancía industrial' },
  { src: '/images/gallery-3-distribucion.jpg', alt: 'Tractomula en carretera nacional' },
  { src: '/images/gallery-4-flota.jpg', alt: 'Flota de camiones PROSERVIS' },
  { src: '/images/gallery-5-maquinaria.jpg', alt: 'Carga de maquinaria pesada' },
  { src: '/images/gallery-6-bodega.jpg', alt: '' },
]

export default function Gallery() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)

  const prev = () => setLightboxIdx(i => (i !== null ? (i - 1 + galleryImages.length) % galleryImages.length : null))
  const next = () => setLightboxIdx(i => (i !== null ? (i + 1) % galleryImages.length : null))

  return (
    <section id="trabajos" ref={ref} className="py-24 bg-[#F5F7FA]" aria-labelledby="gallery-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block text-[#FFC300] font-display font-700 text-sm tracking-widest uppercase mb-3 bg-[#003B8E] px-4 py-1.5 rounded-full">
            Trabajos Realizados
          </span>
          <h2 id="gallery-heading" className="font-display font-800 text-3xl sm:text-4xl text-[#001F5B] mb-4 tracking-tight">
            Nuestra operación en acción
          </h2>
          <p className="text-gray-500 text-lg">
            Cada imagen refleja el compromiso y la calidad que ponemos en cada servicio.
          </p>
        </motion.div>

        {/* Masonry grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {galleryImages.map((img, i) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.09 }}
              className="break-inside-avoid group relative rounded-2xl overflow-hidden cursor-pointer shadow-premium hover:shadow-premium-hover transition-all duration-350"
              onClick={() => setLightboxIdx(i)}
              role="button"
              tabIndex={0}
              aria-label={`Ver imagen: ${img.alt}`}
              onKeyDown={(e) => e.key === 'Enter' && setLightboxIdx(i)}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={600}
                height={i % 2 === 0 ? 400 : 300}
                className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-[#001F5B]/0 group-hover:bg-[#001F5B]/50 transition-all duration-350 flex items-center justify-center">
                <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" aria-hidden="true" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setLightboxIdx(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Imagen ampliada"
          >
            <button
              onClick={() => setLightboxIdx(null)}
              className="absolute top-4 right-4 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-colors z-10"
              aria-label="Cerrar imagen"
            >
              <X className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); prev() }}
              className="absolute left-4 p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-colors z-10"
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next() }}
              className="absolute right-16 p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-colors z-10"
              aria-label="Siguiente imagen"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <motion.div
              key={lightboxIdx}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              className="max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={galleryImages[lightboxIdx].src}
                alt={galleryImages[lightboxIdx].alt}
                width={1200}
                height={800}
                className="w-full h-auto rounded-2xl object-contain max-h-[80vh]"
              />
              <p className="text-center text-white/60 text-sm mt-3">{galleryImages[lightboxIdx].alt}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
