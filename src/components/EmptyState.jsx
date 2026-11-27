import { Link } from 'react-router-dom'
import Icon from './Icon'

export default function EmptyState({ icon = 'bag', title, description, actionLabel = 'Lihat Menu', actionTo = '/#menu-list' }) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center rounded-[16px] border border-dashed border-neutral-dark/20 bg-white px-6 py-14 text-center">
      <span className="mb-5 grid size-16 place-items-center rounded-full bg-primary/20 text-accent-dark">
        <Icon name={icon} className="size-8" />
      </span>
      <h2 className="mb-2 font-headline text-2xl text-neutral-dark">{title}</h2>
      {description && <p className="mb-6 text-neutral-dark/65">{description}</p>}
      {actionLabel && (
        <Link to={actionTo} className="rounded-full bg-primary px-6 py-3 font-semibold text-neutral-dark transition hover:bg-primary-dark">
          {actionLabel}
        </Link>
      )}
    </div>
  )
}
