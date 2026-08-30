import Container from './Container';

export default function PageHeader({ title, subtitle }) {
  return (
    <section className="bg-surface-alt py-16">
      <Container className="flex flex-col gap-3">
        <h1 className="text-3xl italic sm:text-4xl">{title}</h1>
        {subtitle && <p className="max-w-2xl text-navy-900/70">{subtitle}</p>}
      </Container>
    </section>
  );
}
