import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useQueryClient } from '@tanstack/react-query';

const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:5002';

// Only the events the backend actually emits (media + image categories) —
// unlike the reference project's 26-group map, most of which target domains
// that don't exist here and never fire.
const EVENT_MAP = [
  { events: ['media:created', 'media:updated', 'media:deleted', 'media:categoryRenamed'], key: ['media'] },
  { events: ['imageCategories:created', 'imageCategories:updated', 'imageCategories:deleted', 'imageCategories:reordered'], key: ['imageCategories'] },
];

export default function useSocket() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const socket = io(SOCKET_URL, {
      auth: token ? { token } : undefined,
    });

    for (const { events, key } of EVENT_MAP) {
      for (const event of events) {
        socket.on(event, () => queryClient.invalidateQueries({ queryKey: key }));
      }
    }

    return () => {
      socket.disconnect();
    };
  }, [queryClient]);
}
