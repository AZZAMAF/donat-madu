import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import GoogleLoginButton from '../components/GoogleLoginButton'
import PasswordInput from '../components/PasswordInput'
import { useShop } from '../context/ShopContext'
import { ADMIN_ACCOUNT, DEMO_CUSTOMER } from '../data/store'

const inputClass =
  'w-full rounded-[12px] border border-neutral-dark/20 bg-white px-4 py-3 text-neutral-dark outline-none transition focus:border-secondary'

export default function LoginPage() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const redirect = params.get('redirect') || '/profil'
  const { user, lastEmail, login, register, logout, loginWithGoogle } = useShop()
  const [mode, setMode] = useState(params.get('mode') === 'daftar' ? 'daftar' : 'masuk')
  const [form, setForm] = useState({ name: '', email: lastEmail, phone: '', password: '', confirm: '' })
  const [remember, setRemember] = useState(true)
  const [error, setError] = useState('')

  const google = (profile) => {
    loginWithGoogle(profile)
    navigate(redirect)
  }

  // Tombol demo: langsung masuk tanpa mengetik.
  const demoLogin = (account) => {
    const result = login(account.email, account.password, remember)
    navigate(result.role === 'admin' ? '/admin' : redirect)
  }

  const update = (field) => (event) => setForm({ ...form, [field]: event.target.value })

  const submit = (event) => {
    event.preventDefault()
    setError('')
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return setError('Format email tidak valid.')
    if (form.password.length < 6) return setError('Password minimal 6 karakter.')

    if (mode === 'masuk') {
      const result = login(form.email, form.password, remember)
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
            <Link to={user.role === 'admin' ? '/admin' : '/profil'} className="rounded-full bg-neutral-dark px-6 py-3 font-semibold text-white hover:bg-choco-dark">
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
      <div className="relative hidden overflow-hidden bg-neutral-dark lg:block">
        <img src="/images/donat-semua.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
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

          <GoogleLoginButton onSuccess={google} />
          <div className="my-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-neutral-dark/40">
            <span className="h-px flex-1 bg-neutral-dark/15" /> atau dengan email <span className="h-px flex-1 bg-neutral-dark/15" />
          </div>

          <form onSubmit={submit} noValidate className="flex flex-col gap-4">
            {mode === 'daftar' && (
              <>
                <Field label="Nama lengkap"><input value={form.name} onChange={update('name')} className={inputClass} autoComplete="name" /></Field>
                <Field label="Nomor WhatsApp"><input value={form.phone} onChange={update('phone')} className={inputClass} inputMode="tel" placeholder="0812xxxxxxx" /></Field>
              </>
            )}
            <Field label="Email"><input type="email" value={form.email} onChange={update('email')} className={inputClass} autoComplete="email" /></Field>
            <Field label="Password"><PasswordInput value={form.password} onChange={update('password')} className={inputClass} autoComplete={mode === 'masuk' ? 'current-password' : 'new-password'} /></Field>
            {mode === 'daftar' && (
              <Field label="Ulangi password"><PasswordInput value={form.confirm} onChange={update('confirm')} className={inputClass} autoComplete="new-password" /></Field>
            )}

            <label className="flex items-center gap-2 text-sm text-neutral-dark/75">
              <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="size-4 accent-[#C97F0D]" />
              Ingat saya (tetap masuk walau browser ditutup)
            </label>

            {error && <p role="alert" className="rounded-[10px] bg-accent-red/10 px-4 py-2 text-sm text-accent-red">{error}</p>}

            <button type="submit" className="mt-2 h-12 rounded-full bg-neutral-dark font-semibold text-white transition hover:bg-choco-dark">
              {mode === 'masuk' ? 'Masuk' : 'Daftar Sekarang'}
            </button>
          </form>

          <div className="mt-6 rounded-[16px] border border-dashed border-neutral-dark/25 bg-white p-5">
            <p className="mb-1 text-sm font-bold text-neutral-dark">Akun demo (mode simulasi)</p>
            <p className="mb-4 text-xs leading-relaxed text-neutral-dark/60">
              Data akun disimpan di browser ini (localStorage), bukan di server. Klik tombol untuk langsung masuk.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { title: 'Admin', account: ADMIN_ACCOUNT },
                { title: 'Pelanggan', account: DEMO_CUSTOMER },
              ].map(({ title, account }) => (
                <div key={title} className="rounded-[12px] bg-cream-deep p-3 text-xs text-neutral-dark/75">
                  <p className="mb-1 font-bold text-neutral-dark">{title}</p>
                  <p>Email: <span className="font-semibold text-neutral-dark">{account.email}</span></p>
                  <p className="mb-3">Password: <span className="font-semibold text-neutral-dark">{account.password}</span></p>
                  <button type="button" onClick={() => demoLogin(account)} className="w-full rounded-full bg-neutral-dark py-2 text-xs font-semibold text-white transition hover:bg-accent-dark">
                    Masuk sebagai {title}
                  </button>
                </div>
              ))}
            </div>
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
