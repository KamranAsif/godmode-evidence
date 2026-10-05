export type FingerRotation = readonly [number, number, number, number];

/** Shortest-arc local rotation blend, without allocating Godot engine values. */
export function blendFingerRotation(native: FingerRotation, target: FingerRotation, weight: number): FingerRotation {
    let dot = native.reduce((sum, value, index) => sum + value * target[index], 0);
    const sign = dot < 0 ? -1 : 1;
    dot = Math.min(1, Math.abs(dot));
    const angle = Math.acos(dot);
    const sine = Math.sin(angle);
    const a = sine > 0.00001 ? Math.sin((1 - weight) * angle) / sine : 1 - weight;
    const b = sine > 0.00001 ? Math.sin(weight * angle) / sine : weight;
    const result = native.map((value, index) => a * value + b * target[index] * sign);
    const length = Math.hypot(...result);
    return result.map((value) => value / length) as [number, number, number, number];
}

/** Compose the blended local joint with its parent, retaining native translation and scale. */
export function fingerGlobalPose(parent: readonly number[], q: FingerRotation, origin: readonly number[], scale: readonly number[]): number[] {
    const [x, y, z, w] = q;
    const local = [
        1 - 2 * (y * y + z * z),
        2 * (x * y + z * w),
        2 * (x * z - y * w),
        2 * (x * y - z * w),
        1 - 2 * (x * x + z * z),
        2 * (y * z + x * w),
        2 * (x * z + y * w),
        2 * (y * z - x * w),
        1 - 2 * (x * x + y * y),
        ...origin,
    ];
    const posed = new Array<number>(12);
    for (let column = 0; column < 4; column++) {
        for (let row = 0; row < 3; row++) {
            const offset = column * 3;
            posed[offset + row] =
                (parent[row] * local[offset] + parent[3 + row] * local[offset + 1] + parent[6 + row] * local[offset + 2]) * (column < 3 ? scale[column] : 1) +
                (column === 3 ? parent[9 + row] : 0);
        }
    }
    return posed;
}
