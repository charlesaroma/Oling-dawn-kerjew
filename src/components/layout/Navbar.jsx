import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { DATA } from '../../services/jsonDataLoader';
import SocialIcon from '../common/SocialIcon';

/* Wider than `container-site` (1280px) on purpose: the bar reads better
   with more breathing room than the page content below it caps out at. */
function NavContainer({ className = '', children }) {
  return <div className={`mx-auto w-full max-w-[1680px] px-6 sm:px-10 ${className}`}>{children}</div>;
}

/* The mobile sheet carries the same forest -> ink ground as the hero and the
   footer, so opening the menu reads as part of the site rather than as a
   white system panel dropped on top of it. */
const SHEET_GROUND = {
  background:
    'linear-gradient(165deg, var(--color-forest-900) 0%, var(--color-forest-800) 44%, var(--color-ink-900) 100%)',
};

const SHEET_BLOOM = {
  background: 'radial-gradient(ellipse at 88% 4%, rgba(223, 161, 38, 0.18) 0%, transparent 62%)',
};

/* Transparent only over the homepage hero, whose ground is known to be the
   dark full-bleed photo carousel. Every other page opens on a pictorial
   header where nav text on unpredictable photo brightness is unreadable, so
   the bar keeps its own ground there. */
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const { orgName, wordmark, division, navLinks, emails, phones, socialLinks } = DATA.siteConfig;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Navigating with the sheet open should close it: React Router keeps the
     component mounted across routes, so nothing else would. */
  useEffect(() => setOpen(false), [pathname]);

  /* While the sheet is up it owns the viewport: the page behind it must not
     scroll, and Escape must get you out. */
  useEffect(() => {
    if (!open) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const overHero = pathname === '/' && !scrolled;
  // With the sheet open, the sheet itself is the ground: the bar rides it.
  const solid = !open && !overHero;
  const onDark = open || overHero;

  const linkClasses = ({ isActive }) =>
    `tap-target relative py-1 text-sm font-medium transition-colors duration-200 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:rounded-full after:bg-gold-500 after:transition-opacity after:duration-200 ${
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
      {/* `relative z-50` keeps the bar painted above the mobile sheet below,
          which is a child of this same fixed header and would otherwise cover
          the wordmark and the close button. */}
      <NavContainer className={`relative z-50 flex items-center justify-between gap-4 transition-all duration-300 ${solid ? 'py-2.5' : 'py-4'}`}>
        <NavLink to="/" className="flex min-w-0 items-center gap-3">
          <img
            src="/apple-touch-icon.png"
            alt=""
            width={40}
            height={40}
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
          className="tap-target hidden shrink-0 rounded-full bg-gold-500 px-4 py-2 text-sm font-semibold text-ink-900 transition-all duration-200 hover:-translate-y-0.5 hover:bg-gold-400 md:inline-flex"
        >
          Get Involved
        </NavLink>

        <button
          type="button"
          className={`tap-target flex h-10 w-10 items-center justify-center rounded-full border transition-colors md:hidden ${onDark ? 'border-surface/25 text-surface' : 'border-ink-900/12 text-forest-800'}`}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </NavContainer>

      {/* Mobile sheet: full height, brand ground, the links typeset in the
          display face instead of rendered as a list of small UI rows.
          Kept mounted and hidden with `invisible` rather than unmounted, so
          it can fade both ways while staying out of the tab order when
          closed; the inner key restarts the staggered entrance on each open. */}
      <div
        id="mobile-menu"
        aria-hidden={!open}
        className={`fixed inset-0 z-40 transition-[opacity,visibility] duration-300 md:hidden ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
        style={SHEET_GROUND}
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={SHEET_BLOOM} />

        <div className="no-scrollbar relative h-full overflow-y-auto">
          <div key={open ? 'open' : 'closed'} className="flex min-h-full flex-col px-6 pb-8 pt-[5.5rem]">
            <nav className="flex flex-col">
              {navLinks.map((link, i) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === '/'}
                  onClick={() => setOpen(false)}
                  style={{ animationDelay: `${70 + i * 45}ms` }}
                  className={({ isActive }) =>
                    `nav-row-in flex items-center gap-4 border-b border-surface/10 py-4 font-display text-[1.65rem] leading-none tracking-[-0.015em] transition-colors duration-200 ${
                      isActive ? 'text-gold-400' : 'text-surface hover:text-gold-300'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span className={`font-mono text-[10px] tracking-[0.18em] ${isActive ? 'text-gold-500/70' : 'text-surface/30'}`}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {link.label}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            <NavLink
              to="/contact"
              onClick={() => setOpen(false)}
              style={{ animationDelay: `${70 + navLinks.length * 45}ms` }}
              className="nav-row-in mt-8 rounded-full bg-gold-500 px-6 py-4 text-center text-sm font-semibold text-ink-900 transition-colors duration-200 hover:bg-gold-400"
            >
              Get Involved
            </NavLink>

            <div
              className="nav-row-in mt-auto pt-10"
              style={{ animationDelay: `${130 + navLinks.length * 45}ms` }}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-surface/40">Get in touch</p>
              {emails?.[0] && (
                <a href={`mailto:${emails[0]}`} className="mt-1 flex w-fit items-center py-3 text-sm text-surface/80 transition-colors hover:text-gold-300">
                  {emails[0]}
                </a>
              )}
              {phones?.[0] && (
                <a href={`tel:${phones[0].replace(/\s+/g, '')}`} className="flex w-fit items-center py-3 font-mono text-sm text-surface/80 transition-colors hover:text-gold-300">
                  {phones[0]}
                </a>
              )}

              <div className="mt-6 flex items-center gap-2.5">
                {socialLinks?.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-surface/20 text-surface/70 transition-colors duration-200 hover:border-gold-500/60 hover:text-gold-400"
                  >
                    <SocialIcon label={social.label} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
