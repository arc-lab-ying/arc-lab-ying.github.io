# Public deployment verification

Share URL: [ARC Lab concepts](https://arc-lab-concepts-preview.vercel.app/)

Result: **PASS**. Requests were made without cookies, Authorization headers, account sessions, or protection-bypass tokens. The stable share alias is publicly accessible.

- **96/96 HTTP 200 responses:** public comparison root, identical `/prototype-concepts.html` wrapper, 64 prototype HTML routes (16 per concept), 26 required assets, and four comparison deep-link query URLs.
- Every prototype HTML/asset body matches its current repository source by SHA-256, preserving the latest typography, Team explorer, grid falloff, and A2/Three runtime. Page titles and H1s match; no generic fallback pages.
- Required CSS, JavaScript modules/scripts, WOFF2 font, supplied SVG/PNG marks, human portraits, robot image and gallery images have appropriate content types/signatures. All A2/Three imports are included.
- No localhost URLs in public HTML/CSS/JS, no page navigation escaping its concept or deployment, and no Vercel login/protection response. Observed redirects: **0**.
- The returned comparison JavaScript was evaluated independently on the actual hosted hostname in a small DOM simulation: all 64 variant/page initial states, all four concept cycles preserving the selected page, and iframe navigation updating the outer comparison state passed. The switcher is visible and its controls are wired on the public host.

This was independent read-only HTTP/source verification. Browser rendering and account/deployment configuration remain with the deployment lead. No repository, Git, browser, account, or deployment changes were made by this verifier.

Evidence: `http-report.json`, `switcher-report.json`, `manifest.json` in this directory. Public wrapper response is saved as `public-root.html` and `public-wrapper.js`.

Content types observed: {'text/html': 70, 'image/jpeg': 6, 'image/svg+xml': 2, 'image/png': 3, 'font/woff2': 1, 'application/javascript': 6, 'text/css': 8}.
