import Container from '../../components/common/Container';
import PageHeader from '../../components/common/PageHeader';
import ContactForm from './sections/ContactForm';
import ContactInfo from './sections/ContactInfo';
import { useSEO } from '../../hooks/useSEO';
import { ROUTE_SEO } from '../../data/seoRoutes';

export default function Contact() {
  useSEO(ROUTE_SEO['/contact']);

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
        {/* Two cards, one per column, sharing the same radius, ground and
            elevation. The photo sits flush at the top of the right card as its
            header rather than floating as a third, differently-styled block. */}
        <Container className="grid items-start gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-10">
          <ContactForm />
          <div className="overflow-hidden rounded-2xl border border-ink-900/8 bg-surface-card shadow-elevated">
            <img
              src="https://ik.imagekit.io/u8h0uidte/Oling-Dawn-Kerjew-/ladies_hairdressing_training_20250812_123723.jpg?tr=w-900,q-72"
              alt="Women's vocational training in hairdressing"
              loading="lazy"
              width={900}
              height={675}
              className="aspect-4/3 w-full object-cover"
            />
            <div className="p-7 sm:p-9">
              <ContactInfo />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
