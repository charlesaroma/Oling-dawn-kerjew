import { Users, FolderKanban, Images, Newspaper, UsersRound } from 'lucide-react';
import StatCard from '../../components/StatCard';
import { CHART_COLORS } from '../../muiTheme';
import { useAdmin } from '../../../context/AdminContext';

export default function StatsGrid() {
  const { profiles, projects, blogPosts, galleryItems, team } = useAdmin();

  const focusAreaCount = new Set(projects.map((p) => p.category).filter(Boolean)).size;
  const publishedPosts = blogPosts.filter((p) => (p.publishStatus ?? 'published') === 'published').length;

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      <StatCard
        title="Total Profiles"
        value={profiles.length}
        caption={profiles.length ? 'Registered beneficiaries' : 'No submissions yet'}
        icon={Users}
        accent
      />
      <StatCard
        title="Projects"
        value={projects.length}
        caption={focusAreaCount ? `Across ${focusAreaCount} focus area${focusAreaCount === 1 ? '' : 's'}` : 'No projects yet'}
        icon={FolderKanban}
        tint={CHART_COLORS[3]}
      />
      <StatCard
        title="Gallery Items"
        value={galleryItems.length}
        caption={galleryItems.length ? 'Media assets published' : 'No media uploaded yet'}
        icon={Images}
        tint={CHART_COLORS[2]}
      />
      <StatCard
        title="Blog Posts"
        value={blogPosts.length}
        caption={publishedPosts ? 'Articles live on site' : 'No articles live yet'}
        icon={Newspaper}
        tint={CHART_COLORS[1]}
      />
      <StatCard
        title="Team Members"
        value={team.length}
        caption={team.length ? 'Team roster' : 'No members added'}
        icon={UsersRound}
        tint="#6b7280"
      />
    </div>
  );
}
