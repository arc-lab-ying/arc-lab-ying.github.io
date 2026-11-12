# Concept 01 — Minimal / Motion

**Status:** iteration 2, revised from user feedback and awaiting the next review.

**Question:** does the reference's oversized typography and quiet, asymmetric composition work with the lab's name, a short manifesto on the left, and an animated Unitree A2 on the right?

[Desktop first screen](desktop.jpg) · [Mobile first screen](mobile.jpg) · [Browser checks](qa.json)

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
- Add blue to the visual theme and put the existing ARC and Technion logos at the top.
- Keep the short manifesto as it is.
- Keep the robot standing in place, looking left, right, up, and down with gentle tilts. Remove walking and the large rotations.
- Show only “Unitree A2” under the robot; the user confirmed A2 after initially saying A3.
- Remove the motion descriptions and Look up / Walk buttons. Keep one pause/play control and start playing automatically.
- Explore this first option, iterate, and try other references as they arrive. This prototype contains one direction, following that request.

## What this pass explores

Blue and navy oversized lab-name lettering, a faint dot grid, pale blue pill navigation, the supplied ARC and Technion logos, the unchanged manifesto, and an unboxed silver robot. The current research direction links form the next section. The existing full introduction is available further down the page.

The robot is a simplified procedural 3D illustration based on the A2 photo already in `assets/robots/unitree-a2.png`. Its feet stay planted while its body makes small glances and tilts, with pauses between them. Leg joints compensate for the body's pitch, roll, and limited yaw. The entire robot no longer translates or spins. This remains a visual study rather than a CAD model or a physical simulation. A single animation loop plays by default, as explicitly requested, and can be paused and resumed.

The original site pages, stylesheet, script, assets, and baseline record are untouched. This concept is isolated in `prototype-minimal.html`, `prototype-minimal.css`, `prototype-a2.js`, and `assets/prototypes/minimal/`. It has not been deployed or merged into main.

## References and bundled assets

- User-supplied screenshot: [reference.png](reference.png).
- [Lucas Lima reference on Awwwards](https://www.awwwards.com/inspiration/oversized-headline-with-grey-shade-emphasis-lucas-lima). Used as visual direction, with new lab copy and a new composition.
- Three.js 0.180.0: vendored modules and RoundedBoxGeometry from the published npm package. The geometry helper's import points to the local module. [MIT license](../../../assets/prototypes/minimal/vendor/THREE-LICENSE.txt).
- Inter 4.1: local variable font from the official rsms/inter repository. [SIL Open Font License](../../../assets/prototypes/minimal/Inter-LICENSE.txt).

No package installation, build step, or runtime CDN request is required.

## Checks

The headline, logos, and simplified controls fit at 1440 × 1000, 1280 × 720, 768 × 1024, 390 × 844, and 320 × 800 CSS pixels. Automatic playback was verified on a fresh load. Pausing produced a stable image, resuming produced changing animation frames, and no browser console errors were recorded. The manifesto matches the first iteration exactly, and all 19 local references resolve. Details are in [qa.json](qa.json).

The first pass, including its walking animation, remains in commit `0da2355`; [walking-right.jpg](walking-right.jpg) is its historical motion capture.
