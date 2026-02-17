document.addEventListener("DOMContentLoaded", function () {

    // ========================
    // SCROLL REVEAL
    // ========================

    function revealOnScroll() {
        const reveals = document.querySelectorAll(".reveal");

        reveals.forEach((element) => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < windowHeight - 100) {
                element.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", revealOnScroll);
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
    // THEME TOGGLE
    // ========================

    const themeToggle = document.getElementById("themeToggle");

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            document.body.classList.toggle("light-mode");
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

    // ========================
    // DASHBOARD SYSTEM (SAFE)
    // ========================

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let timeLeft = 1500;
    let timerInterval = null;

    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
    const taskCounter = document.getElementById("taskCounter");

    const timerDisplay = document.getElementById("timerDisplay");
    const startTimer = document.getElementById("startTimer");
    const resetTimer = document.getElementById("resetTimer");

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function updateCounter() {
        if (!taskCounter) return;
        const completed = tasks.filter(task => task.completed).length;
        taskCounter.textContent = completed;
    }

    function renderTasks() {
        if (!taskList) return;

        taskList.innerHTML = "";

        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.textContent = task.text;

            if (task.completed) {
                li.style.textDecoration = "line-through";
                li.style.opacity = "0.6";
            }

            li.addEventListener("click", () => {
                tasks[index].completed = !tasks[index].completed;
                saveTasks();
                renderTasks();
            });

            taskList.appendChild(li);
        });

        updateCounter();
    }

    if (addTaskBtn && taskInput) {
        addTaskBtn.addEventListener("click", () => {
            const text = taskInput.value.trim();
            if (text === "") return;

            tasks.push({ text, completed: false });
            taskInput.value = "";
            saveTasks();
            renderTasks();
        });
    }

    function updateTimer() {
        if (!timerDisplay) return;

        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;

        timerDisplay.textContent =
            `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }

    if (startTimer) {
        startTimer.addEventListener("click", () => {
            if (timerInterval) return;

            timerInterval = setInterval(() => {
                if (timeLeft > 0) {
                    timeLeft--;
                    updateTimer();
                } else {
                    clearInterval(timerInterval);
                    timerInterval = null;
                    alert("Session Complete.");
                }
            }, 1000);
        });
    }

    if (resetTimer) {
        resetTimer.addEventListener("click", () => {
            clearInterval(timerInterval);
            timerInterval = null;
            timeLeft = 1500;
            updateTimer();
        });
    }

    renderTasks();
    updateTimer();

});