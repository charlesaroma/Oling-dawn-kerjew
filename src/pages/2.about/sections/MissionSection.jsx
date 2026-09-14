import Container from '../../../components/common/Container';
import MediaImage from '../../../components/media/MediaImage';
import { DATA } from '../../../services/jsonDataLoader';

export default function MissionSection() {
  const { orgName, description, registeredYear, registeredAddress } = DATA.siteConfig;

  return (
    <section className="bg-surface py-20 sm:py-28">
      <Container className="grid gap-14 lg:grid-cols-[1fr_0.95fr] lg:items-center lg:gap-20">
        <div>
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-bronze-600">
            Our mission
          </span>

          <h2 className="mt-5 max-w-[16ch] font-display text-[clamp(1.9rem,3.6vw,2.9rem)] leading-[1.04] tracking-[-0.02em] text-forest-900 text-balance">
            Sustainable support for Uganda&apos;s most{' '}
            <span className="font-semibold text-bronze-700 underline decoration-bronze-300 decoration-2 underline-offset-4">
              vulnerable communities.
            </span>
          </h2>

          <p className="mt-7 max-w-[52ch] leading-relaxed text-ink-600">{description}</p>

          <dl className="mt-10 grid gap-6 border-t border-ink-900/10 pt-8 sm:grid-cols-2">
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-500">Registered entity</dt>
              <dd className="mt-2 text-[15px] leading-relaxed text-forest-900">{orgName}</dd>
              <dd className="mt-1 font-mono text-xs text-ink-500 tabular-nums">Since {registeredYear}</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-500">Based in</dt>
              <dd className="mt-2 text-[15px] leading-relaxed text-forest-900">{registeredAddress}</dd>
            </div>
          </dl>
        </div>

        <div className="aspect-4/5 overflow-hidden rounded-2xl bg-forest-50">
          <MediaImage
            src="https://ik.imagekit.io/u8h0uidte/Oling-Dawn-Kerjew-/ladies_hairdressing_training_20250812_123723.jpg?updatedAt=1788261011246"
            alt="Women's vocational training run by Oling Dawn Kerjew Projects"
            width={640}
            height={800}
            className="h-full w-full object-cover"
          />
        </div>
      </Container>
    </section>
  );
}
