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
      <section className="bg-surface-alt py-16">
        <Container className="flex flex-col gap-2">
          <span className="font-mono text-sm uppercase tracking-widest text-gold-700">
            {project.category} · {project.location}
          </span>
          <h1 className="text-3xl italic sm:text-4xl">{project.title}</h1>
        </Container>
      </section>

      <section className="py-16">
        <Container className="flex flex-col gap-12">
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
