// Confetti & Particle effect for cryptographic gift dispatch and coin minting
import confetti from 'canvas-confetti';

export function fireGiftConfetti() {
  try {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#00f59b', '#f59e0b', '#ec4899', '#38bdf8', '#a855f7'],
      disableForReducedMotion: true,
      zIndex: 9999,
    });
  } catch {
    // fallback if canvas is unavailable
  }
}

export function fireMintSuccessConfetti() {
  try {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 9999,
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#00f59b', '#10b981'],
    });
    fire(0.2, {
      spread: 60,
      colors: ['#fbbf24', '#f59e0b'],
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
      colors: ['#22d3ee', '#818cf8'],
    });
  } catch {
    // fallback
  }
}
