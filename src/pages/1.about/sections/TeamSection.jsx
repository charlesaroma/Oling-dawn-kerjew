import Container from '../../../components/common/Container';
import SectionHeading from '../../../components/common/SectionHeading';
import MediaImage from '../../../components/media/MediaImage';
import { DATA } from '../../../services/jsonDataLoader';

export default function TeamSection() {
  const { team } = DATA;

  return (
    <section className="bg-neutral-50 py-20">
      <Container className="flex flex-col gap-10">
        <SectionHeading eyebrow="Our Team" title="The people behind the projects" align="center" />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <div key={member.id} className="flex flex-col items-center gap-3 text-center">
              <div className="h-28 w-28 overflow-hidden rounded-full bg-neutral-200">
                <MediaImage
                  src={member.photo}
                  alt={member.name}
                  width={112}
                  height={112}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="font-semibold text-neutral-900">{member.name}</p>
                <p className="text-sm text-neutral-500">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
