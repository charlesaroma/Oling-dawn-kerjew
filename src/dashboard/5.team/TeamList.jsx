import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import ConfirmModal from '../components/ConfirmModal';
import Button from '../../components/common/Button';
import TeamListHeader from './sections/TeamListHeader';
import TeamTable from './sections/TeamTable';
import TeamMemberForm from './sections/TeamMemberForm';
import { useAdmin } from '../../context/AdminContext';

export default function TeamList() {
  const { team, addTeamMember, updateTeamMember, deleteTeamMember } = useAdmin();
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

      <TeamTable rows={team} onEdit={(row) => setModalItem({ item: row })} onDelete={(id) => setConfirmId(id)} />

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
            if (modalItem?.item) updateTeamMember(modalItem.item.id, data);
            else addTeamMember(data);
            setModalItem(null);
          }}
        />
      </Modal>

      <ConfirmModal
        isOpen={!!confirmId}
        onClose={() => setConfirmId(null)}
        onConfirm={() => { deleteTeamMember(confirmId); setConfirmId(null); }}
        title="Remove team member"
        message={confirmTarget ? `Remove "${confirmTarget.name}"? This cannot be undone.` : ''}
        confirmLabel="Remove"
      />
    </div>
  );
}
