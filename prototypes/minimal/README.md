# Minimal / Motion — complete prototype set

Design question: does the approved oversized typography, pale blue pill navigation, faint dot grid and unboxed composition remain useful throughout an academic lab website?

This is an isolated, buildless 16-page prototype under `prototypes/minimal/`. Open [the homepage](http://127.0.0.1:8771/prototypes/minimal/index.html) using the existing repository preview server. The shared comparison wrapper is maintained separately by the integration agent.

The approved homepage retains both supplied logos, the short manifesto and the stationary Unitree A2 illustration. Its original robot module is reused unchanged from `../../prototype-a2.js`: one looking-around loop, playing by default, with only pause/play. The research overview has a direct page link; original news and gallery content is available further down. The gallery is static and retains its supplied example captions.

Inner pages use large blue editorial titles, thin rules, sparse indexed research rows, unboxed portraits and publication records grouped by year. All 15 inner-page main sections preserve the original text, names, dates, image descriptions and external links exactly. The source's three pending Scholar labels and 27 inactive Code labels remain inactive text. No achievements, publication details or research claims were invented.

Routes mirror the original site: homepage, team, publications, research overview, joining information, all four research directions, news archive and all six articles. Every local HTML link stays within this concept. Fonts, logos, images and the existing robot module use shared source assets by relative path. The original website and root concept files are unchanged; no deployment or merge to main has been performed.

`source-checks.json` records route, fragment, asset and content checks. Browser and responsive review is delegated to the full-site integrator.
