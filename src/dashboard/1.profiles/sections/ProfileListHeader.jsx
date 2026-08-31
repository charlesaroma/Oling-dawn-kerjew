import Button from '../../../components/common/Button';

export default function ProfileListHeader({ count, onExportCSV, onExportPDF, onAdd }) {
  return (
    <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="font-display text-3xl text-forest-900">Profiles</h1>
        <p className="mt-1 text-sm text-navy-900/60">{count} registered</p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button variant="outline" onClick={onExportCSV}>Export CSV</Button>
        <Button variant="outline" onClick={onExportPDF}>Export PDF</Button>
        <Button variant="primary" onClick={onAdd}>+ Register Person</Button>
      </div>
    </header>
  );
}
