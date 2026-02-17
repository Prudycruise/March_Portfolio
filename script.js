// ========================
// STATE
// ========================

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let timeLeft = 1500; // 25 minutes
let timerInterval = null;

// ========================
// DOM ELEMENTS
// ========================

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const taskCounter = document.getElementById("taskCounter");

const timerDisplay = document.getElementById("timerDisplay");
const startTimer = document.getElementById("startTimer");
const resetTimer = document.getElementById("resetTimer");

// ========================
// TASK SYSTEM
// ========================

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateCounter() {
    const completed = tasks.filter(task => task.completed).length;
    taskCounter.textContent = completed;
}

function renderTasks() {
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

if (addTaskBtn) {
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

// ========================
// TIMER SYSTEM
// ========================

function updateTimer() {
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

// ========================
// INITIAL LOAD
// ========================

renderTasks();
updateTimer();