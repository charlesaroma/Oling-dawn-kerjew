import Container from './Container';

export default function PageHeader({ title, subtitle }) {
  return (
    <section className="bg-primary-900 py-16">
      <Container className="flex flex-col gap-3">
        <h1 className="text-3xl font-display font-extrabold text-white sm:text-4xl">{title}</h1>
        {subtitle && <p className="max-w-2xl text-primary-100">{subtitle}</p>}
      </Container>
    </section>
  );
}
