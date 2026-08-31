export function buildRegistrationsTrend(profiles) {
  const dates = profiles
    .filter((p) => p.registeredDate)
    .map((p) => new Date(p.registeredDate))
    .filter((d) => !Number.isNaN(d.getTime()));

  if (!dates.length) return [];

  const monthKey = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
  const monthLabel = (year, month) =>
    new Date(year, month, 1).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

  const counts = {};
  dates.forEach((d) => {
    const key = monthKey(d);
    counts[key] = (counts[key] || 0) + 1;
  });

  const earliest = dates.reduce((a, b) => (a < b ? a : b));
  const start = new Date(earliest.getFullYear(), earliest.getMonth(), 1);
  const end = new Date();
  end.setDate(1);

  const months = [];
  const cursor = new Date(start);
  while (cursor <= end) {
    months.push({ year: cursor.getFullYear(), month: cursor.getMonth() });
    cursor.setMonth(cursor.getMonth() + 1);
  }

  let cumulative = 0;
  return months.map(({ year, month }) => {
    const key = `${year}-${String(month + 1).padStart(2, '0')}`;
    cumulative += counts[key] || 0;
    return { month: monthLabel(year, month), cumulative };
  });
}
