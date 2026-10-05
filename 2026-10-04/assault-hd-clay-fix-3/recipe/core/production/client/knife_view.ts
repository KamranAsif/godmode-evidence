// The server owns the hit; native camera arms present the immediate press.
import { Basis, GeometryInstance3D, Node, Node3D, Transform3D, Vector3 } from "godot";
import { KNIFE } from "../../packages/game-rules/src/melee_knife";
import { type WeaponCategory } from "../../packages/game-rules/src/match";
import { characterBoneName } from "../character_bones";
import { characterPalmGlobalTransform, placeCharacterPalm } from "../character_rig";
import { hdArmFit } from "../hd_arm_fit";
import { assignViewmodelLayer } from "../game_ui";
import { createCategoryCharacter, type RiggedCharacter } from "../presentation";
import { createProductionOrdnance } from "./production_ordnance";
import { knifeMotionTime, knifeDipWeight, KNIFE_VIEW_DURATION_MS } from "../knife_view_timing";

function noShadows(node: Node): void {
    if (node instanceof GeometryInstance3D) node.cast_shadow = GeometryInstance3D.ShadowCastingSetting.SHADOW_CASTING_SETTING_OFF;
    for (const child of node.get_children()) noShadows(child);
}
export interface KnifeViewSound {
    playLocal(cue: "knife-slash"): void;
}
interface NativeKnife {
    root: Node3D;
    arms: RiggedCharacter;
    knife: Node3D;
}

export class KnifeView {
    private rigs = new Map<WeaponCategory, NativeKnife>();
    private current: NativeKnife | null = null;
    private category: WeaponCategory | null = null;
    private held = false;
    private readyAtMs = 0;
    private beganAtMs = -Infinity;
    private elapsedMs = KNIFE_VIEW_DURATION_MS;
    slashes = 0;
    private lastPress: { allowed: boolean; ready: boolean } | null = null;
    constructor(private readonly camera: Node3D) {}

    private load(category: WeaponCategory): NativeKnife | null {
        const cached = this.rigs.get(category);
        if (cached) return cached;
        const arms = createCategoryCharacter(category, "firstPersonArms", `res://assets/characters/mixamo/character-${category}-knife-arms.glb`);
        if (!arms?.skeleton || !arms.animationPlayer?.has_animation("KnifeSlash")) {
            arms?.root.free();
            return null;
        }
        const root = new Node3D();
        root.set_name(`KnifeViewmodel_${category}`);
        root.visible = false;
        this.camera.add_child(root);
        root.add_child(arms.root);
        const knife = createProductionOrdnance("knife");
        root.add_child(knife);
        assignViewmodelLayer(root);
        noShadows(root);
        const native = { root, arms, knife };
        this.rigs.set(category, native);
        return native;
    }

    update(pressed: boolean, allowed: boolean, nowMs: number, sound: KnifeViewSound | null, category: WeaponCategory): void {
        const press = pressed && !this.held;
        this.held = pressed;
        if (press) this.lastPress = { allowed, ready: nowMs >= this.readyAtMs };
        if (press && allowed && nowMs >= this.readyAtMs) {
            const native = this.load(category);
            if (native) {
                if (this.current) this.current.root.visible = false;
                this.current = native;
                this.category = category;
                this.beganAtMs = nowMs;
                this.readyAtMs = nowMs + KNIFE.cooldownMs;
                this.slashes++;
                console.log(`GODMODE_KNIFE_SLASH=${this.slashes}:KnifeSlash:${category}`);
                sound?.playLocal("knife-slash");
            }
        }
        const native = this.current;
        if (!native) return;
        this.elapsedMs = Math.max(0, nowMs - this.beganAtMs);
        native.root.visible = this.slashing;
        if (!this.slashing) return;
        // Enter and leave below the camera as the gun dips and returns, so
        // the native ready pose never appears or disappears in mid-frame.
        const armFit = hdArmFit(native.arms.skeleton, "machineGun");
        native.root.position = new Vector3(armFit ? armFit.palmWidth * 1.7 : 0, -0.7 * (1 - knifeDipWeight(this.elapsedMs)), 0);
        const skeleton = native.arms.skeleton!;
        skeleton.clear_bones_global_pose_override();
        const length = native.arms.animationPlayer!.get_animation("KnifeSlash")!.length;
        native.arms.sampleAnimation("KnifeSlash", knifeMotionTime(this.elapsedMs, length));
        skeleton.force_update_all_bone_transforms();
        const left = skeleton.find_bone(characterBoneName("LeftUpperArm"));
        const right = skeleton.find_bone(characterBoneName("RightUpperArm"));
        const midpoint = Vector3.MULTIPLY(Vector3.ADD(skeleton.get_bone_global_pose(left).origin, skeleton.get_bone_global_pose(right).origin), 0.5);
        const facing = Basis.from_euler(new Vector3(0, Math.PI, 0));
        const fit = hdArmFit(skeleton, "machineGun");
        const anchor = fit ? new Vector3(...fit.shoulderAnchor) : new Vector3(0, -0.32, -0.2);
        native.arms.root.transform = new Transform3D(facing, Vector3.SUBTRACT(anchor, Basis.MULTIPLY(facing, midpoint)));
        let palm = characterPalmGlobalTransform(skeleton, "Right");
        if (!palm) return;
        // Lift the native hand's complete trajectory into the view, while its
        // cut sleeve remains below the camera. Preserve the hook wrist roll.
        const target = Transform3D.MULTIPLY(skeleton.global_transform.affine_inverse(), palm);
        target.origin = Vector3.ADD(target.origin, new Vector3(0, fit ? fit.lowerLength * 0.6 : 0.2, 0));
        placeCharacterPalm(skeleton, "Right", target);
        palm = characterPalmGlobalTransform(skeleton, "Right")!;
        // Fit the approved black handle (+0.13m behind its guard) to the palm.
        const grip = new Transform3D(Basis.from_euler(new Vector3(0, Math.PI, 0)), new Vector3(0, 0, 0.13));
        native.knife.global_transform = Transform3D.MULTIPLY(palm, grip.affine_inverse());
        native.root.set_meta("knifeElapsedMs", this.elapsedMs);
    }

    get slashing(): boolean {
        return this.current !== null && this.elapsedMs < KNIFE_VIEW_DURATION_MS;
    }
    gunDip(): Transform3D | null {
        if (!this.slashing) return null;
        const fit = hdArmFit(this.current?.arms.skeleton, "machineGun");
        const weight = fit ? Math.max(0, Math.min(1, this.elapsedMs / 80, (KNIFE_VIEW_DURATION_MS - this.elapsedMs) / 150)) : knifeDipWeight(this.elapsedMs);
        return new Transform3D(
            Basis.from_euler(new Vector3(-0.49 * weight, 0.21 * weight, 0)),
            fit
                ? new Vector3(-fit.palmWidth * weight, -fit.upperLength * 1.5 * weight, -fit.lowerLength * 0.3 * weight)
                : new Vector3(0.03 * weight, 0, -0.06 * weight),
        );
    }
    inspect() {
        return {
            loaded: this.current !== null,
            playing: this.slashing,
            clip: "KnifeSlash",
            category: this.category,
            elapsedMs: this.elapsedMs,
            slashes: this.slashes,
            lastPress: this.lastPress,
        };
    }
}
