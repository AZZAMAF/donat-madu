// Satu-satunya tempat format Rupiah. Harga selalu disimpan sebagai angka,
// baru diubah jadi teks saat ditampilkan.
export function formatRupiah(value) {
  return `Rp ${Math.round(Number(value) || 0).toLocaleString('id-ID')}`
}

export function formatTanggal(isoString) {
  return new Date(isoString).toLocaleString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// Nama kategori disimpan dalam bahasa Inggris (dipakai sebagai kunci data),
// tapi ditampilkan dalam bahasa Indonesia.
const CATEGORY_LABELS = {
  All: 'Semua',
  'Classic Glazed': 'Glaze Klasik',
  'Chocolate & Honey': 'Cokelat & Madu',
  'Fruity Infusions': 'Rasa Buah',
  'Box Sets & Bundles': 'Paket Box',
}

export function categoryLabel(category) {
  return CATEGORY_LABELS[category] ?? category
}
