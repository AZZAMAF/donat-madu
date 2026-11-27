import { Link } from 'react-router-dom'
import berry from '../../assets/signatures/berry.png'
import choco from '../../assets/signatures/choco.png'
import golden from '../../assets/signatures/golden.png'
import matcha from '../../assets/signatures/matcha.png'
import swirl from '../../assets/signatures/swirl.png'
import { SIGNATURES } from '../data/content'
import SectionHeading from './SectionHeading'

// Gambar donat per kartu (dari desain Figma), urut sesuai nomor 01-04.
const IMAGES = { '01': berry, '02': golden, '03': matcha, '04': choco }

// Layout mengikuti Figma "Section 2: Best Sellers": judul di tengah, 4 kartu warna
// dengan badge nomor, teks di atas, donat di bawah, dan ornamen swirl transparan.
export default function Signatures() {
  return (
    <section id="menu" className="bg-cream-deep px-6 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-14 flex flex-col items-center">
          <SectionHeading eyebrow={SIGNATURES.eyebrow} title={SIGNATURES.title} align="center" />
          <p className="mt-4 max-w-[560px] text-center text-neutral-dark/65">{SIGNATURES.description}</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SIGNATURES.items.map((item) => {
            const to = item.productId ? `/menu/${item.productId}` : '/#menu-list'
            return (
              <Link
                key={item.number}
                data-reveal
                to={to}
                aria-label={`${item.title}, lihat donat`}
                className="group relative isolate flex min-h-[457px] flex-col overflow-hidden rounded-[30px] p-6 shadow-[0_8px_12px_-2px_rgba(0,0,0,0.1),0_3px_5px_-3px_rgba(0,0,0,0.1)] transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                style={{ backgroundColor: item.accent }}
              >
                <img
                  src={swirl}
                  alt=""
                  aria-hidden="true"
                  className="pointer-events-none absolute -left-24 -top-6 -z-10 h-[475px] w-auto max-w-none mix-blend-overlay select-none"
                />

                <span className="mb-[18px] grid size-[37px] place-items-center rounded-full bg-[#FFF9F7] text-[15px] font-bold tracking-[0.5px] text-[#333]">
                  {item.number}
                </span>
                <h3 className={`mb-[18px] text-lg font-bold uppercase leading-[23px] ${item.dark ? 'text-[#1E1E1E]' : 'text-white'}`}>
                  {item.title}
                </h3>
                <p className={`text-[13px] leading-[19px] opacity-80 ${item.dark ? 'text-[#1E1E1E]' : 'text-[#FDF8F2]'}`}>{item.description}</p>

                <img
                  src={IMAGES[item.number]}
                  alt={item.title}
                  loading="lazy"
                  className="mx-auto mt-auto w-[94%] max-w-[230px] pt-6 transition-transform duration-700 group-hover:rotate-[18deg] group-hover:scale-105"
                />
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
