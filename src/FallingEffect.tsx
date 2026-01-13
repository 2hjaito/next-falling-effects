"use client";

import { useEffect } from "react";
import { effectMap } from "./effects";
import { FallingEffectProps } from "./types";

export function FallingEffect({
  type,
  quantity = 30,
  zIndex = 5,
  enabled = true,
  config = {},
}: FallingEffectProps) {
  useEffect(() => {
    if (!enabled) return;

    const effect = effectMap[type];
    if (!effect) return;

    const cleanup = effect({
      quantity,
      zIndex,
      config,
    });

    return cleanup;
  }, [type, enabled, quantity, zIndex]);

  return null;
}
