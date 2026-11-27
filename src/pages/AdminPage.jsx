import { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import StatusBadge from '../components/StatusBadge'
import Toast from '../components/Toast'
import { useShop } from '../context/ShopContext'
import { BRAND } from '../data/content'
import { ADMIN_ACCOUNT } from '../data/store'
import { formatRupiah, formatTanggal } from '../utils/format'
import { ORDER_STATUSES } from '../utils/order'

const inputClass =
  'w-full rounded-[10px] border border-neutral-dark/20 bg-white px-3 py-2.5 text-sm text-neutral-dark outline-none transition focus:border-secondary'

const TABS = [
  { id: 'ringkasan', label: 'Ringkasan', icon: 'chart' },
  { id: 'produk', label: 'Produk', icon: 'box' },
  { id: 'pesanan', label: 'Pesanan', icon: 'bag' },
]

// Dashboard admin punya route sendiri (/admin) dan tampilan terpisah dari toko.
// SIMULASI: pengecekan role hanya di browser. Di dunia nyata wajib dicek di server.
export default function AdminPage() {
  const { user, logout } = useShop()
  const [tab, setTab] = useState('ringkasan')

  if (user?.role !== 'admin') return <AdminLogin />

  return (
    <div className="min-h-screen bg-cream-deep">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-choco-dark px-5 py-4 text-white sm:px-8">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="font-headline text-2xl">{BRAND}</span>
            <span className="rounded-full bg-primary px-2.5 py-0.5 text-xs font-bold text-neutral-dark">Admin</span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <Link to="/" className="text-white/70 hover:text-primary">Lihat toko ↗</Link>
            <button type="button" onClick={logout} className="inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-2 font-semibold hover:bg-white/10">
              <Icon name="logout" className="size-4" /> Keluar
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1280px] px-5 py-8 sm:px-8">
        <h1 className="mb-1 font-headline text-4xl text-neutral-dark">Dashboard</h1>
        <p className="mb-6 text-neutral-dark/60">Kelola produk dan pesanan Madu Donut.</p>

        <nav className="mb-8 flex gap-2 overflow-x-auto pb-1" role="tablist">
          {TABS.map((t) => (
            <button key={t.id} type="button" role="tab" aria-selected={tab === t.id} onClick={() => setTab(t.id)} className={`inline-flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition ${tab === t.id ? 'bg-neutral-dark text-white' : 'bg-white text-neutral-dark hover:bg-white/70'}`}>
              <Icon name={t.icon} className="size-4" /> {t.label}
            </button>
          ))}
        </nav>

        {tab === 'ringkasan' && <Overview onGoTo={setTab} />}
        {tab === 'produk' && <ProductManager />}
        {tab === 'pesanan' && <OrderManager />}
      </div>
      <Toast />
    </div>
  )
}

function AdminLogin() {
  const { login, user } = useShop()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const submit = (event) => {
    event.preventDefault()
    const result = login(email, password)
    if (!result.ok || result.role !== 'admin') setError('Akun ini bukan akun admin.')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-choco-dark px-5 py-12">
      <form onSubmit={submit} className="w-full max-w-sm rounded-[20px] bg-bg-cream p-8">
        <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-secondary">Area Admin</p>
        <h1 className="mb-2 font-headline text-3xl text-neutral-dark">Masuk Dashboard</h1>
        {user && <p className="mb-4 text-sm text-accent-red">Kamu masuk sebagai {user.email}, bukan admin.</p>}
        <div className="mt-4 flex flex-col gap-3">
          <label className="text-sm font-semibold text-neutral-dark">Email<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={`${inputClass} mt-1`} /></label>
          <label className="text-sm font-semibold text-neutral-dark">Password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={`${inputClass} mt-1`} /></label>
          {error && <p role="alert" className="text-sm text-accent-red">{error}</p>}
          <button type="submit" className="mt-2 h-11 rounded-full bg-primary font-semibold text-neutral-dark hover:bg-primary-dark">Masuk</button>
        </div>
        <p className="mt-5 text-xs text-neutral-dark/60">Simulasi. Akun demo: {ADMIN_ACCOUNT.email} / {ADMIN_ACCOUNT.password}</p>
        <Link to="/" className="mt-4 inline-block text-sm font-semibold text-secondary hover:underline">← Kembali ke toko</Link>
      </form>
    </div>
  )
}

function Overview({ onGoTo }) {
  const { orders, products } = useShop()
  const valid = orders.filter((o) => o.status !== 'Dibatalkan')
  const revenue = valid.reduce((sum, o) => sum + o.total, 0)
  const waiting = orders.filter((o) => o.status === 'Menunggu Konfirmasi').length

  // Hitung donat terlaris dari semua pesanan yang tidak dibatalkan.
  const sold = {}
  valid.forEach((o) => o.items.forEach((i) => { sold[i.name] = (sold[i.name] ?? 0) + i.qty }))
  const best = Object.entries(sold).sort((a, b) => b[1] - a[1]).slice(0, 5)
  const maxSold = best[0]?.[1] ?? 1

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Pendapatan" value={formatRupiah(revenue)} icon="chart" />
        <StatCard label="Total pesanan" value={orders.length} icon="bag" />
        <StatCard label="Menunggu konfirmasi" value={waiting} icon="check" highlight={waiting > 0} />
        <StatCard label="Produk aktif" value={products.length} icon="box" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-[16px] bg-white p-6">
          <h2 className="mb-5 font-headline text-2xl text-neutral-dark">Donat Terlaris</h2>
          {best.length === 0 ? (
            <p className="text-sm text-neutral-dark/60">Belum ada penjualan.</p>
          ) : (
            <ul className="flex flex-col gap-4">
              {best.map(([name, qty]) => (
                <li key={name}>
                  <div className="mb-1 flex justify-between text-sm"><span className="font-semibold text-neutral-dark">{name}</span><span className="text-neutral-dark/60">{qty} pcs</span></div>
                  <div className="h-2.5 rounded-full bg-cream-deep"><div className="h-full rounded-full bg-primary" style={{ width: `${(qty / maxSold) * 100}%` }} /></div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-[16px] bg-white p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-headline text-2xl text-neutral-dark">Pesanan Terbaru</h2>
            <button type="button" onClick={() => onGoTo('pesanan')} className="text-sm font-semibold text-secondary hover:underline">Semua →</button>
          </div>
          {orders.length === 0 ? (
            <p className="text-sm text-neutral-dark/60">Belum ada pesanan. Coba buat pesanan dari halaman toko.</p>
          ) : (
            <ul className="divide-y divide-neutral-dark/10">
              {orders.slice(0, 5).map((o) => (
                <li key={o.id} className="flex flex-wrap items-center justify-between gap-2 py-3 text-sm">
                  <div><p className="font-semibold text-neutral-dark">{o.customer.name}</p><p className="text-xs text-neutral-dark/55">{o.id}</p></div>
                  <div className="flex items-center gap-3"><StatusBadge status={o.status} /><span className="font-semibold">{formatRupiah(o.total)}</span></div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  )
}

function StatCard({ label, value, icon, highlight }) {
  return (
    <div className={`rounded-[16px] p-5 ${highlight ? 'bg-primary' : 'bg-white'}`}>
      <Icon name={icon} className="mb-3 size-6 text-accent-dark" />
      <p className="text-sm text-neutral-dark/65">{label}</p>
      <p className="font-headline text-3xl text-neutral-dark">{value}</p>
    </div>
  )
}

const EMPTY_PRODUCT = { name: '', category: '', price: '', description: '', image: '/images/menu-1.jpg' }
const IMAGE_OPTIONS = Array.from({ length: 9 }, (_, i) => `/images/menu-${i + 1}.jpg`)

function ProductManager() {
  const { products, categories, saveProduct, deleteProduct, resetProducts, showToast } = useShop()
  const [editing, setEditing] = useState(null) // null = form tertutup
  const [confirmDelete, setConfirmDelete] = useState(null)
  const [error, setError] = useState('')
  const categoryOptions = categories.filter((c) => c !== 'All')

  const openForm = (product) => {
    setError('')
    setEditing(product ? { ...product } : { ...EMPTY_PRODUCT, category: categoryOptions[0] ?? '' })
  }

  const submit = (event) => {
    event.preventDefault()
    const price = Number(editing.price)
    if (editing.name.trim().length < 3) return setError('Nama produk minimal 3 karakter.')
    if (!Number.isFinite(price) || price < 1000) return setError('Harga minimal Rp 1.000.')
    saveProduct({ ...editing, name: editing.name.trim(), description: editing.description.trim(), price })
    showToast(editing.id ? 'Produk diperbarui' : 'Produk ditambahkan')
    setEditing(null)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-neutral-dark/65">{products.length} produk</p>
        <div className="flex gap-2">
          <button type="button" onClick={() => { resetProducts(); showToast('Produk kembali ke data awal') }} className="rounded-full border border-neutral-dark/25 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-dark hover:bg-white/70">Reset data awal</button>
          <button type="button" onClick={() => openForm(null)} className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-neutral-dark hover:bg-primary-dark">
            <Icon name="plus" className="size-4" /> Tambah Produk
          </button>
        </div>
      </div>

      {editing && (
        <form onSubmit={submit} className="grid gap-4 rounded-[16px] bg-white p-6 md:grid-cols-2">
          <h2 className="font-headline text-2xl text-neutral-dark md:col-span-2">{editing.id ? `Edit: ${editing.name}` : 'Produk Baru'}</h2>
          <label className="text-sm font-semibold text-neutral-dark">Nama<input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className={`${inputClass} mt-1`} /></label>
          <label className="text-sm font-semibold text-neutral-dark">Harga (Rp)<input type="number" min="1000" step="500" value={editing.price} onChange={(e) => setEditing({ ...editing, price: e.target.value })} className={`${inputClass} mt-1`} /></label>
          <label className="text-sm font-semibold text-neutral-dark">Kategori
            <select value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })} className={`${inputClass} mt-1`}>
              {categoryOptions.map((c) => <option key={c}>{c}</option>)}
            </select>
          </label>
          <label className="text-sm font-semibold text-neutral-dark">Gambar
            <select value={editing.image} onChange={(e) => setEditing({ ...editing, image: e.target.value })} className={`${inputClass} mt-1`}>
              {[...new Set([...IMAGE_OPTIONS, editing.image])].map((src) => <option key={src} value={src}>{src.split('/').pop()}</option>)}
            </select>
          </label>
          <label className="text-sm font-semibold text-neutral-dark md:col-span-2">Deskripsi<textarea rows={3} value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} className={`${inputClass} mt-1`} /></label>
          <div className="flex items-center gap-4 md:col-span-2">
            <img src={editing.image} alt="" className="size-16 rounded-[10px] object-cover" />
            {error && <p role="alert" className="text-sm text-accent-red">{error}</p>}
            <div className="ml-auto flex gap-2">
              <button type="button" onClick={() => setEditing(null)} className="rounded-full border border-neutral-dark/25 px-5 py-2.5 text-sm font-semibold">Batal</button>
              <button type="submit" className="rounded-full bg-neutral-dark px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent-dark">Simpan</button>
            </div>
          </div>
        </form>
      )}

      <div className="overflow-x-auto rounded-[16px] bg-white">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-neutral-dark/10 text-xs uppercase tracking-wider text-neutral-dark/55">
            <tr><th className="p-4">Produk</th><th className="p-4">Kategori</th><th className="p-4">Harga</th><th className="p-4 text-right">Aksi</th></tr>
          </thead>
          <tbody className="divide-y divide-neutral-dark/10">
            {products.map((p) => (
              <tr key={p.id}>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img src={p.image} alt="" className="size-11 rounded-[8px] object-cover" />
                    <span className="font-semibold text-neutral-dark">{p.name}</span>
                  </div>
                </td>
                <td className="p-4 text-neutral-dark/70">{p.category}</td>
                <td className="p-4 font-semibold text-secondary">{formatRupiah(p.price)}</td>
                <td className="p-4">
                  <div className="flex justify-end gap-2">
                    {confirmDelete === p.id ? (
                      <>
                        <button type="button" onClick={() => { deleteProduct(p.id); setConfirmDelete(null); showToast('Produk dihapus') }} className="rounded-full bg-accent-red px-3 py-1.5 text-xs font-semibold text-white">Ya, hapus</button>
                        <button type="button" onClick={() => setConfirmDelete(null)} className="rounded-full border border-neutral-dark/25 px-3 py-1.5 text-xs font-semibold">Batal</button>
                      </>
                    ) : (
                      <>
                        <button type="button" onClick={() => openForm(p)} aria-label={`Edit ${p.name}`} className="grid size-9 place-items-center rounded-full text-neutral-dark/60 hover:bg-neutral-dark/5 hover:text-neutral-dark"><Icon name="edit" className="size-4" /></button>
                        <button type="button" onClick={() => setConfirmDelete(p.id)} aria-label={`Hapus ${p.name}`} className="grid size-9 place-items-center rounded-full text-neutral-dark/60 hover:bg-accent-red/10 hover:text-accent-red"><Icon name="trash" className="size-4" /></button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function OrderManager() {
  const { orders, updateOrderStatus, showToast } = useShop()
  const [filter, setFilter] = useState('Semua')
  const [open, setOpen] = useState(null)
  const shown = filter === 'Semua' ? orders : orders.filter((o) => o.status === filter)

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap gap-2">
        {['Semua', ...ORDER_STATUSES].map((s) => (
          <button key={s} type="button" onClick={() => setFilter(s)} className={`rounded-full px-4 py-2 text-xs font-semibold transition ${filter === s ? 'bg-neutral-dark text-white' : 'bg-white text-neutral-dark hover:bg-white/70'}`}>
            {s} ({s === 'Semua' ? orders.length : orders.filter((o) => o.status === s).length})
          </button>
        ))}
      </div>

      {shown.length === 0 ? (
        <p className="rounded-[16px] bg-white p-10 text-center text-neutral-dark/60">Tidak ada pesanan.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {shown.map((o) => (
            <li key={o.id} className="rounded-[16px] bg-white">
              <div className="flex flex-wrap items-center gap-4 p-5">
                <button type="button" onClick={() => setOpen(open === o.id ? null : o.id)} aria-expanded={open === o.id} className="min-w-0 flex-1 text-left">
                  <p className="font-semibold text-neutral-dark">{o.id} · {o.customer.name}</p>
                  <p className="text-xs text-neutral-dark/55">{formatTanggal(o.createdAt)} · {o.items.length} jenis donat · {o.delivery === 'antar' ? 'Diantar' : 'Ambil di toko'}</p>
                </button>
                <strong className="text-secondary">{formatRupiah(o.total)}</strong>
                <label className="sr-only" htmlFor={`status-${o.id}`}>Status {o.id}</label>
                <select id={`status-${o.id}`} value={o.status} onChange={(e) => { updateOrderStatus(o.id, e.target.value); showToast(`${o.id}: ${e.target.value}`) }} className="rounded-full border border-neutral-dark/20 bg-cream-deep px-3 py-2 text-xs font-semibold text-neutral-dark">
                  {ORDER_STATUSES.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
              {open === o.id && (
                <div className="grid gap-4 border-t border-neutral-dark/10 p-5 text-sm md:grid-cols-2">
                  <ul className="flex flex-col gap-1.5">
                    {o.items.map((i) => <li key={i.id} className="flex justify-between gap-3"><span>{i.qty}× {i.name}</span><span className="font-semibold">{formatRupiah(i.price * i.qty)}</span></li>)}
                    {o.discount > 0 && <li className="flex justify-between text-[#4E7A3A]"><span>Diskon {o.voucherCode}</span><span>− {formatRupiah(o.discount)}</span></li>}
                  </ul>
                  <dl className="flex flex-col gap-1.5 text-neutral-dark/75">
                    <div><dt className="inline font-semibold text-neutral-dark">HP: </dt><dd className="inline">{o.customer.phone}</dd></div>
                    {o.delivery === 'antar' && <div><dt className="inline font-semibold text-neutral-dark">Alamat: </dt><dd className="inline">{o.customer.address}</dd></div>}
                    <div><dt className="inline font-semibold text-neutral-dark">Bayar: </dt><dd className="inline uppercase">{o.payment}</dd></div>
                    {o.customer.note && <div><dt className="inline font-semibold text-neutral-dark">Catatan: </dt><dd className="inline">{o.customer.note}</dd></div>}
                    <div><dt className="inline font-semibold text-neutral-dark">Akun: </dt><dd className="inline">{o.userEmail ?? 'Tamu'}</dd></div>
                  </dl>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
