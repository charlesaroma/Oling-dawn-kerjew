import { Link } from 'react-router-dom';
import { Users, FolderKanban, Images, Newspaper, UsersRound, ArrowRight } from 'lucide-react';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import BarList from '../components/BarList';
import { useAdmin } from '../../context/AdminContext';
import { formatDate } from '../../utils/formatDate';

function countBy(items, field) {
  const counts = {};
  items.forEach((item) => {
    const key = item[field] || 'Uncategorized';
    counts[key] = (counts[key] || 0) + 1;
  });
  return Object.entries(counts)
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value);
}

export default function DashboardHome() {
  const { profiles, projects, blogPosts, galleryItems, team, activity } = useAdmin();

  const recent = [...profiles].sort((a, b) => new Date(b.registeredDate) - new Date(a.registeredDate)).slice(0, 6);

  const columns = [
    { key: 'fullName', label: 'Name' },
    { key: 'category', label: 'Category' },
    { key: 'location', label: 'Location' },
    { key: 'registeredDate', label: 'Registered', render: (r) => formatDate(r.registeredDate) },
  ];

  return (
    <div>
      <header className="mb-8">
        <h1 className="font-display text-3xl text-forest-900">Overview</h1>
        <p className="mt-1 text-sm text-navy-900/60">{formatDate(new Date().toISOString())} · ODKHC Admin</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard title="Total Profiles" value={profiles.length} icon={Users} accent />
        <StatCard title="Projects" value={projects.length} icon={FolderKanban} />
        <StatCard title="Gallery Items" value={galleryItems.length} icon={Images} />
        <StatCard title="Blog Posts" value={blogPosts.length} icon={Newspaper} />
        <StatCard title="Team Members" value={team.length} icon={UsersRound} />
      </div>

      <div className="mt-10 grid gap-6 xl:grid-cols-2">
        <section className="rounded-2xl border border-navy-900/8 bg-white p-6 shadow-elevated">
          <h2 className="mb-5 font-display text-lg text-forest-900">Profiles by Category</h2>
          <BarList data={countBy(profiles, 'category')} emptyMessage="No profiles registered yet." />
        </section>
        <section className="rounded-2xl border border-navy-900/8 bg-white p-6 shadow-elevated">
          <h2 className="mb-5 font-display text-lg text-forest-900">Projects by Focus Area</h2>
          <BarList data={countBy(projects, 'category')} emptyMessage="No projects yet." />
        </section>
      </div>

      <section className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg text-forest-900">Recent Registrations</h2>
          <Link to="/dashboard/profiles" className="flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-gold-600 transition-colors hover:text-gold-700">
            View all <ArrowRight size={13} />
          </Link>
        </div>
        <DataTable columns={columns} rows={recent} emptyMessage="No profiles registered yet. Start with “Register Person.”" />
      </section>

      <section className="mt-10">
        <h2 className="mb-4 font-display text-lg text-forest-900">Recent Activity</h2>
        <ul className="divide-y divide-navy-900/6 rounded-2xl border border-navy-900/8 bg-white shadow-elevated">
          {(activity.length ? activity : [{ id: 'x', message: 'No activity yet.', at: new Date().toISOString() }]).slice(0, 8).map((a) => (
            <li key={a.id} className="flex items-center justify-between px-5 py-3.5 text-sm">
              <span className="text-navy-900/80">{a.message}</span>
              <span className="shrink-0 pl-4 font-mono text-[11px] text-navy-900/40">{formatDate(a.at)}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
