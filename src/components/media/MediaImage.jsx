import { Image } from '@imagekit/react';

const IMAGEKIT_URL_ENDPOINT = import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT;

/*
  Thin wrapper around ImageKit's <Image>. src can be a relative ImageKit
  path ("/projects/foo/cover.jpg") or a full URL pasted from ImageKit's
  dashboard — both are supported by the SDK. Keeping all pages talking to
  this component (instead of @imagekit/react directly) means swapping media
  hosts later only touches this one file.

  Until a real VITE_IMAGEKIT_URL_ENDPOINT is set, relative src paths can't
  resolve to anything — fall back to a placeholder photo (seeded by src, so
  each item gets a consistent image) so pages look populated in the
  meantime. This branch disappears on its own once the env var is set.
*/
export default function MediaImage({ src, alt, className = '', width, height, ...props }) {
  if (!IMAGEKIT_URL_ENDPOINT) {
    const seed = (src ?? 'odkhc').replace(/[^a-zA-Z0-9]+/g, '-');
    return (
      <img
        src={`https://picsum.photos/seed/${seed}/${width || 800}/${height || 600}`}
        alt={alt}
        className={className}
        loading="lazy"
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading="lazy"
      {...props}
    />
  );
}
