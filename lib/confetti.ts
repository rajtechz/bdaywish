import confetti from "canvas-confetti";

export const triggerRoyalConfetti = () => {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    colors: ["#ffd1dc", "#e9ddfc", "#d9b345", "#f78198", "#ffffff", "#c79a29"],
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};

export const triggerHeartConfetti = () => {
  confetti({
    particleCount: 50,
    spread: 70,
    origin: { y: 0.6 },
    shapes: ["circle"],
    colors: ["#ee5778", "#ffd1dc", "#e3cb73"],
    scalar: 1.3,
  });
};

export const triggerFireworks = (durationMs: number = 4000) => {
  const end = Date.now() + durationMs;
  const colors = ["#ffd1dc", "#e9ddfc", "#d9b345", "#fcaebb", "#be98f5", "#ffffff"];

  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors,
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
};
