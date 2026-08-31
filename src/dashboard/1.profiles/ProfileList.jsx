import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import ConfirmModal from '../components/ConfirmModal';
import Button from '../../components/common/Button';
import ProfileListHeader from './sections/ProfileListHeader';
import ProfileTable from './sections/ProfileTable';
import ProfileForm from './sections/ProfileForm';
import { useAdmin } from '../../context/AdminContext';
import { exportProfilesCSV, exportProfilesPDF } from '../utils/exportProfiles';

export default function ProfileList() {
  const { profiles, addProfile, updateProfile, deleteProfile } = useAdmin();
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
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

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return profiles;
    return profiles.filter(
      (p) => p.fullName.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.location?.toLowerCase().includes(q),
    );
  }, [profiles, query]);

  const confirmTarget = confirmId ? profiles.find((p) => p.id === confirmId) : null;

  return (
    <div>
      <ProfileListHeader
        count={profiles.length}
        onExportCSV={() => exportProfilesCSV(rows)}
        onExportPDF={() => exportProfilesPDF(rows)}
        onAdd={() => setModalItem({ item: null })}
      />

      <div className="mb-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, category, or location…"
          className="w-full max-w-xs rounded-xl border border-navy-900/12 bg-white px-3.5 py-2.5 text-sm outline-none transition-all focus:border-gold-500 focus:ring-4 focus:ring-gold-500/10"
        />
      </div>

      <ProfileTable rows={rows} onEdit={(row) => setModalItem({ item: row })} onDelete={(id) => setConfirmId(id)} />

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
            if (modalItem?.item) updateProfile(modalItem.item.id, data);
            else addProfile(data);
            setModalItem(null);
          }}
        />
      </Modal>

      <ConfirmModal
        isOpen={!!confirmId}
        onClose={() => setConfirmId(null)}
        onConfirm={() => { deleteProfile(confirmId); setConfirmId(null); }}
        title="Delete profile"
        message={confirmTarget ? `Delete "${confirmTarget.fullName}"? This cannot be undone.` : ''}
        confirmLabel="Delete"
      />
    </div>
  );
}
