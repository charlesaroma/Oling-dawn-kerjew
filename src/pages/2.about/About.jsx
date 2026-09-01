import PageHeader from '../../components/common/PageHeader';
import MissionSection from './sections/MissionSection';
import PillarsSection from './sections/PillarsSection';
import TeamSection from './sections/TeamSection';
import { useSEO } from '../../hooks/useSEO';

export default function About() {
  useSEO({
    title: 'About Us',
    description: 'Why Oling Dawn Kerjew Projects serves, and who we serve alongside — our mission, focus areas, and team across Uganda.',
  });

  return (
    <>
      <PageHeader
        eyebrow="Who we are"
        title="Service, built to last."
        subtitle="A registered Ugandan NGO working in construction, education, healthcare and community development — alongside the people who use what we build."
      />
      <MissionSection />
      <PillarsSection />
      <TeamSection />
    </>
  );
}
