import Container from '../../../components/common/Container';
import SectionHeading from '../../../components/common/SectionHeading';
import MediaImage from '../../../components/media/MediaImage';
import { DATA } from '../../../services/jsonDataLoader';

export default function MissionSection() {
  const { description, registeredYear } = DATA.siteConfig;

  return (
    <section className="py-20">
      <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="flex flex-col gap-6">
          <SectionHeading
            eyebrow="Who We Are"
            title="Sustainable support for Uganda's most vulnerable communities"
          />
          <p className="text-navy-900/80">{description}</p>
          <p className="font-mono text-sm text-bronze-700">Registered non-profit organization — Uganda, {registeredYear}</p>
        </div>
        <div className="aspect-4/3 overflow-hidden rounded-xl bg-forest-50">
          <MediaImage
            src="/about/mission.jpg"
            alt="ODKHC volunteers with a community they serve"
            width={640}
            height={480}
            className="h-full w-full object-cover"
          />
        </div>
      </Container>
    </section>
  );
}
