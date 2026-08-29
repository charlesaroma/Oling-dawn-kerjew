import { DATA } from './jsonDataLoader';

function byDateDesc(a, b) {
  return new Date(b.publishedAt) - new Date(a.publishedAt);
}

export function getAllPosts() {
  return [...DATA.blogPosts].sort(byDateDesc);
}

export function getPostBySlug(slug) {
  return DATA.blogPosts.find((p) => p.slug === slug) || null;
}

export function getRecentPosts(limit = 3) {
  return getAllPosts().slice(0, limit);
}
