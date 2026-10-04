# Assault HD clay animation audit ? PR #936

**Diagnosis: the dominant wrist and arm-angle failures are introduced by our procedural arm IK and palm seating. Finger curl is not the cause. No game or asset fixes were made.**

All numbered frames are native 1920?1080, grey and untextured, with one key light. The same corrected pose is rendered from the first-person camera and a fixed left-side camera. Red banners and red contact-sheet borders mark suspect wrist/forearm poses; see `problem-frames.json` and `joint-metrics.csv` for exact frames and measurements. Numbering starts at 0000. Side contact sheets use a fixed crop to make joints larger; the numbered source frames are uncropped.

| Sequence | Samples per camera | First-person contact sheet | Side contact sheet | Numbered frames |
|---|---:|---|---|---|
| Reload | 100 | [First person](reload/first-person-contact-sheet.png) | [Side](reload/side-contact-sheet.png) | [FP](reload/first-person/) / [Side](reload/side/) |
| ADS transition + held ADS | 127 | [First person](ads/first-person-contact-sheet.png) | [Side](ads/side-contact-sheet.png) | [FP](ads/first-person/) / [Side](ads/side/) |
| Running / steady sprint | 61 | [First person](running/first-person-contact-sheet.png) | [Side](running/side-contact-sheet.png) | [FP](running/first-person/) / [Side](running/side/) |
| Knife slash | 55 | [First person](knife/first-person-contact-sheet.png) | [Side](knife/side-contact-sheet.png) | [FP](knife/first-person/) / [Side](knife/side/) |

## Sampling and game fidelity

Reload includes **every one of RifleReload's 100 native samples**, from 0 to 3.3 seconds at 30 Hz. ADS is not a separate native clip: the game uses RifleIdle / MachineGunFirstPersonIdle with a procedural aim blend. This set samples 0?2.1 seconds at 60 Hz, including all 64 idle source frames; frames 0000?0009 include the 7/second ADS transition, then the remaining frames show held ADS.

Running uses the actual MachineGunFirstPersonSprint alias (16 source samples, 0.5-second cycle), sampled at 60 Hz for two full cycles. It includes every native key time, steady sprint carry, support-palm roll/offset and elbow pole, and the production sway formula with a prescribed one-stride-pair phase (`bobPhase = 4*pi*time`). This is a deterministic clip/stride review, not a recording of a particular player's network speed estimate or gait-rate rescaling.

Knife includes the full 600 ms production KnifeView presentation: 60 Hz frames plus **all 31 native KnifeSlash samples**, mapped through `knifeMotionTime`. Enter/exit poses intentionally move below the camera; the 600 ms endpoint is hidden as in the game. The arm lift, IK, knife attachment and camera FOV all use the production code.

The fixture invokes unchanged WeaponView and first_person_pose corrections, native finger blending (25% correction), and KnifeView. Idle IK is forced on each diagnostic sample instead of allowing the normal 20 Hz solve budget to skip a source frame. Recoil, weapon draw, camera shake, HUD and foreground blur are omitted. Camera FOV and corrected joint geometry are preserved, and this review uses a native 1920?1080 viewport rather than the normal 1280?720 foreground buffer. See [provenance](provenance.json), [recipe](recipe/clay_review.ts), [sampling](sampling.json), and [joint receipts](receipts.json).

## Diagnosis by sequence

**Reload:** the native left wrist/forearm bend proxy ranges from 0.7? to 47.0?. After correction it ranges from 14.8? to 107.0?, and the wrist's rotation relative to its forearm differs from the raw clip by up to 148.8?. Example: frame 0044 is about 25.1? raw versus 101.1? corrected. The combined marked reload ranges are 0000?0023, 0030?0031, 0034?0055 and 0059?0099. Around 0034?0055 the cuff pinches/twists; frames 0049?0050 reproduce the previously reviewed mid-reload cuff failure. The raw-clip comparisons on the *same skin* retain a substantially more natural wrist. [Frame 0049 raw/game comparison](ablations/reload-0049-comparison.png).

The reload code carries the native free-hand trajectory into the firing palm's target frame, anchors the shoulders below the camera, then solves the limb again. `placeCharacterPalm` replaces the hand orientation after that solve without a wrist-angle limit. The left reload solve does not distribute the requested palm roll through the forearm (`matchForearmRoll` is left false). Native elbow-plane preservation plus that forced hand target can therefore leave a sharp forearm-to-hand discontinuity. This is procedural arm/palm correction, not an intrinsically broken native reload. Disabling finger curl leaves the six wrist/forearm/upper-arm transforms exactly unchanged in all eight tested reload samples; the support fingers are already native during reload.

**ADS:** the held support wrist remains sharply cocked (about 74.6?75.0? bend proxy for most held frames, versus roughly 8?10? raw). The firing wrist also bends sharply, reaching about 101.4?. Frames 0000?0126 are flagged. Both elbows are forced into the existing generic gun hold's steep pole directions while their palms are seated on the gun. The shoulder anchor and grip/pole fit were inherited for a different body and were not validated for this HD body's proportions. This explains the incorrect holding-arm angle as well as the cuff bend. The raw RifleIdle clip does not have that bend; disabling curl leaves the arm transforms unchanged within floating-point noise (<0.000001).

**Running:** frames 0000?0060 are flagged because the firing wrist stays sharply bent (66.0?85.5? corrected, versus 13.4?46.0? raw), with additional intermittent support-wrist folding as the prescribed sway traverses the stride. It uses the same gun-specific grip/pole constraints plus the sprint support offset and roll. This is the procedural fit/IK interaction, not a bad native run cycle. Removing curl leaves the tested arm transforms unchanged.

**Knife:** no gross wrist/forearm collapse was identified in this sequence, so no wrist problem frames are marked. Native wrist roll is retained; the production 0.2 m palm lift changes relative wrist rotation by about 24?37?, with a bend proxy below 39?. The same native skin survives these poses without the reload's large cuff collapse. This does not certify every knife contact or finger fit; it addresses the wrist/forearm problem under review.

## Skinning versus transfer

There was **no low-resolution-to-high-resolution weight transfer** in #936: Mixamo accepted and skinned the full-resolution body directly. The builder retains that native FBX mesh and its vertex weights, then restores original materials through the existing UVs. Arms extraction retains those weights. The review GLBs change only material/image declarations and leave the mesh/skin/animation binary chunk byte-for-byte unchanged. The same native skin is used for raw and corrected ablations, so a transfer failure cannot explain their difference.

Native automatic weights and linear skinning can amplify the visible cuff pinch at these extreme poses; they are not proven perfect by this audit. The evidence identifies the procedural wrist discontinuity as the primary trigger, and does not establish that repainting weights alone would solve the inherited arm-angle mismatch. Finger rotation blending acts downstream of Hand and cannot repair that discontinuity.

Measurements are geometric review proxies: the angle between elbow-to-wrist and wrist-to-middle-finger-root vectors, and the change in hand rotation relative to forearm. Red flags use a corrected bend >=60? with >=20? added over native, or a relative-rotation change >=110?, plus visually identified cuff pinch. They are review markers, not anatomical joint limits. Unmarked frames are not blanket animation approval.

**No fixes applied.** The earlier four stills were insufficient to validate these grips; this frame-by-frame evidence supersedes that assessment.
