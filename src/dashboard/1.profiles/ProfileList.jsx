import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import ConfirmModal from '../components/ConfirmModal';
import Button from '../../components/common/Button';
import ProfileListHeader from './sections/ProfileListHeader';
import ProfileTable from './sections/ProfileTable';
import ProfileForm from './sections/ProfileForm';
import { useProfiles, useCreateProfile, useUpdateProfile, useDeleteProfile } from '../../services/profileQueries';
import { useToast } from '../../context/useToast';
import { exportProfilesCSV, exportProfilesPDF } from '../utils/exportProfiles';

export default function ProfileList() {
  const { data: profiles, isLoading } = useProfiles();
  const createProfile = useCreateProfile();
  const updateProfile = useUpdateProfile();
  const deleteProfile = useDeleteProfile();
  const { addToast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const [visibleRows, setVisibleRows] = useState([]);
  // Deep link from global search: navigate('/dashboard/profiles', { state: { editId } }).
  // Consumed once as the initial value so opening the modal isn't a setState-in-effect.
  const [modalItem, setModalItem] = useState(() => {
    const found = location.state?.editId ? profiles.find((p) => p.id === location.state.editId) : null;
    return found ? { item: found } : null;
  });
  const [confirmId, setConfirmId] = useState(null);

  useEffect(() => {
    if (location.state?.editId) navigate(location.pathname, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const confirmTarget = confirmId ? profiles.find((p) => p.id === confirmId) : null;

  return (
    <div>
      <ProfileListHeader
        count={profiles.length}
        onExportCSV={() => (visibleRows.length
          ? exportProfilesCSV(visibleRows)
          : addToast('Nothing to export — adjust your search or filters.', 'warning'))}
        onExportPDF={() => (visibleRows.length
          ? exportProfilesPDF(visibleRows)
          : addToast('Nothing to export — adjust your search or filters.', 'warning'))}
        onAdd={() => setModalItem({ item: null })}
      />

      {isLoading ? (
        <p className="py-16 text-center text-sm text-ink-500">Loading…</p>
      ) : (
        <ProfileTable rows={profiles} onVisibleRowsChange={setVisibleRows} onEdit={(row) => setModalItem({ item: row })} onDelete={(id) => setConfirmId(id)} />
      )}

      <Modal
        isOpen={!!modalItem}
        onClose={() => setModalItem(null)}
        title={modalItem?.item ? 'Edit Profile' : 'Register Person'}
        size="xl"
        footer={(
          <>
            <Button type="button" variant="outline" onClick={() => setModalItem(null)}>Cancel</Button>
            <Button type="submit" form="profile-form" variant="primary">Save profile</Button>
          </>
        )}
      >
        <ProfileForm
          initial={modalItem?.item}
          onSubmit={(data) => {
            const onSettled = {
              onSuccess: () => addToast(modalItem?.item ? 'Profile updated' : 'Profile registered', 'success'),
              onError: (err) => addToast(err.message || 'Failed to save profile', 'error'),
            };
            if (modalItem?.item) updateProfile.mutate({ id: modalItem.item.id, ...data }, onSettled);
            else createProfile.mutate(data, onSettled);
            setModalItem(null);
          }}
        />
      </Modal>

      <ConfirmModal
        isOpen={!!confirmId}
        onClose={() => setConfirmId(null)}
        onConfirm={() => {
          deleteProfile.mutate(confirmId, {
            onSuccess: () => addToast('Profile deleted', 'success'),
            onError: (err) => addToast(err.message || 'Failed to delete profile', 'error'),
          });
          setConfirmId(null);
        }}
        title="Delete profile"
        message={confirmTarget ? `Delete "${confirmTarget.fullName}"? This cannot be undone.` : ''}
        confirmLabel="Delete"
      />
    </div>
  );
}
