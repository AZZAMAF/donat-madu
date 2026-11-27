import { Link } from 'react-router-dom'
import { BRAND, CTA_BANNER, FOOTER, NAV_LINKS } from '../data/content'

// Quick links di footer menunjuk anchor yang sama dengan nav utama,
// supaya tidak ada lagi tautan mati href="#".
const QUICK_LINK_MAP = Object.fromEntries(NAV_LINKS.map((link) => [link.label.toLowerCase(), link.href]))

export default function Footer() {
  return (
    <>
      {/* CTA banner versi Figma: kartu kuning rounded, tidak full sampai pinggir layar. */}
      <section className="bg-bg-cream px-6 pb-20 pt-4 sm:px-10 lg:px-16">
        <div className="relative mx-auto flex max-w-[1100px] flex-col items-start justify-between gap-8 overflow-hidden rounded-[28px] bg-primary px-8 py-12 sm:px-12 md:flex-row md:items-center">
          <span aria-hidden="true" className="pointer-events-none absolute -bottom-24 -right-16 size-64 rounded-full bg-white/20" />
          <div className="relative">
            <h2 className="mb-3 font-headline text-3xl leading-tight -tracking-[0.02em] text-neutral-dark sm:text-[40px]">
              {CTA_BANNER.title}
            </h2>
            <p className="max-w-xl text-neutral-dark/75">{CTA_BANNER.description}</p>
          </div>
          <Link
            to="/#menu-list"
            className="relative shrink-0 rounded-full bg-neutral-dark px-7 py-4 font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-choco-dark"
          >
            {CTA_BANNER.buttonText}
          </Link>
        </div>
      </section>

      <footer id="contact" className="bg-choco-dark px-6 py-16 text-white sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-[1280px] gap-10 md:grid-cols-[1.4fr_0.6fr_0.9fr]">
          <div>
            <p className="mb-4 font-headline text-3xl">{BRAND}</p>
            <p className="max-w-sm leading-relaxed text-white/60">{FOOTER.tagline}</p>
          </div>

          <nav aria-label="Tautan cepat">
            <h2 className="mb-4 font-semibold">Tautan cepat</h2>
            <ul className="flex flex-col gap-2 text-white/65">
              {FOOTER.quickLinks.map((label) => {
                const href = QUICK_LINK_MAP[label.toLowerCase()] ?? '#top'
                return (
                  <li key={label}>
                    <Link to={`/${href}`} className="transition hover:text-primary">
                      {label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div>
            <h2 className="mb-4 font-semibold">Kunjungi kami</h2>
            <address className="not-italic leading-7 text-white/65">
              {FOOTER.contact.address}
              <br />
              <a href={`tel:${FOOTER.contact.phone.replace(/\s/g, '')}`} className="transition hover:text-primary">
                {FOOTER.contact.phone}
              </a>
              <br />
              {FOOTER.contact.hours}
            </address>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-[1280px] border-t border-white/10 pt-6 text-sm text-white/45">
          {FOOTER.copyright}
        </div>
      </footer>
    </>
  )
}
