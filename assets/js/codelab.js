(() => {
  'use strict';

  const challenge = {
    title: 'Challenge: Write a function named square(n) that returns n * n.',
    validator: (code) => {
      const wrapped = `${code}\n; return typeof square === 'function' ? square(6) : undefined;`;
      // eslint-disable-next-line no-new-func
      const result = new Function(wrapped)();
      return result === 36;
    }
  };

  const initCodeLab = () => {
    const challengeEl = document.getElementById('challengeText');
    const editorEl = document.getElementById('codeEditor');
    const runBtn = document.getElementById('runCodeBtn');
    const feedbackEl = document.getElementById('codeFeedback');
    if (!challengeEl || !editorEl || !runBtn || !feedbackEl) return;

    challengeEl.textContent = challenge.title;

    runBtn.addEventListener('click', () => {
      feedbackEl.className = 'feedback';
      try {
        const passed = challenge.validator(editorEl.value);
        if (passed) {
          feedbackEl.textContent = '✅ Great job! Your function passed the test case square(6) === 36.';
          feedbackEl.classList.add('success');
        } else {
          feedbackEl.textContent = 'Not quite. Make sure your function is named square and returns n * n.';
          feedbackEl.classList.add('error');
        }
      } catch (error) {
        feedbackEl.textContent = `Execution error: ${error.message}`;
        feedbackEl.classList.add('error');
      }
    });
  };

  document.addEventListener('DOMContentLoaded', initCodeLab);
})();
