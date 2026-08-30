import { GraduationCap, HeartPulse, Users, Building2, Globe2, TrendingUp } from 'lucide-react';
import Container from '../../../components/common/Container';
import SectionHeading from '../../../components/common/SectionHeading';
import { DATA } from '../../../services/jsonDataLoader';

const ICONS = [GraduationCap, HeartPulse, Users, Building2, Globe2, TrendingUp];

export default function PillarsSection() {
  const { pillars } = DATA;

  return (
    <section className="bg-surface-alt py-20">
      <Container className="flex flex-col gap-10">
        <SectionHeading eyebrow="Our Pillars" title="What we stand for" align="center" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar, index) => {
            const Icon = ICONS[index % ICONS.length];
            return (
              <div
                key={pillar.id}
                className="group flex items-start gap-4 rounded-2xl bg-white p-5 shadow-elevated transition-all duration-200 hover:-translate-y-0.5 hover:shadow-elevated-lg"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-forest-50 text-forest-700 transition-colors group-hover:bg-gold-500/15 group-hover:text-gold-700">
                  <Icon size={19} strokeWidth={2} />
                </span>
                <div>
                  <span className="font-mono text-xs text-bronze-700">{String(index + 1).padStart(2, '0')}</span>
                  <p className="font-semibold text-forest-900">{pillar.title}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
