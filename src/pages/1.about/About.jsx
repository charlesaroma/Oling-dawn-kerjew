import PageHeader from '../../components/common/PageHeader';
import MissionSection from './sections/MissionSection';
import TeamSection from './sections/TeamSection';

export default function About() {
  return (
    <>
      <PageHeader title="About Hope Builders" subtitle="Why we build, and who we build with." />
      <MissionSection />
      <TeamSection />
    </>
  );
}
