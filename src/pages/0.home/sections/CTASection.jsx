import Container from '../../../components/common/Container';
import Button from '../../../components/common/Button';

export default function CTASection() {
  return (
    <section className="bg-accent-500 py-16">
      <Container className="flex flex-col items-center gap-6 text-center">
        <h2 className="max-w-2xl text-3xl font-display font-extrabold text-white sm:text-4xl">
          Help us build the next project.
        </h2>
        <p className="max-w-xl text-accent-50">
          Every donation, volunteer hour, and partnership brings a school, clinic, or home closer to completion.
        </p>
        <Button to="/contact" variant="secondary">Get Involved</Button>
      </Container>
    </section>
  );
}
