// DevSite Main Module - Core platform initialization and navigation
(function () {
  'use strict';

  const App = {
    init() {
      this.setupNavigation();
      this.setupButton();
      this.setActiveNavLink();
      console.log('DevSite Platform initialized - v1.1');
    },

    setupNavigation() {
      const navToggle = document.getElementById('navToggle');
      const navMenu = document.getElementById('navMenu');

      if (!navToggle || !navMenu) return;

      navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
      });

      const navLinks = navMenu.querySelectorAll('.nav-link');
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          navMenu.classList.remove('active');
          navToggle.classList.remove('active');
        });
      });
    },

    setActiveNavLink() {
      const currentPage =
        window.location.pathname.split('/').pop() || 'index.html';

      const navLinks = document.querySelectorAll('.nav-link');

      navLinks.forEach(link => {
        const href = link.getAttribute('href')?.split('/').pop();
        link.classList.toggle('active', href === currentPage);
      });
    },

    setupButton() {
      // FIX: do NOT bind to the first <button> on the page (theme buttons live there).
      const button = document.getElementById('welcomeBtn');
      if (!button) return;

      button.addEventListener('click', () => {
        alert('Welcome to my portfolio 🚀');
      });
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => App.init());
  } else {
    App.init();
  }

  window.DevSite = window.DevSite || {};
  window.DevSite.App = App;
})();