# ARC Lab website redesign documentation

Start with [Current website baseline](current-site-baseline.html). Open the HTML file directly in a browser; its screenshots, styles, and font are local.

The baseline records the live GitHub Pages site on **12 November 2026**, matched to commit `87792aae11e2b4e47346428cd59f047925462634` (`Add research detail pages and refine website layout`). The redesign branch is `codex/website-redesign`.

- [Sitemap](baseline/sitemap.md): all 16 page routes and research-to-news cross-links.
- [Screenshot folder](baseline/screenshots/): 32 full-page captures (every page at desktop and mobile widths) and seven additional menu, gallery, and viewport captures.
- [Source inventory](baseline/data/source-inventory.json): page text, headings, dates, links, asset dimensions, CSS tokens, and file hashes.
- [Deployed-source comparison](baseline/data/live-source-comparison.json): all 18 HTML/CSS/JavaScript files match after CRLF-to-LF normalization.
- [Capture metadata](baseline/data/captures.json) and [screenshot manifest](baseline/data/screenshots.json): URLs, viewport sizes, dimensions, timestamps, and hashes.
- [Computed styles](baseline/data/computed-styles.json), [interaction checks](baseline/data/interactions.json), and [breakpoint observations](baseline/data/breakpoints.json).
- [Documentation QA](baseline/data/documentation-qa.json): light and dark views at 360, 736, and 1600 px, gallery controls, print media, and filesystem reference checks.

The current theme is navy `#0c2947`, blue `#1f5f91`, gold `#d5a64b`, and white, with DM Sans, Libre Franklin, and Lora. The report includes the complete palette and distinguishes declared tokens from colors used directly in CSS. The documentation shell uses its own shared [theme tokens](_shared/css/tokens.css).

## Agreed scope and sequence

Keep essentially the same website content while exploring a more pleasant and attractive design. Begin with this baseline, then brainstorm using any supplied photos, references, and sketches. Iterate quickly through wireframes, renderings, and small prototypes. Implement after the direction is settled. Present the branch through the user's personal Vercel account for lab review, then merge accepted work into main.

The visual direction is still open. This stage creates documentation only; Vercel has not been configured or deployed. The existing site HTML, stylesheet, script, and image assets remain unchanged.

## Verification scope

All 16 pages were captured from the live site at 1600 × 1000 and 390 × 844 CSS-pixel browser viewports. A scrollbar can reduce the saved content-image width by 15 px. Additional home-page views cover 1440 × 1000 and 768 × 1024 viewports. These are responsive browser captures, not physical-device tests.

Source checks found no unresolved local file or fragment references. Browser captures recorded loaded fonts, no broken or pending images, and no horizontal document overflow. Mobile menu opening, Escape closing, Team navigation, and all three gallery dot selections passed. External publication/profile URLs, performance, and screen-reader behavior were not individually audited.

The report was rendered through a temporary documentation-only localhost server. All six width/theme combinations fit without horizontal document overflow. Expand/collapse controls passed. The filesystem check resolved 157 local references and decoded and hash-verified all 39 screenshots. Direct `file://` browser preview is blocked by the automation browser's URL policy; filesystem references were checked from disk.

Keep this dated baseline intact as later design work proceeds. The documentation styles are isolated under `html-docs/`; the site's `styles.css` and `script.js` are not used by this report.
