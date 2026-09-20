import { GraduationCap, HeartPulse, Users, Building2, Globe2, TrendingUp } from 'lucide-react';
import Container from '../../../components/common/Container';
import SectionHeading from '../../../components/common/SectionHeading';
import { DATA } from '../../../services/jsonDataLoader';

const IK = 'https://ik.imagekit.io/u8h0uidte/Oling-Dawn-Kerjew-';

const ICONS = [Building2, GraduationCap, HeartPulse, Users, Globe2, TrendingUp];

/* One real, verified photo per pillar — reused from elsewhere on the site
   rather than a stock image, matched by pillar id so the mapping survives
   any reordering of pillars.json. Peace/Leadership has no dedicated photo
   yet; it falls back to the school-community shot until a better match is
   tagged in the media library. */
const PILLAR_IMAGES = {
  'pillar-01': {
    src: `${IK}/distributing_scholarstic_materials_to_under_priviledged_students_20250811_121004.jpg?tr=w-800,q-72`,
    alt: 'Scholastic materials handed to students',
  },
  'pillar-02': {
    src: '/construction/entebbe-health-center.jpg',
    alt: 'Entebbe health centre built by the organisation',
  },
  'pillar-03': {
    src: `${IK}/ladies_hairdressing_training_20250812_123723.jpg?tr=w-800,q-72`,
    alt: "Women's vocational training in hairdressing",
  },
  'pillar-04': {
    src: 'https://ik.imagekit.io/u8h0uidte/oling-dawn-kerjew-projects/media/sudanese-refugees-5_9cxTSl1c3.jpeg?tr=w-800,q-72',
    alt: 'Food aid distributed to a vulnerable refugee family',
  },
  'pillar-05': {
    src: `${IK}/NGO_secondary_school_20250811_120553.jpg?tr=w-800,q-72`,
    alt: 'Students at a secondary school supported by the organisation',
  },
  'pillar-06': {
    src: `${IK}/distributing_agricultural_tools_hoes_MG_7659.JPG?tr=w-800,q-72`,
    alt: 'Distributing agricultural tools to farming households in Oyam District',
  },
};

export default function PillarsSection() {
  const { pillars } = DATA;

  return (
    <section className="border-y border-ink-900/8 bg-surface-alt py-20 sm:py-28">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="What we do"
          title="Six areas, one commitment."
          subtitle="Each pillar runs continuously rather than as a one-off campaign. The buildings, the training and the follow-up all sit under the same programme."
        />

        <div className="grid gap-px overflow-hidden rounded-2xl border border-ink-900/8 bg-ink-900/8 shadow-elevated sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar, index) => {
            const Icon = ICONS[index % ICONS.length];
            const image = PILLAR_IMAGES[pillar.id];
            return (
              <div key={pillar.id} className="group relative flex min-h-[15rem] flex-col justify-end gap-4 overflow-hidden bg-surface-card p-8">
                {image && (
                  <>
                    <img
                      src={image.src}
                      alt={image.alt}
                      loading="lazy"
                      width={800}
                      height={600}
                      className="absolute inset-0 h-full w-full object-cover opacity-70 transition-all duration-500 group-hover:scale-105 group-hover:opacity-85"
                    />
                    <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/75 to-ink-900/30" />
                  </>
                )}
                <span className="relative flex h-11 w-11 items-center justify-center rounded-full border border-surface/15 text-gold-400 transition-colors duration-300 group-hover:border-gold-500/50">
                  <Icon size={18} strokeWidth={1.6} />
                </span>
                <p className="relative font-display text-xl leading-snug text-surface">{pillar.title}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
