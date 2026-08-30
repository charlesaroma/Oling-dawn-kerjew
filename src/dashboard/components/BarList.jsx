export default function BarList({ data = [], emptyMessage = 'No data yet.' }) {
  if (!data.length) {
    return <p className="text-sm text-navy-900/50">{emptyMessage}</p>;
  }

  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="flex flex-col gap-4">
      {data.map((d) => (
        <div key={d.label} className="flex items-center gap-3">
          <span className="w-36 shrink-0 truncate text-sm text-navy-900/70">{d.label}</span>
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-navy-900/6">
            <div
              className="h-full rounded-full bg-gradient-to-r from-gold-400 to-gold-600 transition-all duration-500"
              style={{ width: `${(d.value / max) * 100}%` }}
            />
          </div>
          <span className="w-8 shrink-0 text-right font-mono text-sm text-bronze-700">{d.value}</span>
        </div>
      ))}
    </div>
  );
}
