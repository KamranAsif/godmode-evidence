# Final enemy aim review

Reviewed 2026-10-20: `origin/main...878e6b852e21df1971c6ba41661fa410f5f8674a`, branch `perf/enemy-baked-aim-20261020`, based on `0b761da55`. The worktree was clean at final inspection. This is the completion of one ongoing review, with implementation, scope/simplicity, performance, and verification passes performed by this reviewer. No review engines or full-suite reruns were started by this reviewer.

**Verdict: ready with nits. No blocking source or functional finding remains.** The final automatic runtime, LOD transition, visual, clean performance, and Windows Playtest evidence supersedes the rejected intermediate batches.

## Findings and caveats

1. **Latest whole suite has a disclosed unrelated failure.** `artifacts/pnpm-test-lod-restored-final.log` is 10/11, not a clean pass: the existing CLI fake-process ownership test `game stop leaves a note for both a stale record and a real stop` could not verify PID 33128 during Windows CIM traffic. Its exact isolated rerun passes 1/1 in `cli-game-stop-final-rerun.log`, and the suite reports no surviving fake engines. The preceding armed-air revision passed 11/11 in `pnpm-test-native-air-final.log`; final targeted and native feature checks pass. This is a verification caveat, not evidence of a defect in the changed animation code. Preserve this distinction in the PR.
2. **Baking trades memory and package size for CPU.** The supplied matching combat receipts show approximately 442 MiB more static memory, and the 21 compressed production animation libraries total about 120 MiB. These are intentional shipping resources, not committed test output. Disclose the tradeoff; no new geometry or visual-detail reduction accounts for the saving.
3. **Profiler attribution is unstable and cannot establish the combat saving.** The two instrumented weapon-span pairs are 7.183→0.046 ms and 18.215→0.032 ms. The second baseline's whole frame rises to approximately 160 ms. Retain both pairs and label them diagnostic. The clean whole-frame A/B/A below is the saving evidence.
4. **The standard benchmark does not establish a route-wide tail improvement.** Its matching working subset passes both p95 comparisons, but firefight p99 is 50.108 ms after versus 41.308/48.151 ms before; firefight 1% low is 11.06 FPS versus 17.45/13.41. The tool on this main revision forces profiling and supports at most 24 enemies. The full route separately fails the pre-existing `precisionAirstrike` grant. Report these limits and do not claim all-route or tail gains.

## Implementation and scope

The ordinary 11 gun kinds and ten operator bodies use native AnimationTree pitch blending over offline upper-body libraries. The gun is fixed to the right hand. The normal enemy loop no longer performs the ordinary fitter/IK; the retained solver is confined to offline fixtures and the explicit rotary/player paths. Graphs and duration tables are prewarmed and reused, and unchanged pitch/rate values avoid repeated writes. This is proportionate engine-standard machinery for the requested bake.

Stationary firing retains the native upper shot over compatible carry hips. Moving and armed-air firing retain their matching baked source pose with scalar recoil, avoiding an independent shot pelvis over gait/jump hips. Marksman operator A uses the agreed idle upper donor with sprint legs. Shield variants and the one-time medic pack mount address the observed contact/accessory defects. Radio, traversal, stun, wall-palm, rotary carry, melee, and player ownership remain explicit.

The final source fixes two actual automatic-playback defects that pinned fixtures had hidden: the native upper tree runs after the source/presenter, and callback-mode changes restore cached clip/time/rate/pitch once on the LOD transition. Explicit TimeSeek owns phase instead of resetting it at state start. Armed Jump clips are included. Root exit invalidates JS bookkeeping without touching freed native nodes. Inspection diagnostics are outside the enemy hot loop. No authority, protocol, or fictional-cheat boundary issue was found.

## Performance evidence

`final-order-air-uninstrumented-performance.json` records clean baseline `e6e64ec6c` and final `878e6b852`, with identical arena/engine/settings and frame tracing disabled. Baseline is the same main plus the matching profiler/fixture patch. Exclusive A/B/A used RX 9070 XT, D3D12, 2560×1440, TAA off, cap/vsync off, seed 1136293662, 65 enemies, camera `[-404,-15.58,-414]`, yaw π, FOV75, 15 s warmup, and two 8 s windows per run.

| Clean whole frame | Pooled baseline, 851 frames | Final, 574 frames | Saved |
| --- | ---: | ---: | ---: |
| Median | 36.931 ms | 27.658 ms | 9.273 ms |
| p95 | 46.010 ms | 33.907 ms | 12.103 ms |
| p99 | 52.542 ms | 36.585 ms | 15.957 ms |

Baseline median drift is 1.521 ms, below the observed improvement. Live AI is repeatable rather than bit-identical. Full-rate actor counts were 43–46 before and 45–49 after, with one far frozen actor in the second after window; the inherited LOD settings were unchanged. This supports a material improvement in this combat scenario, not achievement of the 8.3 ms target.

`final-weapon-pose-attribution.json` retains the separate instrumented pairs. `final-standard-benchmark.json` and both `performance/standard-order-*-comparison.md` receipts retain the standard A/B/A: 24 enemies, TAA off, 1440p, 10 s warmup, `shopping-street,firefight`, equal workload and measurement hashes. Overall median/p95/p99 is 14.657/29.534/37.304 → 13.952/25.306/33.096 → 14.398/31.632/42.038 ms; median baseline drift is 0.259 ms. These are diagnostic results with the tail caveat above.

## Verification inventory

- Reviewer-run focused command: `node --test tests/unit/enemy-aim-catalog.test.mjs tests/unit/enemy-aim-seat.test.mjs tests/unit/animation-lod.test.mjs tests/unit/encounter-preload.test.mjs tests/unit/frame-timing.test.mjs` — 16/16 at the earlier equivalent ground-pose revision. `node tools/assets/enemy-aim/build.mjs --check` — current-manifest cache hit at that inspection. Later air/LOD changes and their assertions were reviewed in this same round; supplied final `targeted-lod-restore.log` passes 14/14. Build/lint/format gates pass; lint retains 11 existing warnings.
- Final native automatic driver: `node artifacts/aim-probe-auto.mjs`, with pitches `[-π/4,0,π/4]` and actions `aim,walk-shoot,sprint,air,land` across all 21 bodies — 315 cases, request identity validated, zero inactive/errors, worst support contact 2.103 mm, maximum non-moving bore error 0.735°, moving-shot error 0.819°. Observation occurs after native processing without pinning, advance, or forced attachment updates. See `aim-auto-residuals.json` and `aim-auto-contact-summary.json`.
- `node artifacts/aim-lod-transition.mjs` — 24 manual/idle transitions covering moving rifle fire, armed air, and marksman A sprint at nonzero pitch; all pass, support worst 0.0581 mm. See `aim-lod-transition-summary.json` and raw results.
- Earlier controlled 1008-case ground-pose sweep: zero inactive/errors, support worst 0.277 mm; useful controlled-pose evidence, supplemented by the final automatic checks. The older `aim-specials.json` proves the earlier radio/stun/rotary/melee transitions; its **air-disabled row is historical and superseded** by final armed-air/landing checks. The five actor-free-before-reset cycles in `retirement-check.json` cover the native lifetime regression.
- Independent `visual-audit.md`: PASS for 219 matched fixture pairs at 5 m/15 m and level/up/down aim, shoot, walk, moving fire, and operator A sprint; final automatic combat re-audit PASS at `878e6b852`. This reviewer also inspected final normal play-distance and FOV32 close `live-after-lod-restore` images: coherent holds, no prior arms-out defect. Pinned comparisons alone were never accepted as automatic playback proof.
- Timing drivers: `node artifacts/aim-true-profile-batch.mjs` invokes matched `enemy-profile.mjs ... --uninstrumented` A/B/A; the separate leaf driver retains profiling diagnostics. Standard driver invokes `node tools/performance/gameplay-benchmark.mjs run --project <revision> --enemies 24 --taa off --resolution 1440p --subset shopping-street,firefight --output <report>` in A/B/A order. Receipts above preserve raw windows and comparison results.
- `node artifacts/aim-export-staged.mjs` uses the public godot-cli `exportGame` API for **Windows Playtest**, acquiring its capture hold at the shader stage. `playtest-export-native-receipt.json` passes build/import/export checks. `playtest-check/check.json` passes normal gameplay with `inspectionUrl:null`, rifle/SMG baked JumpLoop activation, 37.081 s observation after activation, and the supplied post-capture error scan clean. Binary SHA-256: `09ed8e2022eca58aec05b7f6bd1a015d2b9dffd7713e6418f489ccf4dd065487`. The exported normal screenshot establishes normal gameplay; detailed enemy presentation is established by the separate automatic captures.

## Assumptions and conclusion

The evidence samples visible poses and named transitions; it does not exhaust every intermediate phase or occluded actor. Shotgun pump-hand motion is intentionally excluded from a fixed support-grip expectation. The source-pose moving-fire choice and memory cost are accepted, explicit implementation tradeoffs for this task. Historical rejected timing and stale-headless-observer outputs must not be described as final proof.

The final source, functioning automatic playback, independently approved visuals, clean combat improvement, standard diagnostic comparison, and normal exported feature activation satisfy the task's review gates. **Ready with the documented verification/performance nits; no further implementation changes are requested by this review.** Open one PR against main and leave merging to the orchestrator.
