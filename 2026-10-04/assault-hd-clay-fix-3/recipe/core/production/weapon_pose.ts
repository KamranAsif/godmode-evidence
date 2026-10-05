import { Basis, Node3D, Quaternion, Transform3D, Vector3 } from "godot";
import { Weapon } from "../packages/game-rules/src/match";
import { HandGrip, WEAPON_HOLD_POSES, WEAPON_PRESENTATION, WORLD_GRIP_QUATERNION } from "./weapon_catalog";

export type PresentedWeapon = Weapon;

const rightPalmTarget = new Vector3(-0.004707, 0.065829, -0.006961);
const SOCKET_SCALE = new Vector3();
const SOCKET_POSITION = new Vector3();
const WORLD_GRIP = new Quaternion(...WORLD_GRIP_QUATERNION);
const BORE_ROLL = new Quaternion();

/**
 * The frame every weapon model is imported into: -Z along the bore toward the
 * muzzle, +Y up toward the sights. See tools/assets/build-meshy-weapons.py, which
 * puts each model into it.
 */
const canonicalBore = (): Vector3 => new Vector3(0, 0, -1);

/**
 * A weapon's bore direction, as a unit vector in its muzzle socket's own
 * frame — which is the frame anything hung off that socket is placed in.
 *
 * Read from the model's socket pair rather than assumed, for the same reason
 * game_world.ts's pose solvers read it: a model is free to say where its
 * barrel points, and the runtime should have no opinion. Every model this
 * project ships is exported into the canonical frame, so this returns -Z for
 * all of them today; the point is that a re-export which changed that would
 * move the effects with it instead of leaving them behind.
 *
 * Butt to muzzle, which is the same pair and the same order those solvers
 * use, so the flash comes out along the axis they aim the weapon down rather
 * than along a second, slightly different idea of the bore. The butt sits a
 * centimetre under the bore line, which tilts that axis by a degree or two;
 * being co-linear with the aim matters more than the tilt does.
 *
 * Null when the model carries neither of the sockets that define the bore,
 * in which case callers fall back to the canonical direction.
 */
export function muzzleBoreDirection(model: Node3D): Vector3 | null {
    const muzzle = findNamedNode(model, "MuzzleSocket");
    const rear = findNamedNode(model, "ButtSocket") ?? findNamedNode(model, "SlideRearSocket");
    if (!muzzle || !rear) return null;
    const muzzleFromModel = transformRelativeTo(muzzle, model);
    const rearOrigin = transformRelativeTo(rear, model).origin;
    const bore = new Vector3(muzzleFromModel.origin.x - rearOrigin.x, muzzleFromModel.origin.y - rearOrigin.y, muzzleFromModel.origin.z - rearOrigin.z);
    if (bore.length_squared() < 1e-10) return null;
    // Into the muzzle socket's frame: the flash is that socket's child, so its
    // position and rotation are read there rather than in the model's frame.
    const inSocket = Basis.MULTIPLY(muzzleFromModel.basis.inverse(), bore);
    return inSocket.length_squared() < 1e-10 ? null : inSocket.normalized();
}

/**
 * Puts a muzzle flash the model's own bore-length past its muzzle socket, and
 * turns it so its local -Z runs down the barrel.
 *
 * Both halves matter. The offset keeps the effect's entire volume beyond the
 * crown rather than centred inside it, and the rotation is what lets the
 * flash's bore-aligned children (the crossed streak planes in combat_vfx.ts)
 * be laid out once, canonically, instead of carrying a per-weapon sign.
 *
 * The rotation only ever pitches and yaws, so `randomizeMuzzleFlash`, which
 * rewrites the Z euler and keeps X and Y, still rolls the flash about the
 * bore it was aimed down.
 */
export function placeMuzzleFlash(flash: Node3D, model: Node3D, weapon: PresentedWeapon, presentation: "firstPerson" | "world" = "firstPerson"): void {
    const definition = WEAPON_PRESENTATION[weapon];
    const standoff =
        presentation === "world" ? (definition.worldMuzzleFlashStandoffMeters ?? definition.muzzleFlashStandoffMeters) : definition.muzzleFlashStandoffMeters;
    const bore = muzzleBoreDirection(model) ?? canonicalBore();
    // `new Quaternion(from, to)` takes Godot's degenerate branch when the two
    // are exactly antiparallel, and one shipped model reaches it: the Daemon's
    // code-authored pistol bores along +Z (SlideRearSocket z = -0.155, muzzle
    // z = +0.181, unrotated), exactly opposite canonical -Z. Godot resolves
    // that to a 180-degree turn about an arbitrary perpendicular axis, which
    // happens to be correct here only because the flash geometry is symmetric
    // about its bore. Tilt that authored pair even slightly off-axis and a
    // different branch runs, silently. Left as-is rather than special-cased,
    // because the fix belongs in the authored sockets, but noted so the next
    // person to touch either does not have to rediscover it. See #204.
    flash.quaternion = new Quaternion(canonicalBore(), bore);
    flash.position = new Vector3(bore.x * standoff, bore.y * standoff, bore.z * standoff);
}

function findNamedNode(root: Node3D, name: string): Node3D | null {
    if (String(root.get_name()) === name) return root;
    for (const child of root.get_children()) {
        if (!(child instanceof Node3D)) continue;
        const found = findNamedNode(child, name);
        if (found) return found;
    }
    return null;
}

function transformRelativeTo(socket: Node3D, root: Node3D): Transform3D {
    // Value-property reads already return copies; another constructor only
    // spends an external-pointer-table entry on the identical transform.
    let relative = socket.transform;
    let parent = socket.get_parent();
    while (parent instanceof Node3D && parent !== root) {
        relative = Transform3D.MULTIPLY(parent.transform, relative);
        parent = parent.get_parent();
    }
    if (parent !== root) throw new Error(`Weapon socket ${String(socket.get_name())} is not below ${String(root.get_name())}`);
    return relative;
}

/**
 * Align a model-owned semantic socket to a rig-owned target pose. Both the
 * socket offset and its authored rotation participate, so replacement models
 * need only provide the same socket contract instead of adding model-specific
 * runtime offsets.
 */
export function alignSocketToPose(node: Node3D, socketName: string, targetPosition: Vector3, targetQuaternion: Quaternion, scale = 1): Node3D {
    const socket = findNamedNode(node, socketName);
    if (!socket) throw new Error(`${String(node.get_name())} is missing its required ${socketName}`);
    const socketFromNode = transformRelativeTo(socket, node);
    node.position = Vector3.ZERO;
    node.quaternion = Quaternion.MULTIPLY(targetQuaternion, socketFromNode.basis.get_rotation_quaternion().inverse());
    SOCKET_SCALE.x = scale;
    SOCKET_SCALE.y = scale;
    SOCKET_SCALE.z = scale;
    node.scale = SOCKET_SCALE;
    const transformedSocket = Transform3D.MULTIPLY(node.transform, socketFromNode.origin);
    SOCKET_POSITION.x = targetPosition.x - transformedSocket.x;
    SOCKET_POSITION.y = targetPosition.y - transformedSocket.y;
    SOCKET_POSITION.z = targetPosition.z - transformedSocket.z;
    node.position = SOCKET_POSITION;
    return socket;
}

/**
 * The rotation from a weapon's canonical frame into the right hand holding
 * its grip, built from the grip socket pair (palm) and the hold (fingers).
 *
 * The rig's right hand runs +X out the back of the hand, +Y from wrist to
 * fingertips and +Z past the thumb; with the palm facing from the grip socket
 * to its close socket and the fingers along the hold's direction, that frame
 * is fully determined, and inverting it gives the weapon in hand space, which
 * is the form alignSocketToPose wants. Returned in the node's own frame, which
 * is the canonical one — the sockets are its direct children.
 */
export function firingHandQuaternion(node: Node3D, grip: HandGrip): Quaternion | null {
    return weaponPalmFrame(node, "Right", grip)?.basis.inverse().get_rotation_quaternion() ?? null;
}

/**
 * The palm frames already solved, by the gun node they belong to and the side.
 *
 * A palm frame is a function of the gun's own socket pair and a constant hold,
 * so it is the same answer every time it is asked for a given gun -- and it was
 * asked twice a soldier on every drawn frame. Each solve binds about fifteen
 * engine values, and under GodotJS every one of those takes an entry in V8's
 * external-pointer table, which fills and kills the process (#329). Solving it
 * once a gun and keeping the answer costs a bounded handful of bindings instead
 * of thirty a body a frame.
 *
 * Keyed by instance id rather than the node, so nothing here keeps a freed gun
 * alive, and cleared wholesale past `PALM_FRAME_CACHE_MAX` -- a run builds a new
 * gun for every soldier it spawns, and re-solving after a clear is one frame's
 * work for the bodies then on screen.
 */
const palmFrames = new Map<string, Transform3D | null>();
const PALM_FRAME_CACHE_MAX = 256;

/**
 * Anatomical palm frame in weapon coordinates, derived from its grip pair.
 * Solved once per gun.
 *
 * **The value is shared and must not be written to.** Every caller for a given
 * gun and side is handed the same `Transform3D`, so a caller that rolls or
 * offsets it in place changes the frame for every frame after it. That is the
 * support hand winding round the bore while the player sprinted after #334: the
 * first-person solve rolled this basis by the sprint roll on every drawn frame.
 * Build a fit into a transform of your own instead.
 */
export function weaponPalmFrame(node: Node3D, side: "Left" | "Right", grip: HandGrip): Transform3D | null {
    const key = `${node.get_instance_id()}:${side}:${grip.fingerDirection.join(",")}`;
    const held = palmFrames.get(key);
    if (held !== undefined) return held;
    const solved = solveWeaponPalmFrame(node, side, grip);
    if (palmFrames.size >= PALM_FRAME_CACHE_MAX) palmFrames.clear();
    palmFrames.set(key, solved);
    return solved;
}

function solveWeaponPalmFrame(node: Node3D, side: "Left" | "Right", grip: HandGrip): Transform3D | null {
    const socket = findNamedNode(node, `${side}GripSocket`);
    const close = findNamedNode(node, `${side}GripCloseSocket`);
    if (!socket || !close) {
        // A re-imported model missing its grip pair falls back to the generic
        // world grip; say so, since the fallback renders a plausible-looking
        // but wrong hand rather than failing.
        console.warn(`${node.get_name()} carries no ${side} grip socket pair`);
        return null;
    }
    const from = transformRelativeTo(socket, node).origin,
        to = transformRelativeTo(close, node).origin;
    const palm = new Vector3(to.x - from.x, to.y - from.y, to.z - from.z);
    if (palm.length_squared() < 1e-10) return null;
    const unit = palm.normalized();
    const sign = side === "Left" ? 1 : -1;
    const back = new Vector3(unit.x * sign, unit.y * sign, unit.z * sign);
    const wanted = new Vector3(...grip.fingerDirection);
    const along = wanted.dot(back);
    const fingers = new Vector3(wanted.x - back.x * along, wanted.y - back.y * along, wanted.z - back.z * along);
    if (fingers.length_squared() < 1e-10) return null;
    const y = fingers.normalized();
    const handInWeapon = new Basis(back, y, back.cross(y));
    return new Transform3D(handInWeapon, from);
}

export function applyHeldWeaponPose(
    node: Node3D,
    weapon: PresentedWeapon,
    presentation: "firstPerson" | "world" = "firstPerson",
    boreRollRadians = 0,
    grip?: HandGrip,
): void {
    // First person derives the hand from the weapon's own grip sockets and the
    // hold's finger direction; nothing about it is a constant. (The world
    // presentation keeps its own value, fitted against the third-person clips.)
    const frameQuaternion =
        presentation === "world"
            ? WORLD_GRIP
            : (firingHandQuaternion(node, grip ?? WEAPON_HOLD_POSES[WEAPON_PRESENTATION[weapon].hold].firingGrip) ?? WORLD_GRIP);
    const halfRoll = boreRollRadians / 2;
    BORE_ROLL.x = 0;
    BORE_ROLL.y = 0;
    BORE_ROLL.z = Math.sin(halfRoll);
    BORE_ROLL.w = Math.cos(halfRoll);
    alignSocketToPose(node, "RightGripSocket", rightPalmTarget, Quaternion.MULTIPLY(frameQuaternion, BORE_ROLL));
}
