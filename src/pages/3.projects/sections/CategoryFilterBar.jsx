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
              ? 'bg-primary-800 text-white'
              : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
