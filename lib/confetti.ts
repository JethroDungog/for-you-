import confetti from 'canvas-confetti';

export function fireHeartConfetti() {
  if (typeof window === 'undefined') return;

  const count = 35;
  const defaults = {
    origin: { y: 0.7 },
    zIndex: 9999,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  // Romantic pink, ruby, gold, rose colors
  const colors = ['#e91e63', '#d32f2f', '#ff4081', '#f8bbd0', '#ffd700'];

  fire(0.25, {
    spread: 30,
    startVelocity: 45,
    colors,
  });

  fire(0.2, {
    spread: 60,
    colors,
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 1.2,
    colors,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.4,
    colors,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 45,
    colors,
  });
}

export function fireGrandCelebration() {
  if (typeof window === 'undefined') return;

  const duration = 2.5 * 1000;
  const end = Date.now() + duration;

  const colors = ['#e91e63', '#d32f2f', '#ff80ab', '#ffd700', '#ffffff'];

  (function frame() {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors,
      zIndex: 9999,
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors,
      zIndex: 9999,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}
