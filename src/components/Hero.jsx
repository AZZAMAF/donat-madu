import curve from '../../assets/curve.svg'
import donatHero from '../../assets/donat-hero.png'
import { HERO } from '../data/content'

export default function Hero() {
  return (
    <>
      <section id="top" className="relative isolate flex min-h-[620px] flex-col items-center overflow-hidden bg-bg-cream px-6 pt-14 text-center max-[700px]:min-h-[540px] max-[420px]:px-4 max-[420px]:pt-6">
        <div className="relative z-20 mx-auto flex w-full max-w-3xl flex-col items-center pb-[18rem] max-[700px]:pb-44">
          <h1 className="mb-5 max-w-[860px] font-headline text-4xl font-normal leading-[1.02] -tracking-[0.03em] text-neutral-dark sm:text-5xl md:text-6xl">
            {HERO.headline[0]}<br className="hidden sm:block" /> {HERO.headline[1]}
          </h1>
          <p className="mb-6 max-w-[34rem] text-base leading-relaxed text-neutral-dark/70 sm:text-lg">
            {HERO.subheadline}
          </p>
          <div className="mb-7 flex flex-wrap items-center justify-center gap-3">
            <a href={HERO.primaryCta.href} className="inline-flex h-12 items-center rounded-full bg-primary px-7 font-semibold text-neutral-dark transition hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-dark">{HERO.primaryCta.label}</a>
            <a href={HERO.secondaryCta.href} className="inline-flex h-12 items-center rounded-full border border-neutral-dark/50 px-7 font-semibold text-neutral-dark transition hover:bg-neutral-dark/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-dark">{HERO.secondaryCta.label}</a>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs font-medium text-neutral-dark/60 sm:text-sm">
            <span className="text-primary" aria-hidden="true">★</span>
            <span>{HERO.rating}</span>
            <span className="text-neutral-dark/30" aria-hidden="true">•</span>
            <span>{HERO.deliveryNote}</span>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 mx-auto aspect-[1280/560] w-[min(100%,1280px)]">
          <img src={curve} alt="" aria-hidden="true" className="absolute bottom-[-28vw] left-[55%] z-0 h-auto w-[110vw] max-w-none -translate-x-1/2 rotate-[-4deg] select-none" />
          <img src={donatHero} alt="Aneka donat madu di atas taplak kotak-kotak merah" className="absolute bottom-0 left-1/2 h-auto w-[44%] -translate-x-1/2 select-none max-[700px]:w-[90%]" />
        </div>
      </section>
      <div aria-hidden="true" className="h-[174px] w-full bg-[url('../assets/checker-tile.svg')] bg-[length:230px_174px] bg-center bg-repeat-x max-[700px]:h-[130px] max-[700px]:bg-[length:172px_130px]" />
    </>
  )
}
