# Concept 01 — Minimal / Motion

**Status:** first prototype, awaiting user feedback. No design decision has been validated yet.

**Question:** does the reference's oversized typography and quiet, asymmetric composition work with the lab's name, a short manifesto on the left, and an animated Unitree A2 on the right?

[Desktop first screen](desktop.jpg) · [Mobile first screen](mobile.jpg) · [Rightward walk](walking-right.jpg) · [Browser checks](qa.json)

Open `/prototype-minimal.html` from a static server at the repository root. For example:

```powershell
python -m http.server 8771 --bind 127.0.0.1
```

Then visit <http://127.0.0.1:8771/prototype-minimal.html>.

## Requested direction

- Use the supplied Lucas Lima reference's minimalist visual language.
- Replace the large "Senior Product Designer" headline with the lab name.
- Put a short, basic manifesto / About introduction on the left.
- Keep a fuller introduction lower down for this first pass; a separate About page remains an option.
- Replace the right-hand expertise block with a minimalist animated Unitree A2 graphic.
- Let the robot look up and take a few steps left and right, rather than showing a static photo.
- Explore this first option, iterate, and try other references as they arrive. This prototype contains one direction, following that request.

## What this pass explores

Monochrome Inter typography, oversized lab-name lettering, a faint dot grid, gray-to-black emphasis, small pill navigation, a condensed manifesto, and an unboxed silver robot. Current research direction links form the next section. The existing full introduction is available further down the page.

The robot is a simplified procedural 3D illustration based on the A2 photo already in `assets/robots/unitree-a2.png`. It has articulated legs, a body tilt to look up, turns, short walks in both directions, and subtle pointer response. It is a visual study rather than a CAD model or a physical gait simulation. Look up, Walk, and Pause controls make the motions easy to compare. Reduced-motion preferences start with the robot paused.

The original site pages, stylesheet, script, assets, and baseline record are untouched. This concept is isolated in `prototype-minimal.html`, `prototype-minimal.css`, `prototype-a2.js`, and `assets/prototypes/minimal/`. It has not been deployed or merged into main.

## References and bundled assets

- User-supplied screenshot: [reference.png](reference.png).
- [Lucas Lima reference on Awwwards](https://www.awwwards.com/inspiration/oversized-headline-with-grey-shade-emphasis-lucas-lima). Used as visual direction, with new lab copy and a new composition.
- Three.js 0.180.0: vendored modules and RoundedBoxGeometry from the published npm package. The geometry helper's import points to the local module. [MIT license](../../../assets/prototypes/minimal/vendor/THREE-LICENSE.txt).
- Inter 4.1: local variable font from the official rsms/inter repository. [SIL Open Font License](../../../assets/prototypes/minimal/Inter-LICENSE.txt).

No package installation, build step, or runtime CDN request is required.

## Checks

Rendered at 1440 × 1000, 1280 × 720, 768 × 1024, 390 × 844, and 320 × 800 CSS pixels. The headline and page fit at each width, and the 3D canvas and local font load. Look up, walk left, turn, walk right, and pause were exercised in the browser. Reduced-motion preferences start the robot paused. The full introduction expands and contains all four original research questions. No browser console errors were recorded.
