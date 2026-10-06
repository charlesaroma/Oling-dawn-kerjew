export default function ServerWakeNotice() {
  return (
    <div role="status" className="flex items-center justify-center py-16">
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-ink-900/10 border-t-gold-500 motion-reduce:animate-none" />
    </div>
  );
}
