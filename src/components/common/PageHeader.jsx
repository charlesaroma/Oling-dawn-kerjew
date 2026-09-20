import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Container from './Container';
import Parallax from './Parallax';

/* Every page opens on a photo banner with the title/subtitle sitting in a
   light card that overlaps its bottom edge — separated by a shadow, not a
   dark wash over the photo. Omit `image` and the card sits directly on the
   page's light ground instead, with the usual top clearance for the navbar. */
const DEFAULT_TITLE_CLASSES =
  'max-w-[16ch] font-display text-[clamp(2.2rem,5.4vw,4rem)] font-medium leading-[0.98] tracking-[-0.02em] text-forest-900 text-balance';

export default function PageHeader({
  eyebrow,
  title,
  subtitle,
  image,
  imageAlt,
  containerClassName = '',
  titleClassName,
  backTo,
  backLabel = 'Back',
  children,
}) {
  return (
    <section className="relative overflow-hidden bg-surface">
      {image && (
        <Parallax className="h-[34vh] min-h-[200px] sm:h-[40vh] lg:h-[46vh]" strength={7}>
          <img
            src={image}
            alt={imageAlt || ''}
            aria-hidden={!imageAlt}
            loading="eager"
            width={1600}
            height={900}
            className="h-full w-full object-cover"
          />
        </Parallax>
      )}
      <Container className={`relative ${image ? '' : 'pt-32 sm:pt-40'} ${containerClassName}`}>
        <div
          className={`relative rounded-[28px] pb-16 pt-10 sm:pb-20 sm:pt-12 ${
            image ? '-mt-14 bg-surface-card px-8 shadow-elevated-lg sm:-mt-20 sm:px-12' : ''
          }`}
        >
          {backTo && (
            <Link
              to={backTo}
              className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 transition-colors hover:text-forest-900"
            >
              <ArrowLeft size={15} strokeWidth={2} />
              {backLabel}
            </Link>
          )}
          {eyebrow && (
            <p className="mb-5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-bronze-600">
              {eyebrow}
            </p>
          )}
          <h1 className={titleClassName || DEFAULT_TITLE_CLASSES}>
            {title}
          </h1>
          {subtitle && (
            <p className="mt-6 max-w-[52ch] text-base leading-relaxed text-ink-600">{subtitle}</p>
          )}
          {children}
        </div>
      </Container>
    </section>
  );
}
