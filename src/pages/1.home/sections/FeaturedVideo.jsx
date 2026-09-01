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
    <section className="bg-surface-alt py-20">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          eyebrow="See It For Yourself"
          title={`Inside ${featured.title}`}
          subtitle={featured.summary}
          align="center"
        />
        <div className="mx-auto w-full max-w-4xl overflow-hidden rounded-3xl shadow-elevated-lg">
          <MediaVideo src={featured.video} className="aspect-video w-full bg-black" />
        </div>
      </Container>
    </section>
  );
}
