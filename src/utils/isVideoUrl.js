const VIDEO_EXTENSIONS = /\.(mp4|mov|webm|avi|mkv)(\?.*)?$/i;

export function isVideoUrl(url) {
  return VIDEO_EXTENSIONS.test(url || '');
}
