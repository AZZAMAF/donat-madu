import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import Icon from '../components/Icon'
import PageShell from '../components/PageShell'
import StatusBadge from '../components/StatusBadge'
import { useShop } from '../context/ShopContext'
import { formatRupiah, formatTanggal } from '../utils/format'

const inputClass =
  'w-full rounded-[12px] border border-neutral-dark/20 bg-white px-4 py-3 text-neutral-dark outline-none transition focus:border-secondary'

export default function ProfilePage() {
  const { user, orders, wishlist, logout, updateProfile, showToast } = useShop()
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({ name: user?.name ?? '', phone: user?.phone ?? '', address: user?.address ?? '' })
  const [openOrder, setOpenOrder] = useState(null)

  if (!user) return <Navigate to="/login?redirect=/profil" replace />

  const myOrders = orders.filter((o) => o.userEmail === user.email)
  const totalSpent = myOrders.filter((o) => o.status !== 'Dibatalkan').reduce((sum, o) => sum + o.total, 0)

  const save = (event) => {
    event.preventDefault()
    updateProfile({ name: form.name.trim(), phone: form.phone.trim(), address: form.address.trim() })
    setEditing(false)
    showToast('Profil disimpan')
  }

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
          <button type="button" onClick={logout} className="inline-flex items-center gap-2 rounded-full border border-neutral-dark/30 px-5 py-2.5 font-semibold text-neutral-dark hover:bg-neutral-dark/5">
            <Icon name="logout" className="size-4" /> Keluar
          </button>
        </div>
      }
    >
      <div className="grid items-start gap-8 lg:grid-cols-[340px_1fr]">
        <aside className="flex flex-col gap-5">
          <div className="rounded-[16px] border border-neutral-dark/10 bg-white p-6">
            <div className="mb-5 flex items-center gap-4">
              <span className="grid size-14 place-items-center rounded-full bg-primary font-headline text-2xl text-neutral-dark">
                {user.name.charAt(0).toUpperCase()}
              </span>
              <div className="min-w-0">
                <p className="truncate font-headline text-xl text-neutral-dark">{user.name}</p>
                <p className="truncate text-sm text-neutral-dark/60">{user.email}</p>
              </div>
            </div>

            {editing ? (
              <form onSubmit={save} className="flex flex-col gap-3">
                <label className="text-sm font-semibold text-neutral-dark">Nama<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={`${inputClass} mt-1`} required /></label>
                <label className="text-sm font-semibold text-neutral-dark">No. WhatsApp<input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={`${inputClass} mt-1`} /></label>
                <label className="text-sm font-semibold text-neutral-dark">Alamat<textarea rows={3} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className={`${inputClass} mt-1`} /></label>
                <div className="flex gap-2">
                  <button type="submit" className="flex-1 rounded-full bg-primary py-2.5 font-semibold text-neutral-dark hover:bg-primary-dark">Simpan</button>
                  <button type="button" onClick={() => setEditing(false)} className="rounded-full border border-neutral-dark/30 px-4 py-2.5 font-semibold text-neutral-dark">Batal</button>
                </div>
              </form>
            ) : (
              <>
                <dl className="flex flex-col gap-3 text-sm">
                  <div><dt className="text-neutral-dark/50">No. WhatsApp</dt><dd className="font-semibold text-neutral-dark">{user.phone || '-'}</dd></div>
                  <div><dt className="text-neutral-dark/50">Alamat</dt><dd className="font-semibold text-neutral-dark">{user.address || 'Belum diisi'}</dd></div>
                </dl>
                <button type="button" onClick={() => { setForm({ name: user.name, phone: user.phone ?? '', address: user.address ?? '' }); setEditing(true) }} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:underline">
                  <Icon name="edit" className="size-4" /> Ubah profil
                </button>
              </>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Stat label="Total pesanan" value={myOrders.length} />
            <Stat label="Total belanja" value={formatRupiah(totalSpent)} />
          </div>

          <Link to="/wishlist" className="flex items-center justify-between rounded-[16px] border border-neutral-dark/10 bg-white p-5 transition hover:border-secondary">
            <span className="flex items-center gap-3 font-semibold text-neutral-dark"><Icon name="heart" className="size-5 text-accent-red" /> Wishlist saya</span>
            <span className="text-sm text-neutral-dark/60">{wishlist.length} item →</span>
          </Link>
        </aside>

        <section>
          <h2 className="mb-5 font-headline text-3xl text-neutral-dark">Riwayat Pesanan</h2>
          {myOrders.length === 0 ? (
            <EmptyState icon="box" title="Belum ada pesanan" description="Pesanan yang kamu buat saat masuk akan muncul di sini." actionLabel="Mulai Belanja" />
          ) : (
            <ul className="flex flex-col gap-4">
              {myOrders.map((order) => {
                const open = openOrder === order.id
                return (
                  <li key={order.id} className="rounded-[16px] border border-neutral-dark/10 bg-white">
                    <button type="button" onClick={() => setOpenOrder(open ? null : order.id)} aria-expanded={open} className="flex w-full flex-wrap items-center justify-between gap-3 p-5 text-left">
                      <div>
                        <p className="font-headline text-lg text-neutral-dark">{order.id}</p>
                        <p className="text-xs text-neutral-dark/55">{formatTanggal(order.createdAt)} · {order.items.reduce((s, i) => s + i.qty, 0)} item</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <StatusBadge status={order.status} />
                        <strong className="text-secondary">{formatRupiah(order.total)}</strong>
                        <span className={`text-neutral-dark/50 transition ${open ? 'rotate-90' : ''}`} aria-hidden="true">›</span>
                      </div>
                    </button>
                    {open && (
                      <div className="border-t border-neutral-dark/10 px-5 pb-5 pt-4 text-sm">
                        <ul className="mb-4 flex flex-col gap-2">
                          {order.items.map((item) => (
                            <li key={item.id} className="flex justify-between gap-3">
                              <span>{item.qty}× {item.name}</span>
                              <span className="font-semibold">{formatRupiah(item.price * item.qty)}</span>
                            </li>
                          ))}
                        </ul>
                        {order.discount > 0 && <p className="text-[#4E7A3A]">Hemat {formatRupiah(order.discount)} dengan {order.voucherCode}</p>}
                        <Link to={`/pesanan-berhasil/${order.id}`} className="mt-3 inline-block font-semibold text-secondary hover:underline">Lihat detail pesanan →</Link>
                      </div>
                    )}
                  </li>
                )
              })}
            </ul>
          )}
        </section>
      </div>
    </PageShell>
  )
}

function Stat({ label, value }) {
  return (
    <div className="rounded-[16px] border border-neutral-dark/10 bg-white p-4">
      <p className="text-xs text-neutral-dark/55">{label}</p>
      <p className="font-headline text-xl text-neutral-dark">{value}</p>
    </div>
  )
}
