# BattleDuty performance investigation — 10 October 2026

The 60 fps / p99 <25 ms target is **not met**. Native geometry improvements and encounter preparation help substantially, but heavy combat still has frequent CPU-side stalls. No lighting quality cut is included.

Hardware: RX 9070 XT 16 GB, Ryzen 9800X3D, 32 GB RAM, Windows D3D12 Forward+, GodotJS 4.6.1 V8 no pointer compression. Full-detail uncapped standalone project runs using the pinned editor executable without editor mode; these are release-like, **not measurements of the published exported executable**. The runtime inspection bridge is excluded from exports. A real exported release comparison remains outstanding.

Paired geometry measurements retain arena revision 6dd43f1 so approved art changes do not contaminate comparisons. A separate five-camera final-art validation used performance revision fd71f1a5f on main 0147d9334; these are unpaired readings, not current-main frame measurements. The resumed branch has since incorporated newer main changes. Each engine owns a session and exact instance. The original coordination panes %213 and %219 disappeared; resume holds were announced to replacement AgentView panes and released after stopping only the owned rendered engine.

## Changes

- Generate native mesh LOD index buffers offline for eligible static meshes. Original packed positions, normals, colors, AO, materials and skin data remain intact. Add sequential indices to unindexed geometry without changing base triangles. Existing LOD biases remain unchanged.
- Add 372 exact opaque masonry triangle occluders, preserving facade holes. No broad bounding-box occluders or geometry removal.
- Prepare encounter bodies, mechanical models, supply crates and observed audio during loading. Serial threaded resource requests avoid the pinned D3D12 dependency deadlock; GLB-byte templates are packed one per loading-screen frame. Draw actual body materials and blast VFX in an undisplayed viewport before going live. Retain original GodotJS wrappers to avoid dead-wrapper lifetimes.
- Spread existing distant animation samples over stable actor phases without reducing the existing sample rates. Gate per-shot/per-target console noise behind GODMODE_TRACE_COMBAT=1. Reuse immutable explosion heat shader and curve resources while preserving emitter counts, timing and settings.
- Add opt-in lifetime hitch, resource-load and slow-section traces, plus raw runtime-frame JSON output. These diagnostics remain off unless GODMODE_FRAME_PROFILE=1.

Geometry costs are isolated by matched camera/route variants. CPU/loading changes were measured as a bundle; their individual FPS effects are **not isolated**. Encounter resource-load time and pipeline counters provide supporting evidence, not exact compiler-stall attribution.

## Hitch results

| View or route | 1440p median ms before → after | 1080p median ms before → after |
|---|---:|---:|
| Park | 40.90 → 26.03 | 38.31 → 23.34 |
| Waterfront | 18.81 → 15.54 | 16.94 → 13.51 |
| Shop | 22.41 → 18.90 | 20.03 → 16.26 |
| Bridge | 52.88 → 25.53 | 49.64 → 22.06 |
| Intersection | 46.72 → 22.81 | 44.12 → 20.09 |
| Main-route sprint, equal first 60 seconds | 36.30 → 23.34 | 32.07 → 20.55 |

Both sprint runs actually reached all 14 checkpoints. Equal-window sprint p99 fell 64.49 → 32.51 ms at 1440p and 61.43 → 30.80 ms at 1080p; frames over 33 ms fell 994 → 23 and 854 → 18 respectively. The workbook includes p95/p99, GPU and CPU monitors, draw calls, primitives and Godot-accounted VRAM for the baseline and variants.

| Stress stream | Before median / p99 ms | After median / p99 ms | Frames >33 ms before → after | Frames >100 ms before → after |
|---|---:|---:|---:|---:|
| 1440p | 55.19 / 156.79 | 44.96 / 117.10 | 5,109 → 4,877 | 599 → 249 |
| 1080p | 57.41 / 148.95 | 46.22 / 119.67 | **5,800 → 6,346** | 670 → 362 |

1440p observed duration was 379.6 → 375.7 seconds; 1080p 443.3 → 438.7 seconds. Runs use the same scheduled stress scenarios and seed but are not deterministic replays. Durations, spike rates, observer costs and every logged frame are in the workbook. No hitch records were dropped. The 1080p >33 ms regression persists when normalized by duration and must not be presented as a successful hitch fix.

The scenarios include horde combat, stream sniper race, napalm and AC-130, loot boxes, supply drop, LiveTube alerts, death/respawn and ban sweep. Action receipts verify each trigger. The combat route was partially blocked; separate actual sprint traversals complete all 14 main-route checkpoints.

Before preparation, live synchronous encounter body/model loads reached 249 ms. After preparation, no encounter body or mechanical model loads over 2 ms appeared in the live trace. Smaller audio/challenge loads remain. On 1440p hitch frames, pipeline-mesh counter increments fell 9 → 0 and surface increments 1,722 → 956; this indicates activity, not time spent compiling. Sampled GC pauses peak around 12 ms and do not alone explain the largest stalls.

Most remaining optimized spikes are labelled **unattributed CPU / scheduling**. Movement and animation native bindings dominate sampled script stacks; snapshot construction, UI work, spawn waves and native resource instantiation overlap some spikes. Embedded-server work contributes to the physics monitor. Nested sections overlap and must not be summed. Event overlap and coarse GC associations are context, not causal proof. Audio streaming and driver/OS scheduling are not exhaustively traced; exact attribution of every spike remains outstanding.

## Visual and cost tradeoffs

Matched five-camera stills preserve approved lighting, materials, foliage silhouettes and contact shadows; native probes verify base/AO data. LOD can change tiny distant facets. No AgX/PCSS/SSAO/SSIL/TAA setting was reduced. Shadow removal/hardening and disabling TAA have visible costs and remain unmerged options in the workbook. Half-resolution AO was not a useful win here. Retiling MultiMeshes increased draw/CPU cost and was rejected.

Godot-accounted static VRAM rises roughly 3.86 → 4.13 GB; combat allocation rises about 0.8–1.0 GB with prepared/retained encounter resources. This is allocated resource memory, not physical driver VRAM. Preparation moves work to the loading screen; no exported before/after startup timing was measured, so no startup improvement is claimed.

Mid-range GPU estimate is a sensitivity calculation: multiply measured static GPU time by 1.5–2 while retaining the same CPU cost. Worst static views then suggest about 20–26 fps. This is **not** a benchmark on another GPU; weaker CPUs can worsen combat stalls. Actual mid-range hardware validation remains outstanding.

## Verification and reproduction

Resume revision a20c05b10 on main 8b797d86e: full pnpm test passed all 12 steps, exit 0 (54.1 seconds), including build, lint, format and unit suites. Initial resume failures exposed a shader fixture mismatch, a Windows worker-start timeout and stale generated-file timestamps after rebasing; the fixture and timeout were corrected and TypeScript outputs regenerated. Native pinned-engine probes passed indexed/unindexed LOD preservation, AO, exact occluders and MultiMesh float preservation. Older final-art native arena client/server reload matched exactly. Final verification receipts are retained in the evidence archive; later main integration and export outcomes are recorded separately below.

A resumed camera-frustum caching candidate was rejected and removed. Across 20,570 native-versus-JS visibility decisions it produced no mismatches, but settled same-instance ABBA measurements were 19.875 ms native versus 19.861 ms cached. The initial apparent improvement was warm-up drift. No sustained frame-time saving is claimed. Shader guards added during resume only skip unused shaders in Godot's dummy headless renderer; the rendered shader code remains identical.

Final integrated revision 62c5c6a33 on main e12f84fb3 passed all 12 pnpm test steps (121.1 seconds, exit 0), including 1,278 unit tests. A fresh resource import completed in one attempt for the new contact-chat audio. The repeated full-detail headless smoke loaded a live player, completed encounter preparation and exercised napalm without script or resource errors; its owned session was ended. The first repeated smoke's missing-audio failure is retained separately and is not counted as successful validation. The native arena stage allowance was raised from ten to fifteen minutes after a cold build reached saving but exceeded the shorter deadline; the supervisor still caps the whole job at 19.5 minutes and the outer command at twenty minutes.

The final integrated native arena completed generation and fresh reload verification in 688.2 seconds. Client SHA-256 is 4171836c1ebb639ac427decb36e84da826ee0b289fa908d8fdba850907a92cd2 and server SHA-256 is adf536505faa17e25d97c34aaef95c2d24a79dc7f914dabab4575177f82c2967, both identical to the recorded final-art arena. Both report matches=true and zero differences. This verifies the generated world content; it does not turn older gameplay traces into measurements of the newer gameplay code.

Windows Desktop release export succeeded with shader baking and complete x86_64 D3D12 Agility runtime files. The executable is 1,298,178,480 bytes, SHA-256 5974e91dc655645b86b74396af0cce9382e523d35fb353d85956809e1c16c79c. Its real PCK directory has 6,013 entries, both arena scenes, no tools/tests/artifacts entries and no inspection bridge path or bridge-only literal. The exported executable passed an isolated headless fixture startup through encounter warmup and client readiness without script/resource errors. This is startup validation, not validation of a presented frame, exported frame-time measurement or an exported before/after startup comparison. The executable and D3D12 runtime are retained locally outside the worktree; public evidence archives exclude binaries.

[PR #1633](https://github.com/KamranAsif/Godmode.exe-roguelite/pull/1633) was squash-merged as e760ae60d45d45d2cfed8e767b57eb4215d67530. The exact verified arena fingerprint b725f2e4b03bc03afb6b394d40e0dca2f2ad8388e5df179d1b0644e8e508c131 is seeded in the shared machine cache and [published as a prebuilt release asset](https://github.com/KamranAsif/Godmode.exe-roguelite/releases/download/prebuilt-arena/arena-b725f2e4b03bc03afb6b394d40e0dca2f2ad8388e5df179d1b0644e8e508c131.tar.gz). [Download the verified workbook](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-10/performance-5cc16b829f.xlsx). The owned resume worktree can now be removed; raw evidence and the release remain under D:/work/performance-20261010.

The evidence includes raw frame windows, continuous lifetime hitch records, V8 samples, event receipts, resource/section traces, run settings, arena/commit manifests, matched stills and bounded benchmark/analyzer scripts. Invalid startup-contaminated, interrupted and debugger-failed runs are excluded from headline data. Every engine command is bounded at 20 minutes and uses godot-cli sessions; no baked lighting is used.

Source definitions: [Godot render monitors](https://docs.godotengine.org/en/4.6/classes/class_renderingserver.html), [mesh LOD](https://docs.godotengine.org/en/4.6/tutorials/3d/mesh_lod.html), [occlusion](https://docs.godotengine.org/en/4.6/tutorials/3d/occlusion_culling.html), [AMD mid-range specifications](https://www.amd.com/en/products/graphics/desktops/radeon/9000-series/amd-radeon-rx-9060xt.html).
