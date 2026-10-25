Grunt crouch-to-aim A/B - 2026-10-25

Before: b3a9e2c2635596f4740c4b56ec359366fdc254dc, cover AI branch without the presentation change. After: d05491133e6fd5148c612f2b8d4b4bdb856efe11. Both are exported Windows Playtest builds. Snapshot format 98 supplies crouched.

Videos: before above, after below. Stance sheet: before left, after right, at 2.8/4.2/5.1/7.2 seconds of the side cover take.

Course: the branch's cover sequence, one rifleman, a 0.95 m low wall at 10 m, normal player view then a side view of the complete body. GODMODE_GRUNT_COURSE_SITE=-469.27,-17.22,-507.27 yaw 2.356

Fight: same scenario hud plus 6 additional riflemen, automatic side framing at 6 m / FOV 45; normal cover AI, with an invincible stationary player. Live AI and placement can diverge. No free-camera framing is used in the player course view.

Original captures are 1280x720, high preset, bilinear 100 percent scale, 30 FPS capture hold; no FSR2. Playback is real-time and silent. Timing receipts retain frame gaps. Animation tracing is enabled only for the one-body course captures.

The pose summary counts consecutive freshly posed stationary frames with a held-foot bit at both endpoints; it reports ankle motion rather than all foot/toe contact. Full traces are retained for audit. CPU timing is captured separately without video or animation tracing.

Codex clip audit: pending Kamran's relay.

Final source recapture: d05491133, including preservation of planted foot bearing across crouch/rise. The earlier B1 preview is superseded. Both final course recordings contain 1050 frames over 35 seconds; both fight recordings contain 900 frames over 30 seconds. Every owned native build and timing hold was closed before packaging.

Frame cost: separate exclusive timing holds, no recording, no animation tracing, no per-frame engine profiling; same safe render thread, seed 1871 boot PRNG, uncapped 640x360 cheap profile at 0.5 3D scale. Fixed cover course, one rifleman verified at both boundaries. A 1-second discarded warmup and 5-second sample were taken after reaching the course. This is a narrow CPU ruler, not the standard 65-enemy benchmark.

| Run | median ms | p95 ms | p99 ms | frames |
| --- | ---: | ---: | ---: | ---: |
| before-1 | 39.70 | 42.56 | 52.84 | 125 |
| after | 38.97 | 42.14 | 46.13 | 128 |
| before-2 | 38.69 | 40.97 | 49.78 | 129 |

After minus bracketing control mean: -0.22 ms (-0.57%). Baseline median drift: 1.01 ms (2.57%). Difference is smaller than baseline drift; inconclusive.

Setup failures excluded: early desktop/scene starts timed out before gameplay; one after attempt lacked its generated cheap-profile scene. The verified cheap arena was restored with the repository helper. Final controls and after use the same cheap-arena fingerprint 4855c84657ad5c0bd67ece08431d3c056eca90a6dd720f750b04efe6f250563d. No failed startup was included in timing.

Foot diagnostics measure ankle movement while a held bit is present, not toe-ground contact. The previous 273 mm posture-edge event is gone in this recapture; smaller ankle events remain and need visual audit. No blanket foot-slide pass is claimed.

Validation on d05491133: 38 targeted tests passed; full pnpm test passed all 11 steps, zero failures, 179.0 seconds. Codex clip audit remains pending Kamran's relay; no PR opened yet.
