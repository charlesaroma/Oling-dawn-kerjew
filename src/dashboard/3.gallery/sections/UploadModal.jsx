import { useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { X, Upload as UploadIcon, Minus, Loader2, AlertCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import Button from '../../../components/common/Button';
import { uploadFile } from '../../../services/uploadMedia';
import { useImageCategories } from '../../../services/imageCategoryQueries';
import { useUpload } from '../contexts/useUpload';
import { useToast } from '../../../context/useToast';

const BATCH_SIZE = 3;
const MAX_BYTES = 25 * 1024 * 1024;

async function uploadOne(file, idx, tag, setProgress) {
  await uploadFile(file, {
    tag,
    onProgress: (pct) => setProgress((prev) => ({ ...prev, [idx]: pct })),
  });
}

export default function UploadModal() {
  const { isOpen, isMinimised, closeModal, minimise } = useUpload();
  const { data: categories = [] } = useImageCategories();
  const queryClient = useQueryClient();
  const { addToast } = useToast();
  const inputRef = useRef(null);

  const [files, setFiles] = useState([]);
  const [tag, setTag] = useState('');
  const [progress, setProgress] = useState({});
  const [errors, setErrors] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [done, setDone] = useState(false);

  if (!isOpen || isMinimised) return null;

  const activeTag = tag || categories[0]?.name || 'gallery';

  const handleFiles = (e) => {
    const picked = Array.from(e.target.files || []);
    const existingNames = new Set(files.map((f) => f.name));
    const next = picked.filter((f) => !existingNames.has(f.name));
    setFiles((prev) => [...prev, ...next]);
    e.target.value = '';
  };

  const removeFile = (idx) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  const reset = () => {
    setFiles([]);
    setProgress({});
    setErrors([]);
    setUploading(false);
    setDone(false);
  };

  const handleClose = () => {
    reset();
    closeModal();
  };

  const handleUpload = async () => {
    setUploading(true);
    setErrors([]);
    const newErrors = [];

    for (let i = 0; i < files.length; i += BATCH_SIZE) {
      const batch = files.slice(i, i + BATCH_SIZE);
      const results = await Promise.allSettled(
        batch.map((file, j) => {
          const idx = i + j;
          if (file.size > MAX_BYTES) {
            setProgress((prev) => ({ ...prev, [idx]: -1 }));
            return Promise.reject(new Error(`${file.name}: exceeds the 25MB limit`));
          }
          return uploadOne(file, idx, activeTag, setProgress);
        }),
      );
      results.forEach((result, j) => {
        const idx = i + j;
        if (result.status === 'rejected') {
          setProgress((prev) => ({ ...prev, [idx]: -1 }));
          newErrors.push(`${batch[j].name}: ${result.reason?.message || 'upload failed'}`);
        }
      });
    }

    setUploading(false);
    setDone(true);
    setErrors(newErrors);
    queryClient.invalidateQueries({ queryKey: ['media'] });

    if (newErrors.length === 0) {
      addToast(`${files.length} file${files.length === 1 ? '' : 's'} uploaded successfully`, 'success');
    } else if (newErrors.length === files.length) {
      addToast('Upload failed', 'error');
    } else {
      addToast(`${files.length - newErrors.length} of ${files.length} files uploaded`, 'warning');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={!uploading ? handleClose : undefined}
          className="fixed inset-0 bg-navy-900/50 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.15 }}
          className="relative flex max-h-[85dvh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-navy-900/8 bg-white shadow-elevated-lg"
        >
          <div className="flex flex-none items-center justify-between gap-4 border-b border-navy-900/8 px-6 py-5">
            <h3 className="font-display text-xl text-forest-900">Upload Media</h3>
            <div className="flex items-center gap-1">
              {uploading && (
                <button
                  type="button"
                  onClick={minimise}
                  aria-label="Minimise"
                  className="rounded-full p-2 text-navy-900/50 transition-colors hover:bg-forest-50 hover:text-forest-800"
                >
                  <Minus size={18} />
                </button>
              )}
              <button
                type="button"
                onClick={handleClose}
                disabled={uploading}
                aria-label="Close"
                className="rounded-full p-2 text-navy-900/50 transition-colors hover:bg-forest-50 hover:text-forest-800 disabled:opacity-40"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6">
            <div className="mb-5">
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-navy-900/60">Category</label>
              <select
                value={activeTag}
                onChange={(e) => setTag(e.target.value)}
                disabled={uploading}
                className="w-full rounded-xl border border-navy-900/12 bg-white px-3.5 py-2.5 text-sm outline-none transition-all focus:border-gold-500 focus:ring-4 focus:ring-gold-500/10"
              >
                {categories.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
              </select>
            </div>

            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="relative flex w-full flex-col items-center gap-2 rounded-2xl border-2 border-dashed border-navy-900/15 bg-forest-50/30 px-6 py-10 text-center transition-colors hover:border-gold-400 disabled:opacity-50"
            >
              <UploadIcon size={22} className="text-forest-700" />
              <span className="text-sm font-semibold text-forest-900">Click to upload</span>
              <span className="text-xs text-navy-900/50">PNG, JPEG, or WEBP — up to 25MB each</span>
              <input
                ref={inputRef}
                type="file"
                multiple
                accept="image/png,image/jpeg,image/webp"
                onChange={handleFiles}
                className="hidden"
              />
            </button>

            {files.length > 0 && (
              <ul className="mt-5 space-y-2">
                {files.map((file, idx) => {
                  const pct = progress[idx];
                  const failed = pct === -1;
                  return (
                    <li key={`${file.name}-${idx}`} className="flex items-center gap-3 rounded-xl border border-navy-900/8 bg-white p-2.5">
                      <img
                        src={URL.createObjectURL(file)}
                        alt=""
                        className="h-10 w-10 shrink-0 rounded-lg object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-medium text-forest-900">{file.name}</p>
                        {uploading || done ? (
                          <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-navy-900/8">
                            <div
                              className={`h-full rounded-full transition-all duration-300 ${failed ? 'bg-error' : 'bg-gold-500'}`}
                              style={{ width: `${failed ? 100 : pct || 0}%` }}
                            />
                          </div>
                        ) : (
                          <p className="text-[11px] text-navy-900/40">{(file.size / 1024).toFixed(0)} KB</p>
                        )}
                      </div>
                      {failed && <AlertCircle size={16} className="shrink-0 text-error" />}
                      {!uploading && !done && (
                        <button type="button" onClick={() => removeFile(idx)} aria-label="Remove" className="shrink-0 text-navy-900/40 hover:text-error">
                          <X size={16} />
                        </button>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}

            {errors.length > 0 && (
              <div className="mt-4 rounded-xl border border-error/20 bg-error/5 px-4 py-3 text-xs text-error">
                {errors.map((e) => <p key={e}>{e}</p>)}
              </div>
            )}
          </div>

          <div className="flex flex-none items-center justify-end gap-3 border-t border-navy-900/8 px-6 py-4">
            <Button type="button" variant="outline" onClick={handleClose} disabled={uploading}>
              {done ? 'Close' : 'Cancel'}
            </Button>
            {!done && (
              <Button type="button" variant="primary" onClick={handleUpload} disabled={files.length === 0 || uploading}>
                {uploading ? <><Loader2 size={16} className="animate-spin" /> Uploading…</> : `Upload ${files.length || ''}`}
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
