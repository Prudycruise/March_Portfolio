(() => {
  'use strict';

  const STORAGE_KEY = 'devsite-theme';
  const root = document.documentElement;

  const applyTheme = (theme) => {
    root.setAttribute('data-theme', theme);
    const toggle = document.getElementById('themeToggle');
    if (toggle) {
      toggle.textContent = theme === 'light' ? '🌙 Dark' : '☀️ Light';
      toggle.setAttribute('aria-label', `Switch to ${theme === 'light' ? 'dark' : 'light'} theme`);
    }
  };

  const initTheme = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const preferred = saved === 'light' || saved === 'dark' ? saved : 'dark';
    applyTheme(preferred);

    const toggle = document.getElementById('themeToggle');
    if (!toggle) return;

    toggle.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      localStorage.setItem(STORAGE_KEY, next);
      applyTheme(next);
    });
  };

  document.addEventListener('DOMContentLoaded', initTheme);
})();
