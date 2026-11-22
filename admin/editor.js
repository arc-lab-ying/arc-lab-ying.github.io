const selector = document.querySelector("#page");
const frame = document.querySelector("#frame");
const openPreview = document.querySelector("#open");
const statusText = document.querySelector("#status");
const selectedPaths = { news: "/news/index.html", publications: "/publications.html", researchers: "/people.html", join: "/join-us.html", pages: "/join-us.html" };
let previewRevision = "";
let pending = false;
let poll;

function displayPage() {
  const url = new URL("/preview" + selector.value, location.origin);
  if (previewRevision) url.searchParams.set("revision", previewRevision);
  frame.src = url.href;
  openPreview.href = url.href;
}

async function read(url, json = false) {
  const result = await fetch(url, {cache: "no-store"});
  if (!result.ok) throw new Error("Resource unavailable");
  return json ? result.json() : (await result.text()).trim();
}

async function refresh() {
  if (pending) return;
  pending = true;
  clearTimeout(poll);
  try {
    const stamp = "?check=" + Date.now();
    const [revision, released, index] = await Promise.all([
      read("/preview/revision.txt" + stamp), read("/revision.txt" + stamp),
      read("/preview/admin/preview-index.json" + stamp, true)
    ]);
    const selected = selector.value;
    selector.querySelectorAll("optgroup").forEach(group => group.remove());
    for (const [label, rows] of [["News & blog posts", index.articles], ["Other pages", index.pages]]) {
      if (!rows.length) continue;
      const group = document.createElement("optgroup");
      group.label = label;
      for (const row of rows) group.append(new Option(row.title, row.path));
      selector.append(group);
    }
    selector.value = selected;
    if (!selector.value) selector.selectedIndex = 0;
    previewRevision = revision;
    displayPage();
    statusText.textContent = revision === released ? "Preview matches the live site." : "Preview has unpublished changes.";
    const branch = await read("https://api.github.com/repos/arc-lab-ying/arc-lab-ying.github.io/git/ref/heads/main", true).catch(() => null);
    if (branch && branch.object.sha !== revision) {
      statusText.textContent = "Saved changes are building. Showing the previous preview.";
      poll = setTimeout(refresh, 20000);
    }
  } catch {
    statusText.textContent = "Preview status unavailable. Refresh to try again.";
  } finally {
    pending = false;
  }
}

selector.addEventListener("change", displayPage);
document.querySelector("#refresh").addEventListener("click", refresh);
for (const link of document.querySelectorAll("[data-section]")) {
  link.addEventListener("click", () => {
    selector.value = selectedPaths[link.dataset.section];
    displayPage();
  });
}
document.addEventListener("visibilitychange", () => { if (!document.hidden) refresh(); });
refresh();
