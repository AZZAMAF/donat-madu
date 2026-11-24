import { PROMISES } from '../data/content'
import Icon from './Icon'
import SectionHeading from './SectionHeading'

export default function Promises() {
  return (
    <section id="about" className="bg-bg-cream px-6 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-14 max-w-2xl">
          <SectionHeading eyebrow={PROMISES.eyebrow} title={PROMISES.title} />
        </div>

        {/* Satu border-top per kartu, bukan divide dua arah yang bikin garis ganda. */}
        <div className="grid gap-8 md:grid-cols-3 md:gap-0">
          {PROMISES.items.map((item) => (
            <article key={item.title} className="border-t border-neutral-dark/15 pt-6 md:pr-8 md:last:pr-0">
              <Icon name={item.icon} className="mb-5 size-8 text-secondary" />
              <h3 className="mb-3 font-headline text-2xl text-neutral-dark">{item.title}</h3>
              <p className="max-w-sm leading-relaxed text-neutral-dark/65">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
