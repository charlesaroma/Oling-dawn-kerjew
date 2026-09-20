/*
  Single source of truth for per-route <head> metadata. Two consumers read
  it, and they must never drift apart:

    • src/hooks/useSEO.js        — sets the tags in the browser after hydration
    • scripts/prerender-head.mjs — bakes the same tags into a static HTML file
                                   per route at build time, for crawlers and
                                   link unfurlers that never run the JS

  The build script is plain Node, so this file stays free of React, JSX and
  JSON imports: literals only.
*/
export const SITE_NAME = 'Oling Dawn Kerjew Projects';
export const LEGAL_NAME = 'Oling Dawn Kerjew Humanitarian and Charities NGO';
export const SITE_URL = 'https://olingdawnkerjewprojects.org';
export const DEFAULT_IMAGE = `${SITE_URL}/construction/entebbe-health-center.jpg`;

/*
  Most pages pass a bare title ("About Us") and get the site name appended.
  The homepage leads with the org name and carries its own descriptive tail,
  so it is already complete — appending would give it the site name twice.
*/
export function buildTitle(title) {
  if (!title) return SITE_NAME;
  return title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
}

export const ROUTE_SEO = {
  '/': {
    title: `${SITE_NAME} | Humanitarian NGO in Northern Uganda`,
    description:
      "A registered Ugandan NGO serving Oyam District and Northern Uganda through low-cost construction, education, healthcare, women's empowerment and community development.",
  },
  '/about': {
    title: 'About Us',
    description:
      'Oling Dawn Kerjew Humanitarian and Charities NGO: why we serve, and who we serve alongside. Mission, focus areas and team across Uganda.',
  },
  '/construction': {
    title: 'Low-Cost Construction',
    description:
      'Instead of subsidising rent for ever, we build the thing itself: refugee housing, health facilities, schools, roads and drainage at non-profit cost, using prefabricated modular concrete.',
    image: `${SITE_URL}/construction/entebbe-health-center.jpg`,
  },
  '/projects': {
    title: 'Our Projects',
    description:
      'Construction, education, healthcare, and community initiatives carried out alongside the people Oling Dawn Kerjew Projects serves.',
  },
  '/gallery': {
    title: 'Gallery',
    description: 'Photos and videos from across Oling Dawn Kerjew Projects sites in Uganda.',
  },
  '/blog': {
    title: 'Blog & Articles',
    description: 'Updates, stories, and lessons from the field. News from Oling Dawn Kerjew Projects.',
  },
  '/contact': {
    title: 'Contact Us',
    description:
      "Questions, partnerships, or ways to get involved with Oling Dawn Kerjew Projects. We'd love to hear from you.",
  },
};
