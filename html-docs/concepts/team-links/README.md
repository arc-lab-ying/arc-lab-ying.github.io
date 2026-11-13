# Team profile links and cleanup

[Open the updated public Team comparison](https://arc-lab-concepts-preview.vercel.app/?variant=boostlab&page=people.html).

All four Team pages now link to the verified profiles for [Timson Yeung](https://scholar.google.com/citations?user=uA5bHgYAAAAJ&hl=en) and [Zikang Wang](https://scholar.google.com/citations?user=ct8rOnIAAAAJ&hl=en). Each opened Scholar profile shows Technion, a verified campus.technion.ac.il email and matching research publications. Independent identity evidence includes [Timson's Technion publication record](https://cris.technion.ac.il/en/publications/integrating-digital-twin-and-agent-based-simulation-to-support-ad/) and [Zikang's 2026 IAARC paper with Huaquan Ying](https://www.iaarc.org/publications/2026_proceedings_of_the_43rd_isarc_singapore/a_bim_driven_robotic_framework_for_autonomous_3d_projection_of_construction_layouts.html). The director's existing Scholar destination is unchanged. Zheng Zhao's missing option is omitted entirely; no pending, gray or disabled Scholar labels remain.

The 36 separate interest lines retain the same wording and lose only their final semicolon/period. Boostlab's redundant role-summary/instruction callout and its unused Team-only CSS were removed. Actual roster roles, names, portraits, selection controls and static no-JS profile content remain intact. Boostlab selects its existing HTML directly, so no JavaScript edit was required.

The update was published to the existing `arc-lab-concepts-preview` project in Timson Yeung's verified personal Hobby workspace, `timson-yeungs-projects`, using CLI identity `timsonyeung-8349`. The stable public URL and comparison switcher are unchanged. The clean release contains 95 files/6,061,257 bytes; its [manifest](release-manifest.json) records the exact published files. No original GitHub Pages source, shared typography, Publications, other routes, GitHub remote or main branch changed.

Focused verification:

- Every concept has 3 live Scholar links, 7 profile destinations, 9 cleaned interest lines and 5 original portraits. Source checks pass for local references, unique IDs and fragments; 334 tracked files outside the five intended source edits remain unchanged.
- All four Team layouts fit desktop and 390px phone views without horizontal overflow or pending text. Boostlab's Timson/Zikang/Zheng selections show the correct available links; its default no-JS document retains all five profiles.
- Both new links were actually clicked on the published page and opened the exact canonical Scholar URLs in new tabs. Public desktop/phone captures show the new links and cleaned interests. The removed callout is absent from the live DOM; no site-source error was observed. Unrelated Zotero extension messages were excluded. Temporary viewport overrides were reset, and the public Team comparison was left ready.
- The independent anonymous HTTP check passed 7/7 requests with no redirects; all four Team pages, Boostlab CSS/JS and Team-query wrapper match current source bytes. The focused review did not repeat unrelated route/typography/zoom checks.

Source and browser details are in [qa.json](qa.json). The two public screenshots are `boostlab-public-zikang-desktop.jpg` and `boostlab-public-timson-phone390.jpg`.
