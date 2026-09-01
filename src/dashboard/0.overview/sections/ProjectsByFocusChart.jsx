import EmptyState from '../../../components/common/EmptyState';
import { CHART_COLORS } from '../../muiTheme';
import { useProjects } from '../../../services/projectQueries';
import { countBy } from '../../../utils/countBy';

export default function ProjectsByFocusChart() {
  const { data: projects } = useProjects();
  const stats = countBy(projects, 'category');
  const max = stats.length ? Math.max(...stats.map((d) => d.value)) : 0;

  return (
    <section className="rounded-2xl border border-ink-900/8 bg-white p-6 shadow-elevated">
      <h2 className="font-display text-lg text-forest-900">Projects by Focus Area</h2>
      {stats.length ? (
        <>
          <p className="mb-5 mt-1 text-sm text-ink-500">
            {projects.length} active project{projects.length === 1 ? '' : 's'} across {stats.length} focus area{stats.length === 1 ? '' : 's'}
          </p>
          <div className="space-y-5">
            {stats.map((d, i) => {
              const color = CHART_COLORS[i % CHART_COLORS.length];
              return (
                <div key={d.label}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="font-medium text-forest-900">{d.label}</span>
                    <span className="font-mono text-xs text-ink-900/60">{d.value}</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full" style={{ backgroundColor: `${color}1A` }}>
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${(d.value / max) * 100}%`, backgroundColor: color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="mt-5">
          <EmptyState title="No projects yet" message="Projects you add will break down by focus area here." />
        </div>
      )}
    </section>
  );
}
