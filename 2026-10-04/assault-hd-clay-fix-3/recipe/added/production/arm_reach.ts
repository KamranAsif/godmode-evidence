type Point = readonly [number, number, number];

/** Keep a grip on its surface segment within the arm's comfortable reach. */
export function reachableGripFraction(back: Point, front: Point, shoulder: Point, reach: number, preferred: number): number {
    const limit = Math.max(0, Math.min(1, preferred));
    const direction = front.map((v, i) => v - back[i]);
    const offset = back.map((v, i) => v - shoulder[i]);
    const a = direction.reduce((sum, v) => sum + v * v, 0);
    if (a < 1e-12) return limit;
    const b = 2 * direction.reduce((sum, v, i) => sum + v * offset[i], 0);
    const c = offset.reduce((sum, v) => sum + v * v, 0) - reach * reach;
    const closest = Math.max(0, Math.min(limit, -b / (2 * a)));
    if (a * limit * limit + b * limit + c <= 0) return limit;
    const discriminant = b * b - 4 * a * c;
    if (discriminant < 0) return closest;
    const lower = (-b - Math.sqrt(discriminant)) / (2 * a);
    const upper = (-b + Math.sqrt(discriminant)) / (2 * a);
    return Math.max(lower, 0) <= Math.min(upper, limit) ? Math.min(upper, limit) : closest;
}
