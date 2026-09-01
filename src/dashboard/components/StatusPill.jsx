const STYLES = {
  published: 'bg-success/10 text-success',
  draft: 'bg-ink-900/10 text-ink-900/60',
};

export default function StatusPill({ status }) {
  const value = status || 'published';
  return (
    <span className={`inline-block rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest ${STYLES[value]}`}>
      {value}
    </span>
  );
}
