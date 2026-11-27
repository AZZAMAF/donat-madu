import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'
import ScrollManager from '../components/ScrollManager'
import Toast from '../components/Toast'
import { useShop } from '../context/ShopContext'

export default function MainLayout() {
  const { totalQty, isCartOpen, setIsCartOpen, cart, changeQty, removeFromCart } = useShop()

  return (
    <>
      <ScrollManager />
      <Header
        totalQty={totalQty}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        cart={cart}
        onQtyChange={changeQty}
        onRemove={removeFromCart}
      />
      <main>
        <Outlet />
      </main>
      <Footer />
      <Toast />
    </>
  )
}
