import { useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { uploadFile } from '../../services/uploadMedia';

import { FIELD, LABEL } from './formStyles';

/*
  Real ImageKit upload via the shared uploadMedia util (signed auth →
  browser upload → recorded as a Media row, so it also shows up correctly
  categorized in the dashboard's Media Library). `tag` should match the
  domain's ImageCategory name (e.g. "team", "projects", "blog", "profiles").
*/
export default function ImageUploadField({ label, name, value, onChange, onBlur, error, placeholder, tag }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;

    setUploading(true);
    setUploadError('');
    try {
      const media = await uploadFile(file, { tag });
      onChange(media.url);
    } catch (err) {
      setUploadError(err.response?.data?.message || err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className={LABEL}>{label}</label>
      <div className="flex items-center gap-3">
        <input
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          className={`${FIELD} ${error ? 'border-error' : ''}`}
          placeholder={placeholder}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex shrink-0 items-center gap-1.5 rounded-xl border border-navy-900/12 px-3.5 py-2.5 text-xs font-semibold text-forest-700 transition-colors hover:border-forest-800 hover:bg-forest-50 disabled:opacity-50"
        >
          {uploading ? <Loader2 size={14} className="animate-spin" /> : 'Choose file'}
        </button>
        <input ref={inputRef} type="file" accept="image/png,image/jpeg,image/webp" className="hidden" onChange={handleFile} disabled={uploading} />
      </div>
      {error && <p className="mt-1 text-xs text-error">{error}</p>}
      {uploadError && <p className="mt-1 text-xs text-error">{uploadError}</p>}
      {value && (
        <img
          src={value}
          alt=""
          className="mt-2 h-20 w-20 rounded-xl border border-navy-900/10 bg-forest-50 object-cover shadow-elevated"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
      )}
    </div>
  );
}
