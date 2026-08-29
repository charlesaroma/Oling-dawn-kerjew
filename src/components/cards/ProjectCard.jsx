import { Link } from 'react-router-dom';
import MediaImage from '../media/MediaImage';

const STATUS_STYLES = {
  Completed: 'bg-success/10 text-success',
  Ongoing: 'bg-accent-500/10 text-accent-700',
};

export default function ProjectCard({ project }) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-neutral-200 transition-shadow hover:shadow-lg"
    >
      <div className="aspect-4/3 overflow-hidden bg-neutral-100">
        <MediaImage
          src={project.coverImage}
          alt={project.title}
          width={480}
          height={360}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-primary-600">{project.category}</span>
          <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_STYLES[project.status] ?? 'bg-neutral-100 text-neutral-600'}`}>
            {project.status}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-neutral-900">{project.title}</h3>
        <p className="text-sm text-neutral-500">{project.location}</p>
        <p className="mt-1 line-clamp-2 text-sm text-neutral-600">{project.summary}</p>
      </div>
    </Link>
  );
}
