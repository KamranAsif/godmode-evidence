# Batch-2 Meshy map placement (#930)

Source PR commit: `c46cb6f63ebc4991865e0c95ac98abf076277abe`; based on merged #950 (`8bd12156e`).

The 13 approved flat Meshy families replace 592 primitive placements: newspaper boxes 71 (34 muted-red, 37 slate), utility cabinets 37, yard AC 104, wheelie bins 52, simple benches 51, simple lamp heads 10, traffic heads 23, landing cabinet 1, basic roof HVAC 206, water tanks 6, roof vents 15, rubber fenders 6, garden sheds 10. All 13 canonical archives match #950 hashes. Both newspaper clones repaint 2,523 warm body vertices and preserve glass/fittings and geometry.

Original 39,370 module placements are byte-identical after rebuilding placement rules. Original street dressing, collision and navigation inputs remain unchanged. Detailed native benches (35), curved-arm lamps (200), grille roof HVAC (29) and ribbed public bins (26) remain. Signal supports, landing structure, and fender suspension straps remain.

Repeated replacements use shared MultiMeshes, including the simple benches, street lamp heads and landing fenders. Street/roof output is regenerated through the module generators. Three historically `.generated.ts` files have no generator and are authored directly: `entry_street_details_modules.generated.ts`, `garden_yard_modules.generated.ts`, `yard_shed_lamp_modules.generated.ts`.

## Rendered map captures

Native 1920×1080 windowed GodotJS captures, off-screen at -10000,-10000; no image postprocessing.

- [Street: newspaper](after-street-newspaper.png)
- [Street: yard AC](after-street-yard.png)
- [Street: simple bench](after-street-benches.png)
- [Rooftop](after-rooftop.png)
- [Waterfront landing: six fenders and service cabinet](after-waterfront-landing.png)

## Draw calls

Engine `debug_render_stats`; median of three samples at identical camera poses and resolution. Before is main after #950, after is this branch. Both use the live builder and the current bake's unbaked fallback. Active AI/UI can vary slightly; these are whole-view draw calls, not an FPS benchmark. The waterfront comparison uses the original promenade context pose (`after-waterfront.png`); the closer landing capture above proves the fenders/service cabinet are present.

| View | Visible before -> after | Shadow before -> after | Total before -> after |
|---|---:|---:|---:|
| street-newspaper | 4095 -> 4001 | 6705 -> 6517 | 10858 -> 10578 |
| street-yard | 4071 -> 3932 | 5824 -> 5614 | 9958 -> 9613 |
| street-benches | 24927 -> 24296 | 6184 -> 6029 | 31176 -> 30392 |
| rooftop | 15778 -> 15411 | 12905 -> 12576 | 28752 -> 28052 |
| waterfront | 224 -> 220 | 654 -> 638 | 947 -> 925 |

## Validation

`pnpm format`, `pnpm build` including a real arena prebuild, strict prebuild check, and full root `pnpm test`: 13/13 steps passed. Saved client (24,755 nodes) and server (4,171 nodes) both match the live builder with no differences. Headless roguelite fixture loads without script errors and is stopped afterward.

Headless limitation: the Godot dummy renderer emits a shader diagnostic when loading prebuilt scenes; the local server and client still reach ready, with no script errors. Rendered baseline and replacement runs both also report existing native Point2 diagnostics. Logs are included.

Lighting limitation: the changed geometry invalidates 27 bindings in the existing bake. The engine plays unbaked until the next version bake; no lighting assets are hand-edited here.
