import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import ConfirmModal from '../components/ConfirmModal';
import Button from '../../components/common/Button';
import TeamMemberForm from '../components/TeamMemberForm';
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

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'role', label: 'Role' },
  ];

  const rowActions = (row) => (
    <div className="flex justify-end gap-3 text-xs">
      <button type="button" onClick={() => setModalItem({ item: row })} className="text-gold-700 hover:text-gold-800">Edit</button>
      <button type="button" onClick={() => setConfirmId(row.id)} className="text-navy-900/40 transition-colors hover:text-error">Delete</button>
    </div>
  );

  const confirmTarget = confirmId ? team.find((m) => m.id === confirmId) : null;

  return (
    <div>
      <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl text-forest-900">Team</h1>
          <p className="mt-1 text-sm text-navy-900/60">{team.length} members &middot; shown on the public About page</p>
        </div>
        <Button variant="primary" onClick={() => setModalItem({ item: null })}>+ Add Member</Button>
      </header>

      <DataTable columns={columns} rows={team} actions={rowActions} emptyMessage="No team members yet — add the first one." />

      <Modal
        isOpen={!!modalItem}
        onClose={() => setModalItem(null)}
        title={modalItem?.item ? 'Edit Team Member' : 'Add Team Member'}
      >
        <TeamMemberForm
          initial={modalItem?.item}
          onSubmit={(data) => {
            if (modalItem?.item) updateTeamMember(modalItem.item.id, data);
            else addTeamMember(data);
            setModalItem(null);
          }}
          onCancel={() => setModalItem(null)}
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
