import siteConfig from '../data/siteConfig.json';
import projects from '../data/projects.json';
import blogPosts from '../data/blogPosts.json';
import galleryItems from '../data/galleryItems.json';
import team from '../data/team.json';
import pillars from '../data/pillars.json';
import profiles from '../data/profiles.json';

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
  pillars,
  profiles,
};

export const STORAGE_KEYS = {
  session: 'odkhc_session_v1',
  admin: 'odkhc_admin_v1',
};

/*
  No backend yet — the admin dashboard persists its mutable state (auth
  session, registered profiles) to localStorage instead. Swap these for
  real API calls once a backend exists; callers (authService.js,
  AdminContext.jsx) don't need to change.
*/
export function loadJSON(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return fallback;
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

export function saveJSON(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable — run in-memory */
  }
}
