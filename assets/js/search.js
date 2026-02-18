// assets/js/search.js
// Search filter system. Does nothing unless #searchInput exists.
// Safe guard: avoids double binding.
(function () {
  "use strict";

  if (window.__DEV_SEARCH_INSTALLED__) return;
  window.__DEV_SEARCH_INSTALLED__ = true;

  function initSearch() {
    const searchInput = document.getElementById("searchInput");
    if (!searchInput) return;

    searchInput.addEventListener("input", function () {
      const query = this.value.toLowerCase().trim();

      // Works whether you wrap sections in <main> or not.
      const sections = document.querySelectorAll("section");

      sections.forEach((section) => {
        const text = section.textContent.toLowerCase();
        section.style.display = query === "" || text.includes(query) ? "" : "none";
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSearch);
  } else {
    initSearch();
  }
})();