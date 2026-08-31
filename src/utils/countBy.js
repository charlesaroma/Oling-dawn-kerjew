export function countBy(items, field) {
  const counts = {};
  items.forEach((item) => {
    const key = item[field] || 'Uncategorized';
    counts[key] = (counts[key] || 0) + 1;
  });
  return Object.entries(counts)
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value);
}
