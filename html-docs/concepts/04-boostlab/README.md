# Concept 04 — Research Field

Status: first prototype for comparison; awaiting review.

Reference: [Boostlab on Awwwards](https://www.awwwards.com/sites/boostlab), verified through its live [BTG Pactual Boostlab site](https://boostlab.btgpactual.com/en) and the parent's browser screenshot. The reference has a thin gray grid on off-white, with a large central rectangle interrupting the cells. The user's hover-light interpretation is the interaction brief.

## Design choice

Put the original ARC wordmark and “LAB” at the center. Keep the manifesto immediately below the grid, where it can be read comfortably without competing with the four navigation destinations.

An off-white, thin gray grid contains four permanently illuminated blue research regions. Moving the pointer across the remaining cells leaves a short blue light trail. A clean central rectangle interrupts the grid and carries the ARC identity. The four regions stay readable and clickable without any hover. Keyboard focus lights the field around the selected direction. On phones the same four regions form a two-column grid; no pointer interaction is required. Reduced-motion preferences remove transitions. No automatic camera motion, walking robot, or looping decorative animation is used.

The white header preserves the supplied ARC and Technion logos. Center identity uses the parent's reusable `assets/prototypes/shared/arc-wordmark.svg` mask, preserving the original vector shape. The local Inter font is reused. The four research links point to the existing detail pages, with fuller names and source-grounded descriptions below the hero.

## Files

- `prototype-boostlab.html`
- `prototype-boostlab.css`
- `prototype-boostlab.js`

These three files live at the repository root. Use the existing static preview server and visit `/prototype-boostlab.html`. No install, build, or external runtime dependency is needed.

## Verification

Browser review on 2026-11-12 covered 1440 × 1000, 768 × 1024, 390 × 844, and a narrow 320 × 740 check. There is no horizontal overflow or clipped navigation tile. Hover lights nearby cells; all four blue links remain visible at rest. Keyboard focus is visible and Enter opens the original Agent-oriented Design and Construction page. Both supplied logos and the original wordmark mask render correctly. Supporting sections were visually reviewed. JavaScript syntax and local route/fragment checks pass. Screenshots: `desktop.jpg`, `mobile.jpg`, and `hover.jpg`; shared results: `../qa.json`.
