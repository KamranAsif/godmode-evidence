# Pistol native Mixamo mocap — first clay batch

Candidate only. PR #958 has not been promoted to this asset. Native wrists improve, but the support hand misses the grip and the viewmodel leaves the first-person frame during reload and hip fire. The blank reload midpoint is an actual rendered failure, not a missing image.

50° viewmodel camera; sleeve radius 70%; glove scale 80%; one fixed right-hand pistol fit; no IK. Downloaded native animations on the same saved HD Assault rig. Mixamo names and hashes are in `pistol-provenance.json`.

`clay-first-person/` contains hold (Idle 0), ADS (ADS 30), reload midpoint (Reload 75), sprint (Sprint 6). `clay/` contains all 550 samples in both first-person and side views (1,100 PNGs). `contact-sheets/` contains all 32 chronological paired sheets: each cell has first person above side. Frame numbers are zero-based, at 30 fps.

The completed textured side-by-side is `scripted-vs-mixamo.png`; untouched 1280x720 frames are in `scripted/` and `mocap/`. The audit, six best/six worst selections, native source archive, and immutable raw URLs are linked in `raw-urls.md`. No assault rifle work has started. Waiting for Kamran; PR #958 remains unchanged.
