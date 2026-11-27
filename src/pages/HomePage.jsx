import Hero from '../components/Hero'
import MenuSection from '../components/MenuSection'
import Promises from '../components/Promises'
import Signatures from '../components/Signatures'
import Testimonials from '../components/Testimonials'
import Wishlist from '../components/Wishlist'
import { useShop } from '../context/ShopContext'

// Landing page asli, isinya sama seperti sebelumnya. Bedanya, data menu dan
// keranjang sekarang diambil dari ShopContext supaya bisa dipakai halaman lain juga.
export default function HomePage() {
  const { products, categories, loading, error, addToCart } = useShop()

  return (
    <>
      <Hero />
      <Signatures />
      <Promises />
      <MenuSection
        menus={products}
        categories={categories}
        loading={loading}
        error={error}
        onAddToCart={addToCart}
      />
      <Wishlist />
      <Testimonials />
    </>
  )
}
