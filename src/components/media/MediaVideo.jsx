import { Video } from '@imagekit/react';

const IMAGEKIT_URL_ENDPOINT = import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT;
const PLACEHOLDER_VIDEO = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4';

/*
  Thin wrapper around ImageKit's <Video>, matching MediaImage's contract —
  same placeholder-until-configured fallback (a public domain MDN sample
  clip) so a video slot never renders empty before real links are added.
*/
export default function MediaVideo({ src, className = '', controls = true, ...props }) {
  if (!IMAGEKIT_URL_ENDPOINT) {
    return <video src={PLACEHOLDER_VIDEO} controls={controls} className={className} {...props} />;
  }

  return <Video src={src} controls={controls} className={className} {...props} />;
}
