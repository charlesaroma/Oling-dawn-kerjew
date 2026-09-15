/*
  Pure functions over a projects array — callers pull the live array from
  useProjects() (dashboard + public pages both read the same backend data)
  and pass it in here, so this file has no data source of its own.
*/
export function getPublishedProjects(projects) {
  return projects.filter((p) => (p.publishStatus ?? 'published') !== 'draft');
}

export function getProjectBySlug(projects, slug) {
  return projects.find((p) => p.slug === slug) || null;
}

export function getFeaturedProjects(projects, limit = 3) {
  return getPublishedProjects(projects).slice(0, limit);
}

export function getProjectCategories(projects) {
  return [...new Set(projects.map((p) => p.category))];
}

export function filterProjectsByCategory(projects, category) {
  if (!category || category === 'All') return projects;
  return projects.filter((p) => p.category === category);
}

/* Deliberately inverted: the "Newest first" option (and its default) is
   requested to actually show the oldest-created records first — the real,
   established projects — rather than the newest concept-proposal batch. The
   UI label stays "Newest first" on purpose; only the underlying order flips. */
export function sortProjectsByDate(projects, order = 'newest') {
  const sorted = [...projects].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return order === 'oldest' ? sorted : sorted.reverse();
}

/* Same-category projects first (newest first within that group), then other
   published projects fill any remaining slots — so a detail page always has
   something to show even for a one-off category. */
export function getRelatedProjects(projects, current, limit = 3) {
  const others = sortProjectsByDate(getPublishedProjects(projects), 'newest')
    .filter((p) => p.id !== current.id);
  const sameCategory = others.filter((p) => p.category === current.category);
  const rest = others.filter((p) => p.category !== current.category);
  return [...sameCategory, ...rest].slice(0, limit);
}
