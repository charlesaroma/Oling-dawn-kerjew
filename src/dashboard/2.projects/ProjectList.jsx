import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import ConfirmModal from '../components/ConfirmModal';
import Button from '../../components/common/Button';
import ProjectListHeader from './sections/ProjectListHeader';
import ProjectTable from './sections/ProjectTable';
import ProjectForm from './sections/ProjectForm';
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

  const confirmTarget = confirmId ? projects.find((p) => p.id === confirmId) : null;

  return (
    <div>
      <ProjectListHeader count={projects.length} onAdd={() => setModalItem({ item: null })} />

      <div className="mb-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title or category…"
          className="w-full max-w-xs rounded-xl border border-navy-900/12 bg-white px-3.5 py-2.5 text-sm outline-none transition-all focus:border-gold-500 focus:ring-4 focus:ring-gold-500/10"
        />
      </div>

      <ProjectTable
        rows={rows}
        onTogglePublish={(row) => updateProject(row.id, { publishStatus: (row.publishStatus ?? 'published') === 'draft' ? 'published' : 'draft' })}
        onEdit={(row) => setModalItem({ item: row })}
        onDelete={(id) => setConfirmId(id)}
      />

      <Modal
        isOpen={!!modalItem}
        onClose={() => setModalItem(null)}
        title={modalItem?.item ? 'Edit Project' : 'New Project'}
        size="xl"
        footer={(
          <>
            <Button type="button" variant="outline" onClick={() => setModalItem(null)}>Cancel</Button>
            <Button type="submit" form="project-form" variant="primary">Save project</Button>
          </>
        )}
      >
        <ProjectForm
          initial={modalItem?.item}
          onSubmit={(data) => {
            if (modalItem?.item) updateProject(modalItem.item.id, data);
            else addProject(data);
            setModalItem(null);
          }}
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
