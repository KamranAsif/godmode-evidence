# PR #2301 final-source performance evidence

Before: `41e5803ca517c5b46415e389442cfbfbc0273fca` (PR base main). After: `1c890e6450b6b1578da739b145cb7bc99cac251e` (unchanged final PR source). Order in each workload: before-1, after, before-2. No game code changed for this timing dispatch.

| Workload | Run | Enemies | Frames | Median ms | p95 ms | p99 ms |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| standard | before-1 | 65 | 1721 | 16.992 | 22.123 | 24.732 |
| standard | after | 65 | 1878 | 15.822 | 18.583 | 21.185 |
| standard | before-2 | 65 | 1988 | 15.049 | 17.612 | 19.303 |
| cover | before-1 | 1 | 671 | 11.638 | 14.499 | 19.311 |
| cover | after | 1 | 636 | 11.929 | 17.882 | 19.980 |
| cover | before-2 | 1 | 665 | 11.798 | 14.691 | 16.594 |

Standard: `tools/performance/gameplay-benchmark.mjs run --subset firefight-65 --enemies 65 --resolution 1440p --taa off --frames-only --warmup-ms 10000`, same current harness for both checkouts, seed `43BA771E`, Forward+/D3D12 on RX 9070 XT, SMAA, native threadModel 2, 100% scale, uncapped/VSync off. Each run had an exclusive timing hold, 10 s warmup, 13 s crowd settling and 30 s measured; 65 living enemies and identical fixed-camera pose were required at both boundaries. Profiling and per-frame engine monitors were off; no frame-ring overflow. The workload and measurement hashes match in all three reports.

The standard after median is 0.199 ms (-1.24%) below the mean of controls, while the control median span is 1.943 ms. This is inconclusive. p95 is 6.46% below the mean controls but 5.51% above the faster final control: the built-in comparator flags that latter pair, preserved in `comparison-before2-after.md`. Do not quote a universal no-regression result or claim a performance win from these noisy standard runs.

The focused cover ruler uses the full arena at 640x360 with low graphics, seed 1871, frame-only collection, profiling and animation trace off. It runs `course cover` with one rifleman and spawns paused. The 8 s window starts just after the native sequence marker; each saved receipt proves coverage from about +0.2 s through +8.3 s, including initial entry/crouch, rise at +4 s and return at +6.5 s. This ends before the fixture removes the actor at +9 s. Counts remained one; no dropped samples. Raw timings and native marker excerpts are included.

Focused cover adds 0.211 ms (+1.80%) median and 3.287 ms (+22.52%) p95 against mean controls. Control spans are 0.160 ms median and 0.192 ms p95. The focused p95 cost is larger than its control drift and is disclosed as a measured tail cost. Its p99 adds 2.027 ms, against a 2.717 ms control span. This ruler exercises the actual final clearance/arm path, whose task is preventing the visible cover penetration during both transitions. The path is restricted to posed stationary crouch/stance transitions; held clearance probing is throttled to 10 Hz, with per-frame checks while the stance changes. This is a correctness tradeoff to review, not a claim that the work is free. Do not extrapolate this single-grunt fixture linearly to 65 simultaneous cover users.

Arena receipt file SHA values differ because cache/file timestamp stamps differ. Removing only `stamps` makes the complete receipt objects equal, including report and all input/output content hashes. Both client/server scene files were also rehashed in both checkouts and match their output hashes. See `results-summary.json` for that proof.

Reports preserve all timing samples and conditions. Standard report `launch` and `inventory` fields are omitted from the public copies; no timing value was changed. Full console logs remain private because they can include local audio-console credentials. No capture ran beside the timings. Owned startup/import failures and rejected course attempts are listed in the summary and are excluded from every result above.

All Godot processes started in this dispatch were closed, every owned session ended and GPU timing holds released before upload. The game and baseline worktrees remain clean.
