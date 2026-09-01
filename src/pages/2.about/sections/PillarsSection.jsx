import { GraduationCap, HeartPulse, Users, Building2, Globe2, TrendingUp } from 'lucide-react';
import Container from '../../../components/common/Container';
import SectionHeading from '../../../components/common/SectionHeading';
import { DATA } from '../../../services/jsonDataLoader';

const ICONS = [Building2, GraduationCap, HeartPulse, Users, Globe2, TrendingUp];

export default function PillarsSection() {
  const { pillars } = DATA;

  return (
    <section className="border-y border-surface/10 bg-ink-900 py-20 sm:py-28">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="What we do"
          title="Six areas, one commitment."
          subtitle="Each pillar runs continuously rather than as a one-off campaign — the buildings, the training and the follow-up all sit under the same programme."
          tone="dark"
        />

        <div className="grid gap-px overflow-hidden rounded-2xl border border-surface/12 bg-surface/12 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar, index) => {
            const Icon = ICONS[index % ICONS.length];
            return (
              <div key={pillar.id} className="group flex flex-col gap-5 bg-ink-900 p-8 transition-colors duration-300 hover:bg-ink-800">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-surface/15 text-gold-400 transition-colors duration-300 group-hover:border-gold-500/50">
                  <Icon size={18} strokeWidth={1.6} />
                </span>
                <p className="font-display text-xl leading-snug text-surface">{pillar.title}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
