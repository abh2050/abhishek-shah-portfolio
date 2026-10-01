# Design and content decisions (G1)

## Tokens

One light theme (no dark mode, per plan). Defined in `src/index.css`.

| Token | Value | Use |
|---|---|---|
| `--paper` | `#faf9f6` | Page background (warm white) |
| `--ink` | `#1c293b` | Headings and body emphasis |
| `--quiet` | `#596574` | Body copy, captions |
| `--blue` | `#1f4d8a` | Single accent: links, eyebrows, primary button |
| `--line` | `#d8dce1` | Thin borders and rules |

Type: Inter/system sans for UI and body; Georgia italic for kickers; monospace for eyebrows and metadata. Focus ring: 3px `#2563eb`, 5px offset.

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
