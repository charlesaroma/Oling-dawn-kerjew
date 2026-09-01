import { formatDate } from '../../../utils/formatDate';
import { DATA } from '../../../services/jsonDataLoader';

export default function DashboardHeader() {
  const siteConfig = DATA.siteConfig;

  return (
    <header className="mb-8">
      <h1 className="font-display text-3xl text-forest-900">Overview</h1>
      <p className="mt-1 text-sm text-ink-900/60">{formatDate(new Date().toISOString())} · {siteConfig.orgName} Admin</p>
      <p className="mt-2 text-sm text-ink-500">A snapshot of the profiles, projects, and content published across the platform.</p>
    </header>
  );
}
