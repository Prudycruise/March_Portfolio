// assets/js/reveal.js
// Adds reveal-on-scroll without conflicting with script.js.
// Safe guard: will not double-run if script.js already handled it.
(function () {
  "use strict";

  if (window.__DEV_REVEAL_INSTALLED__) return;
  window.__DEV_REVEAL_INSTALLED__ = true;

  function revealOnScroll() {
    const reveals = document.querySelectorAll(".reveal");
    if (!reveals.length) return;

    const windowHeight = window.innerHeight;

    reveals.forEach((el) => {
      const elementTop = el.getBoundingClientRect().top;

      if (elementTop < windowHeight - 100) {
        el.classList.add("active");
      } else {
        el.classList.remove("active");
      }
    });
  }

  function init() {
    window.addEventListener("scroll", revealOnScroll);
    window.addEventListener("resize", revealOnScroll);
    revealOnScroll();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();