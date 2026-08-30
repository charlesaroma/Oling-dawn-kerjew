/*
  Pure functions over a projects array — callers pull the live array from
  useAdmin() (dashboard + public pages both read the same AdminContext
  store) and pass it in here, so this file has no data source of its own.
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
