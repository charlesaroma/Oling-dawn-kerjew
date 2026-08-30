import Container from '../../../components/common/Container';
import SectionHeading from '../../../components/common/SectionHeading';
import { DATA } from '../../../services/jsonDataLoader';

export default function PillarsSection() {
  const { pillars } = DATA;

  return (
    <section className="bg-surface-alt py-20">
      <Container className="flex flex-col gap-10">
        <SectionHeading eyebrow="Our Pillars" title="What we stand for" align="center" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar, index) => (
            <div key={pillar.id} className="flex items-start gap-4 rounded-lg bg-white p-5 shadow-sm">
              <span className="font-mono text-sm text-bronze-700">{String(index + 1).padStart(2, '0')}</span>
              <p className="font-semibold text-forest-900">{pillar.title}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
