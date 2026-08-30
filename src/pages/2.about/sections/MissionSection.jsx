import Container from '../../../components/common/Container';
import SectionHeading from '../../../components/common/SectionHeading';
import MediaImage from '../../../components/media/MediaImage';

export default function MissionSection() {
  return (
    <section className="py-20">
      <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="flex flex-col gap-6">
          <SectionHeading
            eyebrow="Our Mission"
            title="Building infrastructure that lasts, alongside the people who use it"
            subtitle="We partner directly with communities to design and construct schools, clinics, water systems, and homes — using local labor and materials wherever possible."
          />
          <p className="text-neutral-600">
            Founded by a small group of engineers and volunteers, Hope Builders has grown into a network of
            local contractors, donors, and community leaders working toward the same goal: durable,
            community-owned infrastructure in places that need it most.
          </p>
        </div>
        <div className="aspect-4/3 overflow-hidden rounded-xl bg-neutral-100">
          <MediaImage
            src="/about/mission.jpg"
            alt="Volunteers and community members working on a construction site"
            width={640}
            height={480}
            className="h-full w-full object-cover"
          />
        </div>
      </Container>
    </section>
  );
}
