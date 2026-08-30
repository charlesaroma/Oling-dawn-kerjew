import Container from '../../../components/common/Container';
import Button from '../../../components/common/Button';
import MediaImage from '../../../components/media/MediaImage';
import { DATA } from '../../../services/jsonDataLoader';

export default function Hero() {
  const { tagline, description } = DATA.siteConfig;

  return (
    <section className="bg-gradient-to-b from-gold-100 to-surface">
      <Container className="grid gap-12 py-20 lg:grid-cols-2 lg:items-center lg:py-28">
        <div className="flex flex-col items-start gap-6">
          <span className="font-mono text-sm uppercase tracking-widest text-gold-700">
            Education · Healthcare · Community
          </span>
          <h1 className="max-w-xl font-display text-4xl italic font-semibold text-forest-900 sm:text-5xl">
            {tagline}
          </h1>
          <p className="max-w-lg text-lg text-navy-900/80">{description}</p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Button to="/projects" variant="primary">See Our Work</Button>
            <Button to="/contact" variant="outline">Get Involved</Button>
          </div>
        </div>

        <div className="aspect-4/3 overflow-hidden rounded-2xl shadow-xl">
          <MediaImage
            src="/home/hero-cover.jpg"
            alt=""
            width={960}
            height={720}
            className="h-full w-full object-cover"
          />
        </div>
      </Container>
    </section>
  );
}
