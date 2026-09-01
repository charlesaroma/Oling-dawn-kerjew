import { Navigate, useParams } from 'react-router-dom';
import Container from '../../components/common/Container';
import MediaImage from '../../components/media/MediaImage';
import Button from '../../components/common/Button';
import ProjectGallery from './sections/ProjectGallery';
import { useProjects } from '../../services/projectQueries';
import { getPublishedProjects, getProjectBySlug } from '../../services/projectsService';
import { useSEO } from '../../hooks/useSEO';

export default function ProjectDetail() {
  const { slug } = useParams();
  const { data: projects } = useProjects();
  const project = getProjectBySlug(getPublishedProjects(projects), slug);

  useSEO({
    title: project?.title,
    description: project?.summary,
    image: project?.coverImage,
  });

  if (!project) return <Navigate to="/projects" replace />;

  return (
    <>
      <section className="relative overflow-hidden bg-ink-900">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-[8%] -top-[60%] h-[min(60vw,520px)] w-[min(60vw,520px)] rounded-full opacity-70"
          style={{ background: 'radial-gradient(circle, rgba(223,161,38,0.14) 0%, transparent 66%)' }}
        />
        <Container className="relative pb-16 pt-32 sm:pb-20 sm:pt-40">
          <p className="mb-5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-bronze-400">
            {project.category} · {project.location}
          </p>
          <h1 className="max-w-[18ch] font-display text-[clamp(2.2rem,5.4vw,4rem)] leading-[0.98] tracking-[-0.02em] text-surface text-balance">
            {project.title}
          </h1>
          {project.summary && (
            <p className="mt-6 max-w-[52ch] text-base leading-relaxed text-surface/60">{project.summary}</p>
          )}
        </Container>
        <div
          aria-hidden="true"
          className="h-1.5"
          style={{
            background:
              'repeating-linear-gradient(90deg, var(--color-gold-500) 0 28px, var(--color-bronze-600) 28px 56px, var(--color-forest-700) 56px 84px)',
          }}
        />
      </section>

      <section className="bg-surface py-20 sm:py-24">
        <Container className="flex flex-col gap-14">
          <div className="aspect-21/9 overflow-hidden rounded-3xl shadow-elevated-lg">
            <MediaImage
              src={project.coverImage}
              alt={project.title}
              width={1600}
              height={686}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="grid gap-12 lg:grid-cols-3">
            <div className="flex flex-col gap-4 lg:col-span-2">
              {project.description.map((paragraph) => (
                <p key={paragraph} className="text-ink-900/80">{paragraph}</p>
              ))}
              <div className="pt-4">
                <ProjectGallery project={project} />
              </div>
            </div>

            <aside className="flex h-fit flex-col gap-4 rounded-2xl border border-ink-900/8 bg-white p-6 shadow-elevated">
              <div>
                <p className="font-mono text-xs uppercase tracking-wide text-ink-900/50">Status</p>
                <p className="font-semibold text-forest-900">{project.status}</p>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-wide text-ink-900/50">Year</p>
                <p className="font-semibold text-forest-900">{project.year}</p>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-wide text-ink-900/50">Location</p>
                <p className="font-semibold text-forest-900">{project.location}</p>
              </div>
              <Button to="/contact" variant="primary" className="mt-2 w-full">Support This Work</Button>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
