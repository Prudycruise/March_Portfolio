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
const reveals = document.querySelectorAll('.reveal');

function revealOnScroll() {
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
revealOnScroll(); // Run once on load

// Typing effect
const textArray = ["Developer", "Creator", "Gamer...."];
let textIndex = 0;
let charIndex = 0;

function typeEffect() {
    const typingElement = document.getElementById("typing");
    if (!typingElement) return;

    const currentText = textArray[textIndex];

    typingElement.textContent = currentText.slice(0, charIndex++);

    if (charIndex > currentText.length) {
        charIndex = 0;
        textIndex = (textIndex + 1) % textArray.length;
    }

    setTimeout(typeEffect, 120);
}

typeEffect();

// Live Search
const searchInput = document.getElementById("searchInput");
const sections = document.querySelectorAll("main section");

if (searchInput) {
    searchInput.addEventListener("input", function () {
        const query = searchInput.value.toLowerCase();

        sections.forEach(section => {
            const text = section.textContent.toLowerCase();

            if (text.includes(query)) {
                section.style.display = "block";
            } else {
                section.style.display = "none";
            }
        });
    });
}

// Section switch helper
function showSection(id) {
    sections.forEach(section => {
        section.classList.remove("active-section");
    });

    const target = document.getElementById(id);
    if (target) {
        target.classList.add("active-section");
    }
}