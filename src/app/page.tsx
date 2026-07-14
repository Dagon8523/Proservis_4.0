import Header from '@/components/sections/Header'
import Hero from '@/components/sections/Hero'
import WhyUs from '@/components/sections/WhyUs'
import Services from '@/components/sections/Services'
import Fleet from '@/components/sections/Fleet'
import Coverage from '@/components/sections/Coverage'
import CargoTypes from '@/components/sections/CargoTypes'
import Process from '@/components/sections/Process'
import Stats from '@/components/sections/Stats'
import Gallery from '@/components/sections/Gallery'
import About from '@/components/sections/About'
import ContactCTA from '@/components/sections/ContactCTA'
import ContactForm from '@/components/sections/ContactForm'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Header />
      <Hero />
      <WhyUs />
      <Services />
      <Fleet />
      <Coverage />
      <CargoTypes />
      <Process />
      <Stats />
      <Gallery />
      <About />
      <ContactCTA />
      <ContactForm />
      <Footer />
    </main>
  )
}
