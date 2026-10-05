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
