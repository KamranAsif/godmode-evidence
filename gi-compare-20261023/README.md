# BattleDuty V2 GI comparison - 2026-10-23

Source: `ad644d3387a83e6acf6a2e5f3232e8ac86444157`, current origin/main when this task began. This is the approved sculpted warm V2, independent of the concurrent V3 branch. Patched GodotJS revision 2 at `C:/tools/GodotJS-4.6.1-v8-nopc-2`.

- A: current SSIL, radius 12 m, intensity 2.7, sharpness 0.98, normal rejection 1.
- B: existing SDFGI debug option, DAYLIGHT defaults: 0.4 m minimum cell size, four cascades, bounce feedback 0.5, energy 1, occlusion and sky light on.
- C: GI off. SSAO remains enabled.
- B2: one brighter-fill SDFGI trial, energy 1.35 rather than 1.0; all other V2 and SDFGI settings remain fixed. A temporary optional debug-action parameter records/applies this value, without changing defaults; `b2-debug-hook.patch` preserves it. An ambient-only probe was nearly pixel-identical and was discarded before final capture.

All three preserve V2 exposure 0.70, cool ambient 0.75, the same gold sun, shadow policy, materials, geometry, and SMAA. FSR2 is disabled. No saved settings or production defaults were changed, and no PR was requested.

The existing debug path reports `sunBakeMode: 0` (BAKE_DISABLED) in every capture. This sun therefore contributes no indirect light to SDFGI; sky and eligible practical lighting still participate. This is a comparison of the existing option with the requested DAYLIGHT constants. [Godot 4.6 documents these light/GI modes](https://docs.godotengine.org/en/4.6/tutorials/3d/global_illumination/using_sdfgi.html#sdfgi-interaction-with-lights-and-objects).

## Images

Each sheet has three unscaled native 1920x1080 cells, A | B | C, with a separate label band. Individual `view-A.png`, `view-B.png`, and `view-C.png` files are untouched viewport captures.

- [Shop](shop-sheet.png)
- [Facade](facade-sheet.png)
- [Bridge](bridge-sheet.png)
- [Fight](fight-sheet.png)
- [Side street](side-street-sheet.png)
- [Wide](wide-sheet.png)
- [Supplemental gun and enemy view](fight-gun-sheet.png)
- [200 percent difference crop](difference-crop-200pct.png)
- [B/B2 native shop and bridge comparison](b2-fill-trial-sheet.png)

The six exact poses and FOV 75 come from `docs/art/lighting-lookdev-20261022.md` on `lookdev/lighting-20261022`. The supplemental gun view uses the player's actual standing eye; its exact position is in the validation receipt. The simulation is paused within every A/B/B2/C set. Camera positions, identical actor snapshots, simulation timestamps, and lighting invariants are checked before upload. Switching views briefly resumes the simulation so the free camera can update. SDFGI receives five seconds of rendered settling at each pose. Images use `godot-cli game capture --os-window` at native client resolution, avoiding the huge optional scene-tree snapshot in the viewport capture response.

## Visual verdict

SDFGI visibly deepens awning, planter and tree contacts and gives the shaded street/bridge a broader cool fill. It also turns some small shaded objects almost black and shifts bridge steel and the gun toward warmer reflections; B2 energy 1.35 lifts fill modestly while retaining the broad blue shade and dark recesses. Current SSIL and GI off are much closer in these stills because SSAO and the V2 ambient remain active in both.

Default SDFGI costs 0.36-0.49 ms in the median (2.0-3.1%) in this existing debug path; bridge p95 rises 2.23 ms (9.7%). This is a modest median cost for a noticeable change of shade, with a larger bridge tail cost. Kamran's visual pick remains open.

The 200% crop uses the highest mean absolute RGB-byte A/B difference among 640x400 windows sampled every 20 pixels across the six canonical views: shop `[140,360,780,760]`, about 17.93/255. This selects a visible difference, not a quality score. No grading or generated imagery was used. Some paused free-fly actors retain animation/LOD transition poses, identical in all columns; the supplemental gun frame includes posed enemies and the native first-person weapon.

## Timing

Standard `tools/performance/gameplay-benchmark.mjs`, 2560x1440, full detail, SMAA, bilinear scale 1, TAA off, FSR2 off, frame profiling/statistics off, seed `43BA771E`, 65 enemies, 10 s startup warmup. Subsets: `firefight-65,shopping-street,under-bridge`. The fight includes its standard 13 s crowd settling and 30 s measured window; street and bridge are 12 s each. Runs are interleaved A1/B1/A2/B2/A3/B3, each under a separate exclusive five-minute timing hold. The temporary harness hook applies the selected GI through the existing `debug_lighting` action before warmup and preserves its receipt; the identical hook is present in both arms. `benchmark-hook.patch` records it.

All B timing files use default SDFGI energy 1.0. The tuned visual B2 trial is not timed.

Results on RX 9070 XT, AMD driver `32.0.32015.7029`, D3D12. Values are the median of the three per-run statistics, not percentiles pooled across runs. All three pair comparisons pass the standard harness/workload/hardware checks.

| View | A median / p95 / p99 ms | B median / p95 / p99 ms | Median delta | p95 delta |
| --- | ---: | ---: | ---: | ---: |
| firefight-65 | 15.69 / 19.41 / 20.55 | 16.18 / 19.60 / 21.00 | +0.49 ms (3.1%) | +0.20 ms |
| shopping-street | 11.63 / 16.76 / 18.38 | 11.98 / 17.09 / 21.76 | +0.36 ms (3.1%) | +0.32 ms |
| under-bridge | 18.32 / 23.06 / 32.23 | 18.68 / 25.29 / 61.43 | +0.36 ms (2.0%) | +2.23 ms |

The three A-run median ranges are firefight-65: 15.605-15.731 ms, shopping-street: 11.576-11.654 ms, under-bridge: 18.265-18.332 ms. Every paired median delta is positive. Fight/street p95 differences are within the observed A-run p95 ranges; the bridge p95 increase is larger than that baseline variation. Per-run medians, p95, p99, raw frame samples and GI-state receipts are in `timing/`; `timing-summary.json` retains ranges and pair deltas.

The first attempted A run was rejected for VSync mode 1. The final harness explicitly sets VSync disabled and max FPS 0 at readiness, enforcing the standard benchmark contract after client settings apply. All six reported samples use that same harness; the rejected attempt is excluded.

## What a lightmap trial would take

A test bake needs an isolated, opt-in export and load path: the current exporter and runtime loader both reject LightmapGI. Reuse the existing study pipeline to export the current arena into a script-free staging project, derive UV2 for eligible static receivers, handle batched/procedural surfaces and baked material response, add LightmapGI and street-height probes, then bake with official Godot 4.6.1 rather than GodotJS. Start with shop/bridge crops, using the existing 0.5 m contact/1 m large-chart targets, three indirect bounces and a dynamic direct sun; then import, bind, validate and compare native static and moving-receiver views. Current-arena elapsed time and RAM/VRAM are unmeasured. The old harness permits up to 10 minutes for export, 30 for preparation and 30 for baking; those are timeout budgets, not measured runtime. A trial must fit/split its GPU work into the agreed holds or obtain a separately scheduled bake window. No bake was prototyped here.

References: [study bake workflow](https://github.com/KamranAsif/Godmode.exe-roguelite/blob/ad644d3387a83e6acf6a2e5f3232e8ac86444157/tools/maps/study/README.md), [current export rejection](https://github.com/KamranAsif/Godmode.exe-roguelite/blob/ad644d3387a83e6acf6a2e5f3232e8ac86444157/scripts/debug/prebuilt_arena_export.ts#L1009), [current runtime rejection](https://github.com/KamranAsif/Godmode.exe-roguelite/blob/ad644d3387a83e6acf6a2e5f3232e8ac86444157/scripts/prebuilt_arena.ts#L323).

## Validation and cleanup

`pnpm install`, the godot-cli rebuild, seeded imports, `godot-cli project import --project .`, and `pnpm build:scripts` completed in the owned worktree. Targeted lighting/debug-action tests passed 15/15 and benchmark-report tests passed 11/11. All 28 final cells pass native-size, pose/FOV, actor snapshot, frozen simulation-time and lighting-invariant checks; capture logs contain only the intentional fixed-spawn visibility diagnostics. The report comparisons accept all three A/B pairs with identical harness/workload hashes and the same verified arena receipt. All owned engines stopped, GPU holds released and the session ended. Temporary source and runner hooks are restored; the game working tree is clean. No PR, saved-settings change or lightmap bake was made.
