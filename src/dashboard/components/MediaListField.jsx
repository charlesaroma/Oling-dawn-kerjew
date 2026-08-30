import { useState } from 'react';

export default function MediaListField({ label, items = [], onChange }) {
  const [path, setPath] = useState('');

  const add = () => {
    if (!path.trim()) return;
    onChange([...items, path.trim()]);
    setPath('');
  };

  return (
    <div>
      {label && <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-navy-900/60">{label}</label>}
      <div className="mb-3 flex gap-2">
        <input
          value={path}
          onChange={(e) => setPath(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); add(); } }}
          placeholder="/projects/slug/photo.jpg"
          className="flex-1 rounded-xl border border-navy-900/12 bg-white px-3.5 py-2.5 text-sm outline-none transition-all focus:border-gold-500 focus:ring-4 focus:ring-gold-500/10"
        />
        <button
          type="button"
          onClick={add}
          className="rounded-xl border border-forest-800 px-4 text-xs font-semibold uppercase tracking-widest text-forest-800 transition-all hover:bg-forest-800 hover:text-white hover:shadow-elevated"
        >
          Add
        </button>
      </div>

      {items.length > 0 && (
        <div className="grid grid-cols-4 gap-2">
          {items.map((src, i) => (
            <div key={src + i} className="group relative overflow-hidden rounded-xl border border-navy-900/10 shadow-elevated transition-transform hover:-translate-y-0.5">
              <img
                src={src}
                alt=""
                className="aspect-square w-full bg-forest-50 object-cover"
                onError={(e) => { e.currentTarget.style.opacity = '0.3'; }}
              />
              <button
                type="button"
                onClick={() => onChange(items.filter((_, idx) => idx !== i))}
                className="absolute right-1 top-1 hidden h-6 w-6 items-center justify-center rounded-full bg-navy-900/80 text-xs text-white group-hover:flex"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
