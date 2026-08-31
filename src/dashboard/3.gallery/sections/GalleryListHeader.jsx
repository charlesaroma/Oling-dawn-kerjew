import Button from '../../../components/common/Button';

export default function GalleryListHeader({ count, onAdd }) {
  return (
    <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="font-display text-3xl text-forest-900">Gallery</h1>
        <p className="mt-1 text-sm text-navy-900/60">{count} items</p>
      </div>
      <Button variant="primary" onClick={onAdd}>+ New Item</Button>
    </header>
  );
}
