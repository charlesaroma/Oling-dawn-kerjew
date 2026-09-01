import { Home, HeartPulse, School, Waypoints } from 'lucide-react';
import Container from '../../components/common/Container';
import PageHeader from '../../components/common/PageHeader';
import SectionHeading from '../../components/common/SectionHeading';
import DeliveryGap from './sections/DeliveryGap';
import HowItsBuilt from './sections/HowItsBuilt';
import ProvenDelivery from './sections/ProvenDelivery';
import { useSEO } from '../../hooks/useSEO';

/* Figures and sourcing carried over verbatim from the organisation's own
   conference briefing, attributions included — they are other people's
   research and are cited as such. */
const CONTEXT = [
  { value: '2.03M', label: 'Refugees & asylum-seekers in Uganda', source: 'UNHCR, 31 July 2026', approx: true },
  { value: '150,600', label: 'Registered in Kampala — 9% of the national total', source: 'IIED', approx: true },
  { value: '340,000+', label: 'Estimated undocumented in Kampala Metropolitan', source: 'IIED', approx: true },
  { value: '10%', label: "Of Africa's climate finance needs met domestically", source: 'MUBS Climate Finance & Sustainability Centre' },
];

const BUILDS = [
  { icon: Home, label: 'Refugee & resettlement housing' },
  { icon: HeartPulse, label: 'Health centres and clinics' },
  { icon: School, label: 'Schools and teaching blocks' },
  { icon: Waypoints, label: 'Roads, bridges, drainage and culverts' },
];

export default function Construction() {
  useSEO({
    title: 'Low-Cost Construction',
    description: 'Instead of subsidising rent for ever, we build the thing itself — refugee housing, health facilities, schools, roads and drainage at non-profit cost, using prefabricated modular concrete.',
    image: 'https://olingdawnkerjewprojects.org/construction/entebbe-health-center.jpg',
  });

  return (
    <>
      <PageHeader
        eyebrow="Low-cost, non-profit construction"
        title="Build the thing itself."
        subtitle="Instead of subsidising rent for ever, we build refugee housing, health facilities, schools, roads and drainage at non-profit cost — using prefabricated modular concrete delivered by our building partner."
      />

      {/* THE CONTEXT */}
      <section className="bg-surface-alt py-20 sm:py-28">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            eyebrow="The context"
            title="Climate stress and displacement arrive at the same door."
            subtitle="Uganda hosts the largest refugee population in Africa. A growing share bypass the formal settlements entirely and settle in Kampala, where climate-driven rural pressure, urban rent and informal labour markets collide."
          />
          <dl className="grid gap-px overflow-hidden rounded-2xl border border-ink-900/10 bg-ink-900/10 sm:grid-cols-2 lg:grid-cols-4">
            {CONTEXT.map(({ value, label, source, approx }) => (
              <div key={label} className="flex flex-col bg-white p-7">
                {approx && (
                  <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-bronze-600">Approximately</span>
                )}
                <dd className="mt-1 font-display text-[clamp(2rem,3.4vw,2.75rem)] leading-none text-forest-900 tabular-nums">
                  {value}
                </dd>
                <dt className="mt-3 text-sm leading-relaxed text-ink-600">{label}</dt>
                <p className="mt-auto pt-5 font-mono text-[9px] uppercase tracking-[0.12em] text-ink-500">{source}</p>
              </div>
            ))}
          </dl>
          <p className="max-w-[76ch] leading-relaxed text-ink-600">
            Urban arrivals fall outside the support architecture built for camp-based populations. With no settlement
            food distribution, clinic or school nearby, households navigate rent, hospitals and city life alone —
            usually with no income and no legal work status.
          </p>
        </Container>
      </section>

      <DeliveryGap />

      {/* CAPITAL / THE SOLUTION */}
      <section className="bg-surface-alt py-20 sm:py-28">
        <Container className="grid gap-14 lg:grid-cols-[1fr_0.9fr] lg:gap-20 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="From commitments to capital"
              title="Capital is not the bottleneck. Delivery is."
              subtitle="Africa's climate finance architecture is thickening — funds, facilities, carbon markets, loss-and-damage instruments. What remains thin is the machinery that converts a commitment into a house that stands, a clinic that opens, a household that stops paying rent it cannot afford."
            />
            <ul className="mt-8 flex flex-col gap-4 border-t border-ink-900/10 pt-8">
              {[
                'Instruments are designed for entities that can absorb, report and audit — most affected communities are neither.',
                'Adaptation spend concentrates where fiduciary capacity already exists, which is rarely where vulnerability is highest.',
                'The last mile is a delivery problem before it is a funding problem.',
              ].map((point) => (
                <li key={point} className="flex gap-3 text-sm leading-relaxed text-ink-600">
                  <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold-600" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="overflow-hidden rounded-2xl border border-ink-900/8 bg-white">
            <img
              src="/construction/solution-unit.jpg"
              alt="A completed low-cost modular concrete housing unit"
              loading="lazy"
              width={1200}
              height={900}
              className="aspect-4/3 w-full object-cover"
            />
            <ul className="flex flex-col p-7">
              {BUILDS.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-4 border-b border-ink-900/8 py-4 last:border-0 last:pb-0 first:pt-0">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-500/12 text-gold-700">
                    <Icon size={15} strokeWidth={1.7} />
                  </span>
                  <span className="text-[15px] text-forest-900">{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <HowItsBuilt />
      <ProvenDelivery />
    </>
  );
}
