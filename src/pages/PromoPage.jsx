import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon'
import PageShell from '../components/PageShell'
import PromoCarousel from '../components/PromoCarousel'
import { useShop } from '../context/ShopContext'
import { PROMO_SLIDES, VOUCHERS } from '../data/vouchers'
import { formatRupiah } from '../utils/format'

export default function PromoPage() {
  const navigate = useNavigate()
  const { voucherCode, setVoucherCode, showToast, cart } = useShop()

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
      title="Lebih Manis, Lebih Hemat"
      description="Pilih voucher, lalu otomatis terpasang saat kamu checkout. Satu pesanan bisa memakai satu voucher."
      breadcrumb={[{ label: 'Promo & Voucher' }]}
    >
      <PromoCarousel slides={PROMO_SLIDES} onApplyCode={applyCode} />

      <h2 className="mb-6 mt-16 font-headline text-3xl text-neutral-dark">Semua Voucher</h2>
      <div className="grid gap-5 md:grid-cols-2">
        {VOUCHERS.map((voucher) => {
          const selected = voucherCode === voucher.code
          return (
            <article key={voucher.code} className={`flex overflow-hidden rounded-[16px] border bg-white transition ${selected ? 'border-secondary ring-2 ring-primary/50' : 'border-neutral-dark/10'}`}>
              <div className="flex w-24 shrink-0 flex-col items-center justify-center gap-2 border-r-2 border-dashed border-white/60 text-white sm:w-28" style={{ backgroundColor: voucher.color }}>
                <Icon name="tag" className="size-7" />
                <span className="text-center text-xs font-bold leading-tight">
                  {voucher.type === 'percent' && `${voucher.value}%`}
                  {voucher.type === 'fixed' && formatRupiah(voucher.value)}
                  {voucher.type === 'shipping' && 'ONGKIR'}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-headline text-xl leading-tight text-neutral-dark">{voucher.title}</h3>
                <p className="mb-3 mt-1 text-sm text-neutral-dark/65">{voucher.description}</p>
                <p className="mb-4 text-xs text-neutral-dark/50">
                  Min. belanja {formatRupiah(voucher.minSpend)} · Berlaku s/d {new Date(voucher.validUntil).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
                <div className="mt-auto flex flex-wrap items-center gap-2">
                  <button type="button" onClick={() => copyCode(voucher.code)} className="inline-flex items-center gap-2 rounded-full border border-dashed border-neutral-dark/40 px-4 py-2 font-mono text-sm font-bold text-neutral-dark transition hover:bg-neutral-dark/5" aria-label={`Salin kode ${voucher.code}`}>
                    {voucher.code} <Icon name="copy" className="size-4" />
                  </button>
                  {selected ? (
                    <button type="button" onClick={() => setVoucherCode('')} className="inline-flex items-center gap-1 rounded-full bg-[#4E7A3A]/10 px-4 py-2 text-sm font-semibold text-[#4E7A3A]">
                      <Icon name="check" className="size-4" /> Terpasang · lepas
                    </button>
                  ) : (
                    <button type="button" onClick={() => applyCode(voucher.code)} className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-neutral-dark transition hover:bg-primary-dark">
                      Pakai
                    </button>
                  )}
                </div>
              </div>
            </article>
          )
        })}
      </div>

      {voucherCode && (
        <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-[16px] bg-neutral-dark px-6 py-5 text-white sm:flex-row">
          <p>Voucher <strong className="text-primary">{voucherCode}</strong> sudah dipilih.</p>
          <button type="button" onClick={() => navigate(cart.length ? '/checkout' : '/#menu-list')} className="rounded-full bg-primary px-6 py-3 font-semibold text-neutral-dark transition hover:bg-primary-dark">
            {cart.length ? 'Lanjut ke Checkout' : 'Pilih Donat Dulu'}
          </button>
        </div>
      )}
    </PageShell>
  )
}
