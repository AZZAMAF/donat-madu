export default function SectionHeading({ eyebrow, title, align = 'left', light = false }) {
  return (
    <div className={align === 'center' ? 'text-center' : ''}>
      {eyebrow && (
        <p className={`mb-3 text-xs font-bold uppercase tracking-[0.18em] ${light ? 'text-primary' : 'text-secondary'}`}>
          {eyebrow}
        </p>
      )}
      <h2
        className={`max-w-[780px] font-headline text-4xl leading-[1.05] -tracking-[0.03em] sm:text-5xl ${
          light ? 'text-white' : 'text-neutral-dark'
        } ${align === 'center' ? 'mx-auto' : ''}`}
      >
        {title}
      </h2>
    </div>
  )
}
