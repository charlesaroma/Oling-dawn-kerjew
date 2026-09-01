import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Container from '../../../components/common/Container';
import { useProjects } from '../../../services/projectQueries';
import { DATA } from '../../../services/jsonDataLoader';
import { getPublishedProjects } from '../../../services/projectsService';

const IK = 'https://ik.imagekit.io/u8h0uidte/Oling-Dawn-Kerjew-';

/* Field photography for the strip along the base of the hero. Requested at
   grid size with ImageKit transforms rather than full resolution — these are
   ~180px tall on screen and were 1.5MB originals. */
const STRIP = [
  { src: `${IK}/distributing_agricultural_tools_hoes_MG_7659.JPG?tr=w-560,h-420,fo-auto,q-70`, alt: 'Distributing agricultural tools to farming households' },
  { src: `${IK}/NGO_secondary_school_20250811_120553.jpg?tr=w-560,h-420,fo-auto,q-70`, alt: 'Students at a secondary school we support' },
  { src: `${IK}/distributing_scholarstic_materials_to_under_priviledged_students_20250811_121004.jpg?tr=w-560,h-420,fo-auto,q-70`, alt: 'Scholastic materials handed to students in Oyam District' },
  { src: `${IK}/ladies_hairdressing_training_20250812_123723.jpg?tr=w-560,h-420,fo-auto,q-70`, alt: "Women's vocational training in hairdressing" },
];

/* The motto is the design here, so it gets typeset rather than printed: the
   clause after the first comma carries the emphasis. Falls back to plain
   rendering if the tagline is ever edited to something without a comma. */
function Motto({ text }) {
  const comma = text.indexOf(',');
  if (comma === -1) return text;
  return (
    <>
      {text.slice(0, comma + 1)}{' '}
      <em className="italic text-gold-400">{text.slice(comma + 1).trim()}</em>
    </>
  );
}

export default function Hero() {
  const { data: projects } = useProjects();
  const { tagline, description } = DATA.siteConfig;
  const activeCount = getPublishedProjects(projects).length;

  return (
    <section className="relative overflow-hidden bg-ink-900">
      {/* Ambient warmth off the top-right, so the ground isn't a flat black slab */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[10%] -top-[30%] h-[min(70vw,680px)] w-[min(70vw,680px)] rounded-full opacity-70"
        style={{ background: 'radial-gradient(circle, rgba(223,161,38,0.16) 0%, transparent 66%)' }}
      />

      <Container className="relative">
        <div className="flex min-h-[70vh] flex-col justify-center py-20 lg:py-28">
          <p className="mb-6 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-bronze-400">
            Registered NGO · Oyam District, Northern Uganda
          </p>

          <h1 className="max-w-[13ch] font-display text-[clamp(2.6rem,8vw,6.5rem)] font-normal leading-[0.94] tracking-[-0.025em] text-surface text-balance">
            <Motto text={tagline} />
          </h1>

          <div className="mt-10 flex flex-wrap items-end gap-x-12 gap-y-8">
            <p className="max-w-[42ch] text-[15px] leading-relaxed text-surface/60 sm:text-base">
              {description}
            </p>
            <Link
              to="/projects"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-gold-500 px-7 py-3.5 text-sm font-semibold text-ink-900 transition-all duration-200 hover:-translate-y-0.5 hover:bg-gold-400"
            >
              See what we've built <ArrowRight size={16} />
            </Link>
          </div>

          <dl className="mt-14 flex flex-wrap gap-x-14 gap-y-6">
            {[
              [activeCount || '5', 'Active initiatives'],
              ['2025', 'Registered'],
              ['Oyam', 'Home district'],
            ].map(([value, label]) => (
              <div key={label}>
                <dd className="font-display text-3xl leading-none text-surface tabular-nums">{value}</dd>
                <dt className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-surface/40">{label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </Container>

      {/* Kitenge band — woven-textile stripe carried over from the earth palette,
          doing real work as the rule between the type block and the photographs. */}
      <div
        aria-hidden="true"
        className="relative h-2"
        style={{
          background:
            'repeating-linear-gradient(90deg, var(--color-gold-500) 0 28px, var(--color-bronze-600) 28px 56px, var(--color-forest-700) 56px 84px)',
        }}
      />

      {/* Photographs sit desaturated and warm-toned so the words stay dominant */}
      <div className="relative grid grid-cols-2 sm:grid-cols-4">
        {STRIP.map((photo) => (
          <img
            key={photo.src}
            src={photo.src}
            alt={photo.alt}
            loading="lazy"
            width={560}
            height={420}
            className="h-28 w-full object-cover opacity-55 saturate-[0.35] transition-all duration-500 hover:opacity-90 hover:saturate-100 sm:h-36"
          />
        ))}
      </div>
    </section>
  );
}
