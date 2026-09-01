import { Users } from 'lucide-react';
import { ThemeProvider } from '@mui/material/styles';
import { PieChart } from '@mui/x-charts/PieChart';
import EmptyState from '../../../components/common/EmptyState';
import muiTheme, { CHART_COLORS, CHART_AXIS_SX } from '../../muiTheme';
import { useProfiles } from '../../../services/profileQueries';
import { countBy } from '../../../utils/countBy';

export default function ProfilesByCategoryChart() {
  const { data: profiles } = useProfiles();
  const stats = countBy(profiles, 'category');

  return (
    <section className="rounded-2xl border border-ink-900/8 bg-white p-6 shadow-elevated">
      <h2 className="font-display text-lg text-forest-900">Profiles by Category</h2>
      {stats.length ? (
        <>
          <p className="mb-5 mt-1 text-sm text-ink-500">
            {profiles.length} profile{profiles.length === 1 ? '' : 's'} across {stats.length} categor{stats.length === 1 ? 'y' : 'ies'}
          </p>
          <ThemeProvider theme={muiTheme}>
            <PieChart
              series={[{
                data: stats.map((d, i) => ({ id: d.label, value: d.value, label: d.label, color: CHART_COLORS[i % CHART_COLORS.length] })),
                innerRadius: 55,
                paddingAngle: 2,
                cornerRadius: 4,
              }]}
              height={260}
              sx={CHART_AXIS_SX}
            />
          </ThemeProvider>
        </>
      ) : (
        <div className="mt-5">
          <EmptyState
            title="No profiles registered yet"
            message="Once people submit profiles, their categories will break down here."
            icon={Users}
            skeleton
          />
        </div>
      )}
    </section>
  );
}
