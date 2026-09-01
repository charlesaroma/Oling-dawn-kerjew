import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import ConfirmModal from '../components/ConfirmModal';
import Button from '../../components/common/Button';
import ProjectListHeader from './sections/ProjectListHeader';
import ProjectTable from './sections/ProjectTable';
import ProjectForm from './sections/ProjectForm';
import { useProjects, useCreateProject, useUpdateProject, useDeleteProject } from '../../services/projectQueries';
import { useToast } from '../../context/useToast';

export default function ProjectList() {
  const { data: projects, isLoading } = useProjects();
  const createProject = useCreateProject();
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();
  const { addToast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const [modalItem, setModalItem] = useState(() => {
    const found = location.state?.editId ? projects.find((p) => p.id === location.state.editId) : null;
    return found ? { item: found } : null;
  });
  const [confirmId, setConfirmId] = useState(null);

  useEffect(() => {
    if (location.state?.editId) navigate(location.pathname, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const confirmTarget = confirmId ? projects.find((p) => p.id === confirmId) : null;

  return (
    <div>
      <ProjectListHeader count={projects.length} onAdd={() => setModalItem({ item: null })} />

      {isLoading ? (
        <p className="py-16 text-center text-sm text-ink-500">Loading…</p>
      ) : (
        <ProjectTable
          rows={projects}
          onTogglePublish={(row) => updateProject.mutate(
            { id: row.id, publishStatus: (row.publishStatus ?? 'published') === 'draft' ? 'published' : 'draft' },
            {
              onSuccess: () => addToast('Project publish state updated', 'success'),
              onError: (err) => addToast(err.message || 'Failed to update project', 'error'),
            },
          )}
          onEdit={(row) => setModalItem({ item: row })}
          onDelete={(id) => setConfirmId(id)}
        />
      )}

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
            const onSettled = {
              onSuccess: () => addToast(modalItem?.item ? 'Project updated' : 'Project created', 'success'),
              onError: (err) => addToast(err.message || 'Failed to save project', 'error'),
            };
            if (modalItem?.item) updateProject.mutate({ id: modalItem.item.id, ...data }, onSettled);
            else createProject.mutate(data, onSettled);
            setModalItem(null);
          }}
        />
      </Modal>

      <ConfirmModal
        isOpen={!!confirmId}
        onClose={() => setConfirmId(null)}
        onConfirm={() => {
          deleteProject.mutate(confirmId, {
            onSuccess: () => addToast('Project deleted', 'success'),
            onError: (err) => addToast(err.message || 'Failed to delete project', 'error'),
          });
          setConfirmId(null);
        }}
        title="Delete project"
        message={confirmTarget ? `Delete "${confirmTarget.title}"? This cannot be undone.` : ''}
        confirmLabel="Delete"
      />
    </div>
  );
}
