import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

/*
  Drifts a decorative layer against the scroll, for depth. Deliberately
  limited in scope: background photography and texture only, never text or
  anything interactive, and never more than a few percent of travel, so
  foreground and background can't visibly desync.

  The child is rendered taller than the frame and pulled up by half the
  overflow, so the drift never exposes a bare edge. Honours
  prefers-reduced-motion by rendering the final, static state.
*/
export default function Parallax({ children, className = '', strength = 8 }) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`]);
  const overflow = strength * 2;

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {reduceMotion ? (
        <div className="absolute inset-0">{children}</div>
      ) : (
        <motion.div
          className="absolute inset-x-0"
          style={{
            y,
            willChange: 'transform',
            top: `-${strength}%`,
            height: `${100 + overflow}%`,
          }}
        >
          {children}
        </motion.div>
      )}
    </div>
  );
}
