import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import DataTable from '../../components/DataTable';
import { useProfiles } from '../../../services/profileQueries';
import { formatDate } from '../../../utils/formatDate';

const columns = [
  { key: 'fullName', label: 'Name' },
  { key: 'category', label: 'Category' },
  { key: 'location', label: 'Location' },
  { key: 'registeredDate', label: 'Registered', render: (r) => formatDate(r.registeredDate) },
];

export default function RecentRegistrations() {
  const { data: profiles } = useProfiles();
  const recent = [...profiles].sort((a, b) => new Date(b.registeredDate) - new Date(a.registeredDate)).slice(0, 6);

  return (
    <section className="mt-10">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-lg text-forest-900">Recent Registrations</h2>
        <Link to="/dashboard/profiles" className="flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-gold-600 transition-colors hover:text-gold-700">
          View all <ArrowRight size={13} />
        </Link>
      </div>
      <DataTable columns={columns} rows={recent} emptyMessage="No profiles registered yet. Start with “Register Person.”" />
    </section>
  );
}
