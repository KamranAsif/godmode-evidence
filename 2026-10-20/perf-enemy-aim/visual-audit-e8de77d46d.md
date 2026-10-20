# Enemy aim visual audit

**Verdict: PASS for the rendered pose comparisons below.**

Reviewed independently on 2026-10-20 against worktree commit `8ede6c5dc6f317c48eddc01dcfe1c7e187bbf175`, including the final medic-pack captures. The auditor made no gameplay, runtime, asset, or fixture changes. `ART_STYLE.md` was read in full before inspection; its later dated exceptions were treated as authoritative.

## Evidence inspected

- `aim-before/` and `aim-after/`: 204 native PNGs each, with matching filenames and capture receipts.
- `aim-comparisons/`: 68 matched before/after sheets. Eleven gun kinds cover level, up, and down aim while aiming, shooting, and walking at 5 m and 15 m. The marksman operator A adds level/up/down sprint at both distances.
- `aim-moving-before/` and `aim-moving-after/`: 15 additional matched walking-and-shooting pairs, covering rifle, pistol, medic, shield, and marksman operator A at three pitches. Auditor comparison sheets are in `visual-audit-moving/`.
- Raw close images were inspected where contact or accessory placement needed clarification. The 15 m comparisons were also inspected as crops preserving the original pixels, alongside a full-frame native image to establish play-distance scale.

All 219 matched cases were visually inspected. Close framing uses the fixture's matched 5 m camera; the 15 m images retain its wider gameplay field of view. Final medic evidence comes from `aim-medic-pack-after/`, copied into `aim-after/` before this verdict.

## Findings

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

## Scope of this PASS

This is a visual verdict on matched native captures at pinned animation phases, supplemented by the 15 moving-shot pairs. It does not establish every intermediate animation frame or transition, performance improvements, runtime resource lifetime, or release/export correctness. Those require their separate verification records. The earlier `playtest-check/normal-gameplay.png` shows exported gameplay startup but contains no visible enemy, so it was not used as proof of enemy gun presentation. Static shot-pose captures are also not a complete muzzle-flash or tracer motion audit.
