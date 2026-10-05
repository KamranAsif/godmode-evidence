# Assault HD clay fix 1 - independent vision audit: FAIL

Auditor: vision lane %108. Immutable originals: evidence `01c8a346504a47b20bd599eeaf863948f3f07a19`; production recipe `a3f22f143a0aa864c83c41be6589118a989457fc`.

All 7,110 individual originals were opened and visually reviewed in consecutive frame order: 2,370 samples across 36 weapon clips, each in first-person, uncropped side and side-close. Contact sheets and metric flags did not replace individual-frame inspection.

**35 clips FAIL; pistol hip-idle PASS. No set sign-off or source/PR push clearance.** These verdicts apply only to fix-1 and remain separate from later candidates. Tablet and supplementary rope clips are absent from this set; tablet, actual rappel descent, van return and parachute return remain required for final sign-off.

Frame ranges below are inclusive and refer to `frame-NNNN.png` in the named clip camera folder. A single listed pop frame is the destination of the transition from its preceding frame. Left/right refer to the character. Wrist refers to Hand/LowerArm articulation; elbow plane involves LowerArm/UpperArm; MCP/PIP/DIP are finger joints and CMC/MCP are thumb joints.

Native extracted shoulder cut edges visible only in side diagnostics were not treated as first-person shoulder defects. Occluded trigger fingers and ambiguous projected overlaps were not assigned unproven penetration defects. PASS means no confirmed defect in the supplied clip; it does not certify an unrecorded transition.

## Per-clip verdicts

| Clip | Frames per camera reviewed | Verdict |
| --- | ---: | --- |
| [machineGun/reload](machineGun/reload/first-person/frame-0000.png) | 109 | **FAIL** |
| [machineGun/ads](machineGun/ads/first-person/frame-0000.png) | 128 | **FAIL** |
| [machineGun/hip-idle](machineGun/hip-idle/first-person/frame-0000.png) | 64 | **FAIL** |
| [machineGun/running](machineGun/running/first-person/frame-0000.png) | 31 | **FAIL** |
| [machineGun/sprint](machineGun/sprint/first-person/frame-0000.png) | 62 | **FAIL** |
| [machineGun/knife](machineGun/knife/first-person/frame-0000.png) | 55 | **FAIL** |
| [machineGun/swap](machineGun/swap/first-person/frame-0000.png) | 82 | **FAIL** |
| [machineGun/firing](machineGun/firing/first-person/frame-0000.png) | 36 | **FAIL** |
| [machineGun/firing-ads](machineGun/firing-ads/first-person/frame-0000.png) | 36 | **FAIL** |
| [pistol/reload](pistol/reload/first-person/frame-0000.png) | 159 | **FAIL** |
| [pistol/ads](pistol/ads/first-person/frame-0000.png) | 82 | **FAIL** |
| [pistol/hip-idle](pistol/hip-idle/first-person/frame-0000.png) | 41 | **PASS** |
| [pistol/running](pistol/running/first-person/frame-0000.png) | 31 | **FAIL** |
| [pistol/sprint](pistol/sprint/first-person/frame-0000.png) | 62 | **FAIL** |
| [pistol/knife](pistol/knife/first-person/frame-0000.png) | 55 | **FAIL** |
| [pistol/swap](pistol/swap/first-person/frame-0000.png) | 59 | **FAIL** |
| [pistol/firing](pistol/firing/first-person/frame-0000.png) | 36 | **FAIL** |
| [pistol/firing-ads](pistol/firing-ads/first-person/frame-0000.png) | 36 | **FAIL** |
| [shotgun/reload](shotgun/reload/first-person/frame-0000.png) | 109 | **FAIL** |
| [shotgun/ads](shotgun/ads/first-person/frame-0000.png) | 128 | **FAIL** |
| [shotgun/hip-idle](shotgun/hip-idle/first-person/frame-0000.png) | 64 | **FAIL** |
| [shotgun/running](shotgun/running/first-person/frame-0000.png) | 31 | **FAIL** |
| [shotgun/sprint](shotgun/sprint/first-person/frame-0000.png) | 62 | **FAIL** |
| [shotgun/knife](shotgun/knife/first-person/frame-0000.png) | 55 | **FAIL** |
| [shotgun/swap](shotgun/swap/first-person/frame-0000.png) | 82 | **FAIL** |
| [shotgun/firing](shotgun/firing/first-person/frame-0000.png) | 36 | **FAIL** |
| [shotgun/firing-ads](shotgun/firing-ads/first-person/frame-0000.png) | 36 | **FAIL** |
| [sniperRifle/reload](sniperRifle/reload/first-person/frame-0000.png) | 109 | **FAIL** |
| [sniperRifle/ads](sniperRifle/ads/first-person/frame-0000.png) | 128 | **FAIL** |
| [sniperRifle/hip-idle](sniperRifle/hip-idle/first-person/frame-0000.png) | 64 | **FAIL** |
| [sniperRifle/running](sniperRifle/running/first-person/frame-0000.png) | 31 | **FAIL** |
| [sniperRifle/sprint](sniperRifle/sprint/first-person/frame-0000.png) | 62 | **FAIL** |
| [sniperRifle/knife](sniperRifle/knife/first-person/frame-0000.png) | 55 | **FAIL** |
| [sniperRifle/swap](sniperRifle/swap/first-person/frame-0000.png) | 82 | **FAIL** |
| [sniperRifle/firing](sniperRifle/firing/first-person/frame-0000.png) | 36 | **FAIL** |
| [sniperRifle/firing-ads](sniperRifle/firing-ads/first-person/frame-0000.png) | 36 | **FAIL** |

## Reload requirement

MG, pistol and sniper show old-magazine withdrawal out of the first-person view, off-screen retrieval and a fresh magazine entering for seating. They still FAIL: hands do not maintain an external opposed grasp, release crosses fingers or leaves a prop perched on an open palm, and recovery ends away from the support grip. The exact contact and continuity failures are listed below. Shotgun shows shell retrieval/tube insertion but FAILS exterior shell pinch, wrist continuity and support recovery.

## Exact defects and fix directions

### machineGun/reload: FAIL

| Exact frames (inclusive) | Joint / contact | Defect | Direction to fix |
| --- | --- | --- | --- |
| 0000-0009 | LeftHand / LeftLowerArm seam | Open triangular tear/cavity at palm heel into cuff, visible FP and side-close; cuff-to-palm silhouette is not continuous. | Restore wrist seam and prevent wrist/forearm roll pulling palm heel apart; distribute roll along forearm and keep glove/cuff overlapping. |
| 0006-0020 | LeftHand fingers / detached old Magazine | Detached magazine travels with an open palm; fingers do not wrap its sides, so removal reads as floating prop rather than a grasp. | Close thumb and opposing fingers around magazine before detaching; hold those contacts through withdrawal, then open only at release. |
| 0020 | LeftHand fingers / old Magazine | A finger is visibly inside the magazine's open end and crosses its end rim instead of wrapping its outer wall. | Move carrier away from finger pad and fit per-finger curl around external magazine cross-section; no finger may enter magazine interior. |
| 0021-0022 | LeftHand / LeftLowerArm | At 0020->0021 support hand rolls abruptly from palm up to palm down, with a major elbow-plane change and magazine rotation; thumb reaches across trigger guard/firing fingers. | Blend the grasp-to-drop wrist/carrier orientation continuously and keep off-hand thumb outside trigger guard, carrying magazine down away from firing hand. |
| 0028, 0033 | LeftHand / LeftLowerArm / magazine carrier | Support palm and carrier flip at 0027->0028 (palm down to palm facing camera) and magazine rotates abruptly at 0032->0033; visible side/side-close even though below FP frame. | Interpolate drop orientation across several samples, release prop continuously into its own trajectory; avoid step changes in wrist/forearm pole. |
| 0028-0032 | LeftHand fingers / old Magazine | Open fingers with old magazine still hanging against the palm, not held or freely falling. | Release magazine when hand opens; move it independently downward immediately rather than keeping it on the palm. |
| 0048 | LeftHand/LeftLowerArm | 47 to 48 support palm abruptly rolls toward camera below FP; discontinuity in reaching-down phase. | Spread palm rotation over adjacent samples; preserve continuous forearm orientation. |
| 0054, 0078 | LeftHand/LeftLowerArm/fresh-magazine carrier | Abrupt support-palm roll at 53->54 below FP and 77->78 in FP; fresh magazine changes orientation with the hand in one sample. | Blend wrist/forearm/carrier orientation continuously while maintaining a closed grasp. |
| 0051-0090 | LeftHand thumb and fingers/fresh magazine | Fresh magazine floats against open palm through seating (51-90). Fingers do not wrap opposing walls; 80-88 thumb intersects open magazine end. | Establish opposing thumb/finger grip offscreen before spawn, maintain external wall contact through insertion, and keep thumb out of magazine interior. |
| 0082-0108 | LeftHand / LeftLowerArm seam | Palm heel tears open above cuff, widening into a large hollow circular palm/wrist cavity at 94-98. Visible in FP through end. | Close palm/wrist topology and maintain cuff overlap throughout pronation; correct skin weights so wrist roll cannot open the glove mesh. |
| 0094 | LeftHand / LeftLowerArm / LeftUpperArm | 93->94 abrupt hand pronation, finger closure and elbow-plane change during seated-magazine phase. | Blend orientation and finger curl over adjacent frames with stable elbow pole; grasp must be established before insertion. |
| 0098-0108 | LeftHand / support arm | After releasing seated magazine, support hand stays open below it through final frame 108, never returns to handguard. | Author smooth recovery to the hip-idle handguard grip before reload completion; preserve end-to-idle continuity. |

### machineGun/ads: FAIL

| Exact frames (inclusive) | Joint / contact | Defect | Direction to fix |
| --- | --- | --- | --- |
| 0000-0127 | LeftHand MCP/PIP/DIP and thumb / handguard | Support palm remains flat with straight fingers meeting handguard underside; no opposing external-wall wrap throughout ADS raise and hold. | Curl finger joints around external handguard and oppose thumb while retaining palm contact and wrist alignment. |
| 0004-0008 | Camera / weapon rear geometry (presentation) | FP ADS raise exposes large hollow clipped rear weapon geometry over right-hand region, obscuring contact inspection. Side views remove rear stock from frame 4. | Correct production ADS near-camera weapon visibility/geometry so first-person view shows continuous intended weapon surface and inspectable hand silhouette. |

### machineGun/hip-idle: FAIL

| Exact frames (inclusive) | Joint / contact | Defect | Direction to fix |
| --- | --- | --- | --- |
| 0000-0063 | LeftHand finger joints / handguard | Support palm lies flat underneath handguard with fingers straight up into its underside instead of curling around its outer section; no opposing thumb/finger wrap in side-close. | Fit palm to underside and curl MCP/PIP/DIP joints around external handguard with opposing thumb contact; retain clean wrist alignment. |

### machineGun/running: FAIL

| Exact frames (inclusive) | Joint / contact | Defect | Direction to fix |
| --- | --- | --- | --- |
| 0000-0030 | LeftHand MCP/PIP/DIP and thumb / handguard | Support hand stays palm-flat with straight fingers terminating in handguard underside and thumb sticking out; no opposing fingers/thumb wrap. | Curl fingers around the external handguard section and oppose thumb, preserving palm seating and clean wrist/forearm alignment throughout the run. |

### machineGun/sprint: FAIL

| Exact frames (inclusive) | Joint / contact | Defect | Direction to fix |
| --- | --- | --- | --- |
| 0000-0061 | LeftHand MCP/PIP/DIP and thumb / handguard | Palm-flat support grip with straight fingers terminating in underside of handguard and no opposing thumb wrap. | Curl fingers round the outside of the handguard and oppose thumb while preserving seated palm and wrist alignment. |

### machineGun/knife: FAIL

| Exact frames (inclusive) | Joint / contact | Defect | Direction to fix |
| --- | --- | --- | --- |
| 0000-0054 | LeftHand MCP/PIP/DIP and thumb / handguard | Support palm stays flat with straight fingers entering handguard underside and no opposing thumb wrap. | Curl fingers round external handguard and oppose thumb, preserving seated palm and clean wrist alignment. |
| 0008-0014 | Knife arm / blade path versus primary RightLowerArm and stock | Rising blade crosses the primary firing-arm sleeve/stock silhouette in side and side-close; blade tip appears above sleeve while knife hand remains below. This is a clearance concern; side projection alone does not prove depth penetration. | Route knife reach/blade arc outboard of primary arms and stock, with visible clearance in both views while primary is lowered; preserve a continuous path. |
| 0038-0039 | Knife RightLowerArm / sleeve versus primary rear sight and receiver | Recovery brings knife forearm into primary rear receiver/sight; rear-sight geometry appears through the knife sleeve in FP at 39 and side-close at 38. | Lower or move primary farther away before recovering knife arm; route the knife forearm outboard until it clears rear sight and receiver. |

### machineGun/swap: FAIL

| Exact frames (inclusive) | Joint / contact | Defect | Direction to fix |
| --- | --- | --- | --- |
| 0006-0081 | LeftHand MCP/PIP/DIP and thumb / handguard | After approaching the weapon, support hand settles into palm-flat grip with straight fingers meeting handguard underside and no opposing thumb wrap. | Curl fingers around exterior handguard and oppose thumb before the weapon enters FP view; preserve continuous wrist and elbow motion. |

### machineGun/firing: FAIL

| Exact frames (inclusive) | Joint / contact | Defect | Direction to fix |
| --- | --- | --- | --- |
| 0000-0035 | LeftHand MCP/PIP/DIP and thumb / handguard | Support fingers remain straight into handguard underside with flat palm and no opposing thumb wrap. | Curl fingers around external walls and oppose thumb while maintaining seated palm. |
| 0000-0035 | LeftHand / LeftLowerArm wrist seam | Open hole at palm heel above sleeve cuff, clearly visible as a hollow cavity in FP during recoil. | Close wrist seam and preserve cuff overlap; distribute roll along forearm and correct weights to prevent opening during recoil. |

### machineGun/firing-ads: FAIL

| Exact frames (inclusive) | Joint / contact | Defect | Direction to fix |
| --- | --- | --- | --- |
| 0000-0035 | LeftHand MCP/PIP/DIP and thumb / handguard | Support hand remains palm-flat with straight fingers meeting handguard underside and no opposing thumb wrap. | Curl fingers around external handguard walls and oppose thumb while preserving seated palm and continuous wrist/elbow motion. |

### pistol/reload: FAIL

| Exact frames (inclusive) | Joint / contact | Defect | Direction to fix |
| --- | --- | --- | --- |
| 0020-0029 | LeftHand index MCP/PIP/DIP / trigger guard | Support index crosses the trigger-guard rim while the hand reaches past the magazine toward the receiver. Clear side-close intersection at 20-29. | Lower the support-hand target toward magazine base; keep index outside trigger guard and curl fingers round magazine exterior. |
| 0020-0029 | LeftHand thumb/web / rear receiver | Rear receiver/sight geometry cuts visibly through support thumb/web in FP during high reach (20-29). | Move palm and thumb outward/down clear of receiver; fit grasp to magazine instead of slide. |
| 0031-0054 | LeftHand thumb/fingers / detached old magazine | Magazine withdraws alongside loose fingers and upright unopposed thumb, without a closed external-wall grasp. | Close opposing thumb and fingers round magazine before detaching, keep contact through withdrawal, open only for release. |
| 0040, 0051 | LeftHand / LeftLowerArm / elbow plane | 39->40 changes support palm from camera-facing to palm-up abruptly; 50->51 then rolls palm down abruptly with major elbow-plane change, below FP during old-magazine carry. | Blend forearm roll and elbow pole across adjacent samples while keeping magazine orientation continuous. |
| 0058-0061 | LeftHand index/middle fingers / old magazine | Magazine drops through curled fingertips while hand stays closed; fingertips enter magazine interior instead of opening to release. | Open the fingers before release and offset magazine below/outside pads so its downward path never passes through the closed fist. |
| 0074 | LeftHand thumb/finger joints | 73->74 support thumb snaps from folded fist pose to fully extended as fresh magazine appears below FP. | Blend thumb and finger opening into retrieval before fresh-magazine spawn; establish its grasp before raising. |
| 0083 | LeftHand / LeftLowerArm / elbow plane / fresh-magazine carrier | 82->83 support palm and forearm roll abruptly from back-hand-facing camera to palm-facing camera, changing elbow plane and magazine orientation below FP. | Blend forearm roll and carrier orientation over adjacent samples with stable elbow pole and preserved grasp. |
| 0074-0131 | LeftHand thumb / finger MCP/PIP/DIP / fresh magazine | Fresh magazine travels against loose fingers with thumb extended away rather than opposing its external wall; no closed external-wall grasp. | Fit fingers and opposing thumb to magazine walls offscreen before spawn, maintain contact through retrieval and insertion. |
| 0108, 0119 | LeftHand / LeftLowerArm / LeftUpperArm / fresh-magazine carrier | 107->108 palm flips toward FP, fingers open and magazine turns across palm; 118->119 reverses palm orientation and raises elbow plane with abrupt carrier rotation. | Blend forearm roll, elbow pole and carrier orientation continuously while preserving a closed magazine grasp. |
| 0119-0131 | LeftHand index MCP/PIP/DIP / trigger guard | Support index crosses trigger-guard rim during high receiver reach. | Lower support target toward magazine base/socket and keep index outside trigger guard while gripping external magazine walls. |
| 0132, 0137 | LeftHand / LeftLowerArm / LeftUpperArm | 131->132 support hand flips from back-hand-facing FP to palm-facing sideways with large elbow-plane change at seat; 136->137 reverses roll into a flat recovery hand. | Blend insertion-to-release and release-to-recovery roll over adjacent frames; distribute rotation along forearm with stable elbow pole. |
| 0133 | LeftHand thumb | 132->133 thumb abruptly folds from upright extension to horizontal across the hand. | Blend thumb relaxation after seating over several adjacent samples. |
| 0137-0158 | LeftHand / LeftLowerArm cuff seam | Open black wrist gap under glove heel above sleeve cuff during recovery, visible in FP. | Close wrist seam, restore glove/cuff overlap and correct roll weights so no cavity opens during pronation. |
| 0148-0158 | LeftHand / support-arm recovery to hip-idle | Reload settles with the left hand open below the pistol through last frame 158; hip-idle 0000 instead begins with the hand raised and curled into the two-handed cup grip. The supplied clip ends without that recovery. | Raise and roll the support arm continuously back into the idle cup grip and curl fingers before the clip ends, or include the actual continuous production transition in the next clay sequence. |

### pistol/ads: FAIL

| Exact frames (inclusive) | Joint / contact | Defect | Direction to fix |
| --- | --- | --- | --- |
| 0004, 0006 | LeftHand / LeftLowerArm / LeftUpperArm | 003->004 abruptly rolls support hand from cup grip to camera-facing palm with extended finger silhouette and changes elbow plane; 005->006 abruptly reverses to the cup grip. Clear FP and side-close pop during raise. | Preserve the closed two-handed support grip through ADS raise; blend forearm roll and elbow pole smoothly without a one-sample grip orientation switch. |

### pistol/hip-idle: PASS

All 0041 samples x 3 cameras reviewed. Seated natural two-handed cup, distinct finger shapes, continuous cuffs and stable elbow plane; no confirmed jump or interpenetration.

### pistol/running: FAIL

| Exact frames (inclusive) | Joint / contact | Defect | Direction to fix |
| --- | --- | --- | --- |
| 0007, 0010 | LeftHand / LeftLowerArm / LeftUpperArm | 006->007 abruptly rolls the support cup grip into a side-camera-facing palm with thumb moved up beside the slide and changes elbow plane; 009->010 abruptly reverses into the cup. FP and side-close show a one-sample silhouette switch. | Maintain the support cup contact during running; blend forearm roll and elbow pole over adjacent samples, removing the one-frame orientation switches. |

### pistol/sprint: FAIL

| Exact frames (inclusive) | Joint / contact | Defect | Direction to fix |
| --- | --- | --- | --- |
| 0005, 0014, 0034, 0044 | LeftHand / LeftLowerArm / LeftUpperArm | Support cup rolls abruptly into side-facing palm with changed elbow plane at 4->5, reverses at 13->14, and flips again at 33->34. One-sample FP silhouette switches. Reverses again at 43->44. | Maintain support cup contact and blend forearm roll and elbow pole across adjacent samples rather than switching hand orientation. |
| 0027-0033, 0057-0061 | LeftHand finger DIP / fingertips versus RightHand palm | Support fingertips emerge as isolated round pads through the firing-hand palm in FP, strongest at 28-32, instead of wrapping its outside. Recurs at 57-61. | Move support finger pads outward from firing-hand mesh and fit MCP/PIP/DIP curl to its external surface; preserve contact without penetration throughout sprint. |

### pistol/knife: FAIL

| Exact frames (inclusive) | Joint / contact | Defect | Direction to fix |
| --- | --- | --- | --- |
| 0042 | Knife RightHand / primary weapon clearance | During recovery, the knife blade and returning pistol rear slide visibly intersect in FP frame 0042: slide/rear geometry protrudes over the blade surface; side-close places the blade through the rear slide region. | Keep the primary pistol dipped longer and route the knife hand farther outboard until the full blade and fist clear the gun; then blend primary recovery. |

### pistol/swap: FAIL

| Exact frames (inclusive) | Joint / contact | Defect | Direction to fix |
| --- | --- | --- | --- |
| 0021 | LeftHand / LeftLowerArm / LeftUpperArm | Frame 0020 to 0021 abruptly rolls the support palm toward the side camera and changes the elbow plane while the pistol draw remains smooth. The switched pose persists through frame 0058; no additional reversal, cuff tear or confirmed finger penetration in this clip. | Preserve the seated cup grip through the draw; blend forearm roll continuously and derive a stable elbow plane from native hand articulation instead of switching poles at 0021. |

### pistol/firing: FAIL

| Exact frames (inclusive) | Joint / contact | Defect | Direction to fix |
| --- | --- | --- | --- |
| 0010, 0013 | LeftHand / LeftLowerArm / LeftUpperArm | 0009 to 0010 abruptly rolls the support palm toward the side camera and changes the elbow plane; 0012 to 0013 reverses into the cup grip during otherwise continuous recoil recovery. | Keep the support cup seated and blend forearm roll continuously with a stable elbow plane derived from native hand articulation. |
| 0011 | LeftHand thumb CMC / MCP | 0010 to 0011 snaps the extended support thumb from sideways to upright beside the rear of the pistol. | Blend thumb articulation over consecutive samples while preserving the support grip. |

### pistol/firing-ads: FAIL

| Exact frames (inclusive) | Joint / contact | Defect | Direction to fix |
| --- | --- | --- | --- |
| 0008, 0018 | LeftHand / LeftLowerArm / LeftUpperArm | 0007 to 0008 abruptly rolls the support palm toward the side camera and drops the elbow plane; 0017 to 0018 reverses into the cup grip during continuous recoil recovery. | Keep the support cup seated and blend forearm roll continuously with a stable elbow plane derived from native hand articulation. |
| 0008-0017 | LeftHand thumb CMC / MCP versus RightHand thumb | The rolled support thumb crosses and visibly merges into the firing thumb in the first-person view. | Move the support thumb outward and forward onto the exterior of the firing hand; preserve separated thumb surfaces through recoil. |

### shotgun/reload: FAIL

| Exact frames (inclusive) | Joint / contact | Defect | Direction to fix |
| --- | --- | --- | --- |
| 0000-0008, 0035-0036 | LeftHand / LeftLowerArm cuff seam | Open wrist/palm-heel cavity visible in FP and side-close on retrieval entry; open back-wrist seam during withdrawal. | Close the seam with cuff overlap and stable skin weights; distribute forearm roll without exposing an opening. |
| 0012, 0026, 0031 | LeftHand / LeftLowerArm / LeftUpperArm | Abrupt palm and elbow-plane changes at 0011->0012 (below FP retrieval), 0025->0026 (shell entry), and 0030->0031 (insertion). | Blend each hand rotation over adjacent poses with distributed forearm roll and a stable elbow pole derived from hand articulation. |
| 0026-0030 | LeftHand palm / finger MCP-PIP-DIP / thumb | Shell protrudes from the center of the open palm; fingers and thumb do not pinch or retain the exterior cylinder. | Move shell outside palm; pinch its exterior between thumb and curled index/middle fingers before it enters FP view, then maintain contact through insertion. |
| 0048-0049, 0058 | LeftHand / LeftLowerArm / LeftUpperArm | Abrupt palm roll and elbow-plane changes at 0047->0048, 0048->0049 and 0057->0058 during second shell retrieval/insertion. | Blend wrist orientation with distributed forearm roll and a stable elbow pole while keeping shell grip continuous. |
| 0049-0053 | LeftHand / LeftLowerArm cuff seam | Open palm-heel/wrist cavity during second shell lift, visible in FP and side-close. | Restore cuff overlap and seam weights through this supinated pose. |
| 0041-0057 | LeftHand palm / finger MCP-PIP-DIP / thumb | Second shell protrudes from palm interior; loose or extended fingers and unopposed thumb do not hold exterior through retrieval and insertion. | Position cylinder outside palm and oppose thumb against index/middle finger pads before spawn; keep closed exterior pinch through tube insertion. |
| 0054 | LeftHand thumb CMC/MCP | 0053->0054 thumb snaps from hanging downward to horizontal across wrist while shell remains ungrasped. | Blend thumb rotation over adjacent frames into the opposing shell grip. |
| 0066, 0078 | LeftHand / LeftLowerArm / LeftUpperArm | Abrupt palm/forearm roll at 0065->0066 and 0077->0078; the latter also changes the elbow plane. | Blend wrist orientation across adjacent samples, distribute roll through forearm and preserve a stable elbow pole. |
| 0066-0080 | LeftHand palm / finger MCP-PIP-DIP / thumb | Third shell embedded in open palm, with fingers loosely extended and no opposing thumb exterior pinch. | Position shell outside palm volume; close thumb and index/middle pads on its exterior before off-screen spawn and maintain the grasp through insertion. |
| 0081-0084 | LeftHand palm / finger MCP-PIP | Palm and finger roots intersect receiver; fingers emerge through opposite gun face during insertion. | Move insertion target down/outside receiver, curl fingers around shell exterior and leave only shell entering tube loading port. |
| 0081-0086, 0099-0108 | LeftHand / LeftLowerArm cuff seam | Large open wrist/palm-heel cavity visible in first-person, persisting through final recovery pose. | Restore overlapping closed cuff geometry and continuous seam weights; distribute roll without separating hand from sleeve. |
| 0096-0108 | RightHand thumb heel / RightLowerArm cuff seam | Small black triangular opening at hand-sleeve junction visible in side-close. | Close cuff overlap and correct seam weights at firing-hand thumb heel. |
| 0099-0108 | LeftHand / LeftLowerArm / LeftUpperArm support recovery | Reload ends with support hand hanging open below receiver, unlike handguard support in hip-idle 0000. | Blend hand upward/forward back onto handguard with closed exterior grasp before reload finishes, or include the actual continuous production transition in next clay capture. |

### shotgun/ads: FAIL

| Exact frames (inclusive) | Joint / contact | Defect | Direction to fix |
| --- | --- | --- | --- |
| 0000-0127 | LeftHand finger MCP/PIP/DIP and thumb CMC/MCP | Open flat palm under pump, barely curled fingers, thumb extended away without opposition throughout raise and held ADS. | Seat palm under pump, curl fingers around its external surface and oppose thumb throughout ADS raise and hold. |
| 0003 | LeftLowerArm/LeftUpperArm elbow plane | Elbow/sleeve plane steps downward at 0002-to-0003 during raise. | Blend elbow pole and distribute forearm roll continuously while maintaining support contact. |
| 0004-0127 | Camera/weapon rear geometry (RightHand grip visibility) | Stock/grip rear geometry disappears at 0004 in side views; FP exposes large hollow clipped rear receiver geometry through 0127. | Keep closed rear geometry and camera clearance throughout ADS; preserve an inspectable seated firing grip. |

### shotgun/hip-idle: FAIL

| Exact frames (inclusive) | Joint / contact | Defect | Direction to fix |
| --- | --- | --- | --- |
| 0000-0063 | LeftHand finger MCP/PIP/DIP and thumb CMC/MCP | Support palm is open beneath rear handguard; fingers remain almost upright with slight curl and thumb extends away without opposition. Stable wrist/elbow, but no convincing closed pump grip. | Curl fingers around external pump surface and oppose thumb, seating palm on underside while preserving continuous wrist and elbow plane. |

### shotgun/running: FAIL

| Exact frames (inclusive) | Joint / contact | Defect | Direction to fix |
| --- | --- | --- | --- |
| 0000-0030 | LeftHand finger MCP/PIP/DIP and thumb CMC/MCP | Support palm stays open under pump, fingers barely curl and thumb extends away without opposition throughout bob. No additional confirmed wrist or elbow discontinuity. | Seat palm on pump underside; curl fingers around external pump and oppose thumb. Maintain this contact through running bob without changing wrist or elbow plane. |

### shotgun/sprint: FAIL

| Exact frames (inclusive) | Joint / contact | Defect | Direction to fix |
| --- | --- | --- | --- |
| 0000-0061 | LeftHand finger MCP/PIP/DIP and thumb CMC/MCP | Pump support stays open with nearly straight/slightly curved fingers and no opposing thumb through carry and bob. | Seat palm under pump, curl fingers around external pump and oppose thumb through sprint carry. |
| 0015, 0026 | LeftLowerArm/LeftUpperArm elbow plane | Elbow and sleeve plane step downward at 0014-to-0015 and upward at 0025-to-0026 while support contact and gun remain nearly fixed. | Blend the elbow pole through these changes, preserve the support grip and distribute forearm roll continuously. |

### shotgun/knife: FAIL

| Exact frames (inclusive) | Joint / contact | Defect | Direction to fix |
| --- | --- | --- | --- |
| 0000-0054 | Primary LeftHand finger MCP/PIP/DIP and thumb CMC/MCP | Support palm stays open beneath the pump with nearly straight fingers and no opposing thumb. | Seat the palm against the pump underside, curl fingers around its external surface and oppose the thumb throughout the dip and recovery. |
| 0040-0042 | Knife RightHand/RightLowerArm relative to primary weapon rear geometry | Primary rear weapon geometry crosses the knife hand and cuff during FP recovery. | Keep the primary weapon down longer and route the knife recovery outboard right until the hand and cuff clear the rear weapon geometry before lifting it. |

### shotgun/swap: FAIL

| Exact frames (inclusive) | Joint / contact | Defect | Direction to fix |
| --- | --- | --- | --- |
| 0006-0081 | LeftHand finger MCP/PIP/DIP and thumb CMC/MCP | Support palm remains open beneath rear pump with nearly straight fingers and no opposing thumb through draw and held pose. | Seat palm under pump; curl fingers around its external surface and oppose thumb before FP entry. Preserve continuous wrist roll and elbow direction. |

### shotgun/firing: FAIL

| Exact frames (inclusive) | Joint / contact | Defect | Direction to fix |
| --- | --- | --- | --- |
| 0000-0035 | LeftHand finger MCP/PIP/DIP and thumb CMC/MCP | Support palm remains open under rear pump with nearly straight fingers and no opposing thumb throughout recoil and recovery. | Seat palm beneath pump, curl fingers around its external surface and oppose thumb while preserving continuous wrist roll and elbow direction. |
| 0000-0035 | LeftHand palm heel / LeftLowerArm cuff | Large circular/triangular opening at wrist and palm heel is visible in first-person and side-close throughout firing. | Close or overlap the cuff and hand seam and correct roll weights so recoil cannot expose the interior. |

### shotgun/firing-ads: FAIL

| Exact frames (inclusive) | Joint / contact | Defect | Direction to fix |
| --- | --- | --- | --- |
| 0000-0035 | LeftHand finger MCP/PIP/DIP and thumb CMC/MCP | Open support palm under pump has nearly straight fingers and no opposing thumb throughout ADS recoil/recovery. | Seat palm under pump, curl fingers around its external surface and oppose thumb without changing the continuous elbow plane. |
| 0005 | RightHand / RightLowerArm / RightUpperArm | 0004 to 0005 abruptly rolls firing hand from upright fingers to horizontal fingers while right elbow/sleeve plane moves up and outboard with weapon nearly fixed. | Preserve firing grip orientation and blend forearm roll and elbow plane across multiple samples rather than switching poles. |
| 0000-0035 | Camera / weapon rear geometry / RightHand grip visibility | Rear stock/grip geometry is absent in side views and first-person shows a large hollow/clipped receiver below rear sight, obscuring grip seating. | Retain closed rear geometry and sufficient camera clearance so firing grip and rear surfaces remain intact and inspectable throughout ADS recoil. |

### sniperRifle/reload: FAIL

| Exact frames (inclusive) | Joint / contact | Defect | Direction to fix |
| --- | --- | --- | --- |
| 0000-0010, 0032-0034 | LeftHand palm heel / LeftLowerArm cuff | Triangular hollow opening at palm heel/cuff; large in first-person 0000-0010 and side-close 0032-0034. | Close and overlap the wrist seam; correct roll skin weights without collapsing the palm heel. |
| 0013-0014, 0021, 0028, 0035, 0048-0049 | LeftHand / LeftLowerArm / LeftUpperArm | Abrupt wrist/forearm roll and elbow/sleeve plane switches at 0012->0013, 0013->0014, 0020->0021, 0027->0028 and 0034->0035. Additional wrist/forearm plane switch at 0047->0048, then reverse at 0048->0049 below first-person frame. | Blend the roll across neighboring samples, distribute forearm rotation and maintain a continuous elbow pole while preserving external magazine grasp. |
| 0017-0020 | LeftHand finger MCP/PIP/DIP | Isolated fingertips protrude through upper/side receiver while support palm reaches high beneath it. | Move support hand down to magazine exterior and curl fingers around outer walls, clear of receiver. |
| 0006-0041 | LeftHand finger MCP/PIP/DIP and thumb CMC/MCP | Old magazine contact and withdrawal use an open palm, nearly straight fingers and unopposed thumb; magazine travels across/through the open palm and remains perched after hand opens below frame. | Close an external grasp before detach; hold through withdrawal, then open and release the magazine into an independent downward drop/toss immediately. |
| 0040-0042 | LeftHand finger MCP/PIP/DIP / magazine release | Fingers curl while released magazine passes through/under tips, instead of opening for release. | Open before release and place magazine below/outside fingertip pads for its independent downward drop. |
| 0051 | LeftHand thumb CMC/MCP | Fresh magazine appears below first-person frame as thumb abruptly extends from folded fist to upright. | Blend thumb retrieval/opposition before off-screen magazine spawn and maintain an external closed grasp. |
| 0055, 0058 | LeftHand / LeftLowerArm / LeftUpperArm | 0054->0055 abrupt supination with forearm/elbow plane change; 0057->0058 abrupt reverse pronation and sleeve plane while fresh magazine is carried below FP. | Preserve external magazine grasp, blend distributed forearm roll across adjacent samples, and maintain a stable elbow pole. |
| 0065 | Left thumb CMC/MCP | 0064->0065 upright thumb abruptly folds horizontally during fresh-mag carry. | Blend thumb opposition before retrieval; preserve closed external magazine contact throughout carry. |
| 0078 | LeftHand / LeftLowerArm / LeftUpperArm | 0077->0078 abrupt supination, open fingers and elbow/sleeve plane change on FP re-entry with fresh magazine. | Retain closed external grasp during entry and blend distributed roll with stable elbow pole. |
| 0083-0094 | Left finger MCP/PIP/DIP | Isolated fingertip ends protrude through upper/side receiver while magazine approaches socket. | Lower the grasp onto magazine exterior; keep all finger pads outside receiver and trigger guard through seating. |
| 0083-0108 | LeftHand palm heel / LeftLowerArm cuff | Dark triangular opening at palm-heel cuff seam during insertion and recovery; large FP hole at 0096-0108. | Close/overlap cuff seam and correct roll weights while preserving wrist volume. |
| 0051-0090 | Left finger MCP/PIP/DIP and thumb CMC/MCP | Fresh magazine travels across loosely curled or open fingers without an opposing thumb; palm and fingers do not hold the exterior through insertion. | Close an external pad grasp with opposed thumb before off-screen spawn, preserve it through carry and seating, and open only after socket ownership. |
| 0100-0108 | LeftHand / LeftLowerArm recovery | Reload ends with open cupped support hand below magazine/receiver, unseated from handguard; compare hip-idle 0000. | Lift and reach forward onto handguard, curl exterior fingers with opposed thumb before reload ends; capture the actual continuous production transition. |

### sniperRifle/ads: FAIL

| Exact frames (inclusive) | Joint / contact | Defect | Direction to fix |
| --- | --- | --- | --- |
| 0000-0127 | LeftHand finger MCP/PIP/DIP and thumb CMC/MCP | Support palm remains open beneath rear handguard with nearly straight fingers and no opposing thumb through raise and held ADS. | Seat palm under handguard, curl fingers around its exterior and oppose thumb while preserving continuous wrist and elbow motion. |
| 0004-0127 | Camera / rear weapon geometry above RightHand | Rear stock disappears at 0003->0004, leaving jagged open rear geometry in side views and a cut/open rear surface in FP through the held pose. | Retain closed rear geometry with sufficient camera clearance and continuous visibility during raise and hold. |

### sniperRifle/hip-idle: FAIL

| Exact frames (inclusive) | Joint / contact | Defect | Direction to fix |
| --- | --- | --- | --- |
| 0000-0063 | LeftHand finger MCP/PIP/DIP and thumb CMC/MCP | Support palm remains open beneath handguard with nearly straight fingers and no opposing thumb; side-close exposes the incomplete grasp throughout the held clip. | Seat palm against underside, curl fingers around exterior handguard, and oppose thumb while preserving cuff volume and stable elbow plane. |

### sniperRifle/running: FAIL

| Exact frames (inclusive) | Joint / contact | Defect | Direction to fix |
| --- | --- | --- | --- |
| 0000-0030 | LeftHand finger MCP/PIP/DIP and thumb CMC/MCP | Support palm remains open under the handguard with nearly straight fingers and no opposing thumb throughout running. | Seat the palm, curl fingers externally around the handguard and oppose the thumb while preserving continuous wrist and elbow motion. |

### sniperRifle/sprint: FAIL

| Exact frames (inclusive) | Joint / contact | Defect | Direction to fix |
| --- | --- | --- | --- |
| 0000-0061 | LeftHand finger MCP/PIP/DIP and thumb CMC/MCP | Open support palm under rear handguard with nearly straight fingers and no opposing thumb throughout entry and sprint carry. | Seat palm beneath handguard, curl fingers around its exterior and oppose thumb while preserving continuous wrist roll and elbow motion. |

### sniperRifle/knife: FAIL

| Exact frames (inclusive) | Joint / contact | Defect | Direction to fix |
| --- | --- | --- | --- |
| 0000-0054 | Primary LeftHand finger MCP/PIP/DIP and thumb CMC/MCP | Primary support palm stays open beneath rear handguard with nearly straight fingers and no opposing thumb during dip, strike and recovery. | Seat palm beneath handguard, curl fingers around exterior and oppose thumb while preserving continuous wrist and elbow motion. |
| 0039-0041 | Knife RightHand / RightLowerArm cuff versus primary scope and bolt | Returning rifle cuts through knife wrist/hand region: scope ring appears embedded across cuff/hand at 0039-0040 and bolt/receiver cuts the hand/blade-base region at 0041 in FP. | Hold rifle down longer and move knife hand outboard right until it clears scope, bolt and receiver before raising primary. |

### sniperRifle/swap: FAIL

| Exact frames (inclusive) | Joint / contact | Defect | Direction to fix |
| --- | --- | --- | --- |
| 0006-0081 | LeftHand finger MCP/PIP/DIP and thumb CMC/MCP | Support palm stays open beneath rear handguard with nearly straight fingers and no opposing thumb during draw and held tail. | Seat palm under handguard, curl fingers around exterior and oppose thumb before first-person entry; preserve continuous wrist and elbow motion. |

### sniperRifle/firing: FAIL

| Exact frames (inclusive) | Joint / contact | Defect | Direction to fix |
| --- | --- | --- | --- |
| 0000-0035 | LeftHand finger MCP/PIP/DIP and thumb CMC/MCP | Open support palm under rear handguard with nearly straight fingers and no opposing thumb throughout recoil and recovery. | Seat palm beneath handguard; curl fingers around the exterior and oppose thumb while preserving continuous wrist and elbow motion. |
| 0000-0035 | LeftHand palm heel / LeftLowerArm cuff | Large circular/triangular wrist opening visible in first-person and side-close throughout recoil and recovery. | Close or overlap palm-heel/cuff seam and correct roll weights to retain wrist volume. |

### sniperRifle/firing-ads: FAIL

| Exact frames (inclusive) | Joint / contact | Defect | Direction to fix |
| --- | --- | --- | --- |
| 0000-0035 | LeftHand finger MCP/PIP/DIP and thumb CMC/MCP | Open support palm beneath rear handguard, nearly straight fingers and no opposing thumb through aimed recoil/recovery. | Seat palm beneath handguard; curl fingers around exterior and oppose thumb, preserving wrist and elbow continuity. |
| 0000-0035 | LeftHand palm heel / LeftLowerArm cuff | Large triangular palm-heel/cuff opening visible at lower left in first-person. | Close or overlap palm-heel/cuff seam and correct roll weights to preserve wrist volume. |
| 0000-0035 | Camera / rear weapon geometry | Rear stock is absent with a jagged open rear stump in both side views; first-person rear surface is cut/open, including exposed triangular edges during recovery. | Retain closed rear weapon surfaces with camera clearance through aimed recoil and recovery. |

## Original capture documentation (preserved)

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
