import { Play } from 'lucide-react';
import MediaImage from '../media/MediaImage';

export default function GalleryTile({ item, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative aspect-square overflow-hidden rounded-2xl bg-forest-50 shadow-elevated transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated-lg"
    >
      <MediaImage
        src={item.type === 'video' ? item.poster ?? item.src : item.src}
        alt={item.caption}
        width={400}
        height={400}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      {item.type === 'video' && (
        <span className="absolute inset-0 flex items-center justify-center bg-navy-900/20 transition-colors group-hover:bg-navy-900/30">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-forest-800 shadow-elevated">
            <Play size={18} fill="currentColor" className="ml-0.5" />
          </span>
        </span>
      )}
      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-900/80 to-transparent p-3 pt-8 text-left text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        {item.caption}
      </span>
    </button>
  );
}
