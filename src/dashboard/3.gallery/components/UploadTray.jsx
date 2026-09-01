import { AnimatePresence, motion } from 'framer-motion';
import { UploadCloud, X } from 'lucide-react';
import { useUpload } from '../contexts/useUpload';

export default function UploadTray() {
  const { isMinimised, restore, closeModal } = useUpload();

  return (
    <AnimatePresence>
      {isMinimised && (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          onClick={restore}
          className="fixed bottom-6 right-6 z-100 flex items-center gap-3 rounded-full border border-navy-900/8 bg-white px-5 py-3 shadow-elevated-lg transition-transform hover:-translate-y-0.5"
        >
          <UploadCloud size={18} className="text-gold-600" />
          <span className="text-sm font-medium text-forest-900">Uploading…</span>
          <span
            role="button"
            tabIndex={0}
            onClick={(e) => { e.stopPropagation(); closeModal(); }}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.stopPropagation(); closeModal(); } }}
            aria-label="Dismiss"
            className="ml-1 rounded-full p-1 text-navy-900/40 hover:text-error"
          >
            <X size={14} />
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
