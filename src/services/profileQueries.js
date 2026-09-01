import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from './api';

const EMPTY = [];

export function useProfiles() {
  return useQuery({
    queryKey: ['profiles'],
    queryFn: async () => {
      const { data } = await api.get('/api/profiles');
      return data;
    },
    initialData: EMPTY,
  });
}

export function useCreateProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await api.post('/api/profiles', payload);
      return data;
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['profiles'] }),
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...patch }) => {
      const { data } = await api.patch(`/api/profiles/${id}`, patch);
      return data;
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['profiles'] }),
  });
}

export function useDeleteProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const { data } = await api.delete(`/api/profiles/${id}`);
      return data;
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['profiles'] }),
  });
}
