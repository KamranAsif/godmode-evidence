import { Basis, Node3D, Transform3D, Vector3 } from "godot";
import { characterBoneName } from "./character_bones";
import { characterPalmGlobalTransform, closeCharacterGrip, placeCharacterPalm, pointCharacterIndex } from "./character_rig";
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
    poseTablet(camera: Node3D, tablet: Node3D, approach: number, press: number, timeSeconds: number): void {
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
        const poseHand = (side: "Left" | "Right", local: Transform3D): void => {
            const pole = side === "Left" ? fit.supportGrip.forearmDirection : fit.firingGrip.forearmDirection;
            const residual = placeCharacterPalm(
                skeleton,
                side,
                Transform3D.MULTIPLY(inverse, Transform3D.MULTIPLY(tablet.global_transform, local)),
                Basis.MULTIPLY(inverse.basis, Basis.MULTIPLY(camera.global_transform.basis, vector(pole ?? [0, -1, 0]))),
                true,
            );
            skeleton.set_meta(`tablet${side}Contact`, residual ?? -1);
            const palm = characterPalmGlobalTransform(skeleton, side)!;
            const edge = (side === "Left" ? -1 : 1) * (0.127 - fit.palmWidth * 0.1);
            const pad = Transform3D.MULTIPLY(inverse, Transform3D.MULTIPLY(tablet.global_transform, new Vector3(edge, -0.02, 0.012)));
            const thumbRoot = skeleton.get_bone_global_pose(skeleton.find_bone(characterBoneName(`${side}HandThumb1`))).origin;
            const thumbMid = skeleton.get_bone_global_pose(skeleton.find_bone(characterBoneName(`${side}HandThumb2`))).origin;
            const relax = side === "Right" ? approach : 0;
            const free = Basis.MULTIPLY(inverse.basis, palm.basis.z);
            const thumb = Vector3.SUBTRACT(pad, thumbRoot).normalized().lerp(free, relax).normalized();
            const tip = Vector3.SUBTRACT(pad, thumbMid).normalized().lerp(free, relax).normalized();
            closeCharacterGrip(skeleton, side, thumb, tip, 0.9 - relax * 0.1, 0.014 + relax * 0.021);
        };
        // The asset's bezel is 0.254 m wide; fingers wrap its edges and thumbs oppose on the front rim.
        poseHand("Left", new Transform3D(new Basis(new Vector3(0, 0, -1), new Vector3(0, 1, 0), new Vector3(1, 0, 0)), new Vector3(-0.14, -0.035, 0.006)));
        const grip = new Vector3(0.14, -0.035, 0.006);
        // The finger tip reaches the LAUNCH centre (UI y=236/372) while the left hand supports the tablet.
        const tap = new Vector3(0.052, -0.07, 0.043 - 0.01 * press);
        poseHand("Right", new Transform3D(new Basis(new Vector3(0, 0, 1), new Vector3(0, 1, 0), new Vector3(-1, 0, 0)), grip.lerp(tap, approach)));
        if (approach > 0) {
            const target = Transform3D.MULTIPLY(tablet.global_transform, new Vector3(0, (0.5 - 236 / 372) * 0.124, 0.0014 + 0.004 + 0.012 * (1 - press)));
            let residual = pointCharacterIndex(skeleton, "Right", target, 0.95 * approach);
            // Seat the reaching hand from its actual posed fingertip, rather than a guessed finger length.
            const tipBone = skeleton.find_bone(characterBoneName("RightHandIndex4"));
            for (let pass = 0; pass < 3 && tipBone >= 0 && (residual ?? 0) > 0.002; pass++) {
                const tip = Transform3D.MULTIPLY(skeleton.global_transform, skeleton.get_bone_global_pose(tipBone)).origin;
                const palm = characterPalmGlobalTransform(skeleton, "Right")!;
                const correction = Vector3.MULTIPLY(Vector3.SUBTRACT(target, tip), approach);
                const desired = new Transform3D(palm.basis, Vector3.ADD(palm.origin, correction));
                placeCharacterPalm(skeleton, "Right", Transform3D.MULTIPLY(inverse, desired), undefined, true);
                const seated = characterPalmGlobalTransform(skeleton, "Right")!;
                const thumb = Basis.MULTIPLY(inverse.basis, seated.basis.z);
                closeCharacterGrip(skeleton, "Right", thumb, thumb, 0.8, 0.035);
                residual = pointCharacterIndex(skeleton, "Right", target, 0.95 * approach);
            }
            skeleton.set_meta("tabletTapResidual", residual ?? -1);
        }
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
