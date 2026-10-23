# BattleDuty performance scout - 2026-10-23

PCSS SOFT_LOW is a measured 2.15 ms fight improvement, with 1.69 ms on the street and 2.57 ms at the bridge. It is a global visual setting and remains a prototype for Kamran to choose. No production change or PR was made.

[Six-view native-size A/B sheet](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-23/perf-scout-v2/pcss-high-low-six-views-3532cd4afc.jpg) | [Smaller preview](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-23/perf-scout-v2/pcss-high-low-preview-9ba321d586.jpg)

Code: origin/main at task start, 7d6e94ea37e003a63399c426d63e0258585245af. Production files stayed unchanged; every headline baseline/prototype report records a clean checkout. Attribution used a temporary profiling override, removed afterwards. RX 9070 XT, driver 32.0.32015.7029, pinned GodotJS 4.6.1 no-pointer-compression engine, Separate render thread, D3D12, 2560x1440 native 3D, SMAA, TAA off, fixed seed 0x43BA771E, FOV 75, 65 enemies per wave. FSR2 was never enabled.

Important map limit: the standard import restored the newest verified fallback arena ee78c50778e1af68db06310f0dad88203bb6e53b4c2da15ada12c46aafeee749. It predates the facade geometry fixes #2213/#2216. Those source geometry edits were not regenerated in this lane. Current main runtime code and V2 lighting were applied to the same frozen arena in every arm; these are not measurements of a freshly rebuilt #2216 arena.

Arena receipt SHA-256: e21798db0d1c45ce6bc298f304f18c79b9aff689d6be7109f54065d64a8401a8. Measurement harness SHA-256: 918155b5d88ed056c64a5ac97654fa6ca11e7fbbf31f5a64a10c16bfd7b161c1.

## Timestamp-only baseline and prototype

Three standard combined runs, each fight -> street -> bridge. Every repeat uses the canonical benchmark workload, 10 s warmup, then 13 s fight settling / 30 s fight measurement, and 12 s for street and bridge. All native workload checks pass. Component sampling and JS frame profiling are off for the headline runs.

The prototype uses seven additional uninstrumented runs in order A0, B1, A1, B2, A2, B3, A3. A is production SOFT_HIGH (24 blocker-search / 16 filter samples); B is SOFT_LOW (8 / 4). The existing debug_lighting action applies the setting during warmup; each setup receipt proves it completed before the first measured segment. All other lighting fields, the 8192 atlas, 160 m distance and 0.35 degree sun angular size stay fixed.

| View | Baseline median / p95 / p99 ms | B median / p95 / p99 ms | Paired median saved [min,max] ms | Paired p95 / p99 saved ms |
| --- | ---: | ---: | ---: | ---: |
| Fight (65) | 15.57 / 19.18 / 20.57 | 13.49 / 17.69 / 18.45 | 2.15 [1.98, 2.31] | 1.39 / 1.91 |
| Street (65) | 11.69 / 16.69 / 18.32 | 9.98 / 14.42 / 16.77 | 1.69 [1.54, 1.77] | 2.26 / 2.42 |
| Bridge (65) | 18.32 / 23.04 / 33.14 | 15.83 / 18.87 / 29.19 | 2.57 [2.46, 2.64] | 4.47 / 5.36 |

Baseline percentile columns are medians of the three per-run percentiles. Paired savings are the median of the three differences: average of adjacent A controls minus B. Candidate absolute medians are medians of its three runs, so they need not subtract exactly from the separate baseline table. Scripted wave spawning, blasts and kills remain in the measured workload; street/bridge maxima include roughly 167-177 ms event hitches. Tails, especially bridge p99, are variable and do not justify promising a universal p99 gain.

| View | Baseline median range ms | A/B control median range ms |
| --- | ---: | ---: |
| Fight (65) | 15.56-15.60 | 15.53-15.87 |
| Street (65) | 11.46-11.82 | 11.59-11.75 |
| Bridge (65) | 18.26-18.43 | 18.34-18.42 |

## Attribution

All three views are GPU-bound at the median. One successful --engine-stats run per standalone view collected Godot CPU/GPU components, with JS profiling off. Godot TIME_PROCESS includes RenderingServer synchronization and is a one-second maximum; it is not a per-frame script time. The synchronous statistics getters distort Separate throughput, so their frame medians are excluded from the headline table.

| View | Engine-stats main viewport render CPU ms | Engine-stats main viewport GPU ms | Other viewport CPU / GPU ms |
| --- | ---: | ---: | ---: |
| Fight (65) | 6.32 | 21.63 | 0.43 / 1.57 |
| Street (65) | 2.32 | 18.65 | 0.36 / 1.73 |
| Bridge (65) | 11.24 | 25.58 | 0.55 / 1.75 |

A separate combined run used Godot native GPU timestamps with per-frame synchronous statistics disabled. The debug/settings/stdout/print_gpu_profile switch invokes the same engine implementation as --gpu-profile. Its timestamp pool was 4096. An earlier attribution attempt exceeded the default 256 timestamp cap and was discarded; no failed run contributes numbers.

Godot pass means below include all rendered viewports. Startup, fight settling, partial first/last one-second blocks and early route transitions are excluded. The engine emits aggregate directional-shadow rendering markers, not separate cascade GPU durations. Cull Split markers are bookkeeping intervals, not measured individual cascade raster times. No per-cascade numbers are invented.

| Native GPU pass, ms | Fight | Street | Bridge |
| --- | ---: | ---: | ---: |
| Depth / normal-roughness prepass | 3.31 | 2.30 | 4.41 |
| Sun shadow maps, four cascades aggregate | 2.85 | 1.47 | 2.49 |
| Opaque, including PCSS receiver sampling | 6.87 | 5.43 | 9.34 |
| SSAO | 0.45 | 0.45 | 0.44 |
| SSIL | 0.40 | 0.40 | 0.38 |
| SMAA | 0.24 | 0.25 | 0.25 |
| Glow | 0.30 | 0.30 | 0.29 |

Named native GPU pass totals are 15.58 / 11.78 / 18.67 ms. They track the plain baseline frame times. This diagnostic's frame medians are 16.17 / 11.95 / 18.87 ms; the extra timestamp overhead is not presented as shipping throughput.

In that same native-only diagnostic, OS thread CPU snapshots show main-thread one-core occupancy of 61.77 / 73.35 / 60.84 percent. The busiest other thread is 53.03 / 35.63 / 50.44 percent. Windows did not expose thread descriptions, so that other thread is not falsely labelled an identified render thread. Godot viewport render CPU times, OS CPU headroom, native GPU spans and the GPU-only filter intervention together support the GPU-bound median verdict; CPU/event tails remain.

## Next three targets

1. **PCSS HIGH -> LOW.** Concrete change: change directional_soft_shadow_filter_set_quality from SOFT_HIGH to SOFT_LOW at the runtime lighting/arena reapply sites. Measured paired savings: fight 2.15 ms, street 1.69 ms, bridge 2.57 ms. This changes filter sampling/edge grain and is a visual choice. The six-view sheet is the prototype; nothing ships before Kamran picks A or B.
2. **Directional shadow atlas 8192 -> 4096, retaining distance/cascades/casters.** Expected 0.3-0.8 ms in fight/bridge, less on the street; unmeasured estimate. This targets raster/atlas bandwidth only. It retains vertex/submission work, so the 2.5-2.8 ms shadow-map pass is not its expected saving. Visible loss of fine shadow detail; needs its own A/B before adoption.
3. **Full-resolution -> half-resolution SSAO, retaining SSIL and V2 intensities/radius.** Expected 0.15-0.30 ms across these views; unmeasured estimate. The native SSAO pass is only about 0.45 ms. SSIL keeps the normal/roughness prepass enabled, so do not claim the old 3.5 ms combined post-removal ceiling. Possible changes around fine contact edges; needs its own A/B.

These gains are not additive guarantees. The current prototype fight is 13.49 ms, about 74 fps, still above the 8.3 ms / 120 fps target. Opaque and depth work dominate the remaining GPU budget. Repeating the previously unsuccessful caster, ground far-LOD or building batching changes is not counted as a new multi-millisecond target.

## Validation and local receipts

Initial pnpm install, imports:seed, project import, build:scripts and pnpm build completed. The standard compare command accepted A0 versus B1. All seven prototype receipts match the baseline workload/harness/cache, prove timestamp-only collection, and validate the selected quality before measurement. All 12 capture frames are 2560x1440; native perf marks validate all six positions, yaw/pitch, FOV and 100% 3D scale. Every A/B lighting receipt differs only in shadowFilterQuality. Live actors/water differ in pose/time and are disclosed on the sheet.

No production files changed, so there is no code PR, reviewer round or runtime regression suite to run. All owned Godot instances were stopped; timing and capture holds were released. Generated receipts stay in the worktree artifacts directory.

Reproduce baseline (wrap each run in an exclusive timing hold):

```powershell
node tools/performance/gameplay-benchmark.mjs run --subset firefight-65,shopping-street,under-bridge --enemies 65 --taa off --frames-only --output artifacts/performance/baseline-N.json
```

Files: artifacts/performance/baseline-{1,2,3}.json; stats-{firefight-65,shopping-street,under-bridge}.json; stats-passes-only.json; ab-{A0,B1,A1,B2,A2,B3,A3}.json and their .setup.json receipts; artifacts/scout-summary.json; artifacts/scout-ab/manifest.json. The local artifacts scripts reproduce the experiment without production edits.
