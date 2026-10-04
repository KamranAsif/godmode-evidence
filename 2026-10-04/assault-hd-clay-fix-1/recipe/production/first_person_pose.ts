import { Basis, MeshInstance3D, Node3D, Quaternion, Skeleton3D, Transform3D, Vector3 } from "godot";
import { Weapon, WeaponCategory } from "../packages/game-rules/src/match";
import { characterBoneName } from "./character_bones";
import { characterPalmFrame, closeCharacterGrip, placeCharacterPalm } from "./character_rig";
import { FIRST_PERSON_SUPPORT_FITS, PISTOL_NATIVE_HAND_FITS, SUPPORT_GRIP_SOCKET, WEAPON_HOLD_POSES, WEAPON_PRESENTATION } from "./weapon_catalog";
import { weaponPalmFrame } from "./weapon_pose";
import { hdArmFit } from "./hd_arm_fit";
import { reloadContactWeight } from "./wrist_rotation";
import { reloadHandMotion } from "./reload_hand_motion";

/**
 * How the first-person view is framed: where the held gun sits in front of the
 * camera, and how the arms-only rig reaches for it. The game drives this every
 * frame for the local player (`Game.updateWeaponViewmodel`), and the clip
 * browser (tests/fixtures/clip_browser.tscn) uses the same functions so a clip
 * reviewed there is framed exactly as a player would see it.
 *
 * `root` throughout is the camera-mounted viewmodel root the gun hangs under,
 * and `weapon` a gun model placed below it.
 */

export interface ViewmodelPose {
    readonly position: Vector3;
    readonly rotation: Quaternion;
}

export interface HoldPoseSpec {
    readonly gripTarget: readonly [number, number, number];
    readonly boreDirection: readonly [number, number, number];
    readonly boreRollRadians: number;
}

const PERPENDICULAR_SCRATCH = new Vector3();
const BASIS_FROM = new Basis();
const BASIS_TO = new Basis();
const WEAPON_UP_INPUT = new Vector3();
const FORWARD_INPUT = new Vector3();

export function findNamedNode(root: Node3D, name: string): Node3D | null {
    if (String(root.get_name()) === name) return root;
    for (const child of root.get_children()) {
        if (!(child instanceof Node3D)) continue;
        const found = findNamedNode(child, name);
        if (found) return found;
    }
    return null;
}

export function transformRelativeTo(node: Node3D, root: Node3D): Transform3D {
    // A Godot value-property read is already a copied value. Constructing a
    // second Transform3D only rebound that same copy through V8's external-
    // pointer table on every socket read (#330).
    let relative = node.transform;
    let parent = node.get_parent();
    while (parent instanceof Node3D && parent !== root) {
        relative = Transform3D.MULTIPLY(parent.transform, relative);
        parent = parent.get_parent();
    }
    if (parent !== root) throw new Error(`${String(node.get_name())} is not below ${String(root.get_name())}`);
    return relative;
}

/**
 * A weapon's rear and front sockets relative to the viewmodel root, scaled,
 * plus the bore vector between them. Shared by every pose solver so "how do I
 * read a weapon's own geometry" has one implementation, not one per solver.
 */
export function weaponBore(
    root: Node3D,
    weapon: Node3D,
    scale: number,
    rearSocketName: string,
    frontSocketName: string,
): { rear: Vector3; front: Vector3; bore: Vector3 } | null {
    const rear = findNamedNode(weapon, rearSocketName);
    const front = findNamedNode(weapon, frontSocketName);
    if (!rear || !front) return null;
    const scaledRear = Vector3.MULTIPLY(transformRelativeTo(rear, root).origin, scale);
    const scaledFront = Vector3.MULTIPLY(transformRelativeTo(front, root).origin, scale);
    const bore = new Vector3(scaledFront.x - scaledRear.x, scaledFront.y - scaledRear.y, scaledFront.z - scaledRear.z);
    if (bore.length_squared() < 0.000001) return null;
    return { rear: scaledRear, front: scaledFront, bore };
}

/** One named socket's position relative to the viewmodel root. */
export function weaponSocketOffset(root: Node3D, weapon: Node3D, scale: number, socketName: string): Vector3 | null {
    const socket = findNamedNode(weapon, socketName);
    if (!socket) return null;
    return Vector3.MULTIPLY(transformRelativeTo(socket, root).origin, scale);
}

/** The part of `v` at right angles to `axis`, normalized; null if degenerate. */
function perpendicular(v: Vector3, axis: Vector3): Vector3 | null {
    const along = v.dot(axis);
    PERPENDICULAR_SCRATCH.x = v.x - axis.x * along;
    PERPENDICULAR_SCRATCH.y = v.y - axis.y * along;
    PERPENDICULAR_SCRATCH.z = v.z - axis.z * along;
    return PERPENDICULAR_SCRATCH.length_squared() < 1e-9 ? null : PERPENDICULAR_SCRATCH.normalized();
}

/** Rotation carrying one orthonormal frame onto another. */
function basisRotation(fromForward: Vector3, fromUp: Vector3, toForward: Vector3, toUp: Vector3): Quaternion {
    BASIS_FROM.x = fromForward.cross(fromUp).normalized();
    BASIS_FROM.y = fromUp;
    BASIS_FROM.z = fromForward;
    BASIS_TO.x = toForward.cross(toUp).normalized();
    BASIS_TO.y = toUp;
    BASIS_TO.z = toForward;
    return Basis.MULTIPLY(BASIS_TO, BASIS_FROM.inverse()).get_rotation_quaternion();
}

/**
 * The viewmodel root's pose that puts a weapon's firing grip at the hold's
 * camera-local target, with its bore along the hold's direction and cant.
 */
export function firstPersonHoldPose(root: Node3D, weapon: Node3D, scale: number, pose: HoldPoseSpec): ViewmodelPose | null {
    const sockets = weaponBore(root, weapon, scale, "RearSightSocket", "FrontSightSocket");
    const grip = weaponSocketOffset(root, weapon, scale, "RightGripSocket");
    if (!sockets || !grip) return null;
    // Deliberately not alignedPose. That rotates the bore onto its target
    // by the shortest arc, which says nothing about roll — so the further a
    // pose swings the muzzle across the view, the more the weapon quietly
    // rolls onto its side, and the authored cant is added on top of that
    // drift rather than measured from level. Build the rotation from a full
    // basis instead, taking the weapon's own up from its sights (which sit
    // directly above the bore in the canonical frame) and levelling it
    // against the camera's up. Cant then means exactly what it says, for
    // every weapon and every pose.
    const bore = sockets.bore.normalized();
    // Up is the rear sight's offset from the bore line, measured from the
    // butt, which sits on it. It was measured from the firing grip socket
    // until that socket moved onto the grip's right face: three or four
    // centimetres off the centreline there rolled the pistol forty
    // degrees about its bore, and the rifles a few.
    const butt = weaponSocketOffset(root, weapon, scale, "ButtSocket") ?? grip;
    WEAPON_UP_INPUT.x = sockets.rear.x - butt.x;
    WEAPON_UP_INPUT.y = sockets.rear.y - butt.y;
    WEAPON_UP_INPUT.z = sockets.rear.z - butt.z;
    const weaponUp = perpendicular(WEAPON_UP_INPUT, bore);
    FORWARD_INPUT.x = pose.boreDirection[0];
    FORWARD_INPUT.y = pose.boreDirection[1];
    FORWARD_INPUT.z = pose.boreDirection[2];
    const forward = FORWARD_INPUT.normalized();
    const levelUp = perpendicular(Vector3.UP, forward);
    if (!weaponUp || !levelUp) return null;
    const rotation = Quaternion.MULTIPLY(new Quaternion(forward, pose.boreRollRadians), basisRotation(bore, weaponUp, forward, levelUp)).normalized();
    const rotatedGrip = Quaternion.MULTIPLY(rotation, grip);
    return {
        position: new Vector3(pose.gripTarget[0] - rotatedGrip.x, pose.gripTarget[1] - rotatedGrip.y, pose.gripTarget[2] - rotatedGrip.z),
        rotation,
    };
}

/** How closely the solved hands met their grips, for inspection. */
export interface FirstPersonHandContact {
    readonly residual: number;
    readonly firingResidual: number | null;
}

/**
 * Anchor native arms below the camera and solve their palms onto the gun.
 * `rig` is the arms-only body mounted on the camera, `weapon` the
 * visible gun under `root`. While `reloading`, the free hand follows the
 * clip's own motion relative to the firing hand, and `root` is moved if the
 * firing arm cannot reach the grip; otherwise the free hand takes the
 * weapon's support grip, when it has one.
 */
/**
 * The fixed vectors this solve needs, made once.
 *
 * Every one of these was rebuilt on every drawn frame for values that never
 * change -- the rig's half turn, the directions a hold's fingers and forearms
 * lie along, a weapon's support offsets. Under GodotJS each is a JavaScript
 * object bound to an engine value, taking an entry in V8's external-pointer
 * table, and the counting harness put this module at 14% of everything the
 * client constructed in a fight (#330). A direction is keyed by the numbers it
 * came from, so a hold and a weapon share one for the life of the run.
 */
const FACING = Basis.from_euler(new Vector3(0, Math.PI, 0));
const ZERO_OFFSET = new Vector3(0, 0, 0);
const ROLL_AXIS = new Vector3(0, 0, 1);
const BORE_DIRECTION = new Vector3(0, 0, -1);
const RIG_OFFSET = new Vector3();
const RIG_ORIGIN = new Vector3();
const RIG_TRANSFORM = new Transform3D();
const SUPPORT_TRANSFORM = new Transform3D();

const directions = new Map<string, Vector3>();

/**
 * The direction `[x, y, z]` names, built once and shared. Read it; never write
 * to it. A hold and a weapon that name the same numbers get the same vector.
 */
function direction(values: readonly number[] | undefined, fallback: Vector3): Vector3 {
    if (!values) return fallback;
    const key = `${values[0]},${values[1]},${values[2]}`;
    let held = directions.get(key);
    if (!held) {
        held = new Vector3(values[0], values[1], values[2]);
        directions.set(key, held);
    }
    return held;
}

export function solveFirstPersonArms(
    rig: Node3D,
    skeleton: Skeleton3D,
    root: Node3D,
    weapon: Node3D,
    weaponId: Weapon,
    reloading: boolean,
    category: WeaponCategory | null,
    sprintBlend = 0,
    reloadProgress = 0,
): FirstPersonHandContact | null {
    if (hdArmFit(skeleton, weaponId)) return solveHdArms(rig, skeleton, root, weapon, weaponId, reloading, reloadProgress);
    const rightHand = skeleton.find_bone(characterBoneName("RightHand"));
    const palm = characterPalmFrame(skeleton, "Right");
    const hold = WEAPON_HOLD_POSES[WEAPON_PRESENTATION[weaponId].hold];
    const fit = FIRST_PERSON_SUPPORT_FITS[weaponId];
    const nativeFit = weaponId === "pistol" && category ? PISTOL_NATIVE_HAND_FITS[category] : null;
    const grip = weaponPalmFrame(weapon, "Right", hold.firingGrip);
    if (rightHand < 0 || !palm || !grip) return null;
    skeleton.clear_bones_global_pose_override();
    skeleton.force_update_all_bone_transforms();
    // Anchor the shoulder midpoint instead of the animated eye: sprint clips
    // pull the head forward and otherwise drag the arm roots away from the gun.
    const facing = FACING;
    const shoulders = ["LeftUpperArm", "RightUpperArm"].map((name) => skeleton.find_bone(characterBoneName(name)));
    if (shoulders.some((index) => index < 0)) return null;
    const midpoint = Vector3.MULTIPLY(Vector3.ADD(skeleton.get_bone_global_pose(shoulders[0]).origin, skeleton.get_bone_global_pose(shoulders[1]).origin), 0.5);
    const shoulderOffset = Basis.MULTIPLY(facing, midpoint);
    // Reloads lift one clavicle. Keep the higher shoulder below the frame,
    // rather than letting that lift expose an extracted sleeve opening.
    const reloadShoulderDrop = reloading
        ? Math.abs(skeleton.get_bone_global_pose(shoulders[0]).origin.y - skeleton.get_bone_global_pose(shoulders[1]).origin.y) * 0.5
        : 0;
    RIG_OFFSET.x = 0;
    RIG_OFFSET.y = -0.32 - reloadShoulderDrop;
    RIG_OFFSET.z = WEAPON_PRESENTATION[weaponId].hold === "oneHanded" ? -0.16 : -0.36;
    RIG_ORIGIN.x = RIG_OFFSET.x - shoulderOffset.x;
    RIG_ORIGIN.y = RIG_OFFSET.y - shoulderOffset.y;
    RIG_ORIGIN.z = RIG_OFFSET.z - shoulderOffset.z;
    RIG_TRANSFORM.basis = facing;
    RIG_TRANSFORM.origin = RIG_ORIGIN;
    rig.transform = RIG_TRANSFORM;
    // Taken once: it is wanted again for the support hand below.
    const intoSkeleton = skeleton.global_transform.affine_inverse();
    const weaponInSkeleton = Transform3D.MULTIPLY(intoSkeleton, weapon.global_transform);
    const firingTarget = Transform3D.MULTIPLY(weaponInSkeleton, grip);
    // Keep shoulders below the viewport while carrying the imported free
    // hand motion in the firing palm's frame. Translating the entire rig
    // to the gun would expose the cut shoulder when a reload folds an arm.
    const leftHand = skeleton.find_bone(characterBoneName("LeftHand"));
    const leftPalm = characterPalmFrame(skeleton, "Left");
    const nativeRight = Transform3D.MULTIPLY(skeleton.get_bone_global_pose(rightHand), palm);
    let freeHandTarget =
        reloading && leftHand >= 0 && leftPalm
            ? Transform3D.MULTIPLY(
                  firingTarget,
                  Transform3D.MULTIPLY(nativeRight.affine_inverse(), Transform3D.MULTIPLY(skeleton.get_bone_global_pose(leftHand), leftPalm)),
              )
            : null;
    let firingResidual = placeCharacterPalm(
        skeleton,
        "Right",
        firingTarget,
        reloading ? undefined : Basis.MULTIPLY(weaponInSkeleton.basis, direction(hold.firingGrip.forearmDirection, BORE_DIRECTION)),
        true,
    );
    if (reloading && firingResidual !== null && firingResidual > 0.001) {
        // A native reload may ask for more reach than this body's arms have
        // at the viewmodel's eye relief. Keep the gun in the reached palm
        // instead of stretching the arm or leaving a gap under the grip.
        const reached = Transform3D.MULTIPLY(skeleton.get_bone_global_pose(rightHand), palm);
        const correction = Vector3.SUBTRACT(reached.origin, firingTarget.origin);
        root.global_position = Vector3.ADD(root.global_position, Basis.MULTIPLY(skeleton.global_transform.basis, correction));
        if (freeHandTarget) freeHandTarget = new Transform3D(freeHandTarget.basis, Vector3.ADD(freeHandTarget.origin, correction));
        firingResidual = 0;
    }
    let residual: number | null = null;
    if (freeHandTarget) {
        residual = placeCharacterPalm(skeleton, "Left", freeHandTarget);
    } else if (!reloading && hold.supportGrip) {
        const gripFrame = weaponPalmFrame(weapon, "Left", hold.supportGrip);
        const rearSupport = findNamedNode(weapon, SUPPORT_GRIP_SOCKET);
        if (gripFrame && rearSupport) {
            // `weaponPalmFrame` solves a gun's grip frame once and hands the
            // same value back for the life of that gun (#334), so this fit is
            // built into a transform of the solve's own. Rolling that frame in
            // place compounded the sprint's palm roll on every drawn frame:
            // the support hand wound round the bore while the player ran, and
            // stayed wherever it had got to once they stopped. Nothing else
            // caught it because the roll is zero at rest for every gun whose
            // palm only rolls while sprinting.
            let origin = transformRelativeTo(rearSupport, weapon).origin;
            origin = Vector3.ADD(origin, direction(nativeFit?.offset, ZERO_OFFSET));
            origin = Vector3.ADD(origin, Vector3.MULTIPLY(direction(fit.sprintOffset, ZERO_OFFSET), sprintBlend));
            const restRoll = fit.palmRollDegrees ?? 0;
            const roll = ((restRoll + ((fit.sprintPalmRollDegrees ?? restRoll) - restRoll) * sprintBlend) * Math.PI) / 180;
            SUPPORT_TRANSFORM.basis = Basis.MULTIPLY(new Basis(ROLL_AXIS, roll), gripFrame.basis);
            SUPPORT_TRANSFORM.origin = origin;
            const supportPole = direction(hold.supportGrip.forearmDirection, BORE_DIRECTION);
            const elbowPole = supportPole.lerp(direction(fit.sprintForearmDirection ?? hold.supportGrip.forearmDirection, BORE_DIRECTION), sprintBlend);
            residual = placeCharacterPalm(
                skeleton,
                "Left",
                Transform3D.MULTIPLY(Transform3D.MULTIPLY(intoSkeleton, weapon.global_transform), SUPPORT_TRANSFORM),
                Basis.MULTIPLY(weaponInSkeleton.basis, elbowPole),
                true,
            );
        }
    }
    const thumbDirection = Basis.MULTIPLY(weaponInSkeleton.basis, BORE_DIRECTION).normalized();
    // Only the separately reviewed HD rig opts in. Its native finger tracks
    // remain dominant; a small correction seats them around each weapon.
    const fingerGripWeight = Number(skeleton.get_meta("nativeFingerGripWeight", 1));
    closeCharacterGrip(skeleton, "Right", thumbDirection, thumbDirection, fingerGripWeight);
    if (!reloading && hold.supportGrip) {
        const supportThumb = Basis.MULTIPLY(weaponInSkeleton.basis, direction(nativeFit?.thumbDirection ?? fit.thumbDirection, BORE_DIRECTION)).normalized();
        const supportThumbTip = fit.thumbTipDirection
            ? Basis.MULTIPLY(weaponInSkeleton.basis, direction(fit.thumbTipDirection, BORE_DIRECTION)).normalized()
            : supportThumb;
        closeCharacterGrip(skeleton, "Left", supportThumb, supportThumbTip, fingerGripWeight);
    }
    return { residual: residual ?? 0, firingResidual };
}

/** Geometry-derived fit; palm seating fades while native reload motion plays. */
function solveHdArms(
    rig: Node3D,
    skeleton: Skeleton3D,
    root: Node3D,
    weapon: Node3D,
    weaponId: Weapon,
    reloading: boolean,
    phase: number,
): FirstPersonHandContact | null {
    const fit = hdArmFit(skeleton, weaponId)!;
    skeleton.clear_bones_global_pose_override();
    skeleton.force_update_all_bone_transforms();
    const joint = (name: string) => skeleton.get_bone_global_pose(skeleton.find_bone(characterBoneName(name)));
    const palm = (side: "Left" | "Right") => Transform3D.MULTIPLY(joint(side + "Hand"), characterPalmFrame(skeleton, side)!);
    const shoulders = Vector3.MULTIPLY(Vector3.ADD(joint("LeftUpperArm").origin, joint("RightUpperArm").origin), 0.5);
    rig.transform = new Transform3D(FACING, Vector3.SUBTRACT(direction(fit.shoulderAnchor, ZERO_OFFSET), Basis.MULTIPLY(FACING, shoulders)));
    const firingFrame = weaponPalmFrame(weapon, "Right", fit.firingGrip);
    if (!firingFrame) return null;
    const firingWorld = Transform3D.MULTIPLY(weapon.global_transform, firingFrame);
    const nativePair = Transform3D.MULTIPLY(palm("Right").affine_inverse(), palm("Left"));
    const nativeWeight = reloading ? reloadContactWeight(phase) : 0;
    const inverse = skeleton.global_transform.affine_inverse();
    const target = Transform3D.MULTIPLY(inverse, firingWorld);
    const cameraBasis = rig.get_parent() instanceof Node3D ? (rig.get_parent() as Node3D).global_transform.basis : new Basis();
    const pole = (side: "Left" | "Right") =>
        Basis.MULTIPLY(
            inverse.basis,
            Basis.MULTIPLY(cameraBasis, direction((side === "Left" ? fit.supportGrip : fit.firingGrip).forearmDirection, BORE_DIRECTION)),
        );
    let firingResidual = 0;
    {
        const native = palm("Right");
        const blend = 1 - nativeWeight;
        const seated = new Transform3D(
            Basis.from_euler(native.basis.get_rotation_quaternion().slerp(target.basis.get_rotation_quaternion(), blend).get_euler()),
            target.origin,
        );
        firingResidual = placeCharacterPalm(skeleton, "Right", seated, reloading ? undefined : pole("Right"), !reloading) ?? 0;
    }
    if (reloading && firingResidual > 0.001) {
        const correction = Vector3.SUBTRACT(palm("Right").origin, target.origin);
        root.global_position = Vector3.ADD(root.global_position, Basis.MULTIPLY(skeleton.global_transform.basis, correction));
        firingResidual = 0;
    }
    let residual = 0;
    if (reloading) {
        const socket = findNamedNode(weapon, "MagazineSocket");
        if (socket) {
            const motion = reloadHandMotion(phase, weaponId === "shotgun");
            const native = palm("Left");
            const camera = root.get_parent() instanceof Node3D ? (root.get_parent() as Node3D) : root;
            const below = Transform3D.MULTIPLY(camera.global_transform, new Vector3(-fit.palmWidth * 2, -fit.upperLength * 2.6, -fit.lowerLength * 1.5));
            const magazine = findNamedNode(socket, "Magazine");
            let grip = reloadGripFrames.get(weapon);
            if (!grip) {
                const bounds = magazine instanceof MeshInstance3D ? magazine.get_aabb() : null;
                const center = bounds ? Vector3.ADD(bounds.position, Vector3.MULTIPLY(bounds.size, 0.5)) : new Vector3(0, -fit.palmWidth, 0);
                if (bounds) center.x = bounds.position.x - fit.palmWidth * 0.06;
                grip = new Transform3D(new Basis(new Vector3(-1, 0, 0), new Vector3(0, 0, 1), new Vector3(0, 1, 0)), center);
                reloadGripFrames.set(weapon, grip);
            }
            const worldContact = Transform3D.MULTIPLY(socket.global_transform, grip);
            const atSocket = worldContact.origin;
            const position = Transform3D.MULTIPLY(inverse, atSocket.lerp(below, motion.below));
            const requested = Basis.MULTIPLY(inverse.basis, worldContact.basis);
            const contact = new Transform3D(
                Basis.from_euler(native.basis.get_rotation_quaternion().slerp(requested.get_rotation_quaternion(), motion.contact).get_euler()),
                native.origin.lerp(position, motion.contact),
            );
            if (motion.contact > 0) residual = placeCharacterPalm(skeleton, "Left", contact, undefined, true) ?? 0;
            if (motion.prop) closeCharacterGrip(skeleton, "Left", requested.z, requested.z, 0.75 * motion.contact);
            skeleton.set_meta("reloadHandStage", JSON.stringify(motion));
        }
    } else if (weaponId === "pistol") {
        residual = placeCharacterPalm(skeleton, "Left", Transform3D.MULTIPLY(target, nativePair), pole("Left"), true) ?? 0;
        closeCharacterGrip(skeleton, "Left", target.basis.z);
    } else {
        const frame = weaponPalmFrame(weapon, "Left", fit.supportGrip);
        const rear = findNamedNode(weapon, SUPPORT_GRIP_SOCKET);
        if (frame && rear) {
            const back = transformRelativeTo(rear, weapon).origin;
            const front = frame.origin;
            const distance = front.distance_to(firingFrame.origin);
            const rearDistance = back.distance_to(firingFrame.origin);
            const t = Math.max(0, Math.min(1, (fit.palmSpacing - rearDistance) / Math.max(0.001, distance - rearDistance)));
            const support = new Transform3D(frame.basis, back.lerp(front, t));
            residual =
                placeCharacterPalm(
                    skeleton,
                    "Left",
                    Transform3D.MULTIPLY(inverse, Transform3D.MULTIPLY(weapon.global_transform, support)),
                    pole("Left"),
                    true,
                ) ?? 0;
            closeCharacterGrip(skeleton, "Left", Basis.MULTIPLY(target.basis, BORE_DIRECTION));
        }
    }
    if (nativeWeight < 1) closeCharacterGrip(skeleton, "Right", target.basis.z, target.basis.z, 0.25 * (1 - nativeWeight));
    return { residual, firingResidual };
}

const reloadGripFrames = new WeakMap<Node3D, Transform3D>();
