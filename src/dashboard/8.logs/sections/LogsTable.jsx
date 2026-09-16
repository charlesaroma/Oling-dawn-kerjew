import DataTable from '../../components/DataTable';
import SeverityPill from '../../components/SeverityPill';

const formatWhen = (dateString) => {
  if (!dateString) return '—';
  return new Date(dateString).toLocaleString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit',
  });
};

const columns = [
  { key: 'action', label: 'Action', render: (r) => (
    <div className="min-w-0">
      <p className="font-medium text-forest-900">{r.action}</p>
      {r.entityId && <p className="truncate font-mono text-[10px] text-ink-500">{r.entityId}</p>}
    </div>
  ) },
  { key: 'entityType', label: 'Entity type' },
  { key: 'actor', label: 'Actor', render: (r) => (
    <div className="min-w-0">
      <p className="text-forest-900">{r.actor?.name || r.actorName || 'System'}</p>
      {r.actor?.email && <p className="truncate text-xs text-ink-500">{r.actor.email}</p>}
    </div>
  ) },
  { key: 'severity', label: 'Severity', render: (r) => <SeverityPill severity={r.severity} /> },
  { key: 'createdAt', label: 'When', render: (r) => (
    <span className="whitespace-nowrap font-mono text-xs text-ink-600 tabular-nums">{formatWhen(r.createdAt)}</span>
  ) },
];

export default function LogsTable({ rows }) {
  return (
    <DataTable
      columns={columns}
      rows={rows}
      keyField="id"
      searchPlaceholder="Search action, entity or actor…"
      filters={['entityType', 'severity']}
      emptyMessage="No activity recorded yet."
      initialSorting={[{ id: 'createdAt', desc: true }]}
    />
  );
}
