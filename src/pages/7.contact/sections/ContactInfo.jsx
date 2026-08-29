import { DATA } from '../../../services/jsonDataLoader';

export default function ContactInfo() {
  const { email, phone, address, socialLinks } = DATA.siteConfig;

  return (
    <div className="flex flex-col gap-6 rounded-lg border border-neutral-200 p-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">Email</p>
        <a href={`mailto:${email}`} className="font-semibold text-primary-700 hover:underline">{email}</a>
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">Phone</p>
        <a href={`tel:${phone}`} className="font-semibold text-primary-700 hover:underline">{phone}</a>
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">Address</p>
        <p className="font-semibold text-neutral-900">{address}</p>
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">Follow Us</p>
        <div className="flex gap-4">
          {socialLinks.map((social) => (
            <a key={social.label} href={social.url} target="_blank" rel="noreferrer" className="text-primary-700 hover:underline">
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
