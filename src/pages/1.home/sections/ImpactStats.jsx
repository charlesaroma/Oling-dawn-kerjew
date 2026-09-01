import Container from '../../../components/common/Container';
import { useProjects } from '../../../services/projectQueries';
import { getProjectCategories } from '../../../services/projectsService';

/* Counts every initiative the organisation runs, not only the ones with a
   published page — a project in draft is still real work on the ground. */
export default function ImpactStats() {
  const { data: projects } = useProjects();
  const districts = new Set(
    projects.map((p) => p.location?.split(',')[0].trim()).filter(Boolean),
  );

  const stats = [
    { value: String(projects.length), label: 'Initiatives' },
    { value: String(getProjectCategories(projects).length), label: 'Focus areas' },
    { value: String(districts.size), label: 'Districts reached' },
    { value: '2025', label: 'Registered' },
  ];

  return (
    <section className="bg-surface py-20 sm:py-24">
      <Container>
        <div className="grid grid-cols-2 gap-y-12 sm:grid-cols-4 sm:gap-y-0">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`px-2 sm:px-8 ${i > 0 ? 'sm:border-l sm:border-ink-900/10' : ''} ${i === 0 ? 'sm:pl-0' : ''}`}
            >
              <p className="font-display text-[clamp(2.6rem,5vw,4rem)] leading-[0.9] tracking-[-0.02em] text-forest-900 tabular-nums">
                {stat.value}
              </p>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
