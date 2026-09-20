import Container from '../common/Container';
import CountUp from '../common/CountUp';
import { useProjects } from '../../services/projectQueries';
import { getImpactStats } from '../../services/impactStatsService';

export default function ImpactStats() {
  const { data: projects } = useProjects();
  const stats = getImpactStats(projects, 4);

  if (stats.length === 0) return null;

  /* The authored list may be shorter than four, so the columns follow the
     number of stats rather than assuming a full row. */
  const columns = stats.length >= 4 ? 'sm:grid-cols-4' : stats.length === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2';

  return (
    <section className="bg-surface-alt py-20 sm:py-24">
      <Container>
        <div className={`grid grid-cols-2 gap-y-12 sm:gap-y-0 ${columns}`}>
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`px-2 sm:px-8 ${i > 0 ? 'sm:border-l sm:border-ink-900/10' : ''} ${i === 0 ? 'sm:pl-0' : ''}`}
            >
              <p className="font-display text-[clamp(2.6rem,5vw,4rem)] leading-[0.9] tracking-[-0.02em] text-forest-900 tabular-nums">
                <CountUp value={stat.value} />
              </p>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
