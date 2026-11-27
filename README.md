# Donat Madu

Brand: Donat Madu — donat homemade dengan madu asli sebagai pemanis alami.

## Menjalankan

```bash
npm install
npm run css      # terminal 1: Tailwind watch
npm run dev      # terminal 2: buka http://localhost:5173
npm run build    # cek build produksi
```

## 10 Halaman

| # | Halaman | Route |
|---|---------|-------|
| 1 | Home (landing page) | `/` |
| 2 | Promo & Voucher (carousel) | `/promo` |
| 3 | Detail Produk | `/menu/:id` |
| 4 | Keranjang | `/keranjang` |
| 5 | Checkout (kirim ke WhatsApp) | `/checkout` |
| 6 | Pesanan Berhasil | `/pesanan-berhasil/:orderId` |
| 7 | Wishlist | `/wishlist` |
| 8 | Login / Daftar | `/login` |
| 9 | Profil & Riwayat Pesanan | `/profil` |
| 10 | Admin Dashboard | `/admin` |

Bonus: halaman 404 untuk route yang tidak ada.

Data (keranjang, wishlist, akun, pesanan, produk hasil edit admin, voucher) disimpan di
`localStorage` lewat `src/context/ShopContext.jsx`. Login adalah **simulasi** untuk tugas,
bukan autentikasi sungguhan. Akun admin demo: `admin@madudonut.id` / `admin123`.

Kalau di-deploy (Vercel/Netlify), atur rewrite semua route ke `index.html` supaya refresh di `/promo` dan lainnya tidak 404.
