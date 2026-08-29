import MediaImage from '../media/MediaImage';

export default function GalleryTile({ item, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative aspect-square overflow-hidden rounded-lg bg-neutral-100"
    >
      <MediaImage
        src={item.type === 'video' ? item.poster ?? item.src : item.src}
        alt={item.caption}
        width={400}
        height={400}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      {item.type === 'video' && (
        <span className="absolute inset-0 flex items-center justify-center bg-black/20">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-primary-800">▶</span>
        </span>
      )}
      <span className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent p-3 text-left text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
        {item.caption}
      </span>
    </button>
  );
}
