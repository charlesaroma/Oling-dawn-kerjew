import { Flame, LayoutGrid, MapPinned, Globe2 } from 'lucide-react';
import Container from '../../../components/common/Container';
import { useProjects } from '../../../services/projectQueries';
import { getPublishedProjects, getProjectCategories } from '../../../services/projectsService';

export default function ImpactStats() {
  const { data: allProjects } = useProjects();
  const projects = getPublishedProjects(allProjects);
  const districts = new Set(projects.map((p) => p.location.split(',')[0].trim()));

  const stats = [
    { value: String(projects.length), label: 'Active Initiatives', icon: Flame },
    { value: String(getProjectCategories(projects).length), label: 'Focus Areas', icon: LayoutGrid },
    { value: String(districts.size), label: 'Districts Reached', icon: MapPinned },
    { value: 'Uganda', label: 'Where We Work', icon: Globe2 },
  ];

  return (
    <section className="bg-surface-alt py-16">
      <Container>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-2 rounded-2xl bg-white/60 py-6 text-center">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-500/15 text-gold-700">
                <stat.icon size={18} strokeWidth={2} />
              </span>
              <span className="font-mono text-3xl text-bronze-700 sm:text-4xl">{stat.value}</span>
              <span className="text-sm text-forest-800">{stat.label}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
