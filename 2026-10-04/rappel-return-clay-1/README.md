# rappel return clay audit

Candidate source: `5e13cb6abdb521cc7311d721fa684737aa8651bd` plus the working tree recorded in candidate.diff.

Every sample from 0 through 2.5 s at 60 Hz: 151 individual frames per camera.
All raw frames are 1920x1080. Indexed contact sheets group 30 frames per page.
A `--pilot` run is only a local preflight, never a complete audit submission.

The diagnostic pins exact production path/presentation time; it does not claim
these are consecutively recorded real-time game frames. Doors, rigs, skinning
and contact helpers are the actual gameplay implementations. The side camera
cuts away the near cargo wall/roof solely to expose otherwise hidden contacts.

Audit the door/palm contacts, sill clearance, feet, landing dip, continuous body
and hand motion, and primary readiness at street contact (1.85 s for van).
No final #929 source push is authorized until the auditor publishes PASS.

Primary trigger taps use ordinary gameplay input at samples30/60/90/120 per camera. Trigger receipts and authoritative player loadedAmmo/infiniteAmmo values are in frames.json. Firing state runs on the ordinary game clock while the return path is sampled; these are not a continuous wall-clock movie. Known HD left elbow/sleeve gap remains for audit; db7 cuff assets repair wrists only.

## VISION auditor %108: complete N1 verdict — FAIL

Audited immutable evidence `9f01e5d4a0c814c3749247bef83c98e08451eee8`, folder `2026-10-04/rappel-return-clay-1`. Opened **every individual original**: `firstPerson/000.png` through `150.png` and `side/000.png` through `150.png`, 302 originals total. Contact sheets and residual measurements were not substitutes for visual review. Frame numbers below refer to the actual three-digit filenames; intervals include both endpoints. Frames 149 and 150 were reopened at original resolution to confirm the release boundary and elbow opening.

| Submitted clip | Verdict | Complete visual coverage |
| --- | --- | --- |
| Actual rappel return, including primary firing and release to weapon support | **FAIL** | All 151 first-person and all 151 side originals |

### Confirmed animation and mesh defects

1. **FP 000–149: open rope grip.** `LeftHand` and the index/middle/ring/pinky MCP, PIP and DIP joints remain an open C/claw rather than a closed fist around the thin rope. The thumb does not oppose the four fingers across the rope. The rope passing through the projected finger area and the small contact residual do not establish a wrapped grip. Move the palm onto the rope's exterior, curl all four fingers inward around its circumference and oppose the thumb inward across the finger closure. Keep the five digits distinct, preserve native segment lengths and maintain this closure throughout descent and firing. Coordinate %102's hand articulation with %92's actual rope position and thickness.

2. **FP 030, 060, 090 and 120: off-hand roll discontinuities at firing starts.** Against each immediately preceding frame, the left hand/forearm suddenly rolls inward, exposing substantially more palm and shifting the wrist inward/right while the rope target stays in place. Primary weapon recoil can move the firing arm; the rope hand must retain a coherent gripping roll and elbow plane. Preserve the off-hand pole and forearm roll independently of primary recoil, then blend any intended adjustment continuously. The following recovery samples were inspected individually; these listed onset frames are the confirmed abrupt changes.

3. **FP 150 versus 149: release/recovery teleport.** At the 2.5 s boundary the rope disappears and the left hand moves from the rope on the left of the screen directly to primary-weapon support near the centre/right. The left shoulder, upper arm, elbow, forearm and hand all switch silhouette and orientation in one 60 Hz step; there is no visible release, withdrawal or reach between these poses. Animate opening the rope fist, withdrawing from the rope and moving inward/right onto the handguard over a continuous sequence, with a stable elbow pole and plausible forearm roll. Retain the transition across the return-state boundary instead of replacing the arm pose instantly. Supply samples through the completed support recovery after 2.5 s.

4. **FP 150: visible left elbow/sleeve separation.** The upper-arm sleeve ends near screen (925, 800), while the forearm sleeve begins above/right of it. Green background is visible through the opening beneath their narrow upper connection. This is an actual elbow silhouette gap, distinct from the repaired wrist cuff. Extend and skin the elbow sleeve overlap across the full bend so the forearm and upper-arm surfaces remain joined on the lower/outside edge of this recovered pose; verify the entire transition in FP and a readable side/hand close view. The obstructed, distant N1 side frames do not support assigning additional exact elbow-gap ranges elsewhere.

### Capture failures that also prevent PASS

- **SIDE 030–033, 060–063, 090–093 and 120–123:** the scene and actor disappear behind a flat field. Most are grey; frame 062 is reddish. These originals cannot establish body, elbow, hand or foot continuity. Keep the diagnostic camera outside enclosing geometry and remove diagnostic overlays from the rendered audit views.
- **SIDE 000–029, 034–059, 064–089, 094–119 and 124–150:** broad translucent red rectangles obscure a distant, small actor. Fingers, palm/rope seating, sleeve joins and feet cannot be resolved to the required standard. Supply an unobstructed tracked full-body side view plus a separate tracked world-hand close view with the rope and all five digits visible. This is an evidence failure; no finger or foot defect is invented from unreadable pixels.
- **FP 031–033, 060–063, 090–092 and 120–123:** a large opaque grey rectangle blocks most of the world. The foreground arms remain visible, but these frames cannot certify the actual descent scene. Remove the blocking diagnostic geometry/material or correct the camera intersection and recapture every affected sample. FP 093 is clear; it is intentionally excluded from this FP range despite the failed side view at that frame.

### Limits and required next evidence

No additional wrist-cuff opening was confirmed in FP 000–149; the grey joined seams there are not reported as holes. No additional elbow flip, finger fusion or trigger-finger defect is claimed where stock or failed side coverage hides the relevant joint. Foot planting, ground clearance and the completed landing/recovery cannot receive PASS from this set's distant/obstructed side views and single post-release endpoint. Extend the complete capture through the recovery with unobstructed tracked coverage.

This complete report supersedes the earlier partial N1 defect message. N1 remains immutable **FAIL** even if a later helper or N2 candidate measures better. The separately audited fix-4 tablet arm clips do not certify this actual descent, core weapon clips or a changed shared solver. No final #929 source push is cleared by this report. Audit N2 separately only after its complete evidence SHA and folder are supplied.
