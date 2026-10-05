// The approved detailed killstreak tablet, drawn by the viewmodel camera.
// Native five-finger arms hold the bezel and touch the live LAUNCH plane.
//
// The screen is a small 2D UI rendered into a SubViewport: an uplink header,
// the streak's name, and either a LAUNCH button that a gloved finger taps
// (a launch streak) or a link bar filling toward the streak's own view (a
// ride). The pose is a pure function of the time since the press, so the
// animation always agrees with the server's call-in window.
import {
    BaseMaterial3D,
    CanvasLayer,
    Color,
    ColorRect,
    GeometryInstance3D,
    HorizontalAlignment,
    Label,
    MeshInstance3D,
    Node3D,
    Panel,
    QuadMesh,
    StandardMaterial3D,
    StyleBoxFlat,
    SubViewport,
    Vector2,
    Vector2i,
    Vector3,
    type Camera3D,
    type Node,
} from "godot";
import { HeldObjectArms } from "../held_object_arms";
import { VIEWMODEL_VISUAL_LAYER } from "../render_layers";
import { instantiateProductionModel } from "./production_model_scene";
import { LAUNCH_DONE_MS, LAUNCH_TAP_AT_MS, TABLET_OUT_MS, streakRung, type StreakId } from "../../packages/game-rules/src/killstreaks";

const SCREEN_PX = new Vector2i(560, 372);
/** Where the tablet rests in front of the eye, in camera space. */
const REST = { x: 0.012, y: -0.07, z: -0.43, tilt: -0.22 };
/** Where it comes from and goes back to: low and flat. */
const AWAY = { x: 0.06, y: -0.42, z: -0.3, tilt: -1.25 };
const PUT_AWAY_MS = 380;

const ease = (t: number): number => 1 - (1 - Math.min(1, Math.max(0, t))) ** 3;
const smooth = (t: number): number => {
    const x = Math.min(1, Math.max(0, t));
    return x * x * (3 - 2 * x);
};

function material(albedo: Color, metallic: number, roughness: number, emission?: Color, energy = 1): StandardMaterial3D {
    const m = new StandardMaterial3D();
    m.albedo_color = albedo;
    m.metallic = metallic;
    m.roughness = roughness;
    if (emission) {
        m.emission_enabled = true;
        m.emission = emission;
        m.emission_energy_multiplier = energy;
    }
    return m;
}

export class StreakTablet {
    private readonly root = new Node3D();
    private readonly slab = new Node3D();
    private readonly arms: HeldObjectArms;
    private poseClockMs = 0;
    private readonly viewport = new SubViewport();
    private readonly title = new Label();
    private readonly subtitle = new Label();
    private readonly status = new Label();
    private readonly button = new Panel();
    private readonly buttonStyle = new StyleBoxFlat();
    private readonly buttonLabel = new Label();
    private readonly barBack = new ColorRect();
    private readonly bar = new ColorRect();
    private readonly glass: StandardMaterial3D;
    private shownId: StreakId | null = null;
    /** Local ms the last activation ended, for the put-away. */
    private putAwayFromMs = 0;
    private lastT = 0;

    constructor(parent: Node) {
        this.root.set_name("StreakTablet");
        this.root.visible = false;
        parent.add_child(this.root);
        this.buildScreen(parent);
        this.root.add_child(this.slab);
        const model = instantiateProductionModel("res://assets/held/killstreak-tablet.glb.bin");
        if (!model) throw new Error("Approved killstreak tablet model could not be loaded");
        model.set_name("KillstreakTabletModel");
        this.slab.add_child(model);
        // The screen, lit by its own UI.
        this.glass = material(new Color(1, 1, 1), 0, 0.05, new Color(1, 1, 1), 1.15);
        this.glass.shading_mode = BaseMaterial3D.ShadingMode.SHADING_MODE_UNSHADED;
        this.glass.albedo_texture = this.viewport.get_texture();
        const quad = new QuadMesh();
        quad.size = new Vector2(0.204, 0.124);
        quad.material = this.glass;
        const screen = new MeshInstance3D();
        screen.mesh = quad;
        screen.position = new Vector3(0, 0, 0.0014);
        this.slab.add_child(screen);
        this.arms = new HeldObjectArms(this.root);
        this.setLayers(this.root);
    }

    private setLayers(node: Node): void {
        if (node instanceof GeometryInstance3D) {
            node.layers = VIEWMODEL_VISUAL_LAYER;
            node.cast_shadow = GeometryInstance3D.ShadowCastingSetting.SHADOW_CASTING_SETTING_OFF;
        }
        for (const child of node.get_children()) this.setLayers(child);
    }

    private buildScreen(parent: Node): void {
        const viewport = this.viewport;
        viewport.size = SCREEN_PX;
        viewport.disable_3d = true;
        viewport.transparent_bg = false;
        viewport.render_target_update_mode = SubViewport.UpdateMode.UPDATE_ALWAYS;
        parent.add_child(viewport);
        const layer = new CanvasLayer();
        viewport.add_child(layer);
        const back = new ColorRect();
        back.color = new Color(0.02, 0.045, 0.06);
        back.size = new Vector2(SCREEN_PX.x, SCREEN_PX.y);
        layer.add_child(back);
        // A faint grid, like a tactical map behind everything.
        for (let index = 1; index < 12; index++) {
            const line = new ColorRect();
            line.color = new Color(0.1, 0.5, 0.55, 0.08);
            line.position = new Vector2((SCREEN_PX.x / 12) * index, 0);
            line.size = new Vector2(1, SCREEN_PX.y);
            layer.add_child(line);
        }
        for (let index = 1; index < 8; index++) {
            const line = new ColorRect();
            line.color = new Color(0.1, 0.5, 0.55, 0.08);
            line.position = new Vector2(0, (SCREEN_PX.y / 8) * index);
            line.size = new Vector2(SCREEN_PX.x, 1);
            layer.add_child(line);
        }
        const header = new ColorRect();
        header.color = new Color(0.05, 0.12, 0.14);
        header.size = new Vector2(SCREEN_PX.x, 34);
        layer.add_child(header);
        const text = (label: Label, size: number, colour: Color, y: number) => {
            label.add_theme_font_size_override("font_size", size);
            label.add_theme_color_override("font_color", colour);
            label.horizontal_alignment = HorizontalAlignment.HORIZONTAL_ALIGNMENT_CENTER;
            label.position = new Vector2(0, y);
            label.size = new Vector2(SCREEN_PX.x, size + 8);
            layer.add_child(label);
        };
        const top = new Label();
        top.text = "UPLINK  //  BATTLEDUTY        ▮▮▮▯  SAT 4";
        text(top, 15, new Color(0.45, 0.95, 0.9), 7);
        text(this.title, 40, new Color(0.95, 0.98, 1), 72);
        text(this.subtitle, 18, new Color(0.55, 0.8, 0.85), 124);
        this.buttonStyle.bg_color = new Color(0.85, 0.18, 0.1);
        this.buttonStyle.set_corner_radius_all(18);
        this.buttonStyle.border_color = new Color(1, 0.6, 0.45);
        this.buttonStyle.set_border_width_all(3);
        this.button.add_theme_stylebox_override("panel", this.buttonStyle);
        this.button.position = new Vector2(SCREEN_PX.x / 2 - 130, 190);
        this.button.size = new Vector2(260, 92);
        layer.add_child(this.button);
        this.buttonLabel.text = "LAUNCH";
        this.buttonLabel.add_theme_font_size_override("font_size", 42);
        this.buttonLabel.add_theme_color_override("font_color", new Color(1, 1, 1));
        this.buttonLabel.horizontal_alignment = HorizontalAlignment.HORIZONTAL_ALIGNMENT_CENTER;
        this.buttonLabel.position = new Vector2(0, 18);
        this.buttonLabel.size = new Vector2(260, 56);
        this.button.add_child(this.buttonLabel);
        this.barBack.color = new Color(0.08, 0.2, 0.22);
        this.barBack.position = new Vector2(80, 232);
        this.barBack.size = new Vector2(SCREEN_PX.x - 160, 16);
        layer.add_child(this.barBack);
        this.bar.color = new Color(0.35, 1, 0.85);
        this.bar.position = this.barBack.position;
        this.bar.size = new Vector2(0, 16);
        layer.add_child(this.bar);
        text(this.status, 20, new Color(0.45, 0.95, 0.9), 266);
    }

    /** Whether the tablet is anywhere in view (out, or on its way away). */
    get visible(): boolean {
        return this.root.visible;
    }

    /**
     * `id` is out `sinceMs` after the press, or null when no streak is: then
     * it puts itself away. Returns whether the finger just touched LAUNCH.
     */
    update(camera: Camera3D | null, id: StreakId | null, sinceMs: number, nowLocalMs: number): { tapped: boolean } {
        let tapped = false;
        if (camera && this.root.get_parent() !== camera) {
            this.root.get_parent()?.remove_child(this.root);
            camera.add_child(this.root);
        }
        if (id) {
            const rung = streakRung(id)!;
            if (this.shownId !== id) {
                this.shownId = id;
                this.title.text = rung.name.toUpperCase();
                this.subtitle.text = rung.how;
            }
            // Only a tap streak comes out on the tablet; the rest fade straight to their view (killstreaks.ts ACTIVATION).
            this.button.visible = true;
            this.barBack.visible = false;
            this.bar.visible = false;
            const pressed = sinceMs >= LAUNCH_TAP_AT_MS && sinceMs < LAUNCH_TAP_AT_MS + 260;
            if (sinceMs >= LAUNCH_TAP_AT_MS && this.lastT < LAUNCH_TAP_AT_MS) tapped = true;
            this.buttonStyle.bg_color = pressed ? new Color(1, 0.55, 0.2) : new Color(0.85, 0.18, 0.1);
            this.buttonLabel.text = sinceMs >= LAUNCH_TAP_AT_MS ? "LAUNCHED" : "LAUNCH";
            this.status.text = sinceMs >= LAUNCH_TAP_AT_MS ? "INBOUND" : "";
            this.lastT = sinceMs;
            this.putAwayFromMs = nowLocalMs;
            this.pose(sinceMs);
            this.root.visible = true;
        } else if (this.root.visible) {
            this.shownId = null;
            this.lastT = 0;
            const t = (nowLocalMs - this.putAwayFromMs) / PUT_AWAY_MS;
            this.poseClockMs = nowLocalMs;
            if (t >= 1) this.root.visible = false;
            else this.place(1 - smooth(t), 0);
            this.poseArms(camera, 0, 0);
        }
        return { tapped };
    }

    /** The tablet's pose `sinceMs` into the call-in. */
    private pose(sinceMs: number): void {
        const out = ease(sinceMs / (TABLET_OUT_MS * 0.75));
        // Up, the finger comes in and taps, then it drops away as the streak is sent.
        const away = sinceMs > LAUNCH_DONE_MS - 200 ? smooth((sinceMs - (LAUNCH_DONE_MS - 200)) / 400) : 0;
        this.poseClockMs = sinceMs;
        this.place(out * (1 - away), 0);
        const reach = smooth((sinceMs - (LAUNCH_TAP_AT_MS - 250)) / 250);
        const press = sinceMs >= LAUNCH_TAP_AT_MS ? Math.max(0, 1 - (sinceMs - LAUNCH_TAP_AT_MS) / 220) : 0;
        const back = smooth((sinceMs - (LAUNCH_TAP_AT_MS + 120)) / 300);
        const approach = reach * (1 - back);
        const camera = this.root.get_parent();
        this.poseArms(camera instanceof Node3D ? camera : null, approach, press);
    }

    private poseArms(camera: Node3D | null, approach: number, press: number): void {
        if (camera) this.arms.poseTablet(camera, this.slab, approach, press, this.poseClockMs / 1000);
    }

    /** `out` 0 (away) to 1 (rest); `dive` 0 to 1 pulls the screen up to fill the view. */
    private place(out: number, dive: number): void {
        const lerp = (a: number, b: number) => a + (b - a) * out;
        const x = lerp(AWAY.x, REST.x) * (1 - dive);
        const y = lerp(AWAY.y, REST.y) * (1 - dive) + -0.004 * dive;
        const z = lerp(AWAY.z, REST.z) + (-0.14 - REST.z) * dive;
        const tilt = lerp(AWAY.tilt, REST.tilt) * (1 - dive);
        this.root.position = new Vector3(x, y, z);
        this.root.rotation = new Vector3(tilt, (1 - out) * 0.25, (1 - out) * -0.2);
        // A hand-held wobble at rest.
        const wobble = this.poseClockMs / 1000;
        this.slab.position = new Vector3(Math.sin(wobble * 1.3) * 0.002, Math.sin(wobble * 1.9) * 0.0015, 0);
    }
}
