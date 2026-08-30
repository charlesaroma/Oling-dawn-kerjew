import Container from '../../../components/common/Container';
import SectionHeading from '../../../components/common/SectionHeading';
import MediaImage from '../../../components/media/MediaImage';
import { useAdmin } from '../../../context/AdminContext';

export default function TeamSection() {
  const { team } = useAdmin();
  if (!team.length) return null;

  return (
    <section className="bg-surface-alt py-20">
      <Container className="flex flex-col gap-10">
        <SectionHeading eyebrow="Our Team" title="The people behind the projects" align="center" />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <div key={member.id} className="group flex flex-col items-center gap-3 text-center">
              <div className="h-28 w-28 overflow-hidden rounded-full bg-forest-100 shadow-elevated ring-4 ring-white transition-transform duration-200 group-hover:-translate-y-1">
                <MediaImage
                  src={member.photo}
                  alt={member.name}
                  width={112}
                  height={112}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="font-semibold text-forest-900">{member.name}</p>
                <p className="text-sm text-navy-900/60">{member.role}</p>
                {member.bio && <p className="mt-1 text-xs text-navy-900/50">{member.bio}</p>}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
