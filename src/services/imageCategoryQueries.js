import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../api/axios';

// A stable reference so consumers destructuring `data: categories = EMPTY`
// don't get a fresh array (and a spurious "changed" signal) on every render
// while the query is still pending. It has to be `placeholderData`, not
// `initialData`: initialData is written into the cache as if it had just been
// fetched, so paired with the staleTime below it would count as fresh and the
// list would never actually load — leaving the gallery with no category chips.
const EMPTY = [];

export function useImageCategories() {
  return useQuery({
    queryKey: ['imageCategories'],
    queryFn: async () => {
      const { data } = await api.get('/api/image-categories');
      return data;
    },
    placeholderData: EMPTY,
    enabled: !!localStorage.getItem('accessToken'),
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreateImageCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await api.post('/api/image-categories', payload);
      return data;
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['imageCategories'] }),
  });
}

export function useUpdateImageCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...patch }) => {
      const { data } = await api.patch(`/api/image-categories/${id}`, patch);
      return data;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['imageCategories'] });
      queryClient.invalidateQueries({ queryKey: ['media'] });
    },
  });
}

export function useDeleteImageCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const { data } = await api.delete(`/api/image-categories/${id}`);
      return data;
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['imageCategories'] }),
  });
}

export function useReorderImageCategories() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (items) => {
      const { data } = await api.put('/api/image-categories/reorder', items);
      return data;
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['imageCategories'] }),
  });
}
