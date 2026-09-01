/* Dashboards are scanned, not read — the number is the point, so it gets the
   display face at size while the label stays quiet. State is carried by the
   accent rule at the top rather than a heavy fill. */
export default function StatCard({ title, value, caption, icon: Icon, accent = false, tint }) {
  const rule = accent ? 'var(--color-gold-500)' : tint || 'var(--color-forest-700)';

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-ink-900/8 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-ink-900/16">
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-0.5" style={{ backgroundColor: rule }} />

      <div className="flex items-start justify-between gap-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-500">{title}</p>
        {Icon && (
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink-900/8 text-ink-500 transition-colors duration-200 group-hover:text-forest-700">
            <Icon size={15} strokeWidth={1.6} />
          </span>
        )}
      </div>

      <p className="mt-4 font-display text-[2.15rem] leading-none text-forest-900 tabular-nums">{value}</p>
      {caption && <p className="mt-2.5 truncate text-xs text-ink-500">{caption}</p>}
    </div>
  );
}
