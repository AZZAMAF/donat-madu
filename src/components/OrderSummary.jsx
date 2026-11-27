import { formatRupiah } from '../utils/format'

// Ringkasan harga yang sama dipakai di Keranjang, Checkout, dan Pesanan Berhasil.
export default function OrderSummary({ totals, children }) {
  const { subtotal, shipping, discount, total, voucher } = totals
  return (
    <dl className="flex flex-col gap-3 text-sm">
      <div className="flex justify-between">
        <dt className="text-neutral-dark/65">Subtotal</dt>
        <dd className="font-semibold text-neutral-dark">{formatRupiah(subtotal)}</dd>
      </div>
      <div className="flex justify-between">
        <dt className="text-neutral-dark/65">Ongkos kirim</dt>
        <dd className="font-semibold text-neutral-dark">{shipping === 0 ? 'Gratis' : formatRupiah(shipping)}</dd>
      </div>
      {discount > 0 && (
        <div className="flex justify-between text-[#4E7A3A]">
          <dt>Diskon {voucher ? `(${voucher.code})` : ''}</dt>
          <dd className="font-semibold">− {formatRupiah(discount)}</dd>
        </div>
      )}
      {children}
      <div className="mt-1 flex items-center justify-between border-t border-neutral-dark/10 pt-4">
        <dt className="font-semibold text-neutral-dark">Total</dt>
        <dd className="font-headline text-2xl text-accent-dark">{formatRupiah(total)}</dd>
      </div>
    </dl>
  )
}
