export function tetFlowers({
  quantity,
  zIndex,
  config,
}: {
  quantity: number;
  zIndex: number;
  config?: {
    images?: string[];
  };
}) {
  if (typeof window === "undefined") return;

  /* ================= CONFIG ================= */

  const CDN_BASE =
    "https://cdn.jsdelivr.net/gh/2hjaito/next-falling-effects@v0.1.0/assets";

  const DEFAULT_IMAGES = [
    `${CDN_BASE}/hoa-dao.png`,
    `${CDN_BASE}/hoa-mai.png`,
    `${CDN_BASE}/canh-dao.png`,
  ];

  const IMAGES =
    config?.images && config.images.length > 0
      ? config.images
      : DEFAULT_IMAGES;

  const LIFE_PER_TICK = 900 / 60;
  const flakes: HTMLElement[] = [];

  const ITEMS = IMAGES.map((src) => ({
    src,
    size: 22 + Math.random() * 10,
    life: [7000, 12000] as [number, number],
  }));

  /* ================= STYLE ================= */

  const style = document.createElement("style");
  style.innerHTML = `
    .nfe-container {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: ${zIndex};
      overflow: hidden;
    }

    .nfe-item {
      position: absolute;
      top: -40px;
      will-change: transform, opacity;
    }

    .nfe-item img {
      display: block;
      user-select: none;
      pointer-events: none;
    }
  `;
  document.head.appendChild(style);

  /* ================= CONTAINER ================= */

  const container = document.createElement("div");
  container.className = "nfe-container";
  document.body.appendChild(container);

  /* ================= HELPERS ================= */

  function reset(el: HTMLElement) {
    const item = ITEMS[Math.floor(Math.random() * ITEMS.length)];
    const life =
      Math.random() * (item.life[1] - item.life[0]) + item.life[0];

    const x = Math.random() * 100;
    const rotate = Math.random() * 360;
    const scale = 0.8 + Math.random() * 0.4;

    el.dataset.life = String(life);
    el.dataset.maxLife = String(life);
    el.dataset.x = String(x);

    el.innerHTML = `
      <img
        src="${item.src}"
        style="
          width:${item.size}px;
          transform: rotate(${rotate}deg) scale(${scale});
          opacity:${0.6 + Math.random() * 0.3};
        "
      />
    `;

    el.style.transform = `translate(${x}vw, -15vh)`;
    el.style.opacity = "1";
  }

  /* ================= ANIMATION ================= */

  function animate() {
    flakes.forEach((el) => {
      let life = Number(el.dataset.life);
      const max = Number(el.dataset.maxLife);
      const t = 1 - life / max;

      if (t <= 1) {
        const x = Number(el.dataset.x);
        const sway = Math.sin(t * Math.PI * 2) * 1.2;

        el.style.transform = `
          translate(${x + sway}vw, ${t * 110}vh)
        `;

        if (t > 0.7) {
          el.style.opacity = String(1 - (t - 0.7) * 3);
        }

        el.dataset.life = String(life - LIFE_PER_TICK);
      } else {
        reset(el);
      }
    });

    requestAnimationFrame(animate);
  }

  /* ================= INIT ================= */

  for (let i = 0; i < quantity; i++) {
    const el = document.createElement("span");
    el.className = "nfe-item";
    reset(el);
    flakes.push(el);
    container.appendChild(el);
  }

  animate();

  /* ================= CLEANUP ================= */

  return () => {
    container.remove();
    style.remove();
  };
}