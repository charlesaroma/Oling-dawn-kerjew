import { ArrowRight } from 'lucide-react';
import Container from '../../../components/common/Container';
import Button from '../../../components/common/Button';

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-surface-cta py-20">
      <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      <Container className="relative flex flex-col items-center gap-6 text-center">
        <h2 className="max-w-2xl font-display text-4xl italic font-semibold text-ink-900 sm:text-5xl">
          Help bring the next dawn.
        </h2>
        <p className="max-w-xl text-lg text-ink-900/70">
          Every donation, volunteer hour, and partnership brings construction, education, healthcare, and hope
          closer to the families who need it most.
        </p>
        <Button to="/contact" variant="dark">
          Get Involved <ArrowRight size={16} />
        </Button>
      </Container>
    </section>
  );
}
