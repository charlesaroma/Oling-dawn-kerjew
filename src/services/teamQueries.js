import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from './api';

const EMPTY = [];

export function useTeam() {
  return useQuery({
    queryKey: ['team'],
    queryFn: async () => {
      const { data } = await api.get('/api/team');
      return data;
    },
    initialData: EMPTY,
  });
}

export function useCreateTeamMember() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await api.post('/api/team', payload);
      return data;
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['team'] }),
  });
}

export function useUpdateTeamMember() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...patch }) => {
      const { data } = await api.patch(`/api/team/${id}`, patch);
      return data;
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['team'] }),
  });
}

export function useDeleteTeamMember() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const { data } = await api.delete(`/api/team/${id}`);
      return data;
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['team'] }),
  });
}
