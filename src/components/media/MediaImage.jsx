import { Image } from '@imagekit/react';

/*
  Thin wrapper around ImageKit's <Image>. src can be a relative ImageKit
  path ("/projects/foo/cover.jpg") or a full URL pasted from ImageKit's
  dashboard — both are supported by the SDK. Keeping all pages talking to
  this component (instead of @imagekit/react directly) means swapping media
  hosts later only touches this one file.
*/
export default function MediaImage({ src, alt, className = '', width, height, ...props }) {
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
