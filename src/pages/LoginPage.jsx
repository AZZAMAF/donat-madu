import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import Icon from '../components/Icon'
import { useShop } from '../context/ShopContext'
import { ADMIN_ACCOUNT } from '../data/store'

const inputClass =
  'w-full rounded-[12px] border border-neutral-dark/20 bg-white px-4 py-3 text-neutral-dark outline-none transition focus:border-secondary'

export default function LoginPage() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const redirect = params.get('redirect') || '/profil'
  const { user, login, register, logout } = useShop()
  const [mode, setMode] = useState(params.get('mode') === 'daftar' ? 'daftar' : 'masuk')
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' })
  const [error, setError] = useState('')

  const update = (field) => (event) => setForm({ ...form, [field]: event.target.value })

  const submit = (event) => {
    event.preventDefault()
    setError('')
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return setError('Format email tidak valid.')
    if (form.password.length < 6) return setError('Password minimal 6 karakter.')

    if (mode === 'masuk') {
      const result = login(form.email, form.password)
      if (!result.ok) return setError(result.message)
      navigate(result.role === 'admin' ? '/admin' : redirect)
    } else {
      if (form.name.trim().length < 2) return setError('Nama wajib diisi.')
      if (form.password !== form.confirm) return setError('Konfirmasi password tidak sama.')
      const result = register(form)
      if (!result.ok) return setError(result.message)
      navigate(redirect)
    }
  }

  if (user) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center bg-bg-cream px-6 py-20">
        <div className="w-full max-w-md rounded-[20px] border border-neutral-dark/10 bg-white p-8 text-center">
          <h1 className="mb-2 font-headline text-3xl text-neutral-dark">Halo, {user.name}!</h1>
          <p className="mb-6 text-neutral-dark/65">Kamu sudah masuk sebagai {user.email}.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to={user.role === 'admin' ? '/admin' : '/profil'} className="rounded-full bg-primary px-6 py-3 font-semibold text-neutral-dark hover:bg-primary-dark">
              {user.role === 'admin' ? 'Buka Dashboard' : 'Ke Profil'}
            </Link>
            <button type="button" onClick={logout} className="rounded-full border border-neutral-dark/30 px-6 py-3 font-semibold text-neutral-dark hover:bg-neutral-dark/5">Keluar</button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="grid min-h-[80vh] bg-bg-cream lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-primary lg:block">
        <img src="/images/menu-4.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-dark/85 via-neutral-dark/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-12 text-white">
          <h2 className="mb-3 font-headline text-5xl leading-[1.05]">Manisnya madu, sekali klik.</h2>
          <p className="max-w-md text-white/80">Simpan alamat, pantau status pesanan, dan lihat riwayat belanjamu di satu tempat.</p>
        </div>
      </div>

      <div className="flex items-center justify-center px-6 py-14">
        <div className="w-full max-w-md">
          <div role="tablist" className="mb-8 grid grid-cols-2 rounded-full bg-cream-deep p-1">
            {[['masuk', 'Masuk'], ['daftar', 'Daftar']].map(([value, label]) => (
              <button key={value} type="button" role="tab" aria-selected={mode === value} onClick={() => { setMode(value); setError('') }} className={`rounded-full py-2.5 font-semibold transition ${mode === value ? 'bg-neutral-dark text-white' : 'text-neutral-dark/70 hover:text-neutral-dark'}`}>
                {label}
              </button>
            ))}
          </div>

          <h1 className="mb-2 font-headline text-4xl text-neutral-dark">{mode === 'masuk' ? 'Selamat datang kembali' : 'Buat akun baru'}</h1>
          <p className="mb-6 text-neutral-dark/65">{mode === 'masuk' ? 'Masuk untuk melihat profil dan riwayat pesanan.' : 'Daftar gratis, cuma butuh semenit.'}</p>

          <form onSubmit={submit} noValidate className="flex flex-col gap-4">
            {mode === 'daftar' && (
              <>
                <Field label="Nama lengkap"><input value={form.name} onChange={update('name')} className={inputClass} autoComplete="name" /></Field>
                <Field label="Nomor WhatsApp"><input value={form.phone} onChange={update('phone')} className={inputClass} inputMode="tel" placeholder="0812xxxxxxx" /></Field>
              </>
            )}
            <Field label="Email"><input type="email" value={form.email} onChange={update('email')} className={inputClass} autoComplete="email" /></Field>
            <Field label="Password"><input type="password" value={form.password} onChange={update('password')} className={inputClass} autoComplete={mode === 'masuk' ? 'current-password' : 'new-password'} /></Field>
            {mode === 'daftar' && (
              <Field label="Ulangi password"><input type="password" value={form.confirm} onChange={update('confirm')} className={inputClass} autoComplete="new-password" /></Field>
            )}

            {error && <p role="alert" className="rounded-[10px] bg-accent-red/10 px-4 py-2 text-sm text-accent-red">{error}</p>}

            <button type="submit" className="mt-2 h-12 rounded-full bg-primary font-semibold text-neutral-dark transition hover:bg-primary-dark">
              {mode === 'masuk' ? 'Masuk' : 'Daftar Sekarang'}
            </button>
          </form>

          <div className="mt-6 flex gap-3 rounded-[12px] border border-dashed border-neutral-dark/25 bg-white px-4 py-3 text-xs leading-relaxed text-neutral-dark/65">
            <Icon name="person" className="size-5 shrink-0 text-secondary" />
            <p>
              <strong className="text-neutral-dark">Mode simulasi.</strong> Akun disimpan di localStorage browser ini, bukan di server, jadi jangan pakai password asli.
              Akun admin demo: <code className="font-semibold">{ADMIN_ACCOUNT.email}</code> / <code className="font-semibold">{ADMIN_ACCOUNT.password}</code>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Field({ label, children }) {
  return (
    <label className="flex flex-col gap-1.5 text-sm font-semibold text-neutral-dark">
      {label}
      {children}
    </label>
  )
}
