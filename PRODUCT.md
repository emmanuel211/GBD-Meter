# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Vite + React + TypeScript + Tailwind CSS + lucide-react (user-specified).

## Users

Clinical/professional users — midwives, doctors, and clinic staff calculating pregnancy dates for patients. The tool must hold up to clinical scrutiny: precise terminology and correct math, not a casual toy.

## Product Purpose

GBD Meter is a single-page pregnancy due date calculator. It takes a patient's LMP (Last Menstrual Period) and computes the EDD (Estimated Due Date) using Naegele's rule, plus current gestational age. Success is a fast, accurate, unambiguous reading a clinician can trust and act on.

## Positioning

Most online due-date calculators are plain forms with a text output. GBD Meter's differentiator is the rotary dial input — a digital analog to the physical pregnancy wheel clinicians already know (rotate to the LMP date, read the EDD off the same wheel) — paired with a manual date-input fallback for speed/precision.

## Operating Context

Single-session, single-screen use: a clinician opens the app, sets one LMP date (via dial or typed input), and reads the result immediately. No accounts, no saved history, no multi-patient state — each visit is a fresh, independent calculation.

## Capabilities and Constraints

- Input: LMP via draggable rotary dial (SVG, mouse + touch) OR a manual date field; both stay in sync.
- Output: EDD (Estimated Due Date) via Naegele's rule (LMP + 280 days), current gestational age (weeks + days), and trimester.
- Naegele's rule assumes a standard 28-day cycle — this assumption should be visible in the UI (small note), not hidden, since clinical users need to know the method's limitation (e.g. that ultrasound dating can override LMP-based dating).
- No backend, no persistence, no auth — pure client-side date math.

## Brand Commitments

- Project name: "GBD Meter".
- Visual direction is explicitly specified by the user (binding, not open for reinterpretation): "Solt Portfolio" style from the project's design library (bold condensed display type, arched/rounded photo-style framing applied to the dial, uppercase tracked micro-labels, right-aligned stat sidebar rhythm) reskinned with a dark-pink brand accent.
- Dark mode must use the specific navy palette the user supplied (near-black navy through to steel blue), not a generic inverted palette.
- Both light and dark mode are required, user-toggleable.

## Evidence on Hand

- Reference screenshot for visual direction: `../design library/1f1e3467484661808a192f1ebba309b2.jpg` ("Solt Portfolio" — Sage Personal Portfolio entry in `../design library/DESIGN.md`).
- Reference image for dark-mode palette: navy gradient swatch supplied directly in the user's prompt (near-black navy → steel blue, five bands).
- Reference image for the rotary dial interaction concept: Facemama.com circular pregnancy wheel (FUR/LMP wheel with month ring and rotating pointer), supplied in the user's prompt.
- No real patient data, logos, or testimonials — none should be fabricated.

## Product Principles

1. Clinical trustworthiness over cuteness — precise terminology (EDD, LMP, gestational age), correct date math, visible methodology caveat.
2. One screen, one decision — no navigation, no dead ends, result is always visible without scrolling past the fold on desktop.
3. The dial is the star but never the only way in — manual input must be equally fast for a keyboard-first clinician.
4. Brand direction (Solt Portfolio + dark pink + supplied navy dark palette) is a binding constraint, not a suggestion — do not drift toward a generic medical-app look.

## Accessibility & Inclusion

Must remain usable via keyboard/manual date input alone (the dial is an enhancement, not a requirement) since dragging an SVG dial is not accessible to all users or input devices.
