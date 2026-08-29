import { DATA } from './jsonDataLoader';

export function getAllGalleryItems() {
  return DATA.galleryItems;
}

export function getGalleryItemsByProject(slug) {
  return DATA.galleryItems.filter((item) => item.projectSlug === slug);
}
