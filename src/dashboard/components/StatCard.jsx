export default function StatCard({ title, value, caption, icon: Icon, accent = false, tint }) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border p-3.5 shadow-elevated transition-all duration-200 hover:-translate-y-0.5 hover:shadow-elevated-lg ${
        accent ? 'border-gold-300 bg-gradient-to-br from-gold-50 to-gold-100/60' : 'border-navy-900/8 bg-white'
      }`}
    >
      <div className="flex items-center gap-3">
        {Icon && (
          <span
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${accent ? 'bg-gold-500/20 text-gold-700' : !tint ? 'bg-forest-50 text-forest-700' : ''}`}
            style={tint && !accent ? { backgroundColor: `${tint}1F`, color: tint } : undefined}
          >
            <Icon size={16} strokeWidth={2} />
          </span>
        )}
        <div className="min-w-0">
          <p className="truncate font-mono text-[10px] uppercase tracking-[0.2em] text-navy-900/50">{title}</p>
          <p className="font-mono text-xl leading-tight text-bronze-700">{value}</p>
        </div>
      </div>
      {caption && <p className="mt-2 truncate text-xs text-navy-900/50">{caption}</p>}
    </div>
  );
}
