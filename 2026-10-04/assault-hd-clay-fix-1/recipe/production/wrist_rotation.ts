import { blendFingerRotation, type FingerRotation } from "./finger_rotation";

/** Conservative correction budget around the animated wrist, in its forearm frame. */
export const HD_WRIST_CORRECTION_RADIANS = (20 * Math.PI) / 180;

export function clampWristRotation(native: FingerRotation, requested: FingerRotation, limit = HD_WRIST_CORRECTION_RADIANS): FingerRotation {
    const dot = Math.min(1, Math.abs(native.reduce((sum, value, index) => sum + value * requested[index], 0)));
    const angle = 2 * Math.acos(dot);
    return blendFingerRotation(native, requested, angle > limit && angle > 0.000001 ? Math.max(0, limit) / angle : 1);
}

/** Native motion owns the free hand except while it must touch a reload prop. */
export function reloadContactWeight(phase: number): number {
    const smooth = (value: number) => {
        const t = Math.max(0, Math.min(1, value));
        return t * t * (3 - 2 * t);
    };
    return smooth((phase - 0.06) / 0.08) * smooth((0.94 - phase) / 0.08);
}
