import { formatDate } from '../../../utils/formatDate';
import { useAdmin } from '../../../context/AdminContext';

export default function DashboardHeader() {
  const { siteConfig } = useAdmin();

  return (
    <header className="mb-8">
      <h1 className="font-display text-3xl text-forest-900">Overview</h1>
      <p className="mt-1 text-sm text-navy-900/60">{formatDate(new Date().toISOString())} · {siteConfig.orgName} Admin</p>
      <p className="mt-2 text-sm text-navy-900/50">A snapshot of the profiles, projects, and content published across the platform.</p>
    </header>
  );
}
