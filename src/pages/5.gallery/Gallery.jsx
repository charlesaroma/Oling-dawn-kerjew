import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Container from '../../components/common/Container';
import PageHeader from '../../components/common/PageHeader';
import GalleryTile from '../../components/cards/GalleryTile';
import Lightbox from '../../components/media/Lightbox';
import EmptyState from '../../components/common/EmptyState';
import { useMedia } from '../../services/mediaQueries';
import { useSEO } from '../../hooks/useSEO';

const PAGE_SIZE = 24;

export default function Gallery() {
  useSEO({
    title: 'Gallery',
    description: 'Photos and videos from across Oling Dawn Kerjew Projects sites in Uganda.',
  });

  const [activeIndex, setActiveIndex] = useState(null);
  const [page, setPage] = useState(1);
  const { data: items } = useMedia();

  // The lightbox always gets the full set so arrow-key/filmstrip navigation
  // moves through every photo, independent of which grid page is showing.
  const lightboxItems = items.map((item) => ({ src: item.url, alt: item.alt }));

  const pageCount = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const pageStart = (page - 1) * PAGE_SIZE;
  const pageItems = items.slice(pageStart, pageStart + PAGE_SIZE);

  const goToPage = (next) => {
    setPage(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <PageHeader
        eyebrow="From the field"
        title="What the work looks like."
        subtitle="Photographs and video from across our project sites in Northern Uganda."
        image="https://ik.imagekit.io/u8h0uidte/Oling-Dawn-Kerjew-/NGO_secondary_school_20250811_120553.jpg?tr=w-1600,q-72"
        imageAlt="Students at a secondary school supported by the organisation"
      />
      <section className="bg-surface-alt py-20 sm:py-28">
        <Container>
          {items.length === 0 ? (
            <EmptyState
              title="Photographs are on their way"
              message="Images from our project sites are being uploaded and captioned."
            />
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {pageItems.map((item, i) => (
                  <GalleryTile key={item.id} item={item} onClick={() => setActiveIndex(pageStart + i)} />
                ))}
              </div>

              {pageCount > 1 && (
                <div className="mt-14 flex items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => goToPage(page - 1)}
                    disabled={page === 1}
                    aria-label="Previous page"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-900/15 text-forest-900 transition-all duration-200 hover:-translate-y-0.5 hover:border-ink-900/30 hover:bg-ink-900/5 disabled:pointer-events-none disabled:opacity-30"
                  >
                    <ChevronLeft size={17} />
                  </button>
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-500 tabular-nums">
                    Page {page} of {pageCount}
                  </span>
                  <button
                    type="button"
                    onClick={() => goToPage(page + 1)}
                    disabled={page === pageCount}
                    aria-label="Next page"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-900/15 text-forest-900 transition-all duration-200 hover:-translate-y-0.5 hover:border-ink-900/30 hover:bg-ink-900/5 disabled:pointer-events-none disabled:opacity-30"
                  >
                    <ChevronRight size={17} />
                  </button>
                </div>
              )}
            </>
          )}
        </Container>
      </section>
      <Lightbox items={lightboxItems} index={activeIndex} onClose={() => setActiveIndex(null)} onChangeIndex={setActiveIndex} />
    </>
  );
}
