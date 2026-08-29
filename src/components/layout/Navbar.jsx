import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Container from '../common/Container';
import Button from '../common/Button';
import { DATA } from '../../services/jsonDataLoader';

const linkClasses = ({ isActive }) =>
  `text-sm font-medium transition-colors ${isActive ? 'text-accent-600' : 'text-neutral-700 hover:text-primary-700'}`;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { orgName, navLinks } = DATA.siteConfig;

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/95 backdrop-blur">
      <Container className="flex items-center justify-between py-4">
        <NavLink to="/" className="text-lg font-display font-extrabold text-primary-800">
          {orgName}
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
          className="flex h-10 w-10 items-center justify-center rounded-md border border-neutral-200 md:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="text-xl">{open ? '✕' : '☰'}</span>
        </button>
      </Container>

      {open && (
        <nav className="border-t border-neutral-200 bg-white md:hidden">
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
