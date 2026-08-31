export function buildHighlights({ profiles, projects, galleryItems, blogPosts, team }) {
  const highlights = [];

  if (projects.length) {
    const counts = {};
    projects.forEach((p) => {
      const key = p.category || 'Uncategorized';
      counts[key] = (counts[key] || 0) + 1;
    });
    const [topLabel, topCount] = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
    const pct = Math.round((topCount / projects.length) * 100);
    highlights.push({
      icon: 'trend',
      pre: '',
      bold: topLabel,
      post: ` leads all focus areas, accounting for ${pct}% of active projects.`,
    });
  }

  const libraryTotal = projects.length + galleryItems.length + blogPosts.length;
  if (libraryTotal) {
    highlights.push({
      icon: 'library',
      pre: 'The content library holds ',
      bold: `${libraryTotal} published item${libraryTotal === 1 ? '' : 's'}`,
      post: ' across projects, gallery, and blog.',
    });
  }

  if (!profiles.length && !team.length) {
    highlights.push({
      icon: 'pending',
      pre: '',
      bold: 'Team and profile registration',
      post: ' are still empty — first onboarding is pending.',
    });
  } else {
    const parts = [];
    if (profiles.length) parts.push(`${profiles.length} profile${profiles.length === 1 ? '' : 's'} registered`);
    if (team.length) parts.push(`${team.length} team member${team.length === 1 ? '' : 's'} onboarded`);
    highlights.push({
      icon: 'people',
      pre: '',
      bold: parts.join(' and '),
      post: ' so far.',
    });
  }

  return highlights;
}
