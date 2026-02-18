// THEME ENGINE (does not touch typing/automation)
(function () {
  "use strict";

  const themes = ["ocean", "midnight", "gold", "neon", "sunrise", "forest"];
  const icons = {
    ocean: "🌙",
    midnight: "🌑",
    gold: "🏆",
    neon: "💜",
    sunrise: "🌞",
    forest: "🌿"
  };

  const storageKey = "devsiteTheme";
  const btn = document.getElementById("themeCycleBtn");

  function applyTheme(theme) {
    document.body.setAttribute("data-theme", theme);
    if (btn) btn.textContent = icons[theme] || "🎨";
    localStorage.setItem(storageKey, theme);
  }

  function nextTheme() {
    const current = document.body.getAttribute("data-theme") || "ocean";
    const idx = themes.indexOf(current);
    const next = themes[(idx + 1) % themes.length];
    applyTheme(next);
  }

  const saved = localStorage.getItem(storageKey);
  applyTheme(saved && themes.includes(saved) ? saved : "ocean");

  if (btn) btn.addEventListener("click", nextTheme);
})();