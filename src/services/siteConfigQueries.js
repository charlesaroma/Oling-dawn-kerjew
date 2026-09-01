import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from './api';

// Fully-shaped so Navbar/Footer/ContactInfo — which render on every route and
// destructure/.map()/.split() these fields directly — never see `undefined`
// during the brief window before the query resolves.
const EMPTY_SITE_CONFIG = {
  orgName: '',
  shortName: '',
  tagline: '',
  description: '',
  emails: [],
  phones: [],
  registeredAddress: '',
  postalAddress: '',
  registeredYear: '',
  navLinks: [],
  socialLinks: [],
};

export function useSiteConfig() {
  return useQuery({
    queryKey: ['siteConfig'],
    queryFn: async () => {
      const { data } = await api.get('/api/site-config');
      return data;
    },
    initialData: EMPTY_SITE_CONFIG,
  });
}

export function useUpdateSiteConfig() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (patch) => {
      const { data } = await api.put('/api/site-config', patch);
      return data;
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['siteConfig'] }),
  });
}
