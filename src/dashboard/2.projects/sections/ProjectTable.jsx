import DataTable from '../../components/DataTable';
import StatusPill from '../../components/StatusPill';

const columns = [
  { key: 'title', label: 'Title', render: (r) => (
    <div>
      <p className="font-medium text-forest-900">{r.title}</p>
      <p className="font-mono text-[10px] text-ink-900/40">{r.slug}</p>
    </div>
  ) },
  { key: 'category', label: 'Category' },
  { key: 'status', label: 'Lifecycle' },
  { key: 'publishStatus', label: 'Publish', render: (r) => <StatusPill status={r.publishStatus} /> },
  { key: 'year', label: 'Year' },
];

export default function ProjectTable({ rows, onTogglePublish, onEdit, onDelete }) {
  const rowActions = (row) => (
    <div className="flex justify-end gap-3 text-xs">
      <button type="button" onClick={() => onTogglePublish(row)} className="text-gold-700 hover:text-gold-800">
        {(row.publishStatus ?? 'published') === 'draft' ? 'Publish' : 'Unpublish'}
      </button>
      <button type="button" onClick={() => onEdit(row)} className="text-gold-700 hover:text-gold-800">Edit</button>
      <button type="button" onClick={() => onDelete(row.id)} className="text-ink-900/40 transition-colors hover:text-error">Delete</button>
    </div>
  );

  return <DataTable columns={columns} rows={rows} actions={rowActions} emptyMessage="No projects match your search." />;
}
