import { NavLink, Link, useNavigate } from 'react-router-dom';
import { logout } from '../../services/authService';

const NAV = [
  { to: '/dashboard', label: 'Overview', end: true },
  { to: '/dashboard/profiles', label: 'Profiles' },
];

export default function DashboardSidebar() {
  const navigate = useNavigate();

  return (
    <aside className="flex w-full shrink-0 flex-col border-b border-navy-800 bg-navy-900 text-gold-100 md:min-h-screen md:w-60 md:border-b-0 md:border-r">
      <Link to="/" className="flex items-center gap-3 border-b border-navy-800 px-5 py-4 transition-opacity hover:opacity-90">
        <img src="/apple-touch-icon.png" alt="" className="h-10 w-10 rounded-full" />
        <span className="font-display italic text-sm font-semibold text-white">ODKHC</span>
      </Link>
      <p className="px-5 pb-1 pt-4 font-mono text-[9px] uppercase tracking-[0.3em] text-gold-300">Admin Console</p>

      <nav className="flex flex-row gap-1 overflow-x-auto px-3 py-3 md:flex-col">
        {NAV.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `whitespace-nowrap rounded-md px-3 py-2.5 text-sm transition-colors ${
                isActive ? 'bg-gold-500 text-navy-900 font-semibold' : 'text-gold-100/80 hover:bg-navy-800 hover:text-white'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto border-t border-navy-800 p-4">
        <button
          type="button"
          onClick={() => { logout(); navigate('/login'); }}
          className="w-full rounded-md px-3 py-2 text-left text-sm text-gold-100/70 transition-colors hover:bg-error/10 hover:text-error"
        >
          Sign out
        </button>
      </div>
    </aside>
  );
}
