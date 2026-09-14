import Container from './Container';

/* Every page opens on this dark band. It clears the fixed navbar, gives the
   bar something to ride transparently over, and sets the same editorial
   register as the homepage hero. An optional `image` turns the band into a
   full-bleed photo header — the gradient wash keeps the title/subtitle
   legible over whatever's underneath. Omit `image` and this renders exactly
   as before. */
const DEFAULT_TITLE_CLASSES =
  'max-w-[16ch] font-display text-[clamp(2.2rem,5.4vw,4rem)] font-medium leading-[0.98] tracking-[-0.02em] text-surface text-balance';

export default function PageHeader({
  eyebrow,
  title,
  subtitle,
  image,
  imageAlt,
  containerClassName = '',
  titleClassName,
  children,
}) {
  return (
    <section className="relative overflow-hidden bg-ink-900">
      {image && (
        <>
          <img
            src={image}
            alt={imageAlt || ''}
            aria-hidden={!imageAlt}
            loading="eager"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/75 to-ink-900/35"
          />
        </>
      )}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[8%] -top-[60%] h-[min(60vw,520px)] w-[min(60vw,520px)] rounded-full opacity-70"
        style={{ background: 'radial-gradient(circle, rgba(223,161,38,0.14) 0%, transparent 66%)' }}
      />
      <Container className={`relative pb-16 pt-32 sm:pb-20 sm:pt-40 ${containerClassName}`}>
        {eyebrow && (
          <p className="mb-5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-bronze-400">
            {eyebrow}
          </p>
        )}
        <h1 className={titleClassName || DEFAULT_TITLE_CLASSES}>
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 max-w-[52ch] text-base leading-relaxed text-surface/60">{subtitle}</p>
        )}
        {children}
      </Container>
      <div
        aria-hidden="true"
        className="h-1.5"
        style={{
          background:
            'repeating-linear-gradient(90deg, var(--color-gold-500) 0 28px, var(--color-bronze-600) 28px 56px, var(--color-forest-700) 56px 84px)',
        }}
      />
    </section>
  );
}
