(function () {
  "use strict";

  var slides = Array.prototype.slice.call(document.querySelectorAll(".eh-slide"));
  if (!slides.length) return;

  var current = 0;
  var counter = document.querySelector("[data-eh-slide-counter]");
  var previous = document.querySelector("[data-eh-slide-prev]");
  var next = document.querySelector("[data-eh-slide-next]");

  function fromHash() {
    var index = slides.findIndex(function (slide) { return "#" + slide.id === window.location.hash; });
    return index >= 0 ? index : 0;
  }

  function show(index, updateHash) {
    current = Math.min(slides.length - 1, Math.max(0, index));
    slides.forEach(function (slide, position) {
      slide.hidden = position !== current;
      slide.setAttribute("aria-hidden", String(position !== current));
    });
    if (counter) counter.textContent = (current + 1) + " / " + slides.length;
    if (previous) previous.disabled = current === 0;
    if (next) next.disabled = current === slides.length - 1;
    if (updateHash) history.replaceState(null, "", "#" + slides[current].id);
    slides[current].focus({ preventScroll: true });
  }

  if (previous) previous.addEventListener("click", function () { show(current - 1, true); });
  if (next) next.addEventListener("click", function () { show(current + 1, true); });

  document.addEventListener("keydown", function (event) {
    if (event.target.matches("input, textarea, select, [contenteditable='true']")) return;
    if (["ArrowRight", "PageDown", " "].includes(event.key)) {
      event.preventDefault();
      show(current + 1, true);
    } else if (["ArrowLeft", "PageUp"].includes(event.key)) {
      event.preventDefault();
      show(current - 1, true);
    } else if (event.key === "Home") {
      event.preventDefault();
      show(0, true);
    } else if (event.key === "End") {
      event.preventDefault();
      show(slides.length - 1, true);
    }
  });

  window.addEventListener("hashchange", function () { show(fromHash(), false); });
  show(fromHash(), false);
})();
