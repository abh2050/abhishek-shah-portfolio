# Deployment

The site is served by GitHub Pages from `https://abh2050.github.io/abhishek-shah-portfolio/`. Vite's `base` is `/abhishek-shah-portfolio/` (override with `VITE_BASE_PATH`); asset URLs are resolved through `src/lib/urls.ts`.

## One-time setup

Repository Settings → Pages → Source: **GitHub Actions**.

## Release

1. On the feature branch: `npm run verify`. Every step in `docs/portfolio/verification/verify.json` should be `passed`.
2. Open a PR to `main`, review it, and merge.
3. `.github/workflows/deploy.yml` (Node 24) runs `npm ci`, `npm run build:prod`, then `npm run check:release`. The release check blocks the deploy if the résumé PDF, required docs, or passing verification reports are missing.
4. The workflow uploads `dist/` and deploys it. Check the Actions tab, then smoke-test the live site: home, one case study, the mobile menu, and the résumé download.

`./deploy.sh` is a legacy manual helper. The Actions workflow is the supported path.

## Rollback

Pages serves the most recent successful deployment, so roll back by redeploying a known-good commit:

- `git revert <merge-commit>` on `main` and push. The workflow redeploys the previous content.
- Or re-run the last good "Deploy to GitHub Pages" workflow run from the Actions tab.

The baseline before this rebuild is commit `5a0b3da`.

## Troubleshooting

- **Blank page or 404s for JS/CSS:** the base path doesn't match the repository name. Check `base` in `vite.config.ts`.
- **Deploy blocked by `check:release`:** read `docs/portfolio/verification/release.json` for the blocker list.
- **Deep link 404:** routes are hash-based (`/#/projects/...`). `public/404.html` redirects legacy non-hash paths.
