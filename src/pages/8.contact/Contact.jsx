import Container from '../../components/common/Container';
import PageHeader from '../../components/common/PageHeader';
import ContactForm from './sections/ContactForm';
import ContactInfo from './sections/ContactInfo';
import { useSEO } from '../../hooks/useSEO';

export default function Contact() {
  useSEO({
    title: 'Contact Us',
    description: "Questions, partnerships, or ways to get involved with Oling Dawn Kerjew Projects — we'd love to hear from you.",
  });

  return (
    <>
      <PageHeader
        eyebrow="Get in touch"
        title="Start a conversation."
        subtitle="Partnerships, volunteering, media requests or a question about the work — this reaches the people who can answer it."
      />
      <section className="bg-surface-alt py-20 sm:py-28">
        <Container className="grid gap-14 lg:grid-cols-[1.35fr_1fr] lg:gap-20">
          <ContactForm />
          <ContactInfo />
        </Container>
      </section>
    </>
  );
}
