# rappel return clay audit

Candidate source: `5e13cb6abdb521cc7311d721fa684737aa8651bd` plus the working tree recorded in candidate.diff.

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

Primary trigger taps use ordinary gameplay input at samples30/60/90/120 per camera. Trigger receipts and authoritative player loadedAmmo/infiniteAmmo values are in frames.json. Firing state runs on the ordinary game clock while the return path is sampled; these are not a continuous wall-clock movie. Known HD left elbow/sleeve gap remains for audit; db7 cuff assets repair wrists only.
