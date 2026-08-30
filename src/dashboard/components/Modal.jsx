import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, description, size = 'lg', children }) {
  // Keep the latest onClose in a ref so the listener doesn't need to be torn
  // down and re-attached every render just because the caller passed a new
  // inline arrow function — it only (dis)connects when isOpen actually flips.
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => { if (e.key === 'Escape') onCloseRef.current(); };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  const maxWidth = { md: 'max-w-md', lg: 'max-w-lg', xl: 'max-w-2xl' }[size] || 'max-w-lg';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-start justify-center overflow-y-auto p-4 py-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-navy-900/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.15 }}
            className={`relative my-auto max-h-[85vh] w-full ${maxWidth} overflow-y-auto rounded-2xl border border-navy-900/8 bg-white p-6 shadow-elevated-lg xl:p-8`}
            role="dialog"
            aria-modal="true"
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-xl text-forest-900">{title}</h3>
                {description && <p className="mt-1 text-sm text-navy-900/60">{description}</p>}
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="shrink-0 rounded-full p-2 text-navy-900/50 transition-colors hover:bg-forest-50 hover:text-forest-800"
              >
                <X size={20} />
              </button>
            </div>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
