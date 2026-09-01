import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Container from '../../../components/common/Container';
import { useProjects } from '../../../services/projectQueries';
import { DATA } from '../../../services/jsonDataLoader';

const IK = 'https://ik.imagekit.io/u8h0uidte/Oling-Dawn-Kerjew-';

const SLIDES = [
  { src: `${IK}/distributing_agricultural_tools_hoes_MG_7659.JPG?tr=w-1200,q-72`, alt: 'Distributing agricultural tools to farming households in Oyam District' },
  { src: `${IK}/NGO_secondary_school_20250811_120553.jpg?tr=w-1200,q-72`, alt: 'Students at a secondary school supported by the organisation' },
  { src: `${IK}/distributing_scholarstic_materials_to_under_priviledged_students_20250811_121004.jpg?tr=w-1200,q-72`, alt: 'Scholastic materials handed to students' },
  { src: `${IK}/ladies_hairdressing_training_20250812_123723.jpg?tr=w-1200,q-72`, alt: "Women's vocational training in hairdressing" },
];

const INTERVAL = 5500;

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
  const initiativeCount = projects.length;
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const id = setInterval(() => setActive((i) => (i + 1) % SLIDES.length), INTERVAL);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden bg-ink-900">
      {/* Photography sits behind the copy on the right and dissolves into the
          ground before it reaches the text column. */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-[62%]">
        {SLIDES.map((slide, i) => (
          <img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            aria-hidden={i !== active}
            loading={i === 0 ? 'eager' : 'lazy'}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ease-in-out ${
              i === active ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        {/* Left-facing fade into the ground, plus a top/bottom settle */}
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-ink-900 via-ink-900/85 to-ink-900/20 lg:via-ink-900/55 lg:to-transparent" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink-900 via-transparent to-ink-900/60" />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[6%] top-1/3 h-[min(50vw,460px)] w-[min(50vw,460px)] rounded-full opacity-70"
        style={{ background: 'radial-gradient(circle, rgba(223,161,38,0.13) 0%, transparent 68%)' }}
      />

      <Container className="relative">
        <div className="flex min-h-[86vh] max-w-[46rem] flex-col justify-center py-32 lg:min-h-[88vh] lg:py-36">
          <p className="mb-6 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-bronze-400">
            Registered NGO · Oyam District, Northern Uganda
          </p>

          <h1 className="max-w-[15ch] font-display text-[clamp(2rem,4.4vw,3.5rem)] font-normal leading-[1.02] tracking-[-0.02em] text-surface text-balance">
            <Motto text={tagline} />
          </h1>

          <p className="mt-7 max-w-[46ch] text-[15px] leading-relaxed text-surface/65 sm:text-base">
            {description}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              to="/projects"
              className="group inline-flex items-center gap-2.5 rounded-full bg-gold-500 px-7 py-3.5 text-sm font-semibold text-ink-900 transition-all duration-200 hover:-translate-y-0.5 hover:bg-gold-400"
            >
              See what we&apos;ve built
              <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
            <Link
              to="/contact"
              className="rounded-full border border-surface/25 px-7 py-3.5 text-sm font-semibold text-surface transition-all duration-200 hover:-translate-y-0.5 hover:border-surface/60 hover:bg-surface/10"
            >
              Partner with us
            </Link>
          </div>

          <dl className="mt-14 flex flex-wrap gap-x-12 gap-y-6">
            {[
              [initiativeCount || '—', 'Initiatives'],
              ['2025', 'Registered'],
              ['Oyam', 'Home district'],
            ].map(([value, label]) => (
              <div key={label}>
                <dd className="font-display text-3xl leading-none text-surface tabular-nums">{value}</dd>
                <dt className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-surface/40">{label}</dt>
              </div>
            ))}
          </dl>

          {/* Slide markers double as controls */}
          <div className="mt-12 flex items-center gap-2.5">
            {SLIDES.map((slide, i) => (
              <button
                key={slide.src}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show image ${i + 1} of ${SLIDES.length}`}
                aria-current={i === active}
                className={`h-0.5 rounded-full transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-4 focus-visible:ring-offset-ink-900 ${
                  i === active ? 'w-10 bg-gold-500' : 'w-5 bg-surface/25 hover:bg-surface/50'
                }`}
              />
            ))}
          </div>
        </div>
      </Container>

      {/* Kitenge band — woven-textile stripe from the earth palette, doing real
          work as the rule between the hero and the page. */}
      <div
        aria-hidden="true"
        className="relative h-1.5"
        style={{
          background:
            'repeating-linear-gradient(90deg, var(--color-gold-500) 0 28px, var(--color-bronze-600) 28px 56px, var(--color-forest-700) 56px 84px)',
        }}
      />
    </section>
  );
}
