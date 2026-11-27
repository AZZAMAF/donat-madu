import { useState } from 'react'
import { useShop } from '../context/ShopContext'
import { canCancelOrder } from '../utils/order'

// Pelanggan hanya bisa membatalkan pesanan yang belum dikonfirmasi admin.
// Konfirmasi dua langkah di dalam halaman (bukan window.confirm) supaya tidak salah klik.
export default function CancelOrderButton({ order, className = '' }) {
  const { cancelOrder, showToast } = useShop()
  const [confirming, setConfirming] = useState(false)

  if (!canCancelOrder(order)) return null

  if (!confirming) {
    return (
      <button
        type="button"
        onClick={() => setConfirming(true)}
        className={`rounded-full border border-accent-red/40 px-4 py-2 font-semibold text-accent-red transition hover:bg-accent-red/5 ${className}`}
      >
        Batalkan pesanan
      </button>
    )
  }

  return (
    <div className={`flex flex-wrap items-center gap-2 rounded-[14px] bg-accent-red/5 px-4 py-2 ${className}`}>
      <span className="text-sm font-semibold text-accent-red">Yakin batalkan {order.id}?</span>
      <button
        type="button"
        onClick={() => {
          cancelOrder(order.id)
          showToast(`Pesanan ${order.id} dibatalkan`)
          setConfirming(false)
        }}
        className="rounded-full bg-accent-red px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-accent-red/90"
      >
        Ya, batalkan
      </button>
      <button type="button" onClick={() => setConfirming(false)} className="rounded-full px-3 py-1.5 text-sm font-semibold text-neutral-dark/70 hover:text-neutral-dark">
        Tidak jadi
      </button>
    </div>
  )
}
