import { ThemeProvider } from '@mui/material/styles';
import { PieChart } from '@mui/x-charts/PieChart';
import EmptyState from '../../../components/common/EmptyState';
import muiTheme, { CHART_COLORS } from '../../muiTheme';
import { useProjects } from '../../../services/projectQueries';
import { useMedia } from '../../../services/mediaQueries';
import { useBlogPosts } from '../../../services/blogQueries';

const SIZE = 200;

export default function ContentLibraryChart() {
  const { data: projects } = useProjects();
  const { data: galleryItems } = useMedia();
  const { data: blogPosts } = useBlogPosts();

  const items = [
    { label: 'Projects', value: projects.length, color: CHART_COLORS[3] },
    { label: 'Gallery Items', value: galleryItems.length, color: CHART_COLORS[2] },
    { label: 'Blog Posts', value: blogPosts.length, color: CHART_COLORS[1] },
  ];
  const total = items.reduce((sum, i) => sum + i.value, 0);
  const categoriesWithItems = items.filter((i) => i.value > 0).length;

  return (
    <section className="rounded-2xl border border-ink-900/8 bg-white p-6 shadow-elevated">
      <h2 className="font-display text-lg text-forest-900">Content Library Mix</h2>
      {total ? (
        <>
          <p className="mb-5 mt-1 text-sm text-ink-500">
            {total} published item{total === 1 ? '' : 's'} across {categoriesWithItems} categor{categoriesWithItems === 1 ? 'y' : 'ies'}
          </p>
          <div className="flex flex-wrap items-center gap-8">
            <div className="relative shrink-0" style={{ width: SIZE, height: SIZE }}>
              <ThemeProvider theme={muiTheme}>
                <PieChart
                  series={[{
                    data: items.filter((i) => i.value > 0).map((i) => ({ id: i.label, value: i.value, color: i.color })),
                    innerRadius: 62,
                    paddingAngle: 2,
                    cornerRadius: 4,
                  }]}
                  width={SIZE}
                  height={SIZE}
                  hideLegend
                />
              </ThemeProvider>
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-mono text-2xl text-forest-900">{total}</span>
                <span className="text-[10px] uppercase tracking-widest text-ink-500">Items</span>
              </div>
            </div>
            <div className="min-w-[160px] flex-1 space-y-3">
              {items.map((i) => (
                <div key={i.label} className="flex items-center justify-between gap-3 text-sm">
                  <span className="flex items-center gap-2 text-ink-900/70">
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: i.color }} />
                    {i.label}
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="font-mono text-xs text-ink-500">{Math.round((i.value / total) * 100)}%</span>
                    <span className="w-6 text-right font-semibold text-forest-900">{i.value}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="mt-5">
          <EmptyState title="No content published yet" message="Projects, gallery items, and posts will show up here once added." />
        </div>
      )}
    </section>
  );
}
