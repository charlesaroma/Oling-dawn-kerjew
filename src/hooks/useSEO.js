import { useEffect } from 'react';

import { LEGAL_NAME, SITE_URL, DEFAULT_IMAGE, buildTitle } from '../data/seoRoutes';

function setMeta(attr, value, content) {
  let tag = document.querySelector(`meta[${attr}="${value}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, value);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function setCanonical(href) {
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

/*
  Lightweight, dependency-free per-page SEO. No react-helmet: this is a
  client-rendered SPA, so these tags matter for the browser tab, social-share
  previews and crawlers that execute JS — not for a server-rendered <head>.

  Canonical URLs are always built against the production origin rather than
  window.location, so Netlify deploy previews and localhost point search
  engines at the real page instead of competing with it.

  The same metadata is baked into a static HTML file per route at build time
  by scripts/prerender-head.mjs — both read src/data/seoRoutes.js, so the
  tags a crawler sees and the tags this hook sets are the same tags.
*/
export function useSEO({ title, description, image, type = 'website' }) {
  useEffect(() => {
    const url = `${SITE_URL}${window.location.pathname}`;
    const fullTitle = buildTitle(title);

    document.title = fullTitle;
    setCanonical(url);

    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:site_name', LEGAL_NAME);
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:locale', 'en_UG');
    setMeta('property', 'og:image', image || DEFAULT_IMAGE);

    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:image', image || DEFAULT_IMAGE);

    if (description) {
      setMeta('name', 'description', description);
      setMeta('property', 'og:description', description);
      setMeta('name', 'twitter:description', description);
    }
  }, [title, description, image, type]);
}
