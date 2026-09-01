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

  const closeModal = useCallback(() => {
    setState(initialState);
  }, []);

  const minimise = useCallback(() => {
    setState((s) => ({ ...s, isOpen: false, isMinimised: true }));
  }, []);

  const restore = useCallback(() => {
    setState((s) => ({ ...s, isOpen: true, isMinimised: false }));
  }, []);

  const value = useMemo(
    () => ({ ...state, setState, openModal, closeModal, minimise, restore }),
    [state, openModal, closeModal, minimise, restore],
  );

  return <UploadContext.Provider value={value}>{children}</UploadContext.Provider>;
}
