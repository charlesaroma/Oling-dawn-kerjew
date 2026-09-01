import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Container from '../common/Container';
import Button from '../common/Button';
import { DATA } from '../../services/jsonDataLoader';

const linkClasses = ({ isActive }) =>
  `relative py-1 text-sm font-medium transition-colors after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:rounded-full after:bg-gold-500 after:transition-all after:duration-200 ${
    isActive ? 'text-forest-900 after:w-full' : 'text-forest-700 after:w-0 hover:text-forest-900 hover:after:w-full'
  }`;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { orgName, navLinks } = DATA.siteConfig;
  const nameWords = orgName.split(' ');
  const nameLastWord = nameWords.pop();
  const nameLead = nameWords.join(' ');

  return (
    <header className="sticky top-0 z-50 border-b border-navy-900/6 bg-[var(--color-surface)] shadow-elevated-lg backdrop-blur-md">
      <Container className="flex items-center justify-between gap-4 py-3">
        <NavLink to="/" className="flex min-w-0 items-center gap-3">
          <img src="/apple-touch-icon.png" alt="" className="h-10 w-10 shrink-0 rounded-full ring-1 ring-navy-900/5" />
          <span className="flex flex-col leading-tight font-display italic text-base font-semibold sm:text-lg">
            <span className="text-forest-800">{nameLead}</span>
            <span className="text-gold-600">{nameLastWord}</span>
          </span>
        </NavLink>

        <nav className="hidden items-center gap-9 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.path} to={link.path} className={linkClasses} end={link.path === '/'}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button to="/contact" variant="primary">
            Get Involved
          </Button>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-navy-900/10 text-forest-800 transition-colors hover:bg-forest-50 md:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </Container>

      <div
        className={`overflow-hidden border-t border-navy-900/6 bg-white transition-all duration-200 md:hidden ${
          open ? 'max-h-96' : 'max-h-0 border-t-0'
        }`}
      >
        <Container className="flex flex-col gap-4 py-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => `text-sm font-medium ${isActive ? 'text-forest-900' : 'text-forest-700'}`}
              end={link.path === '/'}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <Button to="/contact" variant="primary" className="mt-2 w-full" onClick={() => setOpen(false)}>
            Get Involved
          </Button>
        </Container>
      </div>
    </header>
  );
}
