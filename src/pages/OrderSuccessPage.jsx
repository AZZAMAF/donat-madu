import { Link, useParams } from 'react-router-dom'
import Icon from '../components/Icon'
import OrderSummary from '../components/OrderSummary'
import PageShell from '../components/PageShell'
import { useShop } from '../context/ShopContext'
import { WHATSAPP_NUMBER } from '../data/store'
import { formatRupiah, formatTanggal } from '../utils/format'
import { buildWhatsAppText, DELIVERY_METHODS, PAYMENT_METHODS, whatsAppLink } from '../utils/order'
import NotFoundPage from './NotFoundPage'

export default function OrderSuccessPage() {
  const { orderId } = useParams()
  const { getOrder, user } = useShop()
  const order = getOrder(orderId)

  if (!order) return <NotFoundPage message="Pesanan dengan nomor ini tidak ditemukan." />

  return (
    <PageShell title="Pesanan Berhasil!" breadcrumb={[{ label: 'Pesanan Berhasil' }]}>
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 flex flex-col items-center text-center">
          <span className="mb-5 grid size-20 place-items-center rounded-full bg-[#4E7A3A] text-white shadow-lg">
            <Icon name="check" className="size-10" />
          </span>
          <h2 className="mb-2 font-headline text-3xl text-neutral-dark">Terima kasih, {order.customer.name}!</h2>
          <p className="max-w-md text-neutral-dark/65">
            Pesananmu sudah kami terima dan sedang menunggu konfirmasi. Admin akan menghubungi lewat WhatsApp {order.customer.phone}.
          </p>
        </div>

        <div className="rounded-[16px] border border-neutral-dark/10 bg-white p-6">
          <div className="mb-5 grid gap-4 border-b border-neutral-dark/10 pb-5 text-sm sm:grid-cols-2">
            <Info label="Nomor pesanan" value={order.id} strong />
            <Info label="Waktu pesan" value={formatTanggal(order.createdAt)} />
            <Info label="Status" value={order.status} />
            <Info label="Pengiriman" value={DELIVERY_METHODS.find((d) => d.value === order.delivery)?.label} />
            <Info label="Pembayaran" value={PAYMENT_METHODS.find((p) => p.value === order.payment)?.label} />
            {order.delivery === 'antar' && <Info label="Alamat" value={order.customer.address} />}
          </div>

          <ul className="mb-5 flex flex-col gap-2 border-b border-neutral-dark/10 pb-5 text-sm">
            {order.items.map((item) => (
              <li key={item.id} className="flex justify-between gap-3">
                <span className="text-neutral-dark">{item.qty}× {item.name}</span>
                <span className="font-semibold text-neutral-dark">{formatRupiah(item.price * item.qty)}</span>
              </li>
            ))}
          </ul>

          <OrderSummary totals={{ ...order, voucher: order.voucherCode ? { code: order.voucherCode } : null }} />
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href={whatsAppLink(WHATSAPP_NUMBER, buildWhatsAppText(order))}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-12 items-center gap-2 rounded-full bg-[#25D366] px-6 font-semibold text-white transition hover:bg-[#1EBE5A]"
          >
            <Icon name="chat" className="size-5" /> Kirim ulang ke WhatsApp
          </a>
          <Link to={user ? '/profil' : '/login?redirect=/profil'} className="inline-flex h-12 items-center rounded-full border border-neutral-dark/40 px-6 font-semibold text-neutral-dark transition hover:bg-neutral-dark/5">
            Lihat Riwayat Pesanan
          </Link>
          <Link to="/#menu-list" className="inline-flex h-12 items-center rounded-full bg-primary px-6 font-semibold text-neutral-dark transition hover:bg-primary-dark">
            Belanja Lagi
          </Link>
        </div>
      </div>
    </PageShell>
  )
}

function Info({ label, value, strong }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wider text-neutral-dark/50">{label}</p>
      <p className={strong ? 'font-headline text-xl text-secondary' : 'font-semibold text-neutral-dark'}>{value}</p>
    </div>
  )
}
