// ========================
// SAFE DOM READY WRAPPER
// ========================

document.addEventListener("DOMContentLoaded", function () {

    // ========================
    // SCROLL REVEAL
    // ========================

    function revealOnScroll() {
        const reveals = document.querySelectorAll(".reveal");

        reveals.forEach((element) => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const revealPoint = 100;

            if (elementTop < windowHeight - revealPoint) {
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

                if (query === "" || text.includes(query)) {
                    section.style.display = "";
                } else {
                    section.style.display = "none";
                }
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

            tasks.push({
                text: text,
                completed: false
            });

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
                    alert("Session Complete. Take a short break.");
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