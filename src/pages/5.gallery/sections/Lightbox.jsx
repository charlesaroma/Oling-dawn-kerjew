import { X } from 'lucide-react';
import MediaImage from '../../../components/media/MediaImage';
import MediaVideo from '../../../components/media/MediaVideo';

export default function Lightbox({ item, onClose }) {
  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-navy-900/90 p-6 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
        aria-label="Close"
      >
        <X size={20} />
      </button>
      <div className="max-h-[85vh] w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
        {item.type === 'video' ? (
          <MediaVideo src={item.src} className="max-h-[85vh] w-full rounded-2xl shadow-elevated-lg" />
        ) : (
          <MediaImage src={item.src} alt={item.caption} width={1200} height={800} className="max-h-[85vh] w-full rounded-2xl object-contain shadow-elevated-lg" />
        )}
        {item.caption && <p className="mt-4 text-center text-sm text-gold-100/80">{item.caption}</p>}
      </div>
    </div>
  );
}
