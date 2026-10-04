import {
    Animation,
    AnimationPlayer,
    Camera3D,
    Color,
    DirectionalLight3D,
    DisplayServer,
    GeometryInstance3D,
    LightmapGI,
    MeshInstance3D,
    MultiMeshInstance3D,
    ShaderMaterial,
    Node,
    Node3D,
    OS,
    PhysicsRayQueryParameters3D,
    RenderingServer,
    Vector3,
    WorldEnvironment,
} from "godot";
import { applyDebugLighting } from "./client/daylight";
import { unknownDebugFields } from "./runtime_actions/debug_action_fields";
import { instantiatePresentationScene } from "./presentation";
import { buildDumboSurvivalArena } from "./dumbo_survival_arena";
import { isCaptureOutputPath } from "./client/game_shared";
import { ENVIRONMENT_STUDY_REGIONS } from "./client/environment_study_regions";

import { applyWallTexture } from "./client/faceted_surface";
import { MATERIAL_SLOTS } from "./environment_modules/module_contract";
import { loadShared } from "./shared_resources";

/** Native camera-matched bake comparison with an optional moving probe receiver. */
export default class StudyLightingPreview extends Node3D {
    private camera: Camera3D | null = null;
    private actor: Node3D | null = null;
    private actorCamera = false;
    private snapFrames = 0;
    private actorMotion = false;
    private actorPhase = 0;
    private actorDirection = 1;
    _ready(): void {
        if (!OS.is_debug_build()) return;
        DisplayServer.window_set_vsync_mode(DisplayServer.VSyncMode.VSYNC_DISABLED);
        const baked = OS.get_environment("GODMODE_STUDY_LIGHTING") !== "off";
        const actorOn = OS.get_environment("GODMODE_STUDY_ACTOR") === "on";
        const arena = buildDumboSurvivalArena(this, true, [], actorOn, baked);
        if (OS.get_environment("GODMODE_STUDY_CANDIDATE") === "bright") {
            RenderingServer.directional_soft_shadow_filter_set_quality(RenderingServer.ShadowQuality.SHADOW_QUALITY_SOFT_HIGH);
            const world = arena.get_node("Daylight/DaylightEnvironment") as WorldEnvironment;
            world.environment!.tonemap_exposure = 1.6;
            world.environment!.ambient_light_energy = 1.1;
            const sun = arena.get_node("Daylight/Sun") as DirectionalLight3D;
            sun.light_color = new Color(1, 0.97, 0.93, 1);
        }
        const lightmap = arena.get_node_or_null("StudyLightmap") as LightmapGI | null;
        if (lightmap?.light_data)
            console.log("GODMODE_STUDY_PROBES=" + RenderingServer.lightmap_get_probe_capture_points(lightmap.light_data.get_rid()).size());
        const spec = ENVIRONMENT_STUDY_REGIONS.find((r) => r.id === OS.get_environment("GODMODE_STUDY_AREA")) ?? ENVIRONMENT_STUDY_REGIONS[0];
        const camera = new Camera3D();
        this.camera = camera;
        camera.set_name("StudyCamera");
        camera.fov = 75;
        camera.position = new Vector3(...spec.camera.position);
        camera.rotation = new Vector3(spec.camera.pitch, spec.camera.yaw, 0);
        this.add_child(camera);
        camera.current = true;
        if (actorOn) {
            const body = instantiatePresentationScene("res://assets/characters/mixamo/character-assault.glb");
            if (!body) throw new Error("Missing native assault body");
            body.set_name("DynamicNativeHumanoid");
            body.position = new Vector3(spec.id === "04" ? -563 : spec.center[0], 0, spec.id === "04" ? -102 : spec.center[1]);
            this.actor = body;
            this.actorCamera = true;
            this.actorMotion = spec.id === "04";
            this.add_child(body);
            const visit = (node: Node): void => {
                if (node instanceof MeshInstance3D) node.gi_mode = GeometryInstance3D.GIMode.GI_MODE_DYNAMIC;
                if (node instanceof AnimationPlayer && node.has_animation("Walk")) {
                    node.get_animation("Walk")!.loop_mode = Animation.LoopMode.LOOP_LINEAR;
                    node.play("Walk");
                }
                for (const child of node.get_children()) visit(child);
            };
            visit(body);
            camera.position = Vector3.ADD(body.position, new Vector3(4, 2.3, 0));
            camera.look_at(Vector3.ADD(body.position, new Vector3(0, 1.1, 0)));
        }
        console.log(`GODMODE_STUDY_LIGHTING=area:${spec.id};baked:${baked}`);
    }
    godot_cli_action(request: string): string {
        const { name, payload } = JSON.parse(request);
        if (OS.is_debug_build() && name === "capture" && typeof payload?.output === "string" && isCaptureOutputPath(payload.output)) {
            RenderingServer.force_draw(false, 0);
            const image = this.get_viewport()?.get_texture()?.get_image();
            const error = image?.save_png(payload.output);
            return JSON.stringify({ accepted: error === 0, error });
        }
        if (!OS.is_debug_build()) return JSON.stringify({ accepted: false });
        if (
            name === "audit_camera" &&
            this.camera &&
            Array.isArray(payload?.position) &&
            Array.isArray(payload?.target) &&
            payload.position.length === 3 &&
            payload.target.length === 3 &&
            [...payload.position, ...payload.target].every((v: unknown) => typeof v === "number" && Number.isFinite(v))
        ) {
            this.camera.position = new Vector3(payload.position[0], payload.position[1], payload.position[2]);
            this.camera.look_at(new Vector3(payload.target[0], payload.target[1], payload.target[2]));
            return JSON.stringify({ accepted: true, position: payload.position, target: payload.target, fov: this.camera.fov });
        }
        if (name === "audit_textures" && payload?.enabled === true) {
            const trials: { path: string; surface: number; family: string }[] = [];
            const changed = new Set<number>();
            const matches = (c: Color, rgb: readonly number[]) => Math.abs(c.r - rgb[0]) + Math.abs(c.g - rgb[1]) + Math.abs(c.b - rgb[2]) < 0.002;
            const stoneColours: readonly (readonly number[])[] = [
                ...Object.entries(MATERIAL_SLOTS)
                    .filter(([slot]) => slot.startsWith("trim"))
                    .map(([, rgb]) => rgb),
                MATERIAL_SLOTS.masonryTan,
                [0.86, 0.82, 0.73],
            ];
            const visit = (node: Node): void => {
                if (node instanceof MeshInstance3D || node instanceof MultiMeshInstance3D) {
                    const mesh = node instanceof MeshInstance3D ? node.mesh : node.multimesh?.mesh;
                    for (let i = 0; mesh && i < mesh.get_surface_count(); i++) {
                        const original =
                            node instanceof MeshInstance3D ? node.get_active_material(i) : (node.material_override ?? mesh.surface_get_material(i));
                        if (!(original instanceof ShaderMaterial) || original.resource_name.startsWith("BridgeAshlar")) continue;
                        if (original.shader?.resource_path !== "res://assets/maps/western_block/faceted-surface.gdshader") continue;
                        if (changed.has(original.get_instance_id())) continue;
                        const colour = original.get_shader_parameter("base_color");
                        if (!(colour instanceof Color)) continue;
                        const family = matches(colour, MATERIAL_SLOTS.roofMembrane)
                            ? "roof"
                            : stoneColours.some((rgb) => matches(colour, rgb))
                              ? "trim"
                              : matches(colour, MATERIAL_SLOTS.concrete) || matches(colour, [0.74, 0.72, 0.66])
                                ? "kerb"
                                : null;
                        if (!family) continue;
                        const ambient = ["structure_ambient_strength", "structure_base_y", "structure_height"].map((uniform) =>
                            original.get_shader_parameter(uniform),
                        );
                        const material = original;
                        changed.add(original.get_instance_id());
                        applyWallTexture(material, "concrete");
                        material.set_shader_parameter("wall_texture_all_faces", family !== "kerb");
                        material.set_shader_parameter("wall_albedo_strength", family === "roof" ? 0.12 : 0.2);
                        material.set_shader_parameter("wall_normal_strength", family === "roof" ? 0.25 : 0.45);
                        material.set_shader_parameter("wall_detail_strength", 0.18);
                        if (family === "roof") {
                            for (const [uniform, file] of Object.entries({
                                wall_albedo: "plaster-albedo.png",
                                wall_roughness: "plaster-roughness.png",
                                wall_normal: "plaster-normal.png",
                                wall_detail_normal: "plaster-normal.png",
                            }))
                                material.set_shader_parameter(uniform, loadShared(`res://assets/maps/car_garage/structures/${file}`, "Texture2D"));
                            material.set_shader_parameter("wall_albedo_mean", 0.517935);
                            material.set_shader_parameter("wall_tile", 1.4);
                        }
                        // Preview changes textures only: keep Part 1's ambient parameters exactly.
                        ["structure_ambient_strength", "structure_base_y", "structure_height"].forEach((uniform, index) =>
                            material.set_shader_parameter(uniform, ambient[index]),
                        );
                        trials.push({ path: String(node.get_path()), surface: i, family });
                    }
                }
                for (const child of node.get_children()) visit(child);
            };
            visit(this);
            return JSON.stringify({ accepted: true, trials });
        }

        if (name === "debug_lighting" && payload && unknownDebugFields(name, payload).length === 0) {
            const state = applyDebugLighting(this.get_viewport()!, payload);
            return JSON.stringify({ accepted: !!state, state });
        }
        if (name === "study_view" && typeof payload?.region === "string") {
            const spec = ENVIRONMENT_STUDY_REGIONS.find((r) => r.id === payload.region);
            if (!spec || !this.camera) return JSON.stringify({ accepted: false });
            this.actorCamera = false;
            this.camera.position = new Vector3(...spec.camera.position);
            this.camera.rotation = new Vector3(spec.camera.pitch, spec.camera.yaw, 0);
            return JSON.stringify({ accepted: true, region: spec.id });
        }
        if (name === "study_actor" && this.actor && payload && Object.keys(payload).every((key) => ["motion", "phase", "animationTime"].includes(key))) {
            if (payload.motion !== undefined && typeof payload.motion !== "boolean") return JSON.stringify({ accepted: false });
            if (payload.phase !== undefined && (typeof payload.phase !== "number" || !Number.isFinite(payload.phase) || payload.phase < 0 || payload.phase > 1))
                return JSON.stringify({ accepted: false });
            if (
                payload.animationTime !== undefined &&
                (typeof payload.animationTime !== "number" || !Number.isFinite(payload.animationTime) || payload.animationTime < 0 || payload.animationTime > 1)
            )
                return JSON.stringify({ accepted: false });
            if (typeof payload.motion === "boolean") this.actorMotion = payload.motion;
            const clips: { path: string; time: number }[] = [];
            const animate = (node: Node): void => {
                if (node instanceof AnimationPlayer && node.has_animation("Walk")) {
                    if (this.actorMotion) node.play("Walk");
                    else node.pause();
                    if (typeof payload.animationTime === "number") node.seek(payload.animationTime, true);
                    clips.push({ path: String(node.get_path()), time: node.current_animation_position });
                }
                for (const child of node.get_children()) animate(child);
            };
            animate(this.actor);
            this.actorCamera = true;
            if (typeof payload.phase === "number") {
                this.actorPhase = payload.phase;
                this.actor.position = new Vector3(-563 + this.actorPhase * 12, this.actor.position.y, -102);
                this.snapActor();
            }
            const position = this.actor.position;
            return JSON.stringify({ accepted: true, motion: this.actorMotion, phase: this.actorPhase, position: [position.x, position.y, position.z], clips });
        }
        return JSON.stringify({ accepted: false });
    }
    _physics_process(delta: number): void {
        if (!this.actor || !this.camera) return;
        if (this.actorMotion) {
            this.actorPhase += (delta / 12) * this.actorDirection;
            if (this.actorPhase >= 1 || this.actorPhase <= 0) {
                this.actorPhase = Math.max(0, Math.min(1, this.actorPhase));
                this.actorDirection *= -1;
            }
            this.actor.position = new Vector3(-563 + this.actorPhase * 12, this.actor.position.y, -102);
            this.actor.rotation.y = this.actorDirection > 0 ? -Math.PI / 2 : Math.PI / 2;
            this.snapActor();
        } else if (++this.snapFrames === 8) this.snapActor();
    }
    private snapActor(): void {
        if (!this.actor || !this.camera) return;
        const position = this.actor.position;
        const query = PhysicsRayQueryParameters3D.create(Vector3.ADD(position, new Vector3(0, 25, 0)), Vector3.ADD(position, new Vector3(0, -20, 0)));
        query.collision_mask = 1;
        const hit = this.get_world_3d()?.direct_space_state?.intersect_ray(query);
        const floor = hit?.get("position") as Vector3 | null;
        if (floor) {
            this.actor.position = floor;
            if (this.actorCamera) {
                this.camera.position = Vector3.ADD(floor, new Vector3(4, 2.3, 0));
                this.camera.look_at(Vector3.ADD(floor, new Vector3(0, 1.1, 0)));
            }
            if (this.snapFrames < 8) {
                console.log("GODMODE_STUDY_ACTOR_GROUND=" + floor);
                this.snapFrames = 8;
            }
        }
    }
    _process(): void {
        RenderingServer.force_draw(false);
    }
}
