import Container from '../../../components/common/Container';
import Button from '../../../components/common/Button';

export default function CTASection() {
  return (
    <section className="bg-surface-cta py-16">
      <Container className="flex flex-col items-center gap-6 text-center">
        <h2 className="max-w-2xl font-display text-3xl italic font-semibold text-navy-900 sm:text-4xl">
          Help bring the next dawn.
        </h2>
        <p className="max-w-xl text-navy-900/70">
          Every donation, volunteer hour, and partnership brings education, healthcare, and hope closer to the
          families who need it most.
        </p>
        <Button to="/contact" variant="dark">Get Involved</Button>
      </Container>
    </section>
  );
}
