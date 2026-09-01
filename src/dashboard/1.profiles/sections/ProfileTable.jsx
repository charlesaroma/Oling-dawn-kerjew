import DataTable from '../../components/DataTable';
import { formatDate } from '../../../utils/formatDate';

const columns = [
  { key: 'fullName', label: 'Name', render: (r) => (
    <div>
      <p className="font-medium text-forest-900">{r.fullName}</p>
      <p className="font-mono text-[10px] text-ink-500">{r.id}</p>
    </div>
  ) },
  { key: 'category', label: 'Category' },
  { key: 'gender', label: 'Gender' },
  { key: 'location', label: 'Location' },
  { key: 'registeredDate', label: 'Registered', render: (r) => formatDate(r.registeredDate) },
];

export default function ProfileTable({ rows, onEdit, onDelete, onVisibleRowsChange }) {
  const rowActions = (row) => (
    <div className="flex justify-end gap-3 text-xs">
      <button type="button" onClick={() => onEdit(row)} className="text-gold-700 hover:text-gold-800">Edit</button>
      <button type="button" onClick={() => onDelete(row.id)} className="text-ink-500 transition-colors hover:text-error">Delete</button>
    </div>
  );

  return (
    <DataTable
      columns={columns}
      rows={rows}
      actions={rowActions}
      searchPlaceholder="Search name, category or location…"
      filters={['category', 'gender']}
      onVisibleRowsChange={onVisibleRowsChange}
      emptyMessage="No profiles registered yet."
    />
  );
}
