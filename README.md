# Bridge shading and texture candidates

BattleDuty-aimbot, source base `ac138defd`, 2026-10-04.
Part 1 source commit: `f507cc3db` on `codex/bridge-material-depth` in
`KamranAsif/Godmode.exe-roguelite`. Capture-only controls are excluded from that
commit. Shader/material/model input fingerprints are retained in each bake manifest.

Part 1 is approved for implementation. Part 2 is a proposal only: none of its
material trials belongs in the game PR. Images are raw Godot viewport captures
from owned, windowed, off-screen instances, with matched 1920×1080 cameras.

## Before / after previews

| Comparison | Before / control | After | Assessment |
| --- | --- | --- | --- |
| Part 1 shaded tower | [Before](captures/tower-shade-before.png) | [After](captures/tower-shade-after.png) | Recesses read more strongly; base stays gently darker, stone remains subdued. |
| Part 1 tower relief close-up | [Before](captures/tower-relief-before.png) | [After](captures/tower-relief-after.png) | Shallow ledges create local top/underside contrast without covering the blind arches. |
| Part 1 player-height tower | [Before](captures/tower-player-before.png) | [After](captures/tower-player-after.png) | Architectural relief and grain remain readable near the tower. |
| Part 1 bridge deck shade | [Before](captures/deck-shade-before.png) | [After](captures/deck-shade-after.png) | Dense hero receiver inputs are exercised with the matching crop atlas. |
| Part 2 roof planes | [Control](captures/roofs-after.png) | [Texture trial](captures/roofs-trial.png) | Very small change in this wide view. Preserve facets; lower priority than masonry. |
| Part 2 coping / stone trim | [Control](captures/trim-after.png) | [Texture trial](captures/trim-trial.png) | Low-strength grain is restrained; modest payoff, no general approval implied. |
| Part 2 upright concrete / planter and kerb family | [Control](captures/kerb-after.png) | [Texture trial](captures/kerb-trial.png) | Existing horizontal concrete is unchanged; upright grain is hard to distinguish at this distance. Optional material consistency candidate. |
| Waterfront context (Part 1 only) | [Before](captures/pier-before.png) | [After](captures/pier-after.png) | Existing timber exception is retained; no new pier texture ships. |

Recommendation: approve any broader textures by substrate, not as a blanket
rule. These conservative trials have modest visual payoff. They support keeping
small metal and painted props clean, and prioritizing broad masonry before roof
micrograin. All three trial families remain unshipped pending Kamran's decision.

## Surface survey (whole map)

| Surface family | Current finish / decision | Proposed texture treatment |
| --- | --- | --- |
| Building wall shells, brick, plaster, concrete | Already layered grain under #904 | Retain Concrete016 grain in each substrate's colour; no mortar pattern. |
| Bridge tower masonry and tan dressing | Part 1 approved | Same 2.4 m stochastic concrete grain and fine normal, all masonry faces; physical relief rather than drawn seams. |
| Roof membranes and broad roof planes | **Best candidate; preview** | Fine matte membrane/plaster micrograin: very low albedo contrast, restrained normal, no roofing-sheet grid. |
| Stone cornices, coping, parapets, quoins, belt courses, door surrounds | **Best candidate; preview** | Concrete016 at low strength in the existing stone colour; preserve modeled mouldings and facets. |
| Kerb tops, pavements, plaza, paths, promenade | Already textured | Retain approved concrete. |
| Vertical kerb risers / stair risers | **Candidate; preview** | Extend the ground concrete onto upright faces at matching scale, less normal strength; no joints. |
| Asphalt roads and bridge roadbed | Already Asphalt031 grain | Retain; no added cracks, seams, painted wear or grime. |
| Non-asphalt hardscape, steps, pier concrete edges, retaining walls | Candidate with trim / kerb trials | Match the concrete substrate grain; do not texture road markings. |
| Gravel / exposed soil in planting beds | Later candidate | CC0 seamless granular soil with stochastic blending; subtle relief, no large patches. |
| Lawns | Already layered Grass001 | Retain approved grass and faint underlying facets. |
| Tree bark, shrubs and foliage | Keep current authored / flat finish for now | Fine grain at this scale would alias; silhouette and crown shading contribute more. |
| Timber piers, dock piles and deck supports | Already scoped timber grain under #917 | Retain grain following each piece and localized waterline variation; do not overlay stone grain. |
| Dock deck timber | Already timber material | Retain; inspect consistent timber identity before requesting another exception. |
| Pier steel bands, bridge trusses, cables, railings | Keep flat | Small silhouette features; extra grain would clutter and shimmer. |
| Roof HVAC, ducts, tanks, fire escapes, window frames | Keep flat | Existing modeled fins, seams and silhouette supply construction detail. |
| Street lamps, hydrants, bollards, bins, sign poles, metal furniture | Keep flat | Small painted metal: lighting and modeled curves lead; no indiscriminate concrete finish. |
| Broad concrete planters / masonry street furniture | Later candidate | Same low-strength stone grain as trim, kept off metal inserts and foliage. |
| Wooden benches, sheds and fences | Later candidate | Seamless CC0 timber grain aligned with individual boards; low contrast, no extra board lines. |
| Awnings / canvas | Later candidate | Fine CC0 woven fabric normals at low strength; preserve broad colour, no logos or printed pattern. |
| Traffic signs, crosswalks, road paint, markings | Keep flat | Legibility benefits from clean paint; no noise or wear. |
| Glass windows, vehicle glass | Keep existing glass | Reflection/interiors supply variation; surface grain would suggest dirt or frosted glass. |
| Doors, shutters, gates and painted facade panels | Keep flat pending substrate-specific review | Small painted panels retain clean colour; broad wood or stone panels can follow their material family after approval. |
| Brick/paver hardscape and road-adjacent modular slabs | Keep current finish | Do not add a drawn paving or joint grid; any future grain must preserve the modeled divisions. |
| Parked sedans and vans | Already approved Tencent PBR exception | Retain authored textures and 35% normals, no added grain. |
| Cordon wrecks, barriers, crates, other generated props | Keep flat pending individual review | Material-specific candidates only; baked multi-material atlases cannot accept a global grain overlay safely. |
| Rubber tyres, dark plastics, lamp lenses | Keep current finish | Small/dark surfaces gain little from extra texture at gameplay range. |
| Water, river foam, combat VFX and lattice | Existing animated surface / exemptions | Outside this texture expansion. |
| Distant skyline shells | Keep broad flat finish | Texture would be subpixel; use the Part 1 ambient gradient for architectural depth. |

## Trial sources

Reuse the existing CC0 ambientCG Concrete016 and PaintedPlaster017 maps rather
than importing more texture assets for this first comparison. Their provider URLs,
archive hashes and unmodified file hashes are copied in `texture-provenance.json`.
Physical texture scales are art-directed. Every trial uses the existing randomly
rotated/offset hex-cell blend and separate base/detail normals; no image contains
a designed seam or tile grid. Roofs use plaster as a fine matte proxy, not a claim
that the real roofing material is plaster. More specific CC0 membrane, timber,
fabric or soil sources would need a separate approval and provenance record.

See the capture manifests and bake receipts for camera positions, source state,
crop scope and atlas size. The crop is diagnostic only, never the release atlas.

## Capture and bake method

| Crop measurement | Before | Part 1 after |
| --- | ---: | ---: |
| Static receivers / unique meshes | 93 / 91 | 93 / 91 |
| Placed triangles | 788,952 | 789,780 |
| Requested UV texels | 2,841,908 | 3,590,212 (+26.33%) |
| Hero receivers at 0.5 m | none | 5; 1,436,852 requested texels |
| Other receivers' target | 1 m | 1 m |
| Primary atlas packing | 2048×1024×8 | 2048×2048×4 |
| Primary BPTC atlas, base level | 16 MiB | 16 MiB (unchanged) |
| Raw EXR | 39,713,514 bytes | 48,742,261 bytes (+22.74%) |
| Probes | 9,274 | 9,274 |

Packing, directional slices, mipmaps and auxiliary textures make requested texels
different from total resource memory. The table reports the primary atlas base
level only. No full-map atlas size is claimed; that depends on packing in the
next version bake. Maximum dimension remains 8192. The after bake completed in
13:09.77 and emitted probe BSP-triangulation warnings, retained in its native log.

The tower relief changes geometry fingerprints. With the preserved checked-in
version atlas, the game's existing stale-atlas guard will therefore play unbaked
until the next version bake. These audit captures bind the matching crop atlas.
The PR deliberately supplies new bake inputs without replacing release lighting.

Both bridge bakes use the same `--crop "-556,-456,65"`, medium directional
LightmapGI settings, 8192 maximum atlas dimension, denoiser range 10, Godot 4.6.1
native baker and morning sky/sun. The distant horizon is excluded from bake export
(`GODMODE_CITY_HORIZON=0`); it is present in both runtime capture sets (`=1`).
Receivers intersecting the crop are exported whole. This is a cropped audit, not
a full lighting bake, and the checked-in version lighting bundle is preserved.

The original native staging omitted the dynamic vehicle paint shader dependency;
its baseline export logs record those load errors. Vehicles are not static
receivers, and runtime captures load their normal materials. Part 1 also fixes
that staging dependency. Runtime snapshot collection produces existing camera
projection warnings; inspect the retained logs separately from shader/script
failures.

Part 2 compares the **Part 1-only `*-after.png` control** with `*-trial.png` in
the same disposable runtime process and camera. The older `trim-before.png` and
`kerb-before.png` use exploratory framing and are not the Part 2 controls. Trials
change only texture uniforms; ambient gradient and geometry remain identical.

Trial strengths (albedo / base normal / detail normal): roofs 0.12 / 0.25 / 0.18
at 1.4 m; stone trim and upright concrete 0.20 / 0.45 / 0.18 at 2.4 m.
No source image is altered. The shared material trials reach instanced module
batches as well as ordinary meshes. `captures/texture-trials.json` records the
material families and surfaces selected (GodotJS path coercion yields an
uninformative object string in that diagnostic); the trial code is retained under `reproduction/` and
removed from the game PR. These are proposed exceptions, not approvals.

To reproduce on the source branch, compile the temporary preview actions before
capturing. `reproduction/install-preview.py` installs texture controls; the
camera action accepts finite `position` and `target` triples and calls the study
camera's `look_at`. The capture manifest records every accepted camera action.
The audit adapter skips redundant source-project imports after a completed
GodotJS resource import; native script-free staging imports remain enabled.

## Validation

`pnpm format`, `pnpm build` and `pnpm lint` completed successfully (lint: zero
errors, five existing max-lines warnings). The three targeted unit files passed
13 tests. The final headless roguelite run returned a live grounded player at
100 health with 30 loaded / 90 reserve ammo; its owned session was stopped.
It confirmed `stale:1` at `SurvivalChunks/BridgeDressingVisualOnly` and the
existing unbaked fallback with the preserved version atlas. No script errors
were found. `smoke.json` and `validation/` retain the inspection and check output.
All rendered captures used windowed off-screen instances, and both native bakes
used the cropped audit only. Part 2 controls were removed before the final build.
