import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import ConfirmModal from '../components/ConfirmModal';
import Button from '../../components/common/Button';
import BlogListHeader from './sections/BlogListHeader';
import BlogTable from './sections/BlogTable';
import BlogPostForm from './sections/BlogPostForm';
import { useBlogPosts, useCreateBlogPost, useUpdateBlogPost, useDeleteBlogPost } from '../../services/blogQueries';
import { useToast } from '../../context/useToast';

export default function BlogPostList() {
  const { data: blogPosts, isLoading } = useBlogPosts();
  const createBlogPost = useCreateBlogPost();
  const updateBlogPost = useUpdateBlogPost();
  const deleteBlogPost = useDeleteBlogPost();
  const { addToast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const [modalItem, setModalItem] = useState(() => {
    const found = location.state?.editId ? blogPosts.find((p) => p.id === location.state.editId) : null;
    return found ? { item: found } : null;
  });
  const [confirmId, setConfirmId] = useState(null);

  useEffect(() => {
    if (location.state?.editId) navigate(location.pathname, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const confirmTarget = confirmId ? blogPosts.find((p) => p.id === confirmId) : null;

  return (
    <div>
      <BlogListHeader count={blogPosts.length} onAdd={() => setModalItem({ item: null })} />

      {isLoading ? (
        <p className="py-16 text-center text-sm text-ink-500">Loading…</p>
      ) : (
        <BlogTable
          rows={blogPosts}
          onTogglePublish={(row) => updateBlogPost.mutate(
            { id: row.id, publishStatus: (row.publishStatus ?? 'published') === 'draft' ? 'published' : 'draft' },
            {
              onSuccess: () => addToast('Post publish state updated', 'success'),
              onError: (err) => addToast(err.message || 'Failed to update post', 'error'),
            },
          )}
          onEdit={(row) => setModalItem({ item: row })}
          onDelete={(id) => setConfirmId(id)}
        />
      )}

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
            const onSettled = {
              onSuccess: () => addToast(modalItem?.item ? 'Post updated' : 'Post created', 'success'),
              onError: (err) => addToast(err.message || 'Failed to save post', 'error'),
            };
            if (modalItem?.item) updateBlogPost.mutate({ id: modalItem.item.id, ...data }, onSettled);
            else createBlogPost.mutate(data, onSettled);
            setModalItem(null);
          }}
        />
      </Modal>

      <ConfirmModal
        isOpen={!!confirmId}
        onClose={() => setConfirmId(null)}
        onConfirm={() => {
          deleteBlogPost.mutate(confirmId, {
            onSuccess: () => addToast('Post deleted', 'success'),
            onError: (err) => addToast(err.message || 'Failed to delete post', 'error'),
          });
          setConfirmId(null);
        }}
        title="Delete post"
        message={confirmTarget ? `Delete "${confirmTarget.title}"? This cannot be undone.` : ''}
        confirmLabel="Delete"
      />
    </div>
  );
}
