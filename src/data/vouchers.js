// Daftar voucher. type:
// - percent  : potongan persen dari subtotal (dibatasi maxDiscount)
// - fixed    : potongan nominal tetap
// - shipping : gratis ongkir
export const SHIPPING_FEE = 10000

export const VOUCHERS = [
  {
    code: 'HONEY15',
    title: 'Diskon 15% Semua Donat',
    description: 'Potongan 15% untuk belanja minimal Rp 100.000, maksimal potongan Rp 30.000.',
    type: 'percent',
    value: 15,
    maxDiscount: 30000,
    minSpend: 100000,
    color: '#F2A81D',
    validUntil: '2026-12-31',
  },
  {
    code: 'MADUBARU',
    title: 'Potongan Rp 10.000 Pelanggan Baru',
    description: 'Hemat Rp 10.000 untuk pesanan pertamamu, minimal belanja Rp 50.000.',
    type: 'fixed',
    value: 10000,
    minSpend: 50000,
    color: '#BD4A42',
    validUntil: '2026-12-31',
  },
  {
    code: 'ONGKIRGRATIS',
    title: 'Gratis Ongkir Se-Jakarta',
    description: 'Ongkos kirim Rp 10.000 jadi gratis untuk belanja minimal Rp 75.000.',
    type: 'shipping',
    value: SHIPPING_FEE,
    minSpend: 75000,
    color: '#718D62',
    validUntil: '2026-12-31',
  },
  {
    code: 'BOXHEMAT',
    title: 'Hemat 20% Box Sharing',
    description: 'Potongan 20% untuk belanja minimal Rp 250.000, cocok untuk acara kantor. Maksimal Rp 60.000.',
    type: 'percent',
    value: 20,
    maxDiscount: 60000,
    minSpend: 250000,
    color: '#5C7181',
    validUntil: '2026-12-31',
  },
  {
    code: 'MEMBER10',
    title: 'Diskon Member 10%',
    description: 'Khusus pelanggan yang punya akun: potongan 10% minimal belanja Rp 60.000, maksimal Rp 20.000.',
    type: 'percent',
    value: 10,
    maxDiscount: 20000,
    minSpend: 60000,
    color: '#805600',
    validUntil: '2026-12-31',
  },
  {
    code: 'HAPPYHOUR',
    title: 'Happy Hour Hemat Rp 5.000',
    description: 'Ngemil sore lebih hemat Rp 5.000 untuk belanja minimal Rp 40.000.',
    type: 'fixed',
    value: 5000,
    minSpend: 40000,
    color: '#C97F0D',
    validUntil: '2026-12-31',
  },
  {
    code: 'FLASHMADU',
    title: 'Flash Voucher 25%',
    description: 'Diskon 25% minimal belanja Rp 80.000, maksimal Rp 25.000. Hanya berlaku hari ini!',
    type: 'percent',
    value: 25,
    maxDiscount: 25000,
    minSpend: 80000,
    color: '#B3261E',
    validUntil: '2026-12-31',
    flash: true,
  },
]

export const VOUCHER_TYPE_LABELS = {
  percent: 'Diskon %',
  fixed: 'Potongan Harga',
  shipping: 'Gratis Ongkir',
}

export const PROMO_PROGRAMS = [
  { title: 'Beli 6 Lebih Hemat', description: '6-Box Honey Assortment lebih hemat dibanding beli enam donat satuan.', icon: 'box' },
  { title: 'Ulang Tahun Gratis Donat', description: 'Tunjukkan KTP di toko saat ulang tahun, dapat 1 Classic Wildflower Glaze gratis.', icon: 'star' },
  { title: 'Antar Hangat 45 Menit', description: 'Pesanan se-Jakarta Selatan sampai dalam 45 menit, masih hangat.', icon: 'truck' },
  { title: 'Kumpulkan Poin Madu', description: 'Setiap belanja Rp 10.000 dapat 1 poin. 50 poin bisa ditukar 1 box donat.', icon: 'flower' },
]

export const PROMO_SLIDES = [
  {
    eyebrow: 'Promo Akhir Tahun',
    title: 'Diskon 15% untuk Semua Donat Madu',
    description: 'Pakai kode HONEY15 untuk belanja minimal Rp 100.000.',
    code: 'HONEY15',
    image: '/images/menu-1.jpg',
    bg: '#F2A81D',
    dark: true,
  },
  {
    eyebrow: 'Khusus Pelanggan Baru',
    title: 'Pesanan Pertama Hemat Rp 10.000',
    description: 'Coba donat madu favoritmu dengan kode MADUBARU.',
    code: 'MADUBARU',
    image: '/images/menu-6.jpg',
    bg: '#BD4A42',
  },
  {
    eyebrow: 'Antar Hangat',
    title: 'Gratis Ongkir Se-Jakarta',
    description: 'Belanja minimal Rp 75.000 dan donat sampai tanpa ongkir.',
    code: 'ONGKIRGRATIS',
    image: '/images/menu-3.jpg',
    bg: '#718D62',
  },
  {
    eyebrow: 'Untuk Kantor & Acara',
    title: 'Box Sharing Hemat 20%',
    description: 'Pesan 12-Box Office Sharing lebih hemat dengan kode BOXHEMAT.',
    code: 'BOXHEMAT',
    image: '/images/menu-9.jpg',
    bg: '#5C7181',
  },
]
