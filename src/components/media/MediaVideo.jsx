import { Video } from '@imagekit/react';

/*
  Thin wrapper around ImageKit's <Video>, matching MediaImage's contract.
*/
export default function MediaVideo({ src, className = '', controls = true, ...props }) {
  return <Video src={src} controls={controls} className={className} {...props} />;
}
