# Parachute return clay N1 — FAIL

Auditor: VISION lane %108. Immutable evidence: `4d80c0bfe6f3251c5169f5301418fc1aaddc3545`, folder `2026-10-04/parachute-return-clay-1`. Source: `f7b5a24962965730badc44c65964b58200991c84`; recorded `candidate.diff` is empty. Later helper changes do not alter this verdict.

**Coverage complete:** opened every individual original `firstPerson/000.png` through `150.png` and `side/000.png` through `150.png`: **302 / 302**, native 1920×1080, every 60 Hz sample from 0–2500 ms. Compared adjacent samples in each camera. Contact sheets and pose/contact JSON do not substitute for visual review. Additional nearest-neighbour enlargements of already reviewed originals were used to confirm the elbow silhouette and final body pose. No game code changed; no Godot run.

| Submitted clip | Verdict | Reason |
| --- | --- | --- |
| Parachute return: descent, ordinary primary firing, landing boundary | **FAIL** | No visible off-hand riser grip; collapsed left elbow sleeve silhouette; firing captures obscure the scene; side framing cannot resolve hand contact; post-landing release/recovery is absent. |

## Exact animation/contact defects

Ranges are inclusive and use the original three-digit filenames. Time is `frame × 1000 / 60` ms.

1. **FP `000–149`: off hand remains on the machine-gun handguard throughout descent; no visible riser/strand reaches or passes through the hand.** Joint chain: `LeftUpperArm → LeftLowerArm → LeftHand`, all four finger MCP/PIP/DIP chains and thumb CMC/MCP/IP. This is an ordinary gun-support pose, not a demonstrated riser grasp. The supporting digits are partly hidden by the gun, so this finding does **not** allege an open/fused finger pose that the camera cannot show. Fix direction: carry the off hand **up and outboard toward the actual riser bundle**, seat the palm on its exterior, curl four fingers **in around the bundle** at native segment lengths, and oppose the thumb **across the finger contact row**. Align to the bundle's actual world axis, keep the elbow pole and forearm roll continuous, and leave the other hand on the weapon grip for ordinary firing. Capture both FP and a world-hand close view showing all five exterior contacts. `150` remains an ordinary support pose too; no earlier grasp/release is demonstrated.

2. **FP `000–029`, `032–059`, `062–089`, `092–119`, `124–150`: left elbow/sleeve silhouette pinches into a narrow upper connection while the rounded forearm sleeve protrudes over a near-vertical upper-arm end.** Joint/mesh: `LeftUpperArm ↔ LeftLowerArm`, lower/outside elbow sleeve overlap. Background occupies the missing lower/outside bend, producing a squared-off upper-arm edge and bulbous forearm lobe rather than a continuous clothed elbow. Example native locations are around x930/y820 at the settled pose; compare `000` and `150`. Fix direction: extend and skin the sleeve overlap **around the lower/outside elbow bend**, carrying enough material across the bend to retain a round silhouette during native roll; preserve the joint's native lengths and pole. This is the elbow problem already seen in van/rappel N1, not a wrist-cuff defect. **Exclude `030–031`, `060–061`, `090–091`, `120–123` from this exact failure range:** the firing pose straightens the sleeve and conceals/closes this silhouette defect. Reopened `122` and `123` specifically confirm that exclusion. Canonical later overlaps must be verified in a new actual-scene set.

## Exact capture/coverage failures

3. **SIDE `030–033`, `060–063`, `090–093`, `120–123`: every individual image is completely opaque grey; actor, hands, canopy and world cannot be inspected. FP has a large opaque grey rectangle behind the visible gun/arms at the same exact ranges.** These coincide with the primary trigger samples. No joint defect is inferred from the hidden side frames. Fix direction: remove the diagnostic clay conversion of alpha/VFX cards or otherwise preserve transparent rendering; recapture the actual ordinary primary shots with the actor, bundle, fingers and body unobstructed. The clear boundaries are `034`, `064`, `094`, `124`. Successful trigger/ammo receipts do not make these visual frames pass.

4. **SIDE `000`: the actor is absent beneath the visible canopy/lines, then appears at `001`. SIDE `001–029`, `034–059`, `064–089`, `094–119`, `124–150`: actor is only roughly 65–70 pixels tall, low contrast, with a near-frontal stance and hands obscured by the weapon/body.** The remaining side frames are the grey failures above. Joint/contact scope unresolved: both wrists, elbows, five finger chains, line-to-hand/harness connection, knees, ankles and sole/ground contact. Fix direction: make the posed actor visible before `000`, add a **tracked full-body side view** with useful anatomy/contact resolution and a **separate tracked world-hand close view** that shows the bundle passing through an exterior closed grasp. A numerical grip residual cannot certify occluded skin contact. Do not treat the apparent separation between tiny overhead line endpoints and the head as a proven named-joint defect; this camera is insufficient to resolve the attachment.

5. **Landing/release coverage stops at `150` (2500 ms), the first `landed` sample.** SIDE `149–150` still shows the hanging/asymmetric leg configuration while approaching the ground; canopy/lines remain visible at `150`. FP `149–150` shows ordinary gun support with no visible riser release. There are no later samples to establish weight absorption, sole planting, canopy/riser detachment or hand recovery. Fix direction: show a continuous **downward landing compression**, knee/ankle absorption and planted soles, then fingers **opening away from the bundle** and the off hand travelling **down/in to the handguard** without a pose reset. Extend all camera sequences through completed recovery and the geometry-detach boundary. This is a coverage failure, not a claim that an unseen post-2500 ms animation pops; the current terminal sample cannot certify it.

## Checks and limits

Visible wrist cuffs remain joined; grey folds/seams are not reported as holes. No additional elbow flip, finger fusion, trigger-finger break or weapon penetration is invented where the stock/handguard or distant side body hides the geometry. FP primary recoil changes the ordinary supporting-arm pose, but the present evidence does not establish a separate off-hand riser-roll defect because no riser grasp is shown. Body/canopy descent is continuous in the readable side intervals; the blank firing intervals prevent complete side continuity certification. Top-right notifications do not obscure the relevant anatomy and are not arm failures. The approved primitive canopy's art quality is outside this verdict.

Cross-reference: the immutable [rappel N1 FAIL report](https://github.com/KamranAsif/godmode-evidence/blob/1b86ed5811d08cabf1b45f410c2017629e9d48d5/2026-10-04/rappel-return-clay-1/README.md) and [van N1 FAIL report](https://github.com/KamranAsif/godmode-evidence/blob/3c74e9db684ff1ced0329673f248c075f4275091/2026-10-04/van-return-clay-1/README.md). Lane %92 owns the actual return scene/capture; lane %102 owns arm geometry/articulation. A passing isolated rope/tablet set or helper regression test does not transfer PASS to this scene. **No final #929 source sign-off; no ALL CLIPS PASS.**

---

## Producer capture record (preserved)

# parachute return clay audit

Candidate source: `f7b5a24962965730badc44c65964b58200991c84` plus the working tree recorded in candidate.diff.

Every sample from 0 through 2.5 s at 60 Hz: 151 individual frames per camera.
All raw frames are 1920x1080. Indexed contact sheets group 30 frames per page.
A `--pilot` run is only a local preflight, never a complete audit submission.

The diagnostic pins exact production path/presentation time; it does not claim
these are consecutively recorded real-time game frames. Doors, rigs, skinning
and contact helpers are the actual gameplay implementations. The side camera
cuts away the near cargo wall/roof solely to expose otherwise hidden contacts.

Audit the door/palm contacts, sill clearance, feet, landing dip, continuous body
and hand motion, and primary readiness at street contact (1.85 s for van).
No final #929 source push is authorized until the auditor publishes PASS.

The canopy is a primitive placeholder pending separate concept approval. Primary trigger taps use ordinary gameplay input at samples30/60/90/120 per camera, with trigger/ammo receipts in frames.json. This complete fresh run supersedes a failed partial capture that ended in native GodotJS reference_object fatal; none of the failed partial frames are included.
