import { simulationNowMs } from "../simulation_clock";
import { characterPalmFrame } from "../character_rig";
import { characterBoneName } from "../character_bones";
import { Basis, Color, MeshInstance3D, Node3D, Quaternion, ShaderMaterial, Skeleton3D, Time, Transform3D, Vector3 } from "godot";
import { drawDurationMs, Weapon } from "../../packages/game-rules/src/match";
import { projectedSpreadPixels, weaponSpreadRadians } from "../../packages/game-rules/src/weapon_accuracy";
import { CharacterAnimation, setFirstPersonWeaponCameraSafe } from "../presentation";
import type { PlayerSnapshot } from "../../packages/game-rules/src/net/snapshot";
import { RETICLE_REST_GAP_PX, setReticleGap } from "../game_ui";
import { VIEWMODEL_VISUAL_LAYER } from "../render_layers";
import { applyHeldWeaponPose } from "../weapon_pose";
import { hdArmFit } from "../hd_arm_fit";
import { rearWeaponClearance } from "../weapon_grip_geometry";
import { ReloadProps } from "../reload_props";
import { RELOAD_BLEND_OUT_MS, reloadPhase } from "../weapon_reload";
import { SUPPORT_GRIP_SOCKET, VIEWMODEL_SCALE, WEAPON_HOLD_POSES, WEAPON_PRESENTATION, weaponAnimation } from "../weapon_catalog";
import {
    findNamedNode,
    firstPersonHoldPose,
    HoldPoseSpec,
    solveFirstPersonArms,
    transformRelativeTo,
    ViewmodelPose,
    weaponBore as viewmodelBore,
    weaponSocketOffset as viewmodelSocketOffset,
} from "../first_person_pose";
import { randomizeMuzzleFlash } from "../combat_vfx";
import { recoilIntensityForBloom, viewmodelRecoilOffset, WEAPON_FEEDBACK } from "../weapon_feedback";
import { mantlePhase } from "../../packages/game-rules/src/mantle";
import { applyFirstPersonMantle } from "../mantle_presentation";
import type Game from "../game";
import { ADS_TRANSITION_PER_SECOND, clamp, normalizeAngle } from "./game_shared";

/** The shot's pooled light, in the camera's frame: a hand right, a hand down, an arm out. */
const MUZZLE_LIGHT_OFFSET = new Vector3(0.12, -0.1, -0.8);
/** The pink-white of the flash planes. Energy and range are tunable: enough to throw the shot onto nearby walls. */
const MUZZLE_LIGHT_COLOUR = new Color(1, 0.72, 0.69, 1);
const MUZZLE_LIGHT_ENERGY = 1.6;
const MUZZLE_LIGHT_RANGE = 5;

// Tuning for the first-person weapon's pose, moved here from Game with the code that reads it.
const SOCKET_POSE_STABLE_EPSILON = 0.0005;
// 3x the animation system's own worst-case cross-fade (MAXIMUM_BLEND_
// SECONDS = 0.5s in animation_transition.ts) so a solve is never locked
// in mid-blend even under the frame-rate pressure that stretches a
// blend toward that cap in the first place.
const SOCKET_POSE_STABLE_MS = 1500;
const SOCKET_POSE_SETTLE_MS = 300;
const SPRINT_POSE_LOWER_RATE = 6.5;
const SPRINT_POSE_RAISE_RATE = 4.5;
// Peak run-cycle sway of the sprint carry, measured off the reference
// footage: about three degrees of muzzle swing per stride pair, with a
// smaller pitch bob on each individual step.
const SPRINT_SWAY_YAW_RADIANS = (3.2 * Math.PI) / 180;
const SPRINT_SWAY_PITCH_RADIANS = (1.6 * Math.PI) / 180;
const SPRINT_SWAY_ROLL_RADIANS = (2.4 * Math.PI) / 180;
// The stock has to be gone before the aimed pose
// brings it to the near plane, and it has already left the bottom of the
// frame by this point.
const ADS_STOCK_HIDE_BLEND = 0.4;
const FIRST_PERSON_ARM_SOLVE_RATE = 20;
const VIEWMODEL_SCALE_VECTOR = new Vector3(VIEWMODEL_SCALE, VIEWMODEL_SCALE, VIEWMODEL_SCALE);
const CARRIED_POSITION = new Vector3();
const COMPOSED_POSITION = new Vector3();
const VIEWMODEL_POSITION = new Vector3();
const SWAY_EULER = new Vector3();
const RECOIL_EULER = new Vector3();
const SWITCH_EULER = new Vector3();
const CAMERA_AIM_RAY = new Vector3(0, 0, -1);
const swayPivots = new Map<string, Vector3>();

function swayPivot(hold: string, values: readonly number[]): Vector3 {
    let pivot = swayPivots.get(hold);
    if (!pivot) {
        pivot = new Vector3(values[0], values[1], values[2]);
        swayPivots.set(hold, pivot);
    }
    return pivot;
}

/** What WeaponView may reach on the Game node. */
export type WeaponViewHost = Pick<
    Game,
    | "streakTablet"
    | "aimBlend"
    | "aimRequested"
    | "audio"
    | "camera"
    | "cameraBobPhase"
    | "combatVfx"
    | "debugThirdPerson"
    | "firstPersonBody"
    | "firstPersonReloadInspection"
    | "firstPersonVisual"
    | "fixtures"
    | "get_viewport"
    | "hideFirstPersonBody"
    | "hudController"
    | "lastFirstPersonAnimationChangeMs"
    | "lastReloadPhase"
    | "lastSnapshotAtMs"
    | "latestSnapshot"
    | "localPeerId"
    | "localReload"
    | "localShotAnimation"
    | "localSpeedEstimate"
    | "muzzleFlashUntilMs"
    | "muzzleFlashes"
    | "lightPool"
    | "pendingSocketPose"
    | "pitch"
    | "reloadPhaseOverride"
    | "reloadPresentationBlend"
    | "reticle"
    | "sniperScopeOverlay"
    | "socketPoseCache"
    | "supportHandContact"
    | "viewKick"
    | "viewmodelCamera"
    | "viewmodelBlurMaterial"
    | "viewmodelViewport"
    | "weaponCalibration"
    | "weaponMuzzleSockets"
    | "weaponRecoil"
    | "weaponRecoilOverride"
    | "weaponRecoilYawSign"
    | "weaponViewmodel"
    | "weaponViewmodels"
    | "ensureWeaponViewmodel"
    | "world"
    | "yaw"
> &
    Node3D;

/**
 * Poses the first-person weapon and arms from the weapon's own sockets: the
 * hold poses, aim-down-sights, reload choreography, recoil and view kick,
 * ejected shells and the viewmodel's visibility. Presentation only.
 */
export class WeaponView {
    private readonly reloadProps = new ReloadProps();
    constructor(private readonly host: WeaponViewHost) {}

    /** The knife clip's gun dip while a slash plays (client/knife_view.ts), camera-local; null otherwise. */
    knifeDip: (() => Transform3D | null) | null = null;
    knifeSlashing: (() => boolean) | null = null;

    private readonly reloadReferences = new WeakMap<Skeleton3D, Map<string, { palm: Transform3D; head: Vector3 }>>();

    private reloadMotionWeapon: Weapon | null = null;

    private reloadMotion = { rotation: Quaternion.IDENTITY, offset: Vector3.ZERO };

    // Recoil and the draw/switch animation aren't the only transient
    // states a socket read can catch mid-flight — the arm skeleton also
    // cross-fades between animation clips (e.g. the previous weapon's Idle
    // into the new one's) over a short blend, which "settled" alone
    // doesn't account for. Require settled to have held continuously for
    // this long before actually trusting a solve enough to cache it;
    // undefined means the current streak hasn't started (or was just
    // broken) this frame.
    private settledSinceMs: number | undefined = undefined;

    // Which weapon settledSinceMs's streak belongs to — a weapon change
    // must restart the streak even when it doesn't otherwise register as
    // "unsettled" (debug_equip_weapon, for instance, bypasses
    // weaponSwitchEndsAtMs entirely), or a long streak already
    // accumulated by the previous weapon would let the new one's very
    // first frame count as long-settled.
    private settledSinceWeapon: Weapon | null = null;
    /** The first-person rig last searched, and the arms mesh found in it (updateFirstPersonArmVisibility). */
    private armsRoot: Node3D | null = null;
    private armsMesh: Node3D | null = null;

    // How far the weapon has travelled toward (or back from) the lowered
    // sprint carry — 0 is the hip-fire rest pose, 1 the full carry. It drops
    // faster than it comes back up, so starting a sprint reads as immediate
    // while ending one still costs a beat of raise before the sights are
    // usable, which sprintRaiseEndsAtMs already enforces authoritatively.
    private sprintPoseBlend = 0;
    private armSolveElapsed = 1 / FIRST_PERSON_ARM_SOLVE_RATE;
    private armSolveWeapon: Weapon | null = null;
    private armSolveReloading = false;
    /** The gun's grip-relative transform changes only when this composition key changes. */
    private composedWeapon: Weapon | null = null;
    private composedInstanceId = "";
    private composedBoreRoll = Number.NaN;
    private compositionRevision = 0;
    private readonly liveSocketPoses = new Map<string, { readonly revision: number; readonly pose: ViewmodelPose | null }>();

    // Normal renders solve the current socket transforms, including the
    // grip roll that changes while aiming. false uses only a settled cache
    // so leaveToMenu's final render cannot freeze on a transient live read
    // that will never get another frame to self-correct.
    updateWeaponPresentation(delta: number, allowLiveSocketFallback = true): void {
        const localPlayer = this.host.latestSnapshot.players.find((player) => player.id === this.host.localPeerId);
        // This also runs for the final menu render, after aimBlend is reset.
        // Admin blocks and the sniper's scope are not foreground gun ADS.
        const foregroundAim = localPlayer?.alive && !this.host.debugThirdPerson && !this.isSniperScopeActive(localPlayer.weapon) ? this.host.aimBlend : 0;
        this.host.viewmodelBlurMaterial.set_shader_parameter("aim_blend", foregroundAim);
        const localWeapon = localPlayer?.weapon ?? "pistol";
        // The arms are solved with the body at rest; a knife's dip is laid over both once they are.
        if (this.host.firstPersonBody) this.host.firstPersonBody.transform = Transform3D.IDENTITY;
        // A switch to a weapon whose model is still loading waits for it here
        // rather than drawing nothing (#620).
        if (localPlayer) this.host.ensureWeaponViewmodel(localWeapon, true);
        const mantleNow = this.host.latestSnapshot.serverTimeMs + Math.max(0, Time.get_ticks_msec() - this.host.lastSnapshotAtMs);
        const mantleState = localPlayer?.mantle ? mantlePhase(localPlayer.mantle.startedAtMs, mantleNow) : null;
        if (localPlayer?.mantle && this.host.firstPersonVisual && applyFirstPersonMantle(this.host.firstPersonVisual, localPlayer.mantle, mantleNow)) {
            for (const model of this.host.weaponViewmodels.values()) model.visible = false;
            this.host.reticle.root.visible = false;
            return;
        }
        this.updateWeaponViewmodelVisibility(localWeapon);
        const feedback = WEAPON_FEEDBACK[localWeapon];
        this.host.weaponRecoil = this.host.weaponRecoilOverride ?? Math.max(0, this.host.weaponRecoil - delta * feedback.recoil.recoveryPerSecond);
        const viewportHeight = this.host.get_viewport()?.get_visible_rect().size.y ?? 720;
        const projectedSpread = projectedSpreadPixels(localPlayer?.accuracySpreadRadians ?? 0, this.host.camera.fov, viewportHeight);
        setReticleGap(this.host.reticle, clamp(projectedSpread, RETICLE_REST_GAP_PX, viewportHeight * 0.25));
        const kick = this.host.weaponRecoil * this.host.weaponRecoil;
        const definition = WEAPON_PRESENTATION[localWeapon];
        // One scale for the whole arsenal (see VIEWMODEL_SCALE), never one per
        // weapon: models arrive at true size, so this exaggerates all of them
        // together and leaves their relative sizes alone.
        this.host.weaponViewmodel.scale = VIEWMODEL_SCALE_VECTOR;
        const calibration = this.host.weaponCalibration?.weapon === localWeapon ? this.host.weaponCalibration : null;
        const restCalibration = calibration?.appliesTo === "rest" ? calibration : null;
        const aimedCalibration = calibration?.appliesTo === "aimed" ? calibration : null;
        const estimatedServerTimeMs = this.host.latestSnapshot.serverTimeMs + Math.max(0, Time.get_ticks_msec() - this.host.lastSnapshotAtMs);
        const switchProgress =
            localPlayer && localPlayer.weaponSwitchEndsAtMs > estimatedServerTimeMs
                ? clamp(1 - (localPlayer.weaponSwitchEndsAtMs - estimatedServerTimeMs) / drawDurationMs(localWeapon), 0, 1)
                : 1;
        // Only update the settled fallback cache while the arm is idle — never mid-shoot-animation, and
        // never mid-draw (a freshly equipped/swapped-to weapon eases in
        // from below over its drawDurationMs; the grip-aligned
        // node it lives on hasn't settled into its steady-state transform
        // until that finishes either). Movement toggles the arm between
        // FirstPersonIdle and FirstPersonWalk, which cross-fades just as
        // real; require SOCKET_POSE_STABLE_MS since the last actual
        // animation change (lastFirstPersonAnimationChangeMs, tracked
        // wherever that selection happens) so a solve is never sampled
        // mid-blend on that path either.
        const nowMsForSettle = Time.get_ticks_msec();
        const settledThisFrame =
            switchProgress >= 1 &&
            !(this.host.localShotAnimation?.weapon === localWeapon && nowMsForSettle < this.host.localShotAnimation.untilMs) &&
            (this.host.lastFirstPersonAnimationChangeMs === undefined || nowMsForSettle - this.host.lastFirstPersonAnimationChangeMs >= SOCKET_POSE_STABLE_MS);
        if (this.settledSinceWeapon !== localWeapon) {
            this.settledSinceWeapon = localWeapon;
            this.settledSinceMs = undefined;
        }
        if (!settledThisFrame) this.settledSinceMs = undefined;
        else if (this.settledSinceMs === undefined) this.settledSinceMs = nowMsForSettle;
        const settled = settledThisFrame && this.settledSinceMs !== undefined && nowMsForSettle - this.settledSinceMs >= SOCKET_POSE_SETTLE_MS;
        const socketRest = this.cachedSocketPose(localWeapon, "rest", settled, allowLiveSocketFallback, () =>
            this.holdPose(localWeapon, WEAPON_HOLD_POSES[definition.hold].rest),
        );
        // Calibration (including live F9 tuning) only ever overrides one
        // endpoint at a time (see appliesTo above) — the other always
        // resolves through the weapon's real production path, so aiming (or
        // releasing aim) while tuning previews the actual transition
        // instead of freezing on the calibrated pose in both states.
        const rest = restCalibration?.position ?? socketRest?.position ?? Vector3.ZERO;
        // Sprint drops the weapon into a diagonal carry rather than leaving the
        // hip-fire pose on screen while only the arm clip moves. Aiming ends a
        // sprint server-side, so aimBlend and sprintBlend are effectively
        // exclusive; the extra factor below only guarantees the aimed endpoint
        // wins outright during the frames while that round trip lands.
        const sprintTarget = localPlayer?.sprinting === true ? 1 : 0;
        const sprintRate = sprintTarget > this.sprintPoseBlend ? SPRINT_POSE_LOWER_RATE : SPRINT_POSE_RAISE_RATE;
        this.sprintPoseBlend =
            sprintTarget > this.sprintPoseBlend
                ? Math.min(sprintTarget, this.sprintPoseBlend + delta * sprintRate)
                : Math.max(sprintTarget, this.sprintPoseBlend - delta * sprintRate);
        const sprintBlend = this.sprintPoseBlend * (1 - this.host.aimBlend);
        const socketSprint =
            sprintBlend > 0
                ? this.cachedSocketPose(localWeapon, "sprint", settled, allowLiveSocketFallback, () =>
                      this.holdPose(localWeapon, WEAPON_HOLD_POSES[definition.hold].sprint),
                  )
                : null;
        const hold = WEAPON_HOLD_POSES[definition.hold];
        const socketAds = this.cachedSocketPose(localWeapon, "aimed", settled, allowLiveSocketFallback, () =>
            this.socketDrivenAdsPose(localWeapon, hold.adsEyeRelief, hold.adsBoreRollRadians),
        );
        const aimed = aimedCalibration?.position ?? socketAds?.position ?? Vector3.ZERO;
        // Sprint displaces the hip-fire endpoint, then aim blends away from
        // whatever that leaves, so a sprint interrupted by aiming travels
        // straight to the sights instead of back through the rest pose.
        const carried = socketSprint ? CARRIED_POSITION : rest;
        if (socketSprint) {
            CARRIED_POSITION.x = rest.x + (socketSprint.position.x - rest.x) * sprintBlend;
            CARRIED_POSITION.y = rest.y + (socketSprint.position.y - rest.y) * sprintBlend;
            CARRIED_POSITION.z = rest.z + (socketSprint.position.z - rest.z) * sprintBlend;
        }
        COMPOSED_POSITION.x = carried.x + (aimed.x - carried.x) * this.host.aimBlend;
        COMPOSED_POSITION.y = carried.y + (aimed.y - carried.y) * this.host.aimBlend;
        COMPOSED_POSITION.z = carried.z + (aimed.z - carried.z) * this.host.aimBlend;
        const composed = COMPOSED_POSITION;
        // Draw the newly authoritative weapon from below with a short eased roll;
        // weaponReadyAtMs prevents firing before this motion settles.
        const switchEase = 1 - (1 - switchProgress) ** 3;
        const switchOffset = Math.max(1 - switchEase, mantleState?.holstered ?? 0) * 0.82;
        const recoil = viewmodelRecoilOffset(localWeapon, kick, this.host.aimBlend, this.host.weaponRecoilYawSign);
        // Run-cycle sway. The reference swings the muzzle several times
        // farther than the receiver across a stride, so this rotates about the
        // weapon's own firing grip rather than translating the whole viewmodel
        // — the muzzle traces the wide arc and the hand barely moves. Yaw and
        // roll run at half the step cadence (one swing per stride pair) while
        // the pitch bob runs at the full step rate.
        const measured = hdArmFit(this.host.firstPersonVisual?.skeleton, localWeapon);
        const pivot = measured
            ? new Vector3(measured.firingTarget[0], measured.firingTarget[1] - measured.upperLength * 0.3, measured.firingTarget[2])
            : swayPivot(definition.hold, WEAPON_HOLD_POSES[definition.hold].sprint.gripTarget);
        SWAY_EULER.x = Math.sin(this.host.cameraBobPhase) * SPRINT_SWAY_PITCH_RADIANS * sprintBlend;
        SWAY_EULER.y = Math.sin(this.host.cameraBobPhase * 0.5) * SPRINT_SWAY_YAW_RADIANS * sprintBlend;
        SWAY_EULER.z = Math.sin(this.host.cameraBobPhase * 0.5 + 1.1) * SPRINT_SWAY_ROLL_RADIANS * sprintBlend;
        const swayRotation = Quaternion.from_euler(SWAY_EULER);
        const swayed = Vector3.ADD(pivot, Quaternion.MULTIPLY(swayRotation, Vector3.SUBTRACT(composed, pivot)));
        VIEWMODEL_POSITION.x = swayed.x;
        VIEWMODEL_POSITION.y = swayed.y + recoil.lift - switchOffset;
        VIEWMODEL_POSITION.z = swayed.z + recoil.travel + switchOffset * 0.18;
        this.host.weaponViewmodel.position = VIEWMODEL_POSITION;
        const restRotationQuat = restCalibration ? Quaternion.from_euler(restCalibration.viewEulerRadians) : (socketRest?.rotation ?? Quaternion.IDENTITY);
        const aimedRotationQuat = aimedCalibration ? Quaternion.from_euler(aimedCalibration.viewEulerRadians) : (socketAds?.rotation ?? Quaternion.IDENTITY);
        const carriedRotation = socketSprint ? restRotationQuat.slerp(socketSprint.rotation, sprintBlend) : restRotationQuat;
        const composedRotation = carriedRotation.slerp(aimedRotationQuat, this.host.aimBlend);
        RECOIL_EULER.x = -recoil.pitchRadians;
        RECOIL_EULER.y = recoil.yawRadians;
        RECOIL_EULER.z = 0;
        const recoilRotation = Quaternion.from_euler(RECOIL_EULER);
        SWITCH_EULER.x = switchOffset * -0.22;
        SWITCH_EULER.y = 0;
        SWITCH_EULER.z = switchOffset * (localWeapon === "pistol" ? 0.22 : -0.12);
        const switchRotation = Quaternion.from_euler(SWITCH_EULER);
        this.host.weaponViewmodel.quaternion = Quaternion.MULTIPLY(
            Quaternion.MULTIPLY(Quaternion.MULTIPLY(swayRotation, composedRotation), switchRotation),
            recoilRotation,
        );
        this.host.weaponViewmodel.set_meta("weaponSwitchProgress", switchProgress);
        this.host.weaponViewmodel.set_meta("weaponSwitchOffset", switchOffset);
        // Apply native reload motion before solving the camera-mounted arms.
        this.applyReloadChoreography(localWeapon, localPlayer ?? null, delta);
        this.applyFirstPersonArms(localWeapon, calibration !== null, localPlayer ?? null, delta);
        const dip = this.knifeDip?.() ?? null;
        if (dip && this.host.firstPersonBody) {
            this.host.weaponViewmodel.transform = Transform3D.MULTIPLY(dip, this.host.weaponViewmodel.transform);
            this.host.firstPersonBody.transform = dip;
        }

        // The sniper viewmodel is hidden behind its optical overlay in true
        // scope ADS. Keep its flash outside that hidden hierarchy and follow
        // the semantic muzzle socket so firing remains visible and testable.
        const sniperSocket = this.host.weaponMuzzleSockets.get("sniperRifle");
        const sniperFlash = this.host.muzzleFlashes.get("sniperRifle");
        if (sniperSocket && sniperFlash) {
            // Re-pin to the socket at the standoff `placeMuzzleFlash` already
            // solved against the model's bore, rather than restating it here.
            sniperFlash.global_position = Transform3D.MULTIPLY(sniperSocket.global_transform, sniperFlash.position);
        }
    }

    /** Play the native reload on the server's clock and carry the gun with its firing hand. */
    private applyReloadChoreography(weapon: Weapon, localPlayer: PlayerSnapshot | null, delta: number): void {
        const visual = this.host.firstPersonVisual;
        const skeleton = visual?.skeleton;
        const pinned = this.host.reloadPhaseOverride?.weapon === weapon ? this.host.reloadPhaseOverride : null;
        const live = !pinned && this.host.localReload?.weapon === weapon && localPlayer?.reloading ? this.host.localReload : null;
        const active = pinned !== null || live !== null;
        if (pinned) this.host.lastReloadPhase = pinned.phase;
        else if (live) this.host.lastReloadPhase = reloadPhase(simulationNowMs(), live.startedMs, live.durationMs);
        if (this.reloadMotionWeapon !== weapon) {
            this.host.reloadPresentationBlend = 0;
            this.reloadMotionWeapon = weapon;
            this.reloadMotion = { rotation: Quaternion.IDENTITY, offset: Vector3.ZERO };
        }
        this.host.reloadPresentationBlend = active ? 1 : Math.max(0, this.host.reloadPresentationBlend - (delta * 1000) / RELOAD_BLEND_OUT_MS);
        // Always the standing clip. The crouched one folds the whole body, and
        // its palm travels 0.24 m down and pitches the gun 30 degrees relative
        // to the head, which put a long gun below the frame for the whole
        // reload; the camera is what lowers for a crouch.
        const name = weaponAnimation(weapon, "FirstPersonReload") as CharacterAnimation;
        const clip = visual?.animationPlayer?.get_animation(name);
        const palm = skeleton ? characterPalmFrame(skeleton, "Right") : null;
        const hand = skeleton?.find_bone(characterBoneName("RightHand")) ?? -1;
        const head = skeleton?.find_bone(characterBoneName("Head")) ?? -1;
        if (active && visual && skeleton && clip && palm && hand >= 0 && head >= 0) {
            let references = this.reloadReferences.get(skeleton);
            if (!references) {
                references = new Map();
                this.reloadReferences.set(skeleton, references);
            }
            let reference = references.get(name);
            const sample = () => ({
                palm: Transform3D.MULTIPLY(skeleton.get_bone_global_pose(hand), palm),
                head: new Vector3(skeleton.get_bone_global_pose(head).origin),
            });
            if (!reference) {
                visual.sampleAnimation(name, 0);
                skeleton.clear_bones_global_pose_override();
                skeleton.force_update_all_bone_transforms();
                reference = sample();
                references.set(name, reference);
            }
            visual.sampleAnimation(name, clip.length * this.host.lastReloadPhase);
            if (hdArmFit(skeleton, weapon) && this.host.lastReloadPhase > 0.88) {
                const t = Math.max(0, Math.min(1, (this.host.lastReloadPhase - 0.88) / 0.12));
                visual.poseUpperBody(weaponAnimation(weapon, "FirstPersonIdle") as CharacterAnimation, 0, t * t * (3 - 2 * t));
            }
            skeleton.clear_bones_global_pose_override();
            skeleton.force_update_all_bone_transforms();
            const current = sample();
            const facing = Basis.from_euler(new Vector3(0, Math.PI, 0));
            const turn = Basis.MULTIPLY(Basis.MULTIPLY(facing, Basis.MULTIPLY(current.palm.basis, reference.palm.basis.inverse())), facing.inverse());
            const travel = Vector3.SUBTRACT(Vector3.SUBTRACT(current.palm.origin, current.head), Vector3.SUBTRACT(reference.palm.origin, reference.head));
            // The pistol clip pulls its grip toward the chest. At first-person
            // eye relief that full world-space travel crosses the camera plane.
            // Compress only the camera-mounted pair's translation; the native
            // joints, inter-hand motion, and third-person clip stay unmodified.
            const framedTravel = Vector3.MULTIPLY(travel, weapon === "pistol" ? 0.3 : 1);
            this.reloadMotion = { rotation: turn.get_rotation_quaternion(), offset: Basis.MULTIPLY(facing, framedTravel) };
        }
        const blend = this.host.reloadPresentationBlend;
        const rotation = Quaternion.IDENTITY.slerp(this.reloadMotion.rotation, blend);
        const offset = Vector3.MULTIPLY(this.reloadMotion.offset, blend);
        const euler = rotation.get_euler();
        this.host.firstPersonReloadInspection = {
            weapon,
            active,
            pinned: pinned !== null,
            phase: this.host.lastReloadPhase,
            blend,
            choreographed: false,
            pose: {
                supportHandOffset: [0, 0, 0],
                supportHandEulerRadians: [0, 0, 0],
                weaponOffset: [offset.x, offset.y, offset.z],
                weaponEulerRadians: [euler.x, euler.y, euler.z],
            },
        };
        if (blend <= 0) return;
        const viewmodel = this.host.weaponViewmodels.get(weapon);
        const grip = viewmodel ? findNamedNode(viewmodel, "RightGripSocket") : null;
        if (!viewmodel || !grip) return;
        const localPivot = transformRelativeTo(grip, this.host.weaponViewmodel).origin;
        const root = this.host.weaponViewmodel.transform;
        const pivot = Transform3D.MULTIPLY(root, localPivot);
        const turnedBasis = Basis.MULTIPLY(Basis.from_euler(rotation.get_euler()), root.basis);
        const turnedPivot = Basis.MULTIPLY(turnedBasis, localPivot);
        this.host.weaponViewmodel.transform = new Transform3D(turnedBasis, Vector3.SUBTRACT(Vector3.ADD(pivot, offset), turnedPivot));
    }

    /**
     * Finds a weapon's two named sight sockets (relative to the shared
     * weaponViewmodel root, at the given presentation scale) and returns
     * their positions plus the bore vector between them. Shared by every
     * pose solver below so "how do I read a weapon's own geometry" has one
     * implementation, not one per solver.
     */
    private weaponBore(
        weapon: Weapon,
        scale: number,
        rearSocketName: string,
        frontSocketName: string,
    ): { rear: Vector3; front: Vector3; bore: Vector3 } | null {
        const viewmodel = this.host.weaponViewmodels.get(weapon);
        return viewmodel ? viewmodelBore(this.host.weaponViewmodel, viewmodel, scale, rearSocketName, frontSocketName) : null;
    }

    /**
     * Solves the weaponViewmodel position/rotation that puts a weapon's own
     * `anchor` point (in its bore-relative frame) at `targetAnchor`
     * (camera-local), with its bore rotated onto `targetDirection` plus an
     * optional roll around that direction. Both socket-driven pose modes
     * below are this same rigid-body alignment with different targets.
     */
    private alignedPose(
        bore: Vector3,
        targetDirection: Vector3,
        boreRollRadians: number,
        anchor: Vector3,
        targetAnchor: Vector3,
    ): { position: Vector3; rotation: Quaternion } | null {
        if (targetDirection.length_squared() < 0.000001) return null;
        const alignment = new Quaternion(bore.normalized(), targetDirection.normalized());
        const roll = new Quaternion(targetDirection.normalized(), boreRollRadians);
        const rotation = Quaternion.MULTIPLY(roll, alignment).normalized();
        const rotatedAnchor = Quaternion.MULTIPLY(rotation, anchor);
        return {
            position: new Vector3(targetAnchor.x - rotatedAnchor.x, targetAnchor.y - rotatedAnchor.y, targetAnchor.z - rotatedAnchor.z),
            rotation,
        };
    }

    /** Anchor the native arms to the firing grip, retaining the clip's elbow motion (see solveFirstPersonArms). */
    /** `presented` is the local player the view shows. */
    private applyFirstPersonArms(weapon: Weapon, suspended: boolean, presented: PlayerSnapshot | null, delta: number): void {
        const rig = this.host.firstPersonVisual?.root;
        const skeleton = this.host.firstPersonVisual?.skeleton;
        const viewmodel = this.host.weaponViewmodels.get(weapon);
        if (suspended || !rig || !skeleton || !viewmodel || !viewmodel.visible) {
            this.reloadProps.reset();
            return;
        }
        const reloading = this.host.firstPersonReloadInspection?.active === true;
        const changed = this.armSolveWeapon !== weapon || this.armSolveReloading !== reloading;
        this.armSolveElapsed += delta;
        // Reload choreography samples a fresh native pose and clears all hand
        // and finger overrides every drawn frame. Restore contact on that same
        // frame, including zero-delta debug samples; throttling it to the idle
        // budget draws the unattached native hands between solves.
        if (!reloading && !changed && this.armSolveElapsed < 1 / FIRST_PERSON_ARM_SOLVE_RATE) return;
        this.armSolveElapsed = 0;
        this.armSolveWeapon = weapon;
        this.armSolveReloading = reloading;
        const contact = solveFirstPersonArms(
            rig,
            skeleton,
            this.host.weaponViewmodel,
            viewmodel,
            weapon,
            reloading,
            // The pistol's native grip is per category.
            presented?.category ?? null,
            this.sprintPoseBlend * (1 - this.host.aimBlend),
            this.host.lastReloadPhase,
        );
        if (hdArmFit(skeleton, weapon)) this.reloadProps.update(viewmodel, weapon, skeleton, rig.get_parent() as Node3D, reloading, this.host.lastReloadPhase);
        if (!contact) return;
        this.host.supportHandContact = {
            socket: SUPPORT_GRIP_SOCKET,
            bakedHands: false,
            residual: contact.residual,
            firingResidual: contact.firingResidual,
            firingCurl: null,
            supportCurl: null,
            leftArm: this.leftArmInCamera(skeleton),
        };
    }

    /** The free arm's shoulder, elbow and wrist in camera space, for inspection. */
    private leftArmInCamera(skeleton: Skeleton3D): { clip: string; shoulder: number[]; elbow: number[]; hand: number[] } {
        const toCamera = Transform3D.MULTIPLY(this.host.camera.global_transform.affine_inverse(), skeleton.global_transform);
        const joint = (name: string): number[] => {
            const bone = skeleton.find_bone(characterBoneName(name));
            const at = bone >= 0 ? Transform3D.MULTIPLY(toCamera, skeleton.get_bone_global_pose(bone)).origin : Vector3.ZERO;
            return [at.x, at.y, at.z];
        };
        return {
            clip: String(this.host.firstPersonVisual?.animationPlayer?.current_animation ?? ""),
            shoulder: joint("LeftUpperArm"),
            elbow: joint("LeftLowerArm"),
            hand: joint("LeftHand"),
        };
    }

    /**
     * Solves a carried pose from the shared hold spec: put this weapon's own
     * firing grip at the spec's camera-local target and point its bore where
     * the spec says, with the given cant.
     *
     * This is what replaces a per-weapon rest and sprint transform. Anchoring
     * on the grip and the bore rather than on the sights is what lets one spec
     * fit every weapon — both are landmarks each weapon has in its own frame,
     * and because models are imported at true scale a longer weapon simply
     * reaches further from the same hand instead of being resized to match
     * someone else's proportions.
     */
    holdPose(weapon: Weapon, pose: HoldPoseSpec): ViewmodelPose | null {
        const viewmodel = this.host.weaponViewmodels.get(weapon);
        const fit = hdArmFit(this.host.firstPersonVisual?.skeleton, weapon);
        if (fit) {
            const sprint = pose === WEAPON_HOLD_POSES[WEAPON_PRESENTATION[weapon].hold].sprint;
            const target = fit.firingTarget;
            pose = { ...pose, gripTarget: sprint ? [target[0], target[1] - fit.upperLength * 0.3, target[2]] : target };
        }
        return viewmodel ? firstPersonHoldPose(this.host.weaponViewmodel, viewmodel, VIEWMODEL_SCALE, pose) : null;
    }

    /** Normalized viewmodel-pass screen position of the equipped weapon's landmarks. */
    viewmodelSightScreen(): Record<string, [number, number]> | null {
        const weapon = this.host.latestSnapshot.players.find((player) => player.id === this.host.localPeerId)?.weapon;
        const viewmodel = weapon ? this.host.weaponViewmodels?.get(weapon) : null;
        if (!viewmodel || !this.host.viewmodelCamera || !this.host.viewmodelViewport) return null;
        const size = this.host.viewmodelViewport.size;
        const out: Record<string, [number, number]> = {};
        for (const name of ["RearSightSocket", "FrontSightSocket", "RightGripSocket", "MuzzleSocket", "ButtSocket"]) {
            const socket = findNamedNode(viewmodel, name);
            if (!socket) continue;
            const point = this.host.viewmodelCamera.unproject_position(socket.global_position);
            out[name] = [Number((point.x / size.x).toFixed(4)), Number((point.y / size.y).toFixed(4))];
        }
        return out;
    }

    /**
     * Nearest camera-space depth of every visible mesh in the viewmodel, so
     * near-plane clipping can be measured rather than guessed at from a
     * screenshot. Negative means the geometry reaches behind the eye.
     */
    viewmodelMeshDepths(): Array<{ name: string; nearest: number; layers: number }> {
        const out: Array<{ name: string; nearest: number; layers: number }> = [];
        if (!this.host.weaponViewmodel || !this.host.viewmodelCamera) return out;
        const toCamera = this.host.viewmodelCamera.global_transform.affine_inverse();
        const walk = (node: Node3D): void => {
            if (node instanceof MeshInstance3D && node.mesh && node.is_visible_in_tree()) {
                const box = node.get_aabb();
                let nearest = Infinity;
                for (let corner = 0; corner < 8; corner += 1) {
                    const local = new Vector3(
                        box.position.x + (corner & 1 ? box.size.x : 0),
                        box.position.y + (corner & 2 ? box.size.y : 0),
                        box.position.z + (corner & 4 ? box.size.z : 0),
                    );
                    const view = Transform3D.MULTIPLY(toCamera, Transform3D.MULTIPLY(node.global_transform, local));
                    nearest = Math.min(nearest, -view.z);
                }
                out.push({ name: String(node.get_name()), nearest: Number(nearest.toFixed(4)), layers: node.layers });
            }
            for (const child of node.get_children()) if (child instanceof Node3D) walk(child);
        };
        walk(this.host.weaponViewmodel);
        if (this.host.firstPersonBody) walk(this.host.firstPersonBody);
        return out.sort((a, b) => a.nearest - b.nearest);
    }

    /** One named socket's position relative to the shared viewmodel root. */
    private weaponSocketOffset(weapon: Weapon, scale: number, socketName: string): Vector3 | null {
        const viewmodel = this.host.weaponViewmodels.get(weapon);
        return viewmodel ? viewmodelSocketOffset(this.host.weaponViewmodel, viewmodel, scale, socketName) : null;
    }

    socketDrivenAdsPose(weapon: Weapon, eyeRelief: number, boreRollRadians: number): { position: Vector3; rotation: Quaternion } | null {
        const fit = hdArmFit(this.host.firstPersonVisual?.skeleton, weapon);
        if (fit) eyeRelief = Math.max(eyeRelief, fit.lowerLength * 0.55);
        const sockets = this.weaponBore(weapon, VIEWMODEL_SCALE, "RearSightSocket", "FrontSightSocket");
        if (!sockets) return null;
        const model = this.host.weaponViewmodels.get(weapon);
        if (fit && model) eyeRelief = Math.max(eyeRelief, rearWeaponClearance(this.host.weaponViewmodel, model, sockets.rear, sockets.bore, VIEWMODEL_SCALE));
        // ADS follows the camera's optical axis, independent of window size or
        // backing-texture density. On Retina fullscreen the logical viewport
        // can be 1280x800 while its texture reports 6480x4050; feeding that
        // texture center to project_ray_normal produces an off-screen ray.
        return this.alignedPose(sockets.bore, CAMERA_AIM_RAY, boreRollRadians, sockets.rear, Vector3.MULTIPLY(CAMERA_AIM_RAY, eyeRelief));
    }

    /**
     * Styled counterpart to socketDrivenAdsPose, reached only from
     * debug_weapon_calibration — production frames the rest pose through
     * holdPose against the shared WEAPON_HOLD_POSES entry, and this
     * two-point form has no caller there: instead of forcing the bore
     * onto the camera's optical axis (true aim, which socketDrivenAdsPose
     * alone guarantees), it points the bore at whatever direction connects
     * two authored camera-local targets — one for the rear sight (roughly
     * where the weapon meets the shoulder or cheek) and one for the front
     * sight (roughly where the muzzle sits on screen). Because the pose is
     * built from the weapon's own RearSightSocket and FrontSightSocket,
     * the rear sight lands exactly at targetRear and the bore points
     * exactly at targetFront's direction by construction; the front
     * sight's own landing point still depends on the model's real
     * rear-to-front socket spacing, so it only lands exactly at
     * targetFront when that spacing matches |targetFront - targetRear|.
     */
    socketDrivenTargetPose(
        weapon: Weapon,
        scale: number,
        targetRear: Vector3,
        targetFront: Vector3,
        boreRollRadians: number,
    ): { position: Vector3; rotation: Quaternion } | null {
        const sockets = this.weaponBore(weapon, scale, "RearSightSocket", "FrontSightSocket");
        if (!sockets) return null;
        const targetDirection = new Vector3(targetFront.x - targetRear.x, targetFront.y - targetRear.y, targetFront.z - targetRear.z);
        return this.alignedPose(sockets.bore, targetDirection, boreRollRadians, sockets.rear, targetRear);
    }

    /**
     * Production-path wrapper around a socket-driven solve (see the
     * socketPoseCache field comment for why). Ordinary renders (
     * `allowLiveFallback: true`) always get the freshest `compute()`
     * result, settled or not — an ADS/rest pose that fell back to a
     * literal default for over a second every time the player moved or
     * fired would be its own, more visible bug than the transient this
     * cache exists to guard against. A cached solve also becomes stale
     * when aiming changes the held model's roll around its firing grip.
     * `settled` therefore gates only updating the fallback: the solve must
     * agree within socketPoseStable's tolerance for SOCKET_POSE_STABLE_MS.
     *
     * `allowLiveFallback: false` is for the one caller — leaveToMenu's
     * final render — that's about to stop updating for good. false skips
     * `compute` and returns the last settled value, or null for the caller's
     * literal-default fallback if no settled value exists. An unsettled
     * frame still clears any pending
     * stability streak so a later settled window starts its own
     * agreement check fresh instead of crediting time from before the
     * interruption.
     */
    private cachedSocketPose(
        weapon: Weapon,
        mode: "rest" | "aimed" | "sprint",
        settled: boolean,
        allowLiveFallback: boolean,
        compute: () => { position: Vector3; rotation: Quaternion } | null,
    ): { position: Vector3; rotation: Quaternion } | null {
        const cached = this.host.socketPoseCache[weapon]?.[mode];
        if (cached && !allowLiveFallback) return cached;
        if (!allowLiveFallback) return null;
        const liveKey = `${weapon}:${mode}`;
        const live = this.liveSocketPoses.get(liveKey);
        const solved =
            live?.revision === this.compositionRevision
                ? live.pose
                : (() => {
                      const pose = compute();
                      this.liveSocketPoses.set(liveKey, { revision: this.compositionRevision, pose });
                      return pose;
                  })();
        if (!solved) return null;
        if (!settled) {
            const pendingEntry = this.host.pendingSocketPose[weapon] ?? { rest: null, aimed: null, sprint: null };
            pendingEntry[mode] = null;
            this.host.pendingSocketPose[weapon] = pendingEntry;
            return solved;
        }
        const nowMs = Time.get_ticks_msec();
        const pending = this.host.pendingSocketPose[weapon]?.[mode] ?? null;
        const pendingEntry = this.host.pendingSocketPose[weapon] ?? { rest: null, aimed: null, sprint: null };
        const holding = pending && this.socketPoseStable(pending.value, solved);
        pendingEntry[mode] = { value: solved, sinceMs: holding ? pending!.sinceMs : nowMs };
        this.host.pendingSocketPose[weapon] = pendingEntry;
        if (!holding || nowMs - pending!.sinceMs < SOCKET_POSE_STABLE_MS) return solved;
        const entry = this.host.socketPoseCache[weapon] ?? { rest: null, aimed: null, sprint: null };
        entry[mode] = solved;
        this.host.socketPoseCache[weapon] = entry;
        return solved;
    }

    private socketPoseStable(a: { position: Vector3; rotation: Quaternion }, b: { position: Vector3; rotation: Quaternion }): boolean {
        const epsilon = SOCKET_POSE_STABLE_EPSILON;
        return (
            Math.abs(a.position.x - b.position.x) < epsilon &&
            Math.abs(a.position.y - b.position.y) < epsilon &&
            Math.abs(a.position.z - b.position.z) < epsilon &&
            Math.abs(a.rotation.x - b.rotation.x) < epsilon &&
            Math.abs(a.rotation.y - b.rotation.y) < epsilon &&
            Math.abs(a.rotation.z - b.rotation.z) < epsilon &&
            Math.abs(a.rotation.w - b.rotation.w) < epsilon
        );
    }

    applyFirstPersonWeaponComposition(weapon: Weapon): void {
        if (!this.host.firstPersonVisual) return;
        const definition = WEAPON_PRESENTATION[weapon];
        const calibration = this.host.weaponCalibration?.weapon === weapon ? this.host.weaponCalibration : null;
        // As in updateWeaponPresentation, calibration only overrides
        // whichever single endpoint it targets, so aiming (or releasing
        // aim) while tuning previews the real production yaw on the other
        // side rather than a frozen calibrated one.
        // Neither the rig's placement nor its yaw is authored any more: both
        // fall out of the weapon solve in applyFirstPersonArms, which runs at
        // the end of updateWeaponPresentation once the weapon has been posed.
        // Only the gun in hand: every other viewmodel is hidden
        // (updateWeaponViewmodelVisibility), nothing reads a hidden one's pose,
        // and a newly drawn gun is posed here on the same snapshot it is shown.
        // Posing all five on every snapshot, each a search of its model for
        // its grip sockets, was the heaviest thing a snapshot did.
        const viewmodel = this.host.weaponViewmodels.get(weapon);
        if (viewmodel) {
            const boreRoll = WEAPON_HOLD_POSES[WEAPON_PRESENTATION[weapon].hold].adsBoreRollRadians * this.host.aimBlend;
            const instanceId = String(viewmodel.get_instance_id());
            // The socket solvers consume only this grip-relative transform.
            // Aim transitions change it, but steady aim, recoil and camera
            // movement do not. Reapplying an identical transform and solving
            // its sockets every drawn frame only creates more GodotJS value
            // bindings; the engine receives the exact same values (#330).
            if (this.composedWeapon === weapon && this.composedInstanceId === instanceId && this.composedBoreRoll === boreRoll) return;
            applyHeldWeaponPose(viewmodel, weapon, "firstPerson", boreRoll, hdArmFit(this.host.firstPersonVisual?.skeleton, weapon)?.firingGrip);
            this.composedWeapon = weapon;
            this.composedInstanceId = instanceId;
            this.composedBoreRoll = boreRoll;
            this.compositionRevision += 1;
        }
    }

    /**
     * Where the weapon is pointed: the player's own aim plus un-recovered kick.
     *
     * These, not `yaw`/`pitch`, are what the submitted intent and the camera
     * read, so the crosshair and the round agree and the server resolves the
     * shot against the view the player is actually looking down.
     */
    get aimPitch(): number {
        return clamp(this.host.pitch + this.host.viewKick.pitchRadians, -1.45, 1.45);
    }

    get aimYaw(): number {
        return normalizeAngle(this.host.yaw + this.host.viewKick.yawRadians);
    }

    presentLocalShotFeedback(weapon: Weapon, nowMs: number, authoritativeSteadyAim?: boolean): void {
        const local = this.host.latestSnapshot.players.find((player) => player.id === this.host.localPeerId);
        const baseSpread = weaponSpreadRadians(weapon, 0, {
            aiming: local?.aiming === true,
            moving: this.host.localSpeedEstimate > 0.1,
            crouching: local?.crouching === true,
        });
        const bloom = Math.max(0, (local?.accuracySpreadRadians ?? baseSpread) - baseSpread);
        const steadyAim = authoritativeSteadyAim === true;
        this.host.weaponRecoil = steadyAim ? 0 : recoilIntensityForBloom(weapon, bloom);
        this.host.muzzleFlashUntilMs = Math.max(this.host.muzzleFlashUntilMs, nowMs + WEAPON_PRESENTATION[weapon].muzzleFlashDurationMs);
        this.host.localShotAnimation = { weapon, untilMs: nowMs + WEAPON_PRESENTATION[weapon].shootAnimationDurationMs };
        // The camera-local recoil root supplies visible kick while the
        // category animation keeps both socket-retargeted hands attached.
        this.host.firstPersonVisual?.setAnimation(weaponAnimation(weapon, "FirstPersonShoot") as CharacterAnimation, true);
        const flash = this.host.muzzleFlashes.get(weapon);
        if (flash) randomizeMuzzleFlash(flash);
        // Where the muzzle sits in front of the eye; the light is borrowed, never the gun's own (#255).
        this.host.lightPool.flashLight(
            this.host.camera.to_global(MUZZLE_LIGHT_OFFSET),
            MUZZLE_LIGHT_COLOUR,
            MUZZLE_LIGHT_ENERGY,
            weapon === "shotgun" || weapon === "sniperRifle" ? MUZZLE_LIGHT_RANGE * 1.4 : MUZZLE_LIGHT_RANGE,
            WEAPON_PRESENTATION[weapon].muzzleFlashDurationMs,
        );
        this.updateWeaponPresentation(0);
        this.host.hudController.updateVisualFeedback();
    }

    /** `localYaw` overrides the local player's aim, for a kill cam ejecting the killer's shell. */
    spawnEjectedShell(peerId: number, weapon: Weapon, localYaw?: number): void {
        const local = peerId === this.host.localPeerId;
        const body = this.host.world.bodies.get(peerId);
        if (!local && !body) return;
        const player = this.host.latestSnapshot.players.find((candidate) => candidate.id === peerId);
        const yaw = local ? (localYaw ?? this.aimYaw) : (player?.yaw ?? body?.rotation.y ?? 0);
        const right = new Vector3(Math.cos(yaw), 0, -Math.sin(yaw));
        const forward = new Vector3(-Math.sin(yaw), 0, -Math.cos(yaw));
        const source = local ? this.host.camera.global_position : body!.global_position;
        const origin = new Vector3(
            source.x + right.x * 0.24 + forward.x * (local ? 0.7 : 0.34),
            source.y + (local ? -0.18 : 1.28),
            source.z + right.z * 0.24 + forward.z * (local ? 0.7 : 0.34),
        );
        const ejectionSpeed = WEAPON_FEEDBACK[weapon].shellEjectionSpeed;
        this.host.combatVfx.spawnShell(
            origin,
            new Vector3(right.x * ejectionSpeed + forward.x * 0.18, 1.3 + Math.random() * 0.45, right.z * ejectionSpeed + forward.z * 0.18),
            weapon,
            (position) => {
                if (this.host.localPeerId !== 0) this.host.audio?.playWorld("casing", position);
            },
        );
    }

    updateAimPresentation(delta: number, weapon: Weapon): void {
        const local = this.host.latestSnapshot.players.find((player) => player.id === this.host.localPeerId);
        const target = this.host.aimRequested && !this.host.debugThirdPerson ? 1 : 0;
        const step = Math.max(0, delta) * ADS_TRANSITION_PER_SECOND;
        this.host.aimBlend = target > this.host.aimBlend ? Math.min(target, this.host.aimBlend + step) : Math.max(target, this.host.aimBlend - step);
        this.applyFirstPersonWeaponComposition(weapon);
        this.updateFirstPersonArmVisibility(weapon);
        const scopeActive = this.isSniperScopeActive(weapon);
        this.host.sniperScopeOverlay.visible = scopeActive;
        const scopeMaterial = this.host.sniperScopeOverlay.material as ShaderMaterial | null;
        const viewportSize = this.host.get_viewport()?.get_texture()?.get_size();
        if (scopeMaterial && viewportSize?.y) scopeMaterial.set_shader_parameter("aspect_ratio", viewportSize.x / viewportSize.y);
        this.updateWeaponViewmodelVisibility(weapon);
        const localAlive = local?.alive === true;
        this.host.reticle.root.visible = localAlive && !this.host.debugThirdPerson && this.host.aimBlend < 0.85 && !this.host.fixtures.isRigStageFixture();
    }

    private isSniperScopeActive(weapon: Weapon): boolean {
        const local = this.host.latestSnapshot.players.find((player) => player.id === this.host.localPeerId);
        return weapon === "sniperRifle" && this.host.aimBlend >= 0.85 && !this.host.debugThirdPerson;
    }

    updateWeaponViewmodelVisibility(equippedWeapon: Weapon): void {
        const scopeActive = this.isSniperScopeActive(equippedWeapon);
        for (const [weapon, viewmodel] of this.host.weaponViewmodels) {
            viewmodel.visible = weapon === equippedWeapon && !(weapon === "sniperRifle" && scopeActive);
        }
    }

    /** Iron-sight ADS retains arms; the scope overlay hides the complete first-person mesh. */
    updateFirstPersonArmVisibility(weapon: Weapon): void {
        // Found once per rig rather than searched for on every snapshot.
        const root = this.host.firstPersonVisual?.root ?? null;
        if (root !== this.armsRoot) {
            this.armsRoot = root;
            this.armsMesh = root ? findNamedNode(root, "CharacterMesh") : null;
        }
        const mesh = this.armsMesh;
        // The killstreak tablet brings its own gloved hands (client/streak_tablet.ts): the empty arms go while it is out.
        if (mesh) mesh.visible = !this.host.hideFirstPersonBody && !this.isSniperScopeActive(weapon) && !this.host.streakTablet && !this.knifeSlashing?.();
        // The camera-safe mesh exists for the aimed pose alone (see
        // setFirstPersonWeaponCameraSafe); anywhere else its missing back half
        // reads as a broken weapon. Swap earlier than the arms: by the time the
        // stock would reach the near plane it has to be gone already, and it is
        // at the very bottom of frame well before that, where it does not read.
        // The viewmodel node IS the model root createWeaponModel returned —
        // game_ui renames it — so it is what carries the variant marker.
        // Searching for modelNodeName finds the mesh child instead, which
        // does not, and the swap silently never ran. Only the gun in hand is
        // drawn, so only it is swapped; a gun is swapped on the snapshot it is
        // drawn again.
        const viewmodel = this.host.weaponViewmodels.get(weapon);
        if (viewmodel)
            setFirstPersonWeaponCameraSafe(
                viewmodel,
                weapon,
                VIEWMODEL_VISUAL_LAYER,
                !hdArmFit(this.host.firstPersonVisual?.skeleton, weapon) && this.host.aimBlend >= ADS_STOCK_HIDE_BLEND,
            );
    }

    resetHandCalibration(): void {
        this.host.firstPersonVisual?.skeleton?.clear_bones_global_pose_override();
        if (this.host.firstPersonVisual?.animationPlayer) this.host.firstPersonVisual.animationPlayer.speed_scale = 1;
        for (const [weapon, viewmodel] of this.host.weaponViewmodels) applyHeldWeaponPose(viewmodel, weapon);
        this.composedWeapon = null;
        this.composedInstanceId = "";
        this.composedBoreRoll = Number.NaN;
        this.compositionRevision += 1;
    }

    applyShotgunHandCalibration(handEulerRadians: Vector3): void {
        const visual = this.host.firstPersonVisual;
        const skeleton = visual?.skeleton;
        if (!visual || !skeleton) return;
        this.resetHandCalibration();
        visual.sampleAnimation("ShotgunFirstPersonIdle", 0.5);
        skeleton.force_update_all_bone_transforms();
        const handIndex = skeleton.find_bone(characterBoneName("RightHand"));
        if (handIndex < 0) return;
        const shotgunViewmodel = this.host.ensureWeaponViewmodel("shotgun", true)!;
        const weaponLocal = new Transform3D(shotgunViewmodel.transform);
        const handPose = skeleton.get_bone_global_pose(handIndex);
        const delta = Basis.from_euler(handEulerRadians);
        const rotatedHandPose = new Transform3D(Basis.MULTIPLY(handPose.basis, delta), handPose.origin);
        skeleton.set_bone_global_pose_override(handIndex, rotatedHandPose, 1, true);
        skeleton.force_update_bone_child_transform(handIndex);
        const counterRotation = new Transform3D(delta.inverse(), Vector3.ZERO);
        shotgunViewmodel.transform = Transform3D.MULTIPLY(counterRotation, weaponLocal);
    }

    applyPistolHandCalibration(supportEulerRadians: Vector3, firingEulerRadians: Vector3): void {
        const visual = this.host.firstPersonVisual;
        const skeleton = visual?.skeleton;
        if (!visual || !skeleton) return;
        this.resetHandCalibration();
        visual.sampleAnimation("PistolFirstPersonIdle", 0.5);
        skeleton.force_update_all_bone_transforms();
        const rotateAroundPalm = (boneName: string, palmOffset: Vector3, euler: Vector3): void => {
            const handIndex = skeleton.find_bone(characterBoneName(boneName));
            if (handIndex < 0) return;
            const handPose = skeleton.get_bone_global_pose(handIndex);
            const palmTarget = Transform3D.MULTIPLY(handPose, palmOffset);
            const rotatedBasis = Basis.MULTIPLY(handPose.basis, Basis.from_euler(euler));
            const rotatedOffset = Basis.MULTIPLY(rotatedBasis, palmOffset);
            const rotatedOrigin = new Vector3(palmTarget.x - rotatedOffset.x, palmTarget.y - rotatedOffset.y, palmTarget.z - rotatedOffset.z);
            skeleton.set_bone_global_pose_override(handIndex, new Transform3D(rotatedBasis, rotatedOrigin), 1, true);
            skeleton.force_update_bone_child_transform(handIndex);
        };
        const pistolViewmodel = this.host.ensureWeaponViewmodel("pistol", true)!;
        const weaponGlobal = new Transform3D(pistolViewmodel.global_transform);
        rotateAroundPalm("RightHand", new Vector3(-0.004707, 0.065829, -0.006961), firingEulerRadians);
        pistolViewmodel.global_transform = weaponGlobal;
        rotateAroundPalm("LeftHand", new Vector3(0.004707, 0.065829, -0.006961), supportEulerRadians);
    }
}
