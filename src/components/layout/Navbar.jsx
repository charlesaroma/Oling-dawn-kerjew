import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { DATA } from '../../services/jsonDataLoader';
import { HERO_DARK } from '../../config/heroTheme';

/* Wider than `container-site` (1280px) on purpose — the bar reads better
   with more breathing room than the page content below it caps out at. */
function NavContainer({ className = '', children }) {
  return <div className={`mx-auto w-full max-w-[1680px] px-6 sm:px-10 ${className}`}>{children}</div>;
}

/* Transparent only over the homepage hero, whose ground is known. Every other
   page opens on a full-bleed photo, where nav text on unpredictable photo
   brightness is unreadable, so the bar keeps its ground there. */
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const { orgName, wordmark, division, navLinks } = DATA.siteConfig;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const solid = scrolled || open || pathname !== '/';
  // Riding transparent over the dark homepage hero: flip to light text.
  const onDark = HERO_DARK && !solid;

  const linkClasses = ({ isActive }) =>
    `relative py-1 text-sm font-medium transition-colors duration-200 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:rounded-full after:bg-gold-500 after:transition-opacity after:duration-200 ${
      isActive
        ? `after:opacity-100 ${onDark ? 'text-surface' : 'text-forest-900'}`
        : `after:opacity-0 hover:after:opacity-100 ${onDark ? 'text-surface/70 hover:text-surface' : 'text-ink-700 hover:text-forest-900'}`
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid ? 'border-b border-ink-900/8 bg-surface/95 shadow-elevated backdrop-blur-xl' : 'border-b border-transparent bg-transparent'
      }`}
    >
      <NavContainer className={`flex items-center justify-between gap-4 transition-all duration-300 ${solid ? 'py-2.5' : 'py-4'}`}>
        <NavLink to="/" className="flex min-w-0 items-center gap-3">
          <img
            src="/apple-touch-icon.png"
            alt=""
            className={`shrink-0 rounded-full ring-1 transition-all duration-300 ${onDark ? 'ring-surface/25' : 'ring-ink-900/10'} ${solid ? 'h-9 w-9' : 'h-10 w-10'}`}
          />
          <span className="flex flex-col font-display text-base leading-[1.05] tracking-tight sm:text-lg" title={orgName}>
            <span className={`font-semibold ${onDark ? 'text-surface' : 'text-forest-900'}`}>{wordmark}</span>
            <span className={`text-[11px] font-semibold tracking-wide sm:text-xs ${onDark ? 'text-gold-400' : 'text-gold-600'}`}>{division}</span>
          </span>
        </NavLink>

        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.path} to={link.path} className={linkClasses} end={link.path === '/'}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <NavLink
          to="/contact"
          className="hidden shrink-0 rounded-full bg-gold-500 px-4 py-2 text-sm font-semibold text-ink-900 transition-all duration-200 hover:-translate-y-0.5 hover:bg-gold-400 md:inline-flex"
        >
          Get Involved
        </NavLink>

        <button
          type="button"
          className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors md:hidden ${onDark ? 'border-surface/25 text-surface' : 'border-ink-900/12 text-forest-800'}`}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </NavContainer>

      <div
        className={`overflow-hidden border-t border-ink-900/6 bg-surface transition-all duration-300 md:hidden ${
          open ? 'max-h-96' : 'max-h-0 border-t-0'
        }`}
      >
        <NavContainer className="flex flex-col gap-1 py-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive ? 'bg-forest-50 text-forest-900' : 'text-ink-700 hover:bg-forest-50/60'
                }`
              }
              end={link.path === '/'}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <NavLink
            to="/contact"
            className="mt-2 rounded-full bg-gold-500 px-5 py-3 text-center text-sm font-semibold text-ink-900"
            onClick={() => setOpen(false)}
          >
            Get Involved
          </NavLink>
        </NavContainer>
      </div>
    </header>
  );
}
