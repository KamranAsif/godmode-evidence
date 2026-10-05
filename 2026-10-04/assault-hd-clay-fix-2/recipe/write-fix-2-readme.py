from pathlib import Path
import json
base=Path('artifacts/arm-fix');target=base/'evidence/2026-10-04/assault-hd-clay-fix-2'
s=json.loads((target/'sampling.json').read_text());p=json.loads((target/'problem-frames.json').read_text())
count=sum(len(v['times'])*3 for v in s.values())
table=['| Weapon / clip | Frames per camera | FP | Side | Close side | Review flags |','| --- | ---: | --- | --- | --- | ---: |']
for key,v in s.items():table.append(f"| {key} | {len(v['times'])} | [sheet]({key}/first-person-contact-sheet.png) | [sheet]({key}/side-contact-sheet.png) | [sheet]({key}/side-close-contact-sheet.png) | {len(p[key]['flagged'])} |")
text=f'''# Assault HD clay fix 2 — awaiting independent vision audit

{count:,} individual uncropped 1920×1080 PNG originals, 132 contact sheets, 44 clip/camera groups: 36 core weapon clips, four tablet phases, and four supplementary rope-contact clips. Nothing here is a visual PASS. Game PR #936 has not been updated with the fixes.

Core source: `4b3961ad5`, including cuff asset/pipeline repair `db7adb01e`. Added tablet source: `1da8fcea2`. [recipe/core](recipe/core) and [recipe/added](recipe/added) preserve the exact production sources and diagnostic versions. ADS was recaptured with production's held-idle freeze at source time zero; its diagnostic is in the added recipe. All other core frames use the core recipe.

[sampling.json](sampling.json) records every sampled time, native input key and transition boundary. [frames-manifest.json](frames-manifest.json) records every original SHA-256. [receipts.json.gz](receipts.json.gz) contains native/corrected joint matrices, prop phases and contact residuals. [joint-metrics.csv](joint-metrics.csv) and [problem-frames.json](problem-frames.json) provide numbered review leads. Red contact-sheet borders identify flags; originals remain unmarked. Measurement flags and unflagged samples require independent visual inspection.

## Rendering and coverage

Uniform grey, no textures/normal maps, roughness 0.8, key light −35°/−35° with energy 1.3, ambient 0.28. Native Windows Godot GPU rendering through godot-cli, windowed and off-screen. FP uses the production viewmodel FOV 50° and near plane 0.005 m. Side camera is (−1.9, 0.12, −0.45), looking at (0, −0.25, −0.45), FOV 45°. Close side is (−1.05, −0.08, −0.4), looking at (0, −0.28, −0.4), FOV 45°; tablet close-side switches to +1.05 X to expose the tapping right index. No original is cropped.

Core clips include every native animation input key plus 60 Hz procedural samples and transition boundaries. Reload, ADS entry/hold, hip-idle, running, sprint entry, knife, swap, firing and firing-ADS are sampled for machine gun, pistol, shotgun and sniper. Native keys are mapped to production action durations. Running/sprint use FirstPersonWalk as the game does. Native shot and idle samples are driven through production WeaponView, first_person_pose, and KnifeView; the diagnostic composes camera carry, recoil, ADS and sway using their production formulas. Held ADS freezes native idle at zero. HUD, world, scope overlay, blur and muzzle flash are omitted to expose geometry; sniper ADS therefore reveals the underlying arms and gun.

Tablet phases sample 60 Hz plus raise/hold/tap/recovery/lower boundaries through production StreakTablet and HeldObjectArms. The real approved tablet mesh and its glass contact plane are present. The UI is grey with the rest of the clay, so LAUNCH lettering is hidden: its actual target is UI pixel centre (280,236) in a 560×372 screen, tablet local (0,−0.01667,0.0014). The index pad is aimed at that plane; fingertip-bone offset and native blend are recorded as tapResidual. Lower starts from the pose at 1.7 s and continues for 0.38 s, without resetting to fully raised.

**Rappel coverage limitation:** these four clips are close contact diagnostics through the production hand helper, with the actual returned fist-cylinder centre and 1.2 mm FP rope radius, while each primary weapon fires at its production cadence. They include every native firing key reached between shot restarts, 60 Hz samples and shot boundaries over three seconds. They do not include Lane D's helicopter or full descent path. Lane D owns the actual insertion scene and its separately published descent frames; that actual scene still must pass the same auditor. This supplementary set cannot certify complete rappel descent by itself.

## Diagnosis and changes

- **Reload:** the raw native glove/cuff already exposed an opening under pronation. This body was rigged directly on Mixamo; there was no weight transfer. Two closed skinned cloth overlaps now bridge the original glove/cuff boundary while retaining native bone lengths, weights, original vertices, UVs, textures and 174 clips. Added geometry is 580 vertices / 1,152 triangles, reproducible by the HD-only build step. Lit creases remain, and the auditor must distinguish those from an opening in every frame.
- **Reload contact:** old/fresh magazine visibility was present in fix-1, but grasp timing, external-wall contact and recovery failed. Grasp now closes before detach/spawn, opens before release, opposes the thumb on the external magazine wall, and blends back to the ordinary weapon support grip. The #943 Magazine node detaches, leaves view, is replaced off-screen and seats back into MagazineSocket. Shotgun shows three separate shells moving to the tube. Native hand articulation is retained while procedural seating fades during the two-handed motion. Late reload blends the native upper body toward idle over its final 12%.
- **Hip-idle, ADS, running and sprint:** fix-1 support fingers stayed straight beneath rifle handguards; radius-based MCP/PIP/DIP curl now uses the actual foreend cross-section. Rifle thumb direction follows the gun exterior. Forearm roll is reapplied after every palm-refinement solve; the elbow plane now derives from the desired hand frame and native wrist/forearm articulation, rather than switching to an unrelated plane. Pistol cup contact still needs particular inspection: the fix-2 pistol sprint frame 0031 has an upright thumb without receiver-side contact, marked as a procedural target defect. Inspect all reported fix-1 pad penetration and roll-pop windows using source time, since frame indices changed with 60 Hz sampling.
- **ADS visibility:** HD keeps the complete closed weapon geometry and computes eye relief from its actual rear overhang, replacing the clipped rear variant. The transition and final sight framing need visual audit.
- **Knife:** the blade moves farther outboard and the primary stays dipped longer/down/away through recovery to address the reported rifle sleeve/receiver and pistol rear-slide crossings. Every transition remains in the set; clearance requires both camera views, not side silhouette overlap alone.
- **Swap and firing:** the same native-derived elbow plane and repeated forearm roll solve apply across draw and recoil. Numerical continuity flags identify large consecutive corrected rotations beyond the native change; the auditor must check palm, thumb and sleeve continuity directly.
- **Tablet:** both five-finger hands seat on the side bezels, thumbs oppose the front edge, and the right index reaches the real LAUNCH plane. Native T-pose articulation is blended with the grip/tap. Raise includes a two-handed hold before reach; lower retains its actual current pose and clock.
- **Rope:** the off hand closes around the returned cylinder contact frame with native finger blending while the firing arm uses the normal primary solve. Lane D has integrated the cuff meshes and `4b3961ad5` hand solver and moved brace release before the normal support solve. Its complete descent remains a separate required audit.

Wrist correction is capped at 20° relative to the current native wrist; forearm roll has a 60° budget. Metrics distinguish the original reload-clip delta from the current native wrist after the intentional late idle blend. The clamp has unit coverage. Passing metrics do not establish visual PASS.

Validation: TypeScript build passes; pnpm format ran; lint has zero errors (existing warnings); eight wrist/finger/reload unit tests pass. Fresh-worktree project import passed. Arena prebuild and full-game smoke status are recorded separately when complete. The rendered diagnostic loaded and produced the saved batches without script errors.

## Frame index

'''+ '\n'.join(table)+'\n'
(target/'README.md').write_text(text,encoding='utf-8');(target/'ENGINE-NOTES.md').write_text(text,encoding='utf-8')
print(count)
