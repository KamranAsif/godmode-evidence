# Juice lane 147 — interim visual audit

**Overall: WITHHELD_PENDING_REAL_KILL_RETARGET.** Candidate `e2a5a6af4dd3bc3353752b1040a1c7cd37765c87`. Reviewed all 92 baseline, 113 after-combat and 76 after-reel native frames (281 total). No candidate visual regression observed.

| Criterion | Result | Evidence scope |
|---|---|---|
| Kill/boss priority | PASS | Production-feedback fixture only |
| Active kill retained during real ADS retarget hit | FAIL — missing evidence | Candidate magazine has no confirmed hits/kills |
| Lethal pulse, retrigger and settle | PASS | Fixture frames 49–54 |
| Ordinary-hit onset pulse fully established | FAIL — insufficient samples | 40ms onset can fall between native captures |
| Outward fade and expiry | PASS | Fixture frames 38–39 and 55–57 |
| Marker clarity and center clearance | PASS | Fixture only |
| ADS/gun/camera presentation | PASS | Real magazine; observed presentation, not exact cadence certification |
| Combat and stream HUD layout | PASS | Observed native frames |
| All three HUD layers simultaneously active | FAIL — missing activation evidence | TRAINER appears in baseline, absent in candidate captures |

FAIL entries above are evidence gaps, not demonstrated candidate defects. A real kill/retarget capture remains necessary for final approval. Readability and motion fixture success cannot establish gameplay priority.

The fixture retains red/orange kill feedback across a scheduled hit (frames 15–17), retains boss priority across hit/ordinary kill (30–38), and retriggers successive kills (49–54). Fading expansion and clearing are sampled. Scheduled event times do not establish exact engine execution times. Existing shot feedback is invoked by the fixture, so its gun movement is not a gun timing test.

The real magazine preserves sight alignment, weapon framing, recoil/settle, shell ejection, foreground blur and visible combat/stream HUD placement. Different scene and shot phase prevent pixel-identical comparison. Cyan TRAINER was not activated in after evidence.

Both after MP4s decode without errors. All after PNGs are native 1920×1080. Videos use measured timestamps with temporal holds/drops to encoded 30fps; they are not native measured 30fps. Maximum gaps: 112.027ms real magazine, 265.481ms fixture. Held frames add no motion evidence. Native-pixel marker crops and reduced scene overview sheets were inspection aids only.

The inspected HUD diff changes marker priority and scale/alpha motion; no gun, camera, shader, map, hands, AI, spawn or stream edits were found. Whole-red hits are inherited debt ranked #2. High fidelity enemy VFX, signature triangle shader execution and spawn fairness remain outside this HUD verdict and are not certified.

Baseline findings remain in [baseline-review.json](baseline-review.json). Full signed structured interim findings and hashes are in [candidate-interim-review.json](candidate-interim-review.json). Build/lint/HUD tests, default tests 13/13 and smoke are user-reported; the auditor ran no game or tests and edited no implementation.

Signed: **Codex — Juice lane 147 vision auditor**  
UTC: **2026-10-07T02:14:37Z**  
This signature covers interim observations, not final approval.

