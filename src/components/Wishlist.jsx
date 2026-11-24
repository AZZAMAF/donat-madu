import { useState } from 'react'

export default function Wishlist() {
  const [items, setItems] = useState([])
  const [input, setInput] = useState('')

  const tambah = () => {
    if (input.trim() === '') return
    setItems([...items, { id: Date.now(), text: input, done: false }])
    setInput('')
  }

  return (
    <section className="mx-auto max-w-xl px-5 py-16">
      <h2 className="mb-4 text-2xl font-bold">Wishlist Donat</h2>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Donat apa yang mau dicoba?"
          className="flex-1 rounded-full border px-4 py-2"
        />
        <button onClick={tambah} className="rounded-full px-5 py-2">Tambah</button>
      </div>
      <ul className="mt-4">
        {items.map((item) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    </section>
  )
}
