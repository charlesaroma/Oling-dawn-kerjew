import DataTable from '../../components/DataTable';

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'role', label: 'Role' },
];

export default function TeamTable({ rows, onEdit, onDelete }) {
  const rowActions = (row) => (
    <div className="flex justify-end gap-3 text-xs">
      <button type="button" onClick={() => onEdit(row)} className="text-gold-700 hover:text-gold-800">Edit</button>
      <button type="button" onClick={() => onDelete(row.id)} className="text-ink-500 transition-colors hover:text-error">Delete</button>
    </div>
  );

  return <DataTable columns={columns} rows={rows} actions={rowActions} emptyMessage="No team members yet — add the first one." />;
}
