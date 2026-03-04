(function () {
  "use strict";

  function initCodeLab() {
    const editor = document.getElementById("codeEditor");
    const runBtn = document.getElementById("runCodeBtn");
    const hintBtn = document.getElementById("hintBtn");
    const feedback = document.getElementById("feedback");

    if (!editor || !runBtn || !hintBtn || !feedback) return;

    const challenge = {
      title: "Challenge 1: Return 5",
      description: "Create a function called solve that returns the number 5.",
      hint: "Define solve with `function solve() { return 5; }`"
    };

    function setFeedback(message, type) {
      feedback.textContent = message;
      feedback.classList.remove("success", "error");
      if (type) feedback.classList.add(type);
    }

    function runCode() {
      const userCode = editor.value;

      try {
        const wrapped = `"use strict";\n${userCode}\nreturn typeof solve !== "undefined" ? solve : undefined;`;
        const getSolve = new Function(wrapped);
        const solve = getSolve();

        if (typeof solve !== "function") {
          setFeedback("❌ `solve` function not found. Define `function solve() { ... }`", "error");
          return;
        }

        const result = solve();
        if (result === 5) {
          setFeedback("✅ Correct! Great start — challenge complete.", "success");
          return;
        }

        setFeedback(`❌ Expected 5, but got ${String(result)}.`, "error");
      } catch (error) {
        setFeedback(`❌ Code error: ${error.message}`, "error");
      }
    }

    runBtn.addEventListener("click", runCode);
    hintBtn.addEventListener("click", function () {
      setFeedback(`💡 Hint: ${challenge.hint}`);
    });

    setFeedback(`Ready: ${challenge.description}`);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCodeLab);
  } else {
    initCodeLab();
  }
})();
