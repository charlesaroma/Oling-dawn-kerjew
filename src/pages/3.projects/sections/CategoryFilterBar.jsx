const BASE = 'rounded-full px-4 py-1.5 text-sm font-medium transition-colors';

export default function CategoryFilterBar({ categories, active, onChange }) {
  return (
    <div className="flex flex-wrap gap-3">
      {['All', ...categories].map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onChange(category)}
          className={`${BASE} ${
            active === category
              ? 'bg-forest-800 text-white'
              : 'bg-forest-50 text-forest-700 hover:bg-forest-100'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
