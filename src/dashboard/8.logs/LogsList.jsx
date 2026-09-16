import { useAuditLogs } from '../../services/auditLogQueries';
import LogsTable from './sections/LogsTable';

export default function LogsList() {
  const { data: logs, isFetching } = useAuditLogs();

  return (
    <div>
      <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl text-forest-900">System Logs</h1>
          <p className="mt-1 text-sm text-ink-900/60">
            {logs.length} recent {logs.length === 1 ? 'entry' : 'entries'} &middot; account activity and content changes across the dashboard
          </p>
        </div>
      </header>

      {isFetching && logs.length === 0 ? (
        <p className="py-16 text-center text-sm text-ink-500">Loading…</p>
      ) : (
        <LogsTable rows={logs} />
      )}
    </div>
  );
}
