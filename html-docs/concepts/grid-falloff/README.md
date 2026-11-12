# Boostlab blue hover refinement

The homepage grid now varies blue hue, lightness and opacity continuously with distance from the pointer and the age of the trail. The pointer head responds quickly; older cells fade gradually to the original grid, without the former uniform residual color. The animation loop sleeps once settled. Reduced motion preserves the spatial gradient with immediate updates and clearing, without a temporal trail.

[Open the homepage comparison](http://127.0.0.1:8771/prototype-concepts.html?variant=boostlab).

Focused live checks found 77 distinct intensity levels in a moving normal sample. In a foreground-tab decay sample, the maximum fell from 0.764 to 0.170 after 0.93s and0.0049 after 3.15s, then settled to zero. Reduced motion showed 65 levels and cleared to zero immediately on pointer leave. A throttled background-tab timing sample was excluded. Field metadata retains opaque background plates at peak illumination.

All four native research links remain available. Keyboard Enter and a 320px phone touch navigated to the expected research detail. The desktop/phone samples show no root overflow; research-card type remains 20–24px and supporting metadata 14px. Temporary motion emulation and viewport overrides were restored.

Only Boostlab site.css and site.js changed. The committed typography CSS prefix is identical, the original inner-banner/gallery script is preserved, and all other tracked source remains unchanged. JavaScript syntax, CSS parsing and Git whitespace checks pass. Nothing was deployed or pushed.

The [QA record](qa.json) contains compact measurements. The images show the normal moving trail, reduced-motion spatial gradient and phone layout. The earlier [typography review](../typography-review/README.md) retains the separate 200% zoom limitation; no additional zoom check was attempted for this decorative refinement.
