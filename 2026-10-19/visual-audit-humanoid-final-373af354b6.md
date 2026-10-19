# Humanoid play-distance visual audit

Verdict: PASS for the paired exported Windows Playtest evidence of smoother humanoid locomotion at combat distance. Independent auditor made none of the production changes.

Reviewed the uncropped originals `staged-before-walk-30.mp4` and `staged-after-walk-30.mp4` through decoded full-frame contact sheets and consecutive original frames. Review crops only enlarge existing pixels; originals remain unchanged. Full bodies and feet are readable at play distance. The baseline has occasional tree/post overlap; the selected after interval is unobstructed. After shows finer stride progression without a new visible body deformation, broken gait, or pose snap in the reviewed frames.

| Original / actor | Useful matched gait interval | Camera ground distance | Wall ground speed | Trace playhead changes |
| --- | --- | --- | --- | --- |
| Before / smg-e19 / MachineGunSprint | 3.633-4.335 s | 15.94-14.21 m | 2.481 m/s | 10 changes / 0.702 s = 14.249/s |
| After / smg-e9 / MachineGunSprint | 0.574-2.840 s | 15.77-10.88 m | 2.485 m/s | 68 changes / 2.266 s = 30.008/s |

Independently recomputed these intervals and cadence from the native traces using the saved first-presented engine-clock anchor and recording timestamps. The before clip also contains locomotion around 1.17-5.13 s; after about 5.17 s its selected actor stops, aims, and fires, so that later portion is not walking evidence. The after full-clip contact sheet supplies additional readable moving actors. This is representative SMG humanoid evidence, not an exported visual check of every humanoid variant.

Both originals are 1280x720, 30 FPS, 360 frames / 12 seconds, with game time set to 0.5x. There is no video retiming or interpolation. Actual recording elapsed time is 11983 ms before and 11996 ms after; median capture gaps are 33.437 and 33.424 ms. Approximately 83 ms startup gaps do not invalidate the selected steady intervals. These clips demonstrate finer pose progression at this capture rate; they do not establish 120 FPS presentation at normal game speed or frame-time cost.

The camera position is identical in both setups, [-401.5, -15.8, -414], but heading, trajectory, actor, and background differ. Distances above use trace x/z only; the visible level path and margin from the 5 m and 30 m boundaries make that limitation immaterial for these intervals. Clock alignment is approximate to the saved native log anchor.

Setup binary SHA-256 values match the reviewed before/after package receipts: before `ac4d9356da66e8f7a46b49e63cc15dbacf7aaa2109db7314828a6be738237a92`; after `796a23df17c8e811b9ac636e718dbc6c263d322f24d2159a22734801cc44db31`. Package checks identify compiled animation radii 5 m and 30 m and no inspection bridge. Recordings, setup JSON, timing JSON, provenance JSON, and raw animation traces are retained locally. No raw engine logs or authentication URLs are included in this note.
