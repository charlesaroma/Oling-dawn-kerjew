import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import ConfirmModal from '../components/ConfirmModal';
import Button from '../../components/common/Button';
import BlogListHeader from './sections/BlogListHeader';
import BlogTable from './sections/BlogTable';
import BlogPostForm from './sections/BlogPostForm';
import { useAdmin } from '../../context/AdminContext';

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

  const confirmTarget = confirmId ? blogPosts.find((p) => p.id === confirmId) : null;

  return (
    <div>
      <BlogListHeader count={blogPosts.length} onAdd={() => setModalItem({ item: null })} />

      <div className="mb-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title…"
          className="w-full max-w-xs rounded-xl border border-navy-900/12 bg-white px-3.5 py-2.5 text-sm outline-none transition-all focus:border-gold-500 focus:ring-4 focus:ring-gold-500/10"
        />
      </div>

      <BlogTable
        rows={rows}
        onTogglePublish={(row) => updateBlogPost(row.id, { publishStatus: (row.publishStatus ?? 'published') === 'draft' ? 'published' : 'draft' })}
        onEdit={(row) => setModalItem({ item: row })}
        onDelete={(id) => setConfirmId(id)}
      />

      <Modal
        isOpen={!!modalItem}
        onClose={() => setModalItem(null)}
        title={modalItem?.item ? 'Edit Post' : 'New Post'}
        size="xl"
        footer={(
          <>
            <Button type="button" variant="outline" onClick={() => setModalItem(null)}>Cancel</Button>
            <Button type="submit" form="blog-post-form" variant="primary">Save post</Button>
          </>
        )}
      >
        <BlogPostForm
          initial={modalItem?.item}
          onSubmit={(data) => {
            if (modalItem?.item) updateBlogPost(modalItem.item.id, data);
            else addBlogPost(data);
            setModalItem(null);
          }}
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
