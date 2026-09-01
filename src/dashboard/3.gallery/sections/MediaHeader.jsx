import { Search, Settings, Upload } from 'lucide-react';
import Button from '../../../components/common/Button';

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
  { value: 'name-asc', label: 'Name A–Z' },
  { value: 'name-desc', label: 'Name Z–A' },
  { value: 'largest', label: 'Largest' },
];

export default function MediaHeader({
  count, query, onQueryChange, sort, onSortChange, categories, activeTag, onTagChange, onUpload, onManageCategories,
}) {
  return (
    <header className="mb-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl text-forest-900">Gallery</h1>
          <p className="mt-1 text-sm text-ink-900/60">{count} items</p>
        </div>
        <Button type="button" variant="primary" onClick={onUpload}>
          <Upload size={16} /> Upload Assets
        </Button>
      </div>

      <div className="mb-4 flex flex-wrap gap-3">
        <div className="relative max-w-xs flex-1">
          <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-900/30" />
          <input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search by name or category…"
            className="w-full rounded-xl border border-ink-900/12 bg-white py-2.5 pl-9 pr-3 text-sm outline-none transition-all focus:border-gold-500 focus:ring-4 focus:ring-gold-500/10"
          />
        </div>
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="rounded-xl border border-ink-900/12 bg-white px-3.5 py-2.5 text-sm outline-none transition-all focus:border-gold-500 focus:ring-4 focus:ring-gold-500/10"
        >
          {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => onTagChange('')}
          className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
            !activeTag ? 'bg-gold-500 text-ink-900' : 'bg-white text-ink-900/60 hover:bg-forest-50'
          }`}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => onTagChange(c.name)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold capitalize transition-colors ${
              activeTag === c.name ? 'bg-gold-500 text-ink-900' : 'bg-white text-ink-900/60 hover:bg-forest-50'
            }`}
          >
            {c.name}
          </button>
        ))}
        <button
          type="button"
          onClick={onManageCategories}
          className="flex items-center gap-1.5 rounded-full border border-dashed border-ink-900/15 px-3.5 py-1.5 text-xs font-semibold text-ink-900/50 transition-colors hover:border-ink-900/30 hover:text-ink-900/70"
        >
          <Settings size={12} /> Manage
        </button>
      </div>
    </header>
  );
}
