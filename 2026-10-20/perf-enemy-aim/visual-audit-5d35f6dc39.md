# Enemy aim visual audit

**Overall visual verdict: PASS. Automatic runtime captures: PASS. Pinned fixture comparisons: PASS.**

Latest automatic combat captures from `live-after-lod-restore/` resolve the previously blocking arms-out/rest-pose regression. The latest re-audit at the end of this report supersedes the historical automatic FAIL sections. The 219 matched fixture comparisons retain their stated scope.

Reviewed independently on 2026-10-20 against worktree commit `8ede6c5dc6f317c48eddc01dcfe1c7e187bbf175`, including the final medic-pack captures. The auditor made no gameplay, runtime, asset, or fixture changes. `ART_STYLE.md` was read in full before inspection; its later dated exceptions were treated as authoritative.

## Evidence inspected

- `aim-before/` and `aim-after/`: 204 native PNGs each, with matching filenames and capture receipts.
- `aim-comparisons/`: 68 matched before/after sheets. Eleven gun kinds cover level, up, and down aim while aiming, shooting, and walking at 5 m and 15 m. The marksman operator A adds level/up/down sprint at both distances.
- `aim-moving-before/` and `aim-moving-after/`: 15 additional matched walking-and-shooting pairs, covering rifle, pistol, medic, shield, and marksman operator A at three pitches. Auditor comparison sheets are in `visual-audit-moving/`.
- Raw close images were inspected where contact or accessory placement needed clarification. The 15 m comparisons were also inspected as crops preserving the original pixels, alongside a full-frame native image to establish play-distance scale.

All 219 matched cases were visually inspected. Close framing uses the fixture's matched 5 m camera; the 15 m images retain its wider gameplay field of view. Final medic evidence comes from `aim-medic-pack-after/`, copied into `aim-after/` before this verdict.

## Pinned fixture findings

| Check | Result |
| --- | --- |
| Gun points coherently level/up/down | PASS |
| Firing hand remains attached to rigid gun | PASS |
| Supporting hand remains on the intended hold | PASS; the shotgun retains its authored pump-hand motion |
| Aim, shooting, and walking silhouettes | PASS |
| Shield remains readable and faces forward during shooting | PASS |
| Medic pack remains seated against the back | PASS after the lower-spine mount correction |
| Marksman operator A sprint holds the gun forward | PASS at 5 m and 15 m |
| Combined walking and shooting samples | PASS for all 15 pairs |

No remaining blocking visual regression was found in these comparisons. Some authored shooting poses lean farther forward or raise the support elbow more than the legacy fit. Their final gun direction and contact remain coherent. Operator A's existing ghillie geometry can obscure the receiver and arms, but its final barrel direction is readable and the gun is no longer carried behind the shoulder.

## Rejected evidence and resolved defects

The early automatic/pinned fixture batch was rejected: its stored numeric pose could disagree with the scene rendered after the raw animation callback. The final pinned fixture uses manual animation callbacks and explicit ordered sampling; the completed-frame captures replace that batch. Numeric contact alone was never treated as visual proof.

The first manual shooting batch also failed. Pistol-family guns pointed substantially below the corresponding legacy bore, the shield turned nearly edge-on, and the medic pack appeared above the shoulders. Corrected upper-body shot ownership and gait handling restored gun direction and shield facing. The final fixed lower-spine pack mount removed the remaining medic accessory defect. The rejected shooting images are retained separately in `aim-after-shot-hip-fail/`.

## Scope of the pinned PASS

This is a visual verdict on matched native captures at pinned animation phases, supplemented by the 15 moving-shot pairs. It does not establish every intermediate animation frame or transition, performance improvements, runtime resource lifetime, or release/export correctness. Those require their separate verification records. The earlier `playtest-check/normal-gameplay.png` shows exported gameplay startup but contains no visible enemy, so it was not used as proof of enemy gun presentation. Static shot-pose captures are also not a complete muzzle-flash or tracer motion audit.

## Historical automatic combat supplement: FAIL (superseded)

Additional native automatic-runtime evidence was inspected independently on 2026-10-20:

- Changed close view: `artifacts/enemy-cost/after-uninstrumented/grip.png`.
- Changed play-distance view: `artifacts/enemy-cost/after-uninstrumented/play-distance.png`.
- Baseline close view, in sibling worktree `perf-enemy-aim-baseline`: `artifacts/enemy-cost/before-uninstrumented/grip.png`.

The changed close view shows the nearest rifleman with an open supporting hand extended sideways, an arms-out/rest silhouette, and the gun held near the opposite shoulder rather than between the two hands in a coherent firing hold. The changed play-distance view shows the same arms-out posture on multiple actors. This is visible during ordinary automatic combat and is therefore a blocking presentation regression. The baseline close rifleman bends both arms toward the chest-level rifle and reads as properly holding it.

These runtime views differ in camera position and combat time, so this finding is based on the clear structural pose defect, not a pixel-difference claim. The screenshots establish the visible failure; they do not establish its exact engine callback or mixing cause.

**Overall visual approval remains FAIL until new automatic-runtime close and play-distance captures demonstrate coherent holds and readable combat poses after the fix.** The pinned fixture's explicit manual sampling can produce valid baked poses while masking an automatic playback/order failure. Its 219 passing cases cannot substitute for this runtime check. Performance gains from the failing arms-out run must not be presented as a successful implementation result.
## Historical automatic callback-order follow-up: not yet approved (superseded)

The subsequent `artifacts/enemy-cost/live-after-order/wide.png` substantially improves the ordinary crowd: most visible actors bend their arms toward chest-level guns, and the foreground airborne actor has a coherent hold. However, `live-after-order/play-distance.png` still contains conspicuous arms-out actors near image coordinates (1035, 675) and (1770, 675), alongside actors with normal holds.

The associated state data includes jump/land animation states and ordinary grounded states, but it is not tied to the captured frame or screen-space actor IDs. It cannot establish whether the suspicious actors are using an ordinary gun animation or an excluded special/traversal action. A special action also needs a readable, intentional pose; being airborne does not by itself validate a gun separated from its hands. Baseline play-distance airborne actors still show coherent holds.

The callback-order follow-up is therefore **not yet approved**. Overall runtime verdict remains FAIL while the suspicious poses are unclassified and the new automatic close capture is pending.

## Final automatic runtime re-audit: PASS

Reviewed independently on 2026-10-20 against the fresh evidence manifest at commit `878e6b852e21df1971c6ba41661fa410f5f8674a`. The manifest records an empty worktree diff, disabled frame tracing, 65 enemies, and native 2560?1440 captures. No engine was launched by this auditor.

Inspected `artifacts/enemy-cost/live-after-lod-restore/wide.png`, `play-distance.png`, and `grip.png`, plus their adjacent `*-state-before.json` and `*-grips-before.json` records. Baseline automatic close and play-distance images in the sibling baseline worktree were used for qualitative pose comparison. The cameras and combat times differ; this is not a pixel-matched comparison.

- The wide crowd has bent arms converging on the guns and readable ordinary combat holds. The prior conspicuous rest-pose silhouettes are absent.
- The play-distance view shows coherent holds on the unobscured foreground and middle-distance actors, including those by the storefronts and trees. The visible airborne actor retains an intentional bent-arm hold. Occluded actors cannot establish detailed hand contact.
- The close view uses FOV32 and clearly shows the supporting hand under the rifle foreend and the firing hand at the grip, with the rifle held across the chest. It resolves the exact structural defect visible in the rejected automatic close image.

The adjacent grip records report 65/65 baked actors active, zero missing selected clips, and zero native `Start` states in each capture. Both automatic and reduced/manual callback modes are represented. Full/reduced/frozen LOD counts are respectively 45/20/0 (wide), 13/46/6 (play distance), and 1/53/11 (close); frozen is a subset of reduced. Some queued clip/state selections differ in these adjacent records, so metadata was used as supporting context rather than as a substitute for the visible frame. The earlier metadata-only proof was insufficient and remains rejected.

**The automatic runtime visual check now passes, superseding the two historical automatic FAIL sections. Together with the retained 219 matched fixture passes, no blocking visual regression remains in the inspected evidence.** This approves the presented static samples and their visible ordinary gun holds. It does not claim every animation transition or every occluded actor was visually verified, nor does it approve timing, resource lifetime, or export correctness.
