# Donat Madu — Konsep Website E-Commerce

Brand: Donat Madu — donat homemade dengan madu asli sebagai pemanis alami.

## 1. Latar Belakang
Donat Madu menjual donat homemade fresh harian. Saat ini pemesanan masih manual via WA. Website e-commerce dibuat untuk mempermudah pelanggan melihat katalog, memesan, dan membayar secara online.

## 2. Tujuan
- Menampilkan katalog produk (varian, harga, foto).
- Memudahkan pemesanan (keranjang + checkout).
- Meningkatkan jangkauan pelanggan.
- Memudahkan admin mengelola pesanan & stok.

## 3. Target Pengguna
- Pelanggan: pembeli donat (umum, mahasiswa, karyawan).
- Admin: pemilik/tim Donat Madu (kelola produk, pesanan, laporan).

## 4. Fitur Utama
Pelanggan:
- Beranda (hero, promo, produk unggulan)
- Katalog produk (filter varian/harga)
- Detail produk
- Keranjang belanja
- Checkout (data pengiriman, metode bayar)
- Konfirmasi pesanan & tracking nomor resi

Admin:
- Login admin
- CRUD produk (nama, harga, stok, foto)
- Kelola pesanan (status: pending, diproses, dikirim, selesai)
- Laporan penjualan sederhana

## 5. Struktur Halaman
- `/` Beranda
- `/produk` Katalog
- `/produk/:id` Detail
- `/keranjang` Keranjang
- `/checkout` Checkout
- `/tentang` Tentang brand
- `/kontak` Kontak
- `/admin/*` Dashboard admin

## 6. Alur Pemesanan
1. Pelanggan pilih produk → tambah ke keranjang.
2. Checkout → isi data pengiriman.
3. Pilih metode bayar (transfer bank / e-wallet / COD).
4. Sistem buat pesanan (status: pending).
5. Admin verifikasi pembayaran → proses → kirim.
6. Pelanggan terima notifikasi + nomor resi.

## 7. Tech Stack (rencana)
- Frontend: HTML/CSS/JS vanilla (Tailwind opsional nanti).
- Backend: Node.js (Express) atau PHP.
- Database: MySQL/PostgreSQL.
- Payment: manual transfer + konfirmasi (phase 1), payment gateway (phase 2).

## 8. Fase Pengembangan
- Phase 1: landing + katalog + WA order (statis).
- Phase 2: keranjang + checkout manual.
- Phase 3: admin dashboard + payment gateway.

## 9. Catatan
Kode belum dibuat. Repo ini menyimpan konsep/ide terlebih dahulu.