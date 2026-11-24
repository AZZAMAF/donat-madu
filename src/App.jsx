import { useEffect, useState } from 'react'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import MenuSection from './components/MenuSection'
import Promises from './components/Promises'
import Signatures from './components/Signatures'
import Testimonials from './components/Testimonials'

// Contoh isi keranjang supaya layout dropdown bisa dilihat.
// TODO(gua): ganti dengan useState cart + localStorage.
const PLACEHOLDER_CART = [
  { id: 1, name: 'Smoked Honey & Sea Salt', price: 25000, image: '/images/menu-1.jpg', qty: 1 },
  { id: 4, name: 'Choco Honeycomb', price: 28000, image: '/images/menu-4.jpg', qty: 2 },
]

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

  // --- KERANGKA CART ---
  // TODO: useState cart. Seed dari localStorage, fallback ke PLACEHOLDER_CART.
  const [cart, setCart] = useState(()=> {
    try {
      const savedCart = localStorage.getItem('madu_donat_cart')
      return savedCart ? JSON.parse(savedCart) : []
    } catch (error) {
      console.error('Error parsing cart from localStorage:', error)
      return []
    }
  })

  const [isCartOpen, setIsCartOpen] = useState(false)

  // TODO: addToCart(item) -> { ...item, qty: 1 }, gabung kalau id sudah ada.
  const addToCart = (item) => {
    const available = cart.find((c) => c.id === item.id)
    if(available) {
      setCart(
        cart.map((c) => (c.id === item.id ? { ...c, qty: c.qty + 1 } : c))
      )
    } else{
      setCart([...cart, { ...item, qty: 1 }])
    }
  }
  // TODO: removeFromCart(id).
  const removeFromCart = (id) => {
    setCart(cart.filter((c) => c.id !== id))
  }

  // TODO: changeQty(id, qty); batas 1..99 sudah di QuantityCounter.
  const changeQty = (id, qty) => {
    setCart(
      cart.map((c) => (c.id === id ? { ...c, qty } : c))
    )
  }

  // TODO: useEffect [cart] simpan cart ke localStorage.

 useEffect(() => {
    localStorage.setItem('madu_donat_cart', JSON.stringify(cart))
  },[cart])
  
  const totalQty = cart.reduce((total, item) => total + item.qty, 0)

  return (
    <>
      <Header
        totalQty={totalQty}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        cart={cart}
        onQtyChange={changeQty}
        onRemove={removeFromCart}
      />
      <main>
        <Hero />
        <Signatures />
        <Promises />
        <MenuSection
          menus={menus}
          categories={categories}
          loading={loading}
          error={error}
          onAddToCart={addToCart}
        />
        <Testimonials />
      </main>
      <Footer />
    </>
  )
}
