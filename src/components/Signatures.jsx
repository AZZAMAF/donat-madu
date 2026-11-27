import berry from '../../assets/signatures/berry.png'
import choco from '../../assets/signatures/choco.png'
import golden from '../../assets/signatures/golden.png'
import matcha from '../../assets/signatures/matcha.png'
import swirl from '../../assets/signatures/swirl.png'
import { SIGNATURES } from '../data/content'
import Icon from './Icon'
import SectionHeading from './SectionHeading'

// Gambar donat per kartu (dari desain Figma), urut sesuai nomor 01-04.
const IMAGES = { '01': berry, '02': golden, '03': matcha, '04': choco }

export default function Signatures() {
  return (
    <section id="menu" className="bg-cream-deep px-6 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-12 grid items-end gap-6 md:grid-cols-[1fr_0.75fr]">
          <div>
            <SectionHeading eyebrow={SIGNATURES.eyebrow} title={SIGNATURES.title} />
            <p className="mt-4 max-w-md text-neutral-dark/65">{SIGNATURES.description}</p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {SIGNATURES.items.map((item) => (
            <article
              key={item.number}
              className="group relative min-h-[390px] overflow-hidden rounded-[16px]"
              style={{ backgroundColor: item.accent }}
            >
              <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5 text-white/90">
                <span className="font-headline text-xl">{item.number}</span>
                <Icon name="arrowUpRight" className="size-6 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              </div>

              <img
                src={swirl}
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute -right-8 -top-16 h-[95%] w-auto opacity-30 select-none"
              />
              <img
                src={IMAGES[item.number]}
                alt={item.title}
                loading="lazy"
                className="absolute left-1/2 top-[42%] w-[68%] max-w-[230px] -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_18px_24px_rgba(0,0,0,0.25)] transition-transform duration-700 group-hover:rotate-[18deg] group-hover:scale-105"
              />

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-neutral-dark/90 via-neutral-dark/35 to-transparent px-5 pb-5 pt-24 text-white">
                <h3 className="font-headline text-2xl leading-tight">{item.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
