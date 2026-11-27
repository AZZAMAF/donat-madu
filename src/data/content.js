// Satu sumber kebenaran untuk seluruh konten situs.
// Rubah teks di sini, bukan di dalam komponen.

export const NAV_LINKS = [
  { label: 'Home', href: '#top' },
  { label: 'Menu', href: '#menu-list' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export const BRAND = 'Madu Donut'

export const HERO = {
  headline: ['Donat Madu Fresh Baked,', 'Setiap Hari.'],
  subheadline:
    'Kualitas premium dengan sentuhan kelezatan madu murni. Tanpa pemanis buatan, disajikan hangat langsung dari oven.',
  primaryCta: { label: 'Order Now', href: '#menu-list' },
  secondaryCta: { label: 'See Menu', href: '#menu-list' },
  rating: '4.9/5 from 2,300+ honey lovers',
  deliveryNote: 'Same-day warm delivery',
}

export const SIGNATURES = {
  eyebrow: 'Our Signatures',
  title: 'Crafted to Sweet Perfection',
  description:
    'Explore our most cherished honey glazed creations, proofed overnight and finished with authentic artisanal nectars.',
  // Warna kartu dan susunan mengikuti desain Figma (Section 2: Best Sellers).
  items: [
    { number: '01', title: 'Berry Honey Glaze', description: 'Mixed berry glaze with rainbow sprinkles and a light wildflower honey finish.', accent: '#D42F32', dark: false, productId: 6 },
    { number: '02', title: 'Golden Crunch Honey', description: 'Bright honey-lemon glaze topped with crunchy chocolate sprinkles.', accent: '#FFD93D', dark: true, productId: 2 },
    { number: '03', title: 'Matcha Honey Drizzle', description: 'Toasted almond flakes under a silky matcha and raw honey drizzle.', accent: '#CFCB74', dark: true },
    { number: '04', title: 'Choco Honeycomb', description: 'Almond flakes, blueberry glaze and dark chocolate honeycomb lines.', accent: '#609CD6', dark: true, productId: 4 },
  ],
}

export const PROMISES = {
  eyebrow: 'The Madu Promise',
  title: 'Naturally Better, From Hive to Bite',
  items: [
    {
      icon: 'droplet',
      title: 'Real Raw Honey',
      description:
        'Sourced sustainably from local organic beekeepers across Java and Flores. No corn syrup or artificial sweeteners ever.',
    },
    {
      icon: 'bread',
      title: 'Baked Fresh Daily',
      description:
        'Crafted in small batches every morning at 5 AM with French butter and a 24-hour slow-fermented brioche dough.',
    },
    {
      icon: 'truck',
      title: 'Fast Warm Delivery',
      description:
        'Delivered in temperature-controlled insulated eco-boxes so every bite arrives delightfully warm and fluffy.',
    },
  ],
}

export const TESTIMONIALS = {
  eyebrow: 'What Our Guests Say',
  title: 'Love at First Drizzle',
  items: [
    {
      quote:
        'The brioche is unbelievably light, and the raw honey glaze actually tastes like real honey instead of pure sugar. Easily the best donut in Jakarta!',
      author: 'Anindya Putri',
      role: 'Verified Order · 12 Boxes',
    },
    {
      quote:
        'The Honey Butter Sea Salt donut changed my life. Sweet, savory, fluffy perfection. Arrived warm within 35 minutes.',
      author: 'Reza Pratama',
      role: 'Food Reviewer',
    },
    {
      quote:
        'Ordered the 12-donut sharing box for our office meeting. Everyone was asking about the toasted almond flavor. Stunning packaging too.',
      author: 'Clarissa Salim',
      role: 'Corporate Client',
    },
  ],
}

export const CTA_BANNER = {
  title: 'Taste the Golden Difference Today.',
  description:
    'First-time order? Enjoy complimentary warm delivery and a free signature mini donut box on orders over Rp 100.000.',
  buttonText: 'Order Fresh Donuts Now',
}

export const FOOTER = {
  tagline:
    'Artisanal honey-glazed brioche donuts, freshly baked every morning with 100% pure wildflower raw honey.',
  quickLinks: ['Home', 'Menu', 'About', 'Contact', 'Delivery'],
  contact: {
    address: 'Jl. Senopati No. 45, Jakarta',
    phone: '+62 812-3456-7890',
    hours: 'Mon - Sun: 07:00 - 21:00',
  },
  copyright: '© 2026 Madu Donut. All rights reserved.',
}
