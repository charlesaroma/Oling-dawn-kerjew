import { Mail, Phone, MapPin } from 'lucide-react';
import SocialIcon from '../../../components/common/SocialIcon';
import { DATA } from '../../../services/jsonDataLoader';

export default function ContactInfo() {
  const { emails, phones, registeredAddress, postalAddress, socialLinks } = DATA.siteConfig;

  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-navy-900/8 bg-white p-6 shadow-elevated">
      <div className="flex items-start gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-forest-50 text-forest-700">
          <Mail size={16} />
        </span>
        <div>
          <p className="font-mono text-xs uppercase tracking-wide text-navy-900/50">Email</p>
          {emails.map((email) => (
            <a key={email} href={`mailto:${email}`} className="block font-semibold text-forest-700 hover:underline">{email}</a>
          ))}
        </div>
      </div>

      <div className="flex items-start gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-forest-50 text-forest-700">
          <Phone size={16} />
        </span>
        <div>
          <p className="font-mono text-xs uppercase tracking-wide text-navy-900/50">Phone</p>
          {phones.map((phone) => (
            <a key={phone} href={`tel:${phone.replace(/\s+/g, '')}`} className="block font-semibold text-forest-700 hover:underline">{phone}</a>
          ))}
        </div>
      </div>

      <div className="flex items-start gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-forest-50 text-forest-700">
          <MapPin size={16} />
        </span>
        <div>
          <p className="font-mono text-xs uppercase tracking-wide text-navy-900/50">Address</p>
          <p className="font-semibold text-forest-900">{registeredAddress}</p>
          <p className="text-sm text-navy-900/60">{postalAddress}</p>
        </div>
      </div>

      <div>
        <p className="mb-2 font-mono text-xs uppercase tracking-wide text-navy-900/50">Follow Us</p>
        <div className="flex gap-2">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.url}
              target="_blank"
              rel="noreferrer"
              aria-label={social.label}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-navy-900/10 text-forest-700 transition-all hover:-translate-y-0.5 hover:border-gold-500/40 hover:text-gold-700"
            >
              <SocialIcon label={social.label} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
