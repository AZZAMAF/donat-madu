import QuantityCounter from './QuantityCounter'

export default function CartDropdown({ cart, onQtyChange, onRemove }) {
  const totalHarga = cart.reduce((total, item) => total + item.price * item.qty, 0)

  return (
    // Wrapper ini sengaja tinggi lebih dulu lewat pt-2: padding termasuk bagian
    // dari elemen, jadi pointer yang lewat ke panel masih di dalam wrapper Header
    // (onMouseLeave tidak kepanggil di tengah jalan).
    <div className="absolute right-0 top-full z-50 w-[min(22rem,_calc(100vw-6rem))] pt-2">
      <div className="rounded-[16px] border border-neutral-dark/10 bg-white p-5 shadow-xl shadow-neutral-dark/10">
        {cart.length === 0 ? (
          <p className="py-8 text-center text-sm text-neutral-dark/60">Keranjang masih kosong.</p>
        ) : (
          <>
            <ul className="flex flex-col gap-4">
              {cart.map((item) => (
                <li key={item.id} className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate font-headline text-lg leading-tight text-neutral-dark">{item.name}</p>
                    <p className="text-sm font-semibold text-secondary">
                      Rp {(item.price * item.qty).toLocaleString('id-ID')}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-1">
                    <QuantityCounter value={item.qty} name={item.name} onChange={(qty) => onQtyChange(item.id, qty)} />
                    <button
                      type="button"
                      aria-label={`Hapus ${item.name} dari keranjang`}
                      onClick={() => onRemove(item.id)}
                      className="grid size-7 place-items-center rounded-full text-lg leading-none text-neutral-dark/45 transition hover:bg-accent-red/10 hover:text-accent-red"
                    >
                      ×
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex items-center justify-between border-t border-neutral-dark/10 pt-4">
              <span className="font-semibold text-neutral-dark">Total</span>
              <strong className="text-secondary">Rp {totalHarga.toLocaleString('id-ID')}</strong>
            </div>

            <button
              type="button"
              // TODO(gua): rangkai checkout (pembayaran / halaman terima kasih).
              className="mt-4 w-full rounded-full bg-primary py-3 font-semibold text-neutral-dark transition hover:bg-primary-dark"
            >
              Checkout
            </button>
          </>
        )}
      </div>
    </div>
  )
}
