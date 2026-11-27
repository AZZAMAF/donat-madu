// Satu sumber kebenaran untuk seluruh konten situs.
// Rubah teks di sini, bukan di dalam komponen.

export const NAV_LINKS = [
  { label: 'Beranda', href: '#top' },
  { label: 'Menu', href: '#menu-list' },
  { label: 'Tentang', href: '#about' },
  { label: 'Kontak', href: '#contact' },
]

export const BRAND = 'Madu Donut'

export const HERO = {
  headline: ['Donat Madu Hangat,', 'Dipanggang Setiap Hari.'],
  subheadline:
    'Kualitas premium dengan sentuhan kelezatan madu murni. Tanpa pemanis buatan, disajikan hangat langsung dari oven.',
  primaryCta: { label: 'Pesan Sekarang', href: '#menu-list' },
  secondaryCta: { label: 'Lihat Menu', href: '#menu-list' },
  rating: '4.9/5 dari 2.300+ pencinta madu',
  deliveryNote: 'Antar hangat di hari yang sama',
}

export const SIGNATURES = {
  eyebrow: 'Andalan Kami',
  title: 'Dibuat untuk Manis yang Sempurna',
  description:
    'Jelajahi kreasi donat glaze madu favorit kami, adonannya difermentasi semalaman dan diselesaikan dengan madu murni pilihan.',
  // Warna kartu dan susunan mengikuti desain Figma (Section 2: Best Sellers).
  items: [
    { number: '01', title: 'Berry Honey Glaze', description: 'Glaze campuran beri dengan taburan pelangi dan sentuhan madu bunga liar.', accent: '#D42F32', dark: false, productId: 6 },
    { number: '02', title: 'Golden Crunch Honey', description: 'Glaze madu lemon yang segar dengan taburan cokelat renyah.', accent: '#FFD93D', dark: true, productId: 2 },
    { number: '03', title: 'Matcha Honey Drizzle', description: 'Irisan almond panggang di bawah siraman matcha lembut dan madu murni.', accent: '#CFCB74', dark: true, productId: 12 },
    { number: '04', title: 'Choco Honeycomb', description: 'Irisan almond, glaze blueberry dan garis honeycomb cokelat hitam.', accent: '#609CD6', dark: true, productId: 4 },
  ],
}

export const PROMISES = {
  eyebrow: 'Janji Madu Donut',
  title: 'Alami dari Sarang Lebah sampai Gigitan',
  items: [
    {
      icon: 'droplet',
      title: 'Madu Murni Asli',
      description:
        'Diambil langsung dari peternak lebah organik di Jawa dan Flores. Tanpa sirup jagung atau pemanis buatan.',
    },
    {
      icon: 'bread',
      title: 'Dipanggang Segar Setiap Hari',
      description:
        'Dibuat dalam jumlah kecil setiap pagi jam 5 dengan mentega Prancis dan adonan brioche yang difermentasi 24 jam.',
    },
    {
      icon: 'truck',
      title: 'Antar Cepat, Tetap Hangat',
      description:
        'Dikirim dalam kotak ramah lingkungan berinsulasi supaya donat sampai tetap hangat dan empuk.',
    },
  ],
}

export const TESTIMONIALS = {
  eyebrow: 'Kata Pelanggan Kami',
  title: 'Jatuh Cinta di Gigitan Pertama',
  items: [
    {
      quote:
        'Brioche-nya ringan banget, dan glaze madunya beneran terasa madu, bukan cuma gula. Donat terenak di Jakarta!',
      author: 'Anindya Putri',
      role: 'Pembeli Terverifikasi · 12 Kotak',
    },
    {
      quote:
        'Donat Honey Butter Sea Salt-nya juara. Manis, gurih, empuk sempurna. Sampai masih hangat dalam 35 menit.',
      author: 'Reza Pratama',
      role: 'Pengulas Kuliner',
    },
    {
      quote:
        'Pesan kotak isi 12 buat rapat kantor. Semua orang nanyain rasa almond panggangnya. Kemasannya juga cantik.',
      author: 'Clarissa Salim',
      role: 'Klien Korporat',
    },
  ],
}

export const CTA_BANNER = {
  title: 'Rasakan Bedanya Hari Ini.',
  description:
    'Pertama kali pesan? Nikmati gratis ongkir dan bonus kotak donat mini untuk belanja di atas Rp 100.000.',
  buttonText: 'Pesan Donat Sekarang',
}

export const FOOTER = {
  tagline:
    'Donat brioche glaze madu buatan tangan, dipanggang segar setiap pagi dengan 100% madu bunga liar murni.',
  quickLinks: ['Beranda', 'Menu', 'Tentang', 'Kontak'],
  contact: {
    address: 'Jl. Senopati No. 45, Jakarta',
    phone: '+62 812-3456-7890',
    hours: 'Senin - Minggu: 07.00 - 21.00',
  },
  copyright: '© 2026 Madu Donut. Hak cipta dilindungi.',
}
