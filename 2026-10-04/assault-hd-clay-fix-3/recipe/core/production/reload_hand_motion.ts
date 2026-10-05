export interface ReloadHandMotion {
    readonly contact: number;
    /** Grasp closes before attachment and opens as the object is released. */
    readonly grasp: number;
    /** 0 is the socket; 1 is below the camera. */
    readonly below: number;
    readonly prop: "old" | "fresh" | "shell" | null;
    readonly released: boolean;
    readonly seated: boolean;
    readonly cycle: number;
}
const ease = (t: number) => {
    const x = Math.max(0, Math.min(1, t));
    return x * x * (3 - 2 * x);
};

/** Shared clock for the hand contact and the actual reload objects. */
export function reloadHandMotion(phase: number, shells: boolean): ReloadHandMotion {
    const p = Math.max(0, Math.min(1, phase));
    if (shells) {
        const scaled = ((p - 0.12) / 0.72) * 3;
        const cycle = Math.max(0, Math.min(2, Math.floor(scaled)));
        const t = scaled - cycle;
        return {
            grasp:
                scaled < 0
                    ? ease((p - 0.06) / 0.06)
                    : scaled >= 3
                      ? 0
                      : Math.max(t < 0.65 ? 1 : 1 - ease((t - 0.65) / 0.13), cycle < 2 ? ease((t - 0.9) / 0.1) : 0),
            contact: ease((p - 0.06) / 0.06) * ease((0.94 - p) / 0.1),
            below: t < 0.65 ? 1 - ease(t / 0.65) : ease((t - 0.78) / 0.22),
            prop: scaled >= 0 && scaled < 3 && t < 0.78 ? "shell" : null,
            released: false,
            seated: p >= 0.84,
            cycle,
        };
    }
    const below = p < 0.14 ? 0 : p < 0.34 ? ease((p - 0.14) / 0.2) : p < 0.46 ? 1 : p < 0.8 ? 1 - ease((p - 0.46) / 0.34) : 0;
    return {
        grasp: Math.max(ease((p - 0.04) / 0.1) * (1 - ease((p - 0.31) / 0.03)), ease((p - 0.4) / 0.06) * (1 - ease((p - 0.84) / 0.05))),
        contact: ease((p - 0.04) / 0.1) * ease((0.94 - p) / 0.1),
        below,
        prop: p >= 0.14 && p < 0.34 ? "old" : p >= 0.46 && p < 0.84 ? "fresh" : null,
        released: p >= 0.34,
        seated: p >= 0.84,
        cycle: 0,
    };
}
