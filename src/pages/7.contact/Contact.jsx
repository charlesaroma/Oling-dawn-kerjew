import Container from '../../components/common/Container';
import PageHeader from '../../components/common/PageHeader';
import ContactForm from './sections/ContactForm';
import ContactInfo from './sections/ContactInfo';

export default function Contact() {
  return (
    <>
      <PageHeader title="Contact Us" subtitle="Questions, partnerships, or ways to get involved — we'd love to hear from you." />
      <section className="py-16">
        <Container className="grid gap-12 lg:grid-cols-2">
          <ContactForm />
          <ContactInfo />
        </Container>
      </section>
    </>
  );
}
