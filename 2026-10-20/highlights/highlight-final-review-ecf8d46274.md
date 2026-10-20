# Final highlight review

**Verdict: ready with nits for the pull request.** No blocking implementation or scope findings. The final full suite is **not green**: 10/11 steps passed, with one unchanged godot-cli queue fixture timing out; its isolated retry passed. This verdict does not authorize merging.

Reviewed `e47bac6bc..c36ea91504f9d9be5c92c30655e97c7589126f71`, using `.codex/agents/kamran-reviewer.toml` and the supplied user brief. This is the one continuous final review, completed after receiving the final export/test evidence. The benchmark repair carried by the branch depends on #2156 and was not reviewed again. Main's #2158 aim-pose changes are outside the highlight change.

## Findings and caveats

No blocking findings. No source fixes requested.

- **Verification nit - retain the failed-suite disclosure.** `artifacts/highlight-final-pnpm-test.log` records `pnpm test` finishing with 10/11 steps passing in 206.5 seconds. The unchanged test `compiled status reports persistent positions and cleans an actually dead waiter process` failed with `Queue did not reach 2 tickets` after its ten-second wait. The focused stock test passed 1/1 in 4.7 seconds and reported no surviving fake engines (`artifacts/highlight-queue-test-retry.log`). Build, lint, format, root unit tests and game-rules passed. Keep the exact failure and retry in the PR; do not describe the full suite as passing. No queue-test/implementation change appears in this feature's scope.
- **Evidence limits - retain them in the PR.** Sustained performance is inconclusive, optional thumbnails can skip, and the actual exported thumbnail contains an existing loot panel. These limits are disclosed, rather than treated as feature failures or hidden with a fallback. The exported image proves capture/persistence, not an unobstructed world comparison.

## Four passes

**Implementation:** Pass. `stream_session.ts` removes recovery, multikill, nuke and continuing-payout capture requests. `roguelite_view.ts` removes standalone Front Page and Clean readbacks/PNG writes; Clean retains only its last kill receipt. `stream_media.ts` requests at most one ending thumbnail, holds its result in memory, and drains before the existing verified final transaction persists the VOD reference. The already-banked path now waits for pending media without paying again. Native glue freezes the last rendered viewport by GPU copy, downsamples once in a 320x180 2D-only viewport, requests asynchronous readback, and uses the existing worker JPEG/file writer. Unsupported readbacks, bad byte counts and timeout release the drain with an observable skip; unusable images are discarded without retry or synchronous fallback. Cleanup and generation checks cover late callbacks. Gameplay authority, snapshot layout and node ownership are unchanged; no fictional-cheat safety issue was found.

**Scope and simplicity:** Pass. The change implements the acceptable single ending-thumbnail fallback and reuses the existing media/save/worker systems. The native glue is proportionate to the asynchronous Godot API boundary. No map geometry, enemy animation, weapon posing, production antialiasing, lighting or asset edits are in the highlight diff. No evidence/generated artifacts are tracked by the change.

**Performance:** Pass for removal of the combat media work; no sustained FPS gain established. The change removes the combat readbacks, resize/encode scheduling and media-triggered channel rewrites, with no new enemy-scaled or per-frame bridge work. `artifacts/public-highlight-evidence.json` verifies the same harness/workload/arena hashes, seed 1136293662, 2560x1440, 65 living enemies and actual camera at both boundaries. Standard `firefight-65 --enemies 65 --highlight-event --taa off` ran under exclusive timing holds without added stopwatches. This is an AA-none control, not production SMAA.

| Run | Median / p95 / p99 ms | Main GPU ms |
| --- | --- | --- |
| Before `bb5437a37` | 39.555 / 51.687 / 58.492 | 19.586 |
| After `7a6f8bfca` | 41.135 / 53.382 / 60.677 | 20.070 |
| Before repeat `bb5437a37` | 53.093 / 62.442 / 77.889 | 20.780 |

The +1.580 ms initial median difference is inside +13.538 ms baseline drift. Recovery-window p95/p99 are 57.950/75.445, 51.669/53.650 and 67.671/91.707 ms respectively. Those observations do not isolate readback cost. Each baseline contains one combat recovery capture; the candidate contains zero. The five exported highlight feature sources match the measured candidate, while the final export includes the subsequent main aim-pose changes. The startup fixture's stream-31 timeout and actual stream-32 successful 15,860-byte ending image are explicitly retained in the evidence.

**Verification:** Pass with the suite caveat above. Modified tests meaningfully cover combat no-work, single capture/drain, failures/rejected images without retries, headless/missing viewport, Clean receipt tracking, ending-screen reuse, continuing payouts without capture, final VOD persistence and no duplicate payment. The benchmark-option test checks identical nonlethal recovery events without changing the crowd. Shared save fixtures were adjusted for in-memory media entries; their payout/Clean transaction coverage passed.

## Evidence inventory

Author-run commands and reviewed outcomes:

- `pnpm build:scripts`: passed (`artifacts/highlight-final-freeze-build.log`).
- `node --test tests/unit/prestige-save.test.mjs tests/unit/stream-audience-sync.test.mjs tests/unit/stream-media.test.mjs`: 239/239 passed (`artifacts/highlight-final-freeze-test.log`).
- `node --test tools/performance/gameplay-report.test.mjs`: supplied focused result 9/9 passed; current root unit gate also passed.
- `pnpm test`: 10/11 steps passed, one queue-fixture timeout, as detailed above.
- `node tools/godot-cli/dist/test/support/run-suite.js --test-name-pattern="compiled status reports persistent positions" tools/godot-cli/dist/test/unit/gpu.test.js`: isolated retry 1/1 passed; no surviving fake engines.
- Final Windows Playtest export: passed, source `c36ea9150`, 2,403,871,764-byte embedded executable, shader baker enabled, complete D3D12 runtime, 10,958 packed paths and zero forbidden paths (`artifacts/highlight-export-receipt.json`).
- Actual exported executable SHA-256 `330896a6fe93e5580582a754aa8def8d03421c31d16ed6c2f2430fa2090c159e` was run through `godot-cli game run --binary ... --fixture roguelite --full --offscreen --offscreen-size 2560x1440` with isolated settings and a capture lease. Native input verified viewer hold before health 10/100 recovery, then ended the stream. The log has no script/parse errors or combat capture receipt; exactly one 8,772-byte 320x180 ending JPEG and its VOD reference persisted. Owned PID 1996 was stopped and the lease released (`artifacts/public-highlight-playtest.json`). The raw controller result correctly remains FAIL solely because the full-suite assertion failed.
- Directly inspected the matched 320x180 before/after world images and `artifacts/highlight-visual-audit.md`: coherent full framing, colors and silhouettes; no blank frame, crop or new ending overlay. Also directly inspected the actual exported JPEG/results screenshot: the JPEG retains the existing loot panel and blurred world, with no debug console or ending overlay. The earlier console-overlay export attempt was rejected and is not visual proof.

Reviewer actions were read-only Git/source/document/log inspection and local image viewing, plus writing this ignored report. I ran no tests, builds, Godot instances, profiling or additional reviewer agents. Final working tree and `git diff --check` were clean before this report.

## Assumptions

The PR will declare dependency on #2156, preserve the inconclusive performance verdict and test/image caveats, and remain subject to the orchestrator's ordinary pre-merge verification. Optional end thumbnails may include UI already present in the final viewport or be skipped on unsupported/unusable readbacks; no richer highlight coverage or exclusive readback-cost claim is made.
