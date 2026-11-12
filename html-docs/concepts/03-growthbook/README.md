# Concept 03 — Research overview

**Status:** exploratory prototype, awaiting user and professor review.

**Design question:** can a clear, centered introduction and a useful research overview feel approachable to a traditional academic audience while giving the lab a more current visual identity?

Open `prototype-growthbook.html` from the existing static server at the repository root. The parent task provides the comparison wrapper.

## Direction

The [GrowthBook reference](https://www.awwwards.com/sites/growthbook) and its [live site](https://www.growthbook.io/) inform the centered headline, short supporting paragraph, two clear actions, restrained navigation, and broad overview surface beneath the hero. The ARC version uses its own blue/navy colors, actual supplied logos, and research content. It does not reuse corporate statistics, testimonials, product claims, or screenshots.

The main overview pairs a static, schematic digital-building drawing with four linked research directions. This gives the landing page an explanatory focus. There are no animated illustrations, entrance effects, carousels, or hover-dependent navigation. Small color changes provide link feedback.

This differs from the ParentSquare-inspired option's institutional/photo-led hero and from Concept 01's oversized typography and animated robot. The diagram is a visual metaphor for the lab's research, not a claimed real BIM model or technical workflow.

## Content and links

- The manifesto follows the existing ARC introduction: intelligent systems understanding, reasoning about, and acting on the built environment.
- All four research entries link to the existing detail pages. Their brief descriptions are adapted from those pages.
- News uses the existing August, July, and June 2026 entries.
- Team, publications, news archive, joining information, contact email, and current-site links use existing destinations.
- Supplied ARC and Technion marks retain their proportions. Inter is loaded from the existing local asset.

## Files and validation

Only `prototype-growthbook.html`, `prototype-growthbook.css`, and these notes are introduced. There is no JavaScript, build step, package installation, server, or external runtime dependency. Existing website and prototype files are unchanged.

Source checks confirm unique HTML IDs, all four research destinations, and local asset/route references. Browser review on 2026-11-12 covered 1440 × 1000, 768 × 1024, and 390 × 844 with no horizontal overflow. Both logos and the static diagram render correctly; the research action scrolls to the overview, and the Robot-Centric Construction link opens its original page. Supporting sections were visually reviewed. Screenshots: `desktop.jpg` and `mobile.jpg`; shared results: `../qa.json`.
