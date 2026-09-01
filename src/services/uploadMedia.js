import { upload } from '@imagekit/react';
import api from '../api/axios';

const FOLDER = '/oling-dawn-kerjew-projects/media';

/*
  Shared ImageKit upload flow: fetch a signed auth payload, upload straight
  from the browser via ImageKit's SDK, then persist the resulting file as a
  Media row so it also shows up in the dashboard's Media Library. Used by
  the Gallery's UploadModal and by any content form's image field
  (ImageUploadField/MediaListField) — same mechanics, different tag.
*/
export async function uploadFile(file, { tag, onProgress } = {}) {
  const { data: auth } = await api.get('/api/media/auth');

  const result = await upload({
    file,
    fileName: file.name,
    folder: FOLDER,
    useUniqueFileName: true,
    tags: tag ? [tag] : undefined,
    token: auth.token,
    expire: auth.expire,
    publicKey: auth.publicKey,
    signature: auth.signature,
    onProgress: (e) => {
      if (e.lengthComputable && onProgress) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    },
  });

  const { data: media } = await api.post('/api/media/record', {
    fileId: result.fileId,
    url: result.url,
    name: result.name,
    tag,
    size: result.size,
  });

  return media;
}
