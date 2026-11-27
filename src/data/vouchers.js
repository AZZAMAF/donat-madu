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
