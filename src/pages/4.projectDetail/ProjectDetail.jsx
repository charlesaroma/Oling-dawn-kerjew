import { Navigate, useParams } from 'react-router-dom';
import Container from '../../components/common/Container';
import PageHeader from '../../components/common/PageHeader';
import MediaImage from '../../components/media/MediaImage';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import ProjectGallery from './sections/ProjectGallery';
import { useProjects } from '../../services/projectQueries';
import { getPublishedProjects, getProjectBySlug } from '../../services/projectsService';
import { useSEO } from '../../hooks/useSEO';

export default function ProjectDetail() {
  const { slug } = useParams();
  const { data: projects, isFetching } = useProjects();
  const project = getProjectBySlug(getPublishedProjects(projects), slug);

  useSEO({
    title: project?.title,
    description: project?.summary,
    image: project?.coverImage,
  });

  // useProjects() sets initialData: [] so isLoading is always false here —
  // isFetching is what actually reflects the in-flight first request. Wait
  // for it to settle before deciding the project genuinely doesn't exist,
  // otherwise a direct/hard-loaded link always bounces to /projects.
  if (!project) return isFetching ? <Loader /> : <Navigate to="/projects" replace />;

  return (
    <>
      <PageHeader
        eyebrow={`${project.category} · ${project.location}`}
        title={project.title}
        subtitle={project.summary}
        titleClassName="max-w-[18ch] font-display text-[clamp(2.2rem,5.4vw,4rem)] font-medium leading-[0.98] tracking-[-0.02em] text-surface text-balance"
        image={project.coverImage}
        imageAlt={project.title}
        backTo="/projects"
        backLabel="Back to Projects"
      />

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

            <aside className="flex h-fit flex-col gap-4 rounded-2xl border border-ink-900/8 bg-surface-card p-6 shadow-elevated">
              <div>
                <p className="font-mono text-xs uppercase tracking-wide text-ink-500">Status</p>
                <p className="font-semibold text-forest-900">{project.status}</p>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-wide text-ink-500">Year</p>
                <p className="font-semibold text-forest-900">{project.year}</p>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-wide text-ink-500">Location</p>
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
