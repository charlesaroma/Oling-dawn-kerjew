import { Link } from 'react-router-dom';
import MediaImage from '../media/MediaImage';

const STATUS_STYLES = {
  Completed: 'bg-success/10 text-success',
  Ongoing: 'bg-gold-500/15 text-gold-800',
};

export default function ProjectCard({ project }) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-navy-900/10 bg-white transition-shadow hover:shadow-lg"
    >
      <div className="aspect-4/3 overflow-hidden bg-forest-50">
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
          <span className="font-mono text-xs uppercase tracking-wide text-forest-700">{project.category}</span>
          <span className={`rounded-full px-2 py-0.5 font-mono text-xs font-medium ${STATUS_STYLES[project.status] ?? 'bg-navy-900/10 text-navy-900/70'}`}>
            {project.status}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-forest-900">{project.title}</h3>
        <p className="text-sm text-navy-900/60">{project.location}</p>
        <p className="mt-1 line-clamp-2 text-sm text-navy-900/70">{project.summary}</p>
      </div>
    </Link>
  );
}
