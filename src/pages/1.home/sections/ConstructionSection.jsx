import { Hospital, School, Route, Waypoints, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from '../../../components/common/Container';
import SectionHeading from '../../../components/common/SectionHeading';

/* Low-cost construction is the work that draws the most interest, so it gets
   its own section rather than being one line in the mission paragraph.
   Deliberately typographic: the organisation has no construction photography
   in its media library yet, and borrowed or stock imagery would misrepresent
   what has actually been built. */
const BUILDS = [
  { icon: Hospital, label: 'Hospitals & clinics', note: 'Health facilities close enough to reach on foot.' },
  { icon: School, label: 'Schools', note: 'Classrooms, roofing and sanitation that last past one rainy season.' },
  { icon: Route, label: 'Roads', note: 'Access routes that keep produce and patients moving year-round.' },
  { icon: Waypoints, label: 'Bridges', note: 'Crossings that stop communities being cut off in the wet season.' },
];

export default function ConstructionSection() {
  return (
    <section className="border-y border-surface/10 bg-ink-900 py-20 sm:py-28">
      <Container className="flex flex-col gap-14">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Low-cost construction"
            title="Built for a fraction of what it usually costs."
            subtitle="Non-profit construction is the core of our Projects work: hospitals, schools, roads and bridges delivered without the margins that put this infrastructure out of reach for the communities that need it."
            tone="dark"
          />
          <Link
            to="/projects"
            className="group flex shrink-0 items-center gap-2 border-b border-gold-500/40 pb-1 text-sm font-semibold text-gold-400 transition-colors hover:border-gold-500"
          >
            See the projects
            <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-surface/12 bg-surface/12 sm:grid-cols-2 lg:grid-cols-4">
          {BUILDS.map(({ icon: Icon, label, note }) => (
            <div key={label} className="group flex flex-col gap-4 bg-ink-900 p-8 transition-colors duration-300 hover:bg-ink-800">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-surface/15 text-gold-400 transition-colors duration-300 group-hover:border-gold-500/50">
                <Icon size={18} strokeWidth={1.6} />
              </span>
              <p className="font-display text-xl leading-snug text-surface">{label}</p>
              <p className="text-sm leading-relaxed text-surface/55">{note}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
