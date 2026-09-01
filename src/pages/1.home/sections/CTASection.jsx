import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from '../../../components/common/Container';

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-forest-900">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[6%] top-1/2 h-[min(56vw,460px)] w-[min(56vw,460px)] -translate-y-1/2 rounded-full opacity-80"
        style={{ background: 'radial-gradient(circle, rgba(223,161,38,0.16) 0%, transparent 68%)' }}
      />

      <Container className="relative py-24 sm:py-32">
        <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-6 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-gold-400">
              Get involved
            </p>
            <h2 className="max-w-[15ch] font-display text-[clamp(2.2rem,5vw,4rem)] leading-[0.98] tracking-[-0.02em] text-surface text-balance">
              Help bring the <em className="italic text-gold-400">next dawn.</em>
            </h2>
            <p className="mt-6 max-w-[46ch] leading-relaxed text-surface/60">
              Every donation, volunteer hour and partnership brings construction, education, healthcare and hope
              closer to the families who need it most.
            </p>
          </div>

          <Link
            to="/contact"
            className="group inline-flex shrink-0 items-center gap-2.5 rounded-full bg-gold-500 px-8 py-4 text-sm font-semibold text-ink-900 transition-all duration-200 hover:-translate-y-0.5 hover:bg-gold-400"
          >
            Start a conversation
            <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </Container>

      <div
        aria-hidden="true"
        className="h-1.5"
        style={{
          background:
            'repeating-linear-gradient(90deg, var(--color-gold-500) 0 28px, var(--color-bronze-600) 28px 56px, var(--color-forest-700) 56px 84px)',
        }}
      />
    </section>
  );
}
