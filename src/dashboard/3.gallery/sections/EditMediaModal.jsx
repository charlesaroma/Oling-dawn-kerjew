import { useState } from 'react';
import Button from '../../../components/common/Button';
import Modal from '../../components/Modal';
import { useImageCategories } from '../../../services/imageCategoryQueries';
import { useUpdateMedia } from '../../../services/mediaQueries';
import { useToast } from '../../../context/useToast';

export default function EditMediaModal({ item, onClose }) {
  const { data: categories = [] } = useImageCategories();
  const updateMedia = useUpdateMedia();
  const { addToast } = useToast();
  const [tag, setTag] = useState(item?.tag || '');
  const [alt, setAlt] = useState(item?.alt || '');

  if (!item) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMedia.mutate(
      { id: item.id, tag, alt },
      {
        onSuccess: () => {
          addToast('Media updated', 'success');
          onClose();
        },
        onError: (err) => addToast(err.message || 'Failed to update media', 'error'),
      },
    );
  };

  return (
    <Modal
      isOpen={!!item}
      onClose={onClose}
      title="Edit media"
      footer={(
        <>
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" form="edit-media-form" variant="primary" disabled={updateMedia.isPending}>
            {updateMedia.isPending ? 'Saving…' : 'Save changes'}
          </Button>
        </>
      )}
    >
      <form id="edit-media-form" onSubmit={handleSubmit} className="space-y-5">
        <img src={item.url} alt={item.alt || ''} className="aspect-video w-full rounded-xl border border-navy-900/8 object-cover" />
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-navy-900/60">Category</label>
          <select
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className="w-full rounded-xl border border-navy-900/12 bg-white px-3.5 py-2.5 text-sm outline-none transition-all focus:border-gold-500 focus:ring-4 focus:ring-gold-500/10"
          >
            {categories.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-navy-900/60">Alt text</label>
          <input
            value={alt}
            onChange={(e) => setAlt(e.target.value)}
            className="w-full rounded-xl border border-navy-900/12 bg-white px-3.5 py-2.5 text-sm outline-none transition-all focus:border-gold-500 focus:ring-4 focus:ring-gold-500/10"
          />
        </div>
      </form>
    </Modal>
  );
}
