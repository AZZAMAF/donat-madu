import { Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import AdminPage from './pages/AdminPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'
import OrderSuccessPage from './pages/OrderSuccessPage'
import ProductDetailPage from './pages/ProductDetailPage'
import ProfilePage from './pages/ProfilePage'
import PromoPage from './pages/PromoPage'
import WishlistPage from './pages/WishlistPage'

// Peta semua halaman. Header, footer, dan notifikasi ada di MainLayout
// supaya tampil sama di setiap halaman toko. Admin punya tampilan sendiri.
export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/promo" element={<PromoPage />} />
        <Route path="/menu/:id" element={<ProductDetailPage />} />
        <Route path="/keranjang" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/pesanan-berhasil/:orderId" element={<OrderSuccessPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profil" element={<ProfilePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  )
}
