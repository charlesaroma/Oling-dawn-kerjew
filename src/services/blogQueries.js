import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../api/axios';

const EMPTY = [];

export function useBlogPosts() {
  return useQuery({
    queryKey: ['blogPosts'],
    queryFn: async () => {
      const { data } = await api.get('/api/blog');
      return data;
    },
    initialData: EMPTY,
  });
}

export function useCreateBlogPost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await api.post('/api/blog', payload);
      return data;
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['blogPosts'] }),
  });
}

export function useUpdateBlogPost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...patch }) => {
      const { data } = await api.patch(`/api/blog/${id}`, patch);
      return data;
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['blogPosts'] }),
  });
}

export function useDeleteBlogPost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const { data } = await api.delete(`/api/blog/${id}`);
      return data;
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['blogPosts'] }),
  });
}
