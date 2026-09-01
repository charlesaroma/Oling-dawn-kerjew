import Hero from './sections/Hero';
import ImpactStats from './sections/ImpactStats';
import ConstructionSection from './sections/ConstructionSection';
import PartnersSection from './sections/PartnersSection';
import FeaturedProjects from './sections/FeaturedProjects';
import FeaturedVideo from './sections/FeaturedVideo';
import CTASection from './sections/CTASection';
import { useSEO } from '../../hooks/useSEO';

export default function Home() {
  useSEO({
    title: 'Oling Dawn Kerjew Projects',
    description: "Low-cost, non-profit construction of hospitals, schools, roads and bridges across Uganda — plus education, healthcare and community development. The Projects arm of Oling Dawn Kerjew Humanitarian and Charities NGO.",
  });

  return (
    <>
      <Hero />
      <ImpactStats />
      <ConstructionSection />
      <PartnersSection />
      <FeaturedProjects />
      <FeaturedVideo />
      <CTASection />
    </>
  );
}
