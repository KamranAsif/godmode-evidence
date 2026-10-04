# Assault HD clay fix 1 — awaiting independent vision audit

Game source: `a3f22f143a0aa864c83c41be6589118a989457fc` on `fix/assault-hd-arm-poses`, rebased on merged #943 and #945. Exact production sources are saved under [recipe/production](recipe/production). No game PR has been opened or updated for these fixes.

7110 individual, uncropped, unannotated 1920×1080 PNG originals; 108 contact sheets. Frame numbers are in filenames and sheet labels. Red sheet borders mean a measurement flagged that frame; [problem-frames.json](problem-frames.json) gives the exact frames and reasons. Flags are review leads, not a substitute for the vision auditor. [frames-manifest.json](frames-manifest.json) records every frame's SHA-256, time and flag.

## Presentation and timing

Uniform grey roughness 0.8, no textures or normal maps, simple directional key (−35°, −35°, energy 1.3), ambient 0.28. Native GPU render at 1920×1080, windowed and off-screen. FP FOV 50° matches the production viewmodel camera; near plane 0.005 m. Original side camera: (−1.9, 0.12, −0.45), target (0, −0.25, −0.45), FOV 45°. Added close side: (−1.05, −0.08, −0.4), target (0, −0.28, −0.4), FOV 45°. Both side originals remain uncropped.

Every animation input key is included, plus procedural transition boundaries. ADS, running, sprint and knife also sample 60 Hz. Reload source keys map to the actual roguelite reload durations: MG 2.7 s, pistol 2.5 s, shotgun 2.5 s, sniper 3.3 s. Firing source keys map to 0.633 s and use production recoil recovery. ADS transition uses production 7/s blend, then held native idle. Running and sprint use FirstPersonWalk, which current selectFirstPersonAnimation selects for both; locomotion inspection uses the authored source clock, with sprint entry and production carry/sway applied. Swap uses native idle plus the actual 0.6 s draw transform. Knife uses production KnifeView timing, its gun dip, and the held gun/arms alongside the knife.

These are poses through production first_person_pose, WeaponView hand/reload methods, and KnifeView. The diagnostic copies the production camera composition formulas; it omits HUD, world scenery, scope overlay, blur and muzzle flash to expose joints. Sniper ADS shows the underlying geometry rather than covering it with the scope overlay. Per-frame raw native and corrected bone matrices and prop stages are saved in receipts.json.gz; metrics are in joint-metrics.csv.

## What changed and diagnosis

- Both grip targets, palm spacing, hand axes and elbow poles are measured from the new 65-bone native rig. Camera shoulder depth is derived from this rig's forearm length; it no longer uses the old forward shoulder anchor. Sprint pivot follows the measured firing grip.
- Wrist correction is clamped to 20° from the native wrist in its forearm frame, with unit coverage; measured deltas include normal float error. Forearm seating roll has a 60° correction budget. Reload fades palm orientation seating; IK remains for the firing grip and actual reload-prop contact. Native fingers remain blended rather than replaced (75% native on ordinary holds; 25% native while actively grasping a reload prop).
- MG, pistol and sniper use #943's real Magazine node: detach to the animated palm carrier, release/drop below frame, create a fresh magazine below frame, bring it up, interpolate seating and reparent to MagazineSocket. Shotgun uses three separately visible shells retrieved below frame and seated at the tube socket.
- The baseline's extreme wrist collapse came from procedural placement (up to about 149° local correction), not a weight-transfer pass: this mesh was rigged directly on Mixamo and has no transferred weights. This iteration preserves the original mesh, skin, native clips and finger tracks. Any remaining change between raw and corrected matrices is procedural; an abnormal shape already present in raw is a native clip/skinning issue. The original extracted open shoulder edges are visible in side diagnostics.
- Wrist-bend flags use the same knuckle/forearm proxy as the baseline: corrected ≥60° and at least 15° above native, or native ≥65°. Contact flags identify >10 mm residual at visible/seated contacts. Off-screen swap travel and off-screen reload retrieval residuals are recorded but not treated as contact defects. The auditor must judge actual glove, finger and shell/magazine contact from individual frames.

Build passed, pnpm format ran, lint passed (existing warnings), and all seven wrist/finger/reload-clock unit tests passed. This set is an iteration for audit, not a declaration that every clip passes.

## Frame index

| Weapon / clip | Frames per camera | FP | Side | Close side | Flags |
| --- | ---: | --- | --- | --- | ---: |
| machineGun/reload | 109 | [sheet](machineGun/reload/first-person-contact-sheet.png) | [sheet](machineGun/reload/side-contact-sheet.png) | [sheet](machineGun/reload/side-close-contact-sheet.png) | 1 |
| machineGun/ads | 128 | [sheet](machineGun/ads/first-person-contact-sheet.png) | [sheet](machineGun/ads/side-contact-sheet.png) | [sheet](machineGun/ads/side-close-contact-sheet.png) | 1 |
| machineGun/hip-idle | 64 | [sheet](machineGun/hip-idle/first-person-contact-sheet.png) | [sheet](machineGun/hip-idle/side-contact-sheet.png) | [sheet](machineGun/hip-idle/side-close-contact-sheet.png) | 43 |
| machineGun/running | 31 | [sheet](machineGun/running/first-person-contact-sheet.png) | [sheet](machineGun/running/side-contact-sheet.png) | [sheet](machineGun/running/side-close-contact-sheet.png) | 22 |
| machineGun/sprint | 62 | [sheet](machineGun/sprint/first-person-contact-sheet.png) | [sheet](machineGun/sprint/side-contact-sheet.png) | [sheet](machineGun/sprint/side-close-contact-sheet.png) | 6 |
| machineGun/knife | 55 | [sheet](machineGun/knife/first-person-contact-sheet.png) | [sheet](machineGun/knife/side-contact-sheet.png) | [sheet](machineGun/knife/side-close-contact-sheet.png) | 0 |
| machineGun/swap | 82 | [sheet](machineGun/swap/first-person-contact-sheet.png) | [sheet](machineGun/swap/side-contact-sheet.png) | [sheet](machineGun/swap/side-close-contact-sheet.png) | 0 |
| machineGun/firing | 36 | [sheet](machineGun/firing/first-person-contact-sheet.png) | [sheet](machineGun/firing/side-contact-sheet.png) | [sheet](machineGun/firing/side-close-contact-sheet.png) | 30 |
| machineGun/firing-ads | 36 | [sheet](machineGun/firing-ads/first-person-contact-sheet.png) | [sheet](machineGun/firing-ads/side-contact-sheet.png) | [sheet](machineGun/firing-ads/side-close-contact-sheet.png) | 0 |
| pistol/reload | 159 | [sheet](pistol/reload/first-person-contact-sheet.png) | [sheet](pistol/reload/side-contact-sheet.png) | [sheet](pistol/reload/side-close-contact-sheet.png) | 17 |
| pistol/ads | 82 | [sheet](pistol/ads/first-person-contact-sheet.png) | [sheet](pistol/ads/side-contact-sheet.png) | [sheet](pistol/ads/side-close-contact-sheet.png) | 2 |
| pistol/hip-idle | 41 | [sheet](pistol/hip-idle/first-person-contact-sheet.png) | [sheet](pistol/hip-idle/side-contact-sheet.png) | [sheet](pistol/hip-idle/side-close-contact-sheet.png) | 0 |
| pistol/running | 31 | [sheet](pistol/running/first-person-contact-sheet.png) | [sheet](pistol/running/side-contact-sheet.png) | [sheet](pistol/running/side-close-contact-sheet.png) | 0 |
| pistol/sprint | 62 | [sheet](pistol/sprint/first-person-contact-sheet.png) | [sheet](pistol/sprint/side-contact-sheet.png) | [sheet](pistol/sprint/side-close-contact-sheet.png) | 19 |
| pistol/knife | 55 | [sheet](pistol/knife/first-person-contact-sheet.png) | [sheet](pistol/knife/side-contact-sheet.png) | [sheet](pistol/knife/side-close-contact-sheet.png) | 0 |
| pistol/swap | 59 | [sheet](pistol/swap/first-person-contact-sheet.png) | [sheet](pistol/swap/side-contact-sheet.png) | [sheet](pistol/swap/side-close-contact-sheet.png) | 5 |
| pistol/firing | 36 | [sheet](pistol/firing/first-person-contact-sheet.png) | [sheet](pistol/firing/side-contact-sheet.png) | [sheet](pistol/firing/side-close-contact-sheet.png) | 0 |
| pistol/firing-ads | 36 | [sheet](pistol/firing-ads/first-person-contact-sheet.png) | [sheet](pistol/firing-ads/side-contact-sheet.png) | [sheet](pistol/firing-ads/side-close-contact-sheet.png) | 0 |
| shotgun/reload | 109 | [sheet](shotgun/reload/first-person-contact-sheet.png) | [sheet](shotgun/reload/side-contact-sheet.png) | [sheet](shotgun/reload/side-close-contact-sheet.png) | 9 |
| shotgun/ads | 128 | [sheet](shotgun/ads/first-person-contact-sheet.png) | [sheet](shotgun/ads/side-contact-sheet.png) | [sheet](shotgun/ads/side-close-contact-sheet.png) | 3 |
| shotgun/hip-idle | 64 | [sheet](shotgun/hip-idle/first-person-contact-sheet.png) | [sheet](shotgun/hip-idle/side-contact-sheet.png) | [sheet](shotgun/hip-idle/side-close-contact-sheet.png) | 64 |
| shotgun/running | 31 | [sheet](shotgun/running/first-person-contact-sheet.png) | [sheet](shotgun/running/side-contact-sheet.png) | [sheet](shotgun/running/side-close-contact-sheet.png) | 31 |
| shotgun/sprint | 62 | [sheet](shotgun/sprint/first-person-contact-sheet.png) | [sheet](shotgun/sprint/side-contact-sheet.png) | [sheet](shotgun/sprint/side-close-contact-sheet.png) | 41 |
| shotgun/knife | 55 | [sheet](shotgun/knife/first-person-contact-sheet.png) | [sheet](shotgun/knife/side-contact-sheet.png) | [sheet](shotgun/knife/side-close-contact-sheet.png) | 0 |
| shotgun/swap | 82 | [sheet](shotgun/swap/first-person-contact-sheet.png) | [sheet](shotgun/swap/side-contact-sheet.png) | [sheet](shotgun/swap/side-close-contact-sheet.png) | 0 |
| shotgun/firing | 36 | [sheet](shotgun/firing/first-person-contact-sheet.png) | [sheet](shotgun/firing/side-contact-sheet.png) | [sheet](shotgun/firing/side-close-contact-sheet.png) | 27 |
| shotgun/firing-ads | 36 | [sheet](shotgun/firing-ads/first-person-contact-sheet.png) | [sheet](shotgun/firing-ads/side-contact-sheet.png) | [sheet](shotgun/firing-ads/side-close-contact-sheet.png) | 0 |
| sniperRifle/reload | 109 | [sheet](sniperRifle/reload/first-person-contact-sheet.png) | [sheet](sniperRifle/reload/side-contact-sheet.png) | [sheet](sniperRifle/reload/side-close-contact-sheet.png) | 0 |
| sniperRifle/ads | 128 | [sheet](sniperRifle/ads/first-person-contact-sheet.png) | [sheet](sniperRifle/ads/side-contact-sheet.png) | [sheet](sniperRifle/ads/side-close-contact-sheet.png) | 1 |
| sniperRifle/hip-idle | 64 | [sheet](sniperRifle/hip-idle/first-person-contact-sheet.png) | [sheet](sniperRifle/hip-idle/side-contact-sheet.png) | [sheet](sniperRifle/hip-idle/side-close-contact-sheet.png) | 64 |
| sniperRifle/running | 31 | [sheet](sniperRifle/running/first-person-contact-sheet.png) | [sheet](sniperRifle/running/side-contact-sheet.png) | [sheet](sniperRifle/running/side-close-contact-sheet.png) | 24 |
| sniperRifle/sprint | 62 | [sheet](sniperRifle/sprint/first-person-contact-sheet.png) | [sheet](sniperRifle/sprint/side-contact-sheet.png) | [sheet](sniperRifle/sprint/side-close-contact-sheet.png) | 7 |
| sniperRifle/knife | 55 | [sheet](sniperRifle/knife/first-person-contact-sheet.png) | [sheet](sniperRifle/knife/side-contact-sheet.png) | [sheet](sniperRifle/knife/side-close-contact-sheet.png) | 0 |
| sniperRifle/swap | 82 | [sheet](sniperRifle/swap/first-person-contact-sheet.png) | [sheet](sniperRifle/swap/side-contact-sheet.png) | [sheet](sniperRifle/swap/side-close-contact-sheet.png) | 0 |
| sniperRifle/firing | 36 | [sheet](sniperRifle/firing/first-person-contact-sheet.png) | [sheet](sniperRifle/firing/side-contact-sheet.png) | [sheet](sniperRifle/firing/side-close-contact-sheet.png) | 0 |
| sniperRifle/firing-ads | 36 | [sheet](sniperRifle/firing-ads/first-person-contact-sheet.png) | [sheet](sniperRifle/firing-ads/side-contact-sheet.png) | [sheet](sniperRifle/firing-ads/side-close-contact-sheet.png) | 0 |
