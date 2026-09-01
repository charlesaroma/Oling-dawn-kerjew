import { useState } from 'react';
import Container from '../../components/common/Container';
import PageHeader from '../../components/common/PageHeader';
import GalleryTile from '../../components/cards/GalleryTile';
import Lightbox from './sections/Lightbox';
import { useMedia } from '../../services/mediaQueries';
import { useSEO } from '../../hooks/useSEO';

export default function Gallery() {
  useSEO({
    title: 'Gallery',
    description: 'Photos and videos from across Oling Dawn Kerjew Projects sites in Uganda.',
  });

  const [active, setActive] = useState(null);
  const { data: items } = useMedia();

  return (
    <>
      <PageHeader
        eyebrow="From the field"
        title="What the work looks like."
        subtitle="Photographs and video from across our project sites in Northern Uganda."
      />
      <section className="py-16">
        <Container>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {items.map((item) => (
              <GalleryTile key={item.id} item={item} onClick={() => setActive(item)} />
            ))}
          </div>
        </Container>
      </section>
      <Lightbox item={active} onClose={() => setActive(null)} />
    </>
  );
}
