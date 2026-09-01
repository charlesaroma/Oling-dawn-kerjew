export default function EmptyState({ title = 'Nothing here yet', message, icon: Icon, skeleton = false }) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-ink-900/12 bg-surface-alt/50 px-6 py-20 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-forest-50 text-forest-700">
        {Icon ? <Icon size={20} strokeWidth={1.75} /> : <span className="h-1.5 w-1.5 rounded-full bg-forest-400" />}
      </span>
      <p className="font-display text-xl text-forest-900">{title}</p>
      {message && <p className="max-w-sm text-sm leading-relaxed text-ink-500">{message}</p>}
      {skeleton && (
        <div className="mt-1 flex w-full max-w-[220px] flex-col items-center gap-2">
          <span className="h-1.5 w-full rounded-full bg-ink-900/6" />
          <span className="h-1.5 w-3/4 rounded-full bg-ink-900/6" />
          <span className="h-1.5 w-1/2 rounded-full bg-ink-900/6" />
        </div>
      )}
    </div>
  );
}
