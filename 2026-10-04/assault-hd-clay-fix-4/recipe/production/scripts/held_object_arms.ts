import { Basis, Node3D, Transform3D, Vector3 } from "godot";
import { characterBoneName } from "./character_bones";
import {
    characterPalmGlobalTransform,
    closeCharacterGrip,
    placeCharacterPalm,
    pointCharacterIndex,
    pointCharacterThumb,
    seatCharacterFingerPad,
} from "./character_rig";
import { hdArmFit } from "./hd_arm_fit";
import { createCategoryCharacter, type RiggedCharacter } from "./presentation";

const facing = Basis.from_euler(new Vector3(0, Math.PI, 0));
const vector = (v: readonly number[]): Vector3 => new Vector3(v[0], v[1], v[2]);

/** Separate native HD arms for a two-handed object while the firearm is hidden. */
export class HeldObjectArms {
    readonly rig: RiggedCharacter;
    constructor(parent: Node3D) {
        const rig = createCategoryCharacter("assault", "firstPersonArms", "res://assets/characters/assault-hd/character-assault-hd-arms.glb");
        if (!rig?.skeleton) throw new Error("HD held-object arms could not be loaded");
        this.rig = rig;
        rig.root.set_name("HeldObjectArms");
        parent.add_child(rig.root);
    }

    /** Contact on the measured tablet edges, and a right index touch on its UI plane. */
    poseTablet(camera: Node3D, tablet: Node3D, approach: number, press: number, timeSeconds: number, referenceWorld: Transform3D): void {
        const { rig } = this;
        const skeleton = rig.skeleton!;
        rig.sampleAnimation("TPose", timeSeconds);
        rig.animationPlayer!.advance(0);
        skeleton.clear_bones_global_pose_override();
        skeleton.force_update_all_bone_transforms();
        const fit = hdArmFit(skeleton, "machineGun")!;
        const joint = (name: string) => skeleton.get_bone_global_pose(skeleton.find_bone(characterBoneName(name))).origin;
        const midpoint = Vector3.MULTIPLY(Vector3.ADD(joint("LeftUpperArm"), joint("RightUpperArm")), 0.5);
        rig.root.global_transform = Transform3D.MULTIPLY(
            camera.global_transform,
            new Transform3D(facing, Vector3.SUBTRACT(vector(fit.shoulderAnchor), Basis.MULTIPLY(facing, midpoint))),
        );
        const inverse = skeleton.global_transform.affine_inverse();
        // Bounds measured from #946's model; clearance comes from this rig's palm width.
        const halfWidth = 0.127,
            backSurface = -0.02538,
            frontSurface = 0.002075;
        const clampX = halfWidth + fit.palmWidth * 0.57;
        const clampZ = backSurface - fit.palmWidth * 0.2;
        const down = Basis.MULTIPLY(inverse.basis, Basis.MULTIPLY(camera.global_transform.basis, new Vector3(0, -1, 0)));
        const poles = Object.fromEntries(
            (["Left", "Right"] as const).map((side) => [
                side,
                Vector3.ADD(Vector3.SUBTRACT(joint(`${side}LowerArm`), joint(`${side}UpperArm`)), Vector3.MULTIPLY(down, fit.upperLength * 0.35)),
            ]),
        );
        let rightHold: Map<number, Transform3D> | null = null;
        const poseHand = (side: "Left" | "Right", local: Transform3D, relax = side === "Right" ? approach : 0): void => {
            const residual = placeCharacterPalm(skeleton, side, Transform3D.MULTIPLY(inverse, Transform3D.MULTIPLY(referenceWorld, local)), poles[side], true);
            skeleton.set_meta(`tablet${side}Contact`, residual ?? -1);
            curlHand(side, relax);
        };
        const curlHand = (side: "Left" | "Right", relax = side === "Right" ? approach : 0): void => {
            const palm = characterPalmGlobalTransform(skeleton, side)!;
            const edge = (side === "Left" ? -1 : 1) * (halfWidth - fit.palmWidth * 0.1);
            const free = Basis.MULTIPLY(inverse.basis, palm.basis.z);
            closeCharacterGrip(skeleton, side, free, free, 0.9 - relax * 0.1, 0.028 + relax * 0.007);
            if (side === "Right" && rightHold) {
                const freePose = new Map(
                    [...rightHold.keys()].map((id) => [
                        id,
                        Transform3D.MULTIPLY(skeleton.get_bone_global_pose(skeleton.get_bone_parent(id)).affine_inverse(), skeleton.get_bone_global_pose(id)),
                    ]),
                );
                for (const [id, held] of rightHold) {
                    const parent = skeleton.get_bone_global_pose(skeleton.get_bone_parent(id));
                    const freeLocal = freePose.get(id)!;
                    const q = held.basis.get_rotation_quaternion().slerp(freeLocal.basis.get_rotation_quaternion(), relax);
                    const posed = new Transform3D(Basis.from_euler(q.get_euler()).scaled(held.basis.get_scale()), held.origin);
                    skeleton.set_bone_global_pose_override(id, Transform3D.MULTIPLY(parent, posed), 1, true);
                    skeleton.force_update_all_bone_transforms();
                }
                return;
            }
            const gripOrigin = Transform3D.MULTIPLY(referenceWorld, new Vector3(side === "Left" ? -clampX : clampX, -0.005, clampZ));
            const opposedPad = Vector3.ADD(
                Transform3D.MULTIPLY(referenceWorld, new Vector3(edge, -0.036, frontSurface + fit.palmWidth * 0.13)),
                Vector3.SUBTRACT(palm.origin, gripOrigin),
            );
            const thumbContact = pointCharacterThumb(skeleton, side, opposedPad, 0.98 * (1 - relax));
            skeleton.set_meta(`tablet${side}ThumbContact`, thumbContact ?? -1);
            const tabletInverse = referenceWorld.affine_inverse();
            for (const finger of ["Index", "Middle", "Ring", "Pinky"] as const) {
                const ids = [1, 2, 3, 4].map((j) => skeleton.find_bone(characterBoneName(`${side}Hand${finger}${j}`)));
                const knuckle = Transform3D.MULTIPLY(
                    tabletInverse,
                    Transform3D.MULTIPLY(skeleton.global_transform, skeleton.get_bone_global_pose(ids[0])),
                ).origin;
                const length = ids.slice(1).reduce((sum, id) => sum + skeleton.get_bone_rest(id).origin.length(), 0);
                const x =
                    (side === "Left" ? -1 : 1) *
                    Math.max(
                        halfWidth - fit.palmWidth * 0.8,
                        Math.min(halfWidth - fit.palmWidth * (finger === "Pinky" ? 0.01 : 0.08), Math.abs(knuckle.x) - length * 0.78),
                    );
                const target = Vector3.ADD(
                    Transform3D.MULTIPLY(referenceWorld, new Vector3(x, Math.max(-0.058, Math.min(0.058, knuckle.y)), backSurface - fit.palmWidth * 0.11)),
                    Vector3.SUBTRACT(palm.origin, gripOrigin),
                );
                const contact = seatCharacterFingerPad(skeleton, side, finger, target, 0.98 * (1 - relax));
                skeleton.set_meta(`tablet${side}${finger}PadContact`, contact ?? -1);
            }
        };
        // The asset's bezel is 0.254 m wide; fingers wrap its edges and thumbs oppose on the front rim.
        poseHand("Left", new Transform3D(new Basis(new Vector3(0, 0, -1), new Vector3(1, 0, 0), new Vector3(0, -1, 0)), new Vector3(-clampX, -0.005, clampZ)));
        const grip = new Vector3(clampX, -0.005, clampZ);
        const rightBasis = new Basis(new Vector3(0, 0, 1), new Vector3(-1, 0, 0), new Vector3(0, -1, 0));
        poseHand("Right", new Transform3D(rightBasis, grip), 0);
        rightHold = new Map();
        for (const finger of ["Thumb", "Index", "Middle", "Ring", "Pinky"])
            for (const j of [1, 2, 3, 4]) {
                const id = skeleton.find_bone(characterBoneName(`RightHand${finger}${j}`));
                rightHold.set(
                    id,
                    Transform3D.MULTIPLY(skeleton.get_bone_global_pose(skeleton.get_bone_parent(id)).affine_inverse(), skeleton.get_bone_global_pose(id)),
                );
            }
        // The finger tip reaches the LAUNCH centre (UI y=236/372) while the left hand supports the tablet.
        const tap = new Vector3(0.052, -0.07, 0.043 - 0.01 * press);
        if (approach > 0) poseHand("Right", new Transform3D(rightBasis, grip.lerp(tap, approach)));
        if (approach > 0) {
            const target = Transform3D.MULTIPLY(referenceWorld, new Vector3(0, (0.5 - 236 / 372) * 0.124, 0.0014 + 0.004 + 0.012 * (1 - press)));
            let residual = pointCharacterIndex(skeleton, "Right", target, 0.95 * approach);
            // Seat the reaching hand from its actual posed fingertip, rather than a guessed finger length.
            const tipBone = skeleton.find_bone(characterBoneName("RightHandIndex4"));
            for (let pass = 0; pass < 3 && tipBone >= 0; pass++) {
                const tip = Transform3D.MULTIPLY(skeleton.global_transform, skeleton.get_bone_global_pose(tipBone)).origin;
                const palm = characterPalmGlobalTransform(skeleton, "Right")!;
                const correction = Vector3.MULTIPLY(Vector3.SUBTRACT(target, tip), approach);
                const desired = new Transform3D(palm.basis, Vector3.ADD(palm.origin, correction));
                placeCharacterPalm(skeleton, "Right", Transform3D.MULTIPLY(inverse, desired), poles.Right, true);
                curlHand("Right");
                residual = pointCharacterIndex(skeleton, "Right", target, 0.95 * approach);
            }
            skeleton.set_meta("tabletTapResidual", residual ?? -1);
        }
        // Raise/lower carries the already seated viewmodel as one object. Re-solving
        // a clamp against a tilting tablet makes finger IK choose different folds.
        rig.root.global_transform = Transform3D.MULTIPLY(
            Transform3D.MULTIPLY(tablet.global_transform, referenceWorld.affine_inverse()),
            rig.root.global_transform,
        );
    }
}

/** Lane D owns rope/door geometry; this helper owns native arm and finger contact. */
export function poseInsertionHand(
    rig: RiggedCharacter,
    side: "Left" | "Right",
    desiredWorld: Transform3D,
    camera: Node3D,
    kind: "rope" | "brace",
    radius = 0.006,
): Transform3D | null {
    const skeleton = rig.skeleton;
    if (!skeleton) return null;
    const fit = hdArmFit(skeleton, "machineGun");
    const inverse = skeleton.global_transform.affine_inverse();
    const direction = side === "Left" ? fit?.supportGrip.forearmDirection : fit?.firingGrip.forearmDirection;
    const pole = direction ? Basis.MULTIPLY(inverse.basis, Basis.MULTIPLY(camera.global_transform.basis, vector(direction))) : undefined;
    const residual = placeCharacterPalm(skeleton, side, Transform3D.MULTIPLY(inverse, desiredWorld), pole, true);
    const reached = characterPalmGlobalTransform(skeleton, side);
    if (!reached) return null;
    if (kind === "rope") {
        const center = Vector3.ADD(
            reached.origin,
            Vector3.ADD(
                Vector3.MULTIPLY(reached.basis.y, (fit?.palmWidth ?? 0.075) * 0.28),
                Vector3.MULTIPLY(reached.basis.x, (side === "Left" ? 1 : -1) * (radius + (fit?.palmWidth ?? 0.075) * 0.08)),
            ),
        );
        const target = Transform3D.MULTIPLY(inverse, center);
        const thumbRoot = skeleton.find_bone(characterBoneName(`${side}HandThumb1`));
        const thumbMid = skeleton.find_bone(characterBoneName(`${side}HandThumb2`));
        const thumb = Vector3.SUBTRACT(target, skeleton.get_bone_global_pose(thumbRoot).origin).normalized();
        const tip = Vector3.SUBTRACT(target, skeleton.get_bone_global_pose(thumbMid).origin).normalized();
        closeCharacterGrip(skeleton, side, thumb, tip, 0.92, radius);
    } else {
        const thumb = Basis.MULTIPLY(inverse.basis, reached.basis.z);
        closeCharacterGrip(skeleton, side, thumb, thumb, 0.85, 0.2);
    }
    skeleton.set_meta(`insertion${side}Contact`, residual ?? -1);
    const contact = characterPalmGlobalTransform(skeleton, side)!;
    if (kind !== "rope") return contact;
    // Cylinder centre lies inside the curled digits, beyond the palm surface.
    const fingerPad = (fit?.palmWidth ?? 0.075) * 0.08;
    const knuckleOffset = (fit?.palmWidth ?? 0.075) * 0.28;
    return new Transform3D(
        contact.basis,
        Vector3.ADD(
            contact.origin,
            Vector3.ADD(Vector3.MULTIPLY(contact.basis.y, knuckleOffset), Vector3.MULTIPLY(contact.basis.x, (side === "Left" ? 1 : -1) * (radius + fingerPad))),
        ),
    );
}

export function rappelPalmTarget(rig: RiggedCharacter, camera: Node3D): Transform3D | null {
    const fit = hdArmFit(rig.skeleton, "machineGun");
    if (!fit) return null;
    return Transform3D.MULTIPLY(
        camera.global_transform,
        new Transform3D(
            new Basis(new Vector3(0, 0, 1), new Vector3(1, 0, 0), new Vector3(0, 1, 0)),
            new Vector3(-fit.palmWidth * 2.2, -fit.upperLength * 0.3, -fit.lowerLength * 0.95 - fit.upperLength * 0.5),
        ),
    );
}
