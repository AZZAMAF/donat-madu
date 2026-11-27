import { Link } from 'react-router-dom'
import { BRAND, NAV_LINKS } from '../data/content'
import CartDropdown from './CartDropdown'
import HeaderSearch from './HeaderSearch'
import Icon from './Icon'
import UserMenu from './UserMenu'

export default function Header({ totalQty, isCartOpen, setIsCartOpen, cart, onQtyChange, onRemove }) {
  return (
    <header className="sticky top-0 z-50 grid w-full grid-cols-[1fr_auto_1fr] items-center border-b border-neutral-dark/10 bg-bg-cream px-12 py-4 max-[900px]:grid-cols-[1fr_auto] max-[900px]:px-5">
      <Link to="/#top" className="font-headline text-2xl font-bold text-neutral-dark">
        {BRAND}
      </Link>

      <nav className="flex items-center gap-8 font-sans max-[900px]:col-span-full max-[900px]:mt-3 max-[900px]:justify-center max-[900px]:gap-7">
        {NAV_LINKS.map((link, index) => (
          // Link ke "/#anchor" supaya dari halaman lain tetap kembali ke bagian landing page.
          <Link
            key={link.label}
            to={`/${link.href}`}
            className={
              index === 0
                ? 'font-semibold text-secondary'
                : 'font-medium text-neutral-dark transition hover:text-secondary'
            }
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center justify-self-end gap-4 max-[900px]:col-start-2 max-[900px]:row-start-1">
        <HeaderSearch />

        {/* Satu wrapper buat hover + klik. onMouseLeave ada di sini supaya panel
            tidak tertutup saat pointer pindah dari ikon ke panel dropdown. */}
        <div
          className="relative"
          onMouseEnter={() => setIsCartOpen(true)}
          onMouseLeave={() => setIsCartOpen(false)}
          onKeyDown={(event) => {
            if (event.key === 'Escape') setIsCartOpen(false)
          }}
        >
          <button
            type="button"
            aria-label={`Shopping bag, ${totalQty} items`}
            aria-expanded={isCartOpen}
            onClick={() => setIsCartOpen(!isCartOpen)}
            className="relative grid size-10 place-items-center rounded-full text-neutral-dark transition hover:bg-neutral-dark/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-dark"
          >
            <Icon name="bag" className="size-[22px]" />
            <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-accent-red text-[10px] font-bold text-white">
              {totalQty}
            </span>
          </button>

          {isCartOpen && (
            <CartDropdown cart={cart} onQtyChange={onQtyChange} onRemove={onRemove} onClose={() => setIsCartOpen(false)} />
          )}
        </div>

        <UserMenu />
      </div>
    </header>
  )
}
