import { useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import MediaImage from './MediaImage';
import MediaVideo from './MediaVideo';
import { isVideoUrl } from '../../utils/isVideoUrl';

/* Shared by the Gallery page and project detail pages. `items` is an array
   of { src, alt }; `index` is the open item's position, or null when closed.
   Arrow keys (and on-screen chevrons) step through `items`, wrapping at
   either end — Escape closes. */
export default function Lightbox({ items, index, onClose, onChangeIndex }) {
  const isOpen = index !== null && index !== undefined && !!items?.[index];
  const count = items?.length ?? 0;
  const thumbRefs = useRef([]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight' && count > 1) onChangeIndex((index + 1) % count);
      else if (e.key === 'ArrowLeft' && count > 1) onChangeIndex((index - 1 + count) % count);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, index, count, onClose, onChangeIndex]);

  // Keep the active thumbnail in view when stepping via arrows/keyboard,
  // not just when clicking directly on the strip.
  useEffect(() => {
    if (!isOpen) return;
    thumbRefs.current[index]?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
  }, [isOpen, index]);

  if (!isOpen) return null;

  const item = items[index];
  const isVideo = isVideoUrl(item.src);
  const showNav = count > 1;
  const goPrev = (e) => { e.stopPropagation(); onChangeIndex((index - 1 + count) % count); };
  const goNext = (e) => { e.stopPropagation(); onChangeIndex((index + 1) % count); };

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center overflow-y-auto bg-ink-900/90 p-6 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-surface-card/10 text-white transition-colors hover:bg-surface-card/20"
        aria-label="Close"
      >
        <X size={20} />
      </button>

      {showNav && (
        <>
          <button
            type="button"
            onClick={goPrev}
            className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-surface-card/10 text-white transition-colors hover:bg-surface-card/20 sm:left-6"
            aria-label="Previous image"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            type="button"
            onClick={goNext}
            className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-surface-card/10 text-white transition-colors hover:bg-surface-card/20 sm:right-6"
            aria-label="Next image"
          >
            <ChevronRight size={22} />
          </button>
        </>
      )}

      <div className="w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
        {isVideo ? (
          <MediaVideo src={item.src} className="max-h-[70vh] w-full rounded-2xl shadow-elevated-lg" />
        ) : (
          <MediaImage src={item.src} alt={item.alt} width={1200} height={800} className="max-h-[70vh] w-full rounded-2xl object-contain shadow-elevated-lg" />
        )}
        {item.alt && <p className="mt-4 text-center text-sm text-gold-100/80">{item.alt}</p>}
        {showNav && (
          <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-wide text-surface/40 tabular-nums">
            {index + 1} / {count}
          </p>
        )}

        {showNav && (
          <div className="no-scrollbar mt-5 flex gap-2 overflow-x-auto px-1 pb-1">
            {items.map((it, i) => {
              const active = i === index;
              const thumbIsVideo = isVideoUrl(it.src);
              return (
                <button
                  key={`${it.src}-${i}`}
                  ref={(el) => { thumbRefs.current[i] = el; }}
                  type="button"
                  onClick={() => onChangeIndex(i)}
                  aria-label={`Go to image ${i + 1} of ${count}`}
                  aria-current={active}
                  className={`h-14 w-14 shrink-0 overflow-hidden rounded-lg transition-all duration-150 sm:h-16 sm:w-16 ${
                    active ? 'opacity-100 ring-2 ring-gold-500 ring-offset-2 ring-offset-ink-900' : 'opacity-45 hover:opacity-75'
                  }`}
                >
                  {thumbIsVideo ? (
                    <span className="flex h-full w-full items-center justify-center bg-ink-800 text-surface/70">
                      <Play size={14} fill="currentColor" />
                    </span>
                  ) : (
                    <MediaImage src={it.src} alt="" width={64} height={64} className="h-full w-full object-cover" />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
