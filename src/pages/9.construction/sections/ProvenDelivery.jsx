import { Handshake, LineChart, GitBranch, BadgeCheck, ShieldCheck } from 'lucide-react';
import Container from '../../../components/common/Container';
import SectionHeading from '../../../components/common/SectionHeading';

const WORKS = [
  { src: '/construction/entebbe-health-center.jpg', name: 'Entebbe Health Centre', where: 'Entebbe' },
  { src: '/construction/bukedea-teachers-lodge.jpg', name: "Bukedea Comprehensive School Teachers' Lodge", where: 'Bukedea' },
  { src: '/construction/mulago-oxygen-plant.jpg', name: 'Mulago Oxygen Plant', where: 'Kampala' },
  { src: '/construction/namanve-bridges.jpg', name: 'Bridges & box culverts', where: 'Namanve Industrial Park' },
];

const ASKS = [
  { icon: Handshake, title: 'Co-financing partners', note: 'Institutions ready to fund construction at district scale.' },
  { icon: LineChart, title: 'Technical and MEL support', note: 'Help building the measurement and verification layer.' },
  { icon: GitBranch, title: 'Pipeline placement', note: 'Inclusion in national and regional climate finance pipelines.' },
  { icon: BadgeCheck, title: 'Accreditation pathway', note: 'Support toward the fiduciary standards the new funds require.' },
];

export default function ProvenDelivery() {
  return (
    <>
      <section className="bg-surface py-20 sm:py-28">
        <Container className="flex flex-col gap-14">
          <SectionHeading
            eyebrow="Proven delivery"
            title="Our building partner has already done this at national scale."
            subtitle="Modulhouse Engineering and Construction Co. Ltd. (MEACCO) has delivered government and institutional works across Uganda. The technology is proven; what is missing is the capital to point it at displaced and vulnerable households."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WORKS.map(({ src, name, where }) => (
              <figure key={src} className="group overflow-hidden rounded-2xl border border-ink-900/8 bg-white">
                <img
                  src={src}
                  alt={`${name}, ${where} — built by MEACCO`}
                  loading="lazy"
                  width={1400}
                  height={1050}
                  className="aspect-4/3 w-full object-cover saturate-[0.8] transition-all duration-700 group-hover:scale-[1.03] group-hover:saturate-100"
                />
                <figcaption className="px-5 py-5">
                  <p className="font-display text-lg leading-snug text-forest-900">{name}</p>
                  <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-500">{where}</p>
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="text-xs leading-relaxed text-ink-500">
            Works completed by Modulhouse Engineering and Construction Co. Ltd. (MEACCO), our building partner.
          </p>
        </Container>
      </section>

      <section className="border-t border-surface/10 bg-ink-900 py-20 sm:py-28">
        <Container className="grid gap-14 lg:grid-cols-[1fr_0.8fr] lg:gap-20">
          <div>
            <SectionHeading eyebrow="The ask" title="What we are seeking from partners." tone="dark" />
            <dl className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-surface/12 bg-surface/12 sm:grid-cols-2">
              {ASKS.map(({ icon: Icon, title, note }) => (
                <div key={title} className="flex flex-col gap-4 bg-ink-900 p-7">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-surface/15 text-gold-400">
                    <Icon size={16} strokeWidth={1.6} />
                  </span>
                  <div>
                    <dt className="font-display text-lg text-surface">{title}</dt>
                    <dd className="mt-2 text-sm leading-relaxed text-surface/60">{note}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>

          <aside className="h-fit rounded-2xl border border-gold-500/25 bg-gold-500/8 p-7">
            <p className="flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-gold-400">
              <ShieldCheck size={14} strokeWidth={1.8} />
              Safeguarding
            </p>
            <p className="mt-4 text-sm leading-relaxed text-surface/70">
              Every case referenced in our briefings is handled individually, with consent and safeguarding review,
              before any details are shared beyond the organisations directly supporting the family.
            </p>
          </aside>
        </Container>
      </section>
    </>
  );
}
