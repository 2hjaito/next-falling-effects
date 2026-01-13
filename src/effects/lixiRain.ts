export function lixiRain({
  quantity = 12,
  zIndex = 9999,
  config,
}: {
  quantity?: number;
  zIndex?: number;
  config?: {
    interval?: number;
    wishes?: string[];
  };
}) {
  if (typeof window === "undefined") return;

  const INTERVAL = config?.interval ?? 260;

  const DEFAULT_WISHES = [
    "🧧 Chúc mừng năm mới!",
    "🎉 An khang thịnh vượng",
    "✨ Vạn sự như ý",
    "💰 Tiền vô như nước",
    "🌸 Gia đình hạnh phúc",
  ];

  const WISHES =
    config?.wishes && config.wishes.length > 0
      ? config.wishes
      : DEFAULT_WISHES;

  /* ========== STYLE ========== */
  const style = document.createElement("style");
  style.innerHTML = `
    .nfe-lixi-container {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: ${zIndex};
      overflow: hidden;
    }

    .nfe-lixi {
      position: absolute;
      background: linear-gradient(180deg, #d63031, #c0392b);
      border-radius: 3px;
      box-shadow: 0 4px 10px rgba(214, 48, 49, 0.4);
      animation: nfe-lixi-fall linear infinite;
      cursor: pointer;
      pointer-events: auto;
    }

    .nfe-lixi::after {
      content: "福";
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      font-weight: bold;
      color: #f1c40f;
    }

    .nfe-lixi-popup {
      position: fixed;
      left: 50%;
      bottom: 20%;
      transform: translateX(-50%);
      background: #fff;
      color: #c0392b;
      padding: 14px 18px;
      border-radius: 12px;
      font-weight: bold;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
      z-index: ${zIndex + 1};
      animation: nfe-popup 0.4s ease, nfe-popup-out 0.4s ease 2.6s forwards;
    }

    @keyframes nfe-popup {
      from { transform: translateX(-50%) scale(0.6); opacity: 0; }
      to { transform: translateX(-50%) scale(1); opacity: 1; }
    }

    @keyframes nfe-popup-out {
      to { opacity: 0; transform: translateX(-50%) scale(0.8); }
    }

    @keyframes nfe-lixi-fall {
      from {
        transform: translateY(-10px) rotate(0deg);
        opacity: 0;
      }
      10% { opacity: 1; }
      to {
        transform: translateY(100vh) rotate(360deg);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  /* ========== CONTAINER ========== */
  const container = document.createElement("div");
  container.className = "nfe-lixi-container";
  document.body.appendChild(container);

  /* ========== HELPERS ========== */
  function showWish() {
    const popup = document.createElement("div");
    popup.className = "nfe-lixi-popup";
    popup.textContent =
      WISHES[Math.floor(Math.random() * WISHES.length)];

    document.body.appendChild(popup);

    setTimeout(() => popup.remove(), 3200);
  }

  function createLixi() {
    const lixi = document.createElement("div");
    lixi.className = "nfe-lixi";

    const size = Math.random() * 6 + 12;
    const duration = Math.random() * 3 + 4;

    lixi.style.left = Math.random() * 100 + "%";
    lixi.style.width = size + "px";
    lixi.style.height = size * 1.4 + "px";
    lixi.style.animationDuration = duration + "s";
    lixi.style.opacity = String(Math.random() * 0.4 + 0.5);

    lixi.onclick = () => {
      showWish();
      lixi.remove();
    };

    container.appendChild(lixi);

    setTimeout(() => lixi.remove(), (duration + 1) * 1000);
  }

  /* ========== INIT ========== */
  const intervalId = window.setInterval(createLixi, INTERVAL);

  for (let i = 0; i < quantity; i++) {
    setTimeout(createLixi, i * 120);
  }

  /* ========== CLEANUP ========== */
  return () => {
    clearInterval(intervalId);
    container.remove();
    style.remove();
  };
}
