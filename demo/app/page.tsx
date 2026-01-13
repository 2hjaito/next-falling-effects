"use client";

import { useState } from "react";
import { FallingEffect } from "@tranhuudang/next-falling-effects";

const EFFECTS = {
  none: "— Không hiệu ứng —",
  "tet-flowers": "🌸 Hoa Tết",
  petals: "🌺 Petals",
  "lixi-rain": "🧧 Mưa lì xì",
} as const;

type EffectKey = keyof typeof EFFECTS;

export default function Page() {
  const [effect, setEffect] = useState<EffectKey>("none");

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black text-white">
      <main className="mx-auto max-w-6xl px-6 py-16">
        {/* HEADER */}
        <header className="mb-12">
          <h1 className="text-5xl font-extrabold tracking-tight mb-3">
            ✨ Next Falling Effects
          </h1>
          <p className="text-slate-400 max-w-xl">
            Chọn hiệu ứng, xem preview và copy code dùng ngay cho Next.js
          </p>
        </header>

        {/* SELECT */}
        <div className="mb-10">
          <label className="block text-sm text-slate-400 mb-2">
            🎨 Chọn hiệu ứng
          </label>
          <select
            value={effect}
            onChange={(e) => setEffect(e.target.value as EffectKey)}
            className="w-64 rounded-lg bg-slate-800 border border-slate-700 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {Object.entries(EFFECTS).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* PREVIEW */}
          <div>
            <div className="mb-2 text-sm text-slate-400">Preview</div>
            <div className="relative h-[420px] rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
              {effect !== "none" && (
                <FallingEffect
                  key={effect}
                  type={effect}
                  zIndex={10}
                  config={
                    effect === "lixi-rain"
                      ? {
                        wishes: [
                          "Chúc mừng năm mới 🎉",
                          "An khang thịnh vượng 🧧",
                          "Vạn sự như ý ✨",
                        ],
                      }
                      : undefined
                  }
                />
              )}
            </div>
          </div>

          {/* CODE */}
          <div>
            <div className="mb-2 flex items-center justify-between text-sm text-slate-400">
              <span>Code</span>
              <button
                onClick={() =>
                  navigator.clipboard.writeText(
                    effect === "none"
                      ? "// No effect selected"
                      : `<FallingEffect type="${effect}" />`
                  )
                }
                className="rounded-md bg-blue-600 px-3 py-1 text-xs font-medium hover:bg-blue-500 transition"
              >
                Copy
              </button>
            </div>

            <div className="rounded-xl border border-slate-800 bg-[#0b1020] p-4 text-sm text-slate-100">
              <pre>
                {effect === "none"
                  ? "// Select an effect to see code"
                  : `<FallingEffect
  type="${effect}"
/>`}
              </pre>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}