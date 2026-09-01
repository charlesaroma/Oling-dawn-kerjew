import Container from '../../../components/common/Container';
import SectionHeading from '../../../components/common/SectionHeading';

/* MEACCO is the construction partner, so this sits directly beneath the
   low-cost construction section — the engineering capability behind the
   claim. Only MEACCO has supplied a mark; the rest are set as wordmarks
   rather than inventing logos for them. */
const PARTNERS = [
  {
    name: 'Modulhouse Engineering and Construction Co. Ltd.',
    short: 'MEACCO',
    role: 'Engineering & construction',
    logo: '/partners/meacco-logo.jpg',
  },
  { name: 'MAMA AFRICA', role: 'Refugee food aid' },
  { name: 'fromyfarm.app', role: 'Digital marketplace' },
  { name: 'Digital Green', role: 'Agricultural technology' },
  { name: 'MCash', role: 'Mobile payments' },
];

export default function PartnersSection() {
  const [lead, ...rest] = PARTNERS;

  return (
    <section className="bg-surface py-20 sm:py-28">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="Who we build with"
          title="Partners on the ground."
          subtitle="The construction, technology and relief organisations we deliver alongside."
        />

        <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-16">
          {/* Lead partner — carries the mark */}
          <div className="flex items-center gap-7 rounded-2xl border border-ink-900/8 bg-white p-7 sm:p-9">
            <img
              src={lead.logo}
              alt={`${lead.short} logo`}
              width={640}
              height={640}
              className="h-24 w-24 shrink-0 rounded-full object-cover sm:h-28 sm:w-28"
            />
            <div className="min-w-0">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-bronze-600">{lead.role}</p>
              <p className="mt-2.5 font-display text-2xl leading-[1.1] text-forest-900">{lead.short}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">{lead.name}</p>
            </div>
          </div>

          {/* Remaining partners as an editorial list rather than a logo soup */}
          <ul className="flex flex-col">
            {rest.map((partner) => (
              <li
                key={partner.name}
                className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-ink-900/8 py-5 first:border-t"
              >
                <span className="font-display text-xl text-forest-900">{partner.name}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-500">{partner.role}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
