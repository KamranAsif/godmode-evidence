"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeldObjectArms = void 0;
exports.poseInsertionHand = poseInsertionHand;
exports.rappelPalmTarget = rappelPalmTarget;
const godot_1 = require("godot");
const character_bones_1 = require("./character_bones");
const character_rig_1 = require("./character_rig");
const hd_arm_fit_1 = require("./hd_arm_fit");
const presentation_1 = require("./presentation");
const facing = godot_1.Basis.from_euler(new godot_1.Vector3(0, Math.PI, 0));
const vector = (v) => new godot_1.Vector3(v[0], v[1], v[2]);
/** Separate native HD arms for a two-handed object while the firearm is hidden. */
class HeldObjectArms {
    constructor(parent) {
        const rig = (0, presentation_1.createCategoryCharacter)("assault", "firstPersonArms", "res://assets/characters/assault-hd/character-assault-hd-arms.glb");
        if (!rig?.skeleton)
            throw new Error("HD held-object arms could not be loaded");
        this.rig = rig;
        rig.root.set_name("HeldObjectArms");
        parent.add_child(rig.root);
    }
    /** Contact on the measured tablet edges, and a right index touch on its UI plane. */
    poseTablet(camera, tablet, approach, press, timeSeconds, referenceWorld) {
        const { rig } = this;
        const skeleton = rig.skeleton;
        rig.sampleAnimation("TPose", timeSeconds);
        rig.animationPlayer.advance(0);
        skeleton.clear_bones_global_pose_override();
        skeleton.force_update_all_bone_transforms();
        const fit = (0, hd_arm_fit_1.hdArmFit)(skeleton, "machineGun");
        const joint = (name) => skeleton.get_bone_global_pose(skeleton.find_bone((0, character_bones_1.characterBoneName)(name))).origin;
        const midpoint = godot_1.Vector3.MULTIPLY(godot_1.Vector3.ADD(joint("LeftUpperArm"), joint("RightUpperArm")), 0.5);
        rig.root.global_transform = godot_1.Transform3D.MULTIPLY(camera.global_transform, new godot_1.Transform3D(facing, godot_1.Vector3.SUBTRACT(vector(fit.shoulderAnchor), godot_1.Basis.MULTIPLY(facing, midpoint))));
        const inverse = skeleton.global_transform.affine_inverse();
        // Bounds measured from #946's model; clearance comes from this rig's palm width.
        const halfWidth = 0.127, backSurface = -0.02538, frontSurface = 0.002075;
        const clampX = halfWidth + fit.palmWidth * 0.57;
        const clampZ = backSurface - fit.palmWidth * 0.2;
        const down = godot_1.Basis.MULTIPLY(inverse.basis, godot_1.Basis.MULTIPLY(camera.global_transform.basis, new godot_1.Vector3(0, -1, 0)));
        const poles = Object.fromEntries(["Left", "Right"].map((side) => [
            side,
            godot_1.Vector3.ADD(godot_1.Vector3.SUBTRACT(joint(`${side}LowerArm`), joint(`${side}UpperArm`)), godot_1.Vector3.MULTIPLY(down, fit.upperLength * 0.35)),
        ]));
        let rightHold = null;
        const poseHand = (side, local, relax = side === "Right" ? approach : 0) => {
            const residual = (0, character_rig_1.placeCharacterPalm)(skeleton, side, godot_1.Transform3D.MULTIPLY(inverse, godot_1.Transform3D.MULTIPLY(referenceWorld, local)), poles[side], true);
            skeleton.set_meta(`tablet${side}Contact`, residual ?? -1);
            curlHand(side, relax);
        };
        const curlHand = (side, relax = side === "Right" ? approach : 0) => {
            const palm = (0, character_rig_1.characterPalmGlobalTransform)(skeleton, side);
            const edge = (side === "Left" ? -1 : 1) * (halfWidth - fit.palmWidth * 0.1);
            const free = godot_1.Basis.MULTIPLY(inverse.basis, palm.basis.z);
            (0, character_rig_1.closeCharacterGrip)(skeleton, side, free, free, 0.9 - relax * 0.1, 0.028 + relax * 0.007);
            if (side === "Right" && rightHold) {
                const freePose = new Map([...rightHold.keys()].map((id) => [
                    id,
                    godot_1.Transform3D.MULTIPLY(skeleton.get_bone_global_pose(skeleton.get_bone_parent(id)).affine_inverse(), skeleton.get_bone_global_pose(id)),
                ]));
                for (const [id, held] of rightHold) {
                    const parent = skeleton.get_bone_global_pose(skeleton.get_bone_parent(id));
                    const freeLocal = freePose.get(id);
                    const q = held.basis.get_rotation_quaternion().slerp(freeLocal.basis.get_rotation_quaternion(), relax);
                    const posed = new godot_1.Transform3D(godot_1.Basis.from_euler(q.get_euler()).scaled(held.basis.get_scale()), held.origin);
                    skeleton.set_bone_global_pose_override(id, godot_1.Transform3D.MULTIPLY(parent, posed), 1, true);
                    skeleton.force_update_all_bone_transforms();
                }
                return;
            }
            const gripOrigin = godot_1.Transform3D.MULTIPLY(referenceWorld, new godot_1.Vector3(side === "Left" ? -clampX : clampX, -0.005, clampZ));
            const opposedPad = godot_1.Vector3.ADD(godot_1.Transform3D.MULTIPLY(referenceWorld, new godot_1.Vector3(edge, -0.036, frontSurface + fit.palmWidth * 0.13)), godot_1.Vector3.SUBTRACT(palm.origin, gripOrigin));
            const thumbContact = (0, character_rig_1.pointCharacterThumb)(skeleton, side, opposedPad, 0.98 * (1 - relax));
            skeleton.set_meta(`tablet${side}ThumbContact`, thumbContact ?? -1);
            const tabletInverse = referenceWorld.affine_inverse();
            for (const finger of ["Index", "Middle", "Ring", "Pinky"]) {
                const ids = [1, 2, 3, 4].map((j) => skeleton.find_bone((0, character_bones_1.characterBoneName)(`${side}Hand${finger}${j}`)));
                const knuckle = godot_1.Transform3D.MULTIPLY(tabletInverse, godot_1.Transform3D.MULTIPLY(skeleton.global_transform, skeleton.get_bone_global_pose(ids[0]))).origin;
                const length = ids.slice(1).reduce((sum, id) => sum + skeleton.get_bone_rest(id).origin.length(), 0);
                const x = (side === "Left" ? -1 : 1) *
                    Math.max(halfWidth - fit.palmWidth * 0.8, Math.min(halfWidth - fit.palmWidth * (finger === "Pinky" ? 0.01 : 0.08), Math.abs(knuckle.x) - length * 0.78));
                const target = godot_1.Vector3.ADD(godot_1.Transform3D.MULTIPLY(referenceWorld, new godot_1.Vector3(x, Math.max(-0.058, Math.min(0.058, knuckle.y)), backSurface - fit.palmWidth * 0.11)), godot_1.Vector3.SUBTRACT(palm.origin, gripOrigin));
                const contact = (0, character_rig_1.seatCharacterFingerPad)(skeleton, side, finger, target, 0.98 * (1 - relax));
                skeleton.set_meta(`tablet${side}${finger}PadContact`, contact ?? -1);
            }
        };
        // The asset's bezel is 0.254 m wide; fingers wrap its edges and thumbs oppose on the front rim.
        poseHand("Left", new godot_1.Transform3D(new godot_1.Basis(new godot_1.Vector3(0, 0, -1), new godot_1.Vector3(1, 0, 0), new godot_1.Vector3(0, -1, 0)), new godot_1.Vector3(-clampX, -0.005, clampZ)));
        const grip = new godot_1.Vector3(clampX, -0.005, clampZ);
        const rightBasis = new godot_1.Basis(new godot_1.Vector3(0, 0, 1), new godot_1.Vector3(-1, 0, 0), new godot_1.Vector3(0, -1, 0));
        poseHand("Right", new godot_1.Transform3D(rightBasis, grip), 0);
        rightHold = new Map();
        for (const finger of ["Thumb", "Index", "Middle", "Ring", "Pinky"])
            for (const j of [1, 2, 3, 4]) {
                const id = skeleton.find_bone((0, character_bones_1.characterBoneName)(`RightHand${finger}${j}`));
                rightHold.set(id, godot_1.Transform3D.MULTIPLY(skeleton.get_bone_global_pose(skeleton.get_bone_parent(id)).affine_inverse(), skeleton.get_bone_global_pose(id)));
            }
        // The finger tip reaches the LAUNCH centre (UI y=236/372) while the left hand supports the tablet.
        const tap = new godot_1.Vector3(0.052, -0.07, 0.043 - 0.01 * press);
        if (approach > 0)
            poseHand("Right", new godot_1.Transform3D(rightBasis, grip.lerp(tap, approach)));
        if (approach > 0) {
            const target = godot_1.Transform3D.MULTIPLY(referenceWorld, new godot_1.Vector3(0, (0.5 - 236 / 372) * 0.124, 0.0014 + 0.004 + 0.012 * (1 - press)));
            let residual = (0, character_rig_1.pointCharacterIndex)(skeleton, "Right", target, 0.95 * approach);
            // Seat the reaching hand from its actual posed fingertip, rather than a guessed finger length.
            const tipBone = skeleton.find_bone((0, character_bones_1.characterBoneName)("RightHandIndex4"));
            for (let pass = 0; pass < 3 && tipBone >= 0; pass++) {
                const tip = godot_1.Transform3D.MULTIPLY(skeleton.global_transform, skeleton.get_bone_global_pose(tipBone)).origin;
                const palm = (0, character_rig_1.characterPalmGlobalTransform)(skeleton, "Right");
                const correction = godot_1.Vector3.MULTIPLY(godot_1.Vector3.SUBTRACT(target, tip), approach);
                const desired = new godot_1.Transform3D(palm.basis, godot_1.Vector3.ADD(palm.origin, correction));
                (0, character_rig_1.placeCharacterPalm)(skeleton, "Right", godot_1.Transform3D.MULTIPLY(inverse, desired), poles.Right, true);
                curlHand("Right");
                residual = (0, character_rig_1.pointCharacterIndex)(skeleton, "Right", target, 0.95 * approach);
            }
            skeleton.set_meta("tabletTapResidual", residual ?? -1);
        }
        // Raise/lower carries the already seated viewmodel as one object. Re-solving
        // a clamp against a tilting tablet makes finger IK choose different folds.
        rig.root.global_transform = godot_1.Transform3D.MULTIPLY(godot_1.Transform3D.MULTIPLY(tablet.global_transform, referenceWorld.affine_inverse()), rig.root.global_transform);
    }
}
exports.HeldObjectArms = HeldObjectArms;
/** Lane D owns rope/door geometry; this helper owns native arm and finger contact. */
function poseInsertionHand(rig, side, desiredWorld, camera, kind, radius = 0.006) {
    const skeleton = rig.skeleton;
    if (!skeleton)
        return null;
    const fit = (0, hd_arm_fit_1.hdArmFit)(skeleton, "machineGun");
    const inverse = skeleton.global_transform.affine_inverse();
    const direction = side === "Left" ? fit?.supportGrip.forearmDirection : fit?.firingGrip.forearmDirection;
    const pole = direction ? godot_1.Basis.MULTIPLY(inverse.basis, godot_1.Basis.MULTIPLY(camera.global_transform.basis, vector(direction))) : undefined;
    const residual = (0, character_rig_1.placeCharacterPalm)(skeleton, side, godot_1.Transform3D.MULTIPLY(inverse, desiredWorld), pole, true);
    const reached = (0, character_rig_1.characterPalmGlobalTransform)(skeleton, side);
    if (!reached)
        return null;
    if (kind === "rope") {
        const center = godot_1.Vector3.ADD(reached.origin, godot_1.Vector3.ADD(godot_1.Vector3.MULTIPLY(reached.basis.y, (fit?.palmWidth ?? 0.075) * 0.28), godot_1.Vector3.MULTIPLY(reached.basis.x, (side === "Left" ? 1 : -1) * (radius + (fit?.palmWidth ?? 0.075) * 0.08))));
        const target = godot_1.Transform3D.MULTIPLY(inverse, center);
        const thumbRoot = skeleton.find_bone((0, character_bones_1.characterBoneName)(`${side}HandThumb1`));
        const thumbMid = skeleton.find_bone((0, character_bones_1.characterBoneName)(`${side}HandThumb2`));
        const thumb = godot_1.Vector3.SUBTRACT(target, skeleton.get_bone_global_pose(thumbRoot).origin).normalized();
        const tip = godot_1.Vector3.SUBTRACT(target, skeleton.get_bone_global_pose(thumbMid).origin).normalized();
        (0, character_rig_1.closeCharacterGrip)(skeleton, side, thumb, tip, 0.92, radius);
    }
    else {
        const thumb = godot_1.Basis.MULTIPLY(inverse.basis, reached.basis.z);
        (0, character_rig_1.closeCharacterGrip)(skeleton, side, thumb, thumb, 0.85, 0.2);
    }
    skeleton.set_meta(`insertion${side}Contact`, residual ?? -1);
    const contact = (0, character_rig_1.characterPalmGlobalTransform)(skeleton, side);
    if (kind !== "rope")
        return contact;
    // Cylinder centre lies inside the curled digits, beyond the palm surface.
    const fingerPad = (fit?.palmWidth ?? 0.075) * 0.08;
    const knuckleOffset = (fit?.palmWidth ?? 0.075) * 0.28;
    return new godot_1.Transform3D(contact.basis, godot_1.Vector3.ADD(contact.origin, godot_1.Vector3.ADD(godot_1.Vector3.MULTIPLY(contact.basis.y, knuckleOffset), godot_1.Vector3.MULTIPLY(contact.basis.x, (side === "Left" ? 1 : -1) * (radius + fingerPad)))));
}
function rappelPalmTarget(rig, camera) {
    const fit = (0, hd_arm_fit_1.hdArmFit)(rig.skeleton, "machineGun");
    if (!fit)
        return null;
    return godot_1.Transform3D.MULTIPLY(camera.global_transform, new godot_1.Transform3D(new godot_1.Basis(new godot_1.Vector3(0, 0, 1), new godot_1.Vector3(1, 0, 0), new godot_1.Vector3(0, 1, 0)), new godot_1.Vector3(-fit.palmWidth * 2.2, -fit.upperLength * 0.3, -fit.lowerLength * 0.95 - fit.upperLength * 0.5)));
}
