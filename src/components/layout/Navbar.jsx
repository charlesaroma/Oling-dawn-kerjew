import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Container from '../common/Container';
import { DATA } from '../../services/jsonDataLoader';

/* Every page opens on a dark band (the hero, or PageHeader), so the bar rides
   transparent over it and only takes a surface once you've scrolled past. */
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { orgName, navLinks } = DATA.siteConfig;
  const nameWords = orgName.split(' ');
  const nameLastWord = nameWords.pop();
  const nameLead = nameWords.join(' ');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const solid = scrolled || open;

  const linkClasses = ({ isActive }) =>
    `relative py-1 text-sm font-medium transition-colors duration-200 after:absolute after:-bottom-1 after:left-0 after:h-px after:rounded-full after:bg-gold-500 after:transition-all after:duration-200 ${
      isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'
    } ${solid ? (isActive ? 'text-forest-900' : 'text-ink-700 hover:text-forest-900') : (isActive ? 'text-surface' : 'text-surface/70 hover:text-surface')}`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid ? 'border-b border-ink-900/8 bg-surface/85 backdrop-blur-xl' : 'border-b border-transparent bg-transparent'
      }`}
    >
      <Container className={`flex items-center justify-between gap-4 transition-all duration-300 ${solid ? 'py-3' : 'py-5'}`}>
        <NavLink to="/" className="flex min-w-0 items-center gap-3">
          <img
            src="/apple-touch-icon.png"
            alt=""
            className={`shrink-0 rounded-full transition-all duration-300 ${
              solid ? 'h-9 w-9 ring-1 ring-ink-900/10' : 'h-10 w-10 ring-1 ring-surface/25'
            }`}
          />
          <span className="flex flex-col font-display text-base leading-[1.05] sm:text-lg">
            <span className={solid ? 'text-forest-900' : 'text-surface'}>{nameLead}</span>
            <span className="italic text-gold-500">{nameLastWord}</span>
          </span>
        </NavLink>

        <nav className="hidden items-center gap-9 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.path} to={link.path} className={linkClasses} end={link.path === '/'}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <NavLink
          to="/contact"
          className={`hidden shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 md:inline-flex ${
            solid ? 'bg-forest-800 text-surface hover:bg-forest-900' : 'bg-gold-500 text-ink-900 hover:bg-gold-400'
          }`}
        >
          Get Involved
        </NavLink>

        <button
          type="button"
          className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors md:hidden ${
            solid ? 'border-ink-900/12 text-forest-800' : 'border-surface/25 text-surface'
          }`}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </Container>

      <div
        className={`overflow-hidden border-t border-ink-900/6 bg-surface transition-all duration-300 md:hidden ${
          open ? 'max-h-96' : 'max-h-0 border-t-0'
        }`}
      >
        <Container className="flex flex-col gap-1 py-4">
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
        </Container>
      </div>
    </header>
  );
}
