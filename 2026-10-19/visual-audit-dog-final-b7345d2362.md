# Dog exported Playtest visual audit

Verdict: PASS for the paired actual Windows Playtest comparison of circling orientation and visible bite/lunge behavior. Independent auditor made none of the production changes. This verdict does not certify a measured slow Walk gait in these exports.

Reviewed `staged-before-dogs-30.mp4` and `staged-after-dogs-30.mp4` by decoding full-frame contact sheets across both originals, closer original-frame sequences, and consecutive native frames at after 4.8-5.3 s. Review crops retain original pixels; neither original video was changed.

Useful visual intervals:

- Before 1.0-2.5 s: readable side/center dogs and paw cycles, with partial pack overlap.
- Before 7.0-8.5 s: the unobstructed dog to the right of the sign curves across the ground while remaining directed into the player area; its body and travel visibly diverge through the arc.
- After 4.0-5.5 s: clear approaches and gradual turns beside the central pack; consecutive 4.8-5.3 s frames show continuing paw progression and orientation changes.
- After 7.0-8.5 s: an unobstructed foreground dog crosses left, bends back to the right, and turns its nose/body along that changing travel direction. This is the clearest corrected circling example.
- After 10.5-12.0 s: approaches, turns into the player area, and readable bounding/lunge postures beside the sign. Target-directed planted/lunge postures also remain visible in the 4.0-5.5 s sequence.

The after examples read as forward movement through the curves, with smooth visible turns and continuing leg motion. The baseline's lateral sliding appearance is reduced. No new visible body deformation, frozen paw cycle, violent facing snap, or outward-facing bite/lunge was observed in the reviewed unobstructed examples. This is a visual check of the selected pack behavior, not a frame-by-frame guarantee for every dog.

Both originals are 1280x720, native 30 FPS, 480 frames / 16 seconds, at 0.5x game time. No video retiming or frame interpolation was applied. Capture elapsed time is 15978 ms before and 15993 ms after; median frame capture intervals are 33.378 and 33.344 ms, with maximum gaps 65.216 and 60.453 ms. These are slowed gameplay observations, not normal-speed performance measurements.

The physical player position is identical, [-404, -16.4, -414], and camera heading is calibrated to zero. Camera positions differ slightly: before [-404, -15.8, -407.8], after [-404, -15.8, -407.3]. Pack trajectories and timing differ. The sign, other dogs, and passing humanoids obscure some moments; the verdict uses the readable side examples above. The late after clip has foreground humanoid occlusion.

The generic animation trace contains no dog rows because the custom production dog player is not exposed through that trace's player field. Therefore this audit makes no exported per-dog speed, numeric yaw error, primary Walk/Trot classification, exact attack-phase, or quantified distance claim. The separate controlled native client Walk/Trot probe is separate evidence and is not used as a measurement of these videos. Trace clip names would also be insufficient to identify a blended dog's primary gait.

Setup binary SHA-256 values match reviewed package receipts: before `aeb824346ca7a5c712e88d1470b65c5761e78895c4320b0e56f71642db63de32`; after `66f6c8557e05dfa1276cffda339a521ef32d3d1695e489ec9851907e6ac0d813`. Package checks identify the valid changed client modules and no inspection bridge. Raw engine logs and authentication URLs are excluded.
