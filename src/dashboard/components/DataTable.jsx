import { useEffect, useMemo, useRef, useState } from 'react';
import { flexRender } from '@tanstack/react-table';
import {
  useLegacyTable as useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table/legacy';
import {
  ArrowUp, ArrowDown, ChevronsUpDown, Search, SlidersHorizontal, Check,
  ChevronLeft, ChevronRight, X,
} from 'lucide-react';

const PAGE_SIZES = [10, 25, 50];

/*
  One table for every dashboard list. Search, per-column filters, column
  visibility and pagination all live here rather than being re-implemented
  per page — and below `sm` the rows re-render as cards, because a horizontally
  scrolling table is unusable on a phone.
*/
export default function DataTable({
  columns = [],
  rows = [],
  keyField = 'id',
  actions,
  emptyMessage = 'No records found.',
  searchable = true,
  searchPlaceholder = 'Search…',
  filters = [],
  pageSize = 10,
  onVisibleRowsChange,
}) {
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [columnsOpen, setColumnsOpen] = useState(false);
  const columnsRef = useRef(null);

  const tableColumns = useMemo(() => {
    const cols = columns.map((col) => ({
      id: col.key,
      accessorFn: (row) => row[col.key],
      header: col.label,
      enableHiding: col.hideable !== false,
      cell: (info) => (col.render ? col.render(info.row.original) : info.getValue()),
    }));
    if (actions) {
      cols.push({ id: '__actions', header: '', enableSorting: false, enableHiding: false, cell: (info) => actions(info.row.original) });
    }
    return cols;
  }, [columns, actions]);

  const table = useReactTable({
    data: rows,
    columns: tableColumns,
    state: { sorting, globalFilter, columnFilters, columnVisibility },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    globalFilterFn: 'includesString',
    initialState: { pagination: { pageSize } },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getRowId: (row) => row[keyField],
  });

  const filteredRows = table.getFilteredRowModel().rows;
  const filteredCount = filteredRows.length;

  // Let the page act on what's actually visible (e.g. exporting the filtered
  // set rather than everything). Keyed on ids so it only fires on real change.
  const idsKey = filteredRows.map((r) => r.id).join(',');
  useEffect(() => {
    onVisibleRowsChange?.(filteredRows.map((r) => r.original));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idsKey]);

  useEffect(() => {
    if (!columnsOpen) return undefined;
    const onDown = (e) => { if (!columnsRef.current?.contains(e.target)) setColumnsOpen(false); };
    const onKey = (e) => { if (e.key === 'Escape') setColumnsOpen(false); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey); };
  }, [columnsOpen]);

  // Dropdown options for each requested filter column, derived from the data
  const filterOptions = useMemo(() => {
    const map = {};
    filters.forEach((key) => {
      map[key] = [...new Set(rows.map((r) => r[key]).filter(Boolean))].sort();
    });
    return map;
  }, [filters, rows]);

  const activeFilters = columnFilters.filter((f) => f.value);
  const hasToolbar = searchable || filters.length > 0 || columns.some((c) => c.hideable !== false);
  const hiddenCount = Object.values(columnVisibility).filter((v) => v === false).length;
  const setFilter = (key, value) =>
    setColumnFilters((prev) => [...prev.filter((f) => f.id !== key), ...(value ? [{ id: key, value }] : [])]);

  const CONTROL =
    'rounded-xl border border-ink-900/10 bg-white px-3.5 py-2.5 text-sm text-ink-700 outline-none transition-all duration-200 focus:border-gold-500 focus:ring-4 focus:ring-gold-500/10';

  return (
    <div className="flex flex-col gap-4">
      {hasToolbar && (
        <div className="flex flex-wrap items-center gap-2.5">
          {searchable && (
            <div className="relative min-w-[200px] flex-1 sm:max-w-xs">
              <Search size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
              <input
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                placeholder={searchPlaceholder}
                aria-label={searchPlaceholder}
                className={`${CONTROL} w-full pl-10 ${globalFilter ? 'pr-9' : ''}`}
              />
              {globalFilter && (
                <button
                  type="button"
                  onClick={() => setGlobalFilter('')}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 transition-colors hover:text-error"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          )}

          {filters.map((key) => {
            const col = columns.find((c) => c.key === key);
            const current = columnFilters.find((f) => f.id === key)?.value ?? '';
            return (
              <select
                key={key}
                value={current}
                onChange={(e) => setFilter(key, e.target.value)}
                aria-label={`Filter by ${col?.label ?? key}`}
                className={`${CONTROL} ${current ? 'border-gold-500/50 text-forest-800' : ''}`}
              >
                <option value="">All {col?.label?.toLowerCase() ?? key}</option>
                {filterOptions[key]?.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            );
          })}

          {activeFilters.length > 0 && (
            <button
              type="button"
              onClick={() => setColumnFilters([])}
              className="text-xs font-semibold text-ink-500 underline underline-offset-4 transition-colors hover:text-error"
            >
              Clear filters
            </button>
          )}

          <div ref={columnsRef} className="relative ml-auto">
            <button
              type="button"
              onClick={() => setColumnsOpen((v) => !v)}
              aria-expanded={columnsOpen}
              aria-haspopup="true"
              className={`${CONTROL} flex items-center gap-2 font-medium hover:border-ink-900/25`}
            >
              <SlidersHorizontal size={14} />
              Columns
              {hiddenCount > 0 && (
                <span className="rounded-full bg-gold-500 px-1.5 py-0.5 font-mono text-[9px] text-ink-900 tabular-nums">
                  {hiddenCount}
                </span>
              )}
            </button>

            {columnsOpen && (
              <div className="absolute right-0 z-30 mt-2 w-56 overflow-hidden rounded-xl border border-ink-900/10 bg-white py-1.5 shadow-elevated-lg">
                <p className="px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-500">
                  Show columns
                </p>
                {table.getAllLeafColumns().filter((c) => c.getCanHide()).map((col) => {
                  const label = columns.find((c) => c.key === col.id)?.label ?? col.id;
                  const visible = col.getIsVisible();
                  return (
                    <button
                      key={col.id}
                      type="button"
                      role="menuitemcheckbox"
                      aria-checked={visible}
                      onClick={() => col.toggleVisibility()}
                      className="flex w-full items-center gap-2.5 px-3.5 py-2 text-left text-sm text-ink-700 transition-colors hover:bg-surface"
                    >
                      <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${visible ? 'border-gold-500 bg-gold-500 text-ink-900' : 'border-ink-900/20'}`}>
                        {visible && <Check size={11} strokeWidth={3} />}
                      </span>
                      {label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {filteredCount === 0 ? (
        <div className="rounded-2xl border border-dashed border-ink-900/12 bg-white px-6 py-20 text-center text-sm text-ink-500">
          {rows.length === 0 ? emptyMessage : 'Nothing matches those filters.'}
        </div>
      ) : (
        <>
          {/* TABLE — sm and up */}
          <div className="hidden overflow-x-auto rounded-2xl border border-ink-900/8 bg-white sm:block">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id} className="border-b border-ink-900/8 bg-surface/60 text-left font-mono text-[10px] uppercase tracking-[0.14em] text-ink-500">
                    {headerGroup.headers.map((header) => (
                      <th key={header.id} className="whitespace-nowrap px-5 py-4 first:rounded-tl-2xl last:rounded-tr-2xl">
                        {header.isPlaceholder ? null : header.column.getCanSort() ? (
                          <button
                            type="button"
                            onClick={header.column.getToggleSortingHandler()}
                            className="flex items-center gap-1.5 transition-colors hover:text-forest-700"
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {{ asc: <ArrowUp size={12} />, desc: <ArrowDown size={12} /> }[header.column.getIsSorted()]
                              ?? <ChevronsUpDown size={12} className="opacity-40" />}
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
                  <tr key={row.id} className="border-b border-ink-900/6 transition-colors last:border-0 hover:bg-surface/70">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className={`px-5 py-4 align-middle text-ink-700 ${cell.column.id === '__actions' ? 'text-right' : ''}`}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* CARDS — below sm, where a wide table can't work */}
          <div className="flex flex-col gap-3 sm:hidden">
            {table.getRowModel().rows.map((row) => {
              const cells = row.getVisibleCells();
              const [lead, ...rest] = cells.filter((c) => c.column.id !== '__actions');
              const rowActions = cells.find((c) => c.column.id === '__actions');
              return (
                <div key={row.id} className="rounded-2xl border border-ink-900/8 bg-white p-4">
                  {lead && (
                    <div className="text-[15px] text-forest-900">
                      {flexRender(lead.column.columnDef.cell, lead.getContext())}
                    </div>
                  )}
                  {rest.length > 0 && (
                    <dl className="mt-3 grid gap-2 border-t border-ink-900/6 pt-3">
                      {rest.map((cell) => (
                        <div key={cell.id} className="flex items-baseline justify-between gap-4">
                          <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-500">
                            {columns.find((c) => c.key === cell.column.id)?.label ?? cell.column.id}
                          </dt>
                          <dd className="min-w-0 text-right text-sm text-ink-700">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  )}
                  {rowActions && (
                    <div className="mt-3 border-t border-ink-900/6 pt-3">
                      {flexRender(rowActions.column.columnDef.cell, rowActions.getContext())}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-500">
              {filteredCount} {filteredCount === 1 ? 'record' : 'records'}
              {filteredCount !== rows.length && <span className="text-ink-400"> of {rows.length}</span>}
            </p>

            <label className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-500">
              Rows
              <select
                value={table.getState().pagination.pageSize}
                onChange={(e) => table.setPageSize(Number(e.target.value))}
                aria-label="Rows per page"
                className="rounded-lg border border-ink-900/10 bg-white px-2 py-1 font-mono text-[11px] text-ink-700 outline-none focus:border-gold-500"
              >
                {PAGE_SIZES.map((n) => <option key={n} value={n}>{n}</option>)}
              </select>
            </label>

            {table.getPageCount() > 1 && (
              <div className="ml-auto flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  aria-label="Previous page"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink-900/10 text-ink-600 transition-colors hover:bg-surface disabled:opacity-30"
                >
                  <ChevronLeft size={15} />
                </button>
                <span className="px-2 font-mono text-[11px] text-ink-600 tabular-nums">
                  {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
                </span>
                <button
                  type="button"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  aria-label="Next page"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink-900/10 text-ink-600 transition-colors hover:bg-surface disabled:opacity-30"
                >
                  <ChevronRight size={15} />
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
