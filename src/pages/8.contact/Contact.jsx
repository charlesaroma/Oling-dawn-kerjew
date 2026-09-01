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
      <PageHeader title="Contact Us" subtitle="Questions, partnerships, or ways to get involved. We'd love to hear from you." />
      <section className="py-16">
        <Container className="grid gap-12 lg:grid-cols-2">
          <ContactForm />
          <ContactInfo />
        </Container>
      </section>
    </>
  );
}
