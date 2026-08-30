import { ArrowRight } from 'lucide-react';
import Container from '../../../components/common/Container';
import Button from '../../../components/common/Button';
import MediaImage from '../../../components/media/MediaImage';
import { useAdmin } from '../../../context/AdminContext';
import { getPublishedProjects } from '../../../services/projectsService';

export default function Hero() {
  const { siteConfig, projects } = useAdmin();
  const { tagline, description } = siteConfig;
  const activeCount = getPublishedProjects(projects).length;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gold-100 to-surface">
      <div className="pointer-events-none absolute left-0 top-0 h-96 w-96 -translate-x-1/3 -translate-y-1/3 rounded-full bg-gold-300/25 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 translate-x-1/4 translate-y-1/4 rounded-full bg-forest-300/15 blur-3xl" />

      <Container className="relative grid gap-14 py-20 lg:grid-cols-2 lg:items-center lg:py-28">
        <div className="flex flex-col items-start gap-6">
          <span className="font-mono text-sm uppercase tracking-widest text-gold-700">
            Education · Healthcare · Community
          </span>
          <h1 className="max-w-xl font-display text-5xl italic font-semibold leading-[1.08] text-forest-900 sm:text-6xl">
            {tagline}
          </h1>
          <p className="max-w-lg text-lg leading-relaxed text-navy-900/80">{description}</p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Button to="/projects" variant="primary">
              See Our Work <ArrowRight size={16} />
            </Button>
            <Button to="/contact" variant="outline">Get Involved</Button>
          </div>
        </div>

        <div className="relative">
          <div className="aspect-4/3 overflow-hidden rounded-3xl shadow-elevated-lg">
            <MediaImage
              src="/home/hero-cover.jpg"
              alt=""
              width={960}
              height={720}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-navy-900/8 bg-white px-5 py-4 shadow-elevated-lg sm:block">
            <p className="font-mono text-2xl text-bronze-700">{activeCount}</p>
            <p className="text-xs text-navy-900/60">Active initiatives</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
