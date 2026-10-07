# Revised ceiling correction: source review PASS

Signed: Codex, independent CPU-only source auditor, 2026-10-07.

Current test evidence: independently read artifacts/juice/pnpm-test-ceiling-current.log, which records the default root suite passing 13 of 13 steps with zero failures. SHA256: 852970c5d47aaad98b0b49c7fefc45e47e4c4f24f5be98277a183e59e57d0a60. HEAD independently matches 73a2f36c43c866e25b40787056a42a53cff62d09 and git status --short is empty. Build cache current=true is producer-reported; no build, tests or engine were rerun by this auditor. The revised 1m runtime evidence, final capture review and default headless smoke remain pending; this test log does not establish those results.
Reviewed exact candidate73a2f36c43c866e25b40787056a42a53cff62d09 and its two-line correction commit. Scope is the ceiling correction/source math only; final visual and runtime sign-off remain pending.

The correction sets max_db after volume_db on every successful WorldSfx allocation and before play. Negative-offset layered voices cap at their nominal cue-plus-coefficient gain. Zero-offset ordinary, far-only and spare<2 fallback reports reset the pooled voice to its original3dB ceiling. No stale layer ceiling carries into the next ordinary cue. Missing-stream/pause returns do not start playback or allocate a voice.

This fixes the identified near-source loss of weighting. Godot4.6.1 adds volume_db to inverse-distance gain before applying max_db; subsequent linear max-distance fade/panning remain unchanged. [Official implementation](https://github.com/godotengine/godot/blob/4.6.1-stable/scene/3d/audio_stream_player_3d.cpp#L213-L239).

Independent lightweight analytical check covers30 active-layer cases across rifle/pistol/shotgun at1/4/6/20/32/40m. At1m, the old model saturates both layers to3dB for every family. The revised rifle close/distant gains cap at-8.9382/-5.4370dB; pistol-6.9382/-6.4370dB; shotgun-3.9382/-4.4370dB, before linear distance fade and panning. Cases at4m and beyond are unchanged. This model omits the negligible positive engine epsilon and does not model filters, pitch resampling, concurrency or device output. See ceiling-math.py and ceiling-math.json.

The full tracked patch against bb2932fa4 still affects only the four audio/routing/test files. No new audio/visual assets, HUD, tablet, recoil/ADS or spawn code changes are introduced. The correction itself adds one comment and one assignment in game_audio.ts. Producer runtime1m fixture and default headless smoke are queued and not independently verified here. No Godot/import/export or decoding/encoding was run during the exact quiet hold.

This is not a guarantee that the full Master mix stays below unity: overlapping sounds, filters/resampling and existing original-report amplification remain relevant. The previously measured natural encounters are unmatched and belong to3ddb6450. They cannot certify the revised headroom or attribute audible clipping. No WAV/MP4 listening capability is available. Old after captures remain diagnostic, and full-detail visual review stays paused at user request.
