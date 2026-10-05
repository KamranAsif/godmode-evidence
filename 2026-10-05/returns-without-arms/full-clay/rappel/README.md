# rappel return clay audit

Candidate source: `f9be1f90f5efed06cf94e422a2856d1ccd855064` plus the working tree recorded in candidate.diff.

Every sample from 0 through 2.85 s at 60 Hz: 172 individual frames per camera (firstPerson,side).
All raw frames are 1920x1080. Indexed contact sheets group 30 frames per page.
A `--pilot` run is only a local preflight, never a complete audit submission.

The diagnostic pins exact production path/presentation time; it does not claim
these are consecutively recorded real-time game frames. Doors, rigs, skinning
and body animation are the actual gameplay implementations. The side camera tracks the actual body.
Native first-person idle is sampled at the diagnostic elapsed time (ADS remains frozen at zero); shooting/reload retain ordinary gameplay time. Pose JSON records the native playhead and full FP/world rig transforms.
Material overlays, alpha VFX planes and particles are disabled only for this diagnostic. The van side camera
cuts away the near cargo wall/roof solely to expose otherwise hidden contacts.

Audit doors, sill clearance, feet, landing dip, continuous body motion,
absence of first-person arms during return/recovery and primary readiness at street contact (1.85 s for van).
Old arms and hand IK are excluded. Lane D reviews these actual return frames; no inherited arm audit PASS is claimed.
