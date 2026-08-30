import { useMemo, useState } from 'react';
import { flexRender } from '@tanstack/react-table';
import { useLegacyTable as useReactTable, getCoreRowModel, getSortedRowModel } from '@tanstack/react-table/legacy';
import { ArrowUp, ArrowDown, ChevronsUpDown } from 'lucide-react';

export default function DataTable({ columns = [], rows = [], keyField = 'id', actions, emptyMessage = 'No records found.' }) {
  const [sorting, setSorting] = useState([]);

  const tableColumns = useMemo(() => {
    const cols = columns.map((col) => ({
      id: col.key,
      accessorFn: (row) => row[col.key],
      header: col.label,
      cell: (info) => (col.render ? col.render(info.row.original) : info.getValue()),
    }));
    if (actions) {
      cols.push({
        id: '__actions',
        header: '',
        enableSorting: false,
        cell: (info) => actions(info.row.original),
      });
    }
    return cols;
  }, [columns, actions]);

  const table = useReactTable({
    data: rows,
    columns: tableColumns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getRowId: (row) => row[keyField],
  });

  if (!rows.length) {
    return (
      <div className="rounded-2xl border border-dashed border-navy-900/15 bg-white px-6 py-16 text-center text-sm text-navy-900/50">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-navy-900/8 bg-white shadow-elevated">
      <table className="w-full min-w-[640px] text-sm">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="border-b border-navy-900/8 bg-surface-alt/60 text-left font-mono text-[10px] uppercase tracking-widest text-navy-900/50">
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="whitespace-nowrap px-4 py-3.5 first:rounded-tl-2xl last:rounded-tr-2xl">
                  {header.isPlaceholder ? null : header.column.getCanSort() ? (
                    <button
                      type="button"
                      onClick={header.column.getToggleSortingHandler()}
                      className="flex items-center gap-1.5 transition-colors hover:text-forest-700"
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {{
                        asc: <ArrowUp size={12} />,
                        desc: <ArrowDown size={12} />,
                      }[header.column.getIsSorted()] ?? <ChevronsUpDown size={12} className="opacity-40" />}
                    </button>
                  ) : (
                    flexRender(header.column.columnDef.header, header.getContext())
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-b border-navy-900/5 transition-colors last:border-0 hover:bg-surface-alt/50">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className={`px-4 py-3.5 align-middle text-navy-900/80 ${cell.column.id === '__actions' ? 'text-right' : ''}`}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
