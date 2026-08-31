export default function ResultGroup({ title, items, renderRow }) {
  if (!items.length) return null;
  return (
    <section>
      <h2 className="mb-3 font-display text-lg text-forest-900">{title} ({items.length})</h2>
      <ul className="divide-y divide-navy-900/6 rounded-2xl border border-navy-900/8 bg-white shadow-elevated">
        {items.map((item) => (
          <li key={item.id} className="px-4 py-3 text-sm">
            {renderRow(item)}
          </li>
        ))}
      </ul>
    </section>
  );
}
