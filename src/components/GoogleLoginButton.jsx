import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import { useState } from 'react'
import Icon from './Icon'

// Client ID diambil dari file .env: VITE_GOOGLE_CLIENT_ID=xxxx.apps.googleusercontent.com
const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID

// Isi token Google (JWT) berupa JSON di bagian tengah, dikodekan base64url.
function decodeGoogleToken(credential) {
  const payload = credential.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
  const json = decodeURIComponent(
    atob(payload).split('').map((c) => `%${c.charCodeAt(0).toString(16).padStart(2, '0')}`).join(''),
  )
  return JSON.parse(json)
}

// Tombol "Masuk dengan Google".
// - Ada Client ID: memakai Google Identity Services asli.
// - Belum ada: mode demo, memilih akun contoh supaya presentasi tetap jalan.
export default function GoogleLoginButton({ onSuccess }) {
  if (CLIENT_ID) {
    return (
      <GoogleOAuthProvider clientId={CLIENT_ID}>
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={({ credential }) => {
              const data = decodeGoogleToken(credential)
              onSuccess({ name: data.name, email: data.email, picture: data.picture })
            }}
            onError={() => console.error('Login Google gagal.')}
            text="continue_with"
            shape="pill"
            width="360"
            locale="id"
          />
        </div>
      </GoogleOAuthProvider>
    )
  }
  return <DemoGoogleLogin onSuccess={onSuccess} />
}

const DEMO_ACCOUNTS = [
  { name: 'Rina Kartika', email: 'rina.kartika@gmail.com', picture: '' },
  { name: 'Dimas Pratama', email: 'dimas.pratama@gmail.com', picture: '' },
]

function DemoGoogleLogin({ onSuccess }) {
  const [open, setOpen] = useState(false)
  const [custom, setCustom] = useState({ name: '', email: '' })

  const submitCustom = (event) => {
    event.preventDefault()
    if (custom.name.trim().length < 2 || !/^\S+@\S+\.\S+$/.test(custom.email)) return
    onSuccess({ name: custom.name.trim(), email: custom.email.trim(), picture: '' })
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex h-12 w-full items-center justify-center gap-3 rounded-full border border-neutral-dark/20 bg-white font-semibold text-neutral-dark transition hover:bg-cream-deep"
      >
        <GoogleMark /> Lanjutkan dengan Google
      </button>

      {open && (
        <div role="dialog" aria-modal="true" aria-label="Pilih akun Google" className="fixed inset-0 z-[70] flex items-center justify-center bg-neutral-dark/50 px-4" onClick={() => setOpen(false)}>
          <div className="w-full max-w-sm rounded-[20px] bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-1 flex items-center gap-2"><GoogleMark /><span className="text-sm text-neutral-dark/70">Login dengan Google</span></div>
            <h2 className="mb-1 font-headline text-2xl text-neutral-dark">Pilih akun</h2>
            <p className="mb-4 text-xs text-accent-red">Mode demo: Client ID Google belum diatur, jadi ini akun contoh.</p>
            <ul className="mb-4 divide-y divide-neutral-dark/10 rounded-[12px] border border-neutral-dark/10">
              {DEMO_ACCOUNTS.map((acc) => (
                <li key={acc.email}>
                  <button type="button" onClick={() => onSuccess(acc)} className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-cream-deep">
                    <span className="grid size-9 place-items-center rounded-full bg-[#4285F4] font-semibold text-white">{acc.name.charAt(0)}</span>
                    <span><span className="block text-sm font-semibold text-neutral-dark">{acc.name}</span><span className="block text-xs text-neutral-dark/60">{acc.email}</span></span>
                  </button>
                </li>
              ))}
            </ul>
            <form onSubmit={submitCustom} className="flex flex-col gap-2">
              <p className="text-xs font-semibold text-neutral-dark/60">Atau pakai akun lain</p>
              <input value={custom.name} onChange={(e) => setCustom({ ...custom, name: e.target.value })} placeholder="Nama" className="rounded-[10px] border border-neutral-dark/20 px-3 py-2 text-sm outline-none focus:border-secondary" />
              <input type="email" value={custom.email} onChange={(e) => setCustom({ ...custom, email: e.target.value })} placeholder="email@gmail.com" className="rounded-[10px] border border-neutral-dark/20 px-3 py-2 text-sm outline-none focus:border-secondary" />
              <button type="submit" className="mt-1 rounded-full bg-[#4285F4] py-2.5 text-sm font-semibold text-white hover:bg-[#3574E0]">Lanjutkan</button>
            </form>
            <button type="button" onClick={() => setOpen(false)} className="mt-3 inline-flex items-center gap-1 text-sm text-neutral-dark/60 hover:text-neutral-dark">
              <Icon name="arrowLeft" className="size-4" /> Batal
            </button>
          </div>
        </div>
      )}
    </>
  )
}

function GoogleMark() {
  return (
    <svg viewBox="0 0 48 48" className="size-5" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  )
}
