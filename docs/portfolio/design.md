# Design and content decisions (G1)

## Tokens

One light theme with dark-blue feature sections. The owner-selected palette (2026-10-01) is defined in `src/index.css`.

| Color | Hex | Use | Contrast |
|---|---|---|---|
| Dark grey | `#3b3634` | Body text and headings (`--ink`, `--quiet`), footer background | 11.9:1 on white |
| Dark blue | `#013e5b` | Links, eyebrows, primary button, hero/contact/table-header backgrounds (`--blue`) | 11.4:1 on white |
| Blue | `#2794f1` | **Non-text accents only**: card top rules, finding bars, dots, focus ring | 3.2:1 on white, fails AA as text |
| Light blue | `#a3e6ff` | Delivery band, status labels, accent text and buttons on dark blue | 8.3:1 against dark blue |
| Light grey | `#b6c0c1` | Borders and rules; secondary text on dark blue | 6.1:1 against dark blue |

Derived tints: `#eef9ff` (light-blue tint for figure and card backgrounds) and `#f2f4f4` (limitations panel).

Type: Inter/system sans for UI and body (18px base); Georgia italic for kickers; monospace for eyebrows (600 weight). Every size below 28px was raised by 2–4px, so the smallest text is now 12px (previously 8px). Focus ring: 3px `#2794f1`, or `#a3e6ff` on dark sections.

## Layout and responsiveness

- Single breakpoint at 768px; shell width `min(1160px, 100% − 80px)` desktop, `100% − 40px` mobile.
- Homepage order: hero → six selected projects → enterprise delivery → career and education → three articles → contact with inline FAQ.
- Case study: header with status label and scope note, two figures, sticky section nav (static on mobile), results table that reflows without horizontal scroll at 360px.
- Reduced motion respected; no decorative animation beyond Radix dialog transitions.

## Routes (HashRouter)

| Route | Page |
|---|---|
| `/` (`?section=work\|career\|education\|writing\|contact`) | Home; section param scrolls and focuses the target |
| `/projects/:slug` | Case study; unknown slug → not found |
| `/writing` | Writing & podcast archive, embeds load on demand |
| `*` | Not found with route back to selected work |

Legacy anchors `#portfolio`, `#experience`, `#education`, `#podcasts` map to the new sections. Asset URLs go through `src/lib/urls.ts` so the `/abhishek-shah-portfolio/` base path is handled in one place.

## Case-study outline

Every project record supplies: summary, operational problem, implemented contribution, architecture, evidence-linked decisions, protocol/baseline, scoped results table, tradeoffs, limitations (≥3), production requirements, and inspection links at a pinned commit. Enforced by `scripts/check-content.ts`.

## Résumé status

Received from the owner on 2026-10-01 and published locally. The site title follows the résumé: **AI Solution Architect and Technical Program Manager, SSOE Group, September 2025–present**.
