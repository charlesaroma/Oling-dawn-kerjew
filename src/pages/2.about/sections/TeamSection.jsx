import Container from '../../../components/common/Container';
import SectionHeading from '../../../components/common/SectionHeading';
import MediaImage from '../../../components/media/MediaImage';
import { useTeam } from '../../../services/teamQueries';

export default function TeamSection() {
  const { data: team } = useTeam();
  if (!team.length) return null;

  return (
    <section className="bg-surface-alt py-20 sm:py-28">
      <Container className="flex flex-col gap-14">
        <SectionHeading eyebrow="Our team" title="The people behind the projects" align="center" />
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <div key={member.id} className="group flex flex-col items-center text-center">
              <div className="h-32 w-32 overflow-hidden rounded-full bg-forest-100 ring-1 ring-ink-900/8 transition-transform duration-300 group-hover:-translate-y-1">
                <MediaImage
                  src={member.photo}
                  alt={member.name}
                  width={160}
                  height={160}
                  className="h-full w-full object-cover saturate-[0.8] transition-all duration-500 group-hover:saturate-100"
                />
              </div>
              <p className="mt-5 font-display text-xl text-forest-900">{member.name}</p>
              {member.role && (
                <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-bronze-600">{member.role}</p>
              )}
              {member.bio && <p className="mt-3 max-w-[28ch] text-sm leading-relaxed text-ink-500">{member.bio}</p>}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
