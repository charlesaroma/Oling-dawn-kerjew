// The public data hooks seed `initialData: []` so every call site can map
// over `data` without guarding — which also means TanStack Query reports
// `isLoading: false` from the very first render. They pair that with
// `initialDataUpdatedAt: 0`, so a dataUpdatedAt of 0 means "nothing real
// has arrived yet". While that's true and a request is in flight (including
// retries), the page should show its skeleton rather than an empty state.
export function isAwaitingFirstData(query) {
  return query.dataUpdatedAt === 0 && query.isFetching;
}
