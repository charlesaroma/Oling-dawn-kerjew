export default function EmptyState({ title = 'Nothing here yet', message }) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed border-navy-900/15 py-16 text-center">
      <p className="text-lg font-semibold text-forest-900">{title}</p>
      {message && <p className="max-w-sm text-navy-900/60">{message}</p>}
    </div>
  );
}
