import { useRef, useState } from 'react';

import { FIELD, LABEL } from './formStyles';

/*
  Real uploads to ImageKit require a server-generated signature (HMAC with
  the private key) — impossible from the browser alone, and there's no
  backend yet. So this picks a local file, shows a preview, and auto-fills
  a suggested ImageKit path staff can adjust — once a signing endpoint
  exists, wire the actual upload() call in here and nothing else changes.
*/
export default function ImageUploadField({ label, name, value, onChange, onBlur, error, placeholder }) {
  const inputRef = useRef(null);
  const [preview, setPreview] = useState(null);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    const suggested = `/${file.name.replace(/\s+/g, '-').toLowerCase()}`;
    onChange(suggested);
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
          className="shrink-0 rounded-xl border border-navy-900/12 px-3.5 py-2.5 text-xs font-semibold text-forest-700 transition-colors hover:border-forest-800 hover:bg-forest-50"
        >
          Choose file
        </button>
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      </div>
      {error && <p className="mt-1 text-xs text-error">{error}</p>}
      {(preview || value) && (
        <img
          src={preview || value}
          alt=""
          className="mt-2 h-20 w-20 rounded-xl border border-navy-900/10 bg-forest-50 object-cover shadow-elevated"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
      )}
      <p className="mt-1 text-[11px] text-navy-900/40">
        Uploading to ImageKit needs a backend signing step (coming later). For now, choose a file to preview and auto-fill a path, or paste a path/URL directly.
      </p>
    </div>
  );
}
