import Container from '../../../components/common/Container';
import SectionHeading from '../../../components/common/SectionHeading';
import { useProjects } from '../../../services/projectQueries';
import { getPublishedProjects } from '../../../services/projectsService';

/* Built from real records: an origin note (from the organisation's own
   conference briefing, "From Relief to Resilience", Sept 2026 — kept
   deliberately general rather than repeating the briefing's specific
   conflict-era detail here), plus every published project that's actually
   Completed or Ongoing. The concept proposals and construction pitches are
   all status "Planned", so they never appear here — this is a record of
   what's happened, not what's been asked for.
   Years are used only to order entries, never displayed — there are real
   gaps in the organisation's documented chronology still being confirmed.
   Reintroduce the date label once that's settled. */
export default function Timeline() {
  const { data: projects } = useProjects();

  const milestones = getPublishedProjects(projects)
    .filter((p) => p.status === 'Completed' || p.status === 'Ongoing')
    .sort((a, b) => a.year - b.year || new Date(a.createdAt) - new Date(b.createdAt));

  const entries = [
    {
      year: '1986',
      title: 'Community service begins',
      detail: "Dr. Oling Dawn Kerjew began community liaison and relief work in Northern Uganda's Lango sub-region — the grassroots foundation the organisation was later built on.",
    },
    ...milestones.map((p) => ({ year: String(p.year), title: p.title, detail: p.summary })),
  ];

  return (
    <section className="bg-surface py-20 sm:py-28">
      <Container className="flex flex-col gap-14">
        <SectionHeading eyebrow="Our story" title="How it's unfolded so far." />
        <ol className="flex flex-col">
          {entries.map((entry, i) => (
            <li key={`${entry.year}-${entry.title}`} className="relative flex gap-6">
              <div className="flex flex-col items-center">
                <span aria-hidden="true" className="mt-1.5 h-3 w-3 shrink-0 rounded-full bg-gold-500 ring-4 ring-surface" />
                {i < entries.length - 1 && <span aria-hidden="true" className="w-px flex-1 bg-ink-900/12" />}
              </div>
              <div className="pb-10">
                <p className="font-display text-xl text-forest-900">{entry.title}</p>
                {entry.detail && <p className="mt-2 max-w-[62ch] text-sm leading-relaxed text-ink-600">{entry.detail}</p>}
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
