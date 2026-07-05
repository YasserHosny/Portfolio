# Design System — Founder Engineer

Premium, technical, calm, product-focused. Optimized for senior engineering
leadership and cofounder conversations — not for a generic CV template.

## Personality

- Professional · Technical · Calm · Premium · Reliable
- Founder-minded · Product-focused · Serious but modern

## What to avoid

- Generic CV template look
- Fake skill percentage bars
- Too many animations
- Cartoon illustrations
- Overly colorful startup clichés
- "Guru", "ninja", "rockstar" wording

## Color tokens

```css
--color-bg-main:       #0B1120;   /* deep navy base                     */
--color-bg-secondary:  #111827;   /* muted section band                 */
--color-surface:       #1E293B;   /* card surface                       */
--color-surface-hover: #243449;   /* card surface hover                 */

--color-primary:       #3B82F6;   /* blue — CTAs, active nav            */
--color-primary-soft:  rgba(59, 130, 246, 0.12);
--color-secondary:     #14B8A6;   /* teal — eyebrows, mono accents      */
--color-secondary-soft:rgba(20, 184, 166, 0.12);

--color-success:       #22C55E;
--color-warning:       #F59E0B;

--color-text-main:     #F8FAFC;   /* headlines, key numbers             */
--color-text-secondary:#CBD5E1;   /* body copy                          */
--color-text-muted:    #94A3B8;   /* labels, meta                       */

--color-border:        #334155;
```

## Typography

| Role                | Font                | Weight | Notes                                    |
| ------------------- | ------------------- | ------ | ---------------------------------------- |
| Hero title          | Inter               | 800    | gradient text on hero only               |
| Section titles      | Inter               | 700    | tight tracking (-0.01em)                 |
| Body                | Inter               | 400-500| 16-18px, 1.6 line-height                 |
| Technical labels    | JetBrains Mono      | 500    | uppercase, wide tracking (0.14–0.15em)   |
| Code / dates / tags | JetBrains Mono      | 400    | subtle secondary color                   |

## Radii

`8 / 12 / 18 / 24` — cards use `18`, hero snapshot uses `24`, badges use `999`.

## Layout

- Container width: `1180px` max, `1.5rem` gutter
- Section padding: `5rem 0` (desktop) / `3rem 0` (mobile)
- Card grids: `.grid.grid--2` and `.grid.grid--3`, collapsing at 900/640px

## Motifs

- **Dashboard cards** — the founder snapshot, stat cards, capability groups
- **Traffic-light dot cluster** — nods to a running application UI
- **Delivery flow strip** — `Business Problem → MVP → Architecture → Product → Scale`
- **Ordinal mono chips** (`#01`, `#02`, …) — light structural cue on experience & capability cards

## Motion

Only micro-interactions:

- Card hover: `translateY(-4px)`, primary-tinted border, subtle shadow lift
- CTA hover: 1px lift + slightly deeper shadow
- Nothing scroll-triggered, no autoplay animations

## Accessibility

- Semantic landmarks (`header`, `main`, `footer`, `nav`, `article`, `section`)
- Focus ring uses `--color-primary` at 2px, 3px offset
- Icon-only controls carry `aria-label`
- Color contrast for body ≥ 4.5:1

## Anti-patterns to reject in code review

- Percentage-bar skill meters
- Auto-scrolling carousels
- Any component that gates content behind a "loading" spinner longer than 200ms
- More than two font families in a single view
