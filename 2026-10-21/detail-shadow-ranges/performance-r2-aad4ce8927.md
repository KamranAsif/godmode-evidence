Current runtime 95bc8c0c65b7014ff3f6f9a1540a13c19f6e25fb; main parent a4f683d563334288f665496cc4b918eee0ae5a9e. Driver 32.0.32015.7029.
Official benchmark: control 1 / candidate / control 2. Milliseconds; --resolution 1440p --taa off --enemies 16 --subset firefight-65,shopping-street,under-bridge. The firefight phase independently requires 65 living enemies at both boundaries.

| Phase | Median | p95 | p99 | Mean GPU | Shadow draws | Raw shadow primitives |
| --- | --- | --- | --- | --- | --- | --- |
| firefight-65 | 20.022 / 19.433 / 20.842 | 26.932 / 26.215 / 28.081 | 30.815 / 32.325 / 31.720 | 16.103 / 15.369 / 16.520 | 12544 / 8865 / 12543 | 22.086M / 21.621M / 22.069M |
| shopping-street | 11.403 / 11.090 / 11.468 | 14.498 / 14.082 / 14.463 | 15.570 / 15.012 / 15.514 | 10.436 / 9.975 / 10.455 | 2763 / 2497 / 2757 | 8.414M / 8.093M / 8.243M |
| under-bridge | 19.354 / 18.796 / 19.544 | 22.262 / 21.781 / 23.349 | 34.537 / 32.385 / 34.578 | 18.260 / 17.762 / 18.419 | 10262 / 6682 / 10262 | 16.993M / 16.253M / 16.909M |

Fixed views: before / after / before. Zero enemies, 30 s each, 8 s warmup.

| View | Median | p95 | p99 | Camera draws / raw primitives | Shadow draws | Raw shadow primitives |
| --- | --- | --- | --- | --- | --- | --- |
| street | 15.966 / 14.998 / 15.946 | 16.755 / 15.919 / 16.763 | 17.211 / 16.307 / 17.249 | 3579 / 6.449M; 3579 / 6.449M; 3579 / 6.449M | 12355 / 8676 / 12355 | 18.724M / 18.151M / 18.724M |
| pier | 17.918 / 17.836 / 17.961 | 18.925 / 18.845 / 19.036 | 19.466 / 19.407 / 22.272 | 16503 / 15.900M; 16503 / 15.900M; 16503 / 15.900M | 2332 / 2007 / 2332 | 4.205M / 4.114M / 4.205M |

Observed brackets:
- firefight-65: control median drift 0.820 ms; candidate change -0.589 / -1.409 ms against controls. Candidate p99 32.325 vs controls 30.815 / 31.720 ms. Render CPU 6.505 / 5.528 / 6.681 ms.
- shopping-street: control median drift 0.065 ms; candidate change -0.313 / -0.378 ms against controls. Candidate p99 15.012 vs controls 15.570 / 15.514 ms. Render CPU 2.062 / 1.995 / 2.060 ms.
- under-bridge: control median drift 0.190 ms; candidate change -0.558 / -0.748 ms against controls. Candidate p99 32.385 vs controls 34.537 / 34.578 ms. Render CPU 7.271 / 6.421 / 7.327 ms.

- Three sequential official benchmark runs: control, candidate, control; median/p95/p99 are per-run, not pooled. Each uses the same measured #2190 runtime and identical workload/measurement hashes.
- Each phase table includes control drift and tail behavior; a change within the baseline spread is inconclusive. CPU and GPU times overlap, and are not added.
- Raw Godot primitive counters omit MultiMesh instance multiplication when mesh LOD is active; they are monitor values, not true weighted triangle totals.
- Candidate SCN is the exact officially verified and exported production scene. Control is its native offline inversion, restoring 1829 original caster flags and deleting only 4076 new shadow batches; target camera geometry/buffers verified after native save/reload. Exact scene hashes are recorded separately from the retained production receipt.
- Windows export and native visual evidence apply to source 893df7738, recipe 51f66b6a. Final main rebase changed enemy CPU/telemetry logic, including a nav counter that extends the recipe dependency closure. Four detail implementation files, static arena pipeline/assets and lighting settings are unchanged; no final-parent native recipe/output equivalence is claimed.
- Fixed views use zero enemies and toggle original/copy casters in one loaded arena; hidden shadow copies remain in the fixed control. Camera submissions and sun receipts are exact across each bracket. Benchmark control SCNs omit the copies.
- Main #2191 audio-bus optimization merged after the candidate run. The final branch rebased onto it; this cohort is retained as matched #2190-source evidence, with no post-audio/final-HEAD frame-time claim.
- Production settings are SMAA2, TAA false, native 2560x1440 scale1. Runs are uninstrumented, uncapped and under exclusive timing holds. The 8.3 ms target is not achieved.
