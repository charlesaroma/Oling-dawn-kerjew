import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from './api';

const EMPTY = [];

export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data } = await api.get('/api/projects');
      return data;
    },
    initialData: EMPTY,
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await api.post('/api/projects', payload);
      return data;
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['projects'] }),
  });
}

export function useUpdateProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...patch }) => {
      const { data } = await api.patch(`/api/projects/${id}`, patch);
      return data;
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['projects'] }),
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const { data } = await api.delete(`/api/projects/${id}`);
      return data;
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['projects'] }),
  });
}
