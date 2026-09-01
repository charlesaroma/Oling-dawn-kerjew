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
      <PageHeader title="About Oling Dawn Kerjew Projects" subtitle="Why we serve, and who we serve alongside." />
      <MissionSection />
      <PillarsSection />
      <TeamSection />
    </>
  );
}
