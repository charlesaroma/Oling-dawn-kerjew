// Base placeholder block. Size and shape come from className; the pulse is
// dropped for visitors who ask for reduced motion.
export default function Skeleton({ className = '' }) {
  return <div aria-hidden="true" className={`animate-pulse rounded-md bg-ink-900/8 motion-reduce:animate-none ${className}`} />;
}
