// ========================
// NAVBAR TOGGLE
// ========================

const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}


// ========================
// THEME TOGGLE + PERSISTENCE
// ========================

const toggleButton = document.getElementById("themeToggle");

function applyTheme(theme) {
    if (theme === "light") {
        document.body.classList.add("light-mode");
        if (toggleButton) toggleButton.textContent = "☀️";
    } else {
        document.body.classList.remove("light-mode");
        if (toggleButton) toggleButton.textContent = "🌙";
    }
}

const savedTheme = localStorage.getItem("theme") || "dark";
applyTheme(savedTheme);

if (toggleButton) {
    toggleButton.addEventListener("click", () => {
        const isLight = document.body.classList.contains("light-mode");
        const newTheme = isLight ? "dark" : "light";

        applyTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    });
}


// ========================
// SCROLL REVEAL
// ========================

function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;

    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 100;

        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);


// ========================
// TYPING EFFECT (IMPROVED)
// ========================

const textArray = ["Developer", "Creator", "Gamer"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const typingElement = document.getElementById("typing");
    if (!typingElement) return;

    const currentText = textArray[textIndex];

    if (!isDeleting) {
        typingElement.textContent = currentText.slice(0, charIndex++);
        if (charIndex > currentText.length) {
            isDeleting = true;
            setTimeout(typeEffect, 1000); // pause at full word
            return;
        }
    } else {
        typingElement.textContent = currentText.slice(0, charIndex--);
        if (charIndex < 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % textArray.length;
        }
    }

    setTimeout(typeEffect, isDeleting ? 60 : 100);
}

typeEffect();


// ========================
// LIVE SEARCH (CLEANER)
// ========================

const searchInput = document.getElementById("searchInput");

if (searchInput) {
    searchInput.addEventListener("input", function () {
        const query = this.value.toLowerCase().trim();
        const sections = document.querySelectorAll("main section");

        sections.forEach(section => {
            const text = section.textContent.toLowerCase();

            if (query === "" || text.includes(query)) {
                section.style.display = "";
            } else {
                section.style.display = "none";
            }
        });
    });
}