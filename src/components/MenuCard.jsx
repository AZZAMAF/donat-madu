import { Link } from 'react-router-dom'
import { useShop } from '../context/ShopContext'
import { formatRupiah } from '../utils/format'
import Icon from './Icon'

export default function MenuCard({ item, onAddToCart }) {
  const { isWishlisted, toggleWishlist } = useShop()
  const liked = isWishlisted(item.id)

  return (
    <article className="group flex flex-col overflow-hidden rounded-[20px] bg-[#FFFDF8] shadow-[0_4px_8px_rgba(59,42,30,0.06)] transition hover:shadow-[0_12px_28px_rgba(59,42,30,0.12)]">
      <div className="relative h-[260px] overflow-hidden bg-gold-pale">
        <Link to={`/menu/${item.id}`} aria-label={`Lihat detail ${item.name}`}>
          <img src={item.image} alt={item.name} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        </Link>
        <button
          type="button"
          onClick={() => toggleWishlist(item)}
          aria-pressed={liked}
          aria-label={liked ? `Hapus ${item.name} dari wishlist` : `Simpan ${item.name} ke wishlist`}
          className={`absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-white shadow-md transition hover:scale-110 ${liked ? 'text-accent-red' : 'text-neutral-dark hover:text-accent-red'}`}
        >
          <Icon name="heart" className={`size-5 ${liked ? 'fill-current' : ''}`} />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-start justify-between gap-4">
          <h3 className="font-headline text-2xl leading-tight text-neutral-dark">
            <Link to={`/menu/${item.id}`} className="transition hover:text-secondary">{item.name}</Link>
          </h3>
          <strong className="shrink-0 text-lg font-bold text-neutral-dark">{formatRupiah(item.price)}</strong>
        </div>
        <p className="mb-5 text-sm leading-relaxed text-[#7A6455]">{item.description}</p>

        <div className="mt-auto flex items-center justify-between gap-3">
          <Link to={`/menu/${item.id}`} className="rounded-full border border-neutral-dark/15 px-4 py-2 text-sm font-semibold text-neutral-dark transition hover:border-primary hover:bg-primary/15">
            Lihat detail →
          </Link>
          <button
            type="button"
            onClick={() => onAddToCart(item)}
            aria-label={`Tambah ${item.name} ke keranjang`}
            className="grid size-11 place-items-center rounded-full bg-primary text-neutral-dark shadow-[0_4px_12px_rgba(242,168,29,0.4)] transition hover:scale-105 hover:bg-primary-dark"
          >
            <Icon name="plus" className="size-5" />
          </button>
        </div>
      </div>
    </article>
  )
}
