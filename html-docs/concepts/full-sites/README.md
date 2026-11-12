# Complete website concept comparison

Open the [Boostlab team-page comparison](http://127.0.0.1:8771/prototype-concepts.html?variant=boostlab&page=people.html). It starts with the user's selected Boostlab direction and makes the new inner-page styling immediately reviewable. Use the floating arrows or unmodified Left/Right keys to compare the same page in all four concepts, including while focus is inside a concept. Navigate through the site's own links to review the remaining pages. The bar is restricted to localhost and is absent from the direct concept pages.

The URL uses `variant=minimal|parentsquare|growthbook|boostlab` and an optional `page=` containing one of the 16 routes below. The page parameter is a strict allowlist; unrecognized values fall back to the homepage. Homepage links omit `page`. Concept switching preserves the equivalent current route.

| Concept | Main design idea | Team screenshot |
| --- | --- | --- |
| [Minimal / Motion](http://127.0.0.1:8771/prototype-concepts.html?variant=minimal) | Oversized blue type, dotted field and a stationary animated Unitree A2 | [Desktop](minimal/people-desktop.jpg) · [Phone](minimal/people-phone.jpg) |
| [ParentSquare-inspired](http://127.0.0.1:8771/prototype-concepts.html?variant=parentsquare) | Calm institutional hierarchy, split text/photo hero and static content | [Desktop](parentsquare/people-desktop.jpg) · [Phone](parentsquare/people-phone.jpg) |
| [GrowthBook-inspired](http://127.0.0.1:8771/prototype-concepts.html?variant=growthbook) | Centered introduction and clear research overview | [Desktop](growthbook/people-desktop.jpg) · [Phone](growthbook/people-phone.jpg) |
| [Boostlab-inspired](http://127.0.0.1:8771/prototype-concepts.html?variant=boostlab) | Blue interactive grid and large editorial layouts | [Desktop](boostlab/people-desktop.jpg) · [Phone](boostlab/people-phone.jpg) |

Each folder under `prototypes/{concept}/` contains the same complete 16-route structure:

```text
index.html
people.html
publications.html
research.html
join-us.html
research/interaction-centered-bim.html
research/agent-oriented-design-construction.html
research/representation-learning.html
research/robot-centric-construction.html
news/index.html
news/arc-lab-website-launch.html
news/welcome-new-researchers.html
news/ai-built-environment-paper.html
news/construction-robotics-digital-twins.html
news/ic-bim-research-direction.html
news/robot-centric-construction-seminar.html
```

All four sets retain original prose, names, dates, supplied photographs and marks, external destinations and 27 publication records. Local navigation stays within the selected set. The original website and previous individual root concept files remain unchanged. No package installation, framework, build or deployment is required.

Validation on 2026-11-12: all 64 HTML routes return HTTP 200; 1,254 local HTML references, six CSS asset references and 120 fragments resolve. Source parity covers 363 original content text nodes, 33 external content links, 23 dates, eight original content images and 27 publications in each concept. Browser review covers seven page types in each concept at desktop and phone widths, for 56 rendered views. No broken images or horizontal overflow were found in those views. Native links, route-preserving comparison buttons/iframe arrow keys, Boostlab hover and keyboard activation, and A2 autoplay/pause/play all work. The inactive Code/Scholar labels were darkened after QA and remain non-interactive spans.

See [source-audit.json](source-audit.json), [browser-checks.json](browser-checks.json) and each concept's `qa.json`. All screenshots were captured from the running local site. Initial desktop publication captures predating the inactive-label contrast correction are omitted; final publication phone captures verify that change.

Limits: one Chromium browser with responsive emulation, not physical devices or other engines. Browser visual checks sample representative layouts; every route received source and HTTP checks. External profile and publication destinations were preserved, not revalidated remotely.
