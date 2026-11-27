import { Link } from 'react-router-dom'

export default function NotFoundPage({ message = 'Halaman yang kamu cari tidak ada. Mungkin link-nya salah ketik.' }) {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center bg-bg-cream px-6 py-24 text-center">
      <p className="mb-2 font-headline text-[7rem] leading-none text-primary sm:text-[10rem]">4<span className="text-secondary">0</span>4</p>
      <h1 className="mb-3 font-headline text-3xl text-neutral-dark sm:text-4xl">Yah, donatnya hilang!</h1>
      <p className="mb-8 max-w-md text-neutral-dark/65">{message}</p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link to="/" className="rounded-full bg-primary px-6 py-3 font-semibold text-neutral-dark transition hover:bg-primary-dark">Kembali ke Home</Link>
        <Link to="/#menu-list" className="rounded-full border border-neutral-dark/40 px-6 py-3 font-semibold text-neutral-dark transition hover:bg-neutral-dark/5">Lihat Menu</Link>
      </div>
    </section>
  )
}
