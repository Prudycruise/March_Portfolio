document.addEventListener("DOMContentLoaded", function () {

  // =========================================================
  // UNIVERSAL TYPING ENGINE
  // =========================================================
  function typeLoop(el, words, typeSpeed, deleteSpeed, pauseAfterType, pauseAfterDelete) {
    if (!el || !words || !words.length) return;

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function tick() {
      const currentWord = words[wordIndex];

      if (!isDeleting) {
        el.textContent = currentWord.substring(0, charIndex++);
        if (charIndex > currentWord.length) {
          isDeleting = true;
          setTimeout(tick, pauseAfterType);
          return;
        }
        setTimeout(tick, typeSpeed);
      } else {
        el.textContent = currentWord.substring(0, charIndex--);
        if (charIndex <= 0) {
          isDeleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          setTimeout(tick, pauseAfterDelete);
          return;
        }
        setTimeout(tick, deleteSpeed);
      }
    }

    tick();
  }

  // =========================================================
  // HERO TITLE TYPING (Build / Learn / Execute)
  // =========================================================
  const heroTitle = document.querySelector(".hero h1");

  if (heroTitle) {
    typeLoop(
      heroTitle,
      ["Build.", "Learn.", "Execute."],
      90,
      55,
      800,
      250
    );
  }

  // =========================================================
  // SUBTITLE TYPING
  // =========================================================
  const typingElement = document.getElementById("typing");

  if (typingElement) {
    typeLoop(
      typingElement,
      ["a Developer.", "a Builder.", "Focused.", "Consistent."],
      100,
      50,
      1000,
      250
    );
  }

  // =========================================================
  // SECTION AUTO-TYPING (Opt-in)
  // =========================================================
  document.querySelectorAll(".autoType").forEach((el) => {
    const raw = el.getAttribute("data-words") || "";
    const words = raw.split(",").map(s => s.trim()).filter(Boolean);
    if (!words.length) return;

    typeLoop(
      el,
      words,
      70,
      35,
      900,
      250
    );
  });

});