import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import ConfirmModal from '../components/ConfirmModal';
import Button from '../../components/common/Button';
import GalleryItemForm from '../components/GalleryItemForm';
import { useAdmin } from '../../context/AdminContext';

export default function GalleryItemList() {
  const { galleryItems, addGalleryItem, updateGalleryItem, deleteGalleryItem } = useAdmin();
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [modalItem, setModalItem] = useState(() => {
    const found = location.state?.editId ? galleryItems.find((i) => i.id === location.state.editId) : null;
    return found ? { item: found } : null;
  });
  const [confirmId, setConfirmId] = useState(null);

  useEffect(() => {
    if (location.state?.editId) navigate(location.pathname, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return galleryItems;
    return galleryItems.filter((i) => i.caption?.toLowerCase().includes(q));
  }, [galleryItems, query]);

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

  const rowActions = (row) => (
    <div className="flex justify-end gap-3 text-xs">
      <button type="button" onClick={() => setModalItem({ item: row })} className="text-gold-700 hover:text-gold-800">Edit</button>
      <button type="button" onClick={() => setConfirmId(row.id)} className="text-navy-900/40 transition-colors hover:text-error">Delete</button>
    </div>
  );

  return (
    <div>
      <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl text-forest-900">Gallery</h1>
          <p className="mt-1 text-sm text-navy-900/60">{galleryItems.length} items</p>
        </div>
        <Button variant="primary" onClick={() => setModalItem({ item: null })}>+ New Item</Button>
      </header>

      <div className="mb-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by caption…"
          className="w-full max-w-xs rounded-xl border border-navy-900/12 bg-white px-3.5 py-2.5 text-sm outline-none transition-all focus:border-gold-500 focus:ring-4 focus:ring-gold-500/10"
        />
      </div>

      <DataTable columns={columns} rows={rows} actions={rowActions} emptyMessage="No gallery items match your search." />

      <Modal
        isOpen={!!modalItem}
        onClose={() => setModalItem(null)}
        title={modalItem?.item ? 'Edit Gallery Item' : 'New Gallery Item'}
      >
        <GalleryItemForm
          initial={modalItem?.item}
          onSubmit={(data) => {
            if (modalItem?.item) updateGalleryItem(modalItem.item.id, data);
            else addGalleryItem(data);
            setModalItem(null);
          }}
          onCancel={() => setModalItem(null)}
        />
      </Modal>

      <ConfirmModal
        isOpen={!!confirmId}
        onClose={() => setConfirmId(null)}
        onConfirm={() => { deleteGalleryItem(confirmId); setConfirmId(null); }}
        title="Delete gallery item"
        message="Delete this gallery item? This cannot be undone."
        confirmLabel="Delete"
      />
    </div>
  );
}
