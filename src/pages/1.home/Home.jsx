import Hero from './sections/Hero';
import AboutPreview from './sections/AboutPreview';
import ConstructionSection from './sections/ConstructionSection';
import PartnersSection from './sections/PartnersSection';
import FeaturedProjects from './sections/FeaturedProjects';
import FeaturedVideo from './sections/FeaturedVideo';
import CTASection from './sections/CTASection';
import { useSEO } from '../../hooks/useSEO';

export default function Home() {
  useSEO({
    title: 'Oling Dawn Kerjew Projects | Humanitarian NGO in Northern Uganda',
    description: "A registered Ugandan NGO serving Oyam District and Northern Uganda through low-cost construction, education, healthcare, women's empowerment and community development.",
  });

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
