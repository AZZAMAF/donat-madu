import { useState } from 'react'
import { Link } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import Icon from '../components/Icon'
import PageShell from '../components/PageShell'
import { useShop } from '../context/ShopContext'
import { STORAGE_KEYS } from '../data/store'
import useLocalStorage from '../hooks/useLocalStorage'
import { formatRupiah } from '../utils/format'

export default function WishlistPage() {
  const { wishlist, products, toggleWishlist, addToCart, loading } = useShop()
  const saved = products.filter((p) => wishlist.includes(p.id))

  const moveToCart = (item) => {
    addToCart(item)
    toggleWishlist(item)
  }

  return (
    <PageShell
      eyebrow="Wishlist"
      title="Donat Favoritmu"
      description="Simpan donat yang kamu suka dengan ikon hati di menu, lalu pindahkan ke keranjang kapan saja."
      breadcrumb={[{ label: 'Wishlist' }]}
    >
      {loading ? (
        <p className="text-neutral-dark/60">Memuat...</p>
      ) : saved.length === 0 ? (
        <EmptyState icon="heart" title="Wishlist masih kosong" description="Tekan ikon hati di kartu menu untuk menyimpan donat favorit." />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
          {saved.map((item) => (
            <article key={item.id} className="flex flex-col overflow-hidden rounded-[20px] bg-[#FFFDF8] shadow-[0_4px_8px_rgba(59,42,30,0.06)]">
              <Link to={`/menu/${item.id}`} className="h-[260px] overflow-hidden bg-gold-pale">
                <img src={item.image} alt={item.name} className="h-full w-full object-cover transition duration-500 hover:scale-105" />
              </Link>
              <div className="flex flex-1 flex-col p-5">
                <Link to={`/menu/${item.id}`} className="mb-1 font-headline text-2xl leading-tight text-neutral-dark hover:text-accent-dark">{item.name}</Link>
                <strong className="mb-5 text-lg font-bold text-neutral-dark">{formatRupiah(item.price)}</strong>
                <div className="mt-auto flex gap-2">
                  <button type="button" onClick={() => moveToCart(item)} className="h-11 flex-1 rounded-full bg-neutral-dark text-sm font-semibold text-white transition hover:bg-choco-dark">
                    Pindah ke Keranjang
                  </button>
                  <button type="button" onClick={() => toggleWishlist(item)} aria-label={`Hapus ${item.name} dari wishlist`} className="grid size-11 place-items-center rounded-full border border-neutral-dark/15 text-neutral-dark/60 transition hover:border-accent-red/40 hover:text-accent-red">
                    <Icon name="trash" className="size-5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      <WishNotes />
    </PageShell>
  )
}

// Catatan bebas: donat atau rasa yang ingin dicoba (bisa dicentang kalau sudah dicoba).
function WishNotes() {
  const [notes, setNotes] = useLocalStorage(STORAGE_KEYS.notes, [])
  const [input, setInput] = useState('')

  const add = (event) => {
    event.preventDefault()
    if (input.trim() === '') return
    setNotes([...notes, { id: Date.now(), text: input.trim(), done: false }])
    setInput('')
  }
  const toggle = (id) => setNotes(notes.map((n) => (n.id === id ? { ...n, done: !n.done } : n)))
  const remove = (id) => setNotes(notes.filter((n) => n.id !== id))

  return (
    <section className="mt-12 grid gap-6 rounded-[20px] border border-neutral-dark/10 bg-[#FFFDF8] p-6 sm:p-8 md:grid-cols-[1fr_1.2fr]">
      <div>
        <h2 className="mb-2 font-headline text-3xl text-neutral-dark">Catatan Rasa yang Mau Dicoba</h2>
        <p className="text-sm leading-relaxed text-[#7A6455]">Punya ide rasa baru atau donat yang mau kamu coba nanti? Catat di sini.</p>
      </div>
      <div>
      <form onSubmit={add} className="flex gap-2">
        <label htmlFor="wish-note" className="sr-only">Catatan donat</label>
        <input id="wish-note" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Contoh: Matcha Honey Drizzle" className="min-w-0 flex-1 rounded-full border border-neutral-dark/20 bg-white px-5 py-3 outline-none focus:border-neutral-dark" />
        <button type="submit" className="rounded-full bg-neutral-dark px-6 py-3 font-semibold text-white transition hover:bg-choco-dark">Tambah</button>
      </form>
      {notes.length > 0 && (
        <ul className="mt-4 divide-y divide-neutral-dark/10 rounded-[16px] border border-neutral-dark/10 bg-white">
          {notes.map((note) => (
            <li key={note.id} className="flex items-center gap-3 px-5 py-3">
              <input type="checkbox" checked={note.done} onChange={() => toggle(note.id)} aria-label={`Tandai ${note.text} sudah dicoba`} className="size-5 accent-[#C97F0D]" />
              <span className={`flex-1 ${note.done ? 'text-neutral-dark/40 line-through' : 'text-neutral-dark'}`}>{note.text}</span>
              <button type="button" onClick={() => remove(note.id)} aria-label={`Hapus ${note.text}`} className="text-neutral-dark/40 hover:text-accent-red">
                <Icon name="trash" className="size-5" />
              </button>
            </li>
          ))}
        </ul>
      )}
      </div>
    </section>
  )
}
