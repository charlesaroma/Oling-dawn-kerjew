import { STORAGE_KEYS, loadJSON, saveJSON } from './jsonDataLoader';

/*
  The backend is the only authority on credentials — see AuthContext.login,
  which posts to /api/auth/login. This module only mirrors the authenticated
  user into localStorage, so the synchronous dashboard guard (ProtectedRoute
  in App.jsx) and the sidebar/header chrome can read a session on first paint,
  before AuthContext has finished revalidating the stored token.

  It deliberately holds no credentials of its own. It used to compare against a
  hardcoded email/password pair, which silently rejected every account except
  that one — including the organisation's own seeded admin.
*/
export function setSession({ name, email, role }) {
  const session = { name, email, role };
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
