import siteConfig from '../data/siteConfig.json';
import projects from '../data/projects.json';
import blogPosts from '../data/blogPosts.json';
import galleryItems from '../data/galleryItems.json';
import team from '../data/team.json';

/*
  Single source of truth for site content. Every page reads through the
  service functions in this folder rather than importing data/*.json
  directly — when a real backend is ready, only this file (and the
  functions below) need to change to fetch from an API instead.
*/
export const DATA = {
  siteConfig,
  projects,
  blogPosts,
  galleryItems,
  team,
};
