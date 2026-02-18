// assets/js/theme.js
(function () {
  "use strict";

  const themes = ["ocean", "midnight", "gold", "neon", "sunrise", "forest", "winter", "royal"];
  const icons = {
    ocean: "🌙",
    midnight: "🌑",
    gold: "🏆",
    neon: "💜",
    sunrise: "🌞",
    forest: "🌿",
    winter: "❄️",
    royal: "👑"
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

  // Dark mode icon shows CURRENT mode:
  // dark ON -> 🌙, dark OFF -> 🌞
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

  if (cycleBtn) cycleBtn.addEventListener("click", nextTheme);

  if (darkBtn) {
    syncDarkIcon();
    darkBtn.addEventListener("click", () => {
      setDarkMode(!document.body.classList.contains("dark-mode"));
    });
  }
})();