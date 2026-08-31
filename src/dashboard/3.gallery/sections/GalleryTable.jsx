import DataTable from '../../components/DataTable';

const columns = [
  { key: 'caption', label: 'Caption', render: (r) => (
    <div>
      <p className="font-medium text-forest-900">{r.caption || '(no caption)'}</p>
      <p className="font-mono text-[10px] text-navy-900/40">{r.src}</p>
    </div>
  ) },
  { key: 'type', label: 'Type' },
  { key: 'projectSlug', label: 'Linked Project' },
];

export default function GalleryTable({ rows, onEdit, onDelete }) {
  const rowActions = (row) => (
    <div className="flex justify-end gap-3 text-xs">
      <button type="button" onClick={() => onEdit(row)} className="text-gold-700 hover:text-gold-800">Edit</button>
      <button type="button" onClick={() => onDelete(row.id)} className="text-navy-900/40 transition-colors hover:text-error">Delete</button>
    </div>
  );

  return <DataTable columns={columns} rows={rows} actions={rowActions} emptyMessage="No gallery items match your search." />;
}
