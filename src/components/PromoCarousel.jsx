import { useCallback, useEffect, useRef, useState } from 'react'
import Icon from './Icon'

const INTERVAL = 4500 // jeda antar slide (ms)
const DURATION = 1400 // lama animasi geser, sengaja pelan (ms)

// Carousel bergeser dari kanan ke kiri. Slide pertama digandakan di ujung
// supaya setelah slide terakhir tetap masuk dari kanan, bukan mundur ke kiri.
// onCta dipanggil saat tombol slide (atau gambarnya) diklik; ctaLabel mengatur teks tombol.
export default function PromoCarousel({ slides, onCta, ctaLabel = 'Pakai Voucher' }) {
  const [index, setIndex] = useState(0)
  const [animate, setAnimate] = useState(true)
  const [paused, setPaused] = useState(false)
  const busy = useRef(false)
  const track = [...slides, slides[0]]
  const count = slides.length

  const next = useCallback(() => {
    if (busy.current) return
    busy.current = true
    setAnimate(true)
    setIndex((i) => i + 1)
  }, [])

  const prev = () => {
    if (busy.current) return
    busy.current = true
    if (index === 0) {
      // Lompat diam-diam ke salinan di ujung, lalu geser mundur satu.
      setAnimate(false)
      setIndex(count)
      requestAnimationFrame(() => requestAnimationFrame(() => {
        setAnimate(true)
        setIndex(count - 1)
      }))
    } else {
      setAnimate(true)
      setIndex((i) => i - 1)
    }
  }

  const goTo = (target) => {
    if (busy.current || target === index % count) return
    busy.current = true
    setAnimate(true)
    setIndex(target)
  }

  const handleTransitionEnd = () => {
    busy.current = false
    if (index === count) {
      setAnimate(false)
      setIndex(0)
    }
  }

  // Animasi dimatikan lalu dinyalakan lagi setelah lompatan tanpa transisi.
  useEffect(() => {
    if (!animate && index === 0) {
      const id = requestAnimationFrame(() => setAnimate(true))
      return () => cancelAnimationFrame(id)
    }
  }, [animate, index])

  useEffect(() => {
    if (paused) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return
    const timer = setInterval(next, INTERVAL)
    return () => clearInterval(timer)
  }, [paused, next])

  const active = index % count

  // Geser dengan jari di HP (arah kiri = promo berikutnya).
  const touchStart = useRef(null)
  const onTouchStart = (e) => { touchStart.current = e.touches[0].clientX }
  const onTouchEnd = (e) => {
    if (touchStart.current === null) return
    const delta = e.changedTouches[0].clientX - touchStart.current
    touchStart.current = null
    if (delta < -40) next()
    if (delta > 40) prev()
  }

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Promo Madu Donut"
      className="relative overflow-hidden rounded-[20px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div
        className="flex"
        style={{
          transform: `translateX(-${index * 100}%)`,
          transition: animate ? `transform ${DURATION}ms cubic-bezier(0.45, 0, 0.2, 1)` : 'none',
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {track.map((slide, i) => (
          <article
            key={`${slide.code}-${i}`}
            aria-roledescription="slide"
            aria-label={`${(i % count) + 1} dari ${count}`}
            aria-hidden={i !== index}
            className={`grid min-h-[380px] w-full shrink-0 items-center gap-6 px-7 pb-14 pt-10 sm:px-20 md:grid-cols-[1.1fr_0.9fr] ${slide.dark ? 'text-neutral-dark' : 'text-white'}`}
            style={{ backgroundColor: slide.bg }}
          >
            <div>
              <p className={`mb-3 text-xs font-bold uppercase tracking-[0.18em] ${slide.dark ? 'text-neutral-dark/70' : 'text-white/80'}`}>{slide.eyebrow}</p>
              <h2 className="mb-4 font-headline text-3xl leading-[1.05] -tracking-[0.02em] sm:text-5xl">{slide.title}</h2>
              <p className={`mb-6 max-w-md ${slide.dark ? 'text-neutral-dark/75' : 'text-white/85'}`}>{slide.description}</p>
              <div className="flex flex-wrap items-center gap-3">
                <span className={`rounded-full border-2 border-dashed px-4 py-2 font-mono font-bold tracking-wider ${slide.dark ? 'border-neutral-dark/40' : 'border-white/60'}`}>{slide.code}</span>
                <button
                  type="button"
                  tabIndex={i === index ? 0 : -1}
                  onClick={() => onCta(slide)}
                  className={`rounded-full px-6 py-2.5 font-semibold transition ${slide.dark ? 'bg-neutral-dark text-white hover:bg-accent-dark' : 'bg-white text-neutral-dark hover:bg-bg-cream'}`}
                >
                  {ctaLabel}
                </button>
              </div>
            </div>
            <button type="button" tabIndex={-1} aria-hidden="true" onClick={() => onCta(slide)} className="hidden cursor-pointer justify-center md:flex">
              <img src={slide.image} alt="" className="size-64 rounded-full border-8 border-white/30 object-cover shadow-2xl transition duration-500 hover:scale-105 lg:size-72" />
            </button>
          </article>
        ))}
      </div>

      <button type="button" onClick={prev} aria-label="Promo sebelumnya" className="absolute left-3 top-1/2 hidden size-11 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-neutral-dark shadow transition hover:bg-white sm:grid">
        <Icon name="arrowLeft" className="size-5" />
      </button>
      <button type="button" onClick={next} aria-label="Promo berikutnya" className="absolute right-3 top-1/2 hidden size-11 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-neutral-dark shadow transition hover:bg-white sm:grid">
        <Icon name="arrowRight" className="size-5" />
      </button>

      <div className="absolute inset-x-0 bottom-1 flex justify-center">
        {slides.map((slide, i) => (
          <button
            key={slide.code}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Ke promo ${i + 1}`}
            aria-current={active === i}
            className="group grid h-11 place-items-center px-1.5"
          >
            {/* Area klik 44px, titik yang terlihat tetap kecil. */}
            <span className={`block h-2.5 rounded-full transition-all ${active === i ? 'w-8 bg-white' : 'w-2.5 bg-white/50 group-hover:bg-white/80'}`} />
          </button>
        ))}
      </div>
    </section>
  )
}
