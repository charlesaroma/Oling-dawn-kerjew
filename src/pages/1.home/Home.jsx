import Hero from './sections/Hero';
import ImpactStats from './sections/ImpactStats';
import FeaturedProjects from './sections/FeaturedProjects';
import FeaturedVideo from './sections/FeaturedVideo';
import CTASection from './sections/CTASection';

export default function Home() {
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
