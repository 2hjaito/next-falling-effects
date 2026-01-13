type FallingEffectType = "tet-flowers";
interface FallingEffectProps {
    type: FallingEffectType;
    quantity?: number;
    zIndex?: number;
    enabled?: boolean;
    config?: Record<string, any>;
}

declare function FallingEffect({ type, quantity, zIndex, enabled, config, }: FallingEffectProps): null;

export { FallingEffect, type FallingEffectProps, type FallingEffectType };
