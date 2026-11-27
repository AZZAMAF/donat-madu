import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { ADMIN_ACCOUNT, STORAGE_KEYS } from '../data/store'
import useLocalStorage from '../hooks/useLocalStorage'
import { generateOrderId } from '../utils/order'

// Semua data yang dipakai bersama oleh banyak halaman ada di sini:
// produk, keranjang, wishlist, akun, pesanan, dan voucher yang sedang dipakai.
const ShopContext = createContext(null)

export function ShopProvider({ children }) {
  // --- PRODUK ---
  // Data awal dari public/menu.json. Kalau admin sudah mengubah produk,
  // versi admin (localStorage) yang dipakai.
  const [baseMenu, setBaseMenu] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [customProducts, setCustomProducts] = useLocalStorage(STORAGE_KEYS.products, null)

  useEffect(() => {
    fetch('/menu.json')
      .then((res) => {
        if (!res.ok) throw new Error('Gagal memuat menu.')
        return res.json()
      })
      .then((data) => {
        setBaseMenu(data.items)
        setCategories(data.categories)
      })
      .catch((fetchError) => setError(fetchError.message))
      .finally(() => setLoading(false))
  }, [])

  const products = customProducts ?? baseMenu
  const getProduct = useCallback((id) => products.find((p) => p.id === Number(id)), [products])

  const saveProduct = (product) => {
    const list = products
    if (product.id) {
      setCustomProducts(list.map((p) => (p.id === product.id ? product : p)))
    } else {
      const nextId = list.reduce((max, p) => Math.max(max, p.id), 0) + 1
      setCustomProducts([...list, { ...product, id: nextId }])
    }
  }
  const deleteProduct = (id) => setCustomProducts(products.filter((p) => p.id !== id))
  const resetProducts = () => setCustomProducts(null)

  // --- TOAST (notifikasi kecil) ---
  const [toast, setToast] = useState(null)
  const showToast = useCallback((message) => setToast({ message, id: Date.now() }), [])
  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(null), 2600)
    return () => clearTimeout(timer)
  }, [toast])

  // --- KERANJANG ---
  const [cart, setCart] = useLocalStorage(STORAGE_KEYS.cart, [])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const addToCart = (item, qty = 1) => {
    setCart((current) => {
      const available = current.find((c) => c.id === item.id)
      if (available) {
        return current.map((c) => (c.id === item.id ? { ...c, qty: Math.min(99, c.qty + qty) } : c))
      }
      const { id, name, price, image } = item
      return [...current, { id, name, price, image, qty }]
    })
    showToast(`${item.name} masuk keranjang`)
  }
  const removeFromCart = (id) => setCart((current) => current.filter((c) => c.id !== id))
  const changeQty = (id, qty) => setCart((current) => current.map((c) => (c.id === id ? { ...c, qty } : c)))
  const clearCart = () => setCart([])
  const totalQty = cart.reduce((total, item) => total + item.qty, 0)

  // --- VOUCHER YANG DIPILIH ---
  const [voucherCode, setVoucherCode] = useLocalStorage(STORAGE_KEYS.voucher, '')

  // --- WISHLIST ---
  const [wishlist, setWishlist] = useLocalStorage(STORAGE_KEYS.wishlist, [])
  const isWishlisted = (id) => wishlist.includes(id)
  const toggleWishlist = (item) => {
    if (wishlist.includes(item.id)) {
      setWishlist(wishlist.filter((id) => id !== item.id))
      showToast(`${item.name} dihapus dari wishlist`)
    } else {
      setWishlist([...wishlist, item.id])
      showToast(`${item.name} masuk wishlist`)
    }
  }

  // --- AKUN (SIMULASI, tersimpan di localStorage) ---
  const [users, setUsers] = useLocalStorage(STORAGE_KEYS.users, [])
  const [user, setUser] = useLocalStorage(STORAGE_KEYS.session, null)

  const register = ({ name, email, phone, password }) => {
    const cleanEmail = email.trim().toLowerCase()
    if (cleanEmail === ADMIN_ACCOUNT.email || users.some((u) => u.email === cleanEmail)) {
      return { ok: false, message: 'Email sudah terdaftar. Silakan masuk.' }
    }
    const newUser = { name: name.trim(), email: cleanEmail, phone: phone.trim(), password, address: '', role: 'customer' }
    setUsers([...users, newUser])
    setUser(withoutPassword(newUser))
    return { ok: true }
  }

  const login = (email, password) => {
    const cleanEmail = email.trim().toLowerCase()
    if (cleanEmail === ADMIN_ACCOUNT.email && password === ADMIN_ACCOUNT.password) {
      setUser(withoutPassword(ADMIN_ACCOUNT))
      return { ok: true, role: 'admin' }
    }
    const found = users.find((u) => u.email === cleanEmail && u.password === password)
    if (!found) return { ok: false, message: 'Email atau password salah.' }
    setUser(withoutPassword(found))
    return { ok: true, role: found.role }
  }

  const logout = () => setUser(null)

  const updateProfile = (changes) => {
    const updated = { ...user, ...changes }
    setUser(updated)
    setUsers(users.map((u) => (u.email === user.email ? { ...u, ...changes } : u)))
  }

  // --- PESANAN ---
  const [orders, setOrders] = useLocalStorage(STORAGE_KEYS.orders, [])

  const placeOrder = (orderData) => {
    const order = {
      ...orderData,
      id: generateOrderId(),
      userEmail: user?.email ?? null,
      status: 'Menunggu Konfirmasi',
      createdAt: new Date().toISOString(),
    }
    setOrders((current) => [order, ...current])
    clearCart()
    setVoucherCode('')
    return order
  }
  const updateOrderStatus = (id, status) =>
    setOrders((current) => current.map((o) => (o.id === id ? { ...o, status } : o)))
  const getOrder = (id) => orders.find((o) => o.id === id)

  const value = {
    products, categories, loading, error, getProduct, saveProduct, deleteProduct, resetProducts,
    cart, isCartOpen, setIsCartOpen, addToCart, removeFromCart, changeQty, clearCart, totalQty,
    voucherCode, setVoucherCode,
    wishlist, isWishlisted, toggleWishlist,
    user, register, login, logout, updateProfile,
    orders, placeOrder, updateOrderStatus, getOrder,
    toast, showToast,
  }

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}

function withoutPassword(account) {
  const { password: _password, ...rest } = account
  return rest
}

// eslint-disable-next-line react-refresh/only-export-components
export function useShop() {
  const context = useContext(ShopContext)
  if (!context) throw new Error('useShop harus dipakai di dalam <ShopProvider>.')
  return context
}
