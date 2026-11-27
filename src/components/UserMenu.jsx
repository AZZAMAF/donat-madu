import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useShop } from '../context/ShopContext'
import Avatar from './Avatar'
import Icon from './Icon'
import IconButton from './IconButton'

// Ikon akun di header. Belum masuk: langsung ke halaman Login.
// Sudah masuk: foto/inisial + menu (Profil, Pesanan, Alamat, Wishlist, Keluar).
export default function UserMenu() {
  const { user, logout, orders } = useShop()
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const wrapper = useRef(null)

  useEffect(() => {
    if (!open) return
    const close = (event) => wrapper.current && !wrapper.current.contains(event.target) && setOpen(false)
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [open])

  useEffect(() => setOpen(false), [pathname])

  if (!user) return <IconButton label="Masuk atau daftar" icon="person" to="/login" />

  const activeOrders = orders.filter((o) => o.userEmail === user.email && !['Selesai', 'Dibatalkan'].includes(o.status)).length
  const links = [
    { to: '/profil', label: 'Profil Saya', icon: 'person' },
    { to: '/profil#pesanan', label: 'Pesanan Saya', icon: 'bag', badge: activeOrders || null },
    { to: '/profil#alamat', label: 'Alamat Tersimpan', icon: 'truck' },
    { to: '/wishlist', label: 'Wishlist', icon: 'heart' },
  ]
  if (user.role === 'admin') links.push({ to: '/admin', label: 'Dashboard Admin', icon: 'chart' })

  return (
    <div ref={wrapper} className="relative" onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}>
      <button
        type="button"
        aria-label={`Menu akun ${user.name}`}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="grid size-10 place-items-center rounded-full transition hover:ring-2 hover:ring-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-dark"
      >
        <Avatar user={user} className="size-9 text-base" />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 w-64 pt-2">
          <div className="rounded-[16px] border border-neutral-dark/10 bg-white p-2 shadow-xl shadow-neutral-dark/10">
            <div className="flex items-center gap-3 border-b border-neutral-dark/10 p-3">
              <Avatar user={user} className="size-10 text-lg" />
              <div className="min-w-0">
                <p className="truncate font-semibold text-neutral-dark">{user.name}</p>
                <p className="truncate text-xs text-neutral-dark/55">{user.email}</p>
              </div>
            </div>
            <ul className="py-1">
              {links.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} onClick={() => setOpen(false)} className="flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-sm font-medium text-neutral-dark transition hover:bg-cream-deep">
                    <Icon name={link.icon} className="size-4 text-secondary" />
                    <span className="flex-1">{link.label}</span>
                    {link.badge && <span className="rounded-full bg-accent-red px-2 text-xs font-bold text-white">{link.badge}</span>}
                  </Link>
                </li>
              ))}
            </ul>
            <button type="button" onClick={() => { logout(); setOpen(false) }} className="flex w-full items-center gap-3 rounded-[10px] border-t border-neutral-dark/10 px-3 py-2.5 text-sm font-medium text-accent-red transition hover:bg-accent-red/5">
              <Icon name="logout" className="size-4" /> Keluar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
