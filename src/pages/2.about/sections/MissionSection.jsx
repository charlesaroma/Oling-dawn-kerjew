import Container from '../../../components/common/Container';
import MediaImage from '../../../components/media/MediaImage';
import { DATA } from '../../../services/jsonDataLoader';

export default function MissionSection() {
  const { description, registeredYear, registeredAddress } = DATA.siteConfig;

  return (
    <section className="bg-surface py-20 sm:py-28">
      <Container className="grid gap-14 lg:grid-cols-[1fr_0.95fr] lg:items-center lg:gap-20">
        <div>
          <span className="flex items-center gap-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-bronze-600">
            <span className="h-px w-7 bg-bronze-600/40" />
            Our mission
          </span>

          <h2 className="mt-5 max-w-[16ch] font-display text-[clamp(1.9rem,3.6vw,2.9rem)] leading-[1.04] tracking-[-0.02em] text-forest-900 text-balance">
            Sustainable support for Uganda&apos;s most <em className="italic text-bronze-700">vulnerable communities.</em>
          </h2>

          <p className="mt-7 max-w-[52ch] leading-relaxed text-ink-600">{description}</p>

          <dl className="mt-10 grid gap-6 border-t border-ink-900/10 pt-8 sm:grid-cols-2">
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-500">Registered</dt>
              <dd className="mt-2 font-display text-2xl text-forest-900 tabular-nums">{registeredYear}</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-500">Based in</dt>
              <dd className="mt-2 text-[15px] leading-relaxed text-forest-900">{registeredAddress}</dd>
            </div>
          </dl>
        </div>

        <div className="relative">
          <div className="aspect-4/5 overflow-hidden rounded-2xl bg-forest-50">
            <MediaImage
              src="https://ik.imagekit.io/u8h0uidte/Oling-Dawn-Kerjew-/ladies_hairdressing_training_20250812_123723.jpg?updatedAt=1788261011246"
              alt="Women's vocational training run by Oling Dawn Kerjew Projects"
              width={640}
              height={800}
              className="h-full w-full object-cover"
            />
          </div>
          <div
            aria-hidden="true"
            className="absolute -bottom-3 left-8 right-8 h-1.5 rounded-full"
            style={{
              background:
                'repeating-linear-gradient(90deg, var(--color-gold-500) 0 22px, var(--color-bronze-600) 22px 44px, var(--color-forest-700) 44px 66px)',
            }}
          />
        </div>
      </Container>
    </section>
  );
}
