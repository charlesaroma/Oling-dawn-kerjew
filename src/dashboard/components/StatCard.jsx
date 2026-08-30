export default function StatCard({ title, value, accent = false }) {
  return (
    <div className={`rounded-lg border p-5 ${accent ? 'border-gold-500 bg-gold-50' : 'border-navy-900/10 bg-white'}`}>
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-navy-900/50">{title}</p>
      <p className="mt-2 font-mono text-3xl text-bronze-700">{value}</p>
    </div>
  );
}
