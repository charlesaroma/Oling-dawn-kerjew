import { TrendingUp, LayoutGrid, Clock, UserCheck } from 'lucide-react';
import { useProfiles } from '../../../services/profileQueries';
import { useProjects } from '../../../services/projectQueries';
import { useMedia } from '../../../services/mediaQueries';
import { useBlogPosts } from '../../../services/blogQueries';
import { useTeam } from '../../../services/teamQueries';
import { buildHighlights } from '../../../utils/buildHighlights';

const ICONS = { trend: TrendingUp, library: LayoutGrid, pending: Clock, people: UserCheck };

export default function HighlightsPanel() {
  const { data: profiles } = useProfiles();
  const { data: projects } = useProjects();
  const { data: galleryItems } = useMedia();
  const { data: blogPosts } = useBlogPosts();
  const { data: team } = useTeam();
  const highlights = buildHighlights({ profiles, projects, galleryItems, blogPosts, team });

  return (
    <section className="rounded-2xl border border-ink-900/8 bg-white p-6 shadow-elevated">
      <h2 className="font-display text-lg text-forest-900">Highlights</h2>
      <p className="mb-5 mt-1 text-sm text-ink-500">Read on the numbers above</p>
      <ul className="space-y-4">
        {highlights.map((h) => {
          const Icon = ICONS[h.icon];
          return (
            <li key={h.icon} className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold-50 text-gold-700">
                <Icon size={15} strokeWidth={2} />
              </span>
              <p className="text-sm leading-relaxed text-ink-900/70">
                {h.pre}
                <strong className="font-semibold text-forest-900">{h.bold}</strong>
                {h.post}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
