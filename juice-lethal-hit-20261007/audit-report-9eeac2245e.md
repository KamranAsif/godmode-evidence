# Initial independent vision audit: final lethal-round triangle impact

**Verdict: VISUAL_GATE_PENDING. ALL PASS: false. Merge clearance: false.**

Per-actor restoration telemetry passes, but all three candidate corpses leave view before restoration; attachment and native death/weapon continuity through expiry remain unverified.

Signed by **Independent Codex vision auditor (/root)** at `2026-10-07T06:51:18.347141+00:00`. Attributed statement, not a cryptographic signature.

## Evidence identity and source scope

Initial candidate capture: `4e0482e1319b912f82e873cfc75e280cd36b155f`, tree `fd3d874164d65c8004b19af1145d8fd90997d875`, on #1001 base `bfce057de19529c66d193f7b69a103e099575e2a`. Initial control is the supplied #1001 survivor-hit implementation. Captures retain their original identities and precede the viewer-pulse merge.

Current source verified locally: `850b70e3b809f8dcb0b9c0f14ee78af186b41983`, tree `93fc2205441fbd1b78eba61618d84da6af1c4968`, origin/main `24bb855f4ad9f1aa5e12e67410fcfecfe92c25a6`. Tracked working diff is empty; diff vs origin/main is 11 additions in two files.

The diff invokes `CombatFeel.onEnemyDied` after native death starts, beside existing native death audio; it uses last replicated health as conservative presentation heat and reuses existing fracture/ripple paths. Damage, audio implementation, death timing, ADS/recoil, spawn rules, shaders and assets are unchanged. The requested 260 ms mesh substitution during native death is intentional; original mesh throughout death is not a gate.

Git blob SHA256 is identical between initial capture revision and current HEAD for each file below:

| File | SHA256 |
|---|---|
| `scripts/client/combat_feel.ts` | `4b0be5287dbd8023fd2f2ef04f922f6c3a99c92865f00f8da182a6ac9cc7d108` |
| `scripts/client/snapshot_renderer.ts` | `83f5a7368ccbb88a97f2b7ec597900f2cd103170bf63443956e59a7d183a431e` |
| `scripts/game_world.ts` | `f680915cbe5422a80c246af1128d5d65ed7c117f4b58fddf060c5d60dc58379e` |
| `scripts/client/triangle_fracture.ts` | `96bcd38708c4bb37e3c9910a0d25a28b16caa358612906c4cc7df2056b58e7a1` |

Read: `AGENTS.md`, `GAME.md`, `ART_STYLE.md`, `ARCHITECTURE.md`, `docs/architecture/enemies-and-ai.md`, `docs/architecture/weapons.md`, `docs/survival/enemies.md`. User explicitly overrides stale repo audit/evidence boilerplate. CPU-only: no engine, import, test, source edit, PR action or GPU work performed. Audit writes are confined to this owned directory.

## Exact visual coverage

All **101 control native frames 0-100** and **98 candidate native frames 0-97** inspected as full 1920x1080 images at 1:1 pixels, in consecutive four-frame contact sheets with labels outside image pixels. No stride-based omission.

All **182 control decoded MP4 frames 0-181** and **183 candidate decoded frames 0-182** inspected frame by frame at 1:1 pixels in native ROI **x=0..1919, y=300..899**. Full native frames supply scene/HUD context. Complete decoded-video pixels outside that ROI were not inspected. This was CPU decode/contact-sheet inspection, not continuous 1x playback or an audio audition.

Additional native ROI reviews covered every frame in control **25-35, 43-54, 59-71** (36 frames) and candidate **18-28, 36-46, 56-66** (33 frames). `roi-coverage.json` contains exact indexes/bounds. `after-lethal-close.png` was inspected full-size and verified byte-identical to native frame 59; it adds clarity, not follow-through time.

All 199 raw RGBA hashes match metadata and every PNG RGB matches corresponding raw RGB. MP4 hashes verified and CPU decodes exit 0:

- Control: `646439f2a61b2877b0dc32bd86226e1d76252d95d485acf5e60045aa1f34748e`.
- Candidate: `439e69ad54aed4c09ac1c4584b98329104a6275e266b7bd004bc56a931ecaff5`.

## Per-actor terminal correlation

Indexes are zero-based. Times below are capture wall seconds and simulation milliseconds; they are separate clocks.

| Lane / actor | Native death onset | Original at onset | First restored | Observed simulation interval |
|---|---|---|---|---|
| before / soldier-e10 | f27, 1.342485s, sim 51354 | true | Original throughout sampled death | N/A |
| before / soldier-e14 | f45, 2.579745s, sim 52595 | true | Original throughout sampled death | N/A |
| before / soldier-e5 | f61, 3.666730s, sim 53698 | true | Original throughout sampled death | N/A |
| after / soldier-e15 | f20, 0.985107s, sim 41447 | false | f25, 1.264188s, sim 41730 | 283 ms |
| after / soldier-e22 | f38, 2.096314s, sim 42554 | false | f43, 2.360604s, sim 42830 | 276 ms |
| after / soldier-e23 | f58, 3.020999s, sim 43488 | false | f63, 3.296065s, sim 43758 | 270 ms |

Accepted ordinary input receipts and player-2 body-hit log health sequences reach zero for those actor ids; no debug/manual kill was used in the accepted recording. Invincible/timescale4 acquisition preceded normal-time capture. Candidate end counts 16 activations/16 restorations, activeParts 0; control 5/5, activeParts 0. These counters support cleanup, not attachment proof. Observed 283/276/270 ms intervals are consistent with nominal 260 ms under discrete sampling; they do not measure exact timer expiry.

## Findings and outstanding visual gate

- **PASS — source_scope**: Current diff vs origin/main is two files, 11 additions. NativeDeath guard and prior-health presentation call reuse existing fracture/ripple beside unchanged death sound. No authoritative damage, weapons, audio, death timing, spawn, ADS/recoil, rig or shader edits.
- **PASS — source_identity_after_rebase**: Both changed files plus game_world.ts and triangle_fracture.ts have identical Git blob SHA256 at capture revision and current HEAD; tracked working diff empty. This is lethal-source equivalence, not visual certification of the merged viewer pulse.
- **PASS — media_integrity_and_review**: 199 raw RGBA SHA256 values match metadata; every native PNG RGB matches raw RGB; both MP4 SHA256 values match encoding metadata; CPU decode succeeds. All native full frames and all decoded video ROI frames inspected with consecutive frames preserved at 1:1 pixels.
- **PASS — ordinary_gun_kill_correlation**: Input receipts request ordinary aim/shoot hold and release; accepted logs contain player 2 body-hit health sequences reaching zero for all three actor ids in each lane. Native death first appears at corresponding per-actor capture onsets. Acquisition used invincibility/timescale4, then normal time; no manual death or timer triggering in accepted receipt.
- **PASS_TELEMETRY_ONLY — activation_and_restore_telemetry**: All three candidate nativeDeath onsets have non-original mesh; same actors later have originalMesh=true, at 283/276/270 observed simulation ms after first death sample. Control death meshes remain original. Candidate end activeParts=0, activations/restorations=16/16; control 5/5. Discrete sampling is consistent with nominal 260 ms, not an exact expiry-time measurement.
- **PASS_OBSERVED_SCOPE — localized_terminal_signature**: Candidate second kill native 38-40 and decoded 63-67 expose localized white triangles on chest/forearm with colored surrounding clothing and equipment. First and third kills are less readable due to range, sights, marker/pickup occlusion. No body-wide white wash or screen-wide terminal debris observed.
- **PASS_OBSERVED_SCOPE — unaffected_detail_and_rig_at_onset**: Visible helmet/face, sleeves, equipment and held rifle remain recognizable; no sampled T-pose, actor rescaling, separated rifle or gross rig collapse at onset/early bend. Prepared mesh faceting is visible at close range, also outside white patch; unmatched ranges preclude pixel-exact detail parity. Complete death/expiry continuity is separately pending.
- **PENDING — attachment_native_motion_and_visible_restoration**: All three candidate corpses leave view before per-actor restoration frames 25/43/63. Short onset/early-bend samples do not establish patch attachment during the complete 260 ms native death interval, visible restoration without a pop, held-weapon continuity across expiry, or continuing native death motion afterward. Root-space ripple follows translation/yaw rather than individual animated bones; post-death mark probe skips removed snapshot actors, so aggregate counters cannot resolve this concern.
- **PASS_OBSERVED_SCOPE — ads_recoil_and_style_preservation**: Normal ADS firing/recoil, ammo exhaustion and return to hip view remain visible. Native world/weapon presentation, flat LiveTube cards and cyan trainer/game-fiction overlays remain distinct. Diff preserves v0.28 implementation and stream/TTS fiction. Initial trainer overlay presence and LiveTube values differ between lanes; no certification of the later viewer pulse.
- **PASS_SOURCE_AND_FIXTURE_SCOPE — fair_hidden_spawns**: Spawn rules are unchanged; accepted fixture logs report hidden presentation for killed targets. This limited capture is not an exhaustive fairness audit.
- **UNVERIFIED_SILENT_MEDIA — audio_and_tts**: Both MP4s are silent. Unchanged audio source calls support diff scope only; no audible quality, mixing, sync or TTS verdict.

Per-kill visual reading:

- **soldier-e15**: Native 20-22: terminal onset at range, ADS/hit marker limits patch reading; intact body/held weapon briefly visible at right during retarget. Actor leaves view before native 25 restoration.
- **soldier-e22**: Native 38-40: clearest terminal lattice, fine white localized chest/forearm triangles; helmet/face, red sleeve, equipment and held rifle retain native presentation; early forward bend visible at 40. Actor leaves view before native 43 restoration.
- **soldier-e23**: Native 58-60: terminal onset with ADS/red marker and green pickup occlusion; white patch briefly exposed during leftward retarget at 60, native head/arms/weapon remain recognizable. Actor leaves view before native 63 restoration.

Control e14 retains its held rifle during the visible native forward collapse (notably native 47-60); original death mesh remains in telemetry. Candidate early bending at frame 40 is encouraging but ends before expiry. Patches on later centered live actors are surviving-hit feedback; their visible expiration cannot certify the offscreen corpse restoration.

The attachment concern is an evidence gap, not a demonstrated floating patch or broken skeleton. Existing root-space anchoring and the lack of post-death mark-probe coverage make a held-view native-collapse capture necessary to resolve it.

## Limits and supplied validation

- Initial before/after share requested seed 0C0FFEE1 but are not matched camera/actor/pixel trials: control acquisition lock 4.088 m, candidate 6.279 m, different camera and targets.
- All captured frames reviewed does not imply all engine-rendered instants captured: native mean gaps 60.055/61.955 ms and maxima 206.605/162.686 ms. CFR30 MP4 holds/drops actual native images, with no generated interpolation. Lossy yuv420p encoding changes fine edges/colors; native PNGs govern those judgments.
- Decode/contact-sheet review is frame-by-frame, not continuous 1x playback. Every video frame was inspected in ROI x=0..1919, y=300..899 at 1:1 pixels; no claim of complete decoded-video coverage outside that ROI. All native 1920x1080 full frames provide context.
- Original candidate failed launch lacking imported resources is excluded. Only accepted candidate-v2 and accepted control are used.
- Accepted engine logs each contain 62 ERROR lines: 20 missing vertex-shader pipeline lines, 20 pipeline.is_null lines, 20 Invalid Task ID lines, and remaining shutdown/resource errors. No SCRIPT ERROR lines observed. Shared errors cannot be attributed to this two-file change from these logs alone; logs are not clean.
- Headless smoke serverReady and forced:true stop are supplied evidence, not independently executed in this CPU audit. Original and rebased 13/13 root tests/cache validity are supplied results; rebased UTF16 log was read, no tests or cache command rerun.
- Current HEAD includes merged viewer pulse while initial captures precede that merge. Four scoped source-file hashes are unchanged; this does not substitute for current-base supplementary visual evidence.
- Supplementary held-camera fixtures are prepared but no supplementary capture is included in this report. Draft PR status/merge events are user-supplied context; auditor performed no PR actions.

The rebased supplied `pnpm-test-viewer-base.log` was read as UTF16LE and ends **ROOT SUITE OK, 13 of 13 passed, 0 failed**. Cache validity is user-reported, including original 859 inputs/564 outputs. Neither was rerun by this auditor. Exact log hashes/error inventories and fixture seed/target text are in `current-source-attestation.json`.

## Evidence needed to close follow-through

1. Ordinary normal-time gun kill on the rebased candidate and supplementary control containing the same merged viewer base; preserve and disclose each actual capture revision/tree.
2. Keep the same struck actor, impact area, native skeleton and held rifle in view from before the lethal round through the complete 260 ms impact, first restored mesh sample, and at least 0.5-1 s of subsequent native death motion. Hipfire and held camera should reduce ADS retarget/weapon occlusion; no presentation/death/timer manipulation.
3. Supply every native full-resolution PNG/RGBA frame, silent MP4 and correlated per-frame actor id, nativeDeath, originalMesh/activeParts, simulation time and capture wall time; disclose native gaps and video hold/drop mapping. Retain body framing as it bends/falls so patch attachment and restore transition can actually be judged.
4. Inspect every native and decoded frame around lethal activation, expiry/restoration and later collapse at 1:1 pixels, with full native context. Multiple representative kills are preferred; one visible timer transition alone does not establish all motion/attachment cases.

Supplementary control is user-prepared in `juice-viewer-gains` with tracked tree `ec1aabbfcf4364014ff67053db26787f74a41b1a`, matching merged main `24bb855f4`; candidate is `850b70e3b`. No supplementary media was supplied at signing, so that proposed pairing is recorded as preparation only.

Signed: **Independent Codex vision auditor (/root)**. This report completes the initial evidence audit and leaves the stated visual gate pending.
