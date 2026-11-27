const COLORS = {
  'Menunggu Konfirmasi': 'bg-primary/20 text-accent-dark',
  Diproses: 'bg-[#5C7181]/15 text-[#3F5363]',
  Dikirim: 'bg-[#2F6FB0]/15 text-[#245A90]',
  Selesai: 'bg-[#4E7A3A]/15 text-[#3D6230]',
  Dibatalkan: 'bg-accent-red/10 text-accent-red',
}

export default function StatusBadge({ status }) {
  return (
    <span className={`inline-flex whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${COLORS[status] ?? 'bg-neutral-dark/10'}`}>
      {status}
    </span>
  )
}
