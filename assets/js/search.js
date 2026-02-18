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

    // IMPORTANT:
    // Your search bar is inside the hero section.
    // So we must NOT hide the hero section, otherwise the input disappears.
    const sections = Array.from(document.querySelectorAll("section"))
      .filter((section) => !section.classList.contains("hero"));

    searchInput.addEventListener("input", function () {
      const query = this.value.toLowerCase().trim();

      sections.forEach((section) => {
        const text = section.textContent.toLowerCase();
        section.style.display = (query === "" || text.includes(query)) ? "" : "none";
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSearch);
  } else {
    initSearch();
  }
})();