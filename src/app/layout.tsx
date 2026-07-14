import type { Metadata } from 'next'
import { Inter, Montserrat } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'PROSERVIS S.A.S. | Transporte de Carga y Soluciones Logísticas en Colombia',
  description:
    'Empresa colombiana especializada en soluciones logísticas integrales, transporte de carga, distribución y gestión logística. Cobertura nacional. Flota versátil. Servicio 24/7.',
  keywords: [
    'transporte de carga Colombia',
    'logística integral',
    'tractomula Colombia',
    'transporte nacional',
    'distribución urbana Bogotá',
    'carga pesada Colombia',
    'PROSERVIS',
  ],
  authors: [{ name: 'PROSERVIS S.A.S.' }],
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'PROSERVIS S.A.S. | Transporte de Carga y Logística',
    description: 'Soluciones logísticas integrales para empresas en todo Colombia.',
    type: 'website',
    locale: 'es_CO',
    images: ['/images/logo-mark.png'],
  },
  robots: { index: true, follow: true },
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="font-sans bg-white text-gray-900 antialiased">{children}</body>
    </html>
  )
}
