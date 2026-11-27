import { Link, useNavigate } from 'react-router-dom'
import { PROMO_SLIDES } from '../data/vouchers'
import PromoCarousel from './PromoCarousel'
import SectionHeading from './SectionHeading'

// Carousel promo di landing page. Klik slide membawa ke halaman Promo yang lengkap.
export default function PromoHighlight() {
  const navigate = useNavigate()

  return (
    <section id="promo" className="bg-bg-cream px-6 pb-20 pt-6 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <SectionHeading eyebrow="Promo Hari Ini" title="Lebih Manis, Lebih Hemat" />
          <Link to="/promo" className="flex items-center gap-2 border-b border-neutral-dark pb-1 font-semibold text-neutral-dark transition hover:border-secondary hover:text-secondary">
            Lihat semua promo <span aria-hidden="true">→</span>
          </Link>
        </div>
        <PromoCarousel slides={PROMO_SLIDES} ctaLabel="Lihat Promo" onCta={(slide) => navigate(`/promo#${slide.code}`)} />
      </div>
    </section>
  )
}
