import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'
import ScrollManager from '../components/ScrollManager'
import ScrollReveal from '../components/ScrollReveal'
import Toast from '../components/Toast'
import { useShop } from '../context/ShopContext'

export default function MainLayout() {
  const { totalQty, isCartOpen, setIsCartOpen, cart, changeQty, removeFromCart } = useShop()
  const { pathname } = useLocation()

  return (
    <>
      <ScrollManager />
      <ScrollReveal />
      <Header
        totalQty={totalQty}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        cart={cart}
        onQtyChange={changeQty}
        onRemove={removeFromCart}
      />
      {/* key berganti tiap pindah halaman → animasi masuk halus diputar ulang. */}
      <main key={pathname} className="animate-page">
        <Outlet />
      </main>
      <Footer />
      <Toast />
    </>
  )
}
