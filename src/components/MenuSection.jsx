import { useState } from 'react'
import { Link } from 'react-router-dom'
import { categoryLabel } from '../utils/format'
import MenuCard from './MenuCard'
import SectionHeading from './SectionHeading'

export default function MenuSection({ menus, categories, loading, error, onAddToCart }) {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All' ? menus : menus.filter((item) => item.category === activeCategory)

  return (
    <section id="menu-list" className="bg-cream-deep px-6 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[1280px]">
        <SectionHeading eyebrow="Menu Kami" title="Satu Gigitan Manis untuk Setiap Suasana" align="center" />

        {/* Filter di tengah dalam satu baris; di HP bisa digeser ke samping. */}
        <div
          role="tablist"
          aria-label="Filter menu berdasarkan kategori"
          className="-mx-6 mb-10 mt-8 flex gap-2 overflow-x-auto px-6 pb-2 sm:mx-0 sm:justify-center sm:px-0"
        >
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={activeCategory === category}
              onClick={() => setActiveCategory(category)}
              className={`h-11 shrink-0 rounded-full px-5 text-sm font-semibold transition border-2 ${activeCategory === category ? 'border-neutral-dark bg-neutral-dark text-white' : 'border-white bg-transparent text-[#7A6455] hover:bg-white hover:text-neutral-dark'}`}
            >
              {categoryLabel(category)}
            </button>
          ))}
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {loading && <p>Memuat menu...</p>}
          {error && <p>{error}</p>}
          {!loading && !error && filtered.length === 0 && (
            <p className="col-span-full py-16 text-center text-neutral-dark/60">Belum ada menu di kategori ini.</p>
          )}
          {!loading && !error && filtered.map((item) => (
            <MenuCard key={item.id} item={item} onAddToCart={onAddToCart} />
          ))}
        </div>
        <Link to="/promo" className="mx-auto mt-10 flex min-h-11 w-fit items-center gap-2 border-b border-neutral-dark pb-1 font-semibold text-neutral-dark transition hover:border-accent-dark hover:text-accent-dark">Lihat Promo & Voucher Hari Ini <span aria-hidden="true">→</span></Link>
      </div>
    </section>
  )
}
