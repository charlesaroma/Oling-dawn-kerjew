import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  LayoutDashboard, Users, FolderKanban, Images, Newspaper, UsersRound, Search, Settings, LogOut, X, ChevronRight,
} from 'lucide-react';
import { logout, getSession } from '../../services/authService';

const SECTIONS = [
  {
    label: 'Content',
    items: [
      { to: '/dashboard', label: 'Overview', end: true, icon: LayoutDashboard },
      { to: '/dashboard/profiles', label: 'Profiles', icon: Users },
      { to: '/dashboard/projects', label: 'Projects', icon: FolderKanban },
      { to: '/dashboard/gallery', label: 'Gallery', icon: Images },
      { to: '/dashboard/blog', label: 'Blog', icon: Newspaper },
      { to: '/dashboard/team', label: 'Team', icon: UsersRound },
    ],
  },
  {
    label: 'System',
    items: [
      { to: '/dashboard/search', label: 'Search', icon: Search },
      { to: '/dashboard/settings', label: 'Account', icon: Settings },
    ],
  },
];

function Brand() {
  return (
    <Link to="/" className="flex items-center gap-3 transition-opacity hover:opacity-90">
      <img src="/apple-touch-icon.png" alt="" className="h-10 w-10 shrink-0 rounded-full ring-2 ring-gold-500/30" />
      <div className="flex flex-col leading-tight">
        <span className="font-display italic text-sm font-semibold text-white">Oling Dawn Kerjew</span>
        <span className="font-display italic text-sm font-semibold text-gold-400">Projects</span>
        <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.25em] text-gold-400/70">Admin Console</span>
      </div>
    </Link>
  );
}

function AccountBlock({ session, onSignOut }) {
  return (
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
        onClick={onSignOut}
        className="flex w-full items-center gap-3 rounded-lg px-3.5 py-2.5 text-left text-sm text-gold-100/70 transition-colors hover:bg-error/10 hover:text-error"
      >
        <LogOut size={17} strokeWidth={2} />
        Sign out
      </button>
    </div>
  );
}

function NavSections({ dense, onNavigate }) {
  return SECTIONS.map((section) => (
    <div key={section.label} className="mb-5 last:mb-0">
      <p className="mb-2 px-3.5 font-mono text-[10px] uppercase tracking-[0.25em] text-gold-100/35">{section.label}</p>
      <div className="space-y-0.5">
        {section.items.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={onNavigate}
              className={({ isActive }) =>
                `group relative flex items-center gap-3 rounded-lg px-3.5 text-sm transition-all duration-150 ${dense ? 'py-3' : 'py-2.5'} ${
                  isActive ? 'bg-gold-500 font-semibold text-ink-900' : 'text-gold-100/70 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={dense ? 18 : 17} strokeWidth={2} className={isActive ? 'text-ink-900' : 'text-gold-100/50 group-hover:text-gold-300'} />
                  {item.label}
                  {!dense && (
                    <ChevronRight
                      size={14}
                      className={`ml-auto opacity-0 transition-opacity group-hover:opacity-100 ${isActive ? 'text-ink-900/50' : 'text-gold-100/40'}`}
                    />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </div>
  ));
}

export default function DashboardSidebar({ open, onClose }) {
  const navigate = useNavigate();
  const session = getSession();

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const signOut = () => {
    logout();
    navigate('/login');
    onClose?.();
  };

  return (
    <>
      {/* DESKTOP RAIL */}
      <aside className="fixed inset-y-0 left-0 z-50 hidden h-screen w-[var(--sidebar-w)] shrink-0 flex-col border-r border-white/5 bg-ink-900 text-gold-100 lg:flex">
        <div className="border-b border-white/5 px-6 py-5">
          <Brand />
        </div>
        <nav className="flex flex-1 flex-col overflow-y-auto px-3 py-5">
          <NavSections />
        </nav>
        <AccountBlock session={session} onSignOut={signOut} />
      </aside>

      {/* MOBILE BOTTOM SHEET */}
      {createPortal(
        <AnimatePresence>
          {open && (
            <div className="fixed inset-0 z-100 lg:hidden">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={onClose}
                className="absolute inset-0 bg-ink-900/60 backdrop-blur-sm"
              />
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                className="absolute bottom-0 left-0 right-0 flex max-h-[88dvh] flex-col overflow-hidden rounded-t-3xl bg-ink-900 text-gold-100 shadow-elevated-lg"
              >
                <div className="mx-auto mt-3 h-1.5 w-12 shrink-0 rounded-full bg-white/15" />
                <div className="flex items-center justify-between border-b border-white/5 px-6 py-4">
                  <Brand />
                  <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close menu"
                    className="rounded-full p-1.5 text-gold-100/60 hover:text-white"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto px-3 py-4">
                  <NavSections dense onNavigate={onClose} />
                </div>
                <AccountBlock session={session} onSignOut={signOut} />
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}
