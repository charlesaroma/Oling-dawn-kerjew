export default function EmptyState({ title = 'Nothing here yet', message }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-navy-900/15 bg-white/60 py-20 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-forest-50 text-forest-700">
        <span className="h-2 w-2 rounded-full bg-forest-400" />
      </span>
      <p className="text-lg font-semibold text-forest-900">{title}</p>
      {message && <p className="max-w-sm text-navy-900/60">{message}</p>}
    </div>
  );
}
