// DevSite Main Module - Core platform initialization and navigation
(function() {
  'use strict';

  const App = {
    init() {
      this.setupNavigation();
      this.setupDOM();
      console.log('DevSite Platform initialized - v1.0');
    },

    setupNavigation() {
      const navToggle = document.getElementById('navToggle');
      const navMenu = document.getElementById('navMenu');

      if (navToggle) {
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
      }

      this.setActiveNavLink();
    },

    setActiveNavLink() {
      const currentPage = window.location.pathname.split('/').pop() || 'index.html';
      const navLinks = document.querySelectorAll('.nav-link');

      navLinks.forEach(link => {
        const href = link.getAttribute('href').split('/').pop();
        if (href === currentPage) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    },

    setupDOM() {
      if (!document.body) {
        console.error('Document body not found');
        return;
      }
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


document.addEventListener("DOMContentLoaded", function () {
  console.log("Portfolio loaded successfully.");

  const button = document.querySelector("button");

  if (button) {
    button.addEventListener("click", function () {
      alert("Welcome to my portfolio 🚀");
    });
  }
});