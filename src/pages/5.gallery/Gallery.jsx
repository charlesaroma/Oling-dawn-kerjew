import { useState } from 'react';
import Container from '../../components/common/Container';
import PageHeader from '../../components/common/PageHeader';
import GalleryTile from '../../components/cards/GalleryTile';
import Lightbox from './sections/Lightbox';
import { useAdmin } from '../../context/AdminContext';

export default function Gallery() {
  const [active, setActive] = useState(null);
  const { galleryItems: items } = useAdmin();

  return (
    <>
      <PageHeader title="Gallery" subtitle="Photos and videos from across our project sites in Uganda." />
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
