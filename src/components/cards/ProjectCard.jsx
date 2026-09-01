import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import MediaImage from '../media/MediaImage';

const STATUS_STYLES = {
  Completed: 'border-success/25 text-success',
  Ongoing: 'border-gold-600/30 text-gold-700',
};

export default function ProjectCard({ project }) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-ink-900/8 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-ink-900/16 hover:shadow-elevated-lg"
    >
      <div className="relative aspect-4/3 overflow-hidden bg-forest-50">
        <MediaImage
          src={project.coverImage}
          alt={project.title}
          width={480}
          height={360}
          className="h-full w-full object-cover saturate-[0.75] transition-all duration-700 group-hover:scale-[1.04] group-hover:saturate-100"
        />
        <span className="absolute right-3 top-3 flex h-9 w-9 translate-y-1 items-center justify-center rounded-full bg-surface text-forest-800 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight size={16} />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-bronze-600">{project.category}</span>
          <span className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] ${STATUS_STYLES[project.status] ?? 'border-ink-900/15 text-ink-500'}`}>
            {project.status}
          </span>
        </div>

        <h3 className="mt-4 font-display text-2xl leading-[1.1] text-forest-900 transition-colors duration-200 group-hover:text-bronze-700">
          {project.title}
        </h3>

        {project.summary && (
          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-ink-500">{project.summary}</p>
        )}

        <p className="mt-5 flex items-center gap-2 border-t border-ink-900/8 pt-4 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-500">
          {project.location}
          {project.year && <span className="ml-auto tabular-nums">{project.year}</span>}
        </p>
      </div>
    </Link>
  );
}
