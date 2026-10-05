# Assault HD clay fix 4 — TABLET batch awaiting independent vision audit

Production source `7a9319403f4527c7da21b7f5b536b0ec932445bb` on `fix/assault-hd-arm-poses`, committed locally. Fixed game source and PR publication remain held for %108’s ALL CLIPS PASS. This is a complete **tablet batch**, not a complete weapon/return set or a visual PASS.

399 individual uncropped 1920×1080 originals, 133 poses, 12 contact sheets. Every 60 Hz sample and all procedural boundaries are included. Raise: 46 poses (0–0.75 s), hold: 10 (0.75–0.9 s), tap: 53 (0.9–1.7 s), lower: 24 (0–0.38 s). Tap adds the new press-start boundary at 1.06 s; use the manifest timestamps when comparing old frame numbers. No samples were removed to improve the result.

The first-person and original side cameras are retained. The close camera now looks from above the back of the tablet so all four holding fingers can be inspected; it complements FP’s thumb/front-bezel view. Every camera has numbered originals and a contact sheet. Tablet and contact geometry remain present. The LAUNCH UI is replaced by uniform clay; a blank screen cannot prove label contact.

## Diagnosis and candidate changes

The fix-2 tablet defects came from procedural placement and articulation: hand frames put the finger rows across the tablet width, generic cylinder curl did not fit its flat back, and tap refinements discarded the seated hold as soon as reach became nonzero. Iterative index folding and re-solving a grasp against a tilting tablet also introduced discontinuities. The saved directly Mixamo-rigged mesh, weights, bind poses, bone lengths and native clips are unchanged; there was no weight transfer.

- Palm spacing and pad clearance use the HD palm width and #946 model bounds: half-width 0.127 m, rear surface −0.02538 m and front surface +0.002075 m. Finger rows follow the side edges, distinct pads fit the exterior back and opposed thumbs touch the front corners. The shorter pinky targets the back corner.
- Tablet elbow poles come from each HD native upper-arm vector with a downward component scaled by its measured length. The native-relative 20° wrist clamp remains active.
- The tablet and already seated arm viewmodel move together through raise/lower. This changes the rig root transform, not bone lengths or bind geometry. The held-frame solve remains the same through those motions.
- Right finger articulation blends the fitted hold in parent-local rotations into its released curl while the index extends to the press plane. Smooth release/press/recovery clocks and fixed refinement passes replace the instant grip resets. The left hand keeps its clamp during the tap.

The largest measured consecutive joint step in visible samples is 18.678°. 4 poses have review flags, including explicit press-contact visual leads. Terminal-bone residuals are inspection aids, not measurements of the glove surface. Red sheet borders identify review leads; zero rotation flags do not establish a visual PASS. See [problem-frames.json](problem-frames.json), [joint-metrics.csv](joint-metrics.csv) and [receipts.json.gz](receipts.json.gz).

## Capture and validation

Calls production StreakTablet, HeldObjectArms and character_rig code with the real HD arms and tablet. Uniform grey roughness 0.8, textures/normal maps removed, directional key (−35°, −35°, energy 1.3), ambient 0.28. FP FOV 50°, near 0.005 m. Original side: (−1.9, 0.12, −0.45), target (0, −0.25, −0.45), FOV 45°. Close back: (0, 0.14, −0.8), target (0, −0.12, −0.43), FOV 45°. Source diagnostics and executed JS are saved under [recipe](recipe). [frames-manifest.json](frames-manifest.json) pins every original with SHA-256 and time.

`pnpm build:scripts` passed; changed-file ESLint passed; Prettier ran; all seven tablet-clock/wrist-clamp/finger-blend unit tests passed. The pinned GodotJS fixture rendered all 399 images windowed and off-screen without script errors. Owned engines and capture sessions were stopped. A full arena export was not repeated for this tablet batch; final source validation remains required before PR publication.

Weapon and supplementary rope production behavior was not changed in this tablet iteration and remains separately pending under immutable fix-3 `eb2be0b96a0adab83975ef36066510e6d31983f0`. Those frames are not copied into this batch or presented as newly rendered. Lane D’s actual van/rappel/parachute sets remain separate required audits. Fix-1 and fix-2 findings remain immutable and are not automatically inherited into this candidate.

## Frame index

| Clip | Poses per camera | First person | Original side | Close back |
| --- | ---: | --- | --- | --- |
| tablet-raise | 46 | [sheet](tablet/tablet-raise/first-person-contact-sheet.png) | [sheet](tablet/tablet-raise/side-contact-sheet.png) | [sheet](tablet/tablet-raise/side-close-contact-sheet.png) |
| tablet-hold | 10 | [sheet](tablet/tablet-hold/first-person-contact-sheet.png) | [sheet](tablet/tablet-hold/side-contact-sheet.png) | [sheet](tablet/tablet-hold/side-close-contact-sheet.png) |
| tablet-tap | 53 | [sheet](tablet/tablet-tap/first-person-contact-sheet.png) | [sheet](tablet/tablet-tap/side-contact-sheet.png) | [sheet](tablet/tablet-tap/side-close-contact-sheet.png) |
| tablet-lower | 24 | [sheet](tablet/tablet-lower/first-person-contact-sheet.png) | [sheet](tablet/tablet-lower/side-contact-sheet.png) | [sheet](tablet/tablet-lower/side-close-contact-sheet.png) |
