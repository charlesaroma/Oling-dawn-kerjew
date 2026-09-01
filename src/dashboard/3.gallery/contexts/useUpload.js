import { createContext, useContext } from 'react';

export const UploadContext = createContext(null);

export function useUpload() {
  const ctx = useContext(UploadContext);
  if (!ctx) throw new Error('useUpload must be used within an UploadProvider');
  return ctx;
}
