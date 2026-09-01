import { CheckSquare, Square, Pencil, Trash2, Play } from 'lucide-react';
import EmptyState from '../../../components/common/EmptyState';
import MediaImage from '../../../components/media/MediaImage';
import { isVideoUrl } from '../../../utils/isVideoUrl';

export default function MediaGrid({ items, selectedIds, onToggleSelect, onEdit, onDeleteOne }) {
  if (!items.length) {
    return <EmptyState title="No media yet" message="Upload photos to get started." />;
  }

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 xl:grid-cols-5">
      {items.map((item) => {
        const selected = selectedIds.has(item.id);
        const isVideo = isVideoUrl(item.url);
        return (
          <div key={item.id} className="group relative overflow-hidden rounded-2xl border border-ink-900/8 bg-white shadow-elevated">
            <button
              type="button"
              onClick={() => onToggleSelect(item.id)}
              aria-label={selected ? 'Deselect' : 'Select'}
              className={`absolute left-2 top-2 z-10 rounded-md bg-white/90 p-1 text-forest-800 shadow transition-opacity ${
                selected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}
            >
              {selected ? <CheckSquare size={16} /> : <Square size={16} />}
            </button>
            <div className="aspect-square overflow-hidden bg-forest-50">
              {isVideo ? (
                <div className="flex h-full w-full items-center justify-center bg-ink-900/5">
                  <Play size={28} className="text-forest-400" />
                </div>
              ) : (
                <MediaImage
                  src={item.url}
                  alt={item.alt || ''}
                  width={300}
                  height={300}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              )}
            </div>
            <div className="space-y-2 p-3">
              <div className="flex items-center justify-between gap-2">
                {item.tag && (
                  <span className="truncate rounded-full bg-forest-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-forest-700">
                    {item.tag}
                  </span>
                )}
                {item.size && <span className="shrink-0 text-[10px] text-ink-900/40">{item.size}</span>}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => onEdit(item)}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-ink-900/10 py-1.5 text-xs font-semibold text-forest-800 transition-colors hover:bg-forest-50"
                >
                  <Pencil size={12} /> Edit
                </button>
                <button
                  type="button"
                  onClick={() => onDeleteOne(item.id)}
                  aria-label="Delete"
                  className="flex shrink-0 items-center justify-center rounded-lg border border-ink-900/10 px-2.5 text-ink-900/40 transition-colors hover:border-error/30 hover:text-error"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
