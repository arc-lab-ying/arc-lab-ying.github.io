# Five-way ARC Lab comparison

The comparison now starts with **00 · Original Website**, followed by **01 · Minimal / Motion**, **02 · Classic Academic**, **03 · Research Overview** and **04 · Interactive Grid**. Reviewer labels, iframe titles, redesign page titles and footers use these descriptive names.

Canonical query keys are `original`, `minimal`, `classic`, `overview` and `grid`. Existing `parentsquare`, `growthbook` and `boostlab` links remain aliases for `classic`, `overview` and `grid`; the query is canonicalized while preserving the selected page and fragment. Source folders retain their technical names. The same sixteen-route allowlist applies across all five options. Buttons and left/right keys wrap around the five fixed identities, including when focus is inside a page. Native anchors and interactive profile fragments remain reflected in the comparison URL.

The new `prototypes/original/` snapshot contains exactly twenty-nine files from pinned main `87792aae11e2b4e47346428cd59f047925462634`: sixteen HTML pages, the original stylesheet/script and eleven original assets. Every byte matches that source. This intentionally retains the original layout/content, including its earlier profile placeholders, interest punctuation and Google Fonts requests. None of those baseline differences were copied into the redesigns. The original root website and main branch remain untouched.

All sixty-four redesign main sections, headers, links, portraits, styles and runtime scripts are unchanged from `c7e6134`; only tab/footer naming changed. The wrapper's styling and route allowlist are unchanged. Source checks record the naming-only scope, faithful snapshot and release hashes in `source-checks.json`.

Local browser checks passed for default 00, all five labels, previous/next wrap, the three legacy aliases with deep pages/fragments, iframe-key navigation, selected-profile hash tracking and 390px fit. Baseline Home, Team and Research retain the original presentation. The baseline author checked its complete local runtime closure with 28 HTTP 200 responses.

The existing personal Vercel preview project is reused. Its root remains the comparison experience, assembled from a clean allowlist bundle; documentation, screenshots, ZIPs, Git metadata and local identity files are excluded. Public verification and four clean email homepage screenshots are recorded after deployment, without changing website source again.
