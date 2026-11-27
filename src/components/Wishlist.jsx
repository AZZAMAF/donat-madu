import { useState } from 'react'
import { Link } from 'react-router-dom'
import { STORAGE_KEYS } from '../data/store'
import useLocalStorage from '../hooks/useLocalStorage'
import Icon from './Icon'
import SectionHeading from './SectionHeading'

// Catatan "donat yang mau dicoba". Disimpan di localStorage dengan key yang sama
// dengan halaman Wishlist, jadi isinya muncul di dua tempat.
export default function Wishlist() {
  const [items, setItems] = useLocalStorage(STORAGE_KEYS.notes, [])
  const [input, setInput] = useState('')

  const tambah = (event) => {
    event.preventDefault()
    if (input.trim() === '') return
    setItems([...items, { id: Date.now(), text: input.trim(), done: false }])
    setInput('')
  }
  const toggle = (id) => setItems(items.map((item) => (item.id === id ? { ...item, done: !item.done } : item)))
  const hapus = (id) => setItems(items.filter((item) => item.id !== id))

  const selesai = items.filter((item) => item.done).length

  return (
    <section id="wishlist" className="bg-bg-cream px-6 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto grid max-w-[1280px] items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeading eyebrow="Wishlist Donat" title="Donat Apa yang Mau Kamu Coba?" />
          <p className="mt-4 max-w-md leading-relaxed text-neutral-dark/65">
            Catat rasa yang bikin penasaran, lalu centang kalau sudah dicoba. Donat favorit dari menu bisa disimpan dengan ikon hati.
          </p>
          <Link to="/wishlist" className="mt-6 inline-flex items-center gap-2 border-b border-neutral-dark pb-1 font-semibold text-neutral-dark transition hover:border-secondary hover:text-accent-dark">
            <Icon name="heart" className="size-4" /> Buka wishlist lengkap <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="rounded-[20px] border border-neutral-dark/10 bg-white p-6 shadow-sm sm:p-8">
          <form onSubmit={tambah} className="flex flex-col gap-3 sm:flex-row">
            <label htmlFor="wishlist-input" className="sr-only">Donat yang mau dicoba</label>
            <input
              id="wishlist-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Contoh: Matcha Honey Drizzle"
              className="h-12 min-w-0 flex-1 rounded-full border border-neutral-dark/20 bg-bg-cream px-5 text-neutral-dark outline-none transition placeholder:text-neutral-dark/40 focus:border-secondary focus:bg-white"
            />
            <button type="submit" className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-6 font-semibold text-neutral-dark transition hover:bg-primary-dark">
              <Icon name="plus" className="size-5" /> Tambah
            </button>
          </form>

          {items.length === 0 ? (
            <div className="mt-6 flex flex-col items-center rounded-[16px] border border-dashed border-neutral-dark/20 px-6 py-10 text-center">
              <span className="mb-3 grid size-12 place-items-center rounded-full bg-primary/20 text-accent-dark">
                <Icon name="heart" className="size-6" />
              </span>
              <p className="font-semibold text-neutral-dark">Belum ada catatan</p>
              <p className="text-sm text-neutral-dark/60">Tulis donat pertama yang mau kamu coba.</p>
            </div>
          ) : (
            <>
              <div className="mb-3 mt-6 flex items-center justify-between text-sm text-neutral-dark/60">
                <span>{items.length} donat dicatat</span>
                <span>{selesai} sudah dicoba</span>
              </div>
              <div className="mb-4 h-2 overflow-hidden rounded-full bg-cream-deep">
                <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${(selesai / items.length) * 100}%` }} />
              </div>
              <ul className="flex flex-col gap-2">
                {items.map((item) => (
                  <li key={item.id} className="group flex items-center gap-3 rounded-[12px] border border-neutral-dark/10 px-4 py-3 transition hover:border-neutral-dark/25">
                    <button
                      type="button"
                      onClick={() => toggle(item.id)}
                      aria-pressed={item.done}
                      aria-label={`Tandai ${item.text} sudah dicoba`}
                      className={`grid size-6 shrink-0 place-items-center rounded-full border-2 transition ${item.done ? 'border-secondary bg-secondary text-white' : 'border-neutral-dark/25 hover:border-secondary'}`}
                    >
                      {item.done && <Icon name="check" className="size-4" />}
                    </button>
                    <span className={`flex-1 ${item.done ? 'text-neutral-dark/40 line-through' : 'text-neutral-dark'}`}>{item.text}</span>
                    <button type="button" onClick={() => hapus(item.id)} aria-label={`Hapus ${item.text}`} className="grid size-8 place-items-center rounded-full text-neutral-dark/40 transition hover:bg-accent-red/10 hover:text-accent-red">
                      <Icon name="trash" className="size-4" />
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
