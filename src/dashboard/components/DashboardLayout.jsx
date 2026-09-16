import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';
import DashboardSidebar from './DashboardSidebar';
import UploadModal from '../3.gallery/sections/UploadModal';
import UploadTray from '../3.gallery/components/UploadTray';
import { getSession } from '../../services/authService';
import useSocket from '../../services/useSocket';

const getInitials = (name) =>
  (name || '')
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

function DashboardShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const session = getSession();

  useSocket();

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="min-h-screen bg-surface-alt">
      <DashboardSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:pl-[var(--sidebar-w)]">
        <header className="sticky top-0 z-30 flex items-center gap-4 border-b border-ink-900/8 bg-surface/85 px-6 py-3.5 backdrop-blur-xl lg:px-10">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="text-ink-500 transition-colors hover:text-forest-800 lg:hidden"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
          <div className="ml-auto flex items-center gap-3">
            <span className="hidden items-center gap-2 rounded-full border border-ink-900/8 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-500 sm:flex">
              {today}
            </span>
            {session && (
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink-900 font-mono text-xs font-medium text-gold-400">
                {getInitials(session.name) || 'A'}
              </span>
            )}
          </div>
        </header>
        <main className="p-6 lg:p-10 xl:p-12">
          <Outlet />
        </main>
      </div>

      <UploadModal />
      <UploadTray />
    </div>
  );
}

export default function DashboardLayout() {
  return <DashboardShell />;
}
