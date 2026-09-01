import Container from './Container';

export default function PageHeader({ title, subtitle }) {
  return (
    <section className="relative overflow-hidden bg-surface-alt py-16 sm:py-20">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold-300/20 blur-3xl" />
      <Container className="relative flex flex-col gap-3">
        <h1 className="text-4xl italic sm:text-5xl">{title}</h1>
        {subtitle && <p className="max-w-2xl text-lg text-ink-900/70">{subtitle}</p>}
      </Container>
    </section>
  );
}
