import Container from './Container';

/* Every page opens on this dark band. It clears the fixed navbar, gives the
   bar something to ride transparently over, and sets the same editorial
   register as the homepage hero. */
export default function PageHeader({ eyebrow, title, subtitle }) {
  return (
    <section className="relative overflow-hidden bg-ink-900">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[8%] -top-[60%] h-[min(60vw,520px)] w-[min(60vw,520px)] rounded-full opacity-70"
        style={{ background: 'radial-gradient(circle, rgba(223,161,38,0.14) 0%, transparent 66%)' }}
      />
      <Container className="relative pb-16 pt-32 sm:pb-20 sm:pt-40">
        {eyebrow && (
          <p className="mb-5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-bronze-400">
            {eyebrow}
          </p>
        )}
        <h1 className="max-w-[16ch] font-display text-[clamp(2.2rem,5.4vw,4rem)] font-normal leading-[0.98] tracking-[-0.02em] text-surface text-balance">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 max-w-[52ch] text-base leading-relaxed text-surface/60">{subtitle}</p>
        )}
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
