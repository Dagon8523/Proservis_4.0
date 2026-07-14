'use client'
import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'

const navLinks = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#cobertura', label: 'Cobertura' },
  { href: '#flota', label: 'Flota' },
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#contacto', label: 'Contacto' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('inicio')

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 40)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-premium border-b border-gray-100'
            : 'bg-transparent'
        }`}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a href="#inicio" className="flex items-center gap-2.5 group shrink-0" aria-label="PROSERVIS - Inicio">
              <span className="relative block h-9 w-[76px] lg:h-11 lg:w-[93px]">
                {/* Versión color: visible sobre fondo blanco (header con scroll) */}
                <Image
                  src="/images/logo-icon.png"
                  alt=""
                  fill
                  priority
                  sizes="93px"
                  className={`object-contain object-left transition-opacity duration-300 ${scrolled ? 'opacity-100' : 'opacity-0'}`}
                />
                {/* Versión blanca: visible sobre el hero / fondo transparente */}
                <Image
                  src="/images/logo-icon-white.png"
                  alt="PROSERVIS S.A.S. — Transporte y servicio de carga"
                  fill
                  priority
                  sizes="93px"
                  className={`object-contain object-left drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)] transition-opacity duration-300 ${scrolled ? 'opacity-0' : 'opacity-100'}`}
                />
              </span>
              <div>
                <span className={`font-display font-800 text-xl tracking-tight transition-colors duration-300 ${scrolled ? 'text-[#003B8E]' : 'text-white'}`}>
                  PROSERVIS
                </span>
                <span className={`block text-[10px] tracking-widest uppercase font-medium transition-colors duration-300 -mt-0.5 ${scrolled ? 'text-[#005BB5]' : 'text-[#FFC300]'}`}>
                  S.A.S. · Logística
                </span>
              </div>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Navegación principal">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-white/10 ${
                    scrolled
                      ? 'text-gray-700 hover:text-[#003B8E] hover:bg-[#003B8E]/6'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="tel:3208116373"
                className={`text-sm font-medium transition-colors duration-200 ${scrolled ? 'text-[#003B8E]' : 'text-white/80 hover:text-white'}`}
              >
                311 4880034
              </a>
              <a
                href="#contacto"
                className="bg-[#FFC300] text-[#001F5B] px-5 py-2.5 rounded-xl font-display font-700 text-sm hover:bg-yellow-400 transition-all duration-200 shadow-yellow hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
              >
                Cotizar Ahora
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${scrolled ? 'text-[#003B8E] hover:bg-[#003B8E]/8' : 'text-white hover:bg-white/10'}`}
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-[#001F5B]/95 backdrop-blur-xl" onClick={() => setMenuOpen(false)} />
            <div className="relative z-10 pt-20 px-6 pb-8 min-h-screen flex flex-col">
              <nav className="flex flex-col gap-1 mt-4" aria-label="Menú móvil">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    onClick={() => setMenuOpen(false)}
                    className="text-white/90 hover:text-[#FFC300] hover:bg-white/8 text-xl font-display font-600 py-3.5 px-4 rounded-xl transition-all duration-200 border-b border-white/8"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>
              <div className="mt-8 flex flex-col gap-3">
                <a
                  href="#contacto"
                  onClick={() => setMenuOpen(false)}
                  className="bg-[#FFC300] text-[#001F5B] text-center py-4 rounded-2xl font-display font-700 text-lg shadow-yellow"
                >
                  Cotizar Ahora
                </a>
                <a
                  href="https://wa.me/573114880034"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 text-white text-center py-4 rounded-2xl font-display font-700 text-lg"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
