/*
  Builds public/sitemap.xml from what is actually published, rather than a
  hand-maintained list that drifts every time someone edits content in the
  dashboard. Only published projects and posts are included — drafts render a
  redirect, so advertising them to crawlers is worse than omitting them.

  If the API is unreachable at build time (a cold Render instance, say) the
  existing sitemap is left untouched and the build continues.
*/
import { writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const SITE = 'https://olingdawnkerjewprojects.org';
const API = process.env.VITE_API_URL || 'https://oling-dawn-kerjew-projects-backend.onrender.com';
const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'public', 'sitemap.xml');

const STATIC = [
  { path: '/', freq: 'weekly', pri: '1.0' },
  { path: '/about', freq: 'monthly', pri: '0.8' },
  { path: '/construction', freq: 'monthly', pri: '0.9' },
  { path: '/projects', freq: 'weekly', pri: '0.9' },
  { path: '/gallery', freq: 'weekly', pri: '0.6' },
  { path: '/blog', freq: 'weekly', pri: '0.7' },
  { path: '/contact', freq: 'monthly', pri: '0.7' },
];

const isPublished = (r) => (r.publishStatus ?? 'published') === 'published';

async function get(endpoint) {
  const res = await fetch(`${API}${endpoint}`, { signal: AbortSignal.timeout(15000) });
  if (!res.ok) throw new Error(`${endpoint} → ${res.status}`);
  return res.json();
}

const url = ({ path: p, freq, pri, lastmod }) =>
  `  <url>\n    <loc>${SITE}${p}</loc>\n` +
  (lastmod ? `    <lastmod>${lastmod}</lastmod>\n` : '') +
  `    <changefreq>${freq}</changefreq>\n    <priority>${pri}</priority>\n  </url>`;

try {
  const [projects, posts] = await Promise.all([get('/api/projects'), get('/api/blog')]);

  const entries = [
    ...STATIC,
    ...projects.filter(isPublished).map((p) => ({
      path: `/projects/${p.slug}`, freq: 'monthly', pri: '0.7',
      lastmod: p.updatedAt?.slice(0, 10),
    })),
    ...posts.filter(isPublished).map((p) => ({
      path: `/blog/${p.slug}`, freq: 'yearly', pri: '0.6',
      lastmod: p.updatedAt?.slice(0, 10),
    })),
  ];

  writeFileSync(OUT,
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.map(url).join('\n')}\n</urlset>\n`);
  console.log(`sitemap: ${entries.length} URLs (${STATIC.length} static, ${entries.length - STATIC.length} content)`);
} catch (err) {
  console.warn(`sitemap: skipped — ${err.message}`);
  if (!existsSync(OUT)) process.exitCode = 0;
}
