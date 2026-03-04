(() => {
  'use strict';

  const STORAGE_KEY = 'devsite-math-progress';

  const initLifeGames = () => {
    const questionEl = document.getElementById('mathQuestion');
    const answerEl = document.getElementById('mathAnswer');
    const startBtn = document.getElementById('startMathBtn');
    const submitBtn = document.getElementById('submitMathBtn');
    const feedbackEl = document.getElementById('mathFeedback');
    const scoreEl = document.getElementById('mathScore');
    if (!questionEl || !answerEl || !startBtn || !submitBtn || !feedbackEl || !scoreEl) return;

    const state = { a: 0, b: 0, answer: null, score: Number(localStorage.getItem(STORAGE_KEY) || 0) };
    scoreEl.textContent = String(state.score);

    const createQuestion = () => {
      state.a = Math.floor(Math.random() * 25);
      state.b = Math.floor(Math.random() * 25);
      state.answer = state.a + state.b;
      questionEl.textContent = `What is ${state.a} + ${state.b}?`;
      feedbackEl.textContent = 'Answer the question and submit.';
      feedbackEl.className = 'feedback';
      answerEl.value = '';
      answerEl.focus();
    };

    startBtn.addEventListener('click', createQuestion);
    submitBtn.addEventListener('click', () => {
      const guess = Number(answerEl.value);
      if (!Number.isFinite(guess) || state.answer === null) {
        feedbackEl.textContent = 'Click start to generate a question first.';
        feedbackEl.className = 'feedback error';
        return;
      }

      if (guess === state.answer) {
        state.score += 1;
        localStorage.setItem(STORAGE_KEY, String(state.score));
        scoreEl.textContent = String(state.score);
        feedbackEl.textContent = '✅ Correct! New question generated.';
        feedbackEl.className = 'feedback success';
        createQuestion();
      } else {
        feedbackEl.textContent = `❌ Not correct. Hint: ${state.a} + ${state.b} = ?`;
        feedbackEl.className = 'feedback error';
      }
    });
  };

  document.addEventListener('DOMContentLoaded', initLifeGames);
})();
