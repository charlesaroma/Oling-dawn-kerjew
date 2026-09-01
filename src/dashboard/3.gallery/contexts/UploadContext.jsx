import { useCallback, useMemo, useState } from 'react';
import { UploadContext } from './useUpload';

const initialState = {
  isOpen: false,
  isMinimised: false,
  files: [],
  progress: {},
  errors: [],
  uploading: false,
};

export function UploadProvider({ children }) {
  const [state, setState] = useState(initialState);

  const openModal = useCallback(() => {
    setState((s) => ({ ...s, isOpen: true, isMinimised: false }));
  }, []);

  // Full reset — files/progress/errors included. Used when the user is
  // genuinely done (cancelling before upload, or dismissing after
  // everything succeeded), not just hiding the modal mid-upload.
  const closeModal = useCallback(() => {
    setState(initialState);
  }, []);

  const minimise = useCallback(() => {
    setState((s) => ({ ...s, isOpen: false, isMinimised: true }));
  }, []);

  const restore = useCallback(() => {
    setState((s) => ({ ...s, isOpen: true, isMinimised: false }));
  }, []);

  // Live upload state now lives here (not in UploadModal's own local
  // state) so the minimised tray can read the same files/progress/errors
  // the modal is updating — otherwise the tray has nothing to show.
  const setFiles = useCallback((updater) => {
    setState((s) => ({ ...s, files: typeof updater === 'function' ? updater(s.files) : updater }));
  }, []);

  const setProgress = useCallback((updater) => {
    setState((s) => ({ ...s, progress: typeof updater === 'function' ? updater(s.progress) : updater }));
  }, []);

  const setErrors = useCallback((updater) => {
    setState((s) => ({ ...s, errors: typeof updater === 'function' ? updater(s.errors) : updater }));
  }, []);

  const setUploading = useCallback((value) => {
    setState((s) => ({ ...s, uploading: value }));
  }, []);

  const value = useMemo(
    () => ({
      ...state,
      setState,
      openModal,
      closeModal,
      minimise,
      restore,
      setFiles,
      setProgress,
      setErrors,
      setUploading,
    }),
    [state, openModal, closeModal, minimise, restore, setFiles, setProgress, setErrors, setUploading],
  );

  return <UploadContext.Provider value={value}>{children}</UploadContext.Provider>;
}
