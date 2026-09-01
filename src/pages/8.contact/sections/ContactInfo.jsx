import { Mail, Phone, MapPin } from 'lucide-react';
import SocialIcon from '../../../components/common/SocialIcon';
import { DATA } from '../../../services/jsonDataLoader';

export default function ContactInfo() {
  const { emails, phones, registeredAddress, postalAddress, socialLinks } = DATA.siteConfig;

  const blocks = [
    { icon: Mail, label: 'Email', items: emails.map((e) => ({ text: e, href: `mailto:${e}` })) },
    { icon: Phone, label: 'Phone', items: phones.map((p) => ({ text: p, href: `tel:${p.replace(/\s+/g, '')}` })) },
    { icon: MapPin, label: 'Address', items: [{ text: registeredAddress }, { text: postalAddress, muted: true }] },
  ];

  return (
    <div className="flex flex-col">
      {blocks.map(({ icon: Icon, label, items }) => (
        <div key={label} className="flex gap-5 border-b border-ink-900/8 py-7 first:pt-0">
          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink-900/10 text-forest-700">
            <Icon size={15} strokeWidth={1.75} />
          </span>
          <div className="min-w-0">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-400">{label}</p>
            <div className="mt-2.5 space-y-1.5">
              {items.map(({ text, href, muted }) => (
                href ? (
                  <a key={text} href={href}
                     className="block break-words text-[15px] text-forest-900 transition-colors hover:text-bronze-700">
                    {text}
                  </a>
                ) : (
                  <p key={text} className={`text-[15px] leading-relaxed ${muted ? 'text-ink-400' : 'text-forest-900'}`}>{text}</p>
                )
              ))}
            </div>
          </div>
        </div>
      ))}

      <div className="pt-7">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-400">Follow</p>
        <div className="mt-3.5 flex gap-2.5">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.url}
              target="_blank"
              rel="noreferrer"
              aria-label={social.label}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-900/10 text-forest-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-gold-500 hover:text-gold-700"
            >
              <SocialIcon label={social.label} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
