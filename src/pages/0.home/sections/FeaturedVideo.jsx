import Container from '../../../components/common/Container';
import SectionHeading from '../../../components/common/SectionHeading';
import MediaVideo from '../../../components/media/MediaVideo';
import { getAllProjects } from '../../../services/projectsService';

export default function FeaturedVideo() {
  const featured = getAllProjects().find((project) => project.video);
  if (!featured) return null;

  return (
    <section className="bg-neutral-50 py-20">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          eyebrow="See It For Yourself"
          title={`Inside ${featured.title}`}
          subtitle={featured.summary}
          align="center"
        />
        <div className="mx-auto w-full max-w-4xl overflow-hidden rounded-xl shadow-lg">
          <MediaVideo src={featured.video} className="aspect-video w-full bg-black" />
        </div>
      </Container>
    </section>
  );
}
