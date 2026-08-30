import { DATA } from '../../../services/jsonDataLoader';

export default function ContactInfo() {
  const { emails, phones, registeredAddress, postalAddress, socialLinks } = DATA.siteConfig;

  return (
    <div className="flex flex-col gap-6 rounded-lg border border-navy-900/10 p-6">
      <div>
        <p className="font-mono text-xs uppercase tracking-wide text-navy-900/50">Email</p>
        {emails.map((email) => (
          <a key={email} href={`mailto:${email}`} className="block font-semibold text-forest-700 hover:underline">{email}</a>
        ))}
      </div>
      <div>
        <p className="font-mono text-xs uppercase tracking-wide text-navy-900/50">Phone</p>
        {phones.map((phone) => (
          <a key={phone} href={`tel:${phone.replace(/\s+/g, '')}`} className="block font-semibold text-forest-700 hover:underline">{phone}</a>
        ))}
      </div>
      <div>
        <p className="font-mono text-xs uppercase tracking-wide text-navy-900/50">Registered Address</p>
        <p className="font-semibold text-forest-900">{registeredAddress}</p>
      </div>
      <div>
        <p className="font-mono text-xs uppercase tracking-wide text-navy-900/50">Postal Address</p>
        <p className="font-semibold text-forest-900">{postalAddress}</p>
      </div>
      <div>
        <p className="font-mono text-xs uppercase tracking-wide text-navy-900/50">Follow Us</p>
        <div className="flex gap-4">
          {socialLinks.map((social) => (
            <a key={social.label} href={social.url} target="_blank" rel="noreferrer" className="font-semibold text-forest-700 hover:underline">
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
