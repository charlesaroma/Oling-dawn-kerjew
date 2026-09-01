export default function SectionHeading({ eyebrow, title, subtitle, align = 'left', tone = 'light' }) {
  const alignment = align === 'center' ? 'items-center text-center' : 'items-start text-left';
  const dark = tone === 'dark';

  return (
    <div className={`flex flex-col ${alignment}`}>
      {eyebrow && (
        <span className={`flex items-center gap-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] ${dark ? 'text-bronze-400' : 'text-bronze-600'}`}>
          <span className={`h-px w-7 ${dark ? 'bg-bronze-400/50' : 'bg-bronze-600/40'}`} />
          {eyebrow}
        </span>
      )}
      <h2 className={`mt-4 max-w-[18ch] font-display text-[clamp(1.9rem,3.6vw,2.9rem)] font-normal leading-[1.04] tracking-[-0.02em] text-balance ${dark ? 'text-surface' : 'text-forest-900'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 max-w-[48ch] leading-relaxed ${dark ? 'text-surface/60' : 'text-ink-600'}`}>{subtitle}</p>
      )}
    </div>
  );
}
