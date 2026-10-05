# Van return clay N1: FAIL

Auditor: vision lane %108. Immutable evidence: `46b6e79cf004035d65b442c6d841a9b07925332a`. Candidate source: `cd393349439849ff155d2e046967111f58ea7b51`; supplied `candidate.diff` is empty.

**Coverage complete:** individually opened every original `firstPerson/000.png` through `150.png` and `side/000.png` through `150.png`: **302 original 1920x1080 images**, all 151 samples from 0 to 2.5 seconds at 60 Hz per camera. Consecutive frames were compared; selected originals were reopened and enlarged for the elbow, body-pose boundary and boot contact. Contact sheets and JSON were supplementary, never substitutes for the originals. No game code changed and no engine run by the auditor.

| Clip | Verdict | Original coverage | Reasons |
| --- | --- | --- | --- |
| Actual van climb-out / return with machine gun | **FAIL** | FP 000?150; side 000?150 | Body-pose discontinuity, instantaneous off-hand recovery, open elbow silhouette, weightless foot slide; incomplete contact visibility in the diagnostic side view |

## Confirmed defects and directions to fix

1. **Side frame 051, compared with 050 (0.850 s). Hips, spine, upper legs, knees and ankles:** the crouched exit pose switches in one 16.67 ms step. The backpack/pelvis moves abruptly upward and forward, the head drops forward, and the tucked rear leg changes to a different bent stance. The van and camera do not make a matching jump. **Fix:** blend the crouched brace into the exit pose over adjacent samples. Move the pelvis continuously upward/forward as weight transfers; unfold the rear knee and lower the rear foot continuously. Preserve each planted foot in world space until its deliberate lift. Do not replace the whole body pose at the boundary. The distant side view does not establish which anatomical leg is the nearer leg, so this report does not assign an unsupported left/right leg label.

2. **FP frame 084, compared with 083 (1.400 s). Left shoulder/upper arm/elbow/forearm/hand:** the left arm is entirely below/outside the FP frame at 083, then the full diagonal upper arm and forearm instantly occupy the lower-left-to-handguard span at 084. There are no intermediate visible reach poses. The weapon and world remain continuous. **Fix:** release the brace, withdraw the palm, and move the hand smoothly UP and IN/RIGHT toward the primary support socket, with a continuous elbow pole and native forearm roll. Blend across the brace-to-weapon boundary; a hand being briefly off-screen must not hide a whole-arm teleport into the ready pose. Show the release and recovery from a close world-hand view as well.

3. **FP frames 084?150 inclusive (1.400?2.500 s). Left elbow / upper-arm and forearm sleeve junction:** the upper-arm sleeve ends almost vertically at the elbow while the forearm sleeve is connected by a pinched, narrow wedge at the upper corner. The lower/outside elbow silhouette opens onto the street/background instead of remaining a covered bent sleeve. Original 084 and 150 enlargements confirm this is the elbow junction, not the repaired hand/wrist cuff. **Fix:** extend and skin the upper-arm/forearm sleeve overlap around the lower/outside bend so the full elbow stays covered at this pole and bend. Retain a rounded, continuous sleeve silhouette instead of the thin corner connection. Recheck the complete transition after applying the canonical HD overlap repair; its existence in a newer asset does not change this immutable N1 verdict.

4. **Side frames 117?150 inclusive (1.950?2.500 s). Hips, both knees/ankles/feet and root motion:** after the short crouch-to-standing recovery, both boots remain visibly suspended above the street, with a clear strip of ground beneath the soles before their shadows. The same standing leg configuration translates left across the stationary van/curb without actual steps or a planted foot. Original 117 and 150 enlargements confirm the detached soles and unchanged stance; the slide persists through every intervening sample. **Fix:** move the pelvis/feet DOWN to actual sole contact, settle weight through knees and ankles, and hold the planted foot in world space. Stop exit root motion once standing, or author matching steps with foot lift, swing and new contact. Do not translate a fixed standing pose above the ground. Pixel separation is visual evidence, not a claimed centimetre measurement.

## Capture defects / contacts that cannot receive PASS

- **Side 000 ? 001:** the player body is absent at 000; the near cargo wall/roof is not cut away there either. At 001 the cutaway and crouched actor both appear. Publish the actor, skin and cutaway consistently before capturing sample 000. This is a visibility/publication discontinuity, not a claimed skeletal joint failure at 000.
- **Side 001?150:** the world hands are too small/low-contrast to inspect all five fingers, thumb opposition, trigger placement and exact palm surface contact. **Side 051?089 in particular:** the opened rear door progressively hides the hands, sill, knees and feet; much of the body is behind the door around 080?089. Supply a tracked full-body view from a street/front angle that keeps the complete climb-out and sill visible, plus a separate tracked world-hand close view showing brace contact, release and weapon recovery. Contact residuals cannot certify exterior finger contact or mesh clearance.
- **FP 068?083:** the off hand is fully out of frame. Its palm opening and withdrawal from the brace therefore cannot be certified from FP; the corresponding side obstruction does not fill this gap. This absence alone is not an extra anatomical defect. Frame 084's recovery discontinuity is the confirmed defect.

## Findings deliberately not overstated

The left hand's early brace position while the hinged door rotates may be contact with the fixed opening/frame. This report does **not** infer lost contact with a moving door solely because the hand stays put; supplied contact metadata does not identify a sufficiently specific exterior surface to resolve that distinction. The early wrist joins look covered; gray cuff/fold creases are not reported as holes. The near door and distant body prevent reliable finger fusion, trigger interpenetration, boot/sill collision or weapon/door penetration verdicts. No additional exact joint-flip ranges are invented from those occluded views. Standing recovery around 112?116 is gradual; it is not another instantaneous body-pose failure. Upper-right notification overlays do not hide the audited arms and are not failures.

N1 remains **FAIL**. A complete new actual-scene set must demonstrate these repairs, readable contacts and uninterrupted recovery before the van return can pass. Tablet-only PASS and isolated rope/contact tests do not certify this clip; no final #929 source push is cleared by this report.

## Original capture record

# van return clay audit

Candidate source: `cd393349439849ff155d2e046967111f58ea7b51` plus the working tree recorded in candidate.diff.

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
