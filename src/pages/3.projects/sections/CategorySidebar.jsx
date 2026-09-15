export default function CategorySidebar({ categories, active, onChange }) {
  const options = ['All', ...categories];

  return (
    <nav className="flex flex-col gap-1" aria-label="Filter projects by category">
      <p className="mb-2 px-4 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500">Category</p>
      {options.map((cat) => {
        const isActive = active === cat;
        return (
          <button
            key={cat}
            type="button"
            onClick={() => onChange(cat)}
            aria-current={isActive}
            className={`rounded-lg border-l-2 px-4 py-2.5 text-left text-sm transition-colors ${
              isActive
                ? 'border-gold-500 bg-forest-50 font-semibold text-forest-900'
                : 'border-transparent text-ink-600 hover:bg-forest-50/60 hover:text-forest-800'
            }`}
          >
            {cat}
          </button>
        );
      })}
    </nav>
  );
}
