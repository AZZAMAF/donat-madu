import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useShop } from '../context/ShopContext'
import { checkVoucher } from '../utils/order'
import Icon from './Icon'

export default function VoucherInput({ subtotal }) {
  const { voucherCode, setVoucherCode } = useShop()
  const [input, setInput] = useState('')
  const [message, setMessage] = useState('')

  const status = voucherCode ? checkVoucher(voucherCode, subtotal) : null

  const apply = (event) => {
    event.preventDefault()
    if (!input.trim()) return
    const result = checkVoucher(input, subtotal)
    setMessage(result.message)
    if (result.voucher) {
      setVoucherCode(result.voucher.code)
      setInput('')
    }
  }

  return (
    <div>
      {voucherCode ? (
        <div className={`flex items-center justify-between gap-3 rounded-[12px] border px-4 py-3 ${status?.ok ? 'border-[#4E7A3A]/30 bg-[#4E7A3A]/10' : 'border-accent-red/30 bg-accent-red/5'}`}>
          <div className="flex min-w-0 items-center gap-3">
            <Icon name="tag" className={`size-5 shrink-0 ${status?.ok ? 'text-[#4E7A3A]' : 'text-accent-red'}`} />
            <div className="min-w-0">
              <p className="font-semibold text-neutral-dark">{voucherCode}</p>
              <p className={`text-xs ${status?.ok ? 'text-[#4E7A3A]' : 'text-accent-red'}`}>{status?.message}</p>
            </div>
          </div>
          <button type="button" onClick={() => { setVoucherCode(''); setMessage('') }} className="shrink-0 text-sm font-semibold text-neutral-dark/60 hover:text-accent-red">
            Lepas
          </button>
        </div>
      ) : (
        <form onSubmit={apply} className="flex gap-2">
          <label htmlFor="voucher" className="sr-only">Kode voucher</label>
          <input
            id="voucher"
            value={input}
            onChange={(e) => setInput(e.target.value.toUpperCase())}
            placeholder="Masukkan kode voucher"
            className="min-w-0 flex-1 rounded-full border border-neutral-dark/20 bg-white px-4 py-2.5 text-sm uppercase outline-none focus:border-secondary"
          />
          <button type="submit" className="shrink-0 rounded-full bg-neutral-dark px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-dark">
            Pakai
          </button>
        </form>
      )}
      {!voucherCode && message && <p className="mt-2 text-xs text-accent-red">{message}</p>}
      <Link to="/promo" className="mt-2 inline-block text-xs font-semibold text-secondary hover:underline">
        Lihat semua voucher →
      </Link>
    </div>
  )
}
