import { DATA } from './jsonDataLoader';

export function getAllProjects() {
  return DATA.projects;
}

export function getProjectBySlug(slug) {
  return DATA.projects.find((p) => p.slug === slug) || null;
}

export function getFeaturedProjects(limit = 3) {
  return DATA.projects.slice(0, limit);
}

export function getProjectCategories() {
  return [...new Set(DATA.projects.map((p) => p.category))];
}

export function filterProjectsByCategory(category) {
  if (!category || category === 'All') return DATA.projects;
  return DATA.projects.filter((p) => p.category === category);
}
