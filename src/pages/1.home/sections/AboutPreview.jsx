import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Container from '../../../components/common/Container';
import MediaImage from '../../../components/media/MediaImage';
import { useProjects } from '../../../services/projectQueries';
import { getProjectCategories } from '../../../services/projectsService';

export default function AboutPreview() {
  const { data: projects } = useProjects();
  const districts = new Set(
    projects.map((p) => p.location?.split(',')[0].trim()).filter(Boolean),
  );

  const stats = [
    { value: String(projects.length), label: 'Initiatives' },
    { value: String(getProjectCategories(projects).length), label: 'Focus areas' },
    { value: String(districts.size), label: 'Districts reached' },
  ];

  return (
    <section className="bg-surface-alt py-20 sm:py-28">
      <Container className="grid gap-14 lg:grid-cols-[1fr_0.85fr] lg:items-center lg:gap-20">
        <div>
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-bronze-600">
            Who we are
          </span>

          <h2 className="mt-5 max-w-[18ch] font-display text-[clamp(1.9rem,3.6vw,2.9rem)] leading-[1.04] tracking-[-0.02em] text-forest-900 text-balance">
            One programme, six pillars, no one-off campaigns.
          </h2>

          <p className="mt-6 max-w-[52ch] leading-relaxed text-ink-600">
            From modular concrete housing to scholarships, vocational training and community
            health support, every initiative here is work already under way in Northern Uganda, with
            each pillar running continuously, alongside the people who use what we build.
          </p>

          <Link
            to="/about"
            className="group mt-8 inline-flex items-center gap-2.5 rounded-full border border-ink-900/15 px-6 py-3 text-sm font-semibold text-forest-900 transition-all duration-200 hover:-translate-y-0.5 hover:border-ink-900/30 hover:bg-ink-900/5"
          >
            Learn about us
            <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>

          <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-ink-900/10 pt-8">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dd className="font-display text-[clamp(1.8rem,3.2vw,2.5rem)] leading-none text-forest-900 tabular-nums">
                  {stat.value || '—'}
                </dd>
                <dt className="mt-2.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-500">{stat.label}</dt>
              </div>
            ))}
          </dl>
        </div>

        <div className="aspect-4/5 overflow-hidden rounded-[28px] shadow-elevated-lg">
          <MediaImage
            src="https://ik.imagekit.io/u8h0uidte/oling-dawn-kerjew-projects/media/arova-school-4_f5dregfkn.jpg"
            alt="Educational initiatives and youth workshops at a village school in Oyam District"
            width={640}
            height={800}
            className="h-full w-full object-cover"
          />
        </div>
      </Container>
    </section>
  );
}
