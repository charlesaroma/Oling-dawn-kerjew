import Container from '../../../components/common/Container';
import SectionHeading from '../../../components/common/SectionHeading';
import Accordion from '../../../components/common/Accordion';
import { useProjects } from '../../../services/projectQueries';
import { getPublishedProjects } from '../../../services/projectsService';
import { DATA } from '../../../services/jsonDataLoader';

/* Every answer is sourced from data already on the site (siteConfig, real
   project locations) — nothing here is invented organisational policy. */
export default function FAQSection() {
  const { orgName, description, registeredAddress, emails, phones } = DATA.siteConfig;
  const { data: projects } = useProjects();
  const districts = [...new Set(
    getPublishedProjects(projects).map((p) => p.location?.split(',')[0].trim()).filter(Boolean),
  )];

  const whereWeWork = districts.length
    ? `Across ${districts.length} district${districts.length === 1 ? '' : 's'} so far, including ${districts.slice(0, 6).join(', ')}${districts.length > 6 ? ' and others' : ''}.`
    : 'Across Northern Uganda, expanding as new initiatives are confirmed.';

  const items = [
    { question: 'What does Oling Dawn Kerjew Projects do?', answer: description },
    {
      question: 'Is Oling Dawn Kerjew Projects a registered NGO?',
      answer: `Yes. ${orgName} is a registered Ugandan NGO, based in ${registeredAddress}.`,
    },
    { question: 'Where does the work happen?', answer: whereWeWork },
    {
      question: 'What is the low-cost construction programme?',
      answer: 'A separate case-study covering the modular concrete building system used for housing, health centres and schools. Look for the "Full case study" link on any construction-related project.',
    },
    {
      question: 'How can I get involved or partner with you?',
      answer: `Reach out through the contact form, or directly at ${emails[0]}${phones[0] ? ` / ${phones[0]}` : ''}. Partnerships, volunteering and media requests all go to the same place.`,
    },
  ];

  return (
    <section className="bg-surface py-20 sm:py-28">
      <Container className="mx-auto flex max-w-3xl flex-col gap-12">
        <SectionHeading eyebrow="Questions" title="Frequently asked." align="center" />
        <Accordion items={items} />
      </Container>
    </section>
  );
}
