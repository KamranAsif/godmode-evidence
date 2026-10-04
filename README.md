# Map-wide architectural grain ? BattleDuty-aimbot

Kamran approved all three [previous survey trials](https://github.com/KamranAsif/godmode-evidence/tree/bridge-material-depth-20261004) on **2026-10-04: ?Add all?.** This branch implements that approval; the inherited survey files remain available for provenance and reproduction.

Before: `2383e59f6` (#937). After: the `art/map-wide-material-depth-20261004` implementation branch in `KamranAsif/Godmode.exe-roguelite`. Final source commit is recorded in `map-wide/validation/source.json`.

## Matched 1920?1080 captures

All eight survey cameras plus a street-level view use the same positions, targets and 75? FOV in both phases. Raw Godot viewport PNGs, owned windowed/off-screen instances at `-10000,-10000`, identical morning lighting, horizon enabled. Both sets deliberately use the same unbaked lighting (`GODMODE_STUDY_LIGHTING=off`) to isolate the material change; no lighting bake was run.

| View | Before | After |
| --- | --- | --- |
| Roof membranes and broad planes | [Before](map-wide/captures/roofs-before.png) | [After](map-wide/captures/roofs-after.png) |
| Coping and stone trim | [Before](map-wide/captures/trim-before.png) | [After](map-wide/captures/trim-after.png) |
| Upright concrete and kerb family | [Before](map-wide/captures/kerb-before.png) | [After](map-wide/captures/kerb-after.png) |
| Street-level context | [Before](map-wide/captures/street-before.png) | [After](map-wide/captures/street-after.png) |
| Bridge tower context | [Before](map-wide/captures/tower-shade-before.png) | [After](map-wide/captures/tower-shade-after.png) |
| Player-height tower | [Before](map-wide/captures/tower-player-before.png) | [After](map-wide/captures/tower-player-after.png) |
| Tower relief | [Before](map-wide/captures/tower-relief-before.png) | [After](map-wide/captures/tower-relief-after.png) |
| Bridge deck | [Before](map-wide/captures/deck-shade-before.png) | [After](map-wide/captures/deck-shade-after.png) |
| Waterfront context | [Before](map-wide/captures/pier-before.png) | [After](map-wide/captures/pier-after.png) |

Camera receipts and native logs: [before](map-wide/captures/capture-before.json), [after](map-wide/captures/capture-after.json), [before log](map-wide/captures/logs-before.json), [after log](map-wide/captures/logs-after.json). All 18 PNGs are 1920?1080; both capture logs contain zero `GODMODE_FRAME_ERROR` entries and zero uncaught script exceptions.

## Implemented treatments

- Roof membranes and broad roof planes: existing CC0 PaintedPlaster017 as a fine matte membrane proxy, 1.4 m scale; albedo/base-normal/detail-normal strengths **0.12 / 0.25 / 0.18**. No sheet grid. The authored dark roof retains its original colour and scene-only lighting.
- Cornices, coping, parapets, quoins, belt courses and door surrounds: existing Concrete016, 2.4 m scale, strengths **0.20 / 0.45 / 0.18**, in the original stone colour.
- Upright kerbs and stair/concrete risers: Concrete016 at the ground?s matching 2.4 m scale and the same reduced **0.20 / 0.45 / 0.18** strengths. Horizontal ground texture parameters remain unchanged.

The existing randomly rotated/offset hex-cell blending and separate base/detail normals supply seamless grain without joints or tile grids. Shared factories cover ordinary map meshes, fallback surfaces outside the study regions, and module batches. Modeled mouldings and facets remain. Small painted HVAC/service metal has a separate flat finish; trees, foliage, glass, road paint and distant skyline remain under their existing treatments. No new texture source or image editing is involved; [the inherited source receipts](texture-provenance.json) retain CC0 provider URLs and hashes.

[Runtime material inspection](map-wide/captures/materials-after.json) confirms the configured families on 106 roof mesh surfaces, 5,154 stone-trim surfaces and 1,203 concrete surfaces in the loaded scene (these are inspected surface uses, including source/instanced meshes, not unique assets or draw calls).

## Validation

Build, lint, formatting, full test-suite and headless/rendered smoke receipts are under [`map-wide/validation`](map-wide/validation). **`pnpm test`: 13/13 steps passed; build, lint and formatting passed. After rebasing onto #938, build/lint and all 554 unit tests passed again. Both gameplay smoke runs produced a grounded player at 100 health with 30/90 ammo and zero frame errors or uncaught script exceptions.** Validation outcomes are recorded in `summary.json`. The original version atlas and bake records are preserved; current materials use the existing stale-atlas fallback until a future version bake. Capture-only camera/material actions are retained under [`map-wide/reproduction`](map-wide/reproduction) and excluded from the game PR.

The cold importer spent time recompressing the existing HDR atlas. Validation reused engine-generated import outputs from a local warm cache, with the atlas?s source MD5 verified first; `godot-cli project import` then refreshed four weapon imports and verified current source fingerprints. No cache output or temporary capture action is part of the source change.
