import { useMemo, useState } from 'react';
import { Trash2 } from 'lucide-react';
import ConfirmModal from '../components/ConfirmModal';
import MediaHeader from './sections/MediaHeader';
import MediaGrid from './sections/MediaGrid';
import EditMediaModal from './sections/EditMediaModal';
import ManageImageCategoriesModal from './modals/ManageImageCategoriesModal';
import { useMedia, useDeleteMedia } from '../../services/mediaQueries';
import { useImageCategories } from '../../services/imageCategoryQueries';
import { useUpload } from './contexts/useUpload';
import { useToast } from '../../context/useToast';

const ITEMS_PER_PAGE = 12;

// Sizes are always stored as "<n> KB" (see media.controller.js) — parse
// back to a number for the "Largest" sort.
const parseSizeKB = (size) => parseInt(size, 10) || 0;

export default function MediaLibrary() {
  const [activeTag, setActiveTag] = useState('');
  const { data: items = [], isLoading, isError } = useMedia(activeTag);
  const { data: categories = [] } = useImageCategories();
  const deleteMedia = useDeleteMedia();
  const { openModal } = useUpload();
  const { addToast } = useToast();

  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('newest');
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [editItem, setEditItem] = useState(null);
  const [confirmId, setConfirmId] = useState(null);
  const [confirmBulk, setConfirmBulk] = useState(false);
  const [manageOpen, setManageOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let rows = q
      ? items.filter((i) => i.alt?.toLowerCase().includes(q) || i.tag?.toLowerCase().includes(q))
      : items;

    rows = [...rows].sort((a, b) => {
      if (sort === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
      if (sort === 'name-asc') return (a.alt || '').localeCompare(b.alt || '');
      if (sort === 'name-desc') return (b.alt || '').localeCompare(a.alt || '');
      if (sort === 'largest') return parseSizeKB(b.size) - parseSizeKB(a.size);
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return rows;
  }, [items, query, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const pageItems = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const toggleSelect = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectAll = () => setSelectedIds(new Set(filtered.map((i) => i.id)));
  const clearSelection = () => setSelectedIds(new Set());

  const confirmTarget = confirmId ? items.find((i) => i.id === confirmId) : null;

  const handleBulkDelete = async () => {
    const ids = [...selectedIds];
    const results = await Promise.allSettled(ids.map((id) => deleteMedia.mutateAsync(id)));
    const failed = results.filter((r) => r.status === 'rejected').length;
    clearSelection();
    setConfirmBulk(false);
    if (failed === 0) {
      addToast(`${ids.length} item${ids.length === 1 ? '' : 's'} deleted`, 'success');
    } else if (failed === ids.length) {
      addToast('Failed to delete selected items', 'error');
    } else {
      addToast(`${ids.length - failed} of ${ids.length} items deleted`, 'warning');
    }
  };

  return (
    <div>
      <MediaHeader
        count={items.length}
        query={query}
        onQueryChange={(v) => { setQuery(v); setPage(1); }}
        sort={sort}
        onSortChange={setSort}
        categories={categories}
        activeTag={activeTag}
        onTagChange={(tag) => { setActiveTag(tag); setPage(1); }}
        onUpload={openModal}
        onManageCategories={() => setManageOpen(true)}
      />

      {isLoading ? (
        <p className="py-16 text-center text-sm text-navy-900/50">Loading…</p>
      ) : isError ? (
        <p className="py-16 text-center text-sm text-error">Failed to load media. Try refreshing the page.</p>
      ) : (
        <>
          <MediaGrid
            items={pageItems}
            selectedIds={selectedIds}
            onToggleSelect={toggleSelect}
            onEdit={setEditItem}
            onDeleteOne={setConfirmId}
          />

          {filtered.length > 0 && (
            <div className="mt-6 flex flex-col items-center gap-3">
              <p className="text-xs text-navy-900/50">
                Showing {pageItems.length} of {filtered.length} item{filtered.length === 1 ? '' : 's'}
                {activeTag ? ` in ${activeTag}` : ''}
              </p>
              {totalPages > 1 && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page <= 1}
                    className="rounded-lg border border-navy-900/10 px-3 py-1.5 text-xs font-semibold text-navy-900/60 transition-colors hover:bg-forest-50 disabled:opacity-30"
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPage(p)}
                      className={`h-8 w-8 rounded-lg text-xs font-semibold transition-colors ${
                        p === page ? 'bg-gold-500 text-navy-900' : 'text-navy-900/50 hover:bg-forest-50'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page >= totalPages}
                    className="rounded-lg border border-navy-900/10 px-3 py-1.5 text-xs font-semibold text-navy-900/60 transition-colors hover:bg-forest-50 disabled:opacity-30"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          )}
        </>
      )}

      {selectedIds.size > 0 && (
        <div className="fixed inset-x-0 bottom-6 z-40 mx-auto flex w-fit items-center gap-4 rounded-full border border-navy-900/8 bg-white px-5 py-3 shadow-elevated-lg">
          {selectedIds.size < filtered.length ? (
            <button type="button" onClick={selectAll} className="text-xs font-semibold text-forest-800 hover:text-forest-900">
              Select all {filtered.length}
            </button>
          ) : (
            <span className="text-xs font-semibold text-forest-800">All items selected</span>
          )}
          <span className="text-xs text-navy-900/50">{selectedIds.size} selected</span>
          <button
            type="button"
            onClick={() => setConfirmBulk(true)}
            className="flex items-center gap-1.5 rounded-full bg-error/10 px-3.5 py-1.5 text-xs font-semibold text-error transition-colors hover:bg-error/20"
          >
            <Trash2 size={13} /> Delete Selected
          </button>
        </div>
      )}

      <EditMediaModal item={editItem} onClose={() => setEditItem(null)} />

      <ManageImageCategoriesModal isOpen={manageOpen} onClose={() => setManageOpen(false)} />

      <ConfirmModal
        isOpen={!!confirmId}
        onClose={() => setConfirmId(null)}
        onConfirm={() => {
          deleteMedia.mutate(confirmId, {
            onSuccess: () => addToast('Media deleted', 'success'),
            onError: (err) => addToast(err.message || 'Failed to delete media', 'error'),
          });
          setConfirmId(null);
        }}
        title="Delete media"
        message={confirmTarget ? `Delete "${confirmTarget.alt || 'this item'}"? This cannot be undone.` : ''}
        confirmLabel="Delete"
      />

      <ConfirmModal
        isOpen={confirmBulk}
        onClose={() => setConfirmBulk(false)}
        onConfirm={handleBulkDelete}
        title="Delete selected media"
        message={`Delete ${selectedIds.size} item${selectedIds.size === 1 ? '' : 's'}? This cannot be undone.`}
        confirmLabel="Delete"
      />
    </div>
  );
}
