import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Menu, Search } from 'lucide-react';
import DashboardSidebar from './DashboardSidebar';

export default function DashboardLayout() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const submitSearch = (e) => {
    e.preventDefault();
    navigate(`/dashboard/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div className="min-h-screen bg-surface-alt">
      <DashboardSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="md:pl-64">
        <header className="sticky top-0 z-30 flex items-center gap-4 border-b border-navy-900/8 bg-white/90 px-6 py-3 backdrop-blur-sm lg:px-10">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="text-navy-900/60 hover:text-forest-800 md:hidden"
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
              className="w-full rounded-full border border-navy-900/10 bg-surface-alt py-2 pl-9 pr-3 text-sm outline-none transition-colors focus:border-gold-500 focus:bg-white"
            />
          </form>
        </header>
        <main className="p-6 lg:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
