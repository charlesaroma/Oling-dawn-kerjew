import { DATA } from './jsonDataLoader';
import { getProjectCategories } from './projectsService';

/*
  What a donor is actually asking is "what did this change?" — families
  housed, students supported, clinics open. "Initiatives: 3, Focus areas: 4"
  answers a different question: how many rows the project table has. Those
  outcome figures aren't derivable from any record we hold (a project row
  doesn't know how many households moved in), so they're carried as a short
  hand-maintained list in src/data/siteConfig.json:

    "impactStats": [
      { "value": "48",  "label": "Families housed" },
      { "value": "310", "label": "Students supported" },
      { "value": "2",   "label": "Clinics open" }
    ]

  Edited there and deployed like any other content change — no backend
  record, because these are periodically-verified programme totals rather
  than something the dashboard should let anyone revise on a whim.

  While that list is empty the derived counts below stand in, so the section
  never renders blank. `value` is a string on purpose: "2,400+" and "48" both
  need to be typesettable.
*/
export function getImpactStats(projects, limit) {
  const authored = DATA.siteConfig.impactStats;
  if (Array.isArray(authored) && authored.length > 0) return authored.slice(0, limit);

  const districts = new Set(
    projects.map((p) => p.location?.split(',')[0].trim()).filter(Boolean),
  );

  /* Counts every initiative the organisation runs, not only the ones with a
     published page — a project in draft is still real work on the ground. */
  const derived = [
    { value: String(projects.length), label: 'Initiatives' },
    { value: String(getProjectCategories(projects).length), label: 'Focus areas' },
    { value: String(districts.size), label: 'Districts reached' },
    { value: String(projects.filter((p) => p.status === 'Completed').length), label: 'Completed' },
  ];

  return derived.slice(0, limit);
}
