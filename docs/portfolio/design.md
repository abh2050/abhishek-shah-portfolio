# Design and content decisions (G1)

## Tokens

Warm editorial theme (2026-10-01, replaces the navy/sky palette). Defined in `src/index.css`.

| Color | Hex | Use |
|---|---|---|
| Ink | `#14202b` | Headings, body text, primary button, results-table header |
| Quiet | `#4a5560` | Secondary text (≈6.9:1 on paper) |
| Deep teal | `#1f5e60` | Links, eyebrows, role titles (`--blue`, ≈6.6:1 on paper) |
| Copper | `#b0704e` | **Non-text accents only**: status dot, focus ring, delivery numerals |
| Paper / Surface / Sand | `#f6f3ee` / `#ffffff` / `#ece6dc` | Page, cards and bands, icon tiles |
| Line | `#d9d2c6` | Borders and rules |
| Night | `#111c25` | Contact and footer; text `#f6f3ee`, secondary `#a9b4bc`, accent `#e2b08f` |

Type: Newsreader (display serif, Google Fonts) for headings and figures; Inter for UI and body.

Project icons are illustrative 3D renders generated with Recraft V4.1 via the Higgsfield API (`npm run icons:generate`), published by `npm run icons:prepare` with prompts, request IDs and output hashes in `generated-icons.json`. They are not project artifacts; case-study figures remain the evidence.

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
