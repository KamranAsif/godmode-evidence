# Signed final vision audit: enemy impact-local triangles

**ALL PASS for the scoped enemy-hit change in ff17b8a07498ec578de4896c358cae3ff570c782.** No scoped production fix required. This supersedes the preserved provisional `vision-report.json/md`.

Signed: **Codex /root**, session `juice2-codex-vision-root-20261007T022545Z`, 2026-10-07T05:50:22.958754Z. This is an auditor attestation, not a cryptographic signature. Source worktree: `D:/work/godmode-roguelite-worktrees/juice-enemy-hit`; parent `9bc2d5ac3d29f25fd80c261c06f3ae0f5a46da46`. HEAD rechecked unchanged and tracked working tree clean. Associated draft PR: [#1001](https://github.com/KamranAsif/Godmode.exe-roguelite/pull/1001). No PR action or merge performed.

The captured supported riflemen show localized white triangle facets while surrounding face, helmet, armor, red shoulder accents and held gun retain their original detail. The broad red wash visible in the control is absent in the candidate. The existing prepared mesh/helper/shader and player-hit signature are reused. Diff scope is only `scripts/game_world.ts` and `scripts/runtime_actions/inspection_state.ts`; no asset, shader, style, gun, camera, map, hands, AI or spawn edit.

## Gate decision

| Gate | Decision | Evidence |
|---|---|---|
| real-target-combat | PASS_OBSERVED | Three ADS gun kills and kill snaps in each capture; runtime kill records and rendered kill markers corroborate ordinary actual combat, plus surviving fourth target reactions. |
| clear-local-triangle-signature | PASS_OBSERVED | Candidate native 3/5/7 chest; 18/20/21 second chest; 39 third chest; 57/58 head. MP4 frames 18-29 and 126-128 show chest/head facets. |
| no-supported-rig-whole-red-wash | PASS_OBSERVED | Control red wash in native 3-14,19-30,38-54,61-75. Candidate never shows comparable full-body red tint across reviewed 0-87. Original red shoulder accents persist. |
| original-material-and-rig-detail | PASS_OBSERVED | Face/helmet/shoulder and dark armor remain outside chest patches. At 58 head facets coexist with dark torso/red shoulder. Native 59-87 has intact moving head/limbs/held gun and recovered materials. Sampled preparation errors: position 0, weight 0. |
| scope-and-existing-signature | PASS_SOURCE_REVIEW | Diff is 40 insertions/11 deletions in two files. Existing prepared triangle mesh/helper and shader reused; no assets/shader/style/gun/camera/map/hands/AI/spawn changes. Player-hit triangle implementation unchanged. Inspection exposes existing stats. |
| gun-ADS-HUD-regression | PASS_OBSERVED | No new visible deformation of player gun/ADS silhouette or HUD in all native full scenes. Camera snaps, kick, reticle/kill markers and panels remain recognizable relative to control. Source excludes these systems. |
| 140ms-flinch | PASS_SOURCE_AND_OBSERVED | SYSTEM_ADMIN_HIT_FLASH_MS remains 140 and the original scale calculation remains unchanged. lifecycle-flinch-v3: one ordinary shot, e4 health 128->108. Native 7 visualScale 0.9447143078, native 8 0.9760000110, native 9 equals baseScale 1. Mesh fracture remains active through native 10 and restores at 11, distinguishing the two lifetimes. |
| 260ms-expiry-restoration | PASS_SOURCE_AND_ISOLATED_RUNTIME | lifecycle-expiry-death-v2 e4: ordinary nonlethal shot, health 128->108 at native 6/server33143. Original mesh true before hit, false while active. Native 12/server33392 remains active; native 13/server33427 is originalMesh true with activations/restorations/activeParts 1/1/0, target alive at 108. No intervening damage, death, cull or reset. Source sets existing LATTICE_IMPACT_LIFE_MS deadline and restores when due. |
| restore-before-death | PASS_SOURCE_AND_ISOLATED_RUNTIME | lifecycle-expiry-death-v2 e4 native60 active/originalMesh false -> native61 nativeDeath true/originalMesh true, counters2/2/0. Last nonlethal damage server35252, death server35367 (115ms). e5 native79 active/originalMesh false -> native80 nativeDeath true/originalMesh true, counters3/3/0; last damage36617->death36783 (166ms). Both ordinary gun deaths occur before260ms expiry and after recent active fracture. Source restores before nativeDeath setup. |
| restore-before-cull | PASS_CONTROLLED_PRODUCTION_PATH | lifecycle-cull-v2: e6 native4/server54537 health109, activeParts1, originalMesh false, visible local chest patch. Explicit juice_cull_target fixture adds e6 to the existing culledPatrols Set; production sync restores and retires it. Native5/server54628 actor absent while health109 remains, counters4/4/0. Only91ms between snapshots rules out260ms expiry. Source restore precedes queue_free/delete. |
| restore-before-reset | PASS_SOURCE_AND_ISOLATED_RUNTIME | lifecycle-reset-v2 ordinary leave_match action beforestate at wall0.261792/server78962: e12 health110, originalMesh false, fracture5/4/1. Immediate afterstate wall0.269121: server0, actors/enemies empty, mainMenu true, fracture5/5/0. Native6 and all later samples corroborate cleared scene and zero activeParts. Source restores all visuals before queue_free and clears both maps. |
| no-active-fracture-leak | PASS_ISOLATED_PATHS | All accepted clips start/end at activeParts0. Expiry/death ends3/3/0; controlled cull ends4/4/0; ordinary reset ends5/5/0; separate one-hit flinch clip ends1/1/0. Isolated active transitions and restoration deltas support each cleanup path, rather than relying only on the original aggregate0->6 totals. |

## Exact lifecycle observations and limits

- **Expiry:** `lifecycle-expiry-death-v2` e4 loses health128->108 at native6/server33143. Mesh reference changes true->false. It remains false/active at native12/server33392; native13/server33427 is true with1/1/0 and health108 unchanged. Recovery is bracketed249-284ms after the first damaged snapshot, consistent with the source260ms lifetime. No intervening shot/death/cull/reset confounds this event. This is sampled timing, not an exact260.000ms measurement.
- **Flinch:** `lifecycle-flinch-v3` is one ordinary actual hit. Native7 visual scale is0.9447143078, native8 is0.9760000110, native9 returns to base1 while fracture remains active through10; original mesh returns at11. Scale recovery lies between snapshot offsets88 and155ms, consistent with the unchanged140ms scale formula. Snapshot and rendering phases differ; the separate250ms AI flinch value is not this visual flinch.
- **Death:** expiry/death native60->61 changes active/originalMesh false to nativeDeath true/originalMesh true with2/2/0. Recent damage->death is115ms. Native79->80 repeats this on e5,166ms after recent damage, ending3/3/0. Both occur before260ms expiry. Production restores before death setup. Camera snaps limit continuous death-animation visibility; mesh identity provides stronger evidence than apparent patch disappearance alone.
- **Cull:** `lifecycle-cull-v2` native4 has e6 health109, active mesh, visible local chest patch approximately(x938,y540). The explicit fixture adds e6 to `culledPatrols`; production sync restores and removes it by native5 while snapshot health remains109 and counters become4/4/0. The91ms snapshot interval excludes expiry. Native6 health89 reflects a queued ordinary shot after retirement without a new actor or activation. The approved gate is restoration before production retirement. **This is controlled input to the production cull path, not organic survival culling or proof of the far-distance selection predicate.** Original far-teleport `lifecycle-cull` is excluded because it showed expiry only.
- **Reset:** ordinary `leave_match` beforestate at wall0.261792 has e12 health110, originalMesh false and5/4/1; immediate afterstate wall0.269121 has no actors/enemies, menu true, server0 and5/5/0. Native6 onward corroborates the cleared scene. The7.329ms action interval excludes expiry. The active hit/reset happens between native5 and6, so active-state proof comes from the real action beforestate, not a captured reset impact image.
- **No leak:** all accepted clips end at activeParts0 with balanced activations/restorations. References return true after expiry and on nativeDeath bodies. Source restores before free/reset and clears flash/fracture maps. This is finite isolated path coverage, not an exhaustive concurrent all-rig stress test.

The ignored wrapper uses ordinary production input/leave_match actions and read-only inspection/actor mesh-reference observations. Its only controlled game-state mutation is the disclosed culledPatrols residency input. It contains no hit, swap, restore, timer or free calls. The unrelated `review.gd` feedback fixture is not loaded by the accepted lifecycle scene.

## Visual coverage and integrity

All130 control and88 candidate full native1920x1080 scenes were individually viewed at original resolution. Each original combat MP4's181 decoded frames was reviewed sequentially in a1:1 impact/ADS pixel region `(720,380)-(1200,740)`. No thumbnail decision, spatial resize or synthesized capture frame was used.

All222 supplementary native impact regions and all353 decoded supplementary MP4 impact regions were reviewed sequentially at1:1. Additional full native scenes reviewed individually:

| Clip | Native ROI frames | MP4 ROI frames | Full original native frames additionally viewed |
|---|---:|---:|---|
| expiry/death-v2 | 0-86 | 0-138 | 6,13,61,80,86 |
| cull-v2 | 0-22 | 0-68 | 4,5,22 |
| reset-v2 | 0-85 | 0-90 | 0,5,6,7,26,85 |
| flinch-v3 | 0-25 | 0-53 | 7,8,9,11,25 |

Supplementary full scenes were not all individually viewed; encoded full scenes were not all individually viewed. Full original combat scenes supply before/after gun, ADS, HUD and rig context, while every encoded impact region supplies frame-by-frame effect detail. No normal-speed playback or audio/TTS evaluation was performed. Reset native26-85 have identical settled-menu RGBA bytes, with distinct telemetry samples.

All candidate88 and supplementary222 rawRGBA bytes match their encoding receipts' `rawSha256`; PNG decodedRGBA also matches. All supplementary MP4 hashes match their receipts. Full hashes, selected original telemetry/action objects, native frame times and review coverage are in `final-vision-report.json` and `lifecycle-review/integrity.json`.

The earlier badHashes result compared encodedPNG bytes against rawRGBA SHA and was an auditor error. Correct raw-byte and decoded-PNG checks find no corruption; the first candidate expected/actual RGBA hash is `e2b56e26ef63c25e1291bd478b350dd5b1816da5eca3fc392cd3c638eff43bb8`.

## Selected after still

**Native candidate frame58**,4.275853s/renderFrame298: exposed head facets approximately `(926,476)-(961,517)` above the ADS post; dark torso and red shoulder remain intact. Path: `artifacts/juice/after-enemy-hit/frame-0058.png`. PNG SHA256 `57708bf65f257692e6ba33570942b9d32446ca4dd5758c16c082316b8b3a05a3`; rawRGBA SHA256 `e080efd23dfe643f5c57fd2be15eb52eefffd85622251015be0a47535c92ac0b`. Frame7 is a closer chest alternative but the ADS post hides more of its patch.

## Limits and separate existing-system observations

Control initial acquired range8.878m versus candidate3.221m; later snap ranges11.4m versus12m. This is qualitative appearance comparison, not identical camera/range or numerical recoil trajectory comparison. Main candidate max native gap431.458ms; supplementary max gaps192.515/137.048/124.247/86.869ms.30fps MP4 holds/drops measured native frames, so its frame count adds no native motion observations. No precise shimmer, render-performance, every-pose or all-rig certification is implied.

Capture receipts do not embed executable/source SHA. Unchanged checkout HEAD, logs and owner provenance support attribution, with that limit retained. Public lifecycle provenance is owner corroboration, not an audit.

ADS front-post occlusion, large gold kill banners, stream panels, existing enemy/world style and muzzle flashes remain separate from this change. Reset native26/85 retain minimap, stream/challenge panel, supply marker and cheat-slot HUD over the menu. No HUD/menu edits are in this candidate; without matched reset control its before/after attribution is unproved. Record this separately from the enemy-hit gate. Standing directions about fewer larger enemies, hidden spawns, toughness/fairness, distinct game/stream/cheat HUD and stream/TTS highlights are not whole-game approvals conferred by this effect audit.

Owner validation log read: root `pnpm test`13/13 green,0 failed. Owner reported build/scripts lint and613 units green before rebase. Auditor ran no tests, imports, engines or GPU work. Only read-only source/evidence inspection, CPU image/video decoding and writes inside this auditor's artifact directory were performed.
