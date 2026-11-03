# DESIGN.md — ET Hair Studio concept proposal site

Built for Tiyan Digital lead outreach. Concept proposal (demo) for a real business:
**ET Hair Studio**, 462 2 St, Fernie BC V0B 1M0 — full-service hair salon, no website today.

## Psychology brief (5 lines)
1. **Visitor:** a woman in or near Fernie, BC looking for a salon — phone in hand, comparing options.
2. **Pain:** she can't see the work, the prices, or how to book — today the salon exists only as directory listings (Facebook page + Yelp).
3. **One action:** request an appointment. Thumb-reachable, repeated verb everywhere: **"Book a chair"**.
4. **Trust gap:** zero online presence → answered with craft imagery (circular mirror motif), honest sample labeling on everything unverified, the real 4.8★/41 Birdeye citation, and a human-confirmation promise (form + phone).
5. **Emotion:** mountain-calm warmth, small-town trust, premium calm.

## Mood (3 words)
**alpine calm · honest craft · warm**

## Signature idea (§18 — one per site, on home)
A large **circular photo frame** motif (echoing the round mirror in the hero image) paired with the **"Find your service" 3-step interactive picker**: occasion → upkeep level → a real recommendation computed over the sample menu, deep-linking to the booking page with the service preselected.

## Tokens

| Token | Value | Role |
|---|---|---|
| `--canvas` | `#F7F4EC` | Page background (first CSS rule — no white flash) |
| `--surface` | `#FFFDF8` | Raised surface |
| `--surface-2` | `#EFE7D4` | Stepped surface |
| `--ink` | `#222E28` | Deep spruce — text, dark CTA band |
| `--muted` | `rgba(34,46,40,.62)` | Secondary text |
| `--line` | `rgba(34,46,40,.15)` | Hairlines |
| `--accent` | `#7A4A16` | Deep copper — THE one voltage color (all CTAs). White-on-accent contrast ≈ 7.5:1 (≥ 4.5 required) |
| `--accent-deep` | `#5F380F` | CTA hover/pressed |
| `--radius` | `14px` | Brand radius ceiling |

Depth = hairlines + surface steps. One rationed shadow tier (`--shadow-one`), used only on the picker result card.

## Typography
- **Display:** Fraunces 560–600, Google Fonts `display=swap`, fallback Georgia. H1 `clamp(2.625rem, 6.5vw, 5.25rem)`, `line-height .95`, `letter-spacing -.035em`, hand-broken masked lines. Mobile H1 42–48px floor.
- **Body:** Libre Franklin 400–700, 17px (16px on phone) / 1.65, measure ≤ 65ch.
- **Labels:** Space Mono 12px (11px phone), uppercase, +0.22em tracking, muted.
- Max 2 families + mono. Headings carry ≥2× space above than below.

## Per-page layout
| Page | Layout | One live thing |
|---|---|---|
| `index.html` | Editorial split hero (left column / right circular media) → quiet marquee → verified-facts band → numbered service list → finder → stylist teaser → bento gallery preview → designed CTA scene | "Find your service" picker |
| `services.html` | Page hero → honest note → accordion (Cut / Colour / Style / Treatments) | Accordion (`details`/`summary`, works no-JS) |
| `stylists.html` | Page hero → MJ card (circular photo, verified line) → missing-bios note | — (static, honest) |
| `gallery.html` | Page hero → contact-sheet grid with concept labels → honesty note | Keyboard-dismissable lightbox |
| `reviews.html` | Rating hero (4.8/5, Birdeye citation) → 3 labeled sample cards → "first web review" CTA | — (static, honest) |
| `booking.html` | Schedulicity placeholder hero → divider → demo request form → call card | Demo form (validation + consent gate) |
| `fernie.html` | Page hero with circular chip → directions + phone cards | — (static) |
| `contact.html` | Phone / address / sample-hours / book cards → demo message form | Demo form (validation + consent gate) |
| `privacy.html`, `terms.html` | Plain-language legal, narrow measure | — |

## Components
- **Nav:** sticky, blur backdrop, 5 warm links + "Book a chair" CTA; keyboard-friendly mobile menu (Esc closes, focus returns).
- **Buttons:** 52px min-height, radius 14px, `:active` scale .97, visible focus rings.
- **Sample tag:** mono pill `[sample]` on every unverified price/service/review/hour.
- **Honest-note block:** surface-2 panel naming what's placeholder and why.
- **Demo strip:** top banner on every page — "Concept demo · built by Tiyan Digital · illustrative photos".
- **Forms:** real `<label>`s, per-field inline errors, consent checkbox gates submit, "demo — sends nothing" notice, success state is honest ("nothing was sent").
- **Footer:** minimal, designed — brand, legal links, disclosure line. Not a link column.

## Motion numbers (§18)
- Entrance order: nav → eyebrow → H1 → sub → CTA → media; 0.1–0.2s steps, `opacity 0→1 + translateY(26px)`, 0.8s `cubic-bezier(0.16,1,0.3,1)`, done by ~1.5s. H1 uses masked line rise.
- Marquees: linear only (36s loop).
- Reveals: trigger on scroll, play to completion (never scrubbed).
- `prefers-reduced-motion`: all animation/transition killed; content visible.
- All hidden states gated behind `.js` — full content visible with JS disabled.

## REAL vs SAMPLE honesty record
**Real (verified, citable):** business name; address 462 2 St, Fernie BC V0B 1M0; phone +1 250-423-4813; full-service hair salon; 4.8★ across 41 reviews (Birdeye listing, Nov 2026); reviewer-named stylist "MJ"; no website today (Facebook + Yelp only).
**Sample (visibly badged):** all services and prices; all review quotes (`[Sample review]`); stylist bio text; hours table ("Sample hours — confirm by phone"); Schedulicity button ("[Sample link — salon's real booking URL goes here]"); both photos ("illustrative photos", AI-generated for the concept).
**Never invented:** no Facebook/Yelp URLs, no Schedulicity ID, no other stylist names, no founding dates, no awards, no Fernie distances/drive times.

## Known Gaps
- Sample services/prices await the salon's real menu.
- Photos are illustrative; a real shoot (before/afters, team portraits) is the first content job.
- Schedulicity link is a placeholder — needs the salon's real scheduling URL.
- Hours are unconfirmed — "confirm by phone" note in place.
- Both forms are demos (send nothing); the live site needs a real booking/notification pipeline.
- No headless screenshot tooling on this VM — visual QA was structural (see QA notes below), not pixel-verified.
