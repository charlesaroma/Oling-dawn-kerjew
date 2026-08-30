import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import ConfirmModal from '../components/ConfirmModal';
import Button from '../../components/common/Button';
import ProfileForm from '../components/ProfileForm';
import { useAdmin } from '../../context/AdminContext';
import { formatDate } from '../../utils/formatDate';
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

  const columns = [
    { key: 'fullName', label: 'Name', render: (r) => (
      <div>
        <p className="font-medium text-forest-900">{r.fullName}</p>
        <p className="font-mono text-[10px] text-navy-900/40">{r.id}</p>
      </div>
    ) },
    { key: 'category', label: 'Category' },
    { key: 'gender', label: 'Gender' },
    { key: 'location', label: 'Location' },
    { key: 'registeredDate', label: 'Registered', render: (r) => formatDate(r.registeredDate) },
  ];

  const rowActions = (row) => (
    <div className="flex justify-end gap-3 text-xs">
      <button type="button" onClick={() => setModalItem({ item: row })} className="text-gold-700 hover:text-gold-800">Edit</button>
      <button type="button" onClick={() => setConfirmId(row.id)} className="text-navy-900/40 transition-colors hover:text-error">Delete</button>
    </div>
  );

  const confirmTarget = confirmId ? profiles.find((p) => p.id === confirmId) : null;

  return (
    <div>
      <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl text-forest-900">Profiles</h1>
          <p className="mt-1 text-sm text-navy-900/60">{profiles.length} registered</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" onClick={() => exportProfilesCSV(rows)}>Export CSV</Button>
          <Button variant="outline" onClick={() => exportProfilesPDF(rows)}>Export PDF</Button>
          <Button variant="primary" onClick={() => setModalItem({ item: null })}>+ Register Person</Button>
        </div>
      </header>

      <div className="mb-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, category, or location…"
          className="w-full max-w-xs rounded-xl border border-navy-900/12 bg-white px-3.5 py-2.5 text-sm outline-none transition-all focus:border-gold-500 focus:ring-4 focus:ring-gold-500/10"
        />
      </div>

      <DataTable columns={columns} rows={rows} actions={rowActions} emptyMessage="No profiles match your search." />

      <Modal
        isOpen={!!modalItem}
        onClose={() => setModalItem(null)}
        title={modalItem?.item ? 'Edit Profile' : 'Register Person'}
        size="xl"
      >
        <ProfileForm
          initial={modalItem?.item}
          onSubmit={(data) => {
            if (modalItem?.item) updateProfile(modalItem.item.id, data);
            else addProfile(data);
            setModalItem(null);
          }}
          onCancel={() => setModalItem(null)}
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
