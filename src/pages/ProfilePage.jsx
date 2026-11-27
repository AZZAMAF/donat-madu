import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import Avatar from '../components/Avatar'
import EmptyState from '../components/EmptyState'
import Icon from '../components/Icon'
import PageShell from '../components/PageShell'
import StatusBadge from '../components/StatusBadge'
import { useShop } from '../context/ShopContext'
import { VOUCHERS } from '../data/vouchers'
import { formatRupiah, formatTanggal } from '../utils/format'

const inputClass =
  'w-full rounded-[12px] border border-neutral-dark/20 bg-white px-4 py-3 text-neutral-dark outline-none transition focus:border-secondary'

const TABS = [
  { id: 'pesanan', label: 'Pesanan Saya', icon: 'bag' },
  { id: 'alamat', label: 'Alamat Tersimpan', icon: 'truck' },
  { id: 'akun', label: 'Data Diri', icon: 'person' },
  { id: 'voucher', label: 'Voucher Saya', icon: 'tag' },
]

export default function ProfilePage() {
  const { user, orders, wishlist, products, voucherCode, logout } = useShop()
  const { hash } = useLocation()
  const navigate = useNavigate()

  if (!user) return <Navigate to="/login?redirect=/profil" replace />

  const tab = TABS.some((t) => `#${t.id}` === hash) ? hash.slice(1) : 'pesanan'
  const myOrders = orders.filter((o) => o.userEmail === user.email)
  const totalSpent = myOrders.filter((o) => o.status !== 'Dibatalkan').reduce((sum, o) => sum + o.total, 0)
  const savedProducts = products.filter((p) => wishlist.includes(p.id))

  return (
    <PageShell
      eyebrow="Akun Saya"
      title={`Halo, ${user.name.split(' ')[0]}!`}
      breadcrumb={[{ label: 'Profil' }]}
      actions={
        <div className="flex flex-wrap gap-3">
          {user.role === 'admin' && (
            <Link to="/admin" className="inline-flex items-center gap-2 rounded-full bg-neutral-dark px-5 py-2.5 font-semibold text-white hover:bg-accent-dark">
              <Icon name="chart" className="size-4" /> Dashboard Admin
            </Link>
          )}
          <button type="button" onClick={() => { logout(); navigate('/') }} className="inline-flex items-center gap-2 rounded-full border border-neutral-dark/30 px-5 py-2.5 font-semibold text-neutral-dark hover:bg-neutral-dark/5">
            <Icon name="logout" className="size-4" /> Keluar
          </button>
        </div>
      }
    >
      <div className="grid items-start gap-8 lg:grid-cols-[300px_1fr]">
        {/* Satu kartu: identitas di atas, menu di bawah, dipisah garis tipis. */}
        <aside className="overflow-hidden rounded-[20px] border border-neutral-dark/10 bg-[#FFFDF8] lg:sticky lg:top-28">
          <div className="flex items-center gap-4 p-5">
            <Avatar user={user} className="size-14 text-2xl" />
            <div className="min-w-0">
              <p className="truncate font-headline text-xl text-neutral-dark">{user.name}</p>
              <p className="truncate text-sm text-[#7A6455]">{user.email}</p>
              <p className="mt-1 text-xs font-semibold text-neutral-dark/50">
                {user.provider === 'google' ? 'Masuk dengan Google' : user.role === 'admin' ? 'Admin' : 'Akun email'}
              </p>
            </div>
          </div>

          <nav aria-label="Menu profil" className="flex gap-1 overflow-x-auto border-t border-neutral-dark/10 p-2 lg:flex-col lg:overflow-visible">
            {TABS.map((t) => (
              <Link
                key={t.id}
                to={`/profil#${t.id}`}
                aria-current={tab === t.id ? 'page' : undefined}
                className={`flex min-h-11 shrink-0 items-center gap-3 rounded-[12px] px-3 text-sm font-semibold transition ${tab === t.id ? 'bg-cream-deep text-neutral-dark' : 'text-[#7A6455] hover:bg-cream-deep/60 hover:text-neutral-dark'}`}
              >
                <Icon name={t.icon} className="size-4" /> {t.label}
              </Link>
            ))}
            <Link to="/wishlist" className="flex min-h-11 shrink-0 items-center gap-3 rounded-[12px] px-3 text-sm font-semibold text-[#7A6455] transition hover:bg-cream-deep/60 hover:text-neutral-dark">
              <Icon name="heart" className="size-4" /> Wishlist <span className="ml-auto text-xs text-neutral-dark/50">{wishlist.length}</span>
            </Link>
          </nav>
        </aside>

        <div className="flex min-w-0 flex-col gap-6">
          {/* Ringkasan dalam satu kartu, dipisah garis, bukan 4 kotak terpisah. */}
          <div className="grid grid-cols-2 overflow-hidden rounded-[20px] border border-neutral-dark/10 bg-[#FFFDF8] md:grid-cols-4 [&>*]:border-neutral-dark/10 [&>*:nth-child(odd)]:border-r md:[&>*]:border-r md:[&>*:last-child]:border-r-0 [&>*:nth-child(-n+2)]:border-b md:[&>*:nth-child(-n+2)]:border-b-0">
            <Stat label="Total pesanan" value={myOrders.length} />
            <Stat label="Total belanja" value={formatRupiah(totalSpent)} />
            <Stat label="Wishlist" value={`${wishlist.length} donat`} />
            <Stat label="Voucher dipilih" value={voucherCode || '-'} />
          </div>

          {tab === 'pesanan' && <OrdersTab orders={myOrders} />}
          {tab === 'alamat' && <AddressTab />}
          {tab === 'akun' && <AccountTab />}
          {tab === 'voucher' && <VoucherTab />}

          {tab === 'pesanan' && savedProducts.length > 0 && (
            <section className="rounded-[20px] border border-neutral-dark/10 bg-[#FFFDF8] p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-headline text-2xl text-neutral-dark">Dari Wishlist-mu</h2>
                <Link to="/wishlist" className="text-sm font-semibold text-accent-dark hover:underline">Lihat semua →</Link>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-1">
                {savedProducts.slice(0, 6).map((p) => (
                  <Link key={p.id} to={`/menu/${p.id}`} className="w-32 shrink-0">
                    <img src={p.image} alt="" className="mb-2 aspect-square w-full rounded-[12px] object-cover" />
                    <p className="truncate text-sm font-semibold text-neutral-dark">{p.name}</p>
                    <p className="text-xs text-accent-dark">{formatRupiah(p.price)}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </PageShell>
  )
}

const STEPS = ['Menunggu Konfirmasi', 'Diproses', 'Dikirim', 'Selesai']

function OrdersTab({ orders }) {
  const { addToCart, getProduct } = useShop()
  const navigate = useNavigate()
  const [filter, setFilter] = useState('Semua')
  const [openOrder, setOpenOrder] = useState(orders[0]?.id ?? null)
  const shown = filter === 'Semua' ? orders : orders.filter((o) => (filter === 'Aktif' ? !['Selesai', 'Dibatalkan'].includes(o.status) : o.status === filter))

  const reorder = (order) => {
    order.items.forEach((item) => addToCart(getProduct(item.id) ?? item, item.qty))
    navigate('/keranjang')
  }

  if (orders.length === 0) {
    return <EmptyState icon="box" title="Belum ada pesanan" description="Pesanan yang kamu buat saat masuk akan muncul di sini." actionLabel="Mulai Belanja" />
  }

  return (
    <section>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-headline text-3xl text-neutral-dark">Pesanan Saya</h2>
        <div className="flex flex-wrap gap-2">
          {['Semua', 'Aktif', 'Selesai', 'Dibatalkan'].map((f) => (
            <button key={f} type="button" onClick={() => setFilter(f)} className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${filter === f ? 'bg-neutral-dark text-white' : 'border border-neutral-dark/20 text-neutral-dark hover:border-neutral-dark/50'}`}>{f}</button>
          ))}
        </div>
      </div>
      {shown.length === 0 && <p className="rounded-[20px] bg-[#FFFDF8] p-8 text-center text-neutral-dark/60">Tidak ada pesanan di filter ini.</p>}
      <ul className="flex flex-col gap-4">
        {shown.map((order) => {
          const open = openOrder === order.id
          const step = STEPS.indexOf(order.status)
          return (
            <li key={order.id} className="rounded-[20px] border border-neutral-dark/10 bg-[#FFFDF8]">
              <button type="button" onClick={() => setOpenOrder(open ? null : order.id)} aria-expanded={open} className="flex w-full flex-wrap items-center justify-between gap-3 p-5 text-left">
                <div>
                  <p className="font-headline text-lg text-neutral-dark">{order.id}</p>
                  <p className="text-xs text-neutral-dark/55">{formatTanggal(order.createdAt)} · {order.items.reduce((s, i) => s + i.qty, 0)} item</p>
                </div>
                <div className="flex items-center gap-4">
                  <StatusBadge status={order.status} />
                  <strong className="text-accent-dark">{formatRupiah(order.total)}</strong>
                  <span className={`text-neutral-dark/50 transition ${open ? 'rotate-90' : ''}`} aria-hidden="true">›</span>
                </div>
              </button>
              {open && (
                <div className="border-t border-neutral-dark/10 px-5 pb-5 pt-5 text-sm">
                  {order.status === 'Dibatalkan' ? (
                    <p className="mb-4 rounded-[10px] bg-accent-red/10 px-4 py-2 text-accent-red">Pesanan ini dibatalkan.</p>
                  ) : (
                    <ol className="mb-6 grid grid-cols-4 gap-1" aria-label="Status pengiriman">
                      {STEPS.map((s, i) => (
                        <li key={s} className="flex flex-col items-center text-center">
                          <span className={`mb-2 h-1.5 w-full rounded-full ${i <= step ? 'bg-primary' : 'bg-cream-deep'}`} />
                          <span className={`text-[11px] leading-tight sm:text-xs ${i <= step ? 'font-semibold text-neutral-dark' : 'text-neutral-dark/45'}`}>{s}</span>
                        </li>
                      ))}
                    </ol>
                  )}
                  <ul className="mb-4 flex flex-col gap-3">
                    {order.items.map((item) => (
                      <li key={item.id} className="flex items-center gap-3">
                        <img src={item.image} alt="" className="size-11 rounded-[10px] object-cover" />
                        <span className="flex-1">{item.qty}× {item.name}</span>
                        <span className="font-semibold">{formatRupiah(item.price * item.qty)}</span>
                      </li>
                    ))}
                  </ul>
                  {order.discount > 0 && <p className="mb-2 text-[#4E7A3A]">Hemat {formatRupiah(order.discount)} dengan {order.voucherCode}</p>}
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Link to={`/pesanan-berhasil/${order.id}`} className="rounded-full border border-neutral-dark/30 px-4 py-2 font-semibold text-neutral-dark hover:bg-neutral-dark/5">Detail pesanan</Link>
                    <button type="button" onClick={() => reorder(order)} className="rounded-full bg-neutral-dark px-4 py-2 font-semibold text-white hover:bg-choco-dark">Pesan lagi</button>
                  </div>
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}

const EMPTY_ADDRESS = { label: 'Rumah', recipient: '', phone: '', address: '', isDefault: false }

function AddressTab() {
  const { user, saveAddress, deleteAddress, setDefaultAddress, showToast } = useShop()
  const addresses = user.addresses ?? []
  const [form, setForm] = useState(null)
  const [error, setError] = useState('')

  const open = (address) => {
    setError('')
    setForm(address ? { ...address } : { ...EMPTY_ADDRESS, recipient: user.name, phone: user.phone ?? '' })
  }

  const submit = (event) => {
    event.preventDefault()
    if (form.recipient.trim().length < 2) return setError('Nama penerima wajib diisi.')
    if (form.address.trim().length < 10) return setError('Alamat minimal 10 karakter.')
    saveAddress({ ...form, recipient: form.recipient.trim(), phone: form.phone.trim(), address: form.address.trim() })
    showToast('Alamat disimpan')
    setForm(null)
  }

  return (
    <section>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-headline text-3xl text-neutral-dark">Alamat Tersimpan</h2>
        {!form && (
          <button type="button" onClick={() => open(null)} className="inline-flex items-center gap-2 rounded-full bg-neutral-dark px-5 py-2.5 text-sm font-semibold text-white hover:bg-choco-dark">
            <Icon name="plus" className="size-4" /> Tambah Alamat
          </button>
        )}
      </div>

      {form && (
        <form onSubmit={submit} className="mb-5 grid gap-4 rounded-[20px] border border-neutral-dark/10 bg-[#FFFDF8] p-6 sm:grid-cols-2">
          <label className="text-sm font-semibold text-neutral-dark">Label
            <select value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} className={`${inputClass} mt-1`}>
              {['Rumah', 'Kantor', 'Kos', 'Lainnya'].map((l) => <option key={l}>{l}</option>)}
            </select>
          </label>
          <label className="text-sm font-semibold text-neutral-dark">Nama penerima<input value={form.recipient} onChange={(e) => setForm({ ...form, recipient: e.target.value })} className={`${inputClass} mt-1`} /></label>
          <label className="text-sm font-semibold text-neutral-dark sm:col-span-2">No. WhatsApp<input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} inputMode="tel" className={`${inputClass} mt-1`} /></label>
          <label className="text-sm font-semibold text-neutral-dark sm:col-span-2">Alamat lengkap<textarea rows={3} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className={`${inputClass} mt-1`} placeholder="Nama jalan, nomor rumah, kecamatan, patokan" /></label>
          <label className="flex items-center gap-2 text-sm text-neutral-dark sm:col-span-2">
            <input type="checkbox" checked={form.isDefault} onChange={(e) => setForm({ ...form, isDefault: e.target.checked })} className="size-4 accent-[#C97F0D]" /> Jadikan alamat utama
          </label>
          {error && <p role="alert" className="text-sm text-accent-red sm:col-span-2">{error}</p>}
          <div className="flex gap-2 sm:col-span-2">
            <button type="submit" className="rounded-full bg-neutral-dark px-6 py-2.5 font-semibold text-white hover:bg-accent-dark">Simpan</button>
            <button type="button" onClick={() => setForm(null)} className="rounded-full border border-neutral-dark/30 px-6 py-2.5 font-semibold text-neutral-dark">Batal</button>
          </div>
        </form>
      )}

      {addresses.length === 0 && !form ? (
        <EmptyState icon="truck" title="Belum ada alamat" description="Simpan alamat supaya checkout berikutnya tinggal pilih." actionLabel={null} />
      ) : (
        <ul className="grid gap-4 md:grid-cols-2">
          {addresses.map((a) => (
            <li key={a.id} className={`flex flex-col rounded-[16px] border bg-white p-5 ${a.isDefault ? 'border-secondary' : 'border-neutral-dark/10'}`}>
              <div className="mb-2 flex items-center gap-2">
                <span className="rounded-full bg-cream-deep px-3 py-0.5 text-xs font-bold text-neutral-dark">{a.label}</span>
                {a.isDefault && <span className="rounded-full bg-primary px-3 py-0.5 text-xs font-bold text-neutral-dark">Utama</span>}
              </div>
              <p className="font-semibold text-neutral-dark">{a.recipient} · {a.phone || '-'}</p>
              <p className="mb-4 text-sm text-neutral-dark/65">{a.address}</p>
              <div className="mt-auto flex flex-wrap gap-3 text-sm font-semibold">
                <button type="button" onClick={() => open(a)} className="text-accent-dark hover:underline">Ubah</button>
                {!a.isDefault && <button type="button" onClick={() => setDefaultAddress(a.id)} className="text-neutral-dark/70 hover:underline">Jadikan utama</button>}
                <button type="button" onClick={() => deleteAddress(a.id)} className="text-accent-red hover:underline">Hapus</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

function AccountTab() {
  const { user, updateProfile, showToast } = useShop()
  const [form, setForm] = useState({ name: user.name, phone: user.phone ?? '' })

  const save = (event) => {
    event.preventDefault()
    if (form.name.trim().length < 2) return
    updateProfile({ name: form.name.trim(), phone: form.phone.trim() })
    showToast('Data diri disimpan')
  }

  return (
    <section className="rounded-[20px] border border-neutral-dark/10 bg-[#FFFDF8] p-6">
      <h2 className="mb-5 font-headline text-3xl text-neutral-dark">Data Diri</h2>
      <form onSubmit={save} className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-semibold text-neutral-dark">Nama lengkap<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={`${inputClass} mt-1`} /></label>
        <label className="text-sm font-semibold text-neutral-dark">No. WhatsApp<input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} inputMode="tel" placeholder="0812xxxxxxx" className={`${inputClass} mt-1`} /></label>
        <label className="text-sm font-semibold text-neutral-dark sm:col-span-2">Email<input value={user.email} readOnly className={`${inputClass} mt-1 bg-cream-deep text-neutral-dark/60`} /></label>
        <p className="text-xs text-neutral-dark/55 sm:col-span-2">
          {user.provider === 'google' ? 'Akun ini terhubung dengan Google, foto profil diambil dari Google.' : 'Email dipakai untuk masuk dan tidak bisa diubah.'}
        </p>
        <div className="sm:col-span-2">
          <button type="submit" className="rounded-full bg-neutral-dark px-6 py-2.5 font-semibold text-white hover:bg-choco-dark">Simpan Perubahan</button>
        </div>
      </form>
    </section>
  )
}

function VoucherTab() {
  const { voucherCode, setVoucherCode, showToast } = useShop()
  return (
    <section>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-headline text-3xl text-neutral-dark">Voucher Saya</h2>
        <Link to="/promo" className="text-sm font-semibold text-accent-dark hover:underline">Semua promo →</Link>
      </div>
      <ul className="grid gap-4 md:grid-cols-2">
        {VOUCHERS.map((v) => {
          const selected = voucherCode === v.code
          return (
            <li key={v.code} className={`flex items-center gap-4 rounded-[16px] border bg-white p-4 ${selected ? 'border-secondary ring-2 ring-primary/40' : 'border-neutral-dark/10'}`}>
              <span className="grid size-12 shrink-0 place-items-center rounded-full text-white" style={{ backgroundColor: v.color }}><Icon name="tag" className="size-5" /></span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-neutral-dark">{v.title}</p>
                <p className="text-xs text-neutral-dark/55">{v.code} · min. {formatRupiah(v.minSpend)}</p>
              </div>
              <button
                type="button"
                onClick={() => { setVoucherCode(selected ? '' : v.code); if (!selected) showToast(`Voucher ${v.code} dipilih`) }}
                className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold ${selected ? 'bg-[#4E7A3A]/10 text-[#4E7A3A]' : 'bg-neutral-dark text-white hover:bg-choco-dark'}`}
              >
                {selected ? '✓ Dipakai' : 'Pakai'}
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

function Stat({ label, value }) {
  return (
    <div className="p-5">
      <p className="mb-1 text-xs font-semibold uppercase tracking-[0.12em] text-neutral-dark/50">{label}</p>
      <p className="truncate text-lg font-bold text-neutral-dark">{value}</p>
    </div>
  )
}
