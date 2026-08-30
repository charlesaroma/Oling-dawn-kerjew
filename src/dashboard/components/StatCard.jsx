export default function StatCard({ title, value, icon: Icon, accent = false }) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border p-5 shadow-elevated transition-all duration-200 hover:-translate-y-0.5 hover:shadow-elevated-lg ${
        accent ? 'border-gold-300 bg-gradient-to-br from-gold-50 to-gold-100/60' : 'border-navy-900/8 bg-white'
      }`}
    >
      <div className="flex items-start justify-between">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-navy-900/50">{title}</p>
        {Icon && (
          <span className={`flex h-8 w-8 items-center justify-center rounded-full ${accent ? 'bg-gold-500/20 text-gold-700' : 'bg-forest-50 text-forest-700'}`}>
            <Icon size={15} strokeWidth={2} />
          </span>
        )}
      </div>
      <p className="mt-3 font-mono text-3xl text-bronze-700">{value}</p>
    </div>
  );
}
