import { TESTIMONIALS } from '../data/content'
import Icon from './Icon'
import SectionHeading from './SectionHeading'

export default function Testimonials() {
  return (
    <section className="bg-neutral-dark px-6 py-24 text-white sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[1280px]">
        <SectionHeading eyebrow={TESTIMONIALS.eyebrow} title={TESTIMONIALS.title} align="center" light />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.items.map((item) => (
            <blockquote key={item.author} className="flex min-h-[280px] flex-col border-t border-white/20 pt-6">
              <div className="mb-5 flex gap-0.5 text-primary" aria-label="Rated 5 out of 5 stars">
                {Array.from({ length: 5 }, (_, i) => (
                  <Icon key={i} name="star" className="size-4 fill-current" />
                ))}
              </div>
              <p className="mb-8 font-headline text-xl leading-relaxed">“{item.quote}”</p>
              <footer className="mt-auto">
                <strong className="block">{item.author}</strong>
                <span className="text-sm text-white/55">{item.role}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
