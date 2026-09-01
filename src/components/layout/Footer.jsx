import { Link } from 'react-router-dom';
import Container from '../common/Container';
import SocialIcon from '../common/SocialIcon';
import { DATA } from '../../services/jsonDataLoader';

export default function Footer() {
  const {
    orgName, wordmark, division, tagline, emails, phones,
    registeredAddress, postalAddress, navLinks, socialLinks,
  } = DATA.siteConfig;

  return (
    <footer className="bg-ink-900 text-surface/70">
      <Container className="grid gap-14 py-20 lg:grid-cols-[1.4fr_1fr_1.2fr] lg:gap-16">
        <div>
          <Link to="/" className="flex items-center gap-3">
            <img src="/apple-touch-icon.png" alt="" className="h-11 w-11 shrink-0 rounded-full ring-1 ring-surface/15" />
            <span className="flex flex-col font-display text-lg leading-[1.05]">
              <span className="text-surface">{wordmark}</span>
              <span className="italic text-gold-500">{division}</span>
            </span>
          </Link>

          {/* The registered entity in full — the wordmark above is the
              Projects arm this site covers, not the legal name. */}
          <p className="mt-6 max-w-[34ch] text-sm leading-relaxed text-surface/55">{orgName}</p>
          <p className="mt-4 max-w-[34ch] font-display text-xl italic leading-snug text-surface/80">{tagline}</p>

          {socialLinks?.length > 0 && (
            <div className="mt-8 flex gap-2.5">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-surface/15 text-surface/60 transition-all duration-200 hover:-translate-y-0.5 hover:border-gold-500/60 hover:text-gold-400"
                >
                  <SocialIcon label={social.label} />
                </a>
              ))}
            </div>
          )}
        </div>

        <nav className="flex flex-col gap-3.5">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-surface/35">Explore</span>
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} className="w-fit text-sm text-surface/65 transition-colors hover:text-surface">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-surface/35">Contact</span>
            {emails.map((email) => (
              <a key={email} href={`mailto:${email}`} className="w-fit break-all text-sm text-surface/65 transition-colors hover:text-surface">
                {email}
              </a>
            ))}
            {phones.map((phone) => (
              <a key={phone} href={`tel:${phone.replace(/\s+/g, '')}`} className="w-fit text-sm text-surface/65 transition-colors hover:text-surface">
                {phone}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-surface/35">Address</span>
            <p className="max-w-[36ch] text-sm leading-relaxed text-surface/65">{registeredAddress}</p>
            <p className="text-sm text-surface/45">{postalAddress}</p>
          </div>
        </div>
      </Container>

      <div className="border-t border-surface/10">
        <Container className="flex flex-wrap items-center justify-between gap-3 py-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-surface/35">
            © {new Date().getFullYear()} {orgName}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-surface/35">
            Registered NGO · Uganda
          </p>
        </Container>
      </div>
    </footer>
  );
}
