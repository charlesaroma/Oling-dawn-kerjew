import { AnimatePresence, motion } from 'framer-motion';
import { Loader2, CheckCircle2, AlertCircle, X } from 'lucide-react';
import { useUpload } from '../contexts/useUpload';

export default function UploadTray() {
  const { isOpen, files, progress, uploading, restore, closeModal } = useUpload();

  const doneCount = Object.values(progress).filter((p) => p === 100).length;
  const failedCount = Object.values(progress).filter((p) => p === -1).length;
  const allDone = files.length > 0 && doneCount === files.length;
  const hasActivity = uploading || allDone || failedCount > 0;
  const show = !isOpen && hasActivity && files.length > 0;

  let icon = <Loader2 size={18} className="animate-spin text-gold-600" />;
  let label = `Uploading ${files.length} file${files.length === 1 ? '' : 's'}…`;
  if (!uploading && allDone) {
    icon = <CheckCircle2 size={18} className="text-success" />;
    label = `Upload complete — ${doneCount} file${doneCount === 1 ? '' : 's'} uploaded`;
  } else if (!uploading && failedCount > 0) {
    icon = <AlertCircle size={18} className="text-error" />;
    label = `${failedCount} upload${failedCount === 1 ? '' : 's'} failed`;
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          className="fixed bottom-6 right-6 z-100 w-72 overflow-hidden rounded-2xl border border-ink-900/8 bg-white shadow-elevated-lg"
        >
          <button
            type="button"
            onClick={restore}
            className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-forest-50"
          >
            {icon}
            <span className="min-w-0 flex-1 truncate text-sm font-medium text-forest-900">{label}</span>
            <span
              role="button"
              tabIndex={0}
              onClick={(e) => { e.stopPropagation(); closeModal(); }}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.stopPropagation(); closeModal(); } }}
              aria-label="Dismiss"
              className="shrink-0 rounded-full p-1 text-ink-900/40 hover:text-error"
            >
              <X size={14} />
            </span>
          </button>
          {uploading && (
            <div className="h-1 w-full overflow-hidden bg-ink-900/8">
              <div
                className="h-full rounded-full bg-gold-500 transition-all duration-300"
                style={{ width: `${Math.max((doneCount / files.length) * 100, 5)}%` }}
              />
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
