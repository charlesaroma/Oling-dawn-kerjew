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
};

export default function SocialIcon({ label, className = 'h-4 w-4' }) {
  const Icon = ICONS[label];
  if (!Icon) return null;
  return <Icon className={className} />;
}
