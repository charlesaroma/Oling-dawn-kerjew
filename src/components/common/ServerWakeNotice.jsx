import { useEffect, useState } from 'react';

// Most loads finish well inside this window, so the notice only appears when
// the backend is genuinely slow — typically a Render cold start (see
// api/wakeServer.js) — rather than flashing up on every page visit.
const SHOW_AFTER_MS = 4000;

export default function ServerWakeNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), SHOW_AFTER_MS);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      role="status"
      className="mx-auto mb-12 flex w-full max-w-xl flex-col items-center gap-3 rounded-2xl border border-ink-900/8 bg-surface-card px-6 py-5 text-center shadow-elevated"
    >
      <p className="flex items-center gap-3 text-sm font-semibold text-forest-800">
        <span className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-ink-900/15 border-t-gold-500 motion-reduce:animate-none" />
        Waking up our server…
      </p>
      <p className="max-w-[46ch] text-sm leading-relaxed text-ink-500">
        It rests when the site has been quiet, so this first load can take up to a minute. Thanks for waiting — it&apos;s quick after that.
      </p>
      <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-ink-900/8">
        <div className="wake-progress h-full rounded-full bg-gold-500" />
      </div>
    </div>
  );
}
