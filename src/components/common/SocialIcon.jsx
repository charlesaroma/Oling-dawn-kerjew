/*
  lucide-react intentionally ships no brand/trademark icons — these are
  small, generic geometric glyphs (not the verbatim trademarked logos)
  commonly used to represent each platform in web UI.
*/
const ICONS = {
  X: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.9 2H22l-7.6 8.7L23 22h-6.9l-5.4-6.9L4.5 22H1.4l8.1-9.3L1 2h7.1l4.9 6.3L18.9 2Zm-1.2 18h1.9L7.4 4H5.4l12.3 16Z" />
    </svg>
  ),
  Instagram: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  ),
  TikTok: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M16.5 2c.4 2.2 1.9 3.9 4.5 4.1v3.1c-1.6.1-3.1-.4-4.4-1.3v6.7c0 3.6-2.9 6.4-6.4 6.4S3.8 18.2 3.8 14.6c0-3.5 2.7-6.3 6.1-6.4v3.2c-1.6.1-2.9 1.5-2.9 3.1 0 1.7 1.4 3.1 3.1 3.1s3.1-1.4 3.1-3.1V2h3.3Z" />
    </svg>
  ),
  Facebook: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 21v-7.6h2.6l.4-3h-3v-1.9c0-.9.2-1.5 1.5-1.5h1.6V4.3c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.1H8.1v3h2.6V21h2.8Z" />
    </svg>
  ),
  WhatsApp: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M17.5 14.4c-.3-.1-1.6-.8-1.8-.9-.2-.1-.4-.1-.6.1-.2.3-.7.9-.8 1-.2.2-.3.2-.5.1-.3-.1-1.2-.4-2.2-1.4-.8-.7-1.4-1.6-1.6-1.9-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.3-.4.1-.2 0-.4 0-.5C11 9.2 10.5 8 10.3 7.5c-.2-.4-.3-.4-.5-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.1 0 1.3.9 2.5 1.1 2.7.1.2 1.9 2.9 4.6 4 .6.3 1.1.4 1.5.5.6.2 1.2.2 1.6.1.5-.1 1.6-.6 1.8-1.3.2-.6.2-1.2.2-1.3-.1-.1-.2-.2-.5-.3Z" />
      <path d="M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.5A10 10 0 1 0 12 2Zm0 18.2c-1.6 0-3.1-.4-4.5-1.2l-.3-.2-3 .9.9-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Z" />
    </svg>
  ),
};

export default function SocialIcon({ label, className = 'h-4 w-4' }) {
  const Icon = ICONS[label];
  if (!Icon) return null;
  return <Icon className={className} />;
}
