import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, description, size = 'lg', footer, children }) {
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
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-ink-900/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.15 }}
            className={`relative flex max-h-[85dvh] w-full ${maxWidth} flex-col overflow-hidden rounded-2xl border border-ink-900/10 bg-white shadow-elevated-lg`}
            role="dialog"
            aria-modal="true"
          >
            <div className="flex flex-none items-start justify-between gap-4 rounded-t-2xl border-b border-ink-900/8 px-6 py-5 xl:px-8">
              <div>
                <h3 className="font-display text-2xl leading-tight text-forest-900">{title}</h3>
                {description && <p className="mt-1.5 text-sm text-ink-500">{description}</p>}
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="shrink-0 rounded-full p-2 text-ink-400 transition-colors hover:bg-forest-50 hover:text-forest-800"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-6 xl:px-8">
              {children}
            </div>
            {footer && (
              <div className="flex flex-none items-center justify-end gap-3 rounded-b-2xl border-t border-ink-900/8 px-6 py-4 xl:px-8">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
