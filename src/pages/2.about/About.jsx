import PageHeader from '../../components/common/PageHeader';
import MissionSection from './sections/MissionSection';
import PillarsSection from './sections/PillarsSection';
import TeamSection from './sections/TeamSection';
import { useSEO } from '../../hooks/useSEO';

export default function About() {
  useSEO({
    title: 'About Us',
    description: 'Oling Dawn Kerjew Humanitarian and Charities NGO — why we serve, and who we serve alongside. Mission, focus areas and team across Uganda.',
  });

  return (
    <>
      <PageHeader
        eyebrow="Who we are"
        title="Service, built to last."
        subtitle="Oling Dawn Kerjew Humanitarian and Charities NGO — a registered Ugandan NGO. This site covers its Projects arm: construction, education, healthcare and community development, alongside the people who use what we build."
      />
      <MissionSection />
      <PillarsSection />
      <TeamSection />
    </>
  );
}
