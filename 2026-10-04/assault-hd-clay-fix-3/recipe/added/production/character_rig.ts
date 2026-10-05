import { Basis, Quaternion, Skeleton3D, Transform3D, Vector3 } from "godot";
import { characterBoneName } from "./character_bones";
import { pointOf, xyz } from "./scratch_values";
import { blendFingerRotation, fingerGlobalPose, type FingerRotation } from "./finger_rotation";
import { clampWristRotation, HD_WRIST_CORRECTION_RADIANS } from "./wrist_rotation";

const palms = new WeakMap<Skeleton3D, Map<string, Transform3D>>();
const handContactBones = new WeakMap<Skeleton3D, Map<string, readonly number[]>>();
const RESET_CONTACT = new Transform3D();
function resetHandContact(skeleton: Skeleton3D, side: "Left" | "Right", hand: number): void {
    let sides = handContactBones.get(skeleton);
    if (!sides) {
        sides = new Map();
        handContactBones.set(skeleton, sides);
    }
    let bones = sides.get(side);
    if (!bones) {
        bones = [
            hand,
            ...["Thumb", "Index", "Middle", "Ring", "Pinky"].flatMap((finger) =>
                [1, 2, 3, 4].map((j) => skeleton.find_bone(characterBoneName(`${side}Hand${finger}${j}`))),
            ),
        ].filter((id) => id >= 0);
        sides.set(side, bones);
    }
    for (const bone of bones) skeleton.set_bone_global_pose_override(bone, RESET_CONTACT, 0, false);
    skeleton.force_update_all_bone_transforms();
}

/** Reach a grip with the existing elbow bend and the character's own hand frame. */
export function placeCharacterPalm(
    skeleton: Skeleton3D,
    side: "Left" | "Right",
    target: Transform3D,
    poleDirection?: Vector3,
    matchForearmRoll = false,
    /**
     * Whether to measure how far the palm actually landed from `target`.
     *
     * The first-person hands need it: a reload re-seats the firing hand when it
     * is more than a millimetre out. A soldier's does not -- it is only ever
     * read back by `debug_soldier_grips` -- and measuring it costs five bound
     * engine values a hand a frame, which with a fight's worth of soldiers was
     * a measurable share of everything the client constructed (#330).
     */
    wantResidual = true,
): number | null {
    const palm = characterPalmFrame(skeleton, side);
    const inverse = characterPalmInverse(skeleton, side);
    const hand = skeleton.find_bone(characterBoneName(`${side}Hand`));
    if (!palm || !inverse || hand < 0) return null;
    // A previous contact can pin the hand in global space. Remove that override
    // before solving again, so the forearm measures its native fixed length.
    resetHandContact(skeleton, side, hand);
    const desiredHand = Transform3D.MULTIPLY(target, inverse);
    // The caller measures a stable elbow plane from this rig's idle geometry.
    // Inferring a new pole from each animated wrist rotation switches planes
    // during recoil and gait, although the hand stays on the same weapon.
    if (!solveCharacterLimb(skeleton, `${side}UpperArm`, `${side}LowerArm`, `${side}Hand`, desiredHand.origin, poleDirection)) return null;
    const reachedPose = skeleton.get_bone_global_pose(hand);
    const reached = reachedPose.origin;
    const rollForearm = (): void => {
        if (!matchForearmRoll) return;
        const reachedPose = skeleton.get_bone_global_pose(hand);
        const reached = reachedPose.origin;
        const forearm = skeleton.find_bone(characterBoneName(`${side}LowerArm`));
        if (forearm >= 0) {
            const pose = skeleton.get_bone_global_pose(forearm);
            const axis = Vector3.SUBTRACT(reached, pose.origin).normalized();
            const delta = Quaternion.MULTIPLY(desiredHand.basis.get_rotation_quaternion(), reachedPose.basis.get_rotation_quaternion().inverse()).normalized();
            const along = delta.x * axis.x + delta.y * axis.y + delta.z * axis.z;
            // The twist component changes pronation without moving either joint.
            // A pure 180-degree swing has no defined twist.
            if (along * along + delta.w * delta.w > 1e-10) {
                const sign = delta.w < 0 ? -1 : 1;
                const requestedTwist = 2 * Math.atan2(along * sign, delta.w * sign);
                const hd = skeleton.has_meta("nativeFingerGripWeight");
                const twist = new Basis(axis, hd ? Math.max(-Math.PI / 3, Math.min(Math.PI / 3, requestedTwist)) : requestedTwist);
                PALM_FOREARM_TRANSFORM.basis = Basis.MULTIPLY(twist, pose.basis);
                PALM_FOREARM_TRANSFORM.origin = pose.origin;
                skeleton.set_bone_global_pose_override(forearm, PALM_FOREARM_TRANSFORM, 1, true);
            }
        }
    };
    rollForearm();
    PALM_HAND_TRANSFORM.basis = desiredHand.basis;
    PALM_HAND_TRANSFORM.origin = reached;
    if (skeleton.has_meta("nativeFingerGripWeight")) {
        const parent = skeleton.get_bone_parent(hand);
        const native = skeleton.get_bone_pose_rotation(hand);
        const animated: FingerRotation = [native.x, native.y, native.z, native.w];
        // Clamp in the forearm frame, not world space. The forearm may have
        // swung with IK; its native wrist articulation must travel with it.
        for (let pass = 0; pass < 5; pass++) {
            const forearm = skeleton.get_bone_global_pose(parent);
            const requested = Basis.MULTIPLY(forearm.basis.inverse(), desiredHand.basis).get_rotation_quaternion();
            const limited = clampWristRotation(animated, [requested.x, requested.y, requested.z, requested.w]);
            const numbers = fingerGlobalPose(transformNumbers(forearm), limited, [0, 0, 0], [1, 1, 1]);
            const basis = PALM_HAND_TRANSFORM.basis;
            basis.x = xyz(numbers[0], numbers[1], numbers[2]);
            basis.y = xyz(numbers[3], numbers[4], numbers[5]);
            basis.z = xyz(numbers[6], numbers[7], numbers[8]);
            PALM_HAND_TRANSFORM.basis = basis;
            if (pass < 4) {
                const wrist = Vector3.SUBTRACT(target.origin, Basis.MULTIPLY(basis, palm.origin));
                solveCharacterLimb(skeleton, `${side}UpperArm`, `${side}LowerArm`, `${side}Hand`, wrist, poleDirection);
                rollForearm();
            }
        }
        PALM_HAND_TRANSFORM.origin = skeleton.get_bone_global_pose(hand).origin;
        skeleton.set_meta(`wristCorrectionLimit${side}`, HD_WRIST_CORRECTION_RADIANS);
    }
    skeleton.set_bone_global_pose_override(hand, PALM_HAND_TRANSFORM, 1, true);
    skeleton.force_update_all_bone_transforms();
    if (!wantResidual) return 0;
    return Transform3D.MULTIPLY(skeleton.get_bone_global_pose(hand), palm).origin.distance_to(target.origin);
}

/**
 * The palm frame inverted, kept beside the frame itself.
 *
 * Both are fixed for a rig, and the inverse is wanted on every placement --
 * twice a soldier, twice more for the player's own arms, every drawn frame.
 */
const palmInverses = new WeakMap<Skeleton3D, Map<"Left" | "Right", Transform3D>>();

function characterPalmInverse(skeleton: Skeleton3D, side: "Left" | "Right"): Transform3D | null {
    const held = palmInverses.get(skeleton)?.get(side);
    if (held) return held;
    const palm = characterPalmFrame(skeleton, side);
    if (!palm) return null;
    const inverse = palm.affine_inverse();
    let entries = palmInverses.get(skeleton);
    if (!entries) {
        entries = new Map();
        palmInverses.set(skeleton, entries);
    }
    entries.set(side, inverse);
    return inverse;
}

/**
 * A palm-centred anatomical frame in the native Mixamo hand bone's space.
 *
 * Solved once a rig and kept, so **the value is shared and must not be written
 * to**: every caller for a skeleton and side is handed the same `Transform3D`.
 * A caller that needs to move or roll one builds its own from this (#392).
 */
export function characterPalmFrame(skeleton: Skeleton3D, side: "Left" | "Right"): Transform3D | null {
    const cached = palms.get(skeleton)?.get(side);
    if (cached) return cached;
    const hand = skeleton.find_bone(characterBoneName(`${side}Hand`));
    if (hand < 0) return null;
    const rest = skeleton.get_bone_global_rest(hand);
    const knuckles: Vector3[] = [];
    for (const finger of ["Index", "Middle", "Ring", "Pinky"]) {
        const joint = skeleton.find_bone(`mixamorig_${side}Hand${finger}1`);
        if (joint >= 0) knuckles.push(skeleton.get_bone_global_rest(joint).origin);
    }
    // Mixamo represents closed fists with fewer finger chains. Their hand
    // axis remains usable even when the auto-rigger omitted the knuckles.
    const wrist = rest.origin;
    const knuckle = knuckles.length
        ? new Vector3(
              knuckles.reduce((sum, p) => sum + p.x, 0) / knuckles.length,
              knuckles.reduce((sum, p) => sum + p.y, 0) / knuckles.length,
              knuckles.reduce((sum, p) => sum + p.z, 0) / knuckles.length,
          )
        : new Vector3(wrist.x + rest.basis.y.x * 0.08, wrist.y + rest.basis.y.y * 0.08, wrist.z + rest.basis.y.z * 0.08);
    const fingers = new Vector3(knuckle.x - wrist.x, knuckle.y - wrist.y, knuckle.z - wrist.z);
    if (fingers.length_squared() < 1e-8) return null;
    const y = fingers.normalized();
    const thumb = skeleton.find_bone(`mixamorig_${side}HandThumb2`);
    const thumbPosition =
        thumb >= 0 ? skeleton.get_bone_global_rest(thumb).origin : new Vector3(wrist.x + rest.basis.z.x, wrist.y + rest.basis.z.y, wrist.z + rest.basis.z.z);
    const towardThumb = new Vector3(thumbPosition.x - wrist.x, thumbPosition.y - wrist.y, thumbPosition.z - wrist.z);
    const along = towardThumb.dot(y);
    const z = new Vector3(towardThumb.x - y.x * along, towardThumb.y - y.y * along, towardThumb.z - y.z * along).normalized();
    if (z.length_squared() < 1e-8) return null;
    const x = y.cross(z).normalized();
    // Bone centres lie inside the hand. Put contact on the palm surface so
    // aligning a grip does not bury the hand's thickness inside the weapon.
    const surface = fingers.length() * 0.2 * (side === "Left" ? 1 : -1);
    const palm = new Vector3(
        wrist.x + (fingers.x * 2) / 3 + x.x * surface,
        wrist.y + (fingers.y * 2) / 3 + x.y * surface,
        wrist.z + (fingers.z * 2) / 3 + x.z * surface,
    );
    const frame = Transform3D.MULTIPLY(rest.affine_inverse(), new Transform3D(new Basis(x, y, x.cross(y)), palm));
    let entries = palms.get(skeleton);
    if (!entries) {
        entries = new Map();
        palms.set(skeleton, entries);
    }
    entries.set(side, frame);
    return frame;
}

/** The anatomical palm frame in world space, including the current bone pose. */
export function characterPalmGlobalTransform(skeleton: Skeleton3D, side: "Left" | "Right"): Transform3D | null {
    const palm = characterPalmFrame(skeleton, side);
    const hand = skeleton.find_bone(characterBoneName(`${side}Hand`));
    if (!palm || hand < 0) return null;
    const bone = Transform3D.MULTIPLY(skeleton.global_transform, skeleton.get_bone_global_pose(hand));
    return Transform3D.MULTIPLY(bone, palm);
}

/**
 * The vectors the limb solve hands to the engine, made once.
 *
 * This solve runs twice for every soldier on every drawn frame, and twice more
 * for the player's own arms. It used to build about twenty Vector3s a call for
 * values that never leave the function -- the bones' directions, the elbow's
 * plane, the swing axis -- and under GodotJS each is a JavaScript object bound
 * to an engine value, taking an entry in V8's external-pointer table: the table
 * that fills and kills the process (#329). The arithmetic below is the same, in
 * plain numbers, and only what the engine actually has to be handed goes through
 * these. Three columns, because a Basis is built from three at once.
 */
const COLUMN_X = new Vector3();
const COLUMN_Y = new Vector3();
const COLUMN_Z = new Vector3();
const SWING_FROM = new Vector3();
const SWING_TO = new Vector3();
const SWING_AXIS = new Vector3();
const LIMB_ORIGIN = new Vector3();
const AIM_X = new Vector3();
const AIM_Y = new Vector3();
const AIM_Z = new Vector3();
const AIM_SOURCE_BASIS = new Basis();
const AIM_TARGET_BASIS = new Basis();
const AIM_TRANSFORM = new Transform3D();
const PALM_FOREARM_TRANSFORM = new Transform3D();
const PALM_HAND_TRANSFORM = new Transform3D();

/**
 * Fills one of the scratch vectors and hands it back. **The result must reach
 * the engine, which copies it, before the next call for the same vector**:
 * there is one of each, not one a call. `aim` below writes `LIMB_ORIGIN` on
 * both of its calls and is only safe because `new Transform3D` has copied the
 * first one by then.
 */
const put = (into: Vector3, x: number, y: number, z: number): Vector3 => {
    into.x = x;
    into.y = y;
    into.z = z;
    return into;
};

/** Bend a fixed-length chain in the animation's elbow plane. */
export function solveCharacterLimb(
    skeleton: Skeleton3D,
    rootName: string,
    midName: string,
    tipName: string,
    target: Vector3,
    poleDirection?: Vector3,
): boolean {
    const root = skeleton.find_bone(characterBoneName(rootName)),
        mid = skeleton.find_bone(characterBoneName(midName)),
        tip = skeleton.find_bone(characterBoneName(tipName));
    if (root < 0 || mid < 0 || tip < 0) return false;
    const rootPose = skeleton.get_bone_global_pose(root);
    const midPose = skeleton.get_bone_global_pose(mid);
    const tipPose = skeleton.get_bone_global_pose(tip);
    const a = rootPose.origin,
        b = midPose.origin,
        c = tipPose.origin;
    const ax = a.x,
        ay = a.y,
        az = a.z;
    const upperX = b.x - ax,
        upperY = b.y - ay,
        upperZ = b.z - az;
    const lowerX = c.x - b.x,
        lowerY = c.y - b.y,
        lowerZ = c.z - b.z;
    const upperLength = Math.hypot(upperX, upperY, upperZ),
        lowerLength = Math.hypot(lowerX, lowerY, lowerZ);
    if (upperLength < 1e-5 || lowerLength < 1e-5) return false;
    const toTargetX = target.x - ax,
        toTargetY = target.y - ay,
        toTargetZ = target.z - az;
    const reach = Math.hypot(toTargetX, toTargetY, toTargetZ);
    if (reach < 1e-5) return false;
    // Clamp inside the chain's range so an out-of-reach target straightens
    // the arm rather than producing a degenerate triangle.
    const clamped = Math.min(Math.max(reach, Math.abs(upperLength - lowerLength) + 1e-4), upperLength + lowerLength - 1e-4);
    const directionX = toTargetX / reach,
        directionY = toTargetY / reach,
        directionZ = toTargetZ / reach;
    // Bend toward the caller's pole when it gives one -- an arm holding a
    // weapon out has its elbow below and outside the line, whatever the
    // clip was doing -- and otherwise keep the plane the animation chose:
    // the current elbow's offset from the root-to-tip line.
    const straightX = c.x - ax,
        straightY = c.y - ay,
        straightZ = c.z - az;
    const straightLength = Math.hypot(straightX, straightY, straightZ);
    let poleX = 0,
        poleY = 0,
        poleZ = 0;
    if (poleDirection) {
        const along = poleDirection.x * directionX + poleDirection.y * directionY + poleDirection.z * directionZ;
        poleX = poleDirection.x - directionX * along;
        poleY = poleDirection.y - directionY * along;
        poleZ = poleDirection.z - directionZ * along;
    } else if (straightLength > 1e-5) {
        const nx = straightX / straightLength,
            ny = straightY / straightLength,
            nz = straightZ / straightLength;
        const along = upperX * nx + upperY * ny + upperZ * nz;
        poleX = upperX - nx * along;
        poleY = upperY - ny * along;
        poleZ = upperZ - nz * along;
    }
    if (poleX * poleX + poleY * poleY + poleZ * poleZ < 1e-8) {
        // Any vector off the line will do: the direction with its components
        // rolled round, crossed with it -- (dz, dx, dy) x (dx, dy, dz).
        poleX = directionX * directionZ - directionY * directionY;
        poleY = directionY * directionX - directionZ * directionZ;
        poleZ = directionZ * directionY - directionX * directionX;
        if (poleX * poleX + poleY * poleY + poleZ * poleZ < 1e-8) return false;
    }
    const poleLength = Math.hypot(poleX, poleY, poleZ);
    const poleNx = poleX / poleLength,
        poleNy = poleY / poleLength,
        poleNz = poleZ / poleLength;
    const bendX = directionY * poleNz - directionZ * poleNy,
        bendY = directionZ * poleNx - directionX * poleNz,
        bendZ = directionX * poleNy - directionY * poleNx;
    const bendLength = Math.hypot(bendX, bendY, bendZ);
    if (bendLength * bendLength < 1e-8) return false;
    const bx = bendX / bendLength,
        by = bendY / bendLength,
        bz = bendZ / bendLength;
    let perpX = by * directionZ - bz * directionY,
        perpY = bz * directionX - bx * directionZ,
        perpZ = bx * directionY - by * directionX;
    const perpLength = Math.hypot(perpX, perpY, perpZ) || 1;
    perpX /= perpLength;
    perpY /= perpLength;
    perpZ /= perpLength;
    const cosine = Math.min(1, Math.max(-1, (upperLength * upperLength + clamped * clamped - lowerLength * lowerLength) / (2 * upperLength * clamped)));
    const elbowAlong = upperLength * cosine;
    const elbowOut = upperLength * Math.sin(Math.acos(cosine));
    const elbowX = ax + directionX * elbowAlong + perpX * elbowOut,
        elbowY = ay + directionY * elbowAlong + perpY * elbowOut,
        elbowZ = az + directionZ * elbowAlong + perpZ * elbowOut;
    // Keep the tip inside the fixed-length chain, including unreachable targets.
    const reachedX = ax + directionX * clamped,
        reachedY = ay + directionY * clamped,
        reachedZ = az + directionZ * clamped;
    const newUpperX = elbowX - ax,
        newUpperY = elbowY - ay,
        newUpperZ = elbowZ - az;
    const newLowerX = reachedX - elbowX,
        newLowerY = reachedY - elbowY,
        newLowerZ = reachedZ - elbowZ;
    const nativeHingeX = upperY * lowerZ - upperZ * lowerY,
        nativeHingeY = upperZ * lowerX - upperX * lowerZ,
        nativeHingeZ = upperX * lowerY - upperY * lowerX;
    const solvedHingeX = newUpperY * newLowerZ - newUpperZ * newLowerY,
        solvedHingeY = newUpperZ * newLowerX - newUpperX * newLowerZ,
        solvedHingeZ = newUpperX * newLowerY - newUpperY * newLowerX;
    const nativeHingeSquared = nativeHingeX * nativeHingeX + nativeHingeY * nativeHingeY + nativeHingeZ * nativeHingeZ;
    const solvedHingeSquared = solvedHingeX * solvedHingeX + solvedHingeY * solvedHingeY + solvedHingeZ * solvedHingeZ;
    const aim = (
        pose: Transform3D,
        fromX: number,
        fromY: number,
        fromZ: number,
        toX: number,
        toY: number,
        toZ: number,
        originX: number,
        originY: number,
        originZ: number,
    ): Transform3D | null => {
        const fromSquared = fromX * fromX + fromY * fromY + fromZ * fromZ;
        const toSquared = toX * toX + toY * toY + toZ * toZ;
        if (fromSquared < 1e-10 || toSquared < 1e-10) return null;
        const origin = put(LIMB_ORIGIN, originX, originY, originZ);
        const fromLength = Math.sqrt(fromSquared),
            toLength = Math.sqrt(toSquared);
        if (nativeHingeSquared > 1e-10 && solvedHingeSquared > 1e-10) {
            // Both bones share the elbow's hinge. Independent shortest-arc
            // swings introduce opposing axial rolls as a bent arm straightens,
            // twisting the sleeve closed even though the joint positions fit.
            const nativeHingeLength = Math.sqrt(nativeHingeSquared),
                solvedHingeLength = Math.sqrt(solvedHingeSquared);
            const sourceYx = fromX / fromLength,
                sourceYy = fromY / fromLength,
                sourceYz = fromZ / fromLength;
            const sourceZx = nativeHingeX / nativeHingeLength,
                sourceZy = nativeHingeY / nativeHingeLength,
                sourceZz = nativeHingeZ / nativeHingeLength;
            const targetYx = toX / toLength,
                targetYy = toY / toLength,
                targetYz = toZ / toLength;
            const targetZx = solvedHingeX / solvedHingeLength,
                targetZy = solvedHingeY / solvedHingeLength,
                targetZz = solvedHingeZ / solvedHingeLength;
            let sx = sourceYy * sourceZz - sourceYz * sourceZy,
                sy = sourceYz * sourceZx - sourceYx * sourceZz,
                sz = sourceYx * sourceZy - sourceYy * sourceZx;
            const sourceXLength = Math.hypot(sx, sy, sz) || 1;
            sx /= sourceXLength;
            sy /= sourceXLength;
            sz /= sourceXLength;
            let tx = targetYy * targetZz - targetYz * targetZy,
                ty = targetYz * targetZx - targetYx * targetZz,
                tz = targetYx * targetZy - targetYy * targetZx;
            const targetXLength = Math.hypot(tx, ty, tz) || 1;
            tx /= targetXLength;
            ty /= targetXLength;
            tz /= targetXLength;
            // Keep Godot's exact inverse/multiply path, but reuse the two
            // input frames and the result after the caller hands each pose to
            // Skeleton3D (which copies it). These three values were otherwise
            // rebound four times per drawn frame (#330).
            AIM_SOURCE_BASIS.x = put(AIM_X, sx, sy, sz);
            AIM_SOURCE_BASIS.y = put(AIM_Y, sourceYx, sourceYy, sourceYz);
            AIM_SOURCE_BASIS.z = put(AIM_Z, sourceZx, sourceZy, sourceZz);
            AIM_TARGET_BASIS.x = put(AIM_X, tx, ty, tz);
            AIM_TARGET_BASIS.y = put(AIM_Y, targetYx, targetYy, targetYz);
            AIM_TARGET_BASIS.z = put(AIM_Z, targetZx, targetZy, targetZz);
            const rotation = Basis.MULTIPLY(AIM_TARGET_BASIS, AIM_SOURCE_BASIS.inverse());
            AIM_TRANSFORM.basis = Basis.MULTIPLY(rotation, pose.basis);
            AIM_TRANSFORM.origin = origin;
            return AIM_TRANSFORM;
        }
        const swing = new Quaternion(
            put(SWING_FROM, fromX / fromLength, fromY / fromLength, fromZ / fromLength),
            put(SWING_TO, toX / toLength, toY / toLength, toZ / toLength),
        );
        const axisLength = Math.hypot(swing.x, swing.y, swing.z);
        const angle = 2 * Math.atan2(axisLength, Math.abs(swing.w));
        if (axisLength < 1e-6 || angle < 1e-5) {
            AIM_TRANSFORM.basis = pose.basis;
            AIM_TRANSFORM.origin = origin;
            return AIM_TRANSFORM;
        }
        const sign = swing.w < 0 ? -1 : 1;
        const rotation = new Basis(put(SWING_AXIS, (swing.x / axisLength) * sign, (swing.y / axisLength) * sign, (swing.z / axisLength) * sign), angle);
        AIM_TRANSFORM.basis = Basis.MULTIPLY(rotation, pose.basis);
        AIM_TRANSFORM.origin = origin;
        return AIM_TRANSFORM;
    };
    const newUpper = aim(rootPose, upperX, upperY, upperZ, newUpperX, newUpperY, newUpperZ, ax, ay, az);
    if (!newUpper) return false;
    skeleton.set_bone_global_pose_override(root, newUpper, 1, true);
    const newLower = aim(midPose, lowerX, lowerY, lowerZ, newLowerX, newLowerY, newLowerZ, elbowX, elbowY, elbowZ);
    if (!newLower) return false;
    skeleton.set_bone_global_pose_override(mid, newLower, 1, true);
    skeleton.force_update_all_bone_transforms();
    return true;
}

/**
 * A grip solved once: which bones to override, and where each one sits **in the
 * hand's own frame**.
 *
 * Every finger bone's posed transform is the hand's global pose times something
 * fixed. The curl is a constant angle about an axis of the palm's anatomy, the
 * chain is built from the bones' rest transforms rather than from the clip, and
 * the palm frame rotates with the hand -- so nothing in the whole solve depends
 * on where the hand is, only on which hand it is and which way the thumb is
 * asked to lie. Working that out again for thirty bones on every drawn frame
 * was the single largest source of bound engine values in the game: about nine
 * a bone, 36% of everything the client constructed with nothing on screen at
 * all, measured with a counting harness over the `godot` module.
 *
 * So it is worked out once per hand and per thumb direction, kept as the local
 * transforms below (as plain numbers), and each frame is one multiply a bone.
 */
interface GripPlan {
    readonly bone: number;
    readonly parent: number;
    /** Procedural target in the parent joint's frame, for blending native motion. */
    readonly parentRotation: FingerRotation;
    /** The joint in the hand's frame, as plain numbers: basis columns x, y, z, then the origin. */
    readonly local: readonly number[];
}

/** A transform as twelve numbers, from four reads (the basis's three columns and the origin). */
function transformNumbers(transform: Transform3D): number[] {
    const basis = transform.basis;
    return [...pointOf(basis.x), ...pointOf(basis.y), ...pointOf(basis.z), ...pointOf(transform.origin)];
}

/** What a posed grip joint is written through, made once (scratch_values.ts). */
const GRIP_BASIS = new Basis();
const GRIP_TRANSFORM = new Transform3D();

const gripPlans = new WeakMap<Skeleton3D, Map<string, readonly GripPlan[]>>();

/**
 * The key a plan is kept under: the thumb's direction **in the hand's own
 * frame**, to a thousandth.
 *
 * In the hand's frame it is fixed for a grip. In the skeleton's frame -- which
 * is what the callers pass, because that is what the solve wants -- it turns
 * with the weapon on every breath the viewmodel takes, so keying on it made a
 * new plan every frame and kept every one of them: fifteen bound transforms an
 * entry, for as long as the run lasted. That is the leak in #343, and it was
 * mine, introduced with the cache itself in #341.
 */
const gripKey = (side: string, thumb: readonly number[], tip: readonly number[]): string =>
    `${side}|${thumb.map((value) => value.toFixed(3)).join(",")}|${tip.map((value) => value.toFixed(3)).join(",")}`;

/** `v` in the frame whose basis has columns `m` (nine numbers), i.e. the basis's inverse times `v`. */
function intoFrame(m: readonly number[], v: Vector3): number[] {
    const [ax, ay, az, bx, by, bz, cx, cy, cz] = m;
    // The inverse's rows are the cross products of the columns over the determinant.
    const r0 = [by * cz - bz * cy, bz * cx - bx * cz, bx * cy - by * cx];
    const r1 = [cy * az - cz * ay, cz * ax - cx * az, cx * ay - cy * ax];
    const r2 = [ay * bz - az * by, az * bx - ax * bz, ax * by - ay * bx];
    const det = ax * r0[0] + ay * r0[1] + az * r0[2];
    const [x, y, z] = [v.x, v.y, v.z];
    return [(r0[0] * x + r0[1] * y + r0[2] * z) / det, (r1[0] * x + r1[1] * y + r1[2] * z) / det, (r2[0] * x + r2[1] * y + r2[2] * z) / det];
}

/**
 * How many plans one rig keeps. A hand has one grip per weapon it holds, so a
 * handful covers a run; the cap is what stops a key that somehow still moves
 * from growing without bound a second time.
 */
const GRIP_PLAN_MAX = 16;

/** Pose the native finger chains around a firearm grip after seating the palm. */
export function closeCharacterGrip(
    skeleton: Skeleton3D,
    side: "Left" | "Right",
    thumbDirection: Vector3,
    thumbTipDirection = thumbDirection,
    proceduralWeight = Number(skeleton.get_meta("nativeFingerGripWeight", 1)),
    gripRadius?: number,
): void {
    const weight = Math.max(0, Math.min(1, proceduralWeight));
    if (weight === 0) return;
    const hand = skeleton.find_bone(characterBoneName(`${side}Hand`));
    if (hand < 0) return;
    const handPose = skeleton.get_bone_global_pose(hand);
    // Every soldier holding a gun comes through here every frame, so the hand is read once and
    // the rest is plain numbers: each engine value built per joint was a pointer-table entry.
    const h = transformNumbers(handPose);
    // Keyed on the hand's own frame, where the direction is fixed for a grip.
    const localThumb = intoFrame(h, thumbDirection);
    const key = `${gripKey(side, localThumb, thumbTipDirection === thumbDirection ? localThumb : intoFrame(h, thumbTipDirection))}:${gripRadius ?? "weapon"}`;
    let plans = gripPlans.get(skeleton);
    if (!plans) {
        plans = new Map();
        gripPlans.set(skeleton, plans);
    }
    let plan = plans.get(key);
    if (!plan) {
        const solved = solveGripPlan(skeleton, side, thumbDirection, thumbTipDirection, handPose, gripRadius);
        if (!solved) return;
        plan = solved;
        if (plans.size >= GRIP_PLAN_MAX) plans.clear();
        plans.set(key, plan);
    }
    // Blend local rotations along the chain. Interpolating independently in
    // world space would shorten fingers as their parent joints curl.
    const blended = weight < 1 ? new Map<number, readonly number[]>() : null;
    for (const step of plan) {
        if (blended) {
            // Godot 4 poses already include rest. Read the animated components
            // once, then blend/compose as numbers to avoid the engine-value leak.
            const native = skeleton.get_bone_pose_rotation(step.bone);
            const rotation = blendFingerRotation([native.x, native.y, native.z, native.w], step.parentRotation, weight);
            const parent = blended.get(step.parent) ?? (step.parent === hand ? h : transformNumbers(skeleton.get_bone_global_pose(step.parent)));
            const posed = fingerGlobalPose(
                parent,
                rotation,
                pointOf(skeleton.get_bone_pose_position(step.bone)),
                pointOf(skeleton.get_bone_pose_scale(step.bone)),
            );
            blended.set(step.bone, posed);
            GRIP_BASIS.x = xyz(posed[0], posed[1], posed[2]);
            GRIP_BASIS.y = xyz(posed[3], posed[4], posed[5]);
            GRIP_BASIS.z = xyz(posed[6], posed[7], posed[8]);
            GRIP_TRANSFORM.basis = GRIP_BASIS;
            GRIP_TRANSFORM.origin = xyz(posed[9], posed[10], posed[11]);
            skeleton.set_bone_global_pose_override(step.bone, GRIP_TRANSFORM, 1, true);
            continue;
        }
        const l = step.local;
        // handPose * local: each column of the local basis, and its origin, taken into the hand's frame.
        const column = (x: number, y: number, z: number, w: number) =>
            xyz(h[0] * x + h[3] * y + h[6] * z + h[9] * w, h[1] * x + h[4] * y + h[7] * z + h[10] * w, h[2] * x + h[5] * y + h[8] * z + h[11] * w);
        GRIP_BASIS.x = column(l[0], l[1], l[2], 0);
        GRIP_BASIS.y = column(l[3], l[4], l[5], 0);
        GRIP_BASIS.z = column(l[6], l[7], l[8], 0);
        GRIP_TRANSFORM.basis = GRIP_BASIS;
        GRIP_TRANSFORM.origin = column(l[9], l[10], l[11], 1);
        skeleton.set_bone_global_pose_override(step.bone, GRIP_TRANSFORM, 1, true);
    }
    skeleton.force_update_all_bone_transforms();
}

/** The solve itself, run once a grip: exactly what it always did, recorded in the hand's frame. */
function solveGripPlan(
    skeleton: Skeleton3D,
    side: "Left" | "Right",
    thumbDirection: Vector3,
    thumbTipDirection: Vector3,
    handPose: Transform3D,
    gripRadius?: number,
): readonly GripPlan[] | null {
    const palm = characterPalmFrame(skeleton, side);
    if (!palm) return null;
    const anatomy = Transform3D.MULTIPLY(handPose, palm).basis;
    const inward = side === "Right" ? 1 : -1;
    const intoHand = handPose.affine_inverse();
    const posedBones = new Map<number, Transform3D>();
    const plan: GripPlan[] = [];
    for (const finger of ["Index", "Middle", "Ring", "Pinky", "Thumb"]) {
        const thumb = finger === "Thumb";
        for (let joint = 1; joint <= 3; joint += 1) {
            const bone = skeleton.find_bone(`mixamorig_${side}Hand${finger}${joint}`);
            if (bone < 0) continue;
            const parent = skeleton.get_bone_parent(bone);
            const pose = Transform3D.MULTIPLY(posedBones.get(parent) ?? skeleton.get_bone_global_pose(parent), skeleton.get_bone_rest(bone));
            let basis: Basis;
            if (thumb) {
                const next = skeleton.find_bone(`mixamorig_${side}HandThumb${joint + 1}`);
                if (next < 0) continue;
                const direction = Basis.MULTIPLY(pose.basis, skeleton.get_bone_rest(next).origin).normalized();
                const toward = Vector3.ADD(thumbDirection.lerp(thumbTipDirection, (joint - 1) / 2), Vector3.MULTIPLY(anatomy.x, -inward * 0.1)).normalized();
                const axis = direction.cross(toward);
                basis =
                    axis.length_squared() < 1e-8
                        ? pose.basis
                        : Basis.MULTIPLY(new Basis(axis.normalized(), Math.acos(Math.max(-1, Math.min(1, direction.dot(toward))))), pose.basis);
            } else {
                const next = skeleton.find_bone(`mixamorig_${side}Hand${finger}${joint + 1}`);
                const segment = next >= 0 ? skeleton.get_bone_rest(next).origin.length() : 0.02;
                // The bend follows this finger's segment length and the held cylinder.
                const degrees =
                    gripRadius === undefined
                        ? (side === "Left" ? [35, 35, 25] : [55, 65, 40])[joint - 1]
                        : Math.min(joint === 3 ? 65 : 90, (2 * Math.atan(segment / (2 * Math.max(0.004, gripRadius))) * 180) / Math.PI);
                basis = Basis.MULTIPLY(new Basis(anatomy.z.normalized(), (inward * degrees * Math.PI) / 180), pose.basis);
            }
            const posed = new Transform3D(basis, pose.origin);
            const parentPose = posedBones.get(parent) ?? skeleton.get_bone_global_pose(parent);
            const rotation = Transform3D.MULTIPLY(parentPose.affine_inverse(), posed).basis.get_rotation_quaternion();
            posedBones.set(bone, posed);
            plan.push({
                bone,
                parent,
                parentRotation: [rotation.x, rotation.y, rotation.z, rotation.w],
                local: transformNumbers(Transform3D.MULTIPLY(intoHand, posed)),
            });
        }
    }
    return plan;
}

/** Extend the native index toward a touch point, retaining animated local motion. */
export function pointCharacterIndex(skeleton: Skeleton3D, side: "Left" | "Right", worldTarget: Vector3, weight = 0.9): number | null {
    const ids = [1, 2, 3, 4].map((j) => skeleton.find_bone(characterBoneName(`${side}HandIndex${j}`)));
    if (ids.some((id) => id < 0)) return null;
    const target = Transform3D.MULTIPLY(skeleton.global_transform.affine_inverse(), worldTarget);
    // Global overrides must be removed before the hand moves; otherwise the finger stays pinned in space.
    for (const id of ids) skeleton.set_bone_global_pose_override(id, new Transform3D(), 0, false);
    skeleton.force_update_all_bone_transforms();
    for (let i = 0; i < 3; i++) {
        const pose = skeleton.get_bone_global_pose(ids[i]);
        const next = skeleton.get_bone_global_pose(ids[i + 1]);
        const from = Vector3.SUBTRACT(next.origin, pose.origin).normalized();
        const toward = Vector3.SUBTRACT(target, pose.origin).normalized();
        const axis = from.cross(toward);
        if (axis.length_squared() < 1e-8) continue;
        const angle = Math.acos(Math.max(-1, Math.min(1, from.dot(toward))));
        const parent = skeleton.get_bone_global_pose(skeleton.get_bone_parent(ids[i]));
        const desired = Basis.MULTIPLY(parent.basis.inverse(), Basis.MULTIPLY(new Basis(axis.normalized(), angle), pose.basis)).get_rotation_quaternion();
        const rotation = skeleton.get_bone_pose_rotation(ids[i]).slerp(desired, Math.max(0, Math.min(1, weight)));
        const local = new Transform3D(Basis.from_euler(rotation.get_euler()), skeleton.get_bone_pose_position(ids[i]));
        skeleton.set_bone_global_pose_override(ids[i], Transform3D.MULTIPLY(parent, local), 1, true);
        skeleton.force_update_all_bone_transforms();
    }
    return skeleton.get_bone_global_pose(ids[3]).origin.distance_to(target);
}
