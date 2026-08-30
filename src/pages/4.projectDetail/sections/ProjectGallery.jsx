import MediaImage from '../../../components/media/MediaImage';
import MediaVideo from '../../../components/media/MediaVideo';

export default function ProjectGallery({ project }) {
  return (
    <div className="flex flex-col gap-6">
      {project.video && (
        <div className="overflow-hidden rounded-xl shadow-lg">
          <MediaVideo src={project.video} className="aspect-video w-full bg-black" />
        </div>
      )}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {project.gallery.map((src) => (
          <div key={src} className="aspect-square overflow-hidden rounded-lg bg-forest-50">
            <MediaImage src={src} alt={project.title} width={320} height={320} className="h-full w-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}
