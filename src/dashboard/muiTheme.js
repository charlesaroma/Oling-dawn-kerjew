import { createTheme } from '@mui/material/styles';

/*
  Minimal MUI theme so @mui/x-charts matches the rest of the dashboard
  (Public Sans body font, forest/gold/navy palette) instead of MUI's
  default Roboto + blue. Scoped to wherever charts are used, not the
  whole app — the rest of the dashboard is plain Tailwind.
*/
const muiTheme = createTheme({
  typography: {
    fontFamily: '"Public Sans", ui-sans-serif, system-ui, sans-serif',
  },
  palette: {
    primary: { main: '#E5A526' },
    secondary: { main: '#2F5730' },
  },
});

export default muiTheme;

export const CHART_COLORS = ['#E5A526', '#2F5730', '#A15F30', '#2F4C6E', '#C6871A', '#4A8548'];

// Shared axis/legend text styling so every chart section looks consistent
// without each one redefining the same sx object.
export const CHART_AXIS_SX = {
  '& .MuiChartsAxis-tickLabel': { fill: 'rgb(11 20 31 / 0.6)', fontSize: 12 },
  '& .MuiChartsAxis-line, & .MuiChartsAxis-tick': { stroke: 'rgb(11 20 31 / 0.15)' },
  '& .MuiChartsLegend-label': { fill: 'rgb(11 20 31 / 0.7)' },
};
