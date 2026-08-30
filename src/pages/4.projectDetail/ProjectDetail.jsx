import { Navigate, useParams } from 'react-router-dom';
import Container from '../../components/common/Container';
import MediaImage from '../../components/media/MediaImage';
import Button from '../../components/common/Button';
import ProjectGallery from './sections/ProjectGallery';
import { getProjectBySlug } from '../../services/projectsService';

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  if (!project) return <Navigate to="/projects" replace />;

  return (
    <>
      <section className="relative isolate flex min-h-[50vh] items-end overflow-hidden bg-primary-900">
        <MediaImage
          src={project.coverImage}
          alt=""
          width={1920}
          height={800}
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 -z-10 bg-linear-to-t from-primary-900 via-primary-900/60 to-transparent" />
        <Container className="flex flex-col gap-2 py-12">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent-300">
            {project.category} · {project.location}
          </span>
          <h1 className="text-3xl font-display font-extrabold text-white sm:text-4xl">{project.title}</h1>
        </Container>
      </section>

      <section className="py-16">
        <Container className="grid gap-12 lg:grid-cols-3">
          <div className="flex flex-col gap-4 lg:col-span-2">
            {project.description.map((paragraph) => (
              <p key={paragraph} className="text-neutral-600">{paragraph}</p>
            ))}
            <div className="pt-4">
              <ProjectGallery project={project} />
            </div>
          </div>

          <aside className="flex h-fit flex-col gap-4 rounded-lg border border-neutral-200 p-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">Status</p>
              <p className="font-semibold text-neutral-900">{project.status}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">Year</p>
              <p className="font-semibold text-neutral-900">{project.year}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">Location</p>
              <p className="font-semibold text-neutral-900">{project.location}</p>
            </div>
            <Button to="/contact" variant="primary" className="mt-2 w-full">Support This Work</Button>
          </aside>
        </Container>
      </section>
    </>
  );
}
