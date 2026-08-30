import { Link } from 'react-router-dom';
import Container from '../common/Container';
import { DATA } from '../../services/jsonDataLoader';

export default function Footer() {
  const { orgName, tagline, emails, phones, registeredAddress, postalAddress, navLinks, socialLinks } = DATA.siteConfig;

  return (
    <footer className="border-t border-navy-800 bg-surface-dark text-gold-100/80">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <img src="/apple-touch-icon.png" alt="" className="h-10 w-10 rounded-full" />
            <span className="font-display italic text-lg font-semibold text-white">{orgName}</span>
          </div>
          <p className="text-sm text-gold-100/70">{tagline}</p>
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs uppercase tracking-widest text-gold-300">Explore</span>
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} className="text-sm text-gold-100/70 hover:text-white">
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs uppercase tracking-widest text-gold-300">Contact</span>
          {emails.map((email) => (
            <a key={email} href={`mailto:${email}`} className="text-sm text-gold-100/70 hover:text-white">{email}</a>
          ))}
          {phones.map((phone) => (
            <a key={phone} href={`tel:${phone.replace(/\s+/g, '')}`} className="text-sm text-gold-100/70 hover:text-white">{phone}</a>
          ))}
          <p className="text-sm text-gold-100/70">{registeredAddress}</p>
          <p className="text-sm text-gold-100/70">{postalAddress}</p>
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs uppercase tracking-widest text-gold-300">Follow</span>
          {socialLinks.map((social) => (
            <a key={social.label} href={social.url} target="_blank" rel="noreferrer" className="text-sm text-gold-100/70 hover:text-white">
              {social.label}
            </a>
          ))}
        </div>
      </Container>

      <div className="border-t border-white/10 py-4 text-center text-xs text-gold-100/50">
        © {new Date().getFullYear()} {orgName}. All rights reserved.
      </div>
    </footer>
  );
}
