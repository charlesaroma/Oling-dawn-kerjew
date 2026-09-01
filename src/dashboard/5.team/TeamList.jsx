import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import ConfirmModal from '../components/ConfirmModal';
import Button from '../../components/common/Button';
import TeamListHeader from './sections/TeamListHeader';
import TeamTable from './sections/TeamTable';
import TeamMemberForm from './sections/TeamMemberForm';
import { useTeam, useCreateTeamMember, useUpdateTeamMember, useDeleteTeamMember } from '../../services/teamQueries';
import { useToast } from '../../context/useToast';

export default function TeamList() {
  const { data: team, isLoading } = useTeam();
  const createTeamMember = useCreateTeamMember();
  const updateTeamMember = useUpdateTeamMember();
  const deleteTeamMember = useDeleteTeamMember();
  const { addToast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const [modalItem, setModalItem] = useState(() => {
    const found = location.state?.editId ? team.find((m) => m.id === location.state.editId) : null;
    return found ? { item: found } : null;
  });
  const [confirmId, setConfirmId] = useState(null);

  useEffect(() => {
    if (location.state?.editId) navigate(location.pathname, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const confirmTarget = confirmId ? team.find((m) => m.id === confirmId) : null;

  return (
    <div>
      <TeamListHeader count={team.length} onAdd={() => setModalItem({ item: null })} />

      {isLoading ? (
        <p className="py-16 text-center text-sm text-navy-900/50">Loading…</p>
      ) : (
        <TeamTable rows={team} onEdit={(row) => setModalItem({ item: row })} onDelete={(id) => setConfirmId(id)} />
      )}

      <Modal
        isOpen={!!modalItem}
        onClose={() => setModalItem(null)}
        title={modalItem?.item ? 'Edit Team Member' : 'Add Team Member'}
        footer={(
          <>
            <Button type="button" variant="outline" onClick={() => setModalItem(null)}>Cancel</Button>
            <Button type="submit" form="team-member-form" variant="primary">Save member</Button>
          </>
        )}
      >
        <TeamMemberForm
          initial={modalItem?.item}
          onSubmit={(data) => {
            const onSettled = {
              onSuccess: () => addToast(modalItem?.item ? 'Team member updated' : 'Team member added', 'success'),
              onError: (err) => addToast(err.message || 'Failed to save team member', 'error'),
            };
            if (modalItem?.item) updateTeamMember.mutate({ id: modalItem.item.id, ...data }, onSettled);
            else createTeamMember.mutate(data, onSettled);
            setModalItem(null);
          }}
        />
      </Modal>

      <ConfirmModal
        isOpen={!!confirmId}
        onClose={() => setConfirmId(null)}
        onConfirm={() => {
          deleteTeamMember.mutate(confirmId, {
            onSuccess: () => addToast('Team member removed', 'success'),
            onError: (err) => addToast(err.message || 'Failed to remove team member', 'error'),
          });
          setConfirmId(null);
        }}
        title="Remove team member"
        message={confirmTarget ? `Remove "${confirmTarget.name}"? This cannot be undone.` : ''}
        confirmLabel="Remove"
      />
    </div>
  );
}
