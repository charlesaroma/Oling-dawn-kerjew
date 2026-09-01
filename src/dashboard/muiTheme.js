import { createTheme } from '@mui/material/styles';

/*
  Minimal MUI theme so @mui/x-charts matches the rest of the dashboard
  (Bricolage Grotesque body font, Editorial Earth palette) instead of MUI's
  default Roboto + blue. Scoped to wherever charts are used, not the whole
  app — the rest of the dashboard is plain Tailwind.
*/
const muiTheme = createTheme({
  typography: {
    fontFamily: '"Bricolage Grotesque", ui-sans-serif, system-ui, sans-serif',
  },
  palette: {
    primary: { main: '#DFA126' },
    secondary: { main: '#1E4032' },
  },
});

export default muiTheme;

/*
  Ordered so adjacent series stay distinguishable by lightness as well as hue —
  a viewer who can't separate the ochre from the clay still reads two different
  values. Drawn from the palette's four scales rather than an arbitrary ramp.
*/
export const CHART_COLORS = ['#DFA126', '#1E4032', '#A84420', '#5D9C7C', '#8A371A', '#EEC65F'];

// Shared axis/legend text styling so every chart section looks consistent
// without each one redefining the same sx object. ink-900 at low alpha.
export const CHART_AXIS_SX = {
  '& .MuiChartsAxis-tickLabel': { fill: 'rgb(15 22 17 / 0.55)', fontSize: 12 },
  '& .MuiChartsAxis-line, & .MuiChartsAxis-tick': { stroke: 'rgb(15 22 17 / 0.14)' },
  '& .MuiChartsLegend-label': { fill: 'rgb(15 22 17 / 0.7)' },
};
