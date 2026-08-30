import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DataTable from '../components/DataTable';
import StatusPill from '../components/StatusPill';
import Modal from '../components/Modal';
import ConfirmModal from '../components/ConfirmModal';
import Button from '../../components/common/Button';
import BlogPostForm from '../components/BlogPostForm';
import { useAdmin } from '../../context/AdminContext';
import { formatDate } from '../../utils/formatDate';

export default function BlogPostList() {
  const { blogPosts, addBlogPost, updateBlogPost, deleteBlogPost } = useAdmin();
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [modalItem, setModalItem] = useState(() => {
    const found = location.state?.editId ? blogPosts.find((p) => p.id === location.state.editId) : null;
    return found ? { item: found } : null;
  });
  const [confirmId, setConfirmId] = useState(null);

  useEffect(() => {
    if (location.state?.editId) navigate(location.pathname, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return blogPosts;
    return blogPosts.filter((p) => p.title.toLowerCase().includes(q));
  }, [blogPosts, query]);

  const columns = [
    { key: 'title', label: 'Title', render: (r) => (
      <div>
        <p className="font-medium text-forest-900">{r.title}</p>
        <p className="font-mono text-[10px] text-navy-900/40">{r.slug}</p>
      </div>
    ) },
    { key: 'author', label: 'Author' },
    { key: 'publishedAt', label: 'Date', render: (r) => formatDate(r.publishedAt) },
    { key: 'publishStatus', label: 'Publish', render: (r) => <StatusPill status={r.publishStatus} /> },
  ];

  const rowActions = (row) => (
    <div className="flex justify-end gap-3 text-xs">
      <button
        type="button"
        onClick={() => updateBlogPost(row.id, { publishStatus: (row.publishStatus ?? 'published') === 'draft' ? 'published' : 'draft' })}
        className="text-gold-700 hover:text-gold-800"
      >
        {(row.publishStatus ?? 'published') === 'draft' ? 'Publish' : 'Unpublish'}
      </button>
      <button type="button" onClick={() => setModalItem({ item: row })} className="text-gold-700 hover:text-gold-800">Edit</button>
      <button type="button" onClick={() => setConfirmId(row.id)} className="text-navy-900/40 transition-colors hover:text-error">Delete</button>
    </div>
  );

  const confirmTarget = confirmId ? blogPosts.find((p) => p.id === confirmId) : null;

  return (
    <div>
      <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl text-forest-900">Blog</h1>
          <p className="mt-1 text-sm text-navy-900/60">{blogPosts.length} posts</p>
        </div>
        <Button variant="primary" onClick={() => setModalItem({ item: null })}>+ New Post</Button>
      </header>

      <div className="mb-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title…"
          className="w-full max-w-xs rounded-xl border border-navy-900/12 bg-white px-3.5 py-2.5 text-sm outline-none transition-all focus:border-gold-500 focus:ring-4 focus:ring-gold-500/10"
        />
      </div>

      <DataTable columns={columns} rows={rows} actions={rowActions} emptyMessage="No posts match your search." />

      <Modal
        isOpen={!!modalItem}
        onClose={() => setModalItem(null)}
        title={modalItem?.item ? 'Edit Post' : 'New Post'}
        size="xl"
      >
        <BlogPostForm
          initial={modalItem?.item}
          onSubmit={(data) => {
            if (modalItem?.item) updateBlogPost(modalItem.item.id, data);
            else addBlogPost(data);
            setModalItem(null);
          }}
          onCancel={() => setModalItem(null)}
        />
      </Modal>

      <ConfirmModal
        isOpen={!!confirmId}
        onClose={() => setConfirmId(null)}
        onConfirm={() => { deleteBlogPost(confirmId); setConfirmId(null); }}
        title="Delete post"
        message={confirmTarget ? `Delete "${confirmTarget.title}"? This cannot be undone.` : ''}
        confirmLabel="Delete"
      />
    </div>
  );
}
