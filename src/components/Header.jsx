import { BRAND, NAV_LINKS } from '../data/content'
import IconButton from './IconButton'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 grid w-full grid-cols-[1fr_auto_1fr] items-center border-b border-neutral-dark/10 bg-bg-cream px-12 py-4 max-[900px]:grid-cols-[1fr_auto] max-[900px]:px-5">
      <a href="#top" className="font-headline text-2xl font-bold text-neutral-dark">
        {BRAND}
      </a>

      <nav className="flex items-center gap-8 font-sans max-[900px]:col-span-full max-[900px]:mt-3 max-[900px]:justify-center max-[900px]:gap-7">
        {NAV_LINKS.map((link, index) => (
          <a
            key={link.label}
            href={link.href}
            className={
              index === 0
                ? 'font-semibold text-secondary'
                : 'font-medium text-neutral-dark transition hover:text-secondary'
            }
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className="flex items-center justify-self-end gap-4 max-[900px]:col-start-2 max-[900px]:row-start-1">
        <IconButton label="Search" icon="search" />
        <IconButton label="Shopping bag, 2 items" icon="bag" badge="2" />
        <IconButton label="User profile" icon="person" />
      </div>
    </header>
  )
}
