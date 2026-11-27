import { TESTIMONIALS } from '../data/content'
import Icon from './Icon'
import SectionHeading from './SectionHeading'

// Mengikuti Figma: latar cream, 3 kartu putih rounded, bintang oranye, kutipan, lalu nama & peran.
export default function Testimonials() {
  return (
    <section className="bg-bg-cream px-6 py-24 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[1100px]">
        <SectionHeading eyebrow={TESTIMONIALS.eyebrow} title={TESTIMONIALS.title} align="center" />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.items.map((item) => (
            <blockquote
              key={item.author}
              className="flex flex-col rounded-[20px] bg-[#FFFDF8] p-7 shadow-[0_4px_16px_rgba(59,42,30,0.06)]"
            >
              <div className="mb-4 flex gap-0.5 text-secondary" aria-label="Rating 5 dari 5 bintang">
                {Array.from({ length: 5 }, (_, i) => (
                  <Icon key={i} name="star" className="size-4 fill-current" />
                ))}
              </div>
              <p className="mb-6 text-[15px] italic leading-relaxed text-neutral-dark/85">“{item.quote}”</p>
              <footer className="mt-auto">
                <strong className="block text-neutral-dark">{item.author}</strong>
                <span className="text-sm text-[#7A6455]">{item.role}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
