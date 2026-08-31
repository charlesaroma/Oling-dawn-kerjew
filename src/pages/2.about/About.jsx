import PageHeader from '../../components/common/PageHeader';
import MissionSection from './sections/MissionSection';
import PillarsSection from './sections/PillarsSection';
import TeamSection from './sections/TeamSection';

export default function About() {
  return (
    <>
      <PageHeader title="About Oling Dawn Kerjew Projects" subtitle="Why we serve, and who we serve alongside." />
      <MissionSection />
      <PillarsSection />
      <TeamSection />
    </>
  );
}
