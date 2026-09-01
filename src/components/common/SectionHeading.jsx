export default function SectionHeading({ eyebrow, title, subtitle, align = 'left' }) {
  const alignment = align === 'center' ? 'items-center text-center' : 'items-start text-left';

  return (
    <div className={`flex flex-col gap-3 ${alignment}`}>
      {eyebrow && (
        <span className="flex items-center gap-2 font-mono text-sm uppercase tracking-widest text-gold-700">
          <span className="h-px w-6 bg-gold-500" />
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl font-semibold sm:text-4xl">{title}</h2>
      {subtitle && <p className="max-w-2xl text-ink-900/70">{subtitle}</p>}
    </div>
  );
}
