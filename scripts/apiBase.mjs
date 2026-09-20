/*
  Resolves the API base URL for the build-time scripts (sitemap, prerender).

  These run in plain Node, which — unlike Vite — doesn't read .env, so a local
  `npm run build` used to fall through to a hardcoded Render hostname. That
  hostname is dead (see 9276055), so every local build quietly produced a
  sitemap with no project or post URLs in it and reported success.

  Vite's own loadEnv gives the scripts the same VITE_API_URL the app is built
  with. A real environment variable still wins, which is what Netlify sets.
  There is deliberately no hardcoded fallback: a wrong URL fails silently and
  ships a degraded build, a missing one says so.
*/
import { loadEnv } from 'vite';

export function resolveApiBase(root) {
  const fromEnv = process.env.VITE_API_URL;
  if (fromEnv) return fromEnv;
  return loadEnv('production', root, 'VITE_').VITE_API_URL || null;
}
