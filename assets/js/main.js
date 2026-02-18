// assets/js/main.js
(function () {
  "use strict";

  function initNav() {
    const navToggle = document.getElementById("navToggle");
    const navMenu = document.getElementById("navMenu");
    if (!navToggle || !navMenu) return;

    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });

    navMenu.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initNav);
  } else {
    initNav();
  }
})();