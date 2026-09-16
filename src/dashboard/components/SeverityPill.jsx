const STYLES = {
  Info: 'bg-ink-900/8 text-ink-600',
  Warning: 'bg-gold-500/12 text-gold-700',
  Security: 'bg-error/10 text-error',
};

export default function SeverityPill({ severity }) {
  const value = severity || 'Info';
  return (
    <span className={`inline-block rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest ${STYLES[value] ?? STYLES.Info}`}>
      {value}
    </span>
  );
}
