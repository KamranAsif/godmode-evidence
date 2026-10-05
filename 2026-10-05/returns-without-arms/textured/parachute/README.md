# parachute return clay audit

Candidate source: `1f1836e19098651c5158bf11d27f96b1537efc0a` plus the working tree recorded in candidate.diff.

LOCAL DIAGNOSTIC ONLY: 5 samples per camera; not a complete audit submission.
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
