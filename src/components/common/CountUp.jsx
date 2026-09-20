import { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'framer-motion';

/*
  Counts a stat up from zero the first time it scrolls into view, then leaves
  it alone. Once per visit, never on a loop — the number is the point, the
  motion just makes you look at it.

  Values on this site aren't plain integers: "2.03M", "150,600", "340,000+",
  "10%", "UGX 8.4m". So the string is split into a prefix, a numeric core and
  a suffix; only the core animates, and it's re-formatted on every frame with
  the grouping and decimal places the original used. A value with no number
  in it at all ("Reusable") renders verbatim.

  Pair it with `tabular-nums` on the parent, which every stat here already
  has — without it the digits change width as they tick and the whole line
  jitters.
*/

/* Non-greedy prefix so "UGX 8.4m" splits as "UGX " / 8.4 / "m" rather than
   swallowing the space into the number. */
const SHAPE = /^(\D*?)([\d,]+(?:\.\d+)?)(.*)$/s;

function parse(value) {
  const match = SHAPE.exec(String(value ?? '').trim());
  if (!match) return null;
  const [, prefix, core, suffix] = match;
  const target = Number(core.replace(/,/g, ''));
  if (!Number.isFinite(target)) return null;
  return {
    prefix,
    suffix,
    target,
    decimals: core.includes('.') ? core.split('.')[1].length : 0,
    grouped: core.includes(','),
  };
}

function format(n, { decimals, grouped }) {
  return n.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: grouped,
  });
}

/* Read synchronously at mount rather than from an effect: effects run after
   paint, so a visitor who asked for no motion would still catch one frame of
   "0" before it snapped to the real figure. */
const prefersReducedMotion = () =>
  typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

export default function CountUp({ value, duration = 1.6 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  const shape = parse(value);
  const hasNumber = shape !== null;
  const target = shape?.target ?? 0;

  const [shown, setShown] = useState(() => (prefersReducedMotion() ? target : 0));
  /* Where the next run starts from. The counts on the homepage are backed by
     a fetch, so the target jumps from 0 to its real figure once the request
     lands — that should carry on from whatever is on screen, not restart. */
  const from = useRef(0);

  useEffect(() => {
    if (!hasNumber) return undefined;

    if (prefersReducedMotion()) {
      from.current = target;
      setShown(target);
      return undefined;
    }

    /* Hold at the current value until the stat is actually on screen.
       Snapping to the target here instead would leave nothing left to count:
       every one of these blocks sits below the fold, so by the time it
       scrolled into view `from` would already equal `target` and the
       animation would be skipped entirely. */
    if (!inView) return undefined;

    if (from.current === target) {
      setShown(target);
      return undefined;
    }

    // Same expo-out curve as the hero and nav entrances: quick off the mark,
    // long settle, so the final figure is what you're left looking at.
    const controls = animate(from.current, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (n) => {
        from.current = n;
        setShown(n);
      },
      onComplete: () => {
        from.current = target;
        setShown(target);
      },
    });
    return () => controls.stop();
  }, [inView, target, duration, hasNumber]);

  if (!hasNumber) return <span ref={ref}>{value}</span>;

  /* The ticking digits are hidden from assistive tech, which would otherwise
     announce every intermediate frame; the real figure sits alongside them. */
  return (
    <span ref={ref}>
      <span aria-hidden="true">
        {shape.prefix}
        {format(shown, shape)}
        {shape.suffix}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
