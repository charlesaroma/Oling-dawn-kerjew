import Container from '../../../components/common/Container';
import { getAllProjects, getProjectCategories } from '../../../services/projectsService';

export default function ImpactStats() {
  const projects = getAllProjects();
  const districts = new Set(projects.map((p) => p.location.split(',')[0].trim()));

  const stats = [
    { value: String(projects.length), label: 'Active Initiatives' },
    { value: String(getProjectCategories().length), label: 'Focus Areas' },
    { value: String(districts.size), label: 'Districts Reached' },
    { value: 'Uganda', label: 'Where We Work' },
  ];

  return (
    <section className="bg-surface-alt py-14">
      <Container>
        <div className="grid grid-cols-2 gap-8 text-center sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <span className="font-mono text-3xl text-bronze-700 sm:text-4xl">{stat.value}</span>
              <span className="text-sm text-forest-800">{stat.label}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
