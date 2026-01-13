export type FallingEffectType = "tet-flowers";

export interface FallingEffectProps {
  type: FallingEffectType;
  quantity?: number;
  zIndex?: number;
  enabled?: boolean;
  config?: Record<string, any>;
}
