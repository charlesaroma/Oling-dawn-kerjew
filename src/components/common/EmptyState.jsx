export default function EmptyState({ title = 'Nothing here yet', message, icon: Icon, skeleton = false }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-ink-900/15 bg-white/60 py-20 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-forest-50 text-forest-700">
        {Icon ? <Icon size={20} strokeWidth={2} /> : <span className="h-2 w-2 rounded-full bg-forest-400" />}
      </span>
      <p className="text-lg font-semibold text-forest-900">{title}</p>
      {message && <p className="max-w-sm text-ink-900/60">{message}</p>}
      {skeleton && (
        <div className="mt-2 flex w-full max-w-[220px] flex-col items-center gap-2">
          <span className="h-2 w-full rounded-full bg-ink-900/8" />
          <span className="h-2 w-3/4 rounded-full bg-ink-900/8" />
          <span className="h-2 w-1/2 rounded-full bg-ink-900/8" />
        </div>
      )}
    </div>
  );
}
