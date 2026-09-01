import siteConfig from '../data/siteConfig.json';
import pillars from '../data/pillars.json';

/*
  Static, code-owned content — org info/nav/contact details (siteConfig)
  and the mission pillars (pillars) aren't backend-managed; they're edited
  here directly and deployed like any other code change. Everything else
  (profiles, projects, blog, team, gallery) now lives in the real backend —
  see src/services/*Queries.js.
*/
export const DATA = {
  siteConfig,
  pillars,
};

export const STORAGE_KEYS = {
  session: 'odkhc_session_v1',
};

/*
  Generic localStorage helpers backing the local dashboard-access session
  gate (authService.js).
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
