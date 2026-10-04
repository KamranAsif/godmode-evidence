import {
    Basis,
    Camera3D,
    Color,
    DirectionalLight3D,
    Environment,
    FileAccess,
    MeshInstance3D,
    Node,
    Node3D,
    OS,
    Quaternion,
    RenderingServer,
    Skeleton3D,
    StandardMaterial3D,
    Transform3D,
    Vector3,
    WorldEnvironment,
} from "godot";
import { createCategoryCharacter, createWeaponModel, type RiggedCharacter } from "../presentation";
import { WeaponView } from "../client/weapon_view";
import { KnifeView } from "../client/knife_view";
import { characterBoneName } from "../character_bones";
import { VIEWMODEL_SCALE, WEAPON_HOLD_POSES, WEAPON_PRESENTATION, weaponAnimation } from "../weapon_catalog";
import { setFirstPersonWeaponCameraSafe } from "../presentation";
import { knifeMotionTime } from "../knife_view_timing";
import { viewmodelRecoilOffset, WEAPON_FEEDBACK } from "../weapon_feedback";
import { hdArmFit } from "../hd_arm_fit";

// Diagnostic fixture only. Calls unchanged production pose solvers and KnifeView.
export default class ClayReview extends Node3D {
    private eye = new Camera3D();
    private side = new Camera3D();
    private rig!: RiggedCharacter;
    private gun!: Node3D;
    private guns = new Map<string, Node3D>();
    private close = new Camera3D();
    private root = new Node3D();
    private knife!: KnifeView;
    private view!: WeaponView;
    private host: any;
    private material = new StandardMaterial3D();
    private baseMs = 0;
    private report: any = {};
    private jobs: any[] = [];
    private pending: any = null;
    private receipts: any[] = [];
    _process(): void {
        if (this.pending) {
            RenderingServer.force_draw(false, 0);
            const error = this.get_viewport()!.get_texture()!.get_image()!.save_png(this.pending.output);
            if (error) throw new Error(`Capture error ${error}`);
            this.receipts.push({ ...this.pending, ...this.report });
            this.pending = null;
        }
        if (this.jobs.length) {
            const job = this.jobs.shift();
            this.pose(job);
            this.eye.fov = 50;
            if (job.camera === "side") this.side.make_current();
            else if (job.camera === "side-close") this.close.make_current();
            else this.eye.make_current();
            this.pending = job;
        } else if (this.receipts.length) {
            const f = FileAccess.open("res://receipts.json", FileAccess.ModeFlags.WRITE);
            f!.store_string(JSON.stringify(this.receipts));
            f!.close();
            this.set_meta("godot_cli_state", JSON.stringify({ complete: true, frames: this.receipts.length }));
            this.set_process(false);
        }
    }
    _ready(): void {
        this.eye.fov = 50;
        this.eye.near = 0.005;
        this.eye.current = true;
        this.add_child(this.eye);
        this.add_child(this.side);
        this.add_child(this.close);
        this.close.fov = 45;
        this.close.near = 0.005;
        this.close.position = new Vector3(-1.05, -0.08, -0.4);
        this.close.look_at(new Vector3(0, -0.28, -0.4));
        this.close.cull_mask = 1048575;
        this.side.fov = 45;
        this.side.near = 0.005;
        this.side.position = new Vector3(-1.9, 0.12, -0.45);
        this.side.look_at(new Vector3(0, -0.25, -0.45));
        this.side.cull_mask = 1048575;
        this.eye.cull_mask = 1048575;
        const e = new Environment();
        e.background_mode = Environment.BGMode.BG_COLOR;
        e.background_color = new Color(0.1, 0.1, 0.1);
        e.ambient_light_source = Environment.AmbientSource.AMBIENT_SOURCE_COLOR;
        e.ambient_light_color = new Color(1, 1, 1);
        e.ambient_light_energy = 0.28;
        const world = new WorldEnvironment();
        world.environment = e;
        this.add_child(world);
        const key = new DirectionalLight3D();
        key.rotation_degrees = new Vector3(-35, -35, 0);
        key.light_energy = 1.3;
        this.add_child(key);
        this.material.albedo_color = new Color(0.52, 0.52, 0.52);
        this.material.roughness = 0.8;
        this.rig = createCategoryCharacter("assault", "firstPersonArms")!;
        if (!this.rig) throw new Error("HD rig did not load");
        this.add_child(this.rig.root);
        this.add_child(this.root);
        this.gun = createWeaponModel("machineGun", "firstPerson")!;
        this.root.add_child(this.gun);
        this.guns.set("machineGun", this.gun);
        this.host = {
            firstPersonVisual: this.rig,
            firstPersonBody: null,
            weaponViewmodel: this.root,
            weaponViewmodels: new Map([["machineGun", this.gun]]),
            aimBlend: 0,
            camera: this.eye,
            reloadPhaseOverride: null,
            localReload: null,
            reloadPresentationBlend: 0,
            lastReloadPhase: 0,
            weaponCalibration: null,
            supportHandContact: null,
            firstPersonReloadInspection: null,
        };
        this.view = new WeaponView(this.host);
        this.knife = new KnifeView(this);
        this.grey(this);
        this.set_meta("godot_cli_state", JSON.stringify({ ready: true }));
    }
    private grey(node: Node): void {
        if (node instanceof MeshInstance3D) node.material_override = this.material;
        for (const child of node.get_children()) this.grey(child);
    }
    private joints(s: Skeleton3D) {
        const data: Record<string, number[]> = {};
        for (const side of ["Left", "Right"])
            for (const name of ["UpperArm", "LowerArm", "Hand", "HandIndex1", "HandMiddle1", "HandThumb1"]) {
                const i = s.find_bone(characterBoneName(side + name));
                if (i < 0) continue;
                const t = s.get_bone_global_pose(i),
                    b = t.basis,
                    o = t.origin;
                data[side + name] = [b.x.x, b.x.y, b.x.z, b.y.x, b.y.y, b.y.z, b.z.x, b.z.y, b.z.z, o.x, o.y, o.z];
            }
        return data;
    }
    private pose(payload: any): void {
        const clip = payload.clip,
            frame = Number(payload.frame),
            time = Number(payload.time);
        const weapon = payload.weapon ?? "machineGun";
        if (!this.guns.has(weapon)) {
            const gun = createWeaponModel(weapon, "firstPerson")!;
            this.root.add_child(gun);
            this.guns.set(weapon, gun);
            this.host.weaponViewmodels.set(weapon, gun);
        }
        for (const [id, gun] of this.guns) gun.visible = id === weapon;
        this.gun = this.guns.get(weapon)!;
        this.rig.root.visible = true;
        this.root.visible = true;
        this.baseMs += 1000;
        this.knife.update(false, true, this.baseMs, null, "assault");
        if (clip === "knife") {
            this.pose({ ...payload, clip: "idle", time: 0, sourceTime: 0 });
            this.baseMs += 1000;
            this.knife.update(true, true, this.baseMs, null, "assault");
            this.knife.update(false, true, this.baseMs + time * 1000, null, "assault");
            const dip = this.knife.gunDip();
            if (dip) {
                this.root.transform = Transform3D.MULTIPLY(dip, this.root.transform);
                this.rig.root.transform = Transform3D.MULTIPLY(dip, this.rig.root.transform);
            }
            this.grey(this);
            const k = (this.knife as any).current;
            const s = k.arms.skeleton as Skeleton3D;
            const corrected = this.joints(s);
            s.clear_bones_global_pose_override();
            k.arms.sampleAnimation("KnifeSlash", knifeMotionTime(time * 1000, k.arms.animationPlayer.get_animation("KnifeSlash").length));
            s.force_update_all_bone_transforms();
            const raw = this.joints(s);
            this.knife.update(false, true, this.baseMs + time * 1000, null, "assault");
            this.report = {
                clip,
                weapon,
                frame,
                time,
                raw,
                corrected,
                sourceTime: knifeMotionTime(time * 1000, k.arms.animationPlayer.get_animation("KnifeSlash").length),
            };
            if (payload.stage === "raw") {
                s.clear_bones_global_pose_override();
                s.force_update_all_bone_transforms();
            }
            return;
        }
        const name = weaponAnimation(
            weapon,
            clip === "reload"
                ? "FirstPersonReload"
                : clip === "sprint" || clip === "running"
                  ? "FirstPersonWalk"
                  : clip.startsWith("firing")
                    ? "FirstPersonShoot"
                    : "FirstPersonIdle",
        );
        const player = this.rig.animationPlayer!,
            s = this.rig.skeleton!;
        s.clear_bones_global_pose_override();
        this.rig.sampleAnimation(name as any, payload.sourceTime ?? time);
        s.force_update_all_bone_transforms();
        const raw = this.joints(s);
        const aim = clip === "ads" ? Math.min(1, time * 7) : clip === "firing-ads" ? 1 : 0;
        this.host.aimBlend = aim;
        this.view.applyFirstPersonWeaponComposition(weapon);
        const v = this.view as any,
            hold = WEAPON_HOLD_POSES[WEAPON_PRESENTATION[weapon as keyof typeof WEAPON_PRESENTATION].hold];
        this.root.scale = new Vector3(VIEWMODEL_SCALE, VIEWMODEL_SCALE, VIEWMODEL_SCALE);
        const rest = v.holdPose(weapon, hold.rest),
            ads = v.socketDrivenAdsPose(weapon, hold.adsEyeRelief, hold.adsBoreRollRadians);
        const sprint = clip === "sprint" ? Math.min(1, time * 6.5) : 0;
        const carry = sprint ? v.holdPose(weapon, hold.sprint) : rest;
        let position = rest.position.lerp(carry.position, sprint).lerp(ads.position, aim),
            rotation = rest.rotation.slerp(carry.rotation, sprint).slerp(ads.rotation, aim);
        if (clip === "swap") {
            const progress = Math.min(1, time / 0.6),
                offset = (1 - progress) ** 3 * 0.82;
            position = Vector3.ADD(position, new Vector3(0, -offset, offset * 0.18));
            rotation = Quaternion.MULTIPLY(rotation, Quaternion.from_euler(new Vector3(offset * -0.22, 0, offset * (weapon === "pistol" ? 0.22 : -0.12))));
        }
        if (clip.startsWith("firing")) {
            const kick = Math.max(0, 1 - time * WEAPON_FEEDBACK[weapon as keyof typeof WEAPON_FEEDBACK].recoil.recoveryPerSecond) ** 2;
            const recoil = viewmodelRecoilOffset(weapon, kick, aim, 1);
            position = Vector3.ADD(position, new Vector3(0, recoil.lift, recoil.travel));
            rotation = Quaternion.MULTIPLY(rotation, Quaternion.from_euler(new Vector3(-recoil.pitchRadians, recoil.yawRadians, 0)));
        }
        if (sprint) {
            // Exact WeaponView.updateWeaponPresentation steady-sprint sway, one stride pair.
            const phase = Number(payload.bobPhase),
                fit = hdArmFit(s, weapon)!,
                pivot = new Vector3(fit.firingTarget[0], fit.firingTarget[1] - fit.upperLength * 0.3, fit.firingTarget[2]);
            const sway = Quaternion.from_euler(
                new Vector3(
                    (Math.sin(phase) * 1.6 * Math.PI * sprint) / 180,
                    (Math.sin(phase * 0.5) * 3.2 * Math.PI * sprint) / 180,
                    (Math.sin(phase * 0.5 + 1.1) * 2.4 * Math.PI * sprint) / 180,
                ),
            );
            position = Vector3.ADD(pivot, Quaternion.MULTIPLY(sway, Vector3.SUBTRACT(position, pivot)));
            rotation = Quaternion.MULTIPLY(sway, rotation);
        }
        this.root.position = position;
        this.root.quaternion = rotation;
        this.host.reloadPhaseOverride = clip === "reload" ? { weapon, phase: payload.phase ?? time / player.get_animation(name)!.length } : null;
        const presented = { category: "assault", weapon, reloading: clip === "reload" };
        v.sprintPoseBlend = sprint;
        v.applyReloadChoreography(weapon, presented, 0.05);
        if (payload.stage === "no-fingers") s.set_meta("nativeFingerGripWeight", 0);
        v.applyFirstPersonArms(weapon, false, presented, 0.05);
        const corrected = this.joints(s);
        s.set_meta("nativeFingerGripWeight", 0.25);
        this.report = {
            clip,
            weapon,
            name,
            frame,
            time,
            sourceTime: payload.sourceTime ?? time,
            aim,
            sprint,
            fit: s.get_meta("hdArmFits", null),
            prop: this.gun.get_meta("reloadPropStage", ""),
            raw,
            corrected,
            contact: this.host.supportHandContact,
            gunTransform: this.root.transform,
        };
        if (payload.stage === "raw") {
            s.clear_bones_global_pose_override();
            s.force_update_all_bone_transforms();
        }
        // Corrected arm solve is identical with finger correction disabled; diagnostic ablation only.
        setFirstPersonWeaponCameraSafe(this.gun, weapon, 1, aim >= 0.4);
        this.grey(this);
    }
    godot_cli_action(request: string): string {
        if (!OS.is_debug_build()) return JSON.stringify({ accepted: false });
        const { name, payload } = JSON.parse(request);
        if (name === "clay_sequence") {
            const f = FileAccess.open(payload.jobs, FileAccess.ModeFlags.READ);
            this.jobs = JSON.parse(f!.get_as_text());
            f!.close();
            this.receipts = [];
            this.set_process(true);
            return JSON.stringify({ accepted: true, total: this.jobs.length });
        }
        if (name === "clay_pose") {
            this.pose(payload);
            this.eye.fov = payload.clip === "knife" ? 75 : 50;
            if (payload.camera === "side") this.side.make_current();
            else this.eye.make_current();
            this.set_meta("godot_cli_state", JSON.stringify(this.report));
            return JSON.stringify({ accepted: true, ...this.report });
        }
        if (name === "capture") {
            RenderingServer.force_draw(false, 0);
            const error = this.get_viewport()!.get_texture()!.get_image()!.save_png(payload.output);
            return JSON.stringify({ accepted: error === 0, error });
        }
        if (name === "clay_info") {
            const p = this.rig.animationPlayer!;
            return JSON.stringify({
                accepted: true,
                fit: this.rig.skeleton!.get_meta("hdArmFits", null),
                clips: Object.fromEntries(
                    ["machineGun", "pistol", "shotgun", "sniperRifle"]
                        .flatMap((w) =>
                            ["FirstPersonReload", "FirstPersonIdle", "FirstPersonWalk", "FirstPersonSprint", "FirstPersonShoot"].map((s) =>
                                weaponAnimation(w as any, s),
                            ),
                        )
                        .concat(["KnifeSlash"])
                        .map((n) => [n, p.get_animation(n)?.length ?? null]),
                ),
            });
        }
        return JSON.stringify({ accepted: false });
    }
}
