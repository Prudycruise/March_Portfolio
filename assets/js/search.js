// assets/js/search.js
(function () {
  "use strict";

  if (window.__DEV_SEARCH_INSTALLED__) return;
  window.__DEV_SEARCH_INSTALLED__ = true;

  function initSearch() {
    const searchInput = document.getElementById("searchInput");
    if (!searchInput) return;

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