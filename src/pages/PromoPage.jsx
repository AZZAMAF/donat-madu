import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Icon from '../components/Icon'
import MenuCard from '../components/MenuCard'
import PageShell from '../components/PageShell'
import { useShop } from '../context/ShopContext'
import { PROMO_PROGRAMS, PROMO_SLIDES, VOUCHER_TYPE_LABELS, VOUCHERS } from '../data/vouchers'
import { formatRupiah } from '../utils/format'

const FILTERS = ['Semua', ...Object.keys(VOUCHER_TYPE_LABELS)]

export default function PromoPage() {
  const navigate = useNavigate()
  const { hash } = useLocation()
  const { voucherCode, setVoucherCode, showToast, cart, products, addToCart } = useShop()
  const [filter, setFilter] = useState('Semua')

  const highlighted = decodeURIComponent(hash.slice(1))
  const flash = VOUCHERS.find((v) => v.flash)
  const regular = VOUCHERS.filter((v) => !v.flash)
  const shown = filter === 'Semua' ? regular : regular.filter((v) => v.type === filter)
  const bundles = products.filter((p) => p.category === 'Box Sets & Bundles')

  const applyCode = (code) => {
    setVoucherCode(code)
    showToast(`Voucher ${code} siap dipakai di checkout`)
  }

  const copyCode = async (code) => {
    try {
      await navigator.clipboard.writeText(code)
      showToast(`Kode ${code} disalin`)
    } catch {
      showToast(`Kode: ${code}`)
    }
  }

  return (
    <PageShell
      eyebrow="Promo & Voucher"
      title="Semua Promo Madu Donut"
      description="Pilih voucher, lalu otomatis terpasang saat checkout. Satu pesanan bisa memakai satu voucher."
      breadcrumb={[{ label: 'Promo & Voucher' }]}
    >
      {flash && <FlashBanner voucher={flash} selected={voucherCode === flash.code} onApply={applyCode} />}

      {/* Promo unggulan: sama dengan slide di landing page. Klik slide di landing langsung lompat ke sini. */}
      <h2 className="mb-6 mt-14 font-headline text-3xl text-neutral-dark">Promo Unggulan</h2>
      <div className="grid gap-5 md:grid-cols-2">
        {PROMO_SLIDES.map((promo) => {
          const selected = voucherCode === promo.code
          return (
            <article
              key={promo.code}
              id={promo.code}
              className={`flex flex-col overflow-hidden rounded-[20px] border bg-[#FFFDF8] transition sm:flex-row ${highlighted === promo.code ? 'border-neutral-dark ring-2 ring-neutral-dark/20' : 'border-neutral-dark/10'}`}
            >
              {/* Foto di kotak sendiri, jadi tidak pernah menimpa teks. */}
              <img src={promo.image} alt="" className="aspect-[16/10] w-full object-cover sm:aspect-auto sm:w-[42%]" />
              <div className="flex flex-1 flex-col p-6">
                <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-accent-dark">
                  <span className="size-2 rounded-full" style={{ backgroundColor: promo.bg }} aria-hidden="true" />
                  {promo.eyebrow}
                </p>
                <h3 className="mb-2 font-headline text-2xl leading-tight text-neutral-dark">{promo.title}</h3>
                <p className="mb-5 text-sm leading-relaxed text-[#7A6455]">{promo.description}</p>
                <div className="mt-auto flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-dashed border-neutral-dark/40 px-3 py-1.5 font-mono text-sm font-bold text-neutral-dark">{promo.code}</span>
                  <button type="button" onClick={() => (selected ? setVoucherCode('') : applyCode(promo.code))} className={`rounded-full px-5 py-2 text-sm font-semibold transition ${selected ? 'bg-[#4E7A3A]/10 text-[#4E7A3A]' : 'bg-neutral-dark text-white hover:bg-choco-dark'}`}>
                    {selected ? '✓ Terpasang' : 'Pakai Voucher'}
                  </button>
                </div>
              </div>
            </article>
          )
        })}
      </div>

      <div className="mb-6 mt-16 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <h2 className="font-headline text-3xl text-neutral-dark">Semua Voucher</h2>
        <div role="tablist" aria-label="Filter voucher" className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button key={f} type="button" role="tab" aria-selected={filter === f} onClick={() => setFilter(f)} className={`h-11 rounded-full border-2 px-4 text-sm font-semibold transition ${filter === f ? 'border-neutral-dark bg-neutral-dark text-white' : 'border-white text-[#7A6455] hover:bg-white hover:text-neutral-dark'}`}>
              {f === 'Semua' ? 'Semua' : VOUCHER_TYPE_LABELS[f]}
            </button>
          ))}
        </div>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {shown.map((voucher) => (
          <VoucherCard key={voucher.code} voucher={voucher} selected={voucherCode === voucher.code} onApply={applyCode} onRemove={() => setVoucherCode('')} onCopy={copyCode} />
        ))}
      </div>

      <h2 className="mb-6 mt-16 font-headline text-3xl text-neutral-dark">Program Spesial</h2>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {PROMO_PROGRAMS.map((program) => (
          <article key={program.title} className="rounded-[20px] border border-neutral-dark/10 bg-[#FFFDF8] p-6">
            <span className="mb-4 grid size-11 place-items-center rounded-full bg-cream-deep text-neutral-dark">
              <Icon name={program.icon} className="size-6" />
            </span>
            <h3 className="mb-2 font-headline text-xl text-neutral-dark">{program.title}</h3>
            <p className="text-sm leading-relaxed text-[#7A6455]">{program.description}</p>
          </article>
        ))}
      </div>

      {bundles.length > 0 && (
        <>
          <div className="mb-6 mt-16">
            <h2 className="font-headline text-3xl text-neutral-dark">Paket Hemat Berbagi</h2>
            <p className="mt-2 text-neutral-dark/65">Pakai kode <strong>BOXHEMAT</strong> untuk potongan 20% di paket box.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {bundles.map((item) => <MenuCard key={item.id} item={item} onAddToCart={addToCart} />)}
          </div>
        </>
      )}

      <details className="mt-16 rounded-[20px] border border-neutral-dark/10 bg-[#FFFDF8] p-6">
        <summary className="cursor-pointer font-headline text-2xl text-neutral-dark">Syarat & Ketentuan</summary>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-neutral-dark/70">
          <li>Satu pesanan hanya bisa memakai satu kode voucher.</li>
          <li>Minimal belanja dihitung dari subtotal sebelum ongkos kirim.</li>
          <li>Voucher persen memiliki batas maksimal potongan sesuai keterangan.</li>
          <li>Voucher gratis ongkir hanya berlaku untuk pengiriman kurir.</li>
          <li>Madu Donut berhak membatalkan pesanan yang menyalahgunakan promo.</li>
        </ul>
      </details>

      {voucherCode && (
        <div className="sticky bottom-4 z-30 mt-10 flex flex-col items-center justify-between gap-4 rounded-[16px] bg-neutral-dark px-6 py-4 text-white shadow-xl sm:flex-row">
          <p>Voucher <strong className="text-primary">{voucherCode}</strong> sudah dipilih.</p>
          <button type="button" onClick={() => navigate(cart.length ? '/checkout' : '/#menu-list')} className="rounded-full bg-white px-6 py-3 font-semibold text-neutral-dark transition hover:bg-bg-cream">
            {cart.length ? 'Lanjut ke Checkout' : 'Pilih Donat Dulu'}
          </button>
        </div>
      )}
    </PageShell>
  )
}

function VoucherCard({ voucher, selected, onApply, onRemove, onCopy }) {
  return (
    <article className={`flex overflow-hidden rounded-[20px] border bg-[#FFFDF8] transition ${selected ? 'border-neutral-dark ring-2 ring-neutral-dark/15' : 'border-neutral-dark/10'}`}>
      {/* Potongan tiket: satu warna netral untuk semua voucher, garis putus-putus sebagai sobekan. */}
      <div className="flex w-24 shrink-0 flex-col items-center justify-center gap-2 border-r-2 border-dashed border-neutral-dark/15 bg-cream-deep text-neutral-dark sm:w-28">
        <Icon name="tag" className="size-7" />
        <span className="text-center text-xs font-bold leading-tight">
          {voucher.type === 'percent' && `${voucher.value}%`}
          {voucher.type === 'fixed' && formatRupiah(voucher.value)}
          {voucher.type === 'shipping' && 'ONGKIR'}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-headline text-xl leading-tight text-neutral-dark">{voucher.title}</h3>
        <p className="mb-3 mt-1 text-sm text-[#7A6455]">{voucher.description}</p>
        <p className="mb-4 text-xs text-neutral-dark/50">
          Min. belanja {formatRupiah(voucher.minSpend)} · Berlaku s/d {new Date(voucher.validUntil).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
        <div className="mt-auto flex flex-wrap items-center gap-2">
          <button type="button" onClick={() => onCopy(voucher.code)} className="inline-flex items-center gap-2 rounded-full border border-dashed border-neutral-dark/40 px-4 py-2 font-mono text-sm font-bold text-neutral-dark transition hover:bg-neutral-dark/5" aria-label={`Salin kode ${voucher.code}`}>
            {voucher.code} <Icon name="copy" className="size-4" />
          </button>
          {selected ? (
            <button type="button" onClick={onRemove} className="inline-flex items-center gap-1 rounded-full bg-[#4E7A3A]/10 px-4 py-2 text-sm font-semibold text-[#4E7A3A]">
              <Icon name="check" className="size-4" /> Terpasang · lepas
            </button>
          ) : (
            <button type="button" onClick={() => onApply(voucher.code)} className="rounded-full bg-neutral-dark px-4 py-2 text-sm font-semibold text-white transition hover:bg-choco-dark">
              Pakai
            </button>
          )}
        </div>
      </div>
    </article>
  )
}

// Hitung mundur sampai tengah malam untuk voucher kilat.
function FlashBanner({ voucher, selected, onApply }) {
  const [left, setLeft] = useState(msUntilMidnight)
  useEffect(() => {
    const timer = setInterval(() => setLeft(msUntilMidnight()), 1000)
    return () => clearInterval(timer)
  }, [])

  const parts = [3600000, 60000, 1000].map((unit, i, arr) => {
    const value = Math.floor((i === 0 ? left : left % arr[i - 1]) / unit)
    return String(value).padStart(2, '0')
  })

  return (
    <section className="flex flex-col items-start justify-between gap-6 rounded-[20px] bg-choco-dark p-7 text-white md:flex-row md:items-center sm:p-9">
      <div>
        <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-accent-red px-3 py-1 text-xs font-bold uppercase tracking-wider">⚡ Flash Voucher</p>
        <h2 className="mb-2 font-headline text-3xl sm:text-4xl">{voucher.title}</h2>
        <p className="max-w-lg text-white/70">{voucher.description}</p>
      </div>
      <div className="flex flex-col items-start gap-4 md:items-end">
        <div className="flex items-center gap-2" aria-label={`Berakhir dalam ${parts.join(':')}`}>
          {parts.map((part, i) => (
            <span key={i} className="flex items-center gap-2">
              <span className="grid h-14 w-14 place-items-center rounded-[12px] bg-white/10 font-headline text-2xl tabular-nums">{part}</span>
              {i < 2 && <span className="text-xl text-white/50">:</span>}
            </span>
          ))}
        </div>
        <button type="button" onClick={() => onApply(voucher.code)} disabled={selected} className="rounded-full bg-white px-6 py-3 font-semibold text-neutral-dark transition hover:bg-bg-cream disabled:opacity-70">
          {selected ? `✓ ${voucher.code} terpasang` : `Pakai ${voucher.code}`}
        </button>
      </div>
    </section>
  )
}

function msUntilMidnight() {
  const now = new Date()
  const midnight = new Date(now)
  midnight.setHours(24, 0, 0, 0)
  return midnight - now
}
