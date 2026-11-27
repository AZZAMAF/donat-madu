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
