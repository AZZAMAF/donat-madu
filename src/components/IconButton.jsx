import Icon from './Icon'

export default function IconButton({ label, icon, badge }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="relative grid size-10 place-items-center rounded-full text-neutral-dark transition hover:bg-neutral-dark/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-dark"
    >
      <Icon name={icon} className="size-[22px]" />
      {badge && (
        <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-accent-red text-[10px] font-bold text-white">
          {badge}
        </span>
      )}
    </button>
  )
}
