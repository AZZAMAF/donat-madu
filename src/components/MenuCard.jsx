import { Link } from 'react-router-dom'
import { useShop } from '../context/ShopContext'
import { formatRupiah } from '../utils/format'
import Icon from './Icon'

export default function MenuCard({ item, onAddToCart }) {
  const { isWishlisted, toggleWishlist } = useShop()
  const liked = isWishlisted(item.id)

  return (
    <article className="group overflow-hidden rounded-[16px] border border-neutral-dark/10 bg-white">
      <div className="relative h-[260px] overflow-hidden bg-gold-pale">
        <Link to={`/menu/${item.id}`} aria-label={`Lihat detail ${item.name}`}>
          <img src={item.image} alt={item.name} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        </Link>
        <button
          type="button"
          onClick={() => toggleWishlist(item)}
          aria-pressed={liked}
          aria-label={liked ? `Hapus ${item.name} dari wishlist` : `Simpan ${item.name} ke wishlist`}
          className={`absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-white/90 shadow-sm transition hover:scale-105 ${liked ? 'text-accent-red' : 'text-neutral-dark'}`}
        >
          <Icon name="heart" className={`size-5 ${liked ? 'fill-current' : ''}`} />
        </button>
      </div>

      <div className="p-6">
        <div className="mb-3 flex items-start justify-between gap-4">
          <h3 className="font-headline text-2xl leading-tight text-neutral-dark">
            <Link to={`/menu/${item.id}`} className="transition hover:text-secondary">{item.name}</Link>
          </h3>
          <strong className="shrink-0 text-secondary">{formatRupiah(item.price)}</strong>
        </div>
        <p className="mb-5 text-sm leading-relaxed text-neutral-dark/65">{item.description}</p>

        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => onAddToCart(item)}
            aria-label={`Tambah ${item.name} ke keranjang`}
            className="grid size-10 place-items-center rounded-full bg-primary text-neutral-dark transition hover:bg-primary-dark"
          >
            <Icon name="plus" className="size-5" />
          </button>
          <Link to={`/menu/${item.id}`} className="text-sm font-semibold text-neutral-dark/70 transition hover:text-secondary">
            Lihat detail →
          </Link>
        </div>
      </div>
    </article>
  )
}
