import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DataTable from '../components/DataTable';
import StatusPill from '../components/StatusPill';
import Modal from '../components/Modal';
import ConfirmModal from '../components/ConfirmModal';
import Button from '../../components/common/Button';
import ProjectForm from '../components/ProjectForm';
import { useAdmin } from '../../context/AdminContext';

export default function ProjectList() {
  const { projects, addProject, updateProject, deleteProject } = useAdmin();
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [modalItem, setModalItem] = useState(() => {
    const found = location.state?.editId ? projects.find((p) => p.id === location.state.editId) : null;
    return found ? { item: found } : null;
  });
  const [confirmId, setConfirmId] = useState(null);

  useEffect(() => {
    if (location.state?.editId) navigate(location.pathname, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return projects;
    return projects.filter((p) => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
  }, [projects, query]);

  const columns = [
    { key: 'title', label: 'Title', render: (r) => (
      <div>
        <p className="font-medium text-forest-900">{r.title}</p>
        <p className="font-mono text-[10px] text-navy-900/40">{r.slug}</p>
      </div>
    ) },
    { key: 'category', label: 'Category' },
    { key: 'status', label: 'Lifecycle' },
    { key: 'publishStatus', label: 'Publish', render: (r) => <StatusPill status={r.publishStatus} /> },
    { key: 'year', label: 'Year' },
  ];

  const rowActions = (row) => (
    <div className="flex justify-end gap-3 text-xs">
      <button
        type="button"
        onClick={() => updateProject(row.id, { publishStatus: (row.publishStatus ?? 'published') === 'draft' ? 'published' : 'draft' })}
        className="text-gold-700 hover:text-gold-800"
      >
        {(row.publishStatus ?? 'published') === 'draft' ? 'Publish' : 'Unpublish'}
      </button>
      <button type="button" onClick={() => setModalItem({ item: row })} className="text-gold-700 hover:text-gold-800">Edit</button>
      <button type="button" onClick={() => setConfirmId(row.id)} className="text-navy-900/40 transition-colors hover:text-error">Delete</button>
    </div>
  );

  const confirmTarget = confirmId ? projects.find((p) => p.id === confirmId) : null;

  return (
    <div>
      <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl text-forest-900">Projects</h1>
          <p className="mt-1 text-sm text-navy-900/60">{projects.length} total &middot; changes go live on the public site instantly</p>
        </div>
        <Button variant="primary" onClick={() => setModalItem({ item: null })}>+ New Project</Button>
      </header>

      <div className="mb-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title or category…"
          className="w-full max-w-xs rounded-xl border border-navy-900/12 bg-white px-3.5 py-2.5 text-sm outline-none transition-all focus:border-gold-500 focus:ring-4 focus:ring-gold-500/10"
        />
      </div>

      <DataTable columns={columns} rows={rows} actions={rowActions} emptyMessage="No projects match your search." />

      <Modal
        isOpen={!!modalItem}
        onClose={() => setModalItem(null)}
        title={modalItem?.item ? 'Edit Project' : 'New Project'}
        size="xl"
      >
        <ProjectForm
          initial={modalItem?.item}
          onSubmit={(data) => {
            if (modalItem?.item) updateProject(modalItem.item.id, data);
            else addProject(data);
            setModalItem(null);
          }}
          onCancel={() => setModalItem(null)}
        />
      </Modal>

      <ConfirmModal
        isOpen={!!confirmId}
        onClose={() => setConfirmId(null)}
        onConfirm={() => { deleteProject(confirmId); setConfirmId(null); }}
        title="Delete project"
        message={confirmTarget ? `Delete "${confirmTarget.title}"? This cannot be undone.` : ''}
        confirmLabel="Delete"
      />
    </div>
  );
}
