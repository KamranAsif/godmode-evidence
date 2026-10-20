# Channel checkpoint measurement

Synchronous writes are achievement autosaves, polled once per second during a run.
Lifetime streamMs changes continuously, so ordinary duplicate-value suppression
cannot eliminate these writes. Each replace serializes the complete channel and
VOD history (about 75 KB), then stages, flushes, verifies, renames and verifies it.
The atomic writer and financial transactions are unchanged by this patch.

Routine counters now checkpoint about every ten seconds. New unlocks retain the
existing one-second poll. A failed checkpoint remains dirty and retries on the
next poll. Terminal payout snapshots include current in-memory achievement facts.
Unexpected termination can lose about ten seconds of routine achievement progress
(plus poll scheduling), versus about one second before. This interval is tunable.

| Same 65-enemy combat scenario | Before | After |
| --- | ---: | ---: |
| Whole-frame mean, ms | 37.1545 | 39.2302 |
| Whole-frame p95, ms | 48.6260 | 49.5280 |
| Whole-frame p99, ms | 56.7430 | 55.2040 |
| Worst frame, ms | 62.7530 | 68.1290 |
| GPU mean, ms | 19.5224 | 19.7516 |
| Viewport render CPU mean, ms | 9.1421 | 9.9897 |
| All retained frames | 808 | 766 |
| Measured window, seconds | 30.021 | 30.051 |
| Channel writes | 29 | 3 |
| Channel write total, ms | 183.001 | 17.694 |
| Channel write per call, ms | 6.3104 | 5.8980 |
| Channel write per retained frame, ms | 0.22649 | 0.02310 |

Write cost falls 0.20339 ms/frame, with about 90% fewer writes. Whole-frame mean
is 2.07566 ms slower in this pair: there is no demonstrated overall FPS gain.
These results do not reproduce the previous 6.97 ms/frame save estimate from
the diagnostic that logged every frame to disk. Do not claim a 7 ms recovery.

Seed 1871, 65 fixed living riflemen, camera [-404,-15.58,-414], yaw PI, FOV75.
2560x1440, production D3D12 Forward+, scale1, TAA off, uncapped, 60Hz physics.
13-second settle, three-second discarded warmup, then one 30-second window.
Identical frozen arena receipt SHA256:
a703caa83e9f46fd5802e7b4d45dc38831ed366ed2c6719b608b26578175dad6.
The fixture disables normal spawning and holds audience for repeatable combat.
One temporary timing marker is emitted only after each channel-write leaf span;
ordinary hitch logging is unchanged. No extra all-frame disk trace is enabled.
All ordered frame samples are retained, with zero dropped frames and 65 enemies
verified before and after. Hitch-only script context coverage is not used to
estimate whole-window save cost: every write has a leaf timing marker instead.

Before runtime: aff145df85a21eb6e626990f601457cb008324ff (main with #2150).
After runtime: eb4e48c4c46e7d361f149bee6d2455bb73f3c0be (that base plus this patch).
The final branch rebases the same persistence file onto merged #2151 and the
#2153 reviewer/performance-budget documentation update; all measured enemy
presentation sources are identical between this pair.
Measured save-source parity with the final export is checked separately.

Exclusive timing holds: 10:16:04-10:18:15 UTC and 10:37:20-10:40:29 UTC.
The failed queued attempt acquired no hold and started no engine. Each successful
run stopped its owned instance, restored the temporary source exactly, rebuilt,
and released its hold. No map authoring or character appearance changes.

Windows Playtest release export passed with shader baking enabled, complete
D3D12 runtime files and an embedded pack containing no inspection bridge or
development tooling. The final persistence source matches the measured after
source byte for byte. CPU preparation and queue waiting began at 12:24 UTC;
the actual packaging GPU lease was 13:20:14-13:26:58 UTC (6 minutes 43 seconds),
then the owned session ended with zero surviving engines. The lease and cleanup
receipts are included so queue time is not confused with GPU hold time.

The actual exported Windows executable then passed a headless ordinary-encounter
check using a fresh isolated save, no inspection bridge, no scene override and no
runtime instrumentation. A read-only file observer recorded three routine
achievement progress intervals of 10.669, 9.997 and 9.989 game seconds; scheduling
and pauses can make wall intervals longer. It reached a natural failed stream,
persisted 32.650 seconds of achievement progress and stopped cleanly with zero
script errors. This is log evidence for persistence, not rendered/GPU evidence.
Unit tests separately cover prompt unlocks, failed-write retry and payout facts.
The final review's sole pending export/check gate is closed: READY.
