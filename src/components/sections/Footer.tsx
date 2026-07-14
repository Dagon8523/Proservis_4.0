'use client'
import Image from 'next/image'
import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin } from 'lucide-react'

const navLinks = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#cobertura', label: 'Cobertura' },
  { href: '#flota', label: 'Flota' },
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#contacto', label: 'Contacto' },
]

export default function Footer() {
  return (
    <footer className="bg-[#001F5B] text-white" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="relative block h-9 w-[76px] shrink-0">
                <Image
                  src="/images/logo-icon-white.png"
                  alt="PROSERVIS S.A.S."
                  fill
                  loading="lazy"
                  sizes="76px"
                  className="object-contain object-left"
                />
              </span>
              <div>
                <span className="font-display font-800 text-xl text-white">PROSERVIS</span>
                <span className="block text-[10px] text-[#FFC300] tracking-widest uppercase -mt-0.5">S.A.S. · Logística</span>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-5">
              Tu mercancía en las mejores manos. Soluciones logísticas integrales para empresas en todo Colombia.
            </p>

            {/* Social */}
            <div className="flex items-center gap-3">
              {[
                { Icon: Instagram, label: 'Instagram', href: '#' },
                { Icon: Facebook, label: 'Facebook', href: '#' },
                { Icon: Linkedin, label: 'LinkedIn', href: '#' },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 bg-white/8 hover:bg-[#FFC300] border border-white/10 hover:border-[#FFC300] rounded-lg flex items-center justify-center transition-all duration-200 group"
                >
                  <Icon className="w-4 h-4 text-white/60 group-hover:text-[#001F5B] transition-colors duration-200" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-display font-700 text-sm text-[#FFC300] uppercase tracking-widest mb-5">Navegación</h3>
            <nav aria-label="Footer navigation">
              <ul className="space-y-2.5">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-white/55 hover:text-[#FFC300] text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-700 text-sm text-[#FFC300] uppercase tracking-widest mb-5">Contacto</h3>
            <ul className="space-y-4">
              <li>
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#FFC300] mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <a href="tel:3114880034" className="text-white/70 hover:text-white text-sm block transition-colors">311 488 0034</a>
                    <a href="tel:3144807148" className="text-white/70 hover:text-white text-sm block transition-colors">314 480 7148</a>
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#FFC300] mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span className="text-white/70 text-sm">Calle 8A N°33-04</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#FFC300] mt-0.5 flex-shrink-0" aria-hidden="true" />
                <div>
                  <a href="mailto:COMERCIAL@PROSERVIS.COM" className="text-white/70 hover:text-[#FFC300] text-xs block transition-colors">COMERCIAL@PROSERVIS.COM</a>
                </div>
              </li>
            </ul>
          </div>

          {/* Map */}
          <div>
            <h3 className="font-display font-700 text-sm text-[#FFC300] uppercase tracking-widest mb-5">Ubicación</h3>
            <div className="rounded-xl overflow-hidden border border-[#003B8E]/50 h-36">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3977.0!2d-74.08!3d4.65!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zBCHANDA!5e0!3m2!1ses!2sco!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación PROSERVIS S.A.S."
                aria-label="Mapa de ubicación de PROSERVIS"
              />
            </div>
            <p className="text-white/40 text-xs mt-2">Bogotá, Colombia</p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-xs text-center sm:text-left">
            © {new Date().getFullYear()} PROSERVIS S.A.S. — Todos los derechos reservados.
          </p>
          <p className="text-white/30 text-xs">
            Transporte de carga · Logística integral · Colombia
          </p>
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-xs text-center sm:text-left">
            Powered By © {new Date().getFullYear()} Reset Soluciones Digitales.
          </p>
        </div>
      </div>
    </footer>
  )
}
