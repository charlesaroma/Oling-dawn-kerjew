import Hero from './sections/Hero';
import ImpactStats from './sections/ImpactStats';
import FeaturedProjects from './sections/FeaturedProjects';
import FeaturedVideo from './sections/FeaturedVideo';
import CTASection from './sections/CTASection';
import { useSEO } from '../../hooks/useSEO';

export default function Home() {
  useSEO({
    title: 'Oling Dawn Kerjew Projects',
    description: "Oling Dawn Kerjew Projects is a registered non-profit delivering education, healthcare, women's empowerment, and community development across Uganda.",
  });

  return (
    <>
      <Hero />
      <ImpactStats />
      <FeaturedProjects />
      <FeaturedVideo />
      <CTASection />
    </>
  );
}
