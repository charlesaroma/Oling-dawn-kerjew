import Skeleton from '../common/Skeleton';

// Mirrors ProjectCard's layout so the grid doesn't jump when real cards land.
export default function ProjectCardSkeleton() {
  return (
    <div aria-hidden="true" className="flex flex-col overflow-hidden rounded-2xl border border-ink-900/8 bg-surface-card">
      <Skeleton className="aspect-4/3 rounded-none" />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-3">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
        <Skeleton className="mt-5 h-6 w-4/5" />
        <Skeleton className="mt-4 h-3.5 w-full" />
        <Skeleton className="mt-2 h-3.5 w-2/3" />
        <div className="mt-5 flex items-center justify-between border-t border-ink-900/8 pt-4">
          <Skeleton className="h-3 w-28" />
          <Skeleton className="h-3 w-10" />
        </div>
      </div>
    </div>
  );
}
