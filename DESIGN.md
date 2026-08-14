---
name: GBD Meter
description: A rotary-dial pregnancy due-date calculator for clinical use.
colors:
  rose-primary: "#B81F5F"
  rose-primary-dark: "#E25690"
  rose-tint: "#F5B9D2"
  cream-bg: "#FBF8F4"
  cream-surface: "#F4EEE6"
  cream-border: "#EAE1D2"
  navy-bg: "#050718"
  navy-surface: "#0A0E30"
  navy-border: "#1F2E58"
  ink-light: "#050718"
  ink-dark: "#EEF1FA"
  muted-light: "#46598B"
  muted-dark: "#8E9FCB"
typography:
  display:
    fontFamily: "Barlow Condensed, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3rem)"
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: "0.02em"
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.22em"
rounded:
  sm: "8px"
  md: "16px"
  full: "9999px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
components:
  stat-value:
    textColor: "{colors.ink-light}"
    typography: "{typography.display}"
  stat-value-accent:
    textColor: "{colors.rose-primary}"
    typography: "{typography.display}"
  dial-handle:
    backgroundColor: "{colors.rose-primary}"
    rounded: "{rounded.full}"
    size: "24px"
  theme-toggle:
    backgroundColor: "{colors.cream-bg}"
    textColor: "{colors.ink-light}"
    rounded: "{rounded.full}"
    height: "40px"
    width: "40px"
---

# Design System: GBD Meter

## Overview

**Creative North Star: "The Printed Pregnancy Wheel, Digitized"**

GBD Meter reskins the Solt Portfolio reference (bold condensed display type, uppercase tracked micro-labels, a right-aligned stat sidebar rhythm) around a single clinical instrument: a rotary dial standing in for the analog LMP wheel every clinician already knows. The system is quiet everywhere except the one thing the visitor came to do — set a date — and the one thing the tool exists to answer — the EDD. Dark pink is spent narrowly, on the answer and the control; neutrals do the rest of the work.

Two modes are equally real, not a "light default, dark bolted on" afterthought: light runs on a warm off-white paper tone, dark runs on the supplied near-black-navy-to-steel-blue ramp, not an inverted grayscale.

**Key Characteristics:**
- One instrument, one answer — no navigation, no cards, no dashboard chrome.
- Condensed-bold display type for anything that is *the* number; small sans for everything that explains it.
- Dark pink is reserved for the accent role only: it never fills a background.
- Flat surfaces, border-based separation — no drop shadows except the dial handle's own lift.

## Colors

Restrained strategy: two neutral ramps (warm cream for light, the supplied navy ramp for dark) plus exactly one saturated accent that carries the same role in both modes.

### Primary
- **Raspberry Rose** (`#B81F5F` light / `#E25690` dark): the answer color. Used only for the EDD value, the dial's LMP handle, the EDD marker outline, and interactive hover/focus accents. Never a background fill.

### Neutral
- **Warm Paper** (`#FBF8F4`): light-mode page background.
- **Paper Surface** (`#F4EEE6`): light-mode input/card background.
- **Paper Border** (`#EAE1D2`): light-mode dividers and borders.
- **Near-Black Navy** (`#050718`): dark-mode page background — the darkest band of the supplied swatch.
- **Navy Surface** (`#0A0E30`): dark-mode input/card background.
- **Navy Border** (`#1F2E58`): dark-mode dividers and borders.
- **Ink** (`#050718` on light / `#EEF1FA` on dark): primary text.
- **Muted Slate** (`#46598B` on light / `#8E9FCB` on dark): all secondary/label text. Both verified ≥4.5:1 against their background — the pair this system standardizes on so no muted text token falls below AA.

### Named Rules
**The One-Voice Rule.** Dark pink appears on a fixed, named set of elements, never a scattered accent: the EDD value, the dial handle, the EDD marker, the gestation-span band, hover/focus states, the trimester-progress segments (filled = reached), and the "days to go" value specifically when the estimate has arrived or passed (an overdue/due-today signal, not decoration). If a screen needs a pink element outside this list to read correctly, the layout — not the palette — is wrong.

## Typography

**Display Font:** Barlow Condensed (with ui-sans-serif, system-ui fallback)
**Body Font:** Inter (with ui-sans-serif, system-ui fallback)

**Character:** A condensed, upright grotesk carries every number and headline at full commitment (the Solt Portfolio "bold condensed display type" trait, pinned by brief); Inter is the workhorse for an Operate-mode tool where legibility at small sizes beats personality — its ubiquity is a deliberate, justified trade here, not an unexamined default.

### Hierarchy
- **Display** (700, 1.5rem mobile → 3rem desktop, 0.95 line-height): page H1 and the dial's center LMP readout, both scaling up through `sm`/`lg` rather than holding one fixed size.
- **Stat value** (600, 1.25rem mobile → 2.25rem desktop, 1.0 line-height): each result in the stat ledger (EDD, gestational age, trimester, days-to-go).
- **Body** (400–500, 0.875rem, 1.5 line-height): the footer credit line; the general size for any future short body copy (kept under ~28rem measure).
- **Label** (600, 0.22em tracking, uppercase): every eyebrow/data-label — "LMP", "GESTATIONAL AGE", month ticks on the dial. Sized 9px→11px responsively off the page grid (stat eyebrows, dial center labels), or compensated against the dial's own scale so it reads the same physical size at any dial diameter (month tick labels — see the Legible-at-Any-Scale Rule below).

### Named Rules
**The No-Kicker Rule.** No eyebrow line sits above a page or section heading — the heading speaks for itself. Uppercase tracked labels stay reserved for data (stat eyebrows, the dial's month ticks), where they identify a value rather than dressing up a headline.

**The Legible-at-Any-Scale Rule.** The dial is one SVG whose `viewBox` scales with its container, so a flat font-size shrinks in lockstep with the dial itself — fine for geometry, illegible for text once the dial drops to its mobile size (a literal 10px label was rendering at ~5px on a small phone). The month-tick labels instead step their font-size per breakpoint (17px → 12px → 10px, in `viewBox` units) so the *rendered* size stays roughly constant (~10–13px) regardless of how small the dial gets. Any future dial-internal text follows the same pattern — never a single flat size.

## Layout

Single page, no scroll-driven sections. A centered `max-w-5xl` column holds a three-part stack: header (wordmark + theme toggle), a two-region main area, and a one-line footer credit.

Main area is `flex` row on `lg+` (dial + manual input on the left at `flex-[1.1]`, stat ledger on the right at `flex-1`), stacking to a single centered column below `lg` in reading order: dial → manual input → results. On mobile every size step (heading, dial diameter, stat rows, outer padding) shrinks together so the whole page — dial through the last stat — fits one screen on a small phone with zero scrolling; desktop sizing is untouched by this compression and both regions sit above the fold there too.

## Elevation & Depth

Flat by default. Depth is not a system here — it is spent once, on the one control the visitor's cursor actually lifts: the dial's LMP handle carries a soft rose-tinted `drop-shadow(0 2px 6px rgba(184,31,95,0.45))`, offset and blurred, never a bare colored halo. Everything else (inputs, stat rows, the theme toggle) is separated by 1–1.5px borders, not shadows.

### Named Rules
**The Single Lift Rule.** Exactly one element gets a shadow: the thing being dragged. A card, an input, or a stat row that grows a shadow has broken the rule.

## Shapes

Soft, restrained rounding: `rounded-2xl` (16px) on the manual date-input field, `rounded-full` on the theme toggle and every dial marker (handle, EDD dot). No hard corners, no neobrutalist offset borders. Dividers between stat rows are plain 1px hairlines, never colored or thickened.

## Components

### Rotary LMP Dial (signature component)
A single SVG instrument standing in for a printed pregnancy wheel: fixed month ring (12 equal 30° arcs, JAN at 12 o'clock going clockwise), a low-opacity rose gestation-span band between the LMP and EDD angles, a dashed "today" tick marking the rotation boundary, a hollow EDD marker, and the solid rose LMP handle the visitor drags. The handle tracks the pointer 1:1 while dragging and eases into position (`cubic-bezier(0.16,1,0.3,1)`, 0.4s) on every discrete change (typed date, arrow-key nudge) — the system's one authored motion moment, not scattered elsewhere; that ease (and the EDD marker's matching one) is skipped entirely under `prefers-reduced-motion`. The handle carries real `role="slider"` semantics — `aria-valuenow`/`min`/`max` in days-since-LMP (0–364), plus `aria-valuetext` with the formatted date — not just a label.

### Stat Ledger
Vertical stack of label-over-value rows (the Solt Portfolio stat-sidebar rhythm), separated by hairline dividers, no card shell. Each row is a tracked uppercase label plus a condensed value — no sub-line, no method footnotes; the label and the number are the whole story, with two exceptions carrying real information rather than decoration: the EDD row's value is always rose (it's the answer), and the "days to go" row's value turns rose only once the estimate has arrived or passed. The Trimester row adds one more element below its value: a 3-segment progress bar (see below).

### Trimester Progress
Three equal `h-1 rounded-full` segments under the Trimester stat's value. Segments up to and including the current trimester fill rose; the rest sit muted (cream/navy neutral). `aria-hidden` — the adjacent "1st"/"2nd"/"3rd" text already carries the meaning for assistive tech; the bar is a glanceable reinforcement, not a second source of truth.

### Manual Date Input
`rounded-2xl` bordered field with a calendar icon and an "LMP" label inline, native `<input type="date">` bounded to `[today − 364 days, today]` via `min`/`max` — the same reach the dial itself allows, so the two inputs can never disagree — with a JS clamp on change as a second line of defense since native min/max enforcement varies by browser. Border shifts to rose on focus-within; no separate focus ring on the native input itself.

### Theme Toggle
40px circular icon button (Sun/Moon from lucide-react), border shifts to rose on hover, explicit rose focus-visible ring with a background-matched offset in both modes.

## Do's and Don'ts

### Do:
- **Do** reserve rose for the named One-Voice Rule list (dial handle, EDD value, EDD marker, gestation band, trimester-progress fill, overdue/due-today "days to go", hover/focus states) — nowhere else.
- **Do** use the muted-slate pair (`#46598B` light / `#8E9FCB` dark) for every secondary/label text color — both are AA-verified; no other muted token exists in this system.
- **Do** keep the dial's LMP handle at 1:1 pointer tracking during drag; only ease non-drag changes, and skip the ease entirely under `prefers-reduced-motion`.
- **Do** cap prose measure (any future body copy) around 28rem so short paragraphs don't run past a comfortable line length.
- **Do** compensate any text living inside the dial's SVG against the dial's own render scale (see the Legible-at-Any-Scale Rule) instead of one flat font-size.
- **Do** keep the manual date input's `min`/`max` bounds identical to the dial's own 364-day reach; the two inputs must always agree on what's selectable.

### Don't:
- **Don't** put an eyebrow/kicker line above the H1 or any section heading — this is a hard ban in this system, not a style choice.
- **Don't** add a card shell or box-shadow to the stat ledger rows; the hairline-divider ledger is the only pattern for grouped results.
- **Don't** use rose as a background fill outside the low-opacity gestation-span band on the dial.
- **Don't** substitute a system/platform font for Barlow Condensed in the display role, even as a "temporary" fallback beyond the declared stack.
- **Don't** let a color alone carry status (overdue, trimester). Every colored state in this system has a text or shape twin — the "days to go" number itself, the "1st/2nd/3rd" label — so color is reinforcement, never the only signal.
