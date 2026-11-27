import { PROMISES } from '../data/content'
import Icon from './Icon'
import SectionHeading from './SectionHeading'

// Mengikuti Figma: heading di tengah, 3 kartu putih rounded dengan ikon dalam lingkaran kuning pucat.
export default function Promises() {
  return (
    <section id="about" className="bg-bg-cream px-6 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-12">
          <SectionHeading eyebrow={PROMISES.eyebrow} title={PROMISES.title} align="center" />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {PROMISES.items.map((item) => (
            <article
              key={item.title}
              className="rounded-[20px] bg-[#FFFDF8] p-7 shadow-[0_4px_16px_rgba(59,42,30,0.06)] transition hover:-translate-y-1 hover:shadow-[0_10px_24px_rgba(59,42,30,0.1)]"
            >
              <span className="mb-5 grid size-11 place-items-center rounded-full bg-primary/25 text-neutral-dark">
                <Icon name={item.icon} className="size-5" />
              </span>
              <h3 className="mb-3 font-headline text-xl text-neutral-dark">{item.title}</h3>
              <p className="text-sm leading-relaxed text-[#7A6455]">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
