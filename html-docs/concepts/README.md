# Landing-page concept comparison

All four concepts are separate from the current website. Existing detail pages and the previous Minimal / Motion concept are unchanged. This is a local design review, with no deployment or merge to main.

Open `http://127.0.0.1:8771/prototype-concepts.html?variant=parentsquare` while the repository preview server is running. The local review bar and left/right arrow keys switch concepts. The selection is stored in the URL. The review bar is hidden outside localhost.

| Concept | Design question | Direct page |
| --- | --- | --- |
| 01 · Minimal / Motion | Does oversized typography and a stationary animated A2 express the lab well? | `prototype-minimal.html` |
| 02 · ParentSquare-inspired | Does a familiar institutional layout with photography suit a more traditional audience? | `prototype-parentsquare.html` |
| 03 · GrowthBook-inspired | Does a centered introduction and a clear visual research overview strike the right balance? | `prototype-growthbook.html` |
| 04 · Boostlab-inspired | Can four permanently visible research links make a playful hover grid useful as navigation? | `prototype-boostlab.html` |

The two restrained alternatives use static content with no JavaScript animation. The expressive alternative puts the original ARC identity in the center, with a short manifesto below so it does not compete with the four research destinations. All new concepts retain both ARC and Technion branding and use existing lab content.

References reviewed visually: [ParentSquare](https://www.awwwards.com/sites/parentsquare) and its [live site](https://www.parentsquare.com/); [GrowthBook](https://www.awwwards.com/sites/growthbook) and its [live site](https://www.growthbook.io/); [Boostlab](https://www.awwwards.com/sites/boostlab) and its [live site](https://boostlab.btgpactual.com/en). These are layout inspirations, not copied third-party branding or content.

Reusable original ARC vector geometry is in `assets/prototypes/shared/`. See that directory's README for the full logo, wordmark, and SVG symbol usage.

Browser checks on 2026-11-12 covered desktop, tablet, and phone layouts, navigation, grid hover/focus, and the comparison controls. See `qa.json` and the screenshots in each concept directory. These are landing-page explorations; linked detail pages retain the existing website design.
