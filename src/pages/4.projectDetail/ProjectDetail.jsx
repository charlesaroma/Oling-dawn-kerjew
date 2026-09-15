import { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Container from '../../components/common/Container';
import PageHeader from '../../components/common/PageHeader';
import SectionHeading from '../../components/common/SectionHeading';
import MediaImage from '../../components/media/MediaImage';
import Lightbox from '../../components/media/Lightbox';
import Button from '../../components/common/Button';
import ShareButton from '../../components/common/ShareButton';
import Loader from '../../components/common/Loader';
import ProjectCard from '../../components/cards/ProjectCard';
import ProjectGallery from './sections/ProjectGallery';
import { useProjects } from '../../services/projectQueries';
import { getPublishedProjects, getProjectBySlug, getRelatedProjects } from '../../services/projectsService';
import { useSEO } from '../../hooks/useSEO';

const CONSTRUCTION_CATEGORY = 'Low-Cost Construction';

export default function ProjectDetail() {
  const { slug } = useParams();
  const { data: projects, isFetching } = useProjects();
  const published = getPublishedProjects(projects);
  const project = getProjectBySlug(published, slug);
  const related = project ? getRelatedProjects(published, project) : [];
  const constructionFlagshipId = published.find((p) => p.category === CONSTRUCTION_CATEGORY)?.id;
  const [lightboxIndex, setLightboxIndex] = useState(null);

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

  // Cover image first, then the gallery — one shared index space so the
  // lightbox can step through everything in order, wherever it was opened from.
  const lightboxItems = [
    { src: project.coverImage, alt: project.title },
    ...project.gallery.map((src) => ({ src, alt: project.title })),
  ];

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
          <button
            type="button"
            onClick={() => setLightboxIndex(0)}
            className="group relative aspect-21/9 overflow-hidden rounded-3xl shadow-elevated-lg"
            aria-label={`Open ${project.title} image`}
          >
            <MediaImage
              src={project.coverImage}
              alt={project.title}
              width={1600}
              height={686}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </button>

          <div className="grid gap-12 lg:grid-cols-3">
            <div className="flex flex-col gap-4 lg:col-span-2">
              {project.description.map((paragraph) => (
                <p key={paragraph} className="text-ink-900/80">{paragraph}</p>
              ))}
              <div className="pt-4">
                <ProjectGallery project={project} onOpenImage={(i) => setLightboxIndex(i + 1)} />
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
              <ShareButton title={project.title} text={project.summary} className="w-full [&>button]:w-full [&>button]:justify-center" />
            </aside>
          </div>
        </Container>
      </section>

      {related.length > 0 && (
        <section className="bg-surface-alt py-20 sm:py-24">
          <Container className="flex flex-col gap-12">
            <SectionHeading eyebrow="Keep exploring" title="Other initiatives." />
            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProjectCard
                  key={p.id}
                  project={p}
                  to={p.id === constructionFlagshipId ? '/construction' : undefined}
                  badgeLabel={p.id === constructionFlagshipId ? 'Full case study' : undefined}
                />
              ))}
            </div>
          </Container>
        </section>
      )}

      <Lightbox
        items={lightboxItems}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onChangeIndex={setLightboxIndex}
      />
    </>
  );
}
