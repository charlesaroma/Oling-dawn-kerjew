function byDateDesc(a, b) {
  return new Date(b.publishedAt) - new Date(a.publishedAt);
}

export function getPublishedPosts(posts) {
  return posts.filter((p) => (p.publishStatus ?? 'published') !== 'draft').sort(byDateDesc);
}

export function getAllPostsSorted(posts) {
  return [...posts].sort(byDateDesc);
}

export function getPostBySlug(posts, slug) {
  return posts.find((p) => p.slug === slug) || null;
}

export function getRecentPosts(posts, limit = 3) {
  return getPublishedPosts(posts).slice(0, limit);
}
