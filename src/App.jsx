import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import MenuSection from './components/MenuSection'
import Promises from './components/Promises'
import Signatures from './components/Signatures'
import Testimonials from './components/Testimonials'
import { MENU_CATEGORIES, MENU_ITEMS } from './data/menu'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Signatures />
        <Promises />
        <MenuSection menus={MENU_ITEMS} categories={MENU_CATEGORIES} loading={false} error={null} />
        <Testimonials />
      </main>
      <Footer />
    </>
  )
}
