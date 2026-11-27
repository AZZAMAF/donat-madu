import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useShop } from '../context/ShopContext'
import { formatRupiah } from '../utils/format'
import Icon from './Icon'

// Ikon search di header: klik untuk membuka kotak pencarian donat.
// Hasil langsung tersaring saat mengetik, klik hasil untuk ke Detail Produk.
export default function HeaderSearch() {
  const { products } = useShop()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const wrapper = useRef(null)
  const input = useRef(null)

  const keyword = query.trim().toLowerCase()
  const results = keyword
    ? products.filter((p) => `${p.name} ${p.category} ${p.description}`.toLowerCase().includes(keyword)).slice(0, 6)
    : products.slice(0, 4)

  // Tutup saat klik di luar kotak pencarian.
  useEffect(() => {
    if (!open) return
    const handleClick = (event) => {
      if (wrapper.current && !wrapper.current.contains(event.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    input.current?.focus()
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  // Tutup saat pindah halaman.
  useEffect(() => {
    setOpen(false)
    setQuery('')
  }, [pathname])

  const submit = (event) => {
    event.preventDefault()
    if (results[0]) navigate(`/menu/${results[0].id}`)
  }

  return (
    <div ref={wrapper} className="relative" onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}>
      <button
        type="button"
        aria-label="Cari donat"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="relative grid size-10 place-items-center rounded-full text-neutral-dark transition hover:bg-neutral-dark/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-dark"
      >
        <Icon name="search" className="size-[22px]" />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 w-[min(24rem,_calc(100vw-2.5rem))] pt-2 max-[900px]:-right-24">
          <div className="rounded-[16px] border border-neutral-dark/10 bg-white p-4 shadow-xl shadow-neutral-dark/10">
            <form onSubmit={submit} role="search" className="flex items-center gap-2 rounded-full border border-neutral-dark/20 px-4 focus-within:border-secondary">
              <Icon name="search" className="size-5 shrink-0 text-neutral-dark/50" />
              <label htmlFor="header-search" className="sr-only">Cari donat</label>
              <input
                ref={input}
                id="header-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari donat, misal: choco"
                autoComplete="off"
                className="min-w-0 flex-1 bg-transparent py-2.5 text-sm text-neutral-dark outline-none"
              />
            </form>

            <p className="mb-2 mt-4 text-xs font-bold uppercase tracking-[0.14em] text-neutral-dark/45">
              {keyword ? `${results.length} hasil` : 'Paling dicari'}
            </p>
            {results.length === 0 ? (
              <p className="py-6 text-center text-sm text-neutral-dark/60">Donat "{query}" belum ada. Coba kata lain.</p>
            ) : (
              <ul className="flex flex-col">
                {results.map((item) => (
                  <li key={item.id}>
                    <Link to={`/menu/${item.id}`} className="flex items-center gap-3 rounded-[12px] p-2 transition hover:bg-cream-deep">
                      <img src={item.image} alt="" className="size-12 shrink-0 rounded-[10px] bg-gold-pale object-cover" />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-semibold text-neutral-dark">{item.name}</span>
                        <span className="block truncate text-xs text-neutral-dark/55">{item.category}</span>
                      </span>
                      <span className="shrink-0 text-sm font-semibold text-secondary">{formatRupiah(item.price)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
