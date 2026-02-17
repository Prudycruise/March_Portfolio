document.addEventListener("DOMContentLoaded", function () {

    // ========================
    // SCROLL REVEAL (FIXED)
    // ========================

    function revealOnScroll() {
        const reveals = document.querySelectorAll(".reveal");

        reveals.forEach((element) => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < windowHeight - 100) {
                element.classList.add("active");
            } else {
                element.classList.remove("active");
            }
        });
    }

    window.addEventListener("scroll", revealOnScroll);
    window.addEventListener("resize", revealOnScroll);
    revealOnScroll();

    // ========================
    // SEARCH SYSTEM
    // ========================

    const searchInput = document.getElementById("searchInput");

    if (searchInput) {
        searchInput.addEventListener("input", function () {
            const query = this.value.toLowerCase().trim();
            const sections = document.querySelectorAll("main section");

            sections.forEach(section => {
                const text = section.textContent.toLowerCase();
                section.style.display =
                    query === "" || text.includes(query) ? "" : "none";
            });
        });
    }

    // ========================
    // THEME TOGGLE (FIXED ICON)
    // ========================

    const themeToggle = document.getElementById("themeToggle");

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {

            document.body.classList.toggle("dark-mode");

            if (document.body.classList.contains("dark-mode")) {
                themeToggle.textContent = "☀️";
            } else {
                themeToggle.textContent = "🌙";
            }
        });
    }

    // ========================
    // MOBILE MENU
    // ========================

    const menuBtn = document.querySelector(".menu-btn");
    const navLinks = document.querySelector(".nav-links");

    if (menuBtn && navLinks) {
        menuBtn.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });
    }

    // ========================
    // TYPING EFFECT
    // ========================

    const typingElement = document.getElementById("typing");

    if (typingElement) {
        const words = ["a Developer.", "a Builder.", "Focused.", "Consistent."];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentWord = words[wordIndex];

            if (!isDeleting) {
                typingElement.textContent =
                    currentWord.substring(0, charIndex++);
                if (charIndex > currentWord.length) {
                    isDeleting = true;
                    setTimeout(type, 1000);
                    return;
                }
            } else {
                typingElement.textContent =
                    currentWord.substring(0, charIndex--);
                if (charIndex === 0) {
                    isDeleting = false;
                    wordIndex = (wordIndex + 1) % words.length;
                }
            }

            setTimeout(type, isDeleting ? 50 : 100);
        }

        type();
    }

});