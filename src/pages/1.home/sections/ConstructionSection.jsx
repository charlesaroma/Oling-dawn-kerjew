import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from '../../../components/common/Container';
import SectionHeading from '../../../components/common/SectionHeading';

/* The method and the photographs here belong to MEACCO (Modulhouse
   Engineering and Construction Co. Ltd.), the engineering partner — they are
   its completed works, not Oling Dawn Kerjew's own builds, and the section
   credits them as such rather than implying otherwise. Details are taken
   from MEACCO's own product documentation. */
const SPECS = [
  { value: '6 × 3.3 × 3m', label: 'Module size' },
  { value: '150mm', label: 'Wall thickness' },
  { value: '10–80m²', label: 'Unit range' },
  { value: 'Reusable', label: 'Mould system' },
];

const BUILT = [
  { src: '/construction/entebbe-health-center.jpg', name: 'Entebbe Health Centre', type: 'Healthcare' },
  { src: '/construction/bukedea-teachers-lodge.jpg', name: "Bukedea Comprehensive School Teachers' Lodge", type: 'Education' },
  { src: '/construction/mulago-oxygen-plant.jpg', name: 'Mulago New Oxygen Plant', type: 'Healthcare' },
  { src: '/construction/namanve-bridges.jpg', name: 'Namanve Industrial Park bridges', type: 'Infrastructure' },
];

export default function ConstructionSection() {
  return (
    <section className="border-y border-surface/10 bg-ink-900 py-20 sm:py-28">
      <Container className="flex flex-col gap-14">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Low-cost construction"
            title="Prefabricated. Assembled on site. Built to last."
            subtitle="Hospitals, schools, roads and bridges delivered without the margins that put this infrastructure out of reach. Reinforced concrete modules are cast in moulds off site, cured, then transported and assembled where they are needed."
            tone="dark"
          />
          <Link
            to="/construction"
            className="group flex shrink-0 items-center gap-2 border-b border-gold-500/40 pb-1 text-sm font-semibold text-gold-400 transition-colors hover:border-gold-500"
          >
            How it works
            <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        <dl className="grid grid-cols-2 gap-y-10 border-y border-surface/12 py-10 sm:grid-cols-4 sm:gap-y-0">
          {SPECS.map((spec, i) => (
            <div key={spec.label} className={`px-2 sm:px-8 ${i > 0 ? 'sm:border-l sm:border-surface/12' : 'sm:pl-0'}`}>
              <dd className="font-display text-[clamp(1.5rem,2.6vw,2.15rem)] leading-none text-surface">{spec.value}</dd>
              <dt className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-surface/55">{spec.label}</dt>
            </div>
          ))}
        </dl>

        <div>
          <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.16em] text-surface/55">
            Delivered by our engineering partner, MEACCO
          </p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {BUILT.map((build) => (
              <figure key={build.src} className="group overflow-hidden rounded-2xl border border-surface/12">
                <img
                  src={build.src}
                  alt={`${build.name} — modular concrete building constructed by MEACCO`}
                  loading="lazy"
                  width={1400}
                  height={1050}
                  className="aspect-4/3 w-full object-cover saturate-[0.8] transition-all duration-700 group-hover:scale-[1.03] group-hover:saturate-100"
                />
                <figcaption className="bg-ink-800 px-4 py-4">
                  <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-gold-400">{build.type}</p>
                  <p className="mt-1.5 text-sm leading-snug text-surface/85">{build.name}</p>
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-6 text-xs leading-relaxed text-surface/55">
            Projects completed by Modulhouse Engineering and Construction Co. Ltd. (MEACCO), the engineering
            partner delivering our low-cost construction programme.
          </p>
        </div>
      </Container>
    </section>
  );
}
