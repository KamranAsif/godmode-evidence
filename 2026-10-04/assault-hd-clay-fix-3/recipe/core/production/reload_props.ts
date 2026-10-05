import { Basis, MeshInstance3D, Node3D, Skeleton3D, Transform3D, Vector3 } from "godot";
import type { Weapon } from "../packages/game-rules/src/match";
import { characterPalmGlobalTransform } from "./character_rig";
import { findNamedNode } from "./first_person_pose";
import { reloadHandMotion } from "./reload_hand_motion";
import { reloadShellGrip } from "./reload_shell_grip";
import { hdArmFit } from "./hd_arm_fit";

interface Props {
    socket: Node3D;
    old: Node3D;
    oldLocal: Transform3D;
    carrier: Node3D;
    fresh: Node3D | null;
    grip: Transform3D | null;
    release: Transform3D | null;
    phase: number;
    seated: boolean;
    cycle: number;
}

/** Actual separate weapon meshes, carried by the animated support palm. */
export class ReloadProps {
    private state: Props | null = null;
    private weapon: Node3D | null = null;

    reset(): void {
        const s = this.state;
        if (!s) return;
        if (!s.seated) {
            s.old.reparent(s.socket, false);
            s.old.transform = s.oldLocal;
            s.old.visible = true;
            s.fresh?.queue_free();
        } else s.old.queue_free();
        s.carrier.queue_free();
        if (this.weapon?.has_meta("reloadMagazineOpposingWall")) this.weapon.remove_meta("reloadMagazineOpposingWall");
        this.state = null;
        this.weapon = null;
    }

    update(model: Node3D, weaponId: Weapon, skeleton: Skeleton3D, cameraRoot: Node3D, active: boolean, phase: number): void {
        if (!active) {
            this.reset();
            return;
        }
        if (this.weapon !== model || (this.state && phase < this.state.phase)) this.reset();
        const shells = weaponId === "shotgun";
        if (!this.state) {
            const socket = findNamedNode(model, "MagazineSocket");
            const old = socket && findNamedNode(socket, "Magazine");
            if (!socket || !old) return;
            const carrier = new Node3D();
            carrier.set_name("ReloadHandCarrier");
            cameraRoot.add_child(carrier);
            this.state = { socket, old, oldLocal: old.transform, carrier, fresh: null, grip: null, release: null, phase, seated: false, cycle: -1 };
            this.weapon = model;
        }
        const s = this.state;
        s.phase = phase;
        const hand = characterPalmGlobalTransform(skeleton, "Left");
        if (!hand) return;
        s.carrier.global_transform = hand;
        const motion = reloadHandMotion(phase, shells);
        if (shells) {
            s.old.visible = false;
            if (motion.prop === "shell" && s.cycle !== motion.cycle) {
                s.fresh?.queue_free();
                s.fresh = s.old.duplicate() as Node3D;
                s.fresh.set_name(`FreshShell${motion.cycle}`);
                s.fresh.visible = true;
                s.carrier.add_child(s.fresh);
                s.fresh.transform = reloadShellGrip(s.old, hdArmFit(skeleton, weaponId)!.palmWidth).shellInPalm;
                s.cycle = motion.cycle;
            }
            if (motion.prop === null && s.fresh) {
                s.fresh.queue_free();
                s.fresh = null;
            }
            if (s.fresh && motion.below === 0) {
                s.fresh.global_transform = Transform3D.MULTIPLY(s.socket.global_transform, s.oldLocal);
            }
        } else {
            if (motion.prop === "old" && !s.grip) {
                s.grip = Transform3D.MULTIPLY(hand.affine_inverse(), s.old.global_transform);
                if (s.old instanceof MeshInstance3D) {
                    const bounds = s.old.get_aabb();
                    const wall = Vector3.ADD(bounds.position, Vector3.MULTIPLY(bounds.size, 0.5));
                    wall.x = bounds.position.x + bounds.size.x;
                    // Contact travels with the actual carried magazine, including
                    // the native wrist articulation retained by the grip clamp.
                    model.set_meta("reloadMagazineOpposingWall", Transform3D.MULTIPLY(s.grip, wall));
                }
                s.old.reparent(s.carrier, false);
                s.old.transform = s.grip;
            }
            if (motion.released && !s.release && s.grip) {
                s.release = s.old.global_transform;
                s.old.reparent(cameraRoot, true);
            }
            if (s.release) {
                const t = Math.max(0, phase - 0.34) * 2;
                const fall = new Vector3(-0.45 * t, -0.7 * t - 4.9 * t * t, -0.15 * t);
                s.old.global_transform = new Transform3D(
                    Basis.MULTIPLY(s.release.basis, Basis.from_euler(new Vector3(t * 2, 0, t))),
                    Vector3.ADD(s.release.origin, Basis.MULTIPLY(cameraRoot.global_transform.basis, fall)),
                );
            }
            if (motion.prop === "fresh" && !s.fresh) {
                s.fresh = s.old.duplicate() as Node3D;
                s.fresh.set_name("FreshMagazine");
                s.carrier.add_child(s.fresh);
                s.fresh.transform = s.grip ?? new Transform3D();
            }
            if (s.fresh && !s.seated && phase >= 0.8) {
                const t = Math.max(0, Math.min(1, (phase - 0.8) / 0.04));
                const target = Transform3D.MULTIPLY(s.socket.global_transform, s.oldLocal);
                const current = Transform3D.MULTIPLY(hand, s.grip ?? new Transform3D());
                s.fresh.global_transform = new Transform3D(
                    Basis.from_euler(current.basis.get_rotation_quaternion().slerp(target.basis.get_rotation_quaternion(), t).get_euler()),
                    current.origin.lerp(target.origin, t),
                );
            }
            if (motion.seated && s.fresh && !s.seated) {
                s.old.set_name("DiscardedMagazine");
                s.fresh.reparent(s.socket, false);
                s.fresh.transform = s.oldLocal;
                s.fresh.set_name("Magazine");
                s.seated = true;
            }
        }
        model.set_meta(
            "reloadPropStage",
            JSON.stringify({
                ...motion,
                oldParent: String(s.old.get_parent()?.get_name()),
                freshParent: s.fresh ? String(s.fresh.get_parent()?.get_name()) : null,
            }),
        );
    }
}
