import { ChevronDown } from 'lucide-react';

const SELECT_CLASSES =
  'w-full appearance-none rounded-full border border-ink-900/10 bg-surface-card py-2.5 pl-5 pr-10 text-sm font-medium text-forest-800 shadow-elevated outline-none transition-colors focus:border-gold-500 focus:ring-4 focus:ring-gold-500/10';

export default function CategoryFilterBar({ categories, active, onChange }) {
  return (
    <div className="relative w-full sm:w-64">
      <select value={active} onChange={(e) => onChange(e.target.value)} className={SELECT_CLASSES}>
        <option value="All">All categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
      <ChevronDown size={16} strokeWidth={2} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-forest-600" />
    </div>
  );
}
