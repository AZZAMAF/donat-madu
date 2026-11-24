// Controlled stepper: nol state internal, semua perubahan lewat onChange.
const MIN = 1
const MAX = 99

export default function QuantityCounter({ value, onChange, name }) {
  const clamp = (next) => Math.min(MAX, Math.max(MIN, next))

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-neutral-dark/15 px-1 py-1">
      <button
        type="button"
        aria-label={`Kurangi ${name}`}
        disabled={value <= MIN}
        onClick={() => onChange(clamp(value - 1))}
        className="grid size-7 place-items-center rounded-full text-lg font-bold leading-none text-neutral-dark transition hover:bg-neutral-dark/5 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent"
      >
        −
      </button>

      <span className="w-7 text-center text-sm font-semibold tabular-nums text-neutral-dark">{value}</span>

      <button
        type="button"
        aria-label={`Tambah ${name}`}
        disabled={value >= MAX}
        onClick={() => onChange(clamp(value + 1))}
        className="grid size-7 place-items-center rounded-full text-lg font-bold leading-none text-neutral-dark transition hover:bg-neutral-dark/5 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent"
      >
        +
      </button>
    </div>
  )
}
