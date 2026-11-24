import Icon from './Icon'

export default function MenuCard({ item, onAddToCart }) {
  return (
    <article className="overflow-hidden rounded-[16px] border border-neutral-dark/10 bg-white">
      <div className="h-[260px] overflow-hidden bg-gold-pale">
        <img src={item.image} alt={item.name} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>

      <div className="p-6">
        <div className="mb-3 flex items-start justify-between gap-4">
          <h3 className="font-headline text-2xl leading-tight text-neutral-dark">{item.name}</h3>
          <strong className="shrink-0 text-secondary">Rp {item.price.toLocaleString('id-ID')}</strong>
        </div>
        <p className="mb-5 text-sm leading-relaxed text-neutral-dark/65">{item.description}</p>

        <button
          type="button"
          onClick={() => onAddToCart(item)}
          aria-label={`Add ${item.name} to cart`}
          className="grid size-10 place-items-center rounded-full bg-primary text-neutral-dark transition hover:bg-primary-dark"
        >
          <Icon name="plus" className="size-5" />
        </button>
      </div>
    </article>
  )
}
