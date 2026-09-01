import { Link } from 'react-router-dom';
import MediaImage from '../../components/media/MediaImage';

/* Full-screen split for the staff portal — rendered outside SiteLayout (see
   App.jsx), so it carries its own brand mark and has no public nav/footer. */
export default function AuthSplitShell({ kicker, title, blurb, children }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-[1.05fr_1fr]">
      {/* Photography panel — the same editorial treatment as the public hero */}
      <div className="relative hidden overflow-hidden bg-ink-900 lg:block">
        <MediaImage
          src="https://ik.imagekit.io/u8h0uidte/Oling-Dawn-Kerjew-/NGO_secondary_school_20250811_120553.jpg?updatedAt=1788261122344"
          alt=""
          width={960}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/55 to-ink-900/25" />

        <div className="absolute inset-x-0 bottom-0 p-12 xl:p-16">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-bronze-400">{kicker}</p>
          <h2 className="mt-6 max-w-[14ch] font-display text-[clamp(2rem,3.4vw,3rem)] leading-[1.02] tracking-[-0.02em] text-surface text-balance">
            {title}
          </h2>
          <p className="mt-5 max-w-[42ch] text-[15px] leading-relaxed text-surface/60">{blurb}</p>
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-1.5"
          style={{
            background:
              'repeating-linear-gradient(90deg, var(--color-gold-500) 0 28px, var(--color-bronze-600) 28px 56px, var(--color-forest-700) 56px 84px)',
          }}
        />
      </div>

      {/* Form panel */}
      <div className="flex flex-col justify-center bg-surface px-6 py-16 sm:px-12 lg:px-16 xl:px-24">
        <div className="mx-auto w-full max-w-[26rem]">
          <Link to="/" className="mb-14 flex items-center gap-3" aria-label="Oling Dawn Kerjew Projects home">
            <img src="/apple-touch-icon.png" alt="" className="h-11 w-11 shrink-0 rounded-full ring-1 ring-ink-900/8" />
            <span className="flex flex-col font-display text-lg leading-[1.05]">
              <span className="text-forest-900">Oling Dawn Kerjew</span>
              <span className="italic text-gold-600">Projects</span>
            </span>
          </Link>
          {children}
        </div>
      </div>
    </div>
  );
}
