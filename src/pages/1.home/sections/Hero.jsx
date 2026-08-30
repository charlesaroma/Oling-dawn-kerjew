import Container from '../../../components/common/Container';
import Button from '../../../components/common/Button';
import MediaImage from '../../../components/media/MediaImage';
import { DATA } from '../../../services/jsonDataLoader';

export default function Hero() {
  const { tagline, description } = DATA.siteConfig;

  return (
    <section className="relative isolate flex min-h-[85vh] items-center overflow-hidden bg-primary-900">
      <MediaImage
        src="/home/hero-cover.jpg"
        alt=""
        width={1920}
        height={1080}
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-60"
      />
      <div className="absolute inset-0 -z-10 bg-linear-to-t from-primary-900 via-primary-900/70 to-primary-900/30" />

      <Container className="flex flex-col items-start gap-6 py-24">
        <span className="rounded-full bg-accent-500/20 px-4 py-1 text-sm font-semibold uppercase tracking-widest text-accent-300">
          Nonprofit Construction
        </span>
        <h1 className="max-w-2xl text-4xl font-display font-extrabold text-white sm:text-5xl lg:text-6xl">
          {tagline}
        </h1>
        <p className="max-w-xl text-lg text-neutral-200">{description}</p>
        <div className="flex flex-wrap gap-4 pt-2">
          <Button to="/projects" variant="primary">See Our Projects</Button>
          <Button to="/contact" variant="outline">Get Involved</Button>
        </div>
      </Container>
    </section>
  );
}
