import { FOOTER } from './content'

// Nomor WhatsApp toko diambil dari kontak footer supaya cukup diubah di satu tempat.
export const WHATSAPP_NUMBER = FOOTER.contact.phone.replace(/\D/g, '')

// SIMULASI: akun admin demo. Di aplikasi sungguhan login harus dicek di server,
// password tidak boleh disimpan di kode atau localStorage.
export const ADMIN_ACCOUNT = {
  name: 'Admin Madu Donut',
  email: 'admin@madudonut.id',
  password: 'admin123',
  role: 'admin',
}

// SIMULASI: akun pelanggan demo supaya presentasi tidak perlu daftar dulu.
export const DEMO_CUSTOMER = {
  name: 'Pelanggan Demo',
  email: 'pelanggan@madudonut.id',
  password: 'demo123',
  phone: '081234567890',
  address: '',
  role: 'customer',
  provider: 'email',
  addresses: [],
}

export const STORAGE_KEYS = {
  cart: 'madu_donat_cart',
  wishlist: 'madu_donat_wishlist',
  notes: 'madu_donat_wishlist_notes',
  users: 'madu_donat_users',
  session: 'madu_donat_session',
  orders: 'madu_donat_orders',
  products: 'madu_donat_products',
  voucher: 'madu_donat_voucher',
  remember: 'madu_donat_remember',
  lastEmail: 'madu_donat_last_email',
}
