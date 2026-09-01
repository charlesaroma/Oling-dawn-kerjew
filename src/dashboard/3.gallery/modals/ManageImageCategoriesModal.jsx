import { useState } from 'react';
import { Reorder } from 'framer-motion';
import { GripVertical, Pencil, Plus, Save, Trash2 } from 'lucide-react';
import Modal from '../../components/Modal';
import Button from '../../../components/common/Button';
import {
  useImageCategories, useCreateImageCategory, useUpdateImageCategory, useDeleteImageCategory, useReorderImageCategories,
} from '../../../services/imageCategoryQueries';
import { useToast } from '../../../context/useToast';

export default function ManageImageCategoriesModal({ isOpen, onClose }) {
  const { data: categories = [] } = useImageCategories();
  const createCategory = useCreateImageCategory();
  const updateCategory = useUpdateImageCategory();
  const deleteCategory = useDeleteImageCategory();
  const reorderCategories = useReorderImageCategories();
  const { addToast } = useToast();

  const [items, setItems] = useState(categories);
  const [prevCategories, setPrevCategories] = useState(categories);
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState('');
  const [editingDescription, setEditingDescription] = useState('');

  if (categories !== prevCategories) {
    setPrevCategories(categories);
    setItems(categories);
  }

  // Trimmed + lowercased so "Beach Views" and "beach views" can't end up
  // as two separate-looking categories that happen to match the same
  // media via the backend's case-insensitive tag filter.
  const normalizeName = (value) => value.trim().toLowerCase().replace(/\s+/g, ' ');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newName.trim() || createCategory.isPending) return;
    createCategory.mutate(
      { name: normalizeName(newName), description: newDescription.trim() || undefined },
      {
        onSuccess: () => addToast('Category added', 'success'),
        onError: (err) => addToast(err.message || 'Failed to add category', 'error'),
      },
    );
    setNewName('');
    setNewDescription('');
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setEditingName(item.name);
    setEditingDescription(item.description || '');
  };

  const saveEdit = () => {
    if (editingName.trim() && !updateCategory.isPending) {
      updateCategory.mutate(
        { id: editingId, name: normalizeName(editingName), description: editingDescription.trim() || undefined },
        {
          onSuccess: () => addToast('Category updated', 'success'),
          onError: (err) => addToast(err.message || 'Failed to update category', 'error'),
        },
      );
    }
    setEditingId(null);
  };

  const handleReorder = (next) => {
    setItems(next);
    reorderCategories.mutate(next.map((item, i) => ({ id: item.id, sortOrder: i })));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Manage categories" size="md">
      <form onSubmit={handleAdd} className="mb-5 space-y-2">
        <div className="flex gap-2">
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="New category name…"
            className="flex-1 rounded-xl border border-navy-900/12 bg-white px-3.5 py-2.5 text-sm outline-none transition-all focus:border-gold-500 focus:ring-4 focus:ring-gold-500/10"
          />
          <Button type="submit" variant="outline" disabled={!newName.trim() || createCategory.isPending}>
            <Plus size={16} /> Add
          </Button>
        </div>
        <input
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          placeholder="Description (optional)…"
          className="w-full rounded-xl border border-navy-900/12 bg-white px-3.5 py-2 text-xs outline-none transition-all focus:border-gold-500 focus:ring-4 focus:ring-gold-500/10"
        />
      </form>

      <Reorder.Group axis="y" values={items} onReorder={handleReorder} className="space-y-2">
        {items.map((item) => (
          <Reorder.Item
            key={item.id}
            value={item}
            className="flex items-start gap-2 rounded-xl border border-navy-900/8 bg-white px-3 py-2.5"
          >
            <GripVertical size={16} className="mt-1 shrink-0 cursor-grab text-navy-900/30 active:cursor-grabbing" />
            {editingId === item.id ? (
              <div className="flex-1 space-y-1.5">
                <input
                  autoFocus
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') saveEdit(); }}
                  className="w-full rounded-lg border border-gold-500 px-2 py-1 text-sm outline-none"
                />
                <input
                  value={editingDescription}
                  onChange={(e) => setEditingDescription(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') saveEdit(); }}
                  placeholder="Description (optional)…"
                  className="w-full rounded-lg border border-navy-900/12 px-2 py-1 text-xs outline-none focus:border-gold-500"
                />
              </div>
            ) : (
              <div className="min-w-0 flex-1">
                <span className="block text-sm text-forest-900">{item.name}</span>
                {item.description && <p className="truncate text-xs text-navy-900/50">{item.description}</p>}
              </div>
            )}
            {editingId === item.id ? (
              <button type="button" onClick={saveEdit} aria-label="Save" disabled={updateCategory.isPending} className="mt-1 shrink-0 text-forest-700 hover:text-forest-900 disabled:opacity-50">
                <Save size={15} />
              </button>
            ) : (
              <button type="button" onClick={() => startEdit(item)} aria-label="Rename" className="mt-1 shrink-0 text-navy-900/40 hover:text-forest-800">
                <Pencil size={15} />
              </button>
            )}
            <button
              type="button"
              onClick={() => deleteCategory.mutate(item.id, {
                onSuccess: () => addToast('Category deleted', 'success'),
                onError: (err) => addToast(err.message || 'Failed to delete category', 'error'),
              })}
              aria-label="Delete"
              className="mt-1 shrink-0 text-navy-900/40 hover:text-error"
            >
              <Trash2 size={15} />
            </button>
          </Reorder.Item>
        ))}
      </Reorder.Group>

      {items.length === 0 && (
        <p className="py-8 text-center text-sm text-navy-900/40">No categories yet — add one above.</p>
      )}
    </Modal>
  );
}
