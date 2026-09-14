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

export function sortProjectsByDate(projects, order = 'newest') {
  const sorted = [...projects].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return order === 'oldest' ? sorted.reverse() : sorted;
}
