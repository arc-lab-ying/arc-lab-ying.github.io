# Public Vercel comparison preview

[Open all four ARC Lab concepts](https://arc-lab-concepts-preview.vercel.app/). The floating comparison controls remain visible on the hosted version. Buttons and left/right keys cycle concepts while preserving the current page, including when focus is inside the iframe.

Personal owner: `timsonyeung-8349`. Workspace: **Timson Yeung's projects** (`timson-yeungs-projects`), verified **Hobby**. New project: `arc-lab-concepts-preview`. Published November 13, 2026 with Vercel CLI 65.15.0. No Git repository was connected or pushed.

Direct comparison links:

- [Minimal / Motion](https://arc-lab-concepts-preview.vercel.app/?variant=minimal)
- [ParentSquare-inspired](https://arc-lab-concepts-preview.vercel.app/?variant=parentsquare)
- [GrowthBook-inspired](https://arc-lab-concepts-preview.vercel.app/?variant=growthbook)
- [Boostlab-inspired](https://arc-lab-concepts-preview.vercel.app/?variant=boostlab)
- [Compare Team pages](https://arc-lab-concepts-preview.vercel.app/?variant=boostlab&page=people.html)
- [Compare Research pages](https://arc-lab-concepts-preview.vercel.app/?variant=boostlab&page=research.html)

The hosted root is a deployment-only copy of `prototype-concepts.html`. The original GitHub Pages `index.html` and all concept content remain unchanged. The wrapper's former hostname gate was removed; its route allowlist and styles are retained. The static configuration keeps literal .html paths (`cleanUrls:false`), with no SPA fallback.

The clean release has 95 files,6,062,048 bytes: all 64 concept pages, required CSS/JS/images/font, the A 2 module and vendored Three.js chain, two redistribution notices, wrapper/root copy and Vercel configuration. Git metadata, credentials, project identity files and QA artifacts are excluded by the explicit packaging allowlist. The [release manifest](release-manifest.json) records file hashes. Bundles and `.vercel` state stay outside Git.

Rebuild into a new directory with Python's standard library:

```powershell
python tools/package-vercel-preview.py --output C:\path\outside-repo\arc-lab-concepts-preview
npx --yes vercel@65.15.0 deploy --prod --yes --scope timson-yeungs-projects --project arc-lab-concepts-preview --cwd C:\path\outside-repo\arc-lab-concepts-preview
```

The CLI verified personal identity/scope before creating this new project. Its stable production alias is publicly accessible:96 independent requests without cookies, Authorization headers or bypass tokens returned HTTP 200 with no redirects. All 64 HTML pages and 26 required assets match source bytes; titles, asset types, A 2 imports and four query deep links passed. The hosted wrapper's 64 variant/page states and page-preserving cycles passed independent source evaluation. The [public verification](public-verification.md) records that separate check. Generated deployment URLs retain Vercel's default authentication; share the stable alias above. No project/account security setting needed changing.

Browser review on the hosted alias confirmed all four variants, native Team navigation, page preservation by buttons and an arrow key from iframe focus, nested research/news deep links,27 Publications entries, A 2 canvas/autoplay/pause/play, and the latest grid's visible graded response. At 390px, content has no horizontal overflow and the comparison bar fits with 16px labels and 44px arrows. Temporary viewport settings were reset; no console errors were observed. Actual hosted screenshots and [compact QA results](qa.json) are alongside this note.

This is a public design preview. The original site and main branch remain unchanged. No merge, GitHub push, custom domain, paid upgrade or account-wide change was made. Earlier typography notes retain the separate 200% zoom verification limitation; deployment review did not repeat that check.

Official references: [Vercel CLI deployment](https://vercel.com/docs/cli/deploy), [project configuration](https://vercel.com/docs/project-configuration/vercel-json), [deployment protection](https://vercel.com/docs/deployment-protection).
