(function () {
  "use strict";

  var root = document.documentElement;

  function all(selector, parent) {
    return Array.prototype.slice.call((parent || document).querySelectorAll(selector));
  }

  function safeStorageGet(key) {
    try { return window.localStorage.getItem(key); } catch (_) { return null; }
  }

  function safeStorageSet(key, value) {
    try { window.localStorage.setItem(key, value); } catch (_) { /* file:// may block storage */ }
  }

  var savedTheme = safeStorageGet("eh-theme");
  if (savedTheme === "light" || savedTheme === "dark") root.dataset.theme = savedTheme;

  function resolvedTheme() {
    if (root.dataset.theme) return root.dataset.theme;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  all("[data-eh-theme-toggle]").forEach(function (button) {
    function update() {
      var theme = resolvedTheme();
      button.setAttribute("aria-pressed", String(theme === "dark"));
      button.textContent = theme === "dark" ? "Light theme" : "Dark theme";
    }
    button.addEventListener("click", function () {
      var next = resolvedTheme() === "dark" ? "light" : "dark";
      root.dataset.theme = next;
      safeStorageSet("eh-theme", next);
      update();
    });
    update();
  });

  all("[data-eh-toc]").forEach(function (nav) {
    var mainSelector = nav.getAttribute("data-eh-toc") || "#main";
    var main = document.querySelector(mainSelector);
    if (!main) return;
    var headings = all("h2[id], h3[id]", main);
    if (!nav.children.length) {
      headings.forEach(function (heading) {
        var link = document.createElement("a");
        link.href = "#" + heading.id;
        link.textContent = heading.textContent.trim();
        link.dataset.level = heading.tagName.slice(1);
        nav.appendChild(link);
      });
    }
    if (!("IntersectionObserver" in window)) return;
    var links = all("a[href^='#']", nav);
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (link) {
          if (link.getAttribute("href") === "#" + entry.target.id) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-15% 0px -70% 0px" });
    headings.forEach(function (heading) { observer.observe(heading); });
  });

  all("[data-eh-tabs]").forEach(function (group) {
    var tabs = all("[role='tab']", group);
    var panels = all("[role='tabpanel']", group);
    if (!tabs.length || !panels.length) return;

    function select(tab, focus) {
      tabs.forEach(function (candidate) {
        var selected = candidate === tab;
        candidate.setAttribute("aria-selected", String(selected));
        candidate.tabIndex = selected ? 0 : -1;
      });
      panels.forEach(function (panel) {
        panel.hidden = tab.getAttribute("aria-controls") !== panel.id;
      });
      if (focus) tab.focus();
    }

    tabs.forEach(function (tab, index) {
      tab.addEventListener("click", function () { select(tab, false); });
      tab.addEventListener("keydown", function (event) {
        var next = index;
        if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
        else if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
        else if (event.key === "Home") next = 0;
        else if (event.key === "End") next = tabs.length - 1;
        else return;
        event.preventDefault();
        select(tabs[next], true);
      });
    });
    select(tabs.find(function (tab) { return tab.getAttribute("aria-selected") === "true"; }) || tabs[0], false);
  });

  all("[data-eh-toggle-all]").forEach(function (button) {
    button.addEventListener("click", function () {
      var details = all(button.getAttribute("data-eh-toggle-all"));
      var shouldOpen = details.some(function (item) { return !item.open; });
      details.forEach(function (item) { item.open = shouldOpen; });
      button.setAttribute("aria-expanded", String(shouldOpen));
      button.textContent = shouldOpen ? "Collapse details" : "Expand details";
    });
  });

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) return navigator.clipboard.writeText(text);
    return new Promise(function (resolve, reject) {
      var field = document.createElement("textarea");
      field.value = text;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      try { document.execCommand("copy") ? resolve() : reject(new Error("Copy failed")); }
      catch (error) { reject(error); }
      field.remove();
    });
  }

  all("[data-eh-copy-target]").forEach(function (button) {
    var original = button.textContent;
    button.addEventListener("click", function () {
      var target = document.querySelector(button.getAttribute("data-eh-copy-target"));
      if (!target) return;
      copyText(target.innerText).then(function () {
        button.textContent = button.getAttribute("data-eh-copy-label") || "Copied";
        window.setTimeout(function () { button.textContent = original; }, 1400);
      }).catch(function () {
        button.textContent = "Select and copy";
        window.setTimeout(function () { button.textContent = original; }, 1800);
      });
    });
  });

  all(".eh-term[data-term]").forEach(function (term) {
    function setActive(active) {
      var key = term.getAttribute("data-term");
      all(".eh-term[data-term='" + CSS.escape(key) + "'], [data-definition='" + CSS.escape(key) + "']")
        .forEach(function (item) { item.dataset.active = String(active); });
    }
    term.addEventListener("mouseenter", function () { setActive(true); });
    term.addEventListener("mouseleave", function () { setActive(false); });
    term.addEventListener("focus", function () { setActive(true); });
    term.addEventListener("blur", function () { setActive(false); });
  });

  var progress = document.querySelector("[data-eh-reading-progress]");
  if (progress) {
    function updateProgress() {
      var available = document.documentElement.scrollHeight - window.innerHeight;
      var value = available > 0 ? Math.min(100, Math.max(0, window.scrollY / available * 100)) : 100;
      progress.style.setProperty("--eh-progress", value.toFixed(2));
    }
    document.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    updateProgress();
  }
})();
