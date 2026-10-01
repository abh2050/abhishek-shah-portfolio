# Release readiness

- Branch: `feat/evidence-backed-portfolio` (baseline `5a0b3da`), not committed, pushed, or merged.
- Checked: 2026-10-01, Node 24.21.0.
- Overall: **ready for owner review**. All automated gates pass. The items under "Owner decisions" still need your sign-off before merging.

## Gates

| Gate | Status | Evidence |
|---|---|---|
| G0 Research | passed | `audit.md`, `project-research.md`, `claims.md` (18 claims), `assets.json` (15 assets, rights recorded), `research-lock.json` (six pinned commits) |
| G1 Design/content | passed | `design.md`; résumé received and published |
| G2 Implementation | passed | typecheck, lint (0 errors; 7 fast-refresh warnings in vendored shadcn/ui files), build, `check:content` (`verification/content-assets.json`) |
| G3 Behavior | passed | Playwright 17/17 against the production build (`verification/playwright.json`); 51/51 when repeated 3×; axe WCAG 2.1 AA with 0 violations at 390 and 1440 px |
| G4 Visual/performance | passed | `visual-review.md`, `verification/manual-review.json`, Lighthouse home 98/100/100/100 and case study 99/100/100/100 |
| G5 Review readiness | passed | `README.md`, `DEPLOYMENT.md` (deploy and rollback), `check:release` passed (`verification/release.json`) |
| External links | partial | 45 passed. 15 Medium articles returned 403 to the automated checker (bot blocking); check these by hand. `verification/external-links.json` |

## Résumé

`public/resume/Abhishek-Shah-Resume.pdf` is the owner-supplied `Profile.pdf` received 2026-10-01: 6 pages, SHA-256 `66289de7…d719672f`. It lists SSOE Group as the current employer. The site's facts were aligned to it:

- SSOE title: **AI Solution Architect and Technical Program Manager**. This replaces the "AI Program Lead / Technical Program Manager" wording confirmed during planning.
- BMW of North America: AI Product Lead / Data Scientist, Oct 2024 – Sep 2025.
- Intel: Project Engineer, Data Scientist & AI Program Manager, Nov 2019 – Oct 2024.
- Location: Beaverton, Oregon.

## Owner decisions before merge

1. **SSOE title.** Confirm the résumé wording above should replace the title agreed during planning. "Solution" is singular in the job title, while the résumé summary says "solutions architect".
2. **Phone number.** The résumé PDF includes a phone number and will be publicly downloadable. Remove it from the PDF if you don't want it public.
3. **Résumé nits.** "github.com/abh2050" appears twice in the contact column.
4. **Employment outcomes.** The résumé's quantified outcomes (200+ executives, 80% adoption, ~900 apps, $70K/month) are not repeated on the site, because there is no public evidence to link. Decide whether to surface any of them as owner-attested.
5. Hand-check the 15 Medium links.
