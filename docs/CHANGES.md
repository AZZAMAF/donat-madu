# Dokumentasi Perubahan: 10 Halaman E-commerce Madu Donut

Dokumen ini menjelaskan perubahan di branch `feature/halaman-ecommerce`,
supaya developer atau AI agent lain bisa langsung paham struktur dan alurnya.

## Daftar commit

| Commit | Isi |
|--------|-----|
| `9b58f6a` feat: tambah 9 halaman e-commerce dengan React Router dan ShopContext | Semua halaman baru, router, context bersama, util harga/voucher, dan penyesuaian kecil di landing page. |
| docs: dokumentasi perubahan | File ini. |
| feat: login Google, menu akun, profil pelanggan, login demo | Tombol Google (asli/demo), menu akun di header, profil dengan tab, alamat tersimpan, tombol akun demo, lihat password, "Ingat saya". |
| feat: carousel promo di landing, search bar, dan wishlist landing | Revisi: carousel pindah ke landing (`PromoHighlight`), halaman Promo diperkaya, search di header jalan, section Wishlist di landing didesain ulang. |

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
| `madu_donat_remember` | pilihan "Ingat saya" (`false` = sesi hilang saat tab ditutup) |
| `madu_donat_last_email` | email terakhir yang dipakai masuk (diisi otomatis di form) |

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
- `Signatures.jsx` (section `#menu`): 4 gambar donat dari desain (`assets/signatures/`) menggantikan gambar hero yang sama, plus ornamen swirl.
- `Icon.jsx`: ikon baru (heart, trash, arrow, check, tag, chat, box, chart, logout, copy, edit).
- `App.jsx`: isi landing dipindah ke `pages/HomePage.jsx`; fetch menu dan cart dipindah ke context. `PLACEHOLDER_CART` dihapus.
- `PromoHighlight.jsx` (baru): section "Promo Hari Ini" tepat di bawah Hero, berisi carousel. Tombol "Lihat Promo" atau gambar slide membuka `/promo#KODE` dan promo itu disorot.
- `HeaderSearch.jsx` (baru): ikon Search membuka kotak pencarian. Hasil tersaring saat mengetik (nama, kategori, deskripsi), klik hasil atau Enter ke Detail Produk.
- `Wishlist.jsx`: didesain ulang (input dan tombol sesuai tema, centang sudah dicoba, hapus, progress) dan sekarang memakai key `madu_donat_wishlist_notes`, sama dengan halaman Wishlist.

## Halaman Promo

Isi: Flash Voucher dengan hitung mundur sampai tengah malam, Promo Unggulan (4 kartu, bisa di-link lewat `#KODE`),
Semua Voucher dengan filter jenis, Program Spesial, Paket Hemat (produk Box Sets), dan Syarat & Ketentuan.
Voucher tambahan: `MEMBER10`, `HAPPYHOUR`, `FLASHMADU` (25%, min Rp 80rb, maks Rp 25rb).

## Cara menjalankan

```bash
npm install
npm run css   # terminal 1
npm run dev   # terminal 2, buka http://localhost:5173
npm run build
```

Akun demo (bisa juga lewat tombol sekali klik di halaman Login):

| Peran | Email | Password |
|-------|-------|----------|
| Admin | `admin@madudonut.id` | `admin123` |
| Pelanggan | `pelanggan@madudonut.id` | `demo123` |
Login adalah **simulasi** (data di localStorage), bukan autentikasi sungguhan.
Saat deploy, rewrite semua route ke `index.html`.

## Skenario demo

Promo → pilih voucher → Home, tambah donat → Detail Produk → Keranjang → Checkout → Pesanan Berhasil
→ Daftar akun → Profil (riwayat) → `/admin`, ubah status pesanan → cek lagi di Profil.

## Login & Akun

- **Login Google** (`components/GoogleLoginButton.jsx`, paket `@react-oauth/google`). Kalau `VITE_GOOGLE_CLIENT_ID` diisi di `.env`, tombol memakai Google Identity Services asli dan nama, email, serta foto diambil dari token Google. Kalau kosong, tombol membuka pemilih akun demo yang diberi label jelas.
- **Cara dapat Client ID Google:**
  1. Buka https://console.cloud.google.com, buat project.
  2. Menu *APIs & Services → OAuth consent screen*, pilih External, isi nama aplikasi dan email.
  3. Menu *Credentials → Create Credentials → OAuth client ID*, tipe *Web application*.
  4. Di *Authorized JavaScript origins* tambahkan `http://localhost:5173` (dan domain deploy nanti).
  5. Salin Client ID ke file `.env` (contoh di `.env.example`): `VITE_GOOGLE_CLIENT_ID=xxxx.apps.googleusercontent.com`, lalu jalankan ulang `npm run dev`.
- **Menu akun** (`components/UserMenu.jsx`): belum masuk, ikon orang membuka `/login`. Sudah masuk, ikon berubah jadi foto/inisial dan membuka menu Profil, Pesanan, Alamat, Wishlist, Admin (khusus admin), Keluar.
- **Profil** (`/profil`) punya tab lewat hash: `#pesanan` (riwayat, filter, progres status, pesan lagi), `#alamat` (tambah, ubah, hapus, alamat utama), `#akun` (data diri), `#voucher`. Alamat tersimpan bisa dipilih di Checkout.
- **Login praktis:** tombol "Masuk sebagai Admin/Pelanggan", ikon mata untuk melihat password, centang "Ingat saya" (default aktif, sesi tetap ada walau browser ditutup), email terakhir terisi otomatis, pesan error yang membedakan email tidak terdaftar dan password salah.
