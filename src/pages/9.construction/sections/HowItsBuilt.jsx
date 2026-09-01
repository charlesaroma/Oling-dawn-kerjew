import { Clock, Coins, ShieldCheck, Layers, Wrench } from 'lucide-react';
import Container from '../../../components/common/Container';
import SectionHeading from '../../../components/common/SectionHeading';

const STEPS = [
  { n: '01', title: 'Cast', note: 'Reinforced concrete poured into steel moulds, vibrated and compacted.', img: '/construction/build-01-cast.jpg' },
  { n: '02', title: 'Transport', note: 'Cured units loaded and hauled to site by road.', img: '/construction/build-02-transport.jpg' },
  { n: '03', title: 'Install', note: 'Modules craned into final position on prepared foundations.', img: '/construction/build-03-install.jpg' },
  { n: '04', title: 'Finish', note: 'Fitted out, rendered and handed over as a finished home.', img: '/construction/build-04-finish.jpg' },
];

const ADVANTAGES = [
  { icon: Clock, title: 'Fast', note: 'Units arrive cured and ready. Site time collapses from months to days — decisive after a flood or an eviction wave.' },
  { icon: Coins, title: 'Economical', note: 'Factory repetition strips out the cost and waste of one-off site construction.' },
  { icon: ShieldCheck, title: 'Durable', note: 'Reinforced concrete, not sheeting. Built to last decades, not a season.' },
  { icon: Layers, title: 'Scalable', note: 'One mould makes two one-room units; four make an 80m² family home. Storeys stack for density.' },
  { icon: Wrench, title: 'Customised', note: 'The same system produces dormitories, clinics, classrooms, offices and border posts.' },
];

export default function HowItsBuilt() {
  return (
    <>
      {/* The numbering here is real: these are sequential stages, not decoration. */}
      <section className="bg-surface py-20 sm:py-28">
        <Container className="flex flex-col gap-14">
          <SectionHeading
            eyebrow="How it is built"
            title="A house is cast in a plant, not improvised on a site."
            subtitle="Reinforced concrete is cast in moulds, vibrated, compacted and cured under factory control, then transported and craned into position. External unit: 6m × 3.3m × 3m, 150mm walls, 1.2m canopy."
          />
          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map(({ n, title, note, img }) => (
              <li key={n} className="flex flex-col overflow-hidden rounded-2xl border border-ink-900/8 bg-white">
                <img
                  src={img}
                  alt={`${title} — ${note}`}
                  loading="lazy"
                  width={1200}
                  height={900}
                  className="aspect-4/3 w-full object-cover saturate-[0.85]"
                />
                <div className="flex flex-1 flex-col p-6">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-bronze-600">{n}</span>
                  <p className="mt-2 font-display text-2xl text-forest-900">{title}</p>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-500">{note}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="border-y border-ink-900/8 bg-surface-alt py-20 sm:py-28">
        <Container className="grid gap-14 lg:grid-cols-[1fr_0.85fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Why modular fits this problem"
              title="Fast, repeatable, and cheap enough to matter."
            />
            <dl className="mt-10 flex flex-col">
              {ADVANTAGES.map(({ icon: Icon, title, note }) => (
                <div key={title} className="flex gap-5 border-b border-ink-900/8 py-6 first:border-t">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink-900/10 text-forest-700">
                    <Icon size={16} strokeWidth={1.6} />
                  </span>
                  <div>
                    <dt className="font-display text-xl text-forest-900">{title}</dt>
                    <dd className="mt-1.5 max-w-[52ch] text-sm leading-relaxed text-ink-600">{note}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>

          <div className="flex flex-col gap-6">
            {[
              { src: '/construction/modular-storeys.jpg', cap: 'Storeys stack: modular units assembled to three floors.' },
              { src: '/construction/modular-row.jpg', cap: 'Row housing assembled from repeated units.' },
            ].map(({ src, cap }) => (
              <figure key={src} className="overflow-hidden rounded-2xl border border-ink-900/8 bg-white">
                <img src={src} alt={cap} loading="lazy" width={1200} height={800} className="aspect-3/2 w-full object-cover saturate-[0.85]" />
                <figcaption className="px-5 py-4 text-xs leading-relaxed text-ink-500">{cap}</figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
