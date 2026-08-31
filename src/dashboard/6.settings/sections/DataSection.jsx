import Button from '../../../components/common/Button';
import { useAdmin } from '../../../context/AdminContext';

function downloadJSON(data, filename) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function DataSection() {
  const { exportAllData, resetToDefaults } = useAdmin();

  return (
    <section className="mt-10 max-w-2xl rounded-2xl border border-error/25 bg-white p-5 shadow-elevated">
      <h3 className="mb-1 font-display text-lg text-forest-900">Data</h3>
      <p className="mb-4 text-sm text-navy-900/60">Back up everything, or reset the dashboard back to its seeded starting state.</p>
      <div className="flex flex-wrap gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => downloadJSON(exportAllData(), `odkhc-data-${new Date().toISOString().slice(0, 10)}.json`)}
        >
          Export All Data
        </Button>
        <Button
          type="button"
          variant="dark"
          onClick={() => window.confirm('Reset all dashboard data back to the seeded defaults? This cannot be undone.') && resetToDefaults()}
        >
          Reset to Defaults
        </Button>
      </div>
    </section>
  );
}
