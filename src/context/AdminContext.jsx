/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { DATA, STORAGE_KEYS, loadJSON, saveJSON } from '../services/jsonDataLoader';

const AdminContext = createContext(null);

const SEED = {
  profiles: DATA.profiles,
  projects: DATA.projects,
  galleryItems: DATA.galleryItems,
  blogPosts: DATA.blogPosts,
  team: DATA.team,
  siteConfig: DATA.siteConfig,
};

// Bump whenever src/data/*.json seed content changes in a way that stale
// browser caches should pick up — this forces a one-time reseed instead of
// silently keeping whatever was cached before the seed data existed.
const SEED_VERSION = 3;

export function AdminProvider({ children }) {
  const [state, setState] = useState(() => {
    const cached = loadJSON(STORAGE_KEYS.admin, null);
    if (!cached || cached.seedVersion !== SEED_VERSION) {
      return { ...SEED, activity: [], seedVersion: SEED_VERSION };
    }
    return cached;
  });

  useEffect(() => {
    saveJSON(STORAGE_KEYS.admin, state);
  }, [state]);

  const logActivity = useCallback((message) => {
    setState((s) => ({
      ...s,
      activity: [{ id: `act-${Date.now()}`, message, at: new Date().toISOString() }, ...(s.activity || [])].slice(0, 30),
    }));
  }, []);

  /* ---------- generic per-domain CRUD factory ---------- */
  const makeCrud = useCallback(
    (domain, idPrefix, label, nameField) => ({
      add: (item) => {
        const id = item.id || `${idPrefix}-${Date.now()}`;
        const next = { ...item, id };
        setState((s) => ({ ...s, [domain]: [next, ...s[domain]] }));
        logActivity(`${label} added: "${next[nameField]}"`);
        return next;
      },
      update: (id, patch) => {
        setState((s) => ({ ...s, [domain]: s[domain].map((x) => (x.id === id ? { ...x, ...patch } : x)) }));
        logActivity(`${label} updated: ${patch[nameField] || id}`);
      },
      remove: (id) => {
        setState((s) => ({ ...s, [domain]: s[domain].filter((x) => x.id !== id) }));
        logActivity(`${label} deleted: ${id}`);
      },
    }),
    [logActivity],
  );

  const profileCrud = useMemo(() => makeCrud('profiles', 'pro', 'Profile', 'fullName'), [makeCrud]);
  const projectCrud = useMemo(() => makeCrud('projects', 'proj', 'Project', 'title'), [makeCrud]);
  const galleryCrud = useMemo(() => makeCrud('galleryItems', 'gal', 'Gallery item', 'caption'), [makeCrud]);
  const blogCrud = useMemo(() => makeCrud('blogPosts', 'post', 'Post', 'title'), [makeCrud]);
  const teamCrud = useMemo(() => makeCrud('team', 'team', 'Team member', 'name'), [makeCrud]);

  const updateSiteConfig = useCallback(
    (patch) => {
      setState((s) => ({ ...s, siteConfig: { ...s.siteConfig, ...patch } }));
      logActivity('Site settings updated');
    },
    [logActivity],
  );

  const resetToDefaults = useCallback(() => {
    setState({
      ...SEED,
      activity: [{ id: 'act-reset', message: 'Dashboard data reset to defaults', at: new Date().toISOString() }],
      seedVersion: SEED_VERSION,
    });
  }, []);

  const exportAllData = useCallback(() => {
    const { activity: _activity, ...data } = state;
    return data;
  }, [state]);

  const value = useMemo(
    () => ({
      profiles: state.profiles || [],
      projects: state.projects || [],
      galleryItems: state.galleryItems || [],
      blogPosts: state.blogPosts || [],
      team: state.team || [],
      siteConfig: { ...DATA.siteConfig, ...state.siteConfig },
      activity: state.activity || [],

      addProfile: profileCrud.add,
      updateProfile: profileCrud.update,
      deleteProfile: profileCrud.remove,

      addProject: projectCrud.add,
      updateProject: projectCrud.update,
      deleteProject: projectCrud.remove,

      addGalleryItem: galleryCrud.add,
      updateGalleryItem: galleryCrud.update,
      deleteGalleryItem: galleryCrud.remove,

      addBlogPost: blogCrud.add,
      updateBlogPost: blogCrud.update,
      deleteBlogPost: blogCrud.remove,

      addTeamMember: teamCrud.add,
      updateTeamMember: teamCrud.update,
      deleteTeamMember: teamCrud.remove,

      updateSiteConfig,
      resetToDefaults,
      exportAllData,
    }),
    [state, profileCrud, projectCrud, galleryCrud, blogCrud, teamCrud, updateSiteConfig, resetToDefaults, exportAllData],
  );

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdmin() {
  return useContext(AdminContext);
}
