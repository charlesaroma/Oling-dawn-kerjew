import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, FolderKanban, Images, Newspaper, UsersRound, Settings, LogOut, X,
} from 'lucide-react';
import { logout, getSession } from '../../services/authService';

const NAV = [
  { to: '/dashboard', label: 'Overview', end: true, icon: LayoutDashboard },
  { to: '/dashboard/profiles', label: 'Profiles', icon: Users },
  { to: '/dashboard/projects', label: 'Projects', icon: FolderKanban },
  { to: '/dashboard/gallery', label: 'Gallery', icon: Images },
  { to: '/dashboard/blog', label: 'Blog', icon: Newspaper },
  { to: '/dashboard/team', label: 'Team', icon: UsersRound },
  { to: '/dashboard/settings', label: 'Settings', icon: Settings },
];

export default function DashboardSidebar({ open, onClose }) {
  const navigate = useNavigate();
  const session = getSession();

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-navy-900/50 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-64 shrink-0 -translate-x-full flex-col border-r border-white/5 bg-navy-900 text-gold-100 transition-transform duration-200 md:translate-x-0 ${
          open ? 'translate-x-0' : ''
        }`}
      >
        <div className="flex items-center justify-between gap-3 border-b border-white/5 px-6 py-5">
          <Link to="/" className="flex items-center gap-3 transition-opacity hover:opacity-90">
            <img src="/apple-touch-icon.png" alt="" className="h-10 w-10 rounded-full ring-2 ring-gold-500/30" />
            <div className="flex flex-col leading-tight">
              <span className="font-display italic text-base font-semibold text-white">ODKHC</span>
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-gold-400">Admin Console</span>
            </div>
          </Link>
          <button type="button" onClick={onClose} className="text-gold-100/60 hover:text-white md:hidden" aria-label="Close menu">
            <X size={20} />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-3 py-5">
          {NAV.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={onClose}
                className={({ isActive }) =>
                  `group relative flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm transition-all duration-150 ${
                    isActive
                      ? 'bg-white/10 font-semibold text-white'
                      : 'text-gold-100/70 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`absolute left-0 top-1/2 h-5 -translate-y-1/2 rounded-r-full bg-gold-500 transition-all duration-150 ${
                        isActive ? 'w-[3px] opacity-100' : 'w-0 opacity-0'
                      }`}
                    />
                    <Icon size={17} strokeWidth={2} className={isActive ? 'text-gold-400' : 'text-gold-100/50 group-hover:text-gold-300'} />
                    {item.label}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        <div className="border-t border-white/5 p-3">
          {session && (
            <div className="mb-1 flex items-center gap-3 rounded-lg px-3 py-2.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold-500/15 font-mono text-xs text-gold-300">
                {session.name?.charAt(0) ?? 'A'}
              </span>
              <div className="min-w-0 leading-tight">
                <p className="truncate text-xs font-semibold text-white">{session.name}</p>
                <p className="truncate text-[11px] text-gold-100/50">{session.email}</p>
              </div>
            </div>
          )}
          <button
            type="button"
            onClick={() => { logout(); navigate('/login'); }}
            className="flex w-full items-center gap-3 rounded-lg px-3.5 py-2.5 text-left text-sm text-gold-100/70 transition-colors hover:bg-error/10 hover:text-error"
          >
            <LogOut size={17} strokeWidth={2} />
            Sign out
          </button>
        </div>
      </aside>
    </>
  );
}
