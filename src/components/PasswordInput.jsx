import { useState } from 'react'
import Icon from './Icon'

// Input password dengan tombol mata untuk menampilkan/menyembunyikan isi.
export default function PasswordInput({ value, onChange, className = '', autoComplete, id }) {
  const [visible, setVisible] = useState(false)
  return (
    <div className="relative">
      <input
        id={id}
        type={visible ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        className={`${className} pr-12`}
      />
      <button
        type="button"
        onClick={() => setVisible(!visible)}
        aria-label={visible ? 'Sembunyikan password' : 'Tampilkan password'}
        className="absolute right-2 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full text-neutral-dark/55 transition hover:bg-neutral-dark/5 hover:text-neutral-dark"
      >
        <Icon name={visible ? 'eyeOff' : 'eye'} className="size-5" />
      </button>
    </div>
  )
}
