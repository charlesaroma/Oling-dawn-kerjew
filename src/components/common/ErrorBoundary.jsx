import { Component } from 'react';
import { Link } from 'react-router-dom';

/*
  One boundary around the route outlet, so a single component that throws
  costs the visitor that page rather than the whole site: without it React 19
  unmounts the entire tree and leaves a blank white document with nothing to
  click.

  Must be a class — there is still no hook equivalent of
  componentDidCatch/getDerivedStateFromError.

  It carries no reset logic of its own: the caller keys it on the pathname,
  so navigating away from a page that failed remounts the boundary with fresh
  state. Without that the fallback would follow the visitor around the site
  for the rest of the session.
*/
export default class ErrorBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error, info) {
    // No error-reporting service wired up yet; the console is what a
    // developer reproducing this actually has to work with.
    console.error('Route render failed:', error, info?.componentStack);
  }

  render() {
    if (!this.state.failed) return this.props.children;

    return (
      <div className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden bg-surface px-6 py-32 text-center">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[min(60vw,520px)] w-[min(60vw,520px)] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70"
          style={{ background: 'radial-gradient(circle, rgba(223,161,38,0.14) 0%, transparent 66%)' }}
        />
        <p className="relative font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-bronze-600">
          Something went wrong
        </p>
        <h1 className="relative mt-6 max-w-[18ch] font-display text-[clamp(2rem,4.6vw,3.4rem)] leading-[1.02] tracking-[-0.02em] text-forest-900 text-balance">
          This page didn&apos;t load properly.
        </h1>
        <p className="relative mt-5 max-w-[42ch] leading-relaxed text-ink-600">
          The rest of the site is still working. Try reloading, or head back and take another route in.
        </p>
        <div className="relative mt-9 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-7 py-3.5 text-sm font-semibold text-ink-900 transition-all duration-200 hover:-translate-y-0.5 hover:bg-gold-400"
          >
            Reload the page
          </button>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-ink-900/15 px-7 py-3.5 text-sm font-semibold text-forest-900 transition-all duration-200 hover:-translate-y-0.5 hover:border-ink-900/30 hover:bg-ink-900/5"
          >
            Back to home
          </Link>
        </div>
      </div>
    );
  }
}
