import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import ConfirmModal from '../components/ConfirmModal';
import Button from '../../components/common/Button';
import GalleryListHeader from './sections/GalleryListHeader';
import GalleryTable from './sections/GalleryTable';
import GalleryItemForm from './sections/GalleryItemForm';
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

  return (
    <div>
      <GalleryListHeader count={galleryItems.length} onAdd={() => setModalItem({ item: null })} />

      <div className="mb-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by caption…"
          className="w-full max-w-xs rounded-xl border border-navy-900/12 bg-white px-3.5 py-2.5 text-sm outline-none transition-all focus:border-gold-500 focus:ring-4 focus:ring-gold-500/10"
        />
      </div>

      <GalleryTable rows={rows} onEdit={(row) => setModalItem({ item: row })} onDelete={(id) => setConfirmId(id)} />

      <Modal
        isOpen={!!modalItem}
        onClose={() => setModalItem(null)}
        title={modalItem?.item ? 'Edit Gallery Item' : 'New Gallery Item'}
        footer={(
          <>
            <Button type="button" variant="outline" onClick={() => setModalItem(null)}>Cancel</Button>
            <Button type="submit" form="gallery-item-form" variant="primary">Save item</Button>
          </>
        )}
      >
        <GalleryItemForm
          initial={modalItem?.item}
          onSubmit={(data) => {
            if (modalItem?.item) updateGalleryItem(modalItem.item.id, data);
            else addGalleryItem(data);
            setModalItem(null);
          }}
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
