import Hero from './sections/Hero';
import AboutPreview from './sections/AboutPreview';
import ConstructionSection from './sections/ConstructionSection';
import PartnersSection from './sections/PartnersSection';
import FeaturedProjects from './sections/FeaturedProjects';
import FeaturedVideo from './sections/FeaturedVideo';
import CTASection from './sections/CTASection';
import { useSEO } from '../../hooks/useSEO';
import { ROUTE_SEO } from '../../data/seoRoutes';

export default function Home() {
  useSEO(ROUTE_SEO['/']);

  return (
    <>
      <Hero />
      <AboutPreview />
      <ConstructionSection />
      <PartnersSection />
      <FeaturedProjects />
      <FeaturedVideo />
      <CTASection />
    </>
  );
}
