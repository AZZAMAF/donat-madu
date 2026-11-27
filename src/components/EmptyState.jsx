import { Link } from 'react-router-dom'
import Icon from './Icon'

export default function EmptyState({ icon = 'bag', title, description, actionLabel = 'Lihat Menu', actionTo = '/#menu-list' }) {
  return (
    <div className="flex w-full flex-col items-center rounded-[20px] border border-neutral-dark/10 bg-[#FFFDF8] px-6 py-16 text-center">
      <span className="mb-5 grid size-14 place-items-center rounded-full bg-cream-deep text-neutral-dark">
        <Icon name={icon} className="size-6" />
      </span>
      <h2 className="mb-2 font-headline text-2xl text-neutral-dark">{title}</h2>
      {description && <p className="mb-6 max-w-sm text-sm leading-relaxed text-[#7A6455]">{description}</p>}
      {actionLabel && (
        <Link to={actionTo} className="rounded-full bg-neutral-dark px-6 py-3 text-sm font-semibold text-white transition hover:bg-choco-dark">
          {actionLabel}
        </Link>
      )}
    </div>
  )
}
