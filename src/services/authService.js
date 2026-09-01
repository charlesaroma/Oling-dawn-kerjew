import { STORAGE_KEYS, loadJSON, saveJSON } from './jsonDataLoader';

/*
  Local gate for dashboard access — Login.jsx and ProtectedRoute (App.jsx)
  only depend on the login()/getSession()/logout() contract below, not this
  constant. Kept in sync with the real backend's seeded admin (prisma/seed.js
  in oling-dawn-kerjew-backend) so both login paths accept the same credentials.
*/
const ADMIN = {
  email: 'charlesaroma9@gmail.com',
  password: 'Dev@2026!',
  name: 'Charles Aroma',
  role: 'Software Developer',
};

export function login({ email, password }) {
  if (email.trim().toLowerCase() !== ADMIN.email || password !== ADMIN.password) {
    throw new Error('Invalid email or password.');
  }
  const session = { name: ADMIN.name, email: ADMIN.email, role: ADMIN.role };
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
