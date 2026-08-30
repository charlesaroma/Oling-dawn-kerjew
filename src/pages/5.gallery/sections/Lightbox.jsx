import MediaImage from '../../../components/media/MediaImage';
import MediaVideo from '../../../components/media/MediaVideo';

export default function Lightbox({ item, onClose }) {
  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-navy-900/90 p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-xl text-white hover:bg-white/20"
        aria-label="Close"
      >
        ✕
      </button>
      <div className="max-h-[85vh] w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
        {item.type === 'video' ? (
          <MediaVideo src={item.src} className="max-h-[85vh] w-full rounded-lg" />
        ) : (
          <MediaImage src={item.src} alt={item.caption} width={1200} height={800} className="max-h-[85vh] w-full rounded-lg object-contain" />
        )}
        {item.caption && <p className="mt-3 text-center text-sm text-gold-100/80">{item.caption}</p>}
      </div>
    </div>
  );
}
