export function getGalleryItemsByProject(items, slug) {
  return items.filter((item) => item.projectSlug === slug);
}
