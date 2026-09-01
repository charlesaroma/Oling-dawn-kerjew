import { useEffect } from 'react';

const SITE_NAME = 'Oling Dawn Kerjew Projects';
const LEGAL_NAME = 'Oling Dawn Kerjew Humanitarian and Charities NGO';
const SITE_URL = 'https://olingdawnkerjewprojects.org';
const DEFAULT_IMAGE = `${SITE_URL}/construction/entebbe-health-center.jpg`;

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
*/
export function useSEO({ title, description, image, type = 'website' }) {
  useEffect(() => {
    const url = `${SITE_URL}${window.location.pathname}`;
    const fullTitle = !title || title === SITE_NAME ? SITE_NAME : `${title} — ${SITE_NAME}`;

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
