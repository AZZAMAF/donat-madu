import { Link } from 'react-router-dom'

// Kerangka halaman dalam: breadcrumb + judul + isi, dengan warna dan font yang sama
// dengan landing page.
export default function PageShell({ eyebrow, title, description, breadcrumb = [], children, actions }) {
  return (
    <div className="min-h-[60vh] bg-bg-cream">
      <section className="border-b border-neutral-dark/10 bg-cream-deep px-6 pb-10 pt-8 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-[1280px]">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-neutral-dark/60">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link to="/" className="transition hover:text-accent-dark">Beranda</Link>
              </li>
              {breadcrumb.map((crumb) => (
                <li key={crumb.label} className="flex items-center gap-2">
                  <span aria-hidden="true">/</span>
                  {crumb.to ? (
                    <Link to={crumb.to} className="transition hover:text-accent-dark">{crumb.label}</Link>
                  ) : (
                    <span aria-current="page" className="font-semibold text-neutral-dark">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              {eyebrow && <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-accent-dark">{eyebrow}</p>}
              <h1 className="font-headline text-4xl leading-[1.05] -tracking-[0.03em] text-neutral-dark sm:text-5xl">{title}</h1>
              {description && <p className="mt-3 max-w-2xl text-neutral-dark/65">{description}</p>}
            </div>
            {actions}
          </div>
        </div>
      </section>
      <div className="px-6 py-12 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-[1280px]">{children}</div>
      </div>
    </div>
  )
}
