# Concept 02 — Institutional

**Question:** can a restrained, photograph-led institutional page offer a comfortable alternative for a professor who prefers simple, straightforward websites?

**Status:** browser-checked prototype, awaiting user and professor review. Buildless HTML/CSS; no animation or JavaScript dependency.

## Direction

The ParentSquare reference contributes clear messaging, practical navigation, two direct introductory actions, comfortable type, and a static image that makes the subject concrete. This adapts those traits into a left-aligned institutional hero so it differs structurally from the other restrained concept. The page uses the lab's existing blue/navy palette and unmodified ARC/Technion logos.

The current lab introduction is retained in meaning, with the existing construction visualization used as a static image. All four research directions link to their original detail pages. About, director, news, and joining sections use content from the existing repository. No achievements, testimonials, projects, or statistics have been invented.

## Files and preview

- `prototype-parentsquare.html`
- `prototype-parentsquare.css`

Both files live at the repository root. For the existing preview, open <http://127.0.0.1:8771/prototype-parentsquare.html> or use the local concept comparison page.

## Sources

- [User-supplied Awwwards reference](https://www.awwwards.com/sites/parentsquare).
- [ParentSquare live website](https://www.parentsquare.com/), inspected visually in the browser.
- Existing ARC site: `index.html`, `research.html`, the four research detail pages, `people.html`, `join-us.html`, and the listed news pages.
- Existing local assets and Inter variable font. No new external runtime dependencies.

## Verification

Checked on 2026-11-12 at 1440 × 1000, 768 × 1024, and 390 × 844. No horizontal overflow; both logos and the existing hero/director images load. The research action scrolls to all four linked directions. Supporting sections were visually reviewed. Local route and fragment checks pass. Screenshots: `desktop.jpg` and `mobile.jpg`; shared results: `../qa.json`.
