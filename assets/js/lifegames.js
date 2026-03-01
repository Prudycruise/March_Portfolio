(function () {
    'use strict';

    const startBtn = document.getElementById("startMathBtn");
    const submitBtn = document.getElementById("submitMathBtn");
    const questionEl = document.getElementById("mathQuestion");
    const answerInput = document.getElementById("mathAnswer");
    const feedback = document.getElementById("mathFeedback");

    if (!startBtn) return;

    let correctAnswer = null;

    startBtn.addEventListener("click", () => {
        const a = Math.floor(Math.random() * 20);
        const b = Math.floor(Math.random() * 20);
        correctAnswer = a + b;

        questionEl.textContent = `What is ${a} + ${b}?`;
        feedback.textContent = "";
        answerInput.value = "";
    });

    submitBtn.addEventListener("click", () => {
        if (Number(answerInput.value) === correctAnswer) {
            feedback.textContent = "✅ Correct!";
            feedback.className = "feedback success";
        } else {
            feedback.textContent = "❌ Wrong. Try again.";
            feedback.className = "feedback error";
        }
    });

})();