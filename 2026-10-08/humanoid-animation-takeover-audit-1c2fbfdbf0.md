# Third-person humanoid animation takeover — 2026-10-08

Rechecked against `origin/main` through `b3a1ae69da6593017fe51b43e9892a9db79293ba` (#1399). Scope is the 28 native humanoid bodies, including ten stream-sniper operators. First-person arms and poses are excluded. [Original ranked audit and implementation history](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-08/humanoid-anim-audit-1674acb18a.md).

## Rank 16 completed: native wall palm

Game [#1397](https://github.com/KamranAsif/Godmode.exe-roguelite/pull/1397), merged `017967348417e50888b774e5a0391b548bbe8bd6`, adds the saved-Breach **Pushing A Heavy Object** capture (motion 118350902, 81 frames, 30 FPS) as `GroundCoverPalmIdle` on all 28 body catalogs. Raw source and exact export receipt are merged in art-source [#19](https://github.com/KamranAsif/Godmode.exe-art-source/pull/19), `5535483c1716b0d01277a18d4ed2fe98beb45c6c`. The earlier rear-facing cover-palm trial is retained as a rejected source.

Actual cover idle must also have a real nearby level face within 18 cm of the native palm, opposing its normal within 37°. The left arm/fingers retain the native capture's model-space bearing across different torso orientations. Bounded contact fitting places the palm 5 mm off the face, preserves limb lengths, refreshes contact every 100 ms and blends entry over 150 ms. Settled world-space error above 15 mm or normal error above 0.01 rad releases the layer. Peeking, firing, movement and lost contact release the hand. The torso, feet, firing hand and weapon keep their existing presentation; first-person assets and pose consumers were not changed.

- CPU comparison retained native geometry, joints, skin, bind frames, materials/images and all 7,940 preceding animations.
- All 28 imported native-arm comparisons passed five phases each; maximum rotation difference was 0.056°, with other bones and lengths retained within the fixture tolerances.
- Twenty-two live hide/peek/release samples passed across a rifle enemy, an operator and an empty-goal control. Maximum settled contact error was 4.59 mm; maximum normal error was 0.000019°.
- Project import completed. Headless survival loaded nine enemies and ready DUMBO navigation without script errors; the existing shared debugger-port diagnostic remained.
- Final rebased candidate `86acafc4a25d3db62119393b70ab5b80c7724843` passed full `pnpm test`, 12/12, in 50.2 s before merge. Formatting, build, lint and focused pure contact tests passed.
- Combined current main `b3a1ae69da6593017fe51b43e9892a9db79293ba` also passed full `pnpm test`, 12/12, in 86.7 s after merge.
- [Nine-second cheap-profile motion review](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-08/native-wall-palm-final-fe0727a412.mp4): 270 frames, 8,984 ms capture, 640×360, maximum capture gap 51 ms.

## Remaining gaps rechecked worst first

| Rank | Gap | Current evidence and required prerequisite |
| --- | --- | --- |
| 7 | Crouched backward start; sprint stops, backward/lateral starts and diagonal edges | Rechecked every page for sprint (207 results), crouch (175), stop (268), start (70) and rifle (229). No dedicated matching transitions were found beyond the captures already wired. Loops, turns, slides, rolls, prone transitions and standing-run edges do not supply those missing edges. The backward “Crouch To Run Backwards” trial rises into standing run, so it does not supply a crouched-walk start. “Crouched To Sprinting” begins with hands on the ground, unlike the game's armed crouch; no default-character preview was imported. |
| 7 | Enemy crouched locomotion | SoldierRuntime and SystemAdminSnapshot publish no enemy crouch action. The crouching facts in `soldier_ai.ts` describe the player target. A real enemy posture/collider action is needed before choosing crouched enemy clips. Player/bot native crouch presentation is already wired. |
| 10 | Dedicated sniper/LMG handling | Exact sniper, sniper-rifle, machine-gun and machinegun queries returned no products. “lmg” returned 78 unrelated fuzzy matches, with no matching weapon capture; all 229 rifle results were also checked. These families retain the existing rifle motion. Native shotgun handling is already wired. |
| 14 | Enemy moving reload | SoldierRuntime has burst/round timing but no magazine, ammunition or reload action/clock. SystemAdminSnapshot has no reload state. A real enemy reload action is needed; player/bot moving reload already follows actual reload state. |
| 15 | Player headshot death | Enemy `fireRound` samples pellet hit probability and applies `environmentDamage`; it does not report geometric head contact. That event's contact kind is body/blast. A real head-hit classifier is needed before selecting player headshot deaths. Actual directional and blast player falls are wired; enemy/operator headshot deaths already use real hit regions. #1398 preserves real effective-headshot feedback but does not add enemy-to-player head classification. |
| 18 | Ladder entry, loop and exit | Five real ladder products exist. However, `dumboSurvivalNavMap()` calls `NavMap.fromBakedMesh()`, which creates the map without authored traversal links. `links` remains empty and `placeLinks()` is never called. The generic Navigator ladder carry cases cannot be reached by the current survival map. Player movement has no ladder action. Authoritative traversal snapshots expose only confirmed mantle/vault. Real ladder routes, usable geometry/contact and authoritative climb phases are needed before ladder clips can be driven honestly. |

These remaining items are not implemented by aliasing other actions or inventing presentation timers. Expanding enemy posture/ammunition, outgoing hit geometry or map traversal is gameplay work beyond this animation-only pass.

The dedicated Mixamo profile was signed out by the final recheck: Download displayed “Please sign in to download” and used the default character. Catalog paging still worked. New native exports need the saved-rig session restored; no default-character clip was submitted to the body builder.

## Cleanup

Both merged game/source worktrees were removed, and the owned Godot session ended. The dead lane's original uncommitted worktree and its live instance were left intact. An earlier failed full art-source checkout at `D:\work\godmode-roguelite-worktrees\humanoid-palm-source-20261008` remains unregistered: automatic approval review rejected the checked PowerShell deletion with “blocked by policy.”
