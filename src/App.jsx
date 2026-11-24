import { useEffect, useState } from 'react'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import MenuSection from './components/MenuSection'
import Promises from './components/Promises'
import Signatures from './components/Signatures'
import Testimonials from './components/Testimonials'

export default function App() {
  const [menus, setMenus] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Array kosong membuat menu hanya diambil sekali saat komponen pertama kali tampil.
  useEffect(() => {
    fetch('/menu.json')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Gagal memuat menu.')
        }
        return res.json()
      })
      .then((data) => {
        setMenus(data.items)
        setCategories(data.categories)
      })
      .catch((fetchError) => setError(fetchError.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Signatures />
        <Promises />
        <MenuSection menus={menus} categories={categories} loading={loading} error={error} />
        <Testimonials />
      </main>
      <Footer />
    </>
  )
}
