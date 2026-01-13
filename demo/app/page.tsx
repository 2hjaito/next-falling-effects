"use client";

import { useMemo, useState } from "react";
import { FallingEffect } from "@tranhuudang/next-falling-effects";

const EFFECTS = {
  none: "— Không hiệu ứng —",
  "tet-flowers": "🌸 Hoa Tết",
  petals: "🌺 Petals",
  "lixi-rain": "🧧 Mưa lì xì",
} as const;

type EffectKey = keyof typeof EFFECTS;

const GITHUB_URL = "https://github.com/2hjaito/next-falling-effects";
const NPM_URL = "https://www.npmjs.com/package/@tranhuudang/next-falling-effects";
const WEBSITE_URL = "https://dangth.dev";

export default function Page() {
  const [effect, setEffect] = useState<EffectKey>("none");
  const [copied, setCopied] = useState(false);

  const codeToCopy = useMemo(() => {
    if (effect === "none") return "// Select an effect to see code";
    if (effect === "lixi-rain") {
      return `<FallingEffect
  type="lixi-rain"
  config={{
    wishes: [
      "Chúc mừng năm mới 🎉",
      "An khang thịnh vượng 🧧",
      "Vạn sự như ý ✨",
    ],
  }}
/>`;
    }
    return `<FallingEffect type="${effect}" />`;
  }, [effect]);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(codeToCopy);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      // no-op
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-black text-white">
      {/* Top bar */}
      <div className="border-b border-slate-800/60 bg-black/30 backdrop-blur">
        <div className="mx-auto max-w-6xl px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center">
              ✨
            </div>
            <div>
              <div className="font-semibold leading-tight">Next Falling Effects</div>
              <div className="text-xs text-slate-400 leading-tight">
                Demo + copy nhanh cho Next.js
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={WEBSITE_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-2 text-sm text-slate-200 hover:bg-slate-900 transition"
            >
              <span className="text-base">🌐</span>
              <span className="hidden sm:inline">dangth.dev</span>
            </a>

            <a
              href={NPM_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-2 text-sm text-slate-200 hover:bg-slate-900 transition"
              title="NPM package"
            >
              <span className="text-base">📦</span>
              <span className="hidden sm:inline">NPM</span>
            </a>

            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-white text-black px-3 py-2 text-sm font-semibold hover:bg-slate-200 transition"
              title="GitHub repo"
            >
              <span className="text-base">⭐</span>
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-6 py-12">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-3">
            Chọn hiệu ứng → xem preview → copy code
          </h1>
          <p className="text-slate-400 max-w-2xl">
            Hiệu ứng rơi dựng sẵn cho Next.js (App Router). Dùng nhanh, nhẹ, không cần asset.
          </p>
        </header>

        {/* Controls */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end gap-4">
          <div>
            <label className="block text-sm text-slate-400 mb-2">🎨 Hiệu ứng</label>
            <select
              value={effect}
              onChange={(e) => setEffect(e.target.value as EffectKey)}
              className="w-full sm:w-72 rounded-lg bg-slate-900 border border-slate-800 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Object.entries(EFFECTS).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div className="text-xs text-slate-500">
            Install:{" "}
            <span className="font-mono text-slate-300">
              npm i @tranhuudang/next-falling-effects
            </span>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Preview */}
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

              {/* subtle frame label */}
              <div className="pointer-events-none absolute left-4 top-4 rounded-full border border-slate-800 bg-black/30 px-3 py-1 text-xs text-slate-300">
                {EFFECTS[effect]}
              </div>
            </div>

            <div className="mt-3 text-xs text-slate-500">
              Tip: demo chỉ chạy trong preview để UI không bị “nhiễu”.
            </div>
          </div>

          {/* Code */}
          <div>
            <div className="mb-2 flex items-center justify-between text-sm text-slate-400">
              <span>Code</span>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-3 py-1 text-xs font-semibold text-white hover:bg-blue-500 transition"
              >
                {copied ? "✅ Copied" : "📋 Copy"}
              </button>
            </div>

            <div className="rounded-xl border border-slate-800 bg-[#0b1020] overflow-hidden">
              <div className="px-4 py-2 border-b border-slate-800 bg-black/20 text-xs text-slate-400 font-mono">
                app/page.tsx
              </div>
              <pre className="p-4 text-sm overflow-x-auto">
                <code className="text-slate-100">{codeToCopy}</code>
              </pre>
            </div>

            <div className="mt-4 text-xs text-slate-500">
              Nếu dùng App Router, nhớ đặt component effect trong{" "}
              <span className="font-mono text-slate-300">"use client"</span>.
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-14 pt-8 border-t border-slate-800/60 text-sm text-slate-400 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <div>
            © {new Date().getFullYear()} •{" "}
            <a className="text-slate-200 hover:underline" href={WEBSITE_URL} target="_blank" rel="noreferrer">
              dangth.dev
            </a>
          </div>
          <div className="flex gap-4">
            <a className="hover:underline" href={GITHUB_URL} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a className="hover:underline" href={NPM_URL} target="_blank" rel="noreferrer">
              NPM
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}