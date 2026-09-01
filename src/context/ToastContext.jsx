import { useCallback, useState } from 'react';
import { ToastContext } from './useToast';

let toastId = 0;

const VARIANT_CLASSES = {
  success: 'bg-success',
  error: 'bg-error',
  warning: 'bg-warning',
  info: 'bg-info',
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`animate-slide-in flex min-w-[280px] max-w-md items-center gap-3 rounded-lg px-4 py-3 text-sm text-white shadow-elevated-lg ${
              VARIANT_CLASSES[t.type] || VARIANT_CLASSES.info
            }`}
          >
            <span className="flex-1">{t.message}</span>
            <button
              type="button"
              onClick={() => removeToast(t.id)}
              aria-label="Dismiss"
              className="text-lg leading-none text-white/70 hover:text-white"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
