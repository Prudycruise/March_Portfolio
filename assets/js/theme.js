// assets/js/theme.js
// THEME ENGINE + DARK MODE TOGGLE (mobile-safe)
(function () {
  "use strict";

  // 6-theme cycler (data-theme system)
  const themes = ["ocean", "midnight", "gold", "neon", "sunrise", "forest"];
  const icons = {
    ocean: "🌙",
    midnight: "🌑",
    gold: "🏆",
    neon: "💜",
    sunrise: "🌞",
    forest: "🌿"
  };

  const themeStorageKey = "devsiteTheme";
  const darkStorageKey = "devsiteDarkMode";

  const cycleBtn = document.getElementById("themeCycleBtn");
  const darkBtn = document.getElementById("themeToggle");

  function applyTheme(theme) {
    document.body.setAttribute("data-theme", theme);
    if (cycleBtn) cycleBtn.textContent = icons[theme] || "🎨";
    localStorage.setItem(themeStorageKey, theme);
  }

  function nextTheme() {
    const current = document.body.getAttribute("data-theme") || "ocean";
    const idx = themes.indexOf(current);
    const next = themes[(idx + 1) % themes.length];
    applyTheme(next);
  }

  // FIX: Icons should represent CURRENT mode (not the next mode).
  // Dark mode ON  -> 🌙
  // Dark mode OFF -> 🌞
  function syncDarkIcon() {
    if (!darkBtn) return;
    darkBtn.textContent = document.body.classList.contains("dark-mode") ? "🌙" : "🌞";
  }

  function setDarkMode(on) {
    document.body.classList.toggle("dark-mode", !!on);
    localStorage.setItem(darkStorageKey, on ? "1" : "0");
    syncDarkIcon();
  }

  // Init theme
  const savedTheme = localStorage.getItem(themeStorageKey);
  applyTheme(savedTheme && themes.includes(savedTheme) ? savedTheme : "ocean");

  // Init dark mode
  const savedDark = localStorage.getItem(darkStorageKey) === "1";
  setDarkMode(savedDark);

  // Events
  if (cycleBtn) cycleBtn.addEventListener("click", nextTheme);

  if (darkBtn) {
    syncDarkIcon();
    darkBtn.addEventListener("click", () => {
      setDarkMode(!document.body.classList.contains("dark-mode"));
    });
  }
})();