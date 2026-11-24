import { BRAND, CTA_BANNER, FOOTER, NAV_LINKS } from '../data/content'

// Quick links di footer menunjuk anchor yang sama dengan nav utama,
// supaya tidak ada lagi tautan mati href="#".
const QUICK_LINK_MAP = Object.fromEntries(NAV_LINKS.map((link) => [link.label.toLowerCase(), link.href]))

export default function Footer() {
  return (
    <>
      <section className="bg-primary px-6 py-14 sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <h2 className="mb-3 font-headline text-4xl -tracking-[0.03em] text-neutral-dark sm:text-5xl">
              {CTA_BANNER.title}
            </h2>
            <p className="max-w-2xl text-neutral-dark/70">{CTA_BANNER.description}</p>
          </div>
          <a
            href="#menu-list"
            className="shrink-0 rounded-full bg-neutral-dark px-7 py-4 font-semibold text-white transition hover:bg-accent-dark"
          >
            {CTA_BANNER.buttonText}
          </a>
        </div>
      </section>

      <footer id="contact" className="bg-choco-dark px-6 py-16 text-white sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-[1280px] gap-10 md:grid-cols-[1.4fr_0.6fr_0.9fr]">
          <div>
            <p className="mb-4 font-headline text-3xl">{BRAND}</p>
            <p className="max-w-sm leading-relaxed text-white/60">{FOOTER.tagline}</p>
          </div>

          <nav aria-label="Quick links">
            <h2 className="mb-4 font-semibold">Quick links</h2>
            <ul className="flex flex-col gap-2 text-white/65">
              {FOOTER.quickLinks.map((label) => {
                const href = QUICK_LINK_MAP[label.toLowerCase()] ?? '#top'
                return (
                  <li key={label}>
                    <a href={href} className="transition hover:text-primary">
                      {label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div>
            <h2 className="mb-4 font-semibold">Visit us</h2>
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
