/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { DATA, STORAGE_KEYS, loadJSON, saveJSON } from '../services/jsonDataLoader';

const AdminContext = createContext(null);

export function AdminProvider({ children }) {
  const [state, setState] = useState(() => loadJSON(STORAGE_KEYS.admin, { profiles: DATA.profiles, activity: [] }));

  useEffect(() => {
    saveJSON(STORAGE_KEYS.admin, state);
  }, [state]);

  const logActivity = useCallback((message) => {
    setState((s) => ({
      ...s,
      activity: [{ id: `act-${Date.now()}`, message, at: new Date().toISOString() }, ...(s.activity || [])].slice(0, 30),
    }));
  }, []);

  const addProfile = useCallback(
    (profile) => {
      const id = profile.id || `pro-${Date.now()}`;
      const next = { ...profile, id, registeredDate: profile.registeredDate || new Date().toISOString().slice(0, 10) };
      setState((s) => ({ ...s, profiles: [next, ...s.profiles] }));
      logActivity(`Profile registered — "${next.fullName}"`);
      return next;
    },
    [logActivity],
  );

  const updateProfile = useCallback(
    (id, patch) => {
      setState((s) => ({
        ...s,
        profiles: s.profiles.map((p) => (p.id === id ? { ...p, ...patch } : p)),
      }));
      logActivity(`Profile updated — ${patch.fullName || id}`);
    },
    [logActivity],
  );

  const deleteProfile = useCallback(
    (id) => {
      setState((s) => ({ ...s, profiles: s.profiles.filter((p) => p.id !== id) }));
      logActivity(`Profile deleted — ${id}`);
    },
    [logActivity],
  );

  const value = useMemo(
    () => ({
      profiles: state.profiles || [],
      activity: state.activity || [],
      addProfile,
      updateProfile,
      deleteProfile,
    }),
    [state, addProfile, updateProfile, deleteProfile],
  );

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdmin() {
  return useContext(AdminContext);
}
