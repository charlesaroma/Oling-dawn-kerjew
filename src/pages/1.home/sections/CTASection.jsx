import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from '../../../components/common/Container';
import Parallax from '../../../components/common/Parallax';

/* The one full-saturation moment on the page — everything around it is light,
   so this band carries the whole palette's warmth on its own, right before
   the dark footer closes the page out. */
export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-gold-500">
      {/* Texture, not a second focal image — kept low-opacity so the gold band
          stays the one full-saturation moment on the page. */}
      <Parallax className="absolute inset-0" strength={10}>
        <img
          src="/construction/modular-row.jpg"
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="h-full w-full object-cover opacity-[0.14] mix-blend-multiply"
        />
      </Parallax>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[8%] -top-[40%] h-[min(56vw,480px)] w-[min(56vw,480px)] rounded-full opacity-60"
        style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.35) 0%, transparent 68%)' }}
      />

      <Container className="relative py-24 sm:py-32">
        <div className="flex flex-col items-start gap-12 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-6 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-ink-900/75">
              Get involved
            </p>
            <h2 className="max-w-[14ch] font-display text-[clamp(2.2rem,5vw,3.8rem)] leading-[0.98] tracking-[-0.02em] text-ink-900 text-balance">
              Help bring the{' '}
              <span className="font-semibold text-bronze-800 underline decoration-ink-900/30 decoration-2 underline-offset-4">
                next dawn.
              </span>
            </h2>
            <p className="mt-6 max-w-[46ch] leading-relaxed text-ink-900/75">
              Every donation, volunteer hour and partnership brings construction, education, healthcare and hope
              closer to the families who need it most.
            </p>
          </div>

          <Link
            to="/contact"
            className="group inline-flex shrink-0 items-center gap-2.5 rounded-full bg-ink-900 px-8 py-4 text-sm font-semibold text-surface transition-all duration-200 hover:-translate-y-0.5 hover:bg-ink-800"
          >
            Start a conversation
            <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
