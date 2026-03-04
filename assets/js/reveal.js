(() => {
  'use strict';

  const initReveal = () => {
    const elements = document.querySelectorAll('.reveal');
    if (!elements.length || !('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach((element) => observer.observe(element));
  };

  document.addEventListener('DOMContentLoaded', initReveal);
})();
