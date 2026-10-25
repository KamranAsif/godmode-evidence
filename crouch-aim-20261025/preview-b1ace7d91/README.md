# Crouch-to-aim diagnostic preview

These are the first exported Windows Playtest A/B captures from the 14:25-14:40 slot on 2026-10-25. They precede the foot-bearing correction in source commit d05491133 and need a refreshed after capture before the final clip audit.

- Before: cover branch b3a9e2c2635596f4740c4b56ec359366fdc254dc.
- After preview: b1ace7d91173d943b5971789ee2445e8b66e0662.
- Before is above in videos and left in the stance sheet.
- The cover course is a 0.95 m low wall at 10 m. The second view uses the existing side framing at 6 m / FOV 45.
- Course site: -469.27,-17.22,-507.27, yaw 2.356 in both takes.

Both course captures use the same `--render-thread safe` process override after a default-thread after build crashed during loading with V8 `Cannot exit non-entered context`. The production project setting is unchanged. Captures are 1280x720, high preset, bilinear scaling, silent and real-time. No FSR2. Full frame timing receipts and animation traces are retained.

The preview's trace found an idle foot-bearing reset: a held -55.97 degree foot offset became zero on entering crouch, with a 273 mm ankle jump in the second take. Commit d05491133 preserves the held bearing across an idle crouch/rise and adds a reproducing regression test. That correction has not yet been captured natively.

The JSON summary is an ankle-motion diagnostic for consecutive freshly posed stationary frames with plant bits set. It includes heel/ankle motion and is not a claim that every reported movement is a toe contact slide. The full traces support inspection.

Still required: refreshed after course, completed fight A/B and the separate frame-cost comparison. No final Codex clip audit verdict or PR yet.
