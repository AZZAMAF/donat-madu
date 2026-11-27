import { Link } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import Icon from '../components/Icon'
import OrderSummary from '../components/OrderSummary'
import PageShell from '../components/PageShell'
import QuantityCounter from '../components/QuantityCounter'
import VoucherInput from '../components/VoucherInput'
import { useShop } from '../context/ShopContext'
import { formatRupiah } from '../utils/format'
import { calculateTotals } from '../utils/order'

export default function CartPage() {
  const { cart, changeQty, removeFromCart, clearCart, voucherCode, totalQty } = useShop()
  const totals = calculateTotals(cart, voucherCode)

  return (
    <PageShell title="Keranjang Belanja" eyebrow={`${totalQty} item`} breadcrumb={[{ label: 'Keranjang' }]}>
      {cart.length === 0 ? (
        <EmptyState title="Keranjang masih kosong" description="Yuk pilih donat madu favoritmu dulu." />
      ) : (
        <div className="grid items-start gap-8 lg:grid-cols-[1fr_380px]">
          <div className="rounded-[16px] border border-neutral-dark/10 bg-white">
            <ul className="divide-y divide-neutral-dark/10">
              {cart.map((item) => (
                <li key={item.id} className="flex gap-4 p-5">
                  <Link to={`/menu/${item.id}`} className="shrink-0">
                    <img src={item.image} alt={item.name} className="size-20 rounded-[12px] bg-gold-pale object-cover sm:size-24" />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col justify-between gap-3 sm:flex-row sm:items-center">
                    <div className="min-w-0">
                      <Link to={`/menu/${item.id}`} className="font-headline text-xl leading-tight text-neutral-dark hover:text-secondary">
                        {item.name}
                      </Link>
                      <p className="text-sm text-neutral-dark/60">{formatRupiah(item.price)} / pcs</p>
                    </div>
                    <div className="flex items-center justify-between gap-4 sm:justify-end">
                      <QuantityCounter value={item.qty} name={item.name} onChange={(qty) => changeQty(item.id, qty)} />
                      <strong className="w-28 text-right text-secondary">{formatRupiah(item.price * item.qty)}</strong>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        aria-label={`Hapus ${item.name}`}
                        className="grid size-9 place-items-center rounded-full text-neutral-dark/50 transition hover:bg-accent-red/10 hover:text-accent-red"
                      >
                        <Icon name="trash" className="size-5" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-neutral-dark/10 p-5">
              <Link to="/#menu-list" className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-dark hover:text-secondary">
                <Icon name="arrowLeft" className="size-4" /> Lanjut belanja
              </Link>
              <button type="button" onClick={clearCart} className="text-sm font-semibold text-neutral-dark/60 hover:text-accent-red">
                Kosongkan keranjang
              </button>
            </div>
          </div>

          <aside className="rounded-[16px] border border-neutral-dark/10 bg-white p-6 lg:sticky lg:top-28">
            <h2 className="mb-5 font-headline text-2xl text-neutral-dark">Ringkasan</h2>
            <div className="mb-6">
              <VoucherInput subtotal={totals.subtotal} />
            </div>
            <OrderSummary totals={totals} />
            <Link
              to="/checkout"
              className="mt-6 flex h-12 w-full items-center justify-center rounded-full bg-primary font-semibold text-neutral-dark transition hover:bg-primary-dark"
            >
              Lanjut ke Checkout
            </Link>
          </aside>
        </div>
      )}
    </PageShell>
  )
}
