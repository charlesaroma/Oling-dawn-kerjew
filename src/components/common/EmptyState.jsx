export default function EmptyState({ title = 'Nothing here yet', message }) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed border-neutral-300 py-16 text-center">
      <p className="text-lg font-semibold text-neutral-700">{title}</p>
      {message && <p className="max-w-sm text-neutral-500">{message}</p>}
    </div>
  );
}
