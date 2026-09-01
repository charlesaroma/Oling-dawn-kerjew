import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Menu, Search } from 'lucide-react';
import DashboardSidebar from './DashboardSidebar';
import UploadModal from '../3.gallery/sections/UploadModal';
import UploadTray from '../3.gallery/components/UploadTray';
import { getSession } from '../../services/authService';
import useSocket from '../../services/useSocket';

// Scoped to the dashboard (this file is already behind a React.lazy() boundary
// in App.jsx) so @tanstack/react-query never ships in the public site's bundle.
const queryClient = new QueryClient();

const getInitials = (name) =>
  (name || '')
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

function DashboardShell() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const session = getSession();

  useSocket();

  const submitSearch = (e) => {
    e.preventDefault();
    navigate(`/dashboard/search?q=${encodeURIComponent(query.trim())}`);
  };

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="min-h-screen bg-surface">
      <DashboardSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:pl-[var(--sidebar-w)]">
        <header className="sticky top-0 z-30 flex items-center gap-4 border-b border-navy-900/8 bg-white/90 px-6 py-3 backdrop-blur-sm lg:px-10">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="text-navy-900/60 hover:text-forest-800 lg:hidden"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
          <form onSubmit={submitSearch} className="relative max-w-sm flex-1">
            <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-navy-900/30" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search profiles, projects, posts…"
              className="w-full rounded-full border border-navy-900/10 bg-gold-50 py-2 pl-9 pr-3 text-sm outline-none transition-colors focus:border-gold-500 focus:bg-white"
            />
          </form>
          <div className="ml-auto flex items-center gap-3">
            <span className="hidden items-center gap-2 rounded-full border border-gold-300/60 bg-gold-50 px-4 py-1.5 font-mono text-xs text-navy-900/70 sm:flex">
              {today}
            </span>
            {session && (
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy-900 font-mono text-xs font-semibold text-gold-300">
                {getInitials(session.name) || 'A'}
              </span>
            )}
          </div>
        </header>
        <main className="p-6 lg:p-10">
          <Outlet />
        </main>
      </div>

      <UploadModal />
      <UploadTray />
    </div>
  );
}

export default function DashboardLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <DashboardShell />
    </QueryClientProvider>
  );
}
