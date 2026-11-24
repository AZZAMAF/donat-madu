import { useState } from 'react'
import Icon from './Icon'
import SectionHeading from './SectionHeading'

export default function MenuSection({ menus, categories, loading, error }) {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All' ? menus : menus.filter((item) => item.category === activeCategory)

  return (
    <section id="menu-list" className="bg-cream-deep px-6 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading title="A Golden Bite for Every Mood" />
          <div role="tablist" aria-label="Filter menu by category" className="flex max-w-full flex-wrap gap-2 pb-1">
            {categories.map((category) => (
              <button key={category} type="button" role="tab" aria-selected={activeCategory === category} onClick={() => setActiveCategory(category)} className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${activeCategory === category ? 'bg-neutral-dark text-white' : 'border border-neutral-dark/20 text-neutral-dark hover:border-neutral-dark/50'}`}>{category}</button>
            ))}
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {loading && <p>Memuat menu...</p>}
          {error && <p>{error}</p>}
          {!loading && !error && filtered.length === 0 && (
            <p className="col-span-full py-16 text-center text-neutral-dark/60">Belum ada menu di kategori ini.</p>
          )}
          {!loading && !error && filtered.map((item) => (
            <article key={item.id} className="overflow-hidden rounded-[16px] border border-neutral-dark/10 bg-white">
              <div className="h-[260px] overflow-hidden bg-gold-pale">
                <img src={item.image} alt={item.name} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <div className="mb-3 flex items-start justify-between gap-4"><h3 className="font-headline text-2xl leading-tight text-neutral-dark">{item.name}</h3><strong className="shrink-0 text-secondary">Rp {item.price.toLocaleString('id-ID')}</strong></div>
                <p className="mb-5 text-sm leading-relaxed text-neutral-dark/65">{item.description}</p>
                <button type="button" className="grid size-10 place-items-center rounded-full bg-primary text-neutral-dark transition hover:bg-primary-dark" aria-label={`Add ${item.name} to cart`}><Icon name="plus" className="size-5" /></button>
              </div>
            </article>
          ))}
        </div>
        <a href="#menu-list" className="mx-auto mt-10 flex w-fit items-center gap-2 border-b border-neutral-dark pb-1 font-semibold text-neutral-dark">Explore Full Menu (18 Flavors) <span aria-hidden="true">→</span></a>
      </div>
    </section>
  )
}
