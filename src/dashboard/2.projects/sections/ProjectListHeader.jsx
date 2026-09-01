import Button from '../../../components/common/Button';

export default function ProjectListHeader({ count, onAdd }) {
  return (
    <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="font-display text-3xl text-forest-900">Projects</h1>
        <p className="mt-1 text-sm text-ink-900/60">{count} total &middot; changes go live on the public site instantly</p>
      </div>
      <Button variant="primary" onClick={onAdd}>+ New Project</Button>
    </header>
  );
}
