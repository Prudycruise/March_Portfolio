(() => {
  'use strict';

  const initSearch = () => {
    const input = document.getElementById('searchInput');
    if (!input) return;

    const items = Array.from(document.querySelectorAll('[data-search-item]'));

    input.addEventListener('input', () => {
      const query = input.value.trim().toLowerCase();
      items.forEach((item) => {
        const text = item.textContent?.toLowerCase() ?? '';
        item.hidden = Boolean(query) && !text.includes(query);
      });
    });
  };

  document.addEventListener('DOMContentLoaded', initSearch);
})();
