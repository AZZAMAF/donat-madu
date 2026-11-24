import donatHero from '../../assets/donat-hero.png'
import { SIGNATURES } from '../data/content'
import Icon from './Icon'
import SectionHeading from './SectionHeading'

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
                src={donatHero}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="absolute -bottom-16 left-1/2 w-[145%] max-w-none -translate-x-1/2 transition-transform duration-500 group-hover:scale-105"
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
