import { Link } from 'react-router-dom';
import MediaImage from '../../components/media/MediaImage';

/* Full-screen split panel for the login screen — rendered outside SiteLayout
   (see App.jsx), no public Navbar/Footer. */
export default function AuthSplitShell({ kicker, title, blurb, children }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <MediaImage
          src="/dashboard/auth-cover.jpg"
          alt=""
          width={960}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/95 via-navy-900/40 to-navy-900/10" />
        <div className="absolute bottom-12 left-12 right-12 text-white">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-gold-400">{kicker}</p>
          <h2 className="mb-4 font-display text-4xl italic leading-tight xl:text-5xl">{title}</h2>
          <p className="max-w-sm text-sm leading-relaxed text-white/70">{blurb}</p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center bg-surface px-6 py-16 sm:px-12 lg:px-16 xl:px-24">
        <div className="w-full max-w-sm">
          <Link to="/" className="mb-10 flex items-center justify-center gap-3 lg:justify-start" aria-label="ODKHC Home">
            <img src="/apple-touch-icon.png" alt="" className="h-12 w-12 rounded-full" />
            <span className="font-display italic text-lg font-semibold text-forest-800">ODKHC</span>
          </Link>
          {children}
        </div>
      </div>
    </div>
  );
}
