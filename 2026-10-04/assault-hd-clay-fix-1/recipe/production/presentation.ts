import { enemyUpperBodyBone } from "./enemy_action_timing";
import { initializeHdArmFits } from "./hd_arm_fit";
import { blendedGaitSpeed, lowerBodyBone } from "./admin_directional_gait";
import { prepareTriangleFracture } from "./client/triangle_fracture";
import {
    Animation,
    AnimationLibrary,
    AnimationPlayer,
    BaseMaterial3D,
    Color,
    Engine,
    Environment,
    GeometryInstance3D,
    GLTFDocument,
    GLTFState,
    MeshInstance3D,
    Node,
    Node3D,
    OS,
    PackedScene,
    RenderingServer,
    ResourceLoader,
    Shader,
    ShaderMaterial,
    Skeleton3D,
    StandardMaterial3D,
    Vector3,
    VisualInstance3D,
    WorldEnvironment,
} from "godot";
import { loadShared } from "./shared_resources";

import { WeaponCategory, WEAPONS, Weapon } from "../packages/game-rules/src/match";
import { reloadDurationMs } from "../packages/game-rules/src/weapons";
import { type SystemAdminLevel } from "../packages/game-rules/src/system_admins";
import { MIXAMO_CLIP_SPEEDS } from "./mixamo_clip_data";
import { MIXAMO_CLIP_SPEEDS as ASSAULT_HD_CLIP_SPEEDS } from "../assets/characters/assault-hd/mixamo_clip_data";
import { SOLDIER_CHARACTER_SCENES } from "./enemy_character_scenes";
import { characterAssetName } from "./character_asset_name";
import { animationBlendSeconds } from "./animation_transition";
import { WEAPON_PRESENTATION } from "./weapon_catalog";
import { createProductionWeapon, hasProductionWeapon } from "./client/production_weapon";

type WeaponAnimationPrefix = "Pistol" | "Shotgun" | "MachineGun" | "SniperRifle";
type WeaponAnimationSuffix =
    | "WalkBackward"
    | "SprintBackward"
    | "CrouchWalkBackward"
    | "FirstPersonWalkBackward"
    | "FirstPersonSprintBackward"
    | "FirstPersonCrouchWalkBackward"
    | "Idle"
    | "Shoot"
    | "Reload"
    | "Walk"
    | "StrafeLeft"
    | "StrafeRight"
    | "Sprint"
    | "CrouchIdle"
    | "CrouchWalk"
    | "CrouchStrafeLeft"
    | "CrouchStrafeRight"
    | "CrouchReload"
    | "JumpStart"
    | "JumpLoop"
    | "JumpLand"
    | "FirstPersonIdle"
    | "FirstPersonShoot"
    | "FirstPersonReload"
    | "FirstPersonWalk"
    | "FirstPersonSprint"
    | "FirstPersonCrouchIdle"
    | "FirstPersonCrouchWalk"
    | "FirstPersonCrouchReload"
    | "FirstPersonJumpStart"
    | "FirstPersonJumpLoop"
    | "FirstPersonJumpLand";
export type CharacterAnimation =
    // The Daemon's strikes the CLOAKER borrows (BORROWED_STRIKE_CLIPS).
    | (typeof BORROWED_STRIKE_CLIPS)[number]
    | import("../packages/game-rules/src/match").DeathAnimation
    | "TossGrenade"
    | "RadioCall"
    | "GroundSlam"
    | "KnifeSlash"
    | "TPose"
    | "Idle"
    | "Walk"
    | "Run"
    | "Sprint"
    | "CrouchIdle"
    | "CrouchWalk"
    | "JumpStart"
    | "JumpLoop"
    | "JumpLand"
    | "DaemonHaymaker"
    | "DaemonHook"
    | "MantleGrab"
    | "MantleClimb"
    | "PistolAimDown"
    | "PistolAimNeutral"
    | "PistolAimUp"
    | "RifleAimIdle"
    | `${WeaponAnimationPrefix}${WeaponAnimationSuffix}`;

export interface RiggedCharacter {
    readonly root: Node3D;
    readonly skeleton: Skeleton3D | null;
    readonly animationPlayer: AnimationPlayer | null;
    readonly firstPersonArms: ReadonlyMap<Weapon, MeshInstance3D | null>;
    /** Drives locomotion clips' playback rate; negative plays them backwards. */
    setMovementSpeed(metresPerSecond: number): void;
    setAnimation(animation: CharacterAnimation, restart?: boolean): void;
    /** Plays a one-shot clip from a replicated clock: its playhead at `timeSeconds`, moving at `rate` (zero holds it). */
    poseAnimation(animation: CharacterAnimation, timeSeconds: number, rate: number): void;
    /** Samples only the native upper-body rotations; locomotion keeps driving the hips and feet. */
    poseUpperBody(animation: CharacterAnimation, progress: number, weight?: number): void;
    blendGait(primary: CharacterAnimation, secondary: CharacterAnimation, weight: number, speed: number, scale: number, sampleBones: boolean): void;
    sampleAnimation(animation: CharacterAnimation, time: number): void;
}

const DEFAULT_CHARACTER_SCENE = "res://assets/characters/mixamo/character-assault.glb";
/** The retired Daemon's body, kept only as the donor of the strikes the CLOAKER borrows (borrowStrikeClips). */
const STRIKE_DONOR_SCENE = "res://assets/characters/mixamo/character-daemon.glb";
/**
 * The retired Daemon's Mixamo strikes supply the melee wind-up and hit.
 * Legacy bodies borrow them at runtime; production bodies can carry copies
 * fitted to their own native rest pose by the asset builder.
 */
export const BORROWED_STRIKE_CLIPS = ["DaemonHaymaker", "DaemonHook"] as const;
let borrowedStrikes: ReadonlyMap<string, Animation> | null = null;

/** Gives one body its own copy of its clip library with the Daemon's strikes in it, so the other bodies sharing that import are untouched. */
function borrowStrikeClips(player: AnimationPlayer): void {
    if (!borrowedStrikes) {
        const clips = new Map<string, Animation>();
        const donor = instantiatePresentationScene(STRIKE_DONOR_SCENE);
        const donorPlayer = donor ? findDescendant(donor, AnimationPlayer) : null;
        for (const name of BORROWED_STRIKE_CLIPS) if (donorPlayer?.has_animation(name)) clips.set(name, donorPlayer.get_animation(name)!);
        donor?.free();
        borrowedStrikes = clips;
    }
    const shared = player.get_animation_library("") as AnimationLibrary | null;
    if (!shared || borrowedStrikes.size === 0) return;
    const own = shared.duplicate() as AnimationLibrary;
    // Production rigs can contain rest-fitted copies of these shared motions.
    // Only the older bodies need the original donor fallback.
    for (const [name, clip] of borrowedStrikes) if (!own.has_animation(name)) own.add_animation(name, clip);
    player.remove_animation_library("");
    player.add_animation_library("", own);
}
// Shared by loadout previews, live bodies and their first-person companions.
export const CATEGORY_CHARACTER_SCENES: Readonly<Record<WeaponCategory, string>> = {
    assault: "res://assets/characters/mixamo/character-assault.glb",
    breach: "res://assets/characters/mixamo/character-breach.glb",
    marksman: "res://assets/characters/mixamo/character-marksman.glb",
};

// Cut from the matching body with extract-mixamo-arms.mjs; hands and all
// animation samples remain intact, with no torso/head/leg geometry.
const CATEGORY_FIRST_PERSON_ARMS_SCENES: Readonly<Record<WeaponCategory, string>> = {
    assault: "res://assets/characters/mixamo/character-assault-arms.glb",
    breach: "res://assets/characters/mixamo/character-breach-arms.glb",
    marksman: "res://assets/characters/mixamo/character-marksman-arms.glb",
};
// Inert in the common case: applyMaterial (below) skips overriding any mesh
// that already carries a baked albedo texture, which every body does.
// This only shows if a category's external GLB is ever missing its texture.
const CATEGORY_FALLBACK_TINT = { baseColor: new Color(0.5, 0.5, 0.55, 1), shimmerColor: new Color(0.7, 0.85, 0.95, 1) };

export type { SystemAdminLevel } from "../packages/game-rules/src/system_admins";
import type { EnemyKind } from "../packages/game-rules/src/soldier";

/**
 * High-key environment. With prebaked GI present, most indirect light comes
 * from the bake, so flat ambient drops and occlusion in corners survives.
 */
/** Whether the game on screen is the roguelite, whose reloads are slower; reload clips are retimed to match. The client sets it from each snapshot. */
let rogueliteReloads = false;
export function setRogueliteReloads(roguelite: boolean): void {
    rogueliteReloads = roguelite;
}

export function createHighKeyEnvironment(prebakedGi = false): WorldEnvironment {
    const environment = new Environment();
    environment.background_mode = Environment.BGMode.BG_COLOR;
    // SUPERHOT sky: a solid bright light-blue backdrop with fog of the same
    // colour, so distant geometry dissolves into the sky with no visible horizon.
    const sky = new Color(0.78, 0.89, 0.98, 1);
    environment.background_color = sky;
    environment.background_energy_multiplier = 1;
    environment.fog_enabled = true;
    environment.fog_mode = Environment.FogMode.FOG_MODE_EXPONENTIAL;
    environment.fog_light_color = sky;
    environment.fog_light_energy = 1;
    environment.fog_density = 0.005;
    environment.fog_aerial_perspective = 0;
    environment.ambient_light_source = Environment.AmbientSource.AMBIENT_SOURCE_COLOR;
    environment.ambient_light_color = new Color(0.86, 0.92, 0.97, 1);
    environment.ambient_light_energy = prebakedGi ? 0.16 : 0.5;
    environment.ambient_light_sky_contribution = 0;
    environment.reflected_light_source = Environment.ReflectionSource.REFLECTION_SOURCE_DISABLED;
    environment.tonemap_mode = Environment.ToneMapper.TONE_MAPPER_FILMIC;
    environment.tonemap_exposure = 1.0;
    environment.tonemap_white = 1.3;
    environment.ssao_enabled = true;
    // With the bake present, deeper screen-space occlusion and indirect light
    // give the white shell its Mirror's Edge corner shading.
    environment.ssao_radius = prebakedGi ? 1.1 : 0.65;
    environment.ssao_intensity = prebakedGi ? 2.2 : 0.9;
    environment.ssao_light_affect = 0.28;
    environment.ssil_enabled = prebakedGi;
    environment.ssil_radius = 3;
    environment.ssil_intensity = 1.4;
    environment.glow_enabled = true;
    environment.glow_normalized = false;
    environment.glow_intensity = 0.7;
    environment.glow_strength = 0.85;
    environment.glow_bloom = 0.24;
    const node = new WorldEnvironment();
    node.set_name("HighKeyEnvironment");
    node.environment = environment;
    return node;
}

export function createEnvironmentMaterial(baseColor: Color, edgeColor = new Color(0.55, 0.72, 0.82, 1)): ShaderMaterial {
    return shaderMaterial("res://assets/shaders/environment.gdshader", { base_color: baseColor, edge_color: edgeColor });
}

export function createActorMaterial(baseColor: Color, shimmerColor: Color, firstPerson = false): ShaderMaterial {
    return shaderMaterial("res://assets/shaders/actor_shimmer.gdshader", {
        base_color: baseColor,
        shimmer_color: shimmerColor,
        first_person: firstPerson,
    });
}

export function createWeaponMaterial(firstPerson = false, baseColor?: Color, shimmerColor?: Color): ShaderMaterial {
    return shaderMaterial("res://assets/shaders/weapon_shimmer.gdshader", {
        first_person: firstPerson,
        ...(baseColor ? { base_color: baseColor } : {}),
        ...(shimmerColor ? { shimmer_color: shimmerColor } : {}),
    });
}

export function createRunnerVisionMaterial(color: Color, energy = 2.4): ShaderMaterial {
    return shaderMaterial("res://assets/shaders/runner_vision.gdshader", { line_color: color, energy });
}

export function createRiggedCharacter(
    baseColor: Color,
    shimmerColor: Color,
    presentation: "full" | "firstPersonArms" = "full",
    scenePath?: string,
): RiggedCharacter | null {
    return assembleRiggedCharacter(
        scenePath ?? (presentation === "firstPersonArms" ? CATEGORY_FIRST_PERSON_ARMS_SCENES.assault : DEFAULT_CHARACTER_SCENE),
        presentation === "firstPersonArms" ? "FirstPersonArmsMesh" : "CharacterMesh",
        (sceneRoot) => applyMaterial(sceneRoot, createActorMaterial(baseColor, shimmerColor, presentation === "firstPersonArms")),
    );
}

/** Load either the native body or its matching arms-only companion. */
export function createCategoryCharacter(
    category: WeaponCategory,
    presentation: "full" | "firstPersonArms" = "full",
    sceneOverride?: string,
): RiggedCharacter | null {
    let scenePath = sceneOverride ?? (presentation === "firstPersonArms" ? CATEGORY_FIRST_PERSON_ARMS_SCENES[category] : CATEGORY_CHARACTER_SCENES[category]);
    // Explicit debug launch for reviewing the parallel body/arms/knife assets.
    // Normal launches keep the currently approved roster.
    if (OS.is_debug_build() && OS.get_environment("GODMODE_ASSAULT_HD_PREVIEW") === "1") {
        scenePath = scenePath.replace(
            /^res:\/\/assets\/characters\/mixamo\/character-assault(-(?:knife-)?arms)?\.glb$/,
            "res://assets/characters/assault-hd/character-assault-hd$1.glb",
        );
    }
    const meshName = presentation === "firstPersonArms" ? "FirstPersonArmsMesh" : "CharacterMesh";
    const character = assembleRiggedCharacter(scenePath, meshName, (sceneRoot) =>
        applyMaterial(
            sceneRoot,
            createActorMaterial(CATEGORY_FALLBACK_TINT.baseColor, CATEGORY_FALLBACK_TINT.shimmerColor, presentation === "firstPersonArms"),
        ),
    );
    if (character && presentation === "firstPersonArms") prepareTriangleFracture(character.root);
    character?.root.set_meta("playerCategory", category);
    return character;
}

/** Production enemy bodies preserve source PBR materials; placeholder bodies retain their role tint. */
export function createSystemAdminCharacter(level: SystemAdminLevel, weapon: EnemyKind | null = null): RiggedCharacter | null {
    const character = assembleRiggedCharacter(SOLDIER_CHARACTER_SCENES[weapon ?? "rifle"], "CharacterMesh");
    if (character) {
        prepareTriangleFracture(character.root);
        character.root.set_meta("systemAdminLevel", level);
        character.root.set_meta("productionEnemyBody", SOLDIER_CHARACTER_SCENES[weapon ?? "rifle"].includes("character-enemy-"));
        // The cloaker's strike, and the juggernaut commander's roar and slam once it drops its gun.
        if ((weapon === "cloaker" || weapon === "commander") && character.animationPlayer) borrowStrikeClips(character.animationPlayer);
    }
    return character;
}

function assembleRiggedCharacter(
    scenePath: string,
    characterMeshName: string,
    // Externally authored bodies keep the materials they were exported with;
    // only the tinted player rigs need a conversion pass.
    applyMaterials?: (sceneRoot: Node3D) => void,
): RiggedCharacter | null {
    const sceneRoot = instantiatePresentationScene(scenePath);
    if (!sceneRoot) return null;
    const sceneSkeleton = findDescendant(sceneRoot, Skeleton3D);
    const sceneAnimationPlayer = findDescendant(sceneRoot, AnimationPlayer);
    if (!sceneSkeleton || !sceneAnimationPlayer) return null;

    const root = new Node3D();
    root.set_name("RiggedCharacter");
    sceneRoot.set_name("MixamoAnimationRig");
    root.add_child(sceneRoot);

    const mesh = findNamedDescendant(sceneRoot, characterMeshName, MeshInstance3D);
    if (!mesh) return null;
    mesh.set_name("CharacterMesh");
    mesh.visible = true;
    const isArms = characterMeshName === "FirstPersonArmsMesh";
    if (isArms) mesh.cast_shadow = GeometryInstance3D.ShadowCastingSetting.SHADOW_CASTING_SETTING_OFF;
    const firstPersonArms = new Map<Weapon, MeshInstance3D | null>(WEAPONS.map((weapon) => [weapon, isArms ? mesh : null]));
    applyMaterials?.(sceneRoot);
    const skeleton = sceneSkeleton;
    const animationPlayer = sceneAnimationPlayer;
    root.set_meta("rigBoneCount", skeleton.get_bone_count());
    root.set_meta("animationSource", "Mixamo native character rig and animation clips");
    let active: CharacterAnimation | null = null;
    let movementSpeed: number | null = null;
    const model = characterAssetName(scenePath) ?? "assault";
    const clipSpeeds = model === "assault-hd" ? ASSAULT_HD_CLIP_SPEEDS : MIXAMO_CLIP_SPEEDS;
    if (model === "assault-hd") skeleton.set_meta("nativeFingerGripWeight", 0.25);
    // Negative plays a locomotion clip backwards: a backpedal from a forward stride.
    const setMovementSpeed = (metresPerSecond: number): void => {
        movementSpeed = metresPerSecond;
    };
    const setAnimation = (animation: CharacterAnimation, restart = false): void => {
        const animationAvailable = sceneAnimationPlayer.has_animation(animation);
        root.set_meta("animationAvailable", animationAvailable);
        if (!animationAvailable) return;
        const clip = sceneAnimationPlayer.get_animation(animation)!;
        const weapon = WEAPONS.find((value) => animation.startsWith(WEAPON_PRESENTATION[value].animationPrefix));
        const oneShot = /Mantle|Death|Shoot|Reload|JumpStart|JumpLand|DaemonHook|DaemonHaymaker|TossGrenade|RadioCall|GroundSlam/.test(animation);
        clip.loop_mode = oneShot || animation === "TPose" ? Animation.LoopMode.LOOP_NONE : Animation.LoopMode.LOOP_LINEAR;
        const duration =
            animation.includes("Reload") && weapon
                ? reloadDurationMs(weapon, rogueliteReloads) / 1_000
                : animation.includes("Shoot") && weapon
                  ? WEAPON_PRESENTATION[weapon].shootAnimationDurationMs / 1_000
                  : animation.includes("JumpStart")
                    ? 0.25
                    : animation.includes("JumpLand")
                      ? 0.35
                      : // The borrowed strikes play at their authored length unless a pose drives them.
                        animation === "DaemonHook" || animation === "DaemonHaymaker"
                        ? clip.length
                        : null;
        const authoredSpeed = clipSpeeds[model]?.[animation];
        sceneAnimationPlayer.speed_scale = duration
            ? clip.length / duration
            : authoredSpeed && movementSpeed !== null
              ? Math.sign(movementSpeed || 1) * Math.min(3, Math.max(0.15, Math.abs(movementSpeed) / authoredSpeed))
              : 1;
        if (active === animation && !restart) return;
        const gait = (name: string): boolean => /Walk|Strafe|Run|Sprint/.test(name);
        const phase =
            active && gait(active) && gait(animation) && sceneAnimationPlayer.has_animation(active)
                ? sceneAnimationPlayer.current_animation_position / sceneAnimationPlayer.get_animation(active)!.length
                : null;
        active = animation;
        root.set_meta("animationState", animation.toLowerCase());
        const blendSeconds = animationBlendSeconds(Engine.get_frames_per_second());
        root.set_meta("animationBlendSeconds", blendSeconds);
        root.set_meta("animationPlays", Number(root.get_meta("animationPlays", 0)) + 1);
        if (restart) sceneAnimationPlayer.stop();
        sceneAnimationPlayer.play(animation, restart ? 0 : blendSeconds);
        if (phase !== null && !restart) sceneAnimationPlayer.seek((phase % 1) * clip.length, false);
    };
    const poseAnimation = (animation: CharacterAnimation, timeSeconds: number, rate: number): void => {
        setAnimation(animation);
        if (active !== animation) return;
        const clip = sceneAnimationPlayer.get_animation(animation)!;
        clip.loop_mode = Animation.LoopMode.LOOP_NONE;
        const time = Math.min(clip.length, Math.max(0, timeSeconds));
        sceneAnimationPlayer.speed_scale = time >= clip.length ? 0 : rate;
        // Snapshots come 20 times a second; only a drift worth seeing is corrected, so the clip runs smoothly between them.
        if (Math.abs(sceneAnimationPlayer.current_animation_position - time) > 0.1) sceneAnimationPlayer.seek(time, false);
    };
    const sampleAnimation = (animation: CharacterAnimation, time: number): void => {
        setAnimation(animation);
        if (!sceneAnimationPlayer.has_animation(animation)) return;
        // Deterministic gallery samples must not freeze at the source pose of
        // a transition blend when speed_scale becomes zero below.
        sceneAnimationPlayer.stop();
        sceneAnimationPlayer.play(animation, 0);
        sceneAnimationPlayer.seek(time, true);
        sceneAnimationPlayer.speed_scale = 0;
    };
    const upperBodyTracks = new Map<CharacterAnimation, { track: number; bone: number }[]>();
    const poseUpperBody = (animation: CharacterAnimation, progress: number, weight = 1): void => {
        if (!sceneAnimationPlayer.has_animation(animation)) return;
        const clip = sceneAnimationPlayer.get_animation(animation)!;
        let tracks = upperBodyTracks.get(animation);
        if (!tracks) {
            tracks = [];
            for (let track = 0; track < clip.get_track_count(); track++) {
                if (clip.track_get_type(track) !== Animation.TrackType.TYPE_ROTATION_3D) continue;
                const path = clip.track_get_path(track);
                const subnames = path.get_subname_count();
                if (subnames === 0) continue;
                const name = path.get_subname(subnames - 1);
                if (!enemyUpperBodyBone(name)) continue;
                const bone = skeleton.find_bone(name);
                if (bone >= 0) tracks.push({ track, bone });
            }
            upperBodyTracks.set(animation, tracks);
        }
        const time = Math.max(0, Math.min(1, progress)) * clip.length;
        for (const { track, bone } of tracks) {
            const posed = clip.rotation_track_interpolate(track, time);
            skeleton.set_bone_pose_rotation(bone, skeleton.get_bone_pose_rotation(bone).slerp(posed, weight));
        }
        skeleton.force_update_all_bone_transforms();
        root.set_meta("upperBodyAnimation", animation);
        root.set_meta("upperBodyProgress", progress);
        root.set_meta("upperBodyTracks", tracks.length);
    };
    const lowerTracks = new Map<CharacterAnimation, { track: number; bone: number; type: number }[]>();
    const gaitTracks = (animation: CharacterAnimation): { track: number; bone: number; type: number }[] => {
        let tracks = lowerTracks.get(animation);
        if (tracks) return tracks;
        tracks = [];
        const clip = sceneAnimationPlayer.get_animation(animation)!;
        for (let track = 0; track < clip.get_track_count(); track++) {
            const type = clip.track_get_type(track);
            if (type !== Animation.TrackType.TYPE_ROTATION_3D && type !== Animation.TrackType.TYPE_POSITION_3D) continue;
            const path = clip.track_get_path(track);
            if (path.get_subname_count() === 0) continue;
            const name = path.get_subname(path.get_subname_count() - 1);
            if (!lowerBodyBone(name)) continue;
            const bone = skeleton.find_bone(name);
            if (bone >= 0) tracks.push({ track, bone, type });
        }
        lowerTracks.set(animation, tracks);
        return tracks;
    };
    const blendGait = (
        primary: CharacterAnimation,
        secondary: CharacterAnimation,
        weight: number,
        speed: number,
        scale: number,
        sampleBones: boolean,
    ): void => {
        if (primary === secondary) weight = 0;
        if (!sceneAnimationPlayer.has_animation(primary) || !sceneAnimationPlayer.has_animation(secondary)) return;
        const a = sceneAnimationPlayer.get_animation(primary)!;
        const b = sceneAnimationPlayer.get_animation(secondary)!;
        const speedA = clipSpeeds[model]?.[primary];
        const speedB = clipSpeeds[model]?.[secondary];
        if (!speedA || !speedB) return;
        const effective = blendedGaitSpeed(speedA, speedB, a.length, b.length, weight, scale);
        setMovementSpeed((speed * speedA) / effective);
        setAnimation(primary);
        root.set_meta("gaitSecondary", secondary);
        root.set_meta("gaitBlendWeight", weight);
        root.set_meta("gaitSpeed", speed);
        root.set_meta("gaitPlaybackRate", sceneAnimationPlayer.speed_scale);
        if (!sampleBones || weight < 0.001) return;
        const timeA = sceneAnimationPlayer.current_animation_position;
        const timeB = (timeA / a.length) * b.length;
        const tracksB = gaitTracks(secondary);
        for (const trackA of gaitTracks(primary)) {
            const trackB = tracksB.find((track) => track.bone === trackA.bone && track.type === trackA.type);
            if (!trackB) continue;
            if (trackA.type === Animation.TrackType.TYPE_ROTATION_3D)
                skeleton.set_bone_pose_rotation(
                    trackA.bone,
                    a.rotation_track_interpolate(trackA.track, timeA).slerp(b.rotation_track_interpolate(trackB.track, timeB), weight),
                );
            else
                skeleton.set_bone_pose_position(
                    trackA.bone,
                    a.position_track_interpolate(trackA.track, timeA).lerp(b.position_track_interpolate(trackB.track, timeB), weight),
                );
        }
        skeleton.force_update_all_bone_transforms();
    };
    if (model === "assault-hd" && isArms) initializeHdArmFits(skeleton, animationPlayer);
    setAnimation("Idle");
    return { root, skeleton, animationPlayer, firstPersonArms, setMovementSpeed, setAnimation, poseAnimation, poseUpperBody, blendGait, sampleAnimation };
}

export function createWeaponModel(weapon: Weapon, presentation: "world" | "firstPerson" = "world"): Node3D | null {
    const definition = WEAPON_PRESENTATION[weapon];
    const production = hasProductionWeapon(weapon);
    const root = production ? createProductionWeapon(weapon) : instantiatePresentationScene(definition.modelScene);
    if (!root) return null;
    receiveDynamicGi(root);
    const fullMesh = findDescendant(root, MeshInstance3D);
    const firstPersonMesh = findNamedDescendant(root, `FirstPerson${definition.animationPrefix}Mesh`, MeshInstance3D);
    if (firstPersonMesh) {
        if (fullMesh && fullMesh !== firstPersonMesh) {
            // The imported full mesh can be the GLB root. Hiding that node also
            // hides its camera-safe child, so clear only its geometry for the
            // first-person instance and leave the hierarchy visible. Stash the
            // geometry rather than dropping it: which of the two variants a
            // first-person weapon should show depends on where the weapon
            // currently is, not on the fact that it's a viewmodel at all (see
            // setFirstPersonWeaponCameraSafe).
            // Both variants keep their geometry; which one draws is decided by
            // render layer at runtime (see setFirstPersonWeaponCameraSafe).
            // Visibility can't do it — the camera-safe mesh is a child of the
            // full one, so hiding the parent hides both — and clearing the
            // mesh outright made the swap one-way in practice.
            if (presentation === "firstPerson") root.set_meta("hasCameraSafeVariant", true);
            else fullMesh.visible = true;
        }
        firstPersonMesh.visible = presentation === "firstPerson";
    }
    root.set_name(definition.modelNodeName);
    if (!production) {
        applyMaterial(root, createWeaponMaterial(presentation === "firstPerson"));
        if (definition.tint) tintTexturedMaterials(root, new Color(...definition.tint));
    }
    return root;
}

/**
 * Moves a visual instance onto other render layers. Never assign `layers`
 * directly on anything in the tree that a light can reach. In Forward+,
 * Godot 4.6.1 changes a mesh's layer mask without unpairing it from the
 * lights on it, and a later unpair skips any light whose cull mask misses
 * the new mask. So a mesh moved to layer 0 keeps a pointer to every light
 * that lit it, and the first time it moves after one of those lights is
 * freed, the engine reads freed memory in RendererSceneCull::_update_instance.
 * That was the Windows access violation in Playtest 0.5 and 0.6: a drone's
 * spotlight lit the gun in hand, aiming flipped the gun's meshes to layer 0,
 * and the drone died. Hiding the instance for the change unpairs it under
 * its old mask first.
 */
export function setRenderLayers(node: VisualInstance3D, layers: number): void {
    if (node.layers === layers) return;
    const instance = node.get_instance();
    RenderingServer.instance_set_visible(instance, false);
    node.layers = layers;
    RenderingServer.instance_set_visible(instance, node.is_visible_in_tree());
}

/**
 * Chooses which of a first-person weapon's two meshes renders.
 *
 * Some weapons ship a camera-safe variant alongside the full model (see
 * tools/assets/build-placeholders.mjs) with everything behind the rear sight
 * removed — the machine gun loses its buttstock, the shotgun everything past
 * the receiver. That trim exists for aimed fire, where the eye sits a hand's
 * breadth behind the rear sight and the stock would otherwise be a slab
 * across the near plane. It is wrong everywhere else: hip fire and the sprint
 * carry hold the weapon well out in front, where the missing back half simply
 * reads as a broken model.
 *
 * The trim is baked per mesh, so the choice has to be made at runtime from
 * where the weapon actually is. Returns false when the weapon has no
 * camera-safe variant and nothing needed swapping.
 */
export function setFirstPersonWeaponCameraSafe(root: Node3D, weapon: Weapon, layer: number, cameraSafe: boolean): boolean {
    const firstPersonMesh = findNamedDescendant(root, `FirstPerson${WEAPON_PRESENTATION[weapon].animationPrefix}Mesh`, MeshInstance3D);
    const fullMesh = findDescendant(root, MeshInstance3D);
    if (!firstPersonMesh || !fullMesh || fullMesh === firstPersonMesh || !root.has_meta("hasCameraSafeVariant")) return false;
    // Exactly one of the two draws at a time — they overlap almost completely,
    // so rendering both would double every shared surface. A layer of zero is
    // drawn by no camera, which sidesteps the parent/child visibility problem.
    // Never a bare `layers` write: see setRenderLayers.
    setRenderLayers(firstPersonMesh, cameraSafe ? layer : 0);
    setRenderLayers(fullMesh, cameraSafe ? 0 : layer);
    return true;
}

export function shaderMaterial(path: string, parameters: Record<string, unknown>): ShaderMaterial {
    const shader = loadShared(path, "Shader") as Shader;
    const material = new ShaderMaterial();
    material.shader = shader;
    for (const [name, value] of Object.entries(parameters)) material.set_shader_parameter(name, value);
    return material;
}

/** Moving presentation receives baked probes without contributing static bake geometry. */
function receiveDynamicGi(node: Node): void {
    if (node instanceof GeometryInstance3D) node.gi_mode = GeometryInstance3D.GIMode.GI_MODE_DYNAMIC;
    for (const child of node.get_children()) receiveDynamicGi(child);
}

export function instantiatePresentationScene(path: string): Node3D | null {
    let instance: Node | null = null;
    if (ResourceLoader.exists(path, "PackedScene")) {
        const scene = loadShared(path, "PackedScene") as PackedScene;
        instance = scene.instantiate();
    } else if (path.endsWith(".glb")) {
        const document = new GLTFDocument();
        const state = new GLTFState();
        if (document.append_from_file(path, state) === 0) instance = document.generate_scene(state);
    }
    if (!(instance instanceof Node3D)) return null;
    receiveDynamicGi(instance);
    return instance;
}

/** A placeholder repaint: each textured surface's own material, copied with its albedo multiplied by `tint`. */
function tintTexturedMaterials(node: Node, tint: Color): void {
    if (node instanceof MeshInstance3D && node.mesh && node.material_override === null) {
        for (let surface = 0; surface < node.mesh.get_surface_count(); surface += 1) {
            const active = node.get_active_material(surface);
            if (!(active instanceof StandardMaterial3D)) continue;
            const tinted = active.duplicate() as StandardMaterial3D;
            tinted.albedo_color = new Color(
                active.albedo_color.r * tint.r,
                active.albedo_color.g * tint.g,
                active.albedo_color.b * tint.b,
                active.albedo_color.a,
            );
            node.set_surface_override_material(surface, tinted);
        }
    }
    for (const child of node.get_children()) tintTexturedMaterials(child, tint);
}

function applyMaterial(node: Node, material: ShaderMaterial): void {
    if (node instanceof GeometryInstance3D) {
        const active = node instanceof MeshInstance3D && node.mesh ? node.get_active_material(0) : null;
        const textured = active instanceof StandardMaterial3D && active.albedo_texture !== null;
        if (!textured) node.material_override = material;
    }
    for (const child of node.get_children()) applyMaterial(child, material);
}

/**
 * Converts a scene's imported glTF materials into actor-shimmer materials
 * surface by surface, so an authored multi-color body (suit, mask, tie)
 * keeps its palette instead of being flattened to one tint. Each authored
 * material's base color feeds the shimmer base and its emissive factor picks
 * the glitch-sweep accent; materials named `*Emissive` stay truly emissive
 * for glowing details like the warning-glyph face plate.
 */
function applyAuthoredActorMaterials(node: Node): void {
    if (node instanceof MeshInstance3D && node.mesh) {
        for (let surface = 0; surface < node.mesh.get_surface_count(); surface += 1) {
            const imported = node.get_active_material(surface);
            if (!(imported instanceof StandardMaterial3D)) continue;
            const importedName = String(imported.resource_name);
            if (!importedName.startsWith("AdminShard")) continue;
            node.set_surface_override_material(
                surface,
                shaderMaterial("res://assets/shaders/shard_dissolve.gdshader", {
                    base_color: imported.albedo_color,
                    emission_energy: importedName.endsWith("Emissive") ? 2.6 : 0,
                }),
            );
        }
    }
    for (const child of node.get_children()) applyAuthoredActorMaterials(child);
}
function findDescendant<T extends Node>(node: Node, type: new (...args: never[]) => T): T | null {
    if (node instanceof type) return node;
    for (const child of node.get_children()) {
        const found = findDescendant(child, type);
        if (found) return found;
    }
    return null;
}

/**
 * The first descendant with this exact name and type, or null. Exported so
 * the armory's weapon stage can resolve the semantic sockets it hangs its
 * hardpoint markers off (see scripts/weapon_preview.ts) with the same lookup
 * the rest of the presentation layer uses.
 */
export function findNamedDescendant<T extends Node>(node: Node, name: string, type: new (...args: never[]) => T): T | null {
    if (node instanceof type && node.get_name() === name) return node;
    for (const child of node.get_children()) {
        const found = findNamedDescendant(child, name, type);
        if (found) return found;
    }
    return null;
}
