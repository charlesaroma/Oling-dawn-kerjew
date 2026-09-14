# Oling Dawn Kerjew — Design System Guide

This documents the system as implemented in `src/index.css` ("Editorial Earth"):
typography, which color plays which role, how section backgrounds vary without
turning into noise, and the pictorial-header pattern used across the site.

## The concept

The logo tells a dawn/night story: a moon-and-stars vs. sun-and-hills split,
water, earth, and globe. "Oling Dawn" reinforces it. Rather than a generic
NGO template (cream bg + serif headline + orange accent), the system leans
into a **dawn → day → earth → night** arc as you scroll: pages open bright
and warm, settle into calm content sections, and ground out in a deep ink
band at hero/footer, echoing the logo's night sky.

---

## Typography

| Role | Typeface | Why |
|---|---|---|
| **Display** (H1, hero headline, section titles) | **Fraunces** (upright weights 500/600 only — no italic axis is imported) | A warm, slightly hand-finished serif — soft edges instead of a corporate slab. Emphasis within display text is carried by weight/underline, never a slanted cut. |
| **Body** (paragraphs, nav, buttons, forms) | **Public Sans** | A civic-grade humanist sans built for legibility — trustworthy without being boring. |
| **Utility** (stats, dates, labels, eyebrows) | **IBM Plex Mono** | Numbers read as *measured/reported* rather than marketed. Used for donation counters, dates, and eyebrow labels. |

Loaded via a single Google Fonts `@import` at the top of `src/index.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Public+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');
```

```css
@theme {
  --font-display: "Fraunces", ui-serif, Georgia, serif;
  --font-body:    "Public Sans", ui-sans-serif, system-ui, sans-serif;
  --font-mono:    "IBM Plex Mono", ui-monospace, "SFMono-Regular", monospace;
}
```

**No italics, anywhere.** Only upright weights are requested from Google
Fonts, so there's no italic cut to fall back to. Where a phrase needs
emphasis, use weight + an underline rendered as a short, deliberately-colored
bottom rule — never `italic` or `<em>`:

```jsx
<span className="font-semibold text-gold-400 underline decoration-gold-500/50 decoration-2 underline-offset-4">
  next dawn.
</span>
```

Pick the decoration color for contrast against whatever it sits on (e.g. a
dark decoration on a gold background, not gold-on-gold). Short 1–2 word
wordmark labels (like the "{division}" suffix under the org name in
Navbar/Footer) skip the underline entirely — `font-semibold tracking-wide`
only — since underlining something that short reads as a broken link.

**Type scale**: `text-sm` (labels/mono) → `text-base` (body) → `text-xl`/`2xl`
(subheads) → `text-4xl`–`6xl` (hero, display font only). Don't use the display
face below `text-xl` — it loses its personality at small sizes.

---

## Color roles — where each one actually goes

| Role | Color | Amount of use | Where |
|---|---|---|---|
| **Background (canvas)** | Crisp near-white `--color-surface` (`#FDFCF9`) | ~70% of every page | Default `<body>` background, most section fills. Barely warm — color is carried by photography and accents, not a heavy tint |
| **Secondary surface** | Light warm-grey tint `--color-surface-alt` (`#F5F1E8`) | Alternating sections | Used for tonal rhythm between `surface` bands (stat strips, listing pages) |
| **Card surface** | `--color-surface-card` (`#FFFFFF`) | Raised cards/panels only | Brighter than the canvas it sits on, so a card still reads as lifted even though the base canvas is now near-white too |
| **Forest** (green) | `forest-700`/`800`/`900` | ~15–20% | Headings, nav bar, body-text-on-light — the most-seen color after the background |
| **Gold** (ochre) | `gold-500` | ~5–8%, always intentional | Buttons, links, active states, focus rings — the one CTA band. Never a large background fill. |
| **Bronze** (clay) | `bronze-500`/`600`/`700` | <5% | Eyebrows, badges, emphasis-underline accents — texture, not structure |
| **Ink** (dark) | `ink-900` | Hero + footer + PageHeader ground, one CTA-adjacent context | The "night" end of the dawn→night arc |

**Rule of thumb:** if you're reaching for gold to fill more than a button or a
thin accent, use forest or a surface token instead. Gold as a *large* fill
fights the "bright, airy" feel and fails text-contrast — save full-strength
gold for small, high-purpose elements and the one CTA band.

---

## Bright near-white background, color carried by photography and accents

The canvas itself stays crisp and barely-tinted — color comes from real
photography (never stock), the gold accent, and section-level blocks (the
CTA band, PageHeader photos, the Pillars tiles), not from a heavy color wash
across every section. A sand/cream canvas was tried and dropped — at enough
chroma to read as intentional it also read as dated/sepia, which fought the
"bright" brief more than a flat white would have.

```
┌──────────────────────────────┐
│  HERO — ink-900 + full-bleed  │  "night" ground, real field photography
│  photo carousel, gold accents │
├──────────────────────────────┤
│  Content — surface            │  crisp near-white, neutral reading section
├──────────────────────────────┤
│  Content — surface-alt        │  light warm-grey tint, tonal rhythm
├──────────────────────────────┤
│  Donate CTA — gold-500 block  │  ONE bold saturated band, low-opacity
│  + low-opacity photo texture  │  photo texture behind it — never a second
│                                │  competing full-strength image
├──────────────────────────────┤
│  Footer — ink-900              │  "night" — closes the dawn→night arc
└──────────────────────────────┘
```

```css
@theme {
  --color-surface:      #FDFCF9;  /* crisp, barely-warm near-white canvas */
  --color-surface-alt:  #F5F1E8;  /* light warm-grey tint, alternating sections */
  --color-surface-card: #FFFFFF;  /* raised card fill — brighter than the canvas */
  --color-surface-cta:  var(--color-gold-500);  /* the one bold donate/CTA band */
  --color-surface-dark: var(--color-ink-900);   /* hero + footer ground */
}
```

**Guardrails (unchanged from the original brief):**
- Never stack two saturated bands back to back — always separate bold bands
  with a neutral or tinted-light section.
- Only **one** full-saturation gold band per page. If everything is
  emphasized, nothing is.
- Body copy always sits on `surface`, `surface-alt`, or `surface-card` — never
  directly on `gold-500` or `ink-900` without checking contrast.
- Prefer a real photo over a flat color fill wherever the content allows one —
  reuse an existing verified image (ImageKit-hosted field photo or a file in
  `public/construction/`) rather than inventing or sourcing stock imagery.

---

## The pictorial-header pattern

`src/components/common/PageHeader.jsx` is the canonical "how to make a
section pictorial" component — it's reused by every inner page (About,
Projects, Construction, Gallery, Blog, Contact) and by `ProjectDetail`/
`BlogPost` (which pass a dynamic `title`/`image` per item). Pass an optional
`image`/`imageAlt` to turn the dark band into a full-bleed photo header; the
existing radial gold glow and bottom gradient stripe layer on top as accents.
Omitting `image` renders the plain dark band, unchanged.

```jsx
<PageHeader
  eyebrow="Get in touch"
  title="Start a conversation."
  subtitle="…"
  image="https://ik.imagekit.io/u8h0uidte/Oling-Dawn-Kerjew-/…jpg?tr=w-1600,q-72"
  imageAlt="Distributing agricultural tools to farming households in Oyam District"
/>
```

The same photo + dark gradient-wash math (full-bleed `object-cover` image,
`bg-gradient-to-t from-ink-900 via-ink-900/75 to-ink-900/30` overlay) is
applied inline wherever a section isn't a page-opener but still benefits from
a photographic background — e.g. the "pillar" tiles on the About page, or a
low-opacity texture layer behind the gold CTA band.

---

## Quick reference — putting it together

```jsx
// Nav
<nav className="bg-surface/85 backdrop-blur-xl border-b border-ink-900/8">
  <span className="font-display text-forest-900">Oling Dawn Kerjew</span>
  <span className="font-semibold tracking-wide text-gold-500">Projects</span>
</nav>

// Hero
<section className="relative overflow-hidden bg-ink-900">
  {/* full-bleed real photo carousel, gradient wash, content on top */}
  <h1 className="font-display text-surface">
    Bringing dawn to every doorstep,{' '}
    <span className="font-semibold text-gold-400 underline decoration-gold-500/50 decoration-2 underline-offset-4">
      one house at a time.
    </span>
  </h1>
</section>

// Stat band
<section className="bg-surface-alt">
  <span className="font-mono text-bronze-700">12,400</span>
  <p className="font-body text-forest-800">meals delivered this year</p>
</section>
```
