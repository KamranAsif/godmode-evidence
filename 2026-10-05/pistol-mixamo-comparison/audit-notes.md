# Pistol comparison decision

Do not replace PR #958 with this candidate. The native wrist motion is better, but the combined presentation is worse. The reviewed scripted GLB was restored byte-for-byte after comparison. No runtime code or scripted keys changed in this experiment.

Every one of the 550 frames was inspected in first person and side view. First person uses a fixed 50 degree head-relative viewmodel camera. Side views adapt their framing to retain the hands and prop through holstering. Each chronological contact cell shows first person above side; the full individual images are in `clay/`.

| Clip | Samples | Audit finding |
| --- | ---: | --- |
| Idle | 41 | Native wrists read naturally, but the left fingers float beside the grip and the right sleeve dominates the lower frame. |
| ADS | 31 | Existing rear/front socket optical axis is centered at the final aimed pose. The support fingers still miss the grip. |
| Fire | 36 | Natural one-handed recoil, but the pistol drops almost entirely below the frame at frames 14–17. Dropping the support hand also creates a discontinuity from the two-handed idle. |
| FireADS | 36 | Separate constant optical-axis alignment; native recoil is retained. Support hand disappears and some recoil wrist flexion is too strong for this camera. |
| SprintIn | 7 | Genuine initial native running frames, with no generated transition. Short repeated-cycle trim is mechanically abrupt. |
| Sprint | 23 | Aimed running keeps the right knuckles and gun visible, with constant prop-to-hand placement. The open support grip remains a defect. Carry-running alternative was rejected because it hides the hand. |
| SwapIn | 113 | Reverse of native aim-to-holster trim. Hidden start passes, but early visible raising crops the gun and exposes the sleeve cuts; near frame 96 the sleeves fill the frame. |
| SwapOut | 113 | Native holster motion and fully hidden final endpoint. Sweeps toward the upper left and exposes forearm cuts during lowering. |
| Reload | 150 | Off-hand magazine attachment follows native hand motion, but source fingers are too open. The pistol leaves first-person view around frames 74–103, including midpoint; seating/contact fail near frame 123. |

The six best frames are relative picks within a rejected candidate, not approval. `review-picks.json` gives the six best and six worst frame IDs and reasons; original PNGs are in `best/` and `worst/`.

`scripted-vs-mixamo.png` compares the reviewed #958 asset against native mocap for hold, ADS, reload midpoint and sprint. Individual captures are untouched 1280x720 game captures. Both use the same fixed 50 degree viewmodel camera and existing runtime selector, with identical normalized phases; separate fixture instances have different world backgrounds. Debug pinning exercises the existing runtime rather than demonstrating unpinned transition timing. Remaining textured reload pull/insert and fire frames are also included.

Four candidate structural tests pass: dedicated finger rig, hidden swap endpoints, sprint hand visibility and prop lock, ADS optical axis. Those tests were local adaptations for genuine mocap clip lengths and holstering behind the eye; they do not override this visual rejection or modify the committed tests. The reviewed branch's seven viewmodel tests and 634 game-rules tests pass; format, build and lint pass (lint has five pre-existing warnings). Headless smoke sampled all nine clips without script errors; owned instances stopped.

Only the pistol was worked on. The player's primary was verified as `machineGun`, category `assault`, and is called the assault rifle in reports. No assault rifle asset work has started. PR #958 stays open for Kamran's review; no merge.
