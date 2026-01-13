export function petals({
  quantity = 12,
  zIndex = 9999,
  config,
}: {
  quantity?: number;
  zIndex?: number;
  config?: {
    interval?: number;
    color?: string;
  };
}) {
  if (typeof window === "undefined") return;

  const INTERVAL = config?.interval ?? 220;

  /* ========== STYLE ========== */
  const style = document.createElement("style");
  style.innerHTML = `
    .nfe-petals-container {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: ${zIndex};
      overflow: hidden;
    }

    .nfe-petal {
      position: absolute;
      border-radius: 50% 0 50% 0;
      opacity: 0.7;
      animation-name: nfe-petal-fall;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
      background: ${config?.color ??
    "radial-gradient(circle at center, #ff6b9d, #ff1744)"
    };
    }

    @keyframes nfe-petal-fall {
      from {
        transform: translateY(-10px) rotate(0deg);
      }
      to {
        transform: translateY(100vh) rotate(360deg);
      }
    }
  `;
  document.head.appendChild(style);

  /* ========== CONTAINER ========== */
  const container = document.createElement("div");
  container.className = "nfe-petals-container";
  document.body.appendChild(container);

  /* ========== CREATE PETAL ========== */
  function createPetal() {
    const petal = document.createElement("div");
    petal.className = "nfe-petal";

    const size = Math.random() * 6 + 6;
    const duration = Math.random() * 3 + 4;

    petal.style.left = Math.random() * 100 + "%";
    petal.style.width = petal.style.height = size + "px";
    petal.style.animationDuration = duration + "s";
    petal.style.opacity = String(Math.random() * 0.4 + 0.4);

    container.appendChild(petal);

    setTimeout(() => {
      petal.remove();
    }, (duration + 1) * 1000);
  }

  /* ========== INIT ========== */
  const timers: number[] = [];

  const intervalId = window.setInterval(createPetal, INTERVAL);
  timers.push(intervalId);

  for (let i = 0; i < quantity; i++) {
    setTimeout(createPetal, i * 120);
  }

  /* ========== CLEANUP ========== */
  return () => {
    timers.forEach(clearInterval);
    container.remove();
    style.remove();
  };
}
