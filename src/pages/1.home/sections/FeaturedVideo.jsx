import Container from '../../../components/common/Container';
import SectionHeading from '../../../components/common/SectionHeading';
import MediaVideo from '../../../components/media/MediaVideo';
import { useProjects } from '../../../services/projectQueries';
import { getPublishedProjects } from '../../../services/projectsService';

export default function FeaturedVideo() {
  const { data: projects } = useProjects();
  const featured = getPublishedProjects(projects).find((project) => project.video);
  if (!featured) return null;

  return (
    <section className="bg-ink-900 py-20 sm:py-28">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="See it for yourself"
          title={`Inside ${featured.title}`}
          subtitle={featured.summary}
          align="center"
          tone="dark"
        />
        <div className="mx-auto w-full max-w-4xl overflow-hidden rounded-2xl border border-surface/10">
          <MediaVideo src={featured.video} className="aspect-video w-full bg-black" />
        </div>
      </Container>
    </section>
  );
}
