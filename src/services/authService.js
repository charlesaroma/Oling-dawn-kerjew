import { STORAGE_KEYS, loadJSON, saveJSON } from './jsonDataLoader';

/*
  No backend yet — this is a single hardcoded demo admin so the dashboard
  can be built and used today. Replace with a real auth call once a
  backend exists; Login.jsx and ProtectedRoute (App.jsx) only depend on
  the login()/getSession()/logout() contract below, not this constant.
*/
const DEMO_ADMIN = { email: 'admin@odkhc.local', password: 'odkhc-admin-2026', name: 'Oling Dawn Kerjew Projects Admin' };

export function login({ email, password }) {
  if (email.trim().toLowerCase() !== DEMO_ADMIN.email || password !== DEMO_ADMIN.password) {
    throw new Error('Invalid email or password.');
  }
  const session = { name: DEMO_ADMIN.name, email: DEMO_ADMIN.email, role: 'admin' };
  saveJSON(STORAGE_KEYS.session, session);
  return session;
}

export function getSession() {
  return loadJSON(STORAGE_KEYS.session, null);
}

export function logout() {
  try {
    window.localStorage.removeItem(STORAGE_KEYS.session);
    window.localStorage.removeItem('accessToken');
  } catch {
    /* noop */
  }
}
