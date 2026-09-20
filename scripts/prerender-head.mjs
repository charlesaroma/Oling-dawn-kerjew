/*
  Bakes a real <head> into a static HTML file per route, after `vite build`.

  useSEO() only runs once React has hydrated, so every crawler and link
  unfurler that doesn't execute JS — Slack, WhatsApp, iMessage, X, LinkedIn,
  Facebook, most RSS and preview services — saw index.html's generic head on
  every URL. Each route now gets its own dist/<route>/index.html carrying the
  right title, description, canonical and og/twitter tags. Netlify serves a
  matching static file before it falls through to the `/*  /index.html  200`
  SPA rule, so the routing behaviour is unchanged; only the bytes a
  non-JS client sees are different.

  This is head-only prerendering, not SSG: the <body> is still the empty SPA
  root and the page content is still rendered client-side. That's the part
  that actually mattered here — search engines do execute JS, unfurlers never
  do — and it keeps the build free of an SSR entry point.

  Route metadata comes from src/data/seoRoutes.js, the same module useSEO()
  reads. Project and post pages are fetched from the API exactly as
  generate-sitemap.mjs does; if the API is unreachable the static routes are
  still written and the build continues.
*/
import { writeFileSync, readFileSync, mkdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

import { ROUTE_SEO, SITE_URL, LEGAL_NAME, DEFAULT_IMAGE, buildTitle } from '../src/data/seoRoutes.js';
import { resolveApiBase } from './apiBase.mjs';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const API = resolveApiBase(ROOT);

const isPublished = (r) => (r.publishStatus ?? 'published') === 'published';

const escape = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/* Absolute URLs only: a relative og:image is ignored by most unfurlers. */
function absolute(image) {
  if (!image) return DEFAULT_IMAGE;
  if (/^https?:\/\//.test(image)) return image;
  return `${SITE_URL}${image.startsWith('/') ? '' : '/'}${image}`;
}

function headFor(route, { title, description, image, type = 'website' }) {
  const fullTitle = buildTitle(title);
  const url = `${SITE_URL}${route === '/' ? '/' : route}`;
  const img = absolute(image);
  const tags = [
    `<title>${escape(fullTitle)}</title>`,
    `<link rel="canonical" href="${escape(url)}" />`,
    `<meta name="description" content="${escape(description)}" />`,
    `<meta property="og:title" content="${escape(fullTitle)}" />`,
    `<meta property="og:description" content="${escape(description)}" />`,
    `<meta property="og:site_name" content="${escape(LEGAL_NAME)}" />`,
    `<meta property="og:type" content="${escape(type)}" />`,
    `<meta property="og:url" content="${escape(url)}" />`,
    `<meta property="og:locale" content="en_UG" />`,
    `<meta property="og:image" content="${escape(img)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escape(fullTitle)}" />`,
    `<meta name="twitter:description" content="${escape(description)}" />`,
    `<meta name="twitter:image" content="${escape(img)}" />`,
  ];
  return tags.map((t) => `    ${t}`).join('\n');
}

/*
  Strip the tags the template already carries for these properties, so each
  page ends up with exactly one of each rather than the generic one followed
  by the specific one.
*/
const STRIP = [
  /[ \t]*<title>[\s\S]*?<\/title>\n?/g,
  /[ \t]*<link rel="canonical"[^>]*>\n?/g,
  /[ \t]*<meta name="description"[^>]*>\n?/g,
  /[ \t]*<meta property="og:(?:type|site_name|locale)"[^>]*>\n?/g,
  /[ \t]*<meta name="twitter:card"[^>]*>\n?/g,
];

function render(template, route, meta) {
  let html = template;
  for (const re of STRIP) html = html.replace(re, '');
  return html.replace('</head>', `${headFor(route, meta)}\n  </head>`);
}

function write(route, html) {
  const dir = route === '/' ? DIST : path.join(DIST, route);
  mkdirSync(dir, { recursive: true });
  writeFileSync(path.join(dir, 'index.html'), html);
}

const templatePath = path.join(DIST, 'index.html');
if (!existsSync(templatePath)) {
  console.warn('prerender: skipped — dist/index.html not found');
  process.exit(0);
}
const template = readFileSync(templatePath, 'utf8');

async function get(endpoint) {
  const res = await fetch(`${API}${endpoint}`, { signal: AbortSignal.timeout(15000) });
  if (!res.ok) throw new Error(`${endpoint} → ${res.status}`);
  return res.json();
}

const routes = Object.entries(ROUTE_SEO).map(([route, meta]) => [route, meta]);

try {
  if (!API) throw new Error('no VITE_API_URL — set it in .env or the build environment');
  const [projects, posts] = await Promise.all([get('/api/projects'), get('/api/blog')]);
  routes.push(
    ...projects.filter(isPublished).map((p) => [
      `/projects/${p.slug}`,
      { title: p.title, description: p.summary, image: p.coverImage, type: 'article' },
    ]),
    ...posts.filter(isPublished).map((p) => [
      `/blog/${p.slug}`,
      { title: p.title, description: p.excerpt, image: p.coverImage, type: 'article' },
    ]),
  );
} catch (err) {
  console.warn(`prerender: content routes skipped — ${err.message}`);
}

for (const [route, meta] of routes) write(route, render(template, route, meta));

console.log(
  `prerender: ${routes.length} routes (${Object.keys(ROUTE_SEO).length} static, ${routes.length - Object.keys(ROUTE_SEO).length} content)`,
);
