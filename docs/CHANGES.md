# Dokumentasi Perubahan: 10 Halaman E-commerce Madu Donut

Dokumen ini menjelaskan perubahan di branch `feature/halaman-ecommerce`,
supaya developer atau AI agent lain bisa langsung paham struktur dan alurnya.

## Daftar commit

| Commit | Isi |
|--------|-----|
| `9b58f6a` feat: tambah 9 halaman e-commerce dengan React Router dan ShopContext | Semua halaman baru, router, context bersama, util harga/voucher, dan penyesuaian kecil di landing page. |
| (commit ini) docs: dokumentasi perubahan | File ini. |

Sebelum branch ini, `main` berisi landing page satu halaman (commit terakhir `46efd0c`).

## Dependensi baru

- `react-router-dom@7` untuk routing.

## Routes (10 halaman + 404)

| # | Halaman | Route | File |
|---|---------|-------|------|
| 1 | Home (landing page) | `/` | `src/pages/HomePage.jsx` |
| 2 | Promo & Voucher | `/promo` | `src/pages/PromoPage.jsx` |
| 3 | Detail Produk | `/menu/:id` | `src/pages/ProductDetailPage.jsx` |
| 4 | Keranjang | `/keranjang` | `src/pages/CartPage.jsx` |
| 5 | Checkout (kirim ke WhatsApp) | `/checkout` | `src/pages/CheckoutPage.jsx` |
| 6 | Pesanan Berhasil | `/pesanan-berhasil/:orderId` | `src/pages/OrderSuccessPage.jsx` |
| 7 | Wishlist | `/wishlist` | `src/pages/WishlistPage.jsx` |
| 8 | Login / Daftar | `/login` (`?redirect=`, `?mode=daftar`) | `src/pages/LoginPage.jsx` |
| 9 | Profil & Riwayat Pesanan | `/profil` (redirect ke login jika belum masuk) | `src/pages/ProfilePage.jsx` |
| 10 | Admin Dashboard | `/admin` (punya login sendiri) | `src/pages/AdminPage.jsx` |
| + | 404 | `*` | `src/pages/NotFoundPage.jsx` |

Peta route ada di `src/App.jsx`. Halaman 1 sampai 9 dan 404 memakai `src/layouts/MainLayout.jsx`
(Header + Footer + Toast + ScrollManager). Admin punya header sendiri.

## Struktur folder baru

```
src/
  App.jsx                 peta route
  main.jsx                BrowserRouter + ShopProvider
  context/ShopContext.jsx state bersama + hook useShop()
  hooks/useLocalStorage.js useState yang otomatis tersimpan di localStorage
  layouts/MainLayout.jsx  layout toko
  pages/                  10 halaman + 404
  components/             (baru) PageShell, EmptyState, OrderSummary, VoucherInput,
                          PromoCarousel, StatusBadge, Toast, ScrollManager
  data/vouchers.js        daftar voucher, slide promo, ongkir
  data/store.js           nomor WhatsApp, akun admin demo, nama key localStorage
  utils/format.js         formatRupiah(), formatTanggal()
  utils/order.js          calculateTotals(), checkVoucher(), buildWhatsAppText(), status pesanan
```

## State bersama (`useShop()` dari `ShopContext`)

| Bagian | Isi |
|--------|-----|
| Produk | `products`, `categories`, `loading`, `error`, `getProduct`, `saveProduct`, `deleteProduct`, `resetProducts`. Data awal dari `public/menu.json`; kalau admin mengedit, versi admin dipakai. |
| Keranjang | `cart`, `addToCart(item, qty)`, `removeFromCart`, `changeQty`, `clearCart`, `totalQty`, `isCartOpen` |
| Voucher | `voucherCode`, `setVoucherCode` (dipilih di Promo, dipakai di Keranjang/Checkout) |
| Wishlist | `wishlist` (array id), `isWishlisted`, `toggleWishlist` |
| Akun | `user`, `register`, `login`, `logout`, `updateProfile` |
| Pesanan | `orders`, `placeOrder`, `updateOrderStatus`, `getOrder` |
| Notifikasi | `toast`, `showToast` |

## Key localStorage

| Key | Isi |
|-----|-----|
| `madu_donat_cart` | isi keranjang (key lama, tetap dipakai) |
| `madu_donat_wishlist` | id produk favorit |
| `madu_donat_wishlist_notes` | catatan rasa di halaman Wishlist |
| `madu_donat_users` | akun terdaftar (simulasi) |
| `madu_donat_session` | akun yang sedang masuk |
| `madu_donat_orders` | semua pesanan |
| `madu_donat_products` | produk hasil edit admin (`null` = pakai menu.json) |
| `madu_donat_voucher` | kode voucher yang dipilih |

## Aturan harga

- Harga selalu angka, diformat lewat `formatRupiah()` saja.
- Semua total dihitung di `calculateTotals()`: subtotal, ongkir Rp 10.000 (gratis jika ambil di toko), diskon voucher, total.
- Voucher: `HONEY15` (15%, min Rp 100rb, maks Rp 30rb), `MADUBARU` (Rp 10rb, min Rp 50rb),
  `ONGKIRGRATIS` (gratis ongkir, min Rp 75rb), `BOXHEMAT` (20%, min Rp 250rb, maks Rp 60rb).

## Yang berubah di landing page

Tampilan landing tetap sama, kecuali bagian menu.

- `MenuCard.jsx`: gambar dan nama bisa diklik ke `/menu/:id`, tombol hati wishlist, link "Lihat detail".
- `MenuSection.jsx`: link "Explore Full Menu (18 Flavors)" diganti "Lihat Promo & Voucher Hari Ini" ke `/promo`.
- `CartDropdown.jsx`: tombol Checkout ke `/checkout` + link "Lihat keranjang lengkap".
- `Header.jsx`: ikon Search ke `/#menu-list`, ikon Profil ke `/profil`, link nav jadi `/#anchor` supaya jalan dari halaman lain.
- `Footer.jsx`: link jadi `/#anchor` (alasannya sama).
- `IconButton.jsx`: prop `to` opsional (jadi Link).
- `Icon.jsx`: ikon baru (heart, trash, arrow, check, tag, chat, box, chart, logout, copy, edit).
- `App.jsx`: isi landing dipindah ke `pages/HomePage.jsx`; fetch menu dan cart dipindah ke context. `PLACEHOLDER_CART` dihapus.
- Komponen `Wishlist.jsx` lama (belum ada styling) masih tampil di landing dan tidak diubah.

## Cara menjalankan

```bash
npm install
npm run css   # terminal 1
npm run dev   # terminal 2, buka http://localhost:5173
npm run build
```

Akun admin demo: `admin@madudonut.id` / `admin123`.
Login adalah **simulasi** (data di localStorage), bukan autentikasi sungguhan.
Saat deploy, rewrite semua route ke `index.html`.

## Skenario demo

Promo → pilih voucher → Home, tambah donat → Detail Produk → Keranjang → Checkout → Pesanan Berhasil
→ Daftar akun → Profil (riwayat) → `/admin`, ubah status pesanan → cek lagi di Profil.
