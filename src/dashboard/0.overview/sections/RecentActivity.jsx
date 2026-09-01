import { useAuditLogs } from '../../../services/auditLogQueries';
import { formatDate } from '../../../utils/formatDate';

export default function RecentActivity() {
  const { data: logs } = useAuditLogs();
  const items = logs.length ? logs : [{ id: 'x', action: 'No activity yet.', createdAt: new Date().toISOString() }];

  return (
    <section className="mt-10">
      <h2 className="mb-4 font-display text-lg text-forest-900">Recent Activity</h2>
      <ul className="divide-y divide-ink-900/6 rounded-2xl border border-ink-900/8 bg-white shadow-elevated">
        {items.slice(0, 8).map((a) => (
          <li key={a.id} className="flex items-center justify-between px-5 py-3.5 text-sm">
            <span className="text-ink-900/80">{a.action}</span>
            <span className="shrink-0 pl-4 font-mono text-[11px] text-ink-900/40">{formatDate(a.createdAt)}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
