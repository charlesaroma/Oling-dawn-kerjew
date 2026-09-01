import { ThemeProvider } from '@mui/material/styles';
import { LineChart } from '@mui/x-charts/LineChart';
import EmptyState from '../../../components/common/EmptyState';
import muiTheme, { CHART_COLORS, CHART_AXIS_SX } from '../../muiTheme';
import { useProfiles } from '../../../services/profileQueries';
import { buildRegistrationsTrend } from '../../../utils/registrationsTrend';

export default function RegistrationsTrendChart() {
  const { data: profiles } = useProfiles();
  const trend = buildRegistrationsTrend(profiles);

  return (
    <section className="mt-10 rounded-2xl border border-navy-900/8 bg-white p-6 shadow-elevated">
      <h2 className="mb-5 font-display text-lg text-forest-900">Registrations Over Time</h2>
      {trend.length ? (
        <ThemeProvider theme={muiTheme}>
          <LineChart
            dataset={trend}
            xAxis={[{ scaleType: 'point', dataKey: 'month', height: 28 }]}
            yAxis={[{ width: 40, tickMinStep: 1 }]}
            series={[{ dataKey: 'cumulative', label: 'Total profiles', color: CHART_COLORS[1], showMark: true, area: true }]}
            height={260}
            margin={{ right: 40 }}
            grid={{ horizontal: true }}
            sx={CHART_AXIS_SX}
          />
        </ThemeProvider>
      ) : (
        <EmptyState title="No registrations yet." message="A trend line will appear once profiles are registered." />
      )}
    </section>
  );
}
