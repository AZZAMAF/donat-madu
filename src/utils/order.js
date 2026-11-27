import { SHIPPING_FEE, VOUCHERS } from '../data/vouchers'

export function findVoucher(code) {
  if (!code) return null
  return VOUCHERS.find((v) => v.code === code.trim().toUpperCase()) ?? null
}

// Cek apakah voucher boleh dipakai untuk subtotal tertentu.
export function checkVoucher(code, subtotal) {
  const voucher = findVoucher(code)
  if (!voucher) return { ok: false, message: 'Kode voucher tidak ditemukan.' }
  if (subtotal < voucher.minSpend) {
    return {
      ok: false,
      voucher,
      message: `Minimal belanja Rp ${voucher.minSpend.toLocaleString('id-ID')} untuk ${voucher.code}.`,
    }
  }
  return { ok: true, voucher, message: `Voucher ${voucher.code} terpasang.` }
}

// Semua hitungan harga ada di sini supaya Keranjang, Checkout, dan Admin selalu sama.
export function calculateTotals(cart, voucherCode, deliveryMethod = 'antar') {
  const subtotal = cart.reduce((total, item) => total + item.price * item.qty, 0)
  const shipping = deliveryMethod === 'ambil' || subtotal === 0 ? 0 : SHIPPING_FEE
  const result = checkVoucher(voucherCode, subtotal)

  let discount = 0
  if (result.ok) {
    const v = result.voucher
    if (v.type === 'percent') discount = Math.min((subtotal * v.value) / 100, v.maxDiscount ?? Infinity)
    if (v.type === 'fixed') discount = Math.min(v.value, subtotal)
    if (v.type === 'shipping') discount = shipping
  }
  discount = Math.round(discount)

  return {
    subtotal,
    shipping,
    discount,
    total: Math.max(0, subtotal + shipping - discount),
    voucher: result.ok ? result.voucher : null,
    voucherMessage: voucherCode ? result.message : '',
  }
}

export function generateOrderId() {
  const random = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `MD-${Date.now().toString().slice(-6)}${random}`
}

export const ORDER_STATUSES = ['Menunggu Konfirmasi', 'Diproses', 'Dikirim', 'Selesai', 'Dibatalkan']

// Pelanggan boleh membatalkan selama admin belum memproses pesanan.
export const canCancelOrder = (order) => order?.status === 'Menunggu Konfirmasi'

export const PAYMENT_METHODS = [
  { value: 'cod', label: 'Bayar di tempat (COD)' },
  { value: 'transfer', label: 'Transfer bank' },
  { value: 'qris', label: 'QRIS / e-wallet' },
]

export const DELIVERY_METHODS = [
  { value: 'antar', label: 'Diantar kurir', note: 'Ongkir Rp 10.000, sampai ± 45 menit' },
  { value: 'ambil', label: 'Ambil di toko', note: 'Gratis, Jl. Senopati No. 45' },
]

// Teks pesanan yang dikirim ke WhatsApp toko.
export function buildWhatsAppText(order) {
  const rp = (n) => `Rp ${Math.round(n).toLocaleString('id-ID')}`
  const lines = [
    `Halo Madu Donut, saya mau pesan (No. ${order.id}):`,
    '',
    ...order.items.map((item) => `• ${item.qty}x ${item.name} = ${rp(item.price * item.qty)}`),
    '',
    `Subtotal: ${rp(order.subtotal)}`,
    `Ongkir: ${order.shipping === 0 ? 'Gratis' : rp(order.shipping)}`,
  ]
  if (order.discount > 0) lines.push(`Diskon (${order.voucherCode}): -${rp(order.discount)}`)
  lines.push(
    `*Total: ${rp(order.total)}*`,
    '',
    `Nama: ${order.customer.name}`,
    `No. HP: ${order.customer.phone}`,
    `Pengiriman: ${DELIVERY_METHODS.find((d) => d.value === order.delivery)?.label}`,
  )
  if (order.delivery === 'antar') lines.push(`Alamat: ${order.customer.address}`)
  lines.push(`Pembayaran: ${PAYMENT_METHODS.find((p) => p.value === order.payment)?.label}`)
  if (order.customer.note) lines.push(`Catatan: ${order.customer.note}`)
  return lines.join('\n')
}

export function whatsAppLink(number, text) {
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`
}
