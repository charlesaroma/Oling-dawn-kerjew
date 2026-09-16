import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import Container from '../../../components/common/Container';
import { useProjects } from '../../../services/projectQueries';
import { DATA } from '../../../services/jsonDataLoader';

const IK = 'https://ik.imagekit.io/u8h0uidte/Oling-Dawn-Kerjew-';

const SLIDES = [
  { src: `${IK}/distributing_agricultural_tools_hoes_MG_7659.JPG?tr=w-1200,q-72`, alt: 'Distributing agricultural tools to farming households, Oyam District' },
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
      <span className="font-semibold text-gold-600 underline decoration-gold-500/60 decoration-2 underline-offset-4">
        {text.slice(comma + 1).trim()}
      </span>
    </>
  );
}

export default function Hero() {
  const { data: projects } = useProjects();
  const { tagline, description } = DATA.siteConfig;
  const initiativeCount = projects.length;
  const districtCount = useMemo(
    () => new Set(projects.map((p) => p.location?.split(',')[0].trim()).filter(Boolean)).size,
    [projects],
  );
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const id = setInterval(() => setActive((i) => (i + 1) % SLIDES.length), INTERVAL);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden bg-surface">
      <Container className="relative">
        <div className="grid gap-10 pb-16 pt-28 sm:pb-20 sm:pt-32 lg:grid-cols-[minmax(0,40rem)_1fr] lg:items-center lg:gap-14 lg:pb-24 lg:pt-40">
          {/* Text column */}
          <div className="flex flex-col justify-center">
            <p className="mb-6 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-bronze-600">
              Registered NGO — Oyam District, Northern Uganda
            </p>

            <h1 className="max-w-[15ch] font-display text-[clamp(2.1rem,4.2vw,3.5rem)] font-semibold leading-[1.02] tracking-[-0.02em] text-forest-900 text-balance">
              <Motto text={tagline} />
            </h1>

            <p className="mt-7 max-w-[44ch] text-[15px] leading-relaxed text-ink-600 sm:text-base">
              {description}
            </p>

            <p className="mt-8 max-w-[44ch] font-display text-lg leading-snug text-forest-800">
              {initiativeCount || '—'} initiatives and counting, across {districtCount || '—'} districts.
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
                className="rounded-full border border-ink-900/15 px-7 py-3.5 text-sm font-semibold text-forest-900 transition-all duration-200 hover:-translate-y-0.5 hover:border-ink-900/30 hover:bg-ink-900/5"
              >
                Partner with us
              </Link>
            </div>

            {/* Slide markers double as controls */}
            <div className="mt-14 flex items-center gap-2.5">
              {SLIDES.map((slide, i) => (
                <button
                  key={slide.src}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Show image ${i + 1} of ${SLIDES.length}`}
                  aria-current={i === active}
                  className={`h-0.5 rounded-full transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-4 focus-visible:ring-offset-surface ${
                    i === active ? 'w-10 bg-gold-500' : 'w-5 bg-ink-900/15 hover:bg-ink-900/30'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Photo card — separated from the text by a shadow, not a dark fill */}
          <div className="relative overflow-hidden rounded-[28px] shadow-elevated-lg">
            <div className="relative h-[300px] sm:h-[380px] lg:h-[540px]">
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
              {/* Localized fade so the caption line stays legible over any photo */}
              <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink-900/70 to-transparent" />
            </div>

            {/* A photo credit line, not a UI widget — ties each frame to where it
                was actually taken, the way a printed feature story would. */}
            <p className="absolute inset-x-0 bottom-0 flex items-baseline gap-2 px-6 py-4 font-mono text-[10px] uppercase tracking-[0.14em] text-surface/80">
              <MapPin size={11} className="shrink-0 translate-y-px text-surface/60" strokeWidth={2} />
              {SLIDES[active].alt}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
