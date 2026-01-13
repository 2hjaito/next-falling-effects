"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  FallingEffect: () => FallingEffect
});
module.exports = __toCommonJS(index_exports);

// src/FallingEffect.tsx
var import_react = require("react");

// src/effects/tetFlowers.ts
function tetFlowers({
  quantity,
  zIndex
}) {
  if (typeof window === "undefined") return;
  const LIFE_PER_TICK = 900 / 60;
  const flakes = [];
  const ITEMS = [
    { src: "/images/event/hoa-dao.png", size: 30, life: [7e3, 1e4] },
    { src: "/images/event/hoa-mai.png", size: 28, life: [7e3, 1e4] },
    { src: "/images/event/canh-dao.png", size: 22, life: [9e3, 12e3] }
  ];
  const style = document.createElement("style");
  style.innerHTML = `
    .nfe-container {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: ${zIndex};
    }
    .nfe-item {
      position: absolute;
      top: -40px;
      will-change: transform, opacity;
    }
  `;
  document.head.appendChild(style);
  const container = document.createElement("div");
  container.className = "nfe-container";
  document.body.appendChild(container);
  function reset(el) {
    const item = ITEMS[Math.floor(Math.random() * ITEMS.length)];
    const life = Math.random() * (item.life[1] - item.life[0]) + item.life[0];
    el.dataset.life = String(life);
    el.dataset.maxLife = String(life);
    el.dataset.x = String(Math.random() * 100);
    el.innerHTML = `<img src="${item.src}" style="width:${item.size}px" />`;
    el.style.transform = `translate(${el.dataset.x}vw, -10vh)`;
    el.style.opacity = "1";
  }
  function animate() {
    flakes.forEach((el) => {
      let life = Number(el.dataset.life);
      const max = Number(el.dataset.maxLife);
      const t = 1 - life / max;
      if (t <= 1) {
        el.style.transform = `translate(${el.dataset.x}vw, ${t * 110}vh)`;
        el.dataset.life = String(life - LIFE_PER_TICK);
      } else {
        reset(el);
      }
    });
    requestAnimationFrame(animate);
  }
  for (let i = 0; i < quantity; i++) {
    const el = document.createElement("span");
    el.className = "nfe-item";
    reset(el);
    flakes.push(el);
    container.appendChild(el);
  }
  animate();
  return () => {
    container.remove();
    style.remove();
  };
}

// src/effects/index.ts
var effectMap = {
  "tet-flowers": tetFlowers
};

// src/FallingEffect.tsx
function FallingEffect({
  type,
  quantity = 30,
  zIndex = 5,
  enabled = true,
  config = {}
}) {
  (0, import_react.useEffect)(() => {
    if (!enabled) return;
    const effect = effectMap[type];
    if (!effect) return;
    const cleanup = effect({
      quantity,
      zIndex,
      config
    });
    return cleanup;
  }, [type, enabled, quantity, zIndex]);
  return null;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FallingEffect
});
