import { useShop } from '../context/ShopContext'
import Icon from './Icon'

export default function Toast() {
  const { toast } = useShop()
  if (!toast) return null

  return (
    <div role="status" aria-live="polite" className="fixed inset-x-0 bottom-6 z-[60] flex justify-center px-4">
      <div key={toast.id} className="flex items-center gap-3 rounded-full bg-neutral-dark px-5 py-3 text-sm font-semibold text-white shadow-xl">
        <span className="grid size-6 place-items-center rounded-full bg-primary text-neutral-dark">
          <Icon name="check" className="size-4" />
        </span>
        {toast.message}
      </div>
    </div>
  )
}
