# ARC vector assets

The existing `assets/arc-logo.svg` is already vector artwork made from paths and polygons. These reusable variants preserve that geometry exactly; no raster tracing or replacement type was used. The original logo remains unchanged.

- `arc-logo.svg`: full logo and original outlined tagline, `viewBox="340 410 920 380"`.
- `arc-wordmark.svg`: original ARC lettering only, with a tighter padded `viewBox="376.875 438 846.375 254.875"`.
- `arc-symbols.svg`: external SVG symbols named `arc-logo` and `arc-wordmark`.
- `geometry-check.json`: source-to-output geometry comparison and file hashes.

The artwork uses `currentColor`. To inherit the surrounding CSS color, use the sprite in an inline SVG:

```html
<svg viewBox="376.875 438 846.375 254.875" role="img" aria-label="ARC Lab">
  <use href="assets/prototypes/shared/arc-symbols.svg#arc-wordmark"></use>
</svg>
```

Standalone SVG files also work in `<img>` elements, where their default color is black. A CSS mask can use the wordmark shape for other graphic treatments. Keep the Technion's existing official logo as supplied.
