# Third-person humanoid animation: signed-in continuation

2026-10-08. Builds on the [original ranked audit](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-08/humanoid-anim-audit-1674acb18a.md) and [takeover audit](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-08/humanoid-animation-takeover-audit-1c2fbfdbf0.md). First-person arms and poses were excluded throughout.

## New completed gap

[Game #1417](https://github.com/KamranAsif/Godmode.exe-roguelite/pull/1417), merged `d15de185da01e32b5aca9f871ec9e4727bf6e73c`, adds forward sprint braking to all 28 humanoid bodies. Signed-in saved-Breach Mixamo `Run To Stop`, described as `Fast Stop From Full Run`, supplies a complete 28-frame native capture. This corrects the earlier audit's blanket claim that no usable forward sprint stop was available.

The actual source opens at approximately 2.60 m/s and lasts 900 ms. Playing its complete span in 450 ms gives approximately 5.21 m/s at the opening, near the game's sprint threshold. This is transparently retimed fast-run braking, not a claim that Mixamo supplied a native 6 m/s sprint-stop capture. Body presentation removes horizontal root travel while retaining hip sway/compression and leg motion. Armed/unarmed upper poses remain. One clock survives repeated idle samples; crouch, resumed movement and direction changes cancel it. Unsupported directions stay neutral.

[Raw source #20](https://github.com/KamranAsif/Godmode.exe-art-source/pull/20), merged `8f1c22127005e6aacef60391167888e521293703`, retains source commit `206ac0aef8689e39f8af289deb3dd626c6c4a747`. FBX SHA-256 `d77739158d55576efc6c0157c7d20be42a220e7d395582dcdeb6e5e27ccbe455`; 354,368 bytes; FBX Binary, Without Skin, 30 FPS, no key reduction, complete trim, no mirror. Saved Breach rig bone lengths agree within 0.6 micrometers. The exact export request and receipt are committed privately; the compact game provenance and raw-art index both include it.

Validation:

- Final candidate `da8b909c1494a2606d95f130be700587fb5541c3`: full `pnpm test` passed 12/12 in 38.9 seconds immediately before merges. An earlier run caught a missing raw-art-index entry; that entry was fixed and all 25 asset tests passed before the final suite.
- Eleven focused transition tests passed. CPU comparison retained geometry, joints, skin/bind data, materials/images and all 7,968 existing clips across 28 bodies.
- All 28 imported native catalogs and 280 layer comparisons passed; maximum upper-body local rotation difference was 0.056 degrees.
- Project import completed; headless survival reached 14 enemies with ready DUMBO navigation and no JavaScript errors. Existing renderer/inspection-metadata diagnostics remained.
- [Nine-second cheap-profile video](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-08/native-forward-sprint-brake-final-1f5b603d7f.mp4): 640x360, 270 frames, 8,991 ms capture. Source/game PRs share this one capture.

## Remaining gaps, worst first

| Rank | Gap | Current evidence / prerequisite |
| --- | --- | --- |
| 7 | Crouched backward start; backward/lateral sprint edges and diagonal starts/stops | Authenticated catalog rechecked all pages: sprint 207, start 70, stop 268, crouch 175, rifle 229. No further matching transitions found. Loops, rolls, turns and prone transitions do not supply these edges. `Crouch To Run Backwards` rises into standing run; `Crouched To Sprinting` starts with hands on the ground. Neither supplies an armed crouched-walk start. The newly reviewed forward fast-stop source is now wired. |
| 7 | Enemy crouched locomotion | Current enemy runtime/snapshot has no actual enemy crouch posture or collider action. The AI crouching facts refer to the player target. Player/bot crouch presentation already follows real posture. |
| 10 | Dedicated sniper/LMG handling | Exact sniper, sniper-rifle, machine-gun and machinegun searches returned zero products. `lmg` returned 78 unrelated fuzzy matches, without a matching weapon capture; rifle results were also checked. Existing rifle-family motion remains. Native shotgun handling is already wired. |
| 14 | Enemy moving reload | Enemy runtime/snapshot has no magazine/ammunition/reload action or clock. Player/bot moving reload already follows actual state. A real enemy reload action is required. |
| 15 | Player headshot death | Enemy fire applies probabilistic pellet/body/blast damage without geometric head contact. Player headshot classification must exist before selecting those falls. Actual directional/blast player falls and enemy/operator headshot deaths are wired. |
| 18 | Ladder entry/loop/exit | Five ladder products exist, but survival navigation uses the baked map without authored traversal links; its links remain empty. Player movement has no ladder action. Existing authoritative traversal covers confirmed mantle/vault. Reachable ladder routes, usable geometry/contact and authoritative climb phases are prerequisites. |

No additional suitable native clip was found for the remaining presentation-only gaps. Enemy posture/ammunition, outgoing hit geometry and ladder traversal require gameplay work beyond this animation-polish scope. Do not alias an unrelated capture or invent an action clock to conceal those prerequisites.

## Machine/account state

Mixamo was verified signed in as Kamran on the shared `D:/work/.godmode-profiles/mixamo` profile, using the actual saved Breach rig. The browser remains open, signed in. Temporary authenticated catalog headers were cleared from tool memory and never written to source or evidence. All owned Godot runs were stopped and the owned session ended. The dead lane's original worktree and live palm prototype were left intact. Worktree removal is performed after this handoff upload.
