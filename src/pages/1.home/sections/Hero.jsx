import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import { DATA } from '../../../services/jsonDataLoader';

const IK = 'https://ik.imagekit.io/u8h0uidte/Oling-Dawn-Kerjew-';

/* Real field photography, full-bleed: the design system's hero pattern
   ("ink-900 + full-bleed photo carousel, gold accents"). `focus` keeps the
   subject off the crop line at the extreme aspect ratios a 100svh hero hits
   on phones and ultrawides. */
const SLIDES = [
  {
    file: 'NGO_secondary_school_20250811_120553.jpg',
    alt: 'Students at a secondary school supported by the organisation',
    focus: '50% 42%',
  },
  {
    file: 'distributing_agricultural_tools_hoes_MG_7659.JPG',
    alt: 'Distributing agricultural tools to farming households, Oyam District',
    focus: '50% 52%',
  },
  {
    file: 'distributing_scholarstic_materials_to_under_priviledged_students_20250811_121004.jpg',
    alt: 'Scholastic materials handed to students',
    focus: '50% 45%',
  },
  {
    file: 'ladies_hairdressing_training_20250812_123723.jpg',
    alt: "Women's vocational training in hairdressing",
    focus: '50% 40%',
  },
];

/* Must stay in step with the `hero-progress` animation duration in index.css:
   the marker fills for exactly as long as the slide is up. */
const INTERVAL = 6500;

const WIDTHS = [900, 1400, 2000, 2600];
const url = (file, w) => `${IK}/${file}?tr=w-${w},q-70`;
const srcSetFor = (file) => WIDTHS.map((w) => `${url(file, w)} ${w}w`).join(', ');

/* Scrims are inline rather than Tailwind arbitrary values: the nested parens
   and commas in a multi-stop gradient don't survive class-name parsing.

   Phones get one vertical wash (text sits over the middle of the frame);
   desktop splits the job: a lighter vertical pass for the nav and the
   caption rail, plus a horizontal pass that darkens the left third where the
   headline lives and lets the right of the photograph stay open. */
const SCRIM_MOBILE = {
  background:
    'linear-gradient(to bottom, rgba(15,22,17,0.84) 0%, rgba(15,22,17,0.66) 30%, rgba(15,22,17,0.70) 58%, rgba(22,48,37,0.90) 85%, var(--color-ink-900) 100%)',
};

const SCRIM_VERTICAL = {
  background:
    'linear-gradient(to bottom, rgba(15,22,17,0.72) 0%, rgba(15,22,17,0.18) 26%, rgba(15,22,17,0.22) 58%, rgba(22,48,37,0.86) 90%, var(--color-ink-900) 100%)',
};

const SCRIM_HORIZONTAL = {
  background:
    'linear-gradient(to right, rgba(22,48,37,0.94) 0%, rgba(22,48,37,0.82) 26%, rgba(22,48,37,0.42) 56%, rgba(22,48,37,0.06) 80%, rgba(22,48,37,0) 100%)',
};

/* A low gold bloom behind the headline, so the darkest corner of the scrim
   reads as warm brand light rather than as a black box over a photo. */
const BLOOM = {
  background: 'radial-gradient(ellipse at 18% 62%, rgba(223, 161, 38, 0.16) 0%, transparent 62%)',
};

/* Short, scannable subhead for the hero specifically: the full mission
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
      <span className="font-semibold text-gold-400 underline decoration-gold-500/60 decoration-2 underline-offset-[0.14em]">
        {text.slice(comma + 1).trim()}
      </span>
    </>
  );
}

export default function Hero() {
  const { tagline } = DATA.siteConfig;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const show = useCallback((i) => setActive(((i % SLIDES.length) + SLIDES.length) % SLIDES.length), []);

  useEffect(() => {
    if (paused) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const id = setInterval(() => setActive((i) => (i + 1) % SLIDES.length), INTERVAL);
    return () => clearInterval(id);
  }, [paused]);

  /* Advancing on its own while a tab is hidden just burns through the deck,
     so the visitor comes back mid-sequence on a frame they never saw. */
  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink-900">
      {/* Photography */}
      <div className="absolute inset-0">
        {SLIDES.map((slide, i) => (
          <img
            key={slide.file}
            src={url(slide.file, 2000)}
            srcSet={srcSetFor(slide.file)}
            sizes="100vw"
            width={2000}
            height={1333}
            alt={slide.alt}
            aria-hidden={i !== active}
            loading={i === 0 ? 'eager' : 'lazy'}
            fetchPriority={i === 0 ? 'high' : 'auto'}
            style={{ objectPosition: slide.focus }}
            className={`absolute inset-0 h-full w-full object-cover will-change-transform transition-opacity duration-[1600ms] ease-in-out ${
              i === active ? 'hero-zoom opacity-100' : 'scale-[1.04] opacity-0'
            }`}
          />
        ))}
      </div>

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 lg:hidden" style={SCRIM_MOBILE} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block" style={SCRIM_VERTICAL} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block" style={SCRIM_HORIZONTAL} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={BLOOM} />

      {/* Copy: matches the Navbar container exactly, so the headline lines up
          with the wordmark above it. */}
      <div className="relative mx-auto flex w-full max-w-[1680px] flex-1 flex-col justify-center px-6 pb-16 pt-32 sm:px-10 sm:pt-36 lg:pb-24">
        <div className="max-w-[40rem]">
          <p
            className="hero-rise font-mono text-[10px] font-medium uppercase leading-[1.7] tracking-[0.22em] text-gold-300 sm:text-[11px]"
            style={{ animationDelay: '80ms' }}
          >
            Registered NGO · Oyam District, Northern Uganda
          </p>

          <h1
            className="hero-rise mt-7 max-w-[14ch] font-display text-[clamp(2.4rem,6.2vw,4.6rem)] font-semibold leading-[0.98] tracking-[-0.025em] text-surface text-balance"
            style={{ animationDelay: '180ms' }}
          >
            <Motto text={tagline} />
          </h1>

          <p
            className="hero-rise mt-7 max-w-[46ch] text-[15px] leading-relaxed text-surface/75 sm:text-[17px]"
            style={{ animationDelay: '300ms' }}
          >
            {SHORT_DESCRIPTION}
          </p>

          <div className="hero-rise mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4" style={{ animationDelay: '420ms' }}>
            <Link
              to="/projects"
              className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-gold-500 px-7 py-4 text-sm font-semibold text-ink-900 transition-all duration-200 hover:-translate-y-0.5 hover:bg-gold-400 sm:py-3.5"
            >
              See what we&apos;ve built
              <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-full border border-surface/30 bg-surface/5 px-7 py-4 text-sm font-semibold text-surface backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-surface/55 hover:bg-surface/12 sm:py-3.5"
            >
              Partner with us
            </Link>
          </div>
        </div>
      </div>

      {/* Caption rail: a photo credit line, not a UI widget: it ties each
          frame to the work it shows, the way a printed feature story would.
          The markers double as controls and as the slide timer. */}
      <div className="relative border-t border-surface/12">
        <div className="mx-auto flex w-full max-w-[1680px] flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-10">
          <p className="flex items-start gap-2 font-mono text-[10px] uppercase leading-relaxed tracking-[0.14em] text-surface/55">
            <MapPin size={12} className="mt-[3px] shrink-0 text-gold-500/80" strokeWidth={2} />
            <span key={active} className="hero-caption">{SLIDES[active].alt}</span>
          </p>

          {/* The markers are 3px of paint, so each button carries a real
              44px box around its bar rather than a pseudo hit area, which at
              this spacing would overlap its neighbours and steal their taps.
              `gap-1` keeps the boxes adjacent instead of overlapping. */}
          <div className="flex shrink-0 items-center gap-1">
            {SLIDES.map((slide, i) => (
              <button
                key={slide.file}
                type="button"
                onClick={() => show(i)}
                aria-label={`Show image ${i + 1} of ${SLIDES.length}`}
                aria-current={i === active}
                className="group flex h-11 items-center px-3 focus-visible:outline-none"
              >
                <span
                  className={`block h-[3px] overflow-hidden rounded-full transition-all duration-500 group-focus-visible:ring-2 group-focus-visible:ring-gold-500 group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-ink-900 ${
                    i === active ? 'w-12 bg-surface/25' : 'w-5 bg-surface/25 group-hover:bg-surface/50'
                  }`}
                >
                  {i === active && <span key={active} className="hero-progress block h-full rounded-full bg-gold-500" />}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
