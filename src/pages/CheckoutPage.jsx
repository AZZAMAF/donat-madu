import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import Icon from '../components/Icon'
import OrderSummary from '../components/OrderSummary'
import PageShell from '../components/PageShell'
import VoucherInput from '../components/VoucherInput'
import { useShop } from '../context/ShopContext'
import { WHATSAPP_NUMBER } from '../data/store'
import { formatRupiah } from '../utils/format'
import { buildWhatsAppText, calculateTotals, DELIVERY_METHODS, PAYMENT_METHODS, whatsAppLink } from '../utils/order'

const inputClass =
  'w-full rounded-[12px] border border-neutral-dark/20 bg-white px-4 py-3 text-neutral-dark outline-none transition focus:border-secondary'

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { cart, user, voucherCode, placeOrder } = useShop()
  const [form, setForm] = useState({
    name: user?.name ?? '',
    phone: user?.phone ?? '',
    address: user?.address ?? '',
    note: '',
    delivery: 'antar',
    payment: 'cod',
  })
  const [errors, setErrors] = useState({})
  const [sendWhatsApp, setSendWhatsApp] = useState(true)

  const totals = calculateTotals(cart, voucherCode, form.delivery)

  if (cart.length === 0) {
    return (
      <PageShell title="Checkout" breadcrumb={[{ label: 'Keranjang', to: '/keranjang' }, { label: 'Checkout' }]}>
        <EmptyState title="Belum ada yang mau di-checkout" description="Tambahkan donat ke keranjang dulu, ya." />
      </PageShell>
    )
  }

  const update = (field) => (event) => {
    setForm({ ...form, [field]: event.target.value })
    if (errors[field]) setErrors({ ...errors, [field]: undefined })
  }

  const validate = () => {
    const next = {}
    if (form.name.trim().length < 2) next.name = 'Nama wajib diisi.'
    if (!/^(\+62|62|0)8\d{7,11}$/.test(form.phone.replace(/[\s-]/g, ''))) next.phone = 'Nomor HP tidak valid, contoh 0812xxxxxxx.'
    if (form.delivery === 'antar' && form.address.trim().length < 10) next.address = 'Alamat lengkap wajib diisi (min. 10 karakter).'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const submit = (event) => {
    event.preventDefault()
    if (!validate()) return

    const order = placeOrder({
      items: cart,
      customer: { name: form.name.trim(), phone: form.phone.trim(), address: form.address.trim(), note: form.note.trim() },
      delivery: form.delivery,
      payment: form.payment,
      subtotal: totals.subtotal,
      shipping: totals.shipping,
      discount: totals.discount,
      total: totals.total,
      voucherCode: totals.voucher?.code ?? null,
    })

    if (sendWhatsApp) {
      window.open(whatsAppLink(WHATSAPP_NUMBER, buildWhatsAppText(order)), '_blank', 'noopener')
    }
    navigate(`/pesanan-berhasil/${order.id}`)
  }

  return (
    <PageShell
      title="Checkout"
      description="Isi data pengiriman, cek ringkasan, lalu pesananmu dikirim ke WhatsApp Madu Donut."
      breadcrumb={[{ label: 'Keranjang', to: '/keranjang' }, { label: 'Checkout' }]}
    >
      {!user && (
        <p className="mb-6 rounded-[12px] bg-primary/15 px-4 py-3 text-sm text-neutral-dark">
          Sudah punya akun? <Link to="/login?redirect=/checkout" className="font-semibold underline">Masuk</Link> supaya pesanan tersimpan di riwayat profilmu.
        </p>
      )}

      <form onSubmit={submit} noValidate className="grid items-start gap-8 lg:grid-cols-[1fr_400px]">
        <div className="flex flex-col gap-6">
          <fieldset className="rounded-[16px] border border-neutral-dark/10 bg-white p-6">
            <legend className="float-left mb-4 w-full font-headline text-2xl text-neutral-dark">1. Data Pemesan</legend>
            <div className="clear-both grid gap-4 sm:grid-cols-2">
              <Field label="Nama lengkap" error={errors.name}>
                <input value={form.name} onChange={update('name')} className={inputClass} autoComplete="name" />
              </Field>
              <Field label="Nomor WhatsApp" error={errors.phone}>
                <input value={form.phone} onChange={update('phone')} className={inputClass} inputMode="tel" placeholder="0812xxxxxxx" autoComplete="tel" />
              </Field>
            </div>
          </fieldset>

          <fieldset className="rounded-[16px] border border-neutral-dark/10 bg-white p-6">
            <legend className="float-left mb-4 w-full font-headline text-2xl text-neutral-dark">2. Pengiriman</legend>
            <div className="clear-both grid gap-3 sm:grid-cols-2">
              {DELIVERY_METHODS.map((method) => (
                <Choice key={method.value} name="delivery" checked={form.delivery === method.value} value={method.value} onChange={update('delivery')} label={method.label} note={method.note} />
              ))}
            </div>
            {form.delivery === 'antar' && (
              <div className="mt-4">
                <Field label="Alamat lengkap" error={errors.address}>
                  <textarea value={form.address} onChange={update('address')} rows={3} className={inputClass} placeholder="Nama jalan, nomor rumah, kecamatan, patokan" autoComplete="street-address" />
                </Field>
              </div>
            )}
            <div className="mt-4">
              <Field label="Catatan (opsional)">
                <input value={form.note} onChange={update('note')} className={inputClass} placeholder="Contoh: tolong dibungkus kado" />
              </Field>
            </div>
          </fieldset>

          <fieldset className="rounded-[16px] border border-neutral-dark/10 bg-white p-6">
            <legend className="float-left mb-4 w-full font-headline text-2xl text-neutral-dark">3. Pembayaran</legend>
            <div className="clear-both grid gap-3 sm:grid-cols-3">
              {PAYMENT_METHODS.map((method) => (
                <Choice key={method.value} name="payment" checked={form.payment === method.value} value={method.value} onChange={update('payment')} label={method.label} />
              ))}
            </div>
          </fieldset>
        </div>

        <aside className="rounded-[16px] border border-neutral-dark/10 bg-white p-6 lg:sticky lg:top-28">
          <h2 className="mb-5 font-headline text-2xl text-neutral-dark">Ringkasan Pesanan</h2>
          <ul className="mb-5 flex flex-col gap-3 border-b border-neutral-dark/10 pb-5">
            {cart.map((item) => (
              <li key={item.id} className="flex items-center gap-3">
                <img src={item.image} alt="" className="size-12 rounded-[10px] bg-gold-pale object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-neutral-dark">{item.name}</p>
                  <p className="text-xs text-neutral-dark/60">{item.qty} × {formatRupiah(item.price)}</p>
                </div>
                <span className="text-sm font-semibold text-neutral-dark">{formatRupiah(item.price * item.qty)}</span>
              </li>
            ))}
          </ul>
          <div className="mb-5">
            <VoucherInput subtotal={totals.subtotal} />
          </div>
          <OrderSummary totals={totals} />

          <label className="mt-5 flex items-start gap-3 text-sm text-neutral-dark/75">
            <input type="checkbox" checked={sendWhatsApp} onChange={(e) => setSendWhatsApp(e.target.checked)} className="mt-0.5 size-4 accent-[#F2A81D]" />
            Kirim detail pesanan ke WhatsApp toko setelah pesan
          </label>

          <button type="submit" className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#25D366] font-semibold text-white transition hover:bg-[#1EBE5A]">
            <Icon name="chat" className="size-5" /> Pesan Sekarang
          </button>
        </aside>
      </form>
    </PageShell>
  )
}

function Field({ label, error, children }) {
  return (
    <label className="flex flex-col gap-1.5 text-sm font-semibold text-neutral-dark">
      {label}
      {children}
      {error && <span className="text-xs font-medium text-accent-red">{error}</span>}
    </label>
  )
}

function Choice({ name, value, checked, onChange, label, note }) {
  return (
    <label className={`flex cursor-pointer items-start gap-3 rounded-[12px] border p-4 transition ${checked ? 'border-secondary bg-primary/10' : 'border-neutral-dark/15 hover:border-neutral-dark/40'}`}>
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="mt-1 accent-[#C97F0D]" />
      <span>
        <span className="block font-semibold text-neutral-dark">{label}</span>
        {note && <span className="text-xs text-neutral-dark/60">{note}</span>}
      </span>
    </label>
  )
}
