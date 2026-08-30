# Oling Dawn Kerjew — Design System Guide

This extends `color-palette.md` with the *why* and *where*: typography,
which color plays which role, and how to handle a bright base background
with optional section backgrounds — without it turning into visual noise.

## The concept

Your logo already tells a story: a **dawn/night split** (moon and stars vs.
sun and hills), water, earth, and globe — the four quadrants. The name
"Oling Dawn" reinforces it. Rather than a generic NGO template (cream bg +
serif headline + orange accent, which is what most AI-generated charity
sites default to), the system below leans into that **dawn → day → earth →
night** arc as you scroll: pages open bright and warm, settle into calm
green "growth" sections, and ground out in navy at the footer, echoing the
logo's night sky.

---

## Typography

Avoid the generic "Inter for everything" approach — pair a face with real
character for headlines against a quiet, highly-legible workhorse for body
copy.

| Role | Typeface | Why |
|---|---|---|
| **Display** (H1, hero headline, pull quotes) | **Fraunces** (variable, use italic + weight 500–600) | A warm, slightly hand-finished serif — soft edges instead of a corporate slab. Reads as sincere and human, not institutional-cold. Use it big, and use it sparingly. |
| **Body** (paragraphs, nav, buttons, forms) | **Public Sans** | Built for government/civic use (US Web Design System) — exceptionally legible, neutral, trustworthy. Fits a transparency-and-accountability NGO tone without being boring. |
| **Utility** (stats, dates, labels, impact counters — "12,400 meals delivered") | **IBM Plex Mono** | Numbers in mono read as *measured/reported* rather than marketed. Great for donation counters, dates, and eyebrow labels. |

Both Fraunces and Public Sans are free on Google Fonts / Fontsource.

```bash
npm install @fontsource-variable/fraunces @fontsource/public-sans @fontsource/ibm-plex-mono
```

```js
// main.jsx
import '@fontsource-variable/fraunces';
import '@fontsource/public-sans/400.css';
import '@fontsource/public-sans/600.css';
import '@fontsource/ibm-plex-mono/500.css';
```

```css
@theme {
  --font-display: 'Fraunces Variable', ui-serif, Georgia, serif;
  --font-body: 'Public Sans', ui-sans-serif, system-ui, sans-serif;
  --font-mono: 'IBM Plex Mono', ui-monospace, monospace;
}
```

```jsx
<h1 className={clsx('font-display', 'italic', 'text-5xl', 'font-semibold', 'text-forest-800')}>
  Bringing dawn to every doorstep
</h1>
<p className={clsx('font-body', 'text-navy-900/80')}>
  Since 2015, we've worked alongside communities to build lasting change.
</p>
<span className={clsx('font-mono', 'text-sm', 'text-bronze-700', 'uppercase', 'tracking-wide')}>
  Impact Report — 2026
</span>
```

**Type scale** (Tailwind v4 defaults work fine — just apply consistently):
`text-sm` (labels/mono) → `text-base` (body) → `text-xl`/`2xl` (subheads) →
`text-4xl`–`6xl` (hero, display font only). Don't use the display face below
`text-xl` — it loses its personality at small sizes and hurts legibility.

---

## Color roles — where each one actually goes

The mistake most sites make is treating primary/secondary/accent as
interchangeable "brand colors." They're not — they're a **hierarchy**:

| Role | Color | Amount of use | Where |
|---|---|---|---|
| **Background (canvas)** | Bright warm ivory `gold-50` (`#fdfbf3`, brightened to `#fffcf2` if you want it punchier) | ~70% of every page | Default `<body>` background, card fills |
| **Secondary** | Forest green `forest-700`/`forest-800` | ~15–20% | Headings, nav bar, body-text-on-light, primary brand voice — this is your *most-seen* color after the background |
| **Primary** | Gold `gold-500` | ~5–8%, always intentional | Buttons, links, active states, focus rings, the hero accent underline, icons. Primary = "click me" / "look here," never a background fill for large areas |
| **Accent** | Bronze `bronze-500`/`600` | <5% | Badges, dividers, hover alternates, small decorative elements, quote marks — texture, not structure |
| **Contrast/dark** | Navy `navy-800`/`900` | Footer + 1 dark CTA band only | Footer, a single "donate" band, dark-mode surface |

**Rule of thumb:** if you're reaching for gold to fill more than a button
or a thin accent line, use forest or the bright background instead. Gold
as a *large* fill (full section background) fights the "bright, airy"
feel you want and fails text-contrast — save full-strength gold for small,
high-purpose elements.

---

## Bright background, with optional section variety

Your instinct to keep the base bright is right for a hope-forward NGO —
but an entire site on one flat color goes flat *visually*. Use **tonal
banding**: keep every section bright/light, but shift the tint section to
section so scrolling has rhythm, without ever introducing a jarring
contrast jump.

```
┌─────────────────────────────┐
│  HERO — gold-50 → gold-100   │  "dawn" — brightest point on the page
│  gradient, gold-500 accents  │
├─────────────────────────────┤
│  Content — bg-white/cream    │  neutral reading section
├─────────────────────────────┤
│  Impact stats — forest-50    │  "growth" — pale green tint
├─────────────────────────────┤
│  Content — bg-white/cream    │
├─────────────────────────────┤
│  Donate CTA — gold-500 block │  ONE bold saturated band — earns the
│  navy-900 text               │  full-strength color because it's the
│                               │  single most important action on the page
├─────────────────────────────┤
│  Footer — navy-900            │  "night" — closes the dawn→night arc
└─────────────────────────────┘
```

Add these semantic surface tokens alongside your color scales so section
backgrounds are named by *purpose*, not by raw color:

```css
@theme {
  --color-surface: #fffcf2;       /* default bright canvas */
  --color-surface-alt: var(--color-forest-50);  /* alternating section tint */
  --color-surface-cta: var(--color-gold-500);   /* one bold donate/CTA band */
  --color-surface-dark: var(--color-navy-900);  /* footer, dark band */
}
```

```jsx
<body className="bg-surface">
  <section className="bg-surface">…</section>
  <section className="bg-surface-alt">…</section>
  <section className={clsx('bg-surface-cta', 'text-navy-900')}>
    <h2 className={clsx('font-display', 'italic')}>Help bring the next dawn.</h2>
    <button className={clsx('bg-navy-900', 'text-gold-400')}>Donate now</button>
  </section>
  <footer className={clsx('bg-surface-dark', 'text-gold-300')}>…</footer>
</body>
```

**Guardrails:**
- Never stack two saturated bands back to back (e.g. gold CTA directly
  above/below another strong color) — always separate bold bands with a
  neutral or tinted-light section.
- Only **one** full-saturation gold band per page. If everything is
  emphasized, nothing is.
- Body copy always sits on `surface`, `surface-alt`, or `white` — never
  directly on `gold-500` or `navy-900` without checking contrast (use
  `navy-900` text on gold, `gold-300`/`white` text on navy).

---

## Quick reference — putting it together

```jsx
// Nav
<nav className={clsx('bg-surface', 'border-b', 'border-gold-200')}>
  <span className={clsx('font-display', 'italic', 'text-forest-800')}>Oling Dawn Kerjew</span>
  <a className={clsx('font-body', 'text-forest-700', 'hover:text-gold-600')}>Our Work</a>
</nav>

// Hero
<section className={clsx('bg-gradient-to-b', 'from-gold-100', 'to-surface')}>
  <h1 className={clsx('font-display', 'italic', 'text-forest-900')}>Bringing dawn to every doorstep</h1>
  <p className={clsx('font-body', 'text-navy-800/80')}>…</p>
  <button className={clsx('bg-gold-500', 'hover:bg-gold-600', 'text-navy-900', 'font-body', 'font-semibold')}>
    Get Involved
  </button>
</section>

// Stat band
<section className="bg-surface-alt">
  <span className={clsx('font-mono', 'text-bronze-700')}>12,400</span>
  <p className={clsx('font-body', 'text-forest-800')}>meals delivered this year</p>
</section>
```