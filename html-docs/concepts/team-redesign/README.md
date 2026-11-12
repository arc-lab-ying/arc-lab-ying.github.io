# Recompose the Team pages

[Compare the redesigned Team pages](http://127.0.0.1:8771/prototype-concepts.html?variant=boostlab&page=people.html). The review opens on Boostlab. Use the existing arrows or Left/Right keys to compare the same Team route across all four concepts.

The actual profile information is retained while the original layout is replaced:

| Concept | New composition | Desktop | Phone |
| --- | --- | --- | --- |
| Minimal / Motion | One continuous numbered people index, large portraits and editorial profile bands | [Top](minimal/desktop.jpg) · [Lower](minimal/desktop-lower.jpg) | [Top](minimal/phone.jpg) · [Lower](minimal/phone-lower.jpg) |
| ParentSquare-inspired | A substantial director column beside one open researcher directory | [Top](parentsquare/desktop.jpg) · [Lower](parentsquare/desktop-lower.jpg) | [Top](parentsquare/phone.jpg) · [Directory](parentsquare/phone-directory.jpg) · [Lower](parentsquare/phone-lower.jpg) |
| GrowthBook-inspired | Centered introduction, generous director feature and open researcher portrait spread | [Top](growthbook/desktop.jpg) · [Researchers](growthbook/desktop-researchers.jpg) · [Lower](growthbook/desktop-lower.jpg) | [Top](growthbook/phone.jpg) · [Lower](growthbook/phone-lower.jpg) |
| Boostlab-inspired | Five-entry roster beside a large portrait and complete detail panel | [Director](boostlab/desktop.jpg) · [Alternate selection](boostlab/desktop-zikang.jpg) | [Roster](boostlab/phone.jpg) · [Selected detail](boostlab/phone-timson-detail.jpg) |

The prior Team screenshots in [the full-site review](../full-sites/README.md) remain as the baseline. The new pages change the composition and grouping rather than applying a new color scheme to the original role/card stack. Minimal follows people in sequence; ParentSquare shows laboratory direction and researchers concurrently; GrowthBook emphasizes shared photographic presentation; Boostlab makes profile selection the organizing interaction.

All four retain the four supplied people, their roles, the director's academic position/affiliation, all nine researcher interest phrases with the correct people, all five live professional-profile destinations, three inactive Scholar labels and the supplied portraits. Unitree A2 has a separate equipment treatment. No people, claims or research associations were added.

Focused checks on 2026-11-12:

- Four Team routes return HTTP 200; 108 local references and 27 fragments resolve. Profile association/content checks, unique IDs, all four Team stylesheets and the new Boostlab JavaScript syntax pass.
- All four pages were reviewed at 1440 × 1000 and 390 × 844, scrolling through every person, interest list and robot section. No clipping, broken images or horizontal overflow were found.
- Boostlab's five selections show the correct portrait, role and facts with exactly one pressed button. Click, Tab/Space/Enter and native touch selection work. With scripts disabled, all five complete profiles remain visible and roster anchors navigate normally. Script execution and temporary viewport changes were restored.
- The existing comparison arrows also work while focus is inside the new roster and retain `page=people.html`.
- All 275 other tracked files match commit `32ac0ab`, including Publications, shared theme files, homepages, other routes and the comparison wrapper. Main is unchanged.

See [qa.json](qa.json), [source-checks.json](source-checks.json) and [protected-files.json](protected-files.json). All images are actual browser viewport captures. Full-page capture timed out in the browser backend; top/lower captures are used instead. Two extension-origin messages appeared during script-disable testing; neither pointed to site source. Testing used responsive Chromium emulation, not physical devices or other browser engines.
