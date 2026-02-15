// Navbar toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Theme toggle with localStorage
const toggleButton = document.getElementById("themeToggle");

if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-mode");
}

if (toggleButton) {
    toggleButton.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");

        if (document.body.classList.contains("light-mode")) {
            localStorage.setItem("theme", "light");
        } else {
            localStorage.setItem("theme", "dark");
        }
    });
}

// Scroll reveal
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

// Typing effect
const textArray = ["Developer", "Creator", "Gamer"];
let textIndex = 0;
let charIndex = 0;

function typeEffect() {
    const typingElement = document.getElementById("typing");
    if (!typingElement) return;

    const currentText = textArray[textIndex];
    typingElement.textContent = currentText.slice(0, charIndex);

    charIndex++;

    if (charIndex > currentText.length) {
        charIndex = 0;
        textIndex = (textIndex + 1) % textArray.length;
    }

    setTimeout(typeEffect, 120);
}

typeEffect();

// Live Search (SAFE VERSION)
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