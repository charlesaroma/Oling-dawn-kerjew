import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import { DATA } from '../../../services/jsonDataLoader';
import { HERO_DARK } from '../../../config/heroTheme';

const IK = 'https://ik.imagekit.io/u8h0uidte/Oling-Dawn-Kerjew-';

const SLIDES = [
  { src: `${IK}/distributing_agricultural_tools_hoes_MG_7659.JPG?tr=w-1200,q-72`, alt: 'Distributing agricultural tools to farming households, Oyam District' },
  { src: `${IK}/NGO_secondary_school_20250811_120553.jpg?tr=w-1200,q-72`, alt: 'Students at a secondary school supported by the organisation' },
  { src: `${IK}/distributing_scholarstic_materials_to_under_priviledged_students_20250811_121004.jpg?tr=w-1200,q-72`, alt: 'Scholastic materials handed to students' },
  { src: `${IK}/ladies_hairdressing_training_20250812_123723.jpg?tr=w-1200,q-72`, alt: "Women's vocational training in hairdressing" },
];

const INTERVAL = 5500;

/* Feathers all four edges of the photo into the page background. Two
   gradients intersected: each fades one axis, so a pixel near any edge ends
   up transparent (a single radial gradient only really fades the corners).
   Inline rather than a Tailwind arbitrary class, whose class-name parsing
   the nested parens and commas don't survive. */
const FADE_LAYERS =
  'linear-gradient(to right, transparent 0%, black 17%, black 83%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)';

const EDGE_FADE = {
  maskImage: FADE_LAYERS,
  WebkitMaskImage: FADE_LAYERS,
  maskComposite: 'intersect',
  WebkitMaskComposite: 'source-in',
  maskRepeat: 'no-repeat',
  WebkitMaskRepeat: 'no-repeat',
};

/* Warm sand at the top and bottom, clean near-white through the middle, so
   the hero reads as lit rather than as one flat fill and the bottom edge
   hands off to the sand-toned section below without a seam. */
const LIGHT_GROUND = {
  background:
    'linear-gradient(to bottom, var(--color-surface-alt) 0%, var(--color-surface) 32%, var(--color-surface) 72%, var(--color-surface-alt) 100%)',
};

/* Dark variant: deep forest rather than near-black, so it reads as the brand's
   own green at low light instead of a generic dark theme. Settles into
   ink-900 at the base to hand off to the section below. */
const DARK_GROUND = {
  background:
    'linear-gradient(160deg, var(--color-forest-900) 0%, var(--color-forest-800) 38%, var(--color-ink-900) 100%)',
};

/* A low gold bloom sitting behind the photo, so its feathered edges dissolve
   into light instead of into nothing. Carries further on the dark ground,
   where it has more room to read. */
const LIGHT_BLOOM = {
  background: 'radial-gradient(ellipse at 62% 42%, rgba(223, 161, 38, 0.13) 0%, transparent 68%)',
};

const DARK_BLOOM = {
  background: 'radial-gradient(ellipse at 62% 42%, rgba(223, 161, 38, 0.22) 0%, transparent 70%)',
};

const HERO_GROUND = HERO_DARK ? DARK_GROUND : LIGHT_GROUND;
const PHOTO_BLOOM = HERO_DARK ? DARK_BLOOM : LIGHT_BLOOM;

/* Every colour that has to flip with the ground, kept in one place so the two
   variants can't drift apart. */
const T = HERO_DARK
  ? {
    eyebrow: 'text-bronze-300',
    heading: 'text-surface',
    accent: 'text-gold-400 decoration-gold-500/60',
    body: 'text-surface/70',
    caption: 'text-surface/50',
    captionIcon: 'text-surface/40',
    ghostBtn: 'border-surface/25 text-surface hover:border-surface/50 hover:bg-surface/10',
    markerIdle: 'bg-surface/25 hover:bg-surface/50',
    ringOffset: 'focus-visible:ring-offset-ink-900',
  }
  : {
    eyebrow: 'text-bronze-600',
    heading: 'text-forest-900',
    accent: 'text-gold-600 decoration-gold-500/60',
    body: 'text-ink-600',
    caption: 'text-ink-500',
    captionIcon: 'text-ink-400',
    ghostBtn: 'border-ink-900/15 text-forest-900 hover:border-ink-900/30 hover:bg-ink-900/5',
    markerIdle: 'bg-ink-900/15 hover:bg-ink-900/30',
    ringOffset: 'focus-visible:ring-offset-surface',
  };

/* Short, scannable subhead for the hero specifically — the full mission
   paragraph (DATA.siteConfig.description) already appears on the About
   page; repeating all of it here just slows the hero down. */
const SHORT_DESCRIPTION =
  'A registered Ugandan NGO building housing, schools and clinics, and running community programmes for underserved families across Northern Uganda.';

/* The motto is the design here, so it gets typeset rather than printed: the
   clause after the first comma carries the emphasis. Falls back to plain
   rendering if the tagline is ever edited to something without a comma. */
function Motto({ text }) {
  const comma = text.indexOf(',');
  if (comma === -1) return text;
  return (
    <>
      {text.slice(0, comma + 1)}{' '}
      <span className={`font-semibold underline decoration-2 underline-offset-4 ${T.accent}`}>
        {text.slice(comma + 1).trim()}
      </span>
    </>
  );
}

export default function Hero() {
  const { tagline } = DATA.siteConfig;
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const id = setInterval(() => setActive((i) => (i + 1) % SLIDES.length), INTERVAL);
    return () => clearInterval(id);
  }, []);

  return (
    <section className={`relative overflow-hidden ${HERO_DARK ? 'bg-ink-900' : 'bg-surface'}`}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={HERO_GROUND} />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[62%] lg:block"
        style={PHOTO_BLOOM}
      />

      {/* Matches Navbar's own container exactly (wider cap, larger side padding
          at sm+) so the hero content lines up with the logo/CTA above it. */}
      <div className="relative mx-auto w-full max-w-[1680px] px-6 sm:px-10">
        <div className="grid gap-10 pb-16 pt-28 sm:pb-20 sm:pt-32 lg:grid-cols-[minmax(0,40rem)_1fr] lg:items-center lg:gap-14 lg:pb-24 lg:pt-40">
          {/* Text column */}
          <div className="flex flex-col justify-center">
            <p className={`mb-6 font-mono text-[11px] font-medium uppercase tracking-[0.22em] ${T.eyebrow}`}>
              Registered NGO, Oyam District, Northern Uganda
            </p>

            <h1 className={`max-w-[15ch] font-display text-[clamp(2.1rem,4.2vw,3.5rem)] font-semibold leading-[1.02] tracking-[-0.02em] text-balance ${T.heading}`}>
              <Motto text={tagline} />
            </h1>

            <p className={`mt-7 max-w-[44ch] text-[15px] leading-relaxed sm:text-base ${T.body}`}>
              {SHORT_DESCRIPTION}
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
                className={`rounded-full border px-7 py-3.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 ${T.ghostBtn}`}
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
                  className={`h-0.5 rounded-full transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-4 ${T.ringOffset} ${
                    i === active ? 'w-10 bg-gold-500' : `w-5 ${T.markerIdle}`
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Photo feathers into the page at its edges instead of sitting in a
              hard-edged card. */}
          <div className="relative flex flex-col items-center">
            <div
              className="relative h-[320px] w-full sm:h-[400px] lg:h-[560px]"
              style={EDGE_FADE}
            >
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
            </div>

            {/* A photo credit line, not a UI widget — ties each frame to where it
                was actually taken, the way a printed feature story would. */}
            <p className={`mt-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] ${T.caption}`}>
              <MapPin size={11} className={`shrink-0 ${T.captionIcon}`} strokeWidth={2} />
              {SLIDES[active].alt}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
