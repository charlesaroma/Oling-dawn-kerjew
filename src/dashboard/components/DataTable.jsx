export default function DataTable({ columns = [], rows = [], keyField = 'id', actions, emptyMessage = 'No records found.' }) {
  if (!rows.length) {
    return <div className="border border-navy-900/10 bg-white px-6 py-16 text-center text-sm text-navy-900/50">{emptyMessage}</div>;
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-navy-900/10 bg-white">
      <table className="w-full min-w-[640px] text-sm">
        <thead>
          <tr className="border-b border-navy-900/10 text-left font-mono text-[10px] uppercase tracking-widest text-navy-900/50">
            {columns.map((col) => (
              <th key={col.key} className="whitespace-nowrap px-4 py-3">{col.label}</th>
            ))}
            {actions && <th className="px-4 py-3 text-right">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[keyField]} className="border-b border-navy-900/5 transition-colors last:border-0 hover:bg-surface-alt">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 align-middle text-navy-900/80">
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
              {actions && <td className="px-4 py-3 text-right">{actions(row)}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
