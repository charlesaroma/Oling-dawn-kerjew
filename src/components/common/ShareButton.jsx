import { useEffect, useRef, useState } from 'react';
import { Share2, Link2, Check } from 'lucide-react';
import SocialIcon from './SocialIcon';

const LINKS = (url, title) => [
  { label: 'X', href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}` },
  { label: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
  { label: 'WhatsApp', href: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} ${url}`)}` },
];

/* Native share sheet where supported (most mobile browsers); a small
   dropdown with copy-link + social links everywhere else. */
export default function ShareButton({ title, text, className = '' }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef(null);
  const url = typeof window !== 'undefined' ? window.location.href : '';

  useEffect(() => {
    if (!open) return undefined;
    const onDown = (e) => { if (!ref.current?.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable (e.g. insecure context) — link stays visible below to copy manually.
    }
  };

  const handleClick = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch {
        // User cancelled the native share sheet — no action needed.
      }
      return;
    }
    setOpen((v) => !v);
  };

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={handleClick}
        className="inline-flex items-center gap-2 rounded-full border border-ink-900/15 px-5 py-2.5 text-sm font-semibold text-forest-800 transition-all duration-200 hover:-translate-y-0.5 hover:border-ink-900/30"
      >
        <Share2 size={15} strokeWidth={2} />
        Share
      </button>

      {open && (
        <div className="absolute right-0 z-30 mt-2 w-56 overflow-hidden rounded-2xl border border-ink-900/10 bg-surface-card p-1.5 shadow-elevated-lg">
          <button
            type="button"
            onClick={copyLink}
            className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-left text-sm text-ink-700 transition-colors hover:bg-surface"
          >
            {copied ? <Check size={15} className="text-success" /> : <Link2 size={15} />}
            {copied ? 'Link copied' : 'Copy link'}
          </button>
          {LINKS(url, title).map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-left text-sm text-ink-700 transition-colors hover:bg-surface"
            >
              <SocialIcon label={link.label} className="h-4 w-4" />
              Share on {link.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
