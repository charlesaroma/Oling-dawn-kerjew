import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import Container from '../common/Container';
import SocialIcon from '../common/SocialIcon';
import { useSiteConfig } from '../../services/siteConfigQueries';

export default function Footer() {
  const { data: siteConfig } = useSiteConfig();
  const { orgName, tagline, emails, phones, registeredAddress, postalAddress, navLinks, socialLinks } = siteConfig;
  const nameWords = orgName.split(' ');
  const nameLastWord = nameWords.pop();
  const nameLead = nameWords.join(' ');

  return (
    <footer className="border-t border-white/5 bg-surface-dark text-gold-100/80">
      <Container className="grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <img src="/apple-touch-icon.png" alt="" className="h-10 w-10 shrink-0 rounded-full ring-1 ring-white/10" />
            <span className="flex flex-col leading-tight font-display italic text-lg font-semibold">
              <span className="text-white">{nameLead}</span>
              <span className="text-gold-400">{nameLastWord}</span>
            </span>
          </div>
          <p className="text-sm text-gold-100/70">{tagline}</p>
          {socialLinks?.length > 0 && (
            <div className="mt-2 flex gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-gold-100/70 transition-all hover:-translate-y-0.5 hover:border-gold-500/40 hover:text-gold-400"
                >
                  <SocialIcon label={social.label} />
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2.5">
          <span className="font-mono text-xs uppercase tracking-widest text-gold-300">Explore</span>
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} className="text-sm text-gold-100/70 transition-colors hover:text-white">
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-2.5">
          <span className="font-mono text-xs uppercase tracking-widest text-gold-300">Contact</span>
          {emails.map((email) => (
            <a key={email} href={`mailto:${email}`} className="flex items-start gap-2 text-sm text-gold-100/70 transition-colors hover:text-white">
              <Mail size={14} className="mt-0.5 shrink-0 text-gold-100/40" />
              {email}
            </a>
          ))}
          {phones.map((phone) => (
            <a key={phone} href={`tel:${phone.replace(/\s+/g, '')}`} className="flex items-start gap-2 text-sm text-gold-100/70 transition-colors hover:text-white">
              <Phone size={14} className="mt-0.5 shrink-0 text-gold-100/40" />
              {phone}
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-2.5">
          <span className="font-mono text-xs uppercase tracking-widest text-gold-300">Address</span>
          <p className="flex items-start gap-2 text-sm text-gold-100/70">
            <MapPin size={14} className="mt-0.5 shrink-0 text-gold-100/40" />
            {registeredAddress}
          </p>
          <p className="pl-[22px] text-sm text-gold-100/70">{postalAddress}</p>
        </div>
      </Container>

      <div className="border-t border-white/5 py-4 text-center text-xs text-gold-100/50">
        © {new Date().getFullYear()} {orgName}. All rights reserved.
      </div>
    </footer>
  );
}
