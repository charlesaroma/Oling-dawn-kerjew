import { useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { uploadFile } from '../../services/uploadMedia';

export default function MediaListField({ label, items = [], onChange, tag }) {
  const [path, setPath] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const inputRef = useRef(null);

  const add = () => {
    if (!path.trim()) return;
    onChange([...items, path.trim()]);
    setPath('');
  };

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;

    setUploading(true);
    setUploadError('');
    try {
      const media = await uploadFile(file, { tag });
      onChange([...items, media.url]);
    } catch (err) {
      setUploadError(err.response?.data?.message || err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      {label && <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-900/60">{label}</label>}
      <div className="mb-3 flex gap-2">
        <input
          value={path}
          onChange={(e) => setPath(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); add(); } }}
          placeholder="Paste a URL…"
          className="flex-1 rounded-xl border border-ink-900/12 bg-white px-3.5 py-2.5 text-sm outline-none transition-all focus:border-gold-500 focus:ring-4 focus:ring-gold-500/10"
        />
        <button
          type="button"
          onClick={add}
          className="rounded-xl border border-forest-800 px-4 text-xs font-semibold uppercase tracking-widest text-forest-800 transition-all hover:bg-forest-800 hover:text-white hover:shadow-elevated"
        >
          Add
        </button>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex shrink-0 items-center gap-1.5 rounded-xl border border-ink-900/12 px-3.5 text-xs font-semibold text-forest-700 transition-colors hover:border-forest-800 hover:bg-forest-50 disabled:opacity-50"
        >
          {uploading ? <Loader2 size={14} className="animate-spin" /> : 'Upload'}
        </button>
        <input ref={inputRef} type="file" accept="image/png,image/jpeg,image/webp" className="hidden" onChange={handleFile} disabled={uploading} />
      </div>
      {uploadError && <p className="mb-3 text-xs text-error">{uploadError}</p>}

      {items.length > 0 && (
        <div className="grid grid-cols-4 gap-2">
          {items.map((src, i) => (
            <div key={src + i} className="group relative overflow-hidden rounded-xl border border-ink-900/10 shadow-elevated transition-transform hover:-translate-y-0.5">
              <img
                src={src}
                alt=""
                className="aspect-square w-full bg-forest-50 object-cover"
                onError={(e) => { e.currentTarget.style.opacity = '0.3'; }}
              />
              <button
                type="button"
                onClick={() => onChange(items.filter((_, idx) => idx !== i))}
                className="absolute right-1 top-1 hidden h-6 w-6 items-center justify-center rounded-full bg-ink-900/80 text-xs text-white group-hover:flex"
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
