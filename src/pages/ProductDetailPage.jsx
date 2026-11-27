import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Icon from '../components/Icon'
import MenuCard from '../components/MenuCard'
import PageShell from '../components/PageShell'
import QuantityCounter from '../components/QuantityCounter'
import { useShop } from '../context/ShopContext'
import { categoryLabel, formatRupiah } from '../utils/format'
import NotFoundPage from './NotFoundPage'

// key={id} membuat state (misal jumlah) mulai dari awal saat pindah ke produk lain.
export default function ProductDetailPage() {
  const { id } = useParams()
  return <ProductDetail key={id} id={id} />
}

function ProductDetail({ id }) {
  const navigate = useNavigate()
  const { products, loading, getProduct, addToCart, isWishlisted, toggleWishlist } = useShop()
  const [qty, setQty] = useState(1)

  if (loading) {
    return <p className="px-6 py-24 text-center text-neutral-dark/60">Memuat produk...</p>
  }

  const product = getProduct(id)
  if (!product) return <NotFoundPage message="Donat yang kamu cari tidak ada atau sudah tidak dijual." />

  const liked = isWishlisted(product.id)
  // Utamakan kategori yang sama, lalu lengkapi dengan menu lain supaya selalu 3 kartu.
  const others = products.filter((p) => p.id !== product.id)
  const related = [
    ...others.filter((p) => p.category === product.category),
    ...others.filter((p) => p.category !== product.category),
  ].slice(0, 3)

  const buyNow = () => {
    addToCart(product, qty)
    navigate('/checkout')
  }

  return (
    <PageShell
      title={product.name}
      eyebrow={categoryLabel(product.category)}
      breadcrumb={[{ label: 'Menu', to: '/#menu-list' }, { label: product.name }]}
    >
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="overflow-hidden rounded-[16px] bg-gold-pale">
          <img src={product.image} alt={product.name} className="aspect-square h-full w-full object-cover" />
        </div>

        <div className="flex flex-col">
          <p className="mb-2 font-headline text-4xl text-accent-dark">{formatRupiah(product.price)}</p>
          <div className="mb-6 flex items-center gap-2 text-sm text-neutral-dark/60">
            <span className="flex gap-0.5 text-primary" aria-hidden="true">
              {Array.from({ length: 5 }, (_, i) => <Icon key={i} name="star" className="size-4 fill-current" />)}
            </span>
            4.9 · Fresh baked setiap pagi
          </div>
          <p className="mb-8 text-lg leading-relaxed text-neutral-dark/75">{product.description}</p>

          <ul className="mb-8 grid gap-3 text-sm text-neutral-dark/70 sm:grid-cols-2">
            {['Madu wildflower murni', 'Tanpa pemanis buatan', 'Brioche fermentasi 24 jam', 'Diantar hangat hari ini'].map((point) => (
              <li key={point} className="flex items-center gap-2">
                <Icon name="check" className="size-4 text-secondary" /> {point}
              </li>
            ))}
          </ul>

          <div className="mb-4 flex flex-wrap items-center gap-4">
            <span className="text-sm font-semibold text-neutral-dark">Jumlah</span>
            <QuantityCounter value={qty} name={product.name} onChange={setQty} />
            <span className="text-sm text-neutral-dark/60">Subtotal {formatRupiah(product.price * qty)}</span>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => addToCart(product, qty)}
              className="inline-flex h-12 items-center gap-2 rounded-full bg-neutral-dark px-7 font-semibold text-white transition hover:bg-choco-dark"
            >
              <Icon name="bag" className="size-5" /> Tambah ke Keranjang
            </button>
            <button
              type="button"
              onClick={buyNow}
              className="inline-flex h-12 items-center rounded-full border border-neutral-dark px-7 font-semibold text-neutral-dark transition hover:bg-neutral-dark hover:text-white"
            >
              Beli Sekarang
            </button>
            <button
              type="button"
              onClick={() => toggleWishlist(product)}
              aria-pressed={liked}
              className={`inline-flex h-12 items-center gap-2 rounded-full border px-5 font-semibold transition ${liked ? 'border-accent-red/40 text-accent-red' : 'border-neutral-dark/30 text-neutral-dark hover:bg-neutral-dark/5'}`}
            >
              <Icon name="heart" className={`size-5 ${liked ? 'fill-current' : ''}`} />
              {liked ? 'Di Wishlist' : 'Wishlist'}
            </button>
          </div>

          <Link to="/promo" className="mt-8 flex items-center gap-3 rounded-[12px] bg-primary/15 px-4 py-3 text-sm text-neutral-dark transition hover:bg-primary/25">
            <Icon name="tag" className="size-5 text-accent-dark" />
            Ada voucher diskon sampai 20%. <span className="font-semibold">Lihat promo →</span>
          </Link>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="mb-6 font-headline text-3xl text-neutral-dark">Mungkin Kamu Juga Suka</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {related.map((item) => <MenuCard key={item.id} item={item} onAddToCart={addToCart} />)}
          </div>
        </section>
      )}
    </PageShell>
  )
}
