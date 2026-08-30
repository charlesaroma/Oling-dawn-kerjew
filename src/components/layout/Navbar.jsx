import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Container from '../common/Container';
import Button from '../common/Button';
import { DATA } from '../../services/jsonDataLoader';

const linkClasses = ({ isActive }) =>
  `text-sm font-medium transition-colors ${isActive ? 'text-gold-600' : 'text-forest-700 hover:text-gold-600'}`;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { shortName, navLinks } = DATA.siteConfig;

  return (
    <header className="sticky top-0 z-50 border-b border-gold-200 bg-white/95 backdrop-blur">
      <Container className="flex items-center justify-between py-3">
        <NavLink to="/" className="flex items-center gap-3">
          <img src="/apple-touch-icon.png" alt="" className="h-10 w-10 rounded-full" />
          <span className="font-display italic text-lg font-semibold text-forest-800">{shortName}</span>
        </NavLink>

        <nav className="hidden items-center gap-8 md:flex">
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
          className="flex h-10 w-10 items-center justify-center rounded-md border border-gold-200 md:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="text-xl">{open ? '✕' : '☰'}</span>
        </button>
      </Container>

      {open && (
        <nav className="border-t border-gold-200 bg-white md:hidden">
          <Container className="flex flex-col gap-4 py-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={linkClasses}
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
        </nav>
      )}
    </header>
  );
}
