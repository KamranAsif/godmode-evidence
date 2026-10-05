import { AnimationPlayer, Basis, Skeleton3D, Transform3D, Vector3 } from "godot";
import { type Weapon } from "../packages/game-rules/src/match";
import { characterBoneName } from "./character_bones";
import { characterPalmFrame } from "./character_rig";
import { type HandGrip, weaponAnimation } from "./weapon_catalog";
import type { Vector3Tuple } from "./weapon_catalog";

export interface HdArmFit {
    readonly shoulderAnchor: Vector3Tuple;
    readonly firingTarget: Vector3Tuple;
    readonly firingGrip: HandGrip;
    readonly supportGrip: HandGrip;
    readonly supportFromFiring: readonly number[];
    readonly palmSpacing: number;
    readonly palmWidth: number;
    readonly upperLength: number;
    readonly lowerLength: number;
}
const fits = new WeakMap<Skeleton3D, ReadonlyMap<Weapon, HdArmFit>>();
const facing = Basis.from_euler(new Vector3(0, Math.PI, 0));
const tuple = (v: Vector3): Vector3Tuple => [v.x, v.y, v.z];

/** Measure this body's native hand frames and elbow planes, before any IK. */
export function initializeHdArmFits(skeleton: Skeleton3D, player: AnimationPlayer): void {
    const result = new Map<Weapon, HdArmFit>();
    const bone = (name: string) => skeleton.find_bone(characterBoneName(name));
    const joint = (name: string) => skeleton.get_bone_global_pose(bone(name)).origin;
    for (const weapon of ["machineGun", "pistol", "shotgun", "sniperRifle"] as const) {
        const name = weaponAnimation(weapon, "FirstPersonIdle");
        player.play(name, 0);
        player.seek(0, true);
        player.advance(0);
        skeleton.clear_bones_global_pose_override();
        skeleton.force_update_all_bone_transforms();
        const right = Transform3D.MULTIPLY(skeleton.get_bone_global_pose(bone("RightHand")), characterPalmFrame(skeleton, "Right")!);
        const left = Transform3D.MULTIPLY(skeleton.get_bone_global_pose(bone("LeftHand")), characterPalmFrame(skeleton, "Left")!);
        const midpoint = Vector3.MULTIPLY(Vector3.ADD(joint("LeftUpperArm"), joint("RightUpperArm")), 0.5);
        const upperLength = joint("RightUpperArm").distance_to(joint("RightLowerArm"));
        const lowerLength = joint("RightLowerArm").distance_to(joint("RightHand"));
        const palmWidth = skeleton
            .get_bone_global_rest(bone("LeftHandIndex1"))
            .origin.distance_to(skeleton.get_bone_global_rest(bone("LeftHandPinky1")).origin);
        const nativeFiring = Basis.MULTIPLY(facing, Vector3.SUBTRACT(right.origin, midpoint));
        // The eye is above the shoulder, not 0.36 m behind a forward shoulder.
        const anchor = new Vector3(0, -upperLength * 0.9, -lowerLength * 0.1);
        const pole = (side: "Left" | "Right"): Vector3Tuple => {
            const shoulder = joint(side + "UpperArm"),
                elbow = joint(side + "LowerArm"),
                hand = joint(side + "Hand");
            const axis = Vector3.SUBTRACT(hand, shoulder).normalized();
            const reach = Vector3.SUBTRACT(elbow, shoulder);
            return tuple(Basis.MULTIPLY(facing, Vector3.SUBTRACT(reach, Vector3.MULTIPLY(axis, reach.dot(axis))).normalized()));
        };
        const pair = Transform3D.MULTIPLY(right.affine_inverse(), left);
        const supportFromFiring = [...tuple(pair.basis.x), ...tuple(pair.basis.y), ...tuple(pair.basis.z), ...tuple(pair.origin)];
        result.set(weapon, {
            supportFromFiring,
            shoulderAnchor: tuple(anchor),
            firingTarget: [nativeFiring.x, -palmWidth * 1.5, -lowerLength - upperLength * 0.5],
            firingGrip: { fingerDirection: tuple(Basis.MULTIPLY(facing, right.basis.y)), forearmDirection: pole("Right") },
            supportGrip: { fingerDirection: tuple(Basis.MULTIPLY(facing, left.basis.y)), forearmDirection: pole("Left") },
            palmSpacing: right.origin.distance_to(left.origin),
            palmWidth,
            upperLength,
            lowerLength,
        });
    }
    fits.set(skeleton, result);
    skeleton.set_meta("hdArmFits", JSON.stringify(Object.fromEntries(result)));
    player.play("Idle", 0);
    player.seek(0, true);
    player.advance(0);
}

export function hdArmFit(skeleton: Skeleton3D | null | undefined, weapon: Weapon): HdArmFit | null {
    return skeleton ? (fits.get(skeleton)?.get(weapon) ?? null) : null;
}
