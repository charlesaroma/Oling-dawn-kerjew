import { Link } from 'react-router-dom';
import Container from '../common/Container';
import { DATA } from '../../services/jsonDataLoader';

export default function Footer() {
  const { orgName, tagline, email, phone, address, navLinks, socialLinks } = DATA.siteConfig;

  return (
    <footer className="border-t border-neutral-200 bg-primary-900 text-neutral-200">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-3">
          <span className="text-lg font-display font-bold text-white">{orgName}</span>
          <p className="text-sm text-neutral-300">{tagline}</p>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-white">Explore</span>
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} className="text-sm text-neutral-300 hover:text-white">
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-white">Contact</span>
          <a href={`mailto:${email}`} className="text-sm text-neutral-300 hover:text-white">{email}</a>
          <a href={`tel:${phone}`} className="text-sm text-neutral-300 hover:text-white">{phone}</a>
          <p className="text-sm text-neutral-300">{address}</p>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-white">Follow</span>
          {socialLinks.map((social) => (
            <a key={social.label} href={social.url} target="_blank" rel="noreferrer" className="text-sm text-neutral-300 hover:text-white">
              {social.label}
            </a>
          ))}
        </div>
      </Container>

      <div className="border-t border-white/10 py-4 text-center text-xs text-neutral-400">
        © {new Date().getFullYear()} {orgName}. All rights reserved.
      </div>
    </footer>
  );
}
