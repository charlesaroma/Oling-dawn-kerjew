import { useEffect } from 'react';

const SITE_NAME = 'Oling Dawn Kerjew Projects';

function setMetaTag(attr, value, content) {
  let tag = document.querySelector(`meta[${attr}="${value}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, value);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

/*
  Lightweight, dependency-free per-page SEO — sets the document title and a
  handful of meta tags directly. No react-helmet: this is a client-rendered
  SPA, so these tags matter for the browser tab/social-share previews and
  whatever a crawler executes JS for, not for a server-rendered <head>.
*/
export function useSEO({ title, description, image }) {
  useEffect(() => {
    if (title) {
      document.title = title === SITE_NAME ? title : `${title} — ${SITE_NAME}`;
      setMetaTag('property', 'og:title', document.title);
    }
    if (description) {
      setMetaTag('name', 'description', description);
      setMetaTag('property', 'og:description', description);
    }
    if (image) {
      setMetaTag('property', 'og:image', image);
    }
  }, [title, description, image]);
}
