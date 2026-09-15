import PageHeader from '../../components/common/PageHeader';
import ImpactStats from '../../components/sections/ImpactStats';
import MissionSection from './sections/MissionSection';
import PillarsSection from './sections/PillarsSection';
import TeamSection from './sections/TeamSection';
import Timeline from './sections/Timeline';
import FAQSection from './sections/FAQSection';
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
        image="https://ik.imagekit.io/u8h0uidte/Oling-Dawn-Kerjew-/distributing_scholarstic_materials_to_under_priviledged_students_20250811_121004.jpg?tr=w-1600,q-72"
        imageAlt="Scholastic materials handed to students at a community distribution"
      />
      <MissionSection />
      <PillarsSection />
      <TeamSection />
      <Timeline />
      <ImpactStats />
      <FAQSection />
    </>
  );
}
