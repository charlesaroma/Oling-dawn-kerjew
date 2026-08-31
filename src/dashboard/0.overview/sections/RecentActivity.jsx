import { useAdmin } from '../../../context/AdminContext';
import { formatDate } from '../../../utils/formatDate';

export default function RecentActivity() {
  const { activity } = useAdmin();
  const items = activity.length ? activity : [{ id: 'x', message: 'No activity yet.', at: new Date().toISOString() }];

  return (
    <section className="mt-10">
      <h2 className="mb-4 font-display text-lg text-forest-900">Recent Activity</h2>
      <ul className="divide-y divide-navy-900/6 rounded-2xl border border-navy-900/8 bg-white shadow-elevated">
        {items.slice(0, 8).map((a) => (
          <li key={a.id} className="flex items-center justify-between px-5 py-3.5 text-sm">
            <span className="text-navy-900/80">{a.message}</span>
            <span className="shrink-0 pl-4 font-mono text-[11px] text-navy-900/40">{formatDate(a.at)}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
