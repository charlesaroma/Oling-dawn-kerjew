import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../api/axios';

// Stable reference so `data: items = EMPTY` at call sites doesn't hand back a
// fresh array (and trigger unnecessary recomputation) on every render before
// the query resolves.
const EMPTY = [];

export function useMedia(tag) {
  return useQuery({
    queryKey: ['media', tag || 'all'],
    queryFn: async () => {
      const { data } = await api.get('/api/media', { params: tag ? { tag } : {} });
      return data;
    },
    initialData: EMPTY,
  });
}

export function useUpdateMedia() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...patch }) => {
      const { data } = await api.patch(`/api/media/${id}`, patch);
      return data;
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['media'] }),
  });
}

export function useDeleteMedia() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const { data } = await api.delete(`/api/media/${id}`);
      return data;
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['media'] }),
  });
}
