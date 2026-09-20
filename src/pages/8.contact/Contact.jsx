import Container from '../../components/common/Container';
import PageHeader from '../../components/common/PageHeader';
import ContactForm from './sections/ContactForm';
import ContactInfo from './sections/ContactInfo';
import { useSEO } from '../../hooks/useSEO';

export default function Contact() {
  useSEO({
    title: 'Contact Us',
    description: "Questions, partnerships, or ways to get involved with Oling Dawn Kerjew Projects. We'd love to hear from you.",
  });

  return (
    <>
      <PageHeader
        eyebrow="Get in touch"
        title="Start a conversation."
        subtitle="Partnerships, volunteering, media requests or a question about the work. This reaches the people who can answer it."
        image="https://ik.imagekit.io/u8h0uidte/Oling-Dawn-Kerjew-/distributing_agricultural_tools_hoes_MG_7659.JPG?tr=w-1600,q-72"
        imageAlt="Distributing agricultural tools to farming households in Oyam District"
      />
      <section className="bg-surface-alt py-20 sm:py-28">
        <Container className="grid gap-14 lg:grid-cols-[1.35fr_1fr] lg:gap-20">
          <ContactForm />
          <div className="flex flex-col gap-10">
            <div className="overflow-hidden rounded-2xl border border-ink-900/8 shadow-elevated">
              <img
                src="https://ik.imagekit.io/u8h0uidte/Oling-Dawn-Kerjew-/ladies_hairdressing_training_20250812_123723.jpg?tr=w-900,q-72"
                alt="Women's vocational training in hairdressing"
                loading="lazy"
                className="aspect-4/3 w-full object-cover"
              />
            </div>
            <ContactInfo />
          </div>
        </Container>
      </section>
    </>
  );
}
