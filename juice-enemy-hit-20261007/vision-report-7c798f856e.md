# Enemy triangle hit reaction ? provisional vision report

**ALL PASS withheld.** Candidate `ff17b8a07498ec578de4896c358cae3ff570c782` visibly replaces the inherited broad red damage wash with local triangle reactions on the captured supported rifleman rigs. No scoped visual regression was found in the supplied frames. Active expiry/death/cull/reset and exact timing are not yet independently proved.

Signed: **Codex /root**, session `juice2-codex-vision-root-20261007T022545Z`, 2026-10-07T05:08:01Z. This is an auditor attestation, not a cryptographic signature.

## Evidence and coverage

Read latest worktree AGENTS.md, GAME.md and ART_STYLE.md; reviewed candidate diff and existing fracture helper/shader. Source scope is only `scripts/game_world.ts` and `scripts/runtime_actions/inspection_state.ts`: existing mesh/shader reuse plus existing stats exposed as `lattice.fracture`.

All **130 control and 88 candidate native full scenes** were viewed at original 1920?1080 resolution. Each clip's **181 decoded MP4 frames** was reviewed sequentially at 1:1 in the impact/ADS ROI `(720,380)?(1200,740)`. These are native pixel crops, not resized thumbnails. Every encoded full scene was not individually viewed. No normal-speed playback or audio judgment was made. MP4s are silent 1080p30 with measured-timestamp holds/drops, not new motion evidence.

All 88 candidate `.rgba` frame files match their corresponding `frames[].rawSha256`; all 88 PNGs decoded to RGBA also match. **No genuine mismatch.** My earlier `badHashes` came from comparing encoded PNG bytes against raw framebuffer hashes. First expected/actual: `e2b56e26ef63c25e1291bd478b350dd5b1816da5eca3fc392cd3c638eff43bb8`.

Initial target range differs: **8.878m control / 3.221m candidate**; later snap range **11.4m / 12m**. This supports a qualitative effect comparison, not identical-camera size or recoil measurements. Candidate maximum native gap is **431.458ms**, between frames 2 and 3; control maximum is 248.076ms. Both lifetime requirements are shorter than the largest candidate gap.

## Clearest after still

Use **`after-enemy-hit/frame-0058.png`**, native frame 58, **4.275853s**, render frame 298. Approximate head patch: **x926?961, y476?517** in the original 1920?1080 image. White triangle facets are exposed above the sight, while torso and red shoulder retain original detail. Frame 7 at 0.955954s is the closer chest alternative, with more ADS occlusion.

Frame 58 PNG SHA256: `57708bf65f257692e6ba33570942b9d32446ca4dd5758c16c082316b8b3a05a3`.
Raw RGBA SHA256: `e080efd23dfe643f5c57fd2be15eb52eefffd85622251015be0a47535c92ac0b`.

The uploaded frame 5 corresponds to local PNG SHA `e88053d642d28eb4945164f0b9e48e209a17ca54e075402f911405a011ed470a`; its chest reaction is more obscured by the sight.

## Findings

| Gate | Finding |
|---|---|
| Real target hits | Observed. Three actual ADS gun kills and snaps in each capture; ordinary combat receipts and rendered kill markers agree. |
| Local triangle detail | Observed on chest at candidate 3/5/7, 18/20/21 and 39; head at 57/58. MP4 frames 18?29 and 126?128 corroborate. |
| Whole-body red tint | Absent in candidate 0?87 on captured supported rigs. Control 3?14, 19?30, 38?54 and 61?75 shows the broad wash. Original red shoulder accents remain. |
| Body material / rig / held gun | No visible regression in available frames. Head/armor outside chest patches remain intact; candidate 59?87 recovers normal head material with coherent limbs and attached held gun. Sampled preparation position/weight errors are 0. |
| Existing signature / excluded systems | Source preserves existing triangle assets/shader and player-hit implementation. No gun, camera, map, hands, AI or spawn edits. No new visible ADS/HUD deformation. |
| 140ms flinch | Source constant and calculation unchanged; exact rendered timing pending. |
| 260ms expiry | Source restore loop present. Head patch visible at 58 disappears by 59 (4.339860s); exact expiry and original mesh restoration need correlated readings. |
| Death / cull / reset cleanup | Source restoration precedes each corresponding path; active-path runtime proof pending. |
| Active-fracture leak | Final `activeParts: 0` and balanced 6 activations/6 restorations prove eventual aggregate balance only. Path coverage pending. |

There is **no observed scoped rendered failure requiring a source fix**. This is limited to the captured supported rifleman rigs, visible poses and materials. No all-rig roster, no-shimmer, render performance or whole-game fairness approval is claimed.

## Pending gates

The supplied pre/post stores read activations **0?6**, restorations **0?6**, activeParts **0?0**. Counters count mesh parts globally. They do not isolate expiry, lethal transition, cull or leave_match/reset, and no sampled active state was supplied.

The queued supplementary wrapper should correlate actual target damage/health, target ID and simulation time with native frames and read-only inspection. For expiry, show activeParts above baseline after a nonlethal hit, no further hit or lifecycle action, then restoration to baseline around the existing 260ms deadline. For death/cull/reset, begin each from a demonstrably active fracture and record ordinary event timing early enough to exclude prior expiry, restoration deltas and resulting baseline. Death also needs original-body/death views before free. Keep unrelated activations and sample latency explicit. Exact 140ms pose timing remains separate from mesh lifetime.

If a supplied trace fails, report its exact frame/region and concrete restoration failure before recommending a fix. Do not substitute aggregate totals for these gates.

## Inherited presentation and validation

The ADS post obscures small chest reactions in both versions; gold kill banners and the large stream/chat panels remain inherited presentation. Approved ADS/recoil stays outside this change. Enemy counts, fairness, hidden spawns and stream/TTS direction are not certified by this clip. Silent evidence cannot assess TTS quality.

Read `pnpm-test.log`: **ROOT SUITE OK, 13/13 steps, 0 failed**. Owner-reported build/lint and 613 units were not rerun. The [published proof summary](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/juice-enemy-hit-20261007/combat-proof-summary-6862eb19f3.json) corroborates counters and discloses the same cleanup limits; it is capture-owner evidence, not audit approval.

No Godot, import, tests, source edits or GPU processes were run. Only audit artifacts were written. The machine-readable gate decisions, precise evidence hashes and limitations are in `vision-report.json`.
