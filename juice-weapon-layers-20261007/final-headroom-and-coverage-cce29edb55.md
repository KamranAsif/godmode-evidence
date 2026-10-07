# PR1007 coverage and headroom attestation

Signed Codex `/root`, independent CPU-only auditor, 2026-10-07. Source/visual scope ALL PASS; exact-current root and smoke PENDING. Authoritative verdict: [signed audit](signed-audit.md).

Reviewed source `7568a41e499445ec6aca1164d3c5aed7341dbaaa`, base `5056ee3d6418d458542899b0f97047c0a9ea75d0`. Actual capture producer `1e84fcf69420ca1c559c15323b384714864e44ef`, capture base `2824fe0285100a7675adcd1dc5f10d958f27e838`. Feature edits remain identical; main's newer priority/ducking code is not represented by these captures. Control producer `9afaba9709fd9fb492b0c10df2bfda8b97d15a3d` retains the four baseline weapon paths; whole trees differ.

| Clip | Native frames | Distinct native full contexts reviewed | Encoded frames | Distinct encoded RGB groups | Encoded full contexts reviewed | Unscaled ROI contexts / sheets reviewed |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Control fixture | 169 | 56 | 378 | 343 | 128 | 583 / 51 |
| Control natural | 117 | 117 | 243 | 242 | 44 | 764 / 43 |
| Candidate fixture | 189 | 189 | 377 | 376 | 111 | 749 / 39 |
| Candidate natural | 106 | 106 | 243 | 242 | 30 | 552 / 36 |
| Total | 581 | 468 | 1241 | 1203 | 313 | 2648 / 169 |

Every native index is covered by an exact-RGBA group whose representative was viewed at original detail in full context. For every encoded frame, radar, stream/chat, reticle, ammo and abilities crops were reviewed unscaled through exact-pixel groups. Their bounds and complete source-index membership remain in [encoded ROI ledger](final/encoded-roi-ledger.json). All planned event/boundary encoded full contexts and additional contexts were viewed at original detail. Timestamp neighborhoods select event frames; they are not claimed as exact native-to-encoded source mappings. No observed weapon/world/HUD regression. Encoded coverage uses the explicitly approved ROI/event method; 313, not all 1203 distinct encoded groups, received additional full-frame vision.

| Clip | Float32 Master peak | RMS | Samples at/above unity | Max native gap | Missed target intervals |
| --- | ---: | ---: | ---: | ---: | ---: |
| Control fixture | 0.70694506 | 0.07308998 | 0 | 249.684 ms | 179 |
| Control natural | 0.94055575 | 0.05898033 | 0 | 279.304 ms | 134 |
| Candidate fixture | 0.65047503 | 0.05898524 | 0 | 89.861 ms | 189 |
| Candidate natural | 1.35052168 | 0.07541999 | 94 | 102.360 ms | 117 |

Native stereo float32 PCM is finite, 48 kHz, with independently checked saved/pushed/chunk counts and zero discarded frames. No normalization or matched-combat assumption. Natural control has 39 rifle reports; candidate has 49 rifle reports plus 49 machine-fire layers and other differing voices. The candidate natural peak is approximately +2.61 dBFS before output fader/device. This is concrete numerical lack of unity headroom, not a diagnosis of audible clipping or a causal estimate of the layer's effect. The lower controlled candidate peak does not prove improved production headroom.

Source/assets review finds GameplaySfx/UI/Ambience and current Priority/Stream buses route to Master; enemy tells normally route through GameplaySfx. No authored Master or GameplaySfx peak limiter/compressor protects the sum. Music's GameplaySfx-sidechain compressor affects Music only (threshold -26 dB, ratio 4, attack 4000 us, release 320 ms). Main #1015 also lowers Stream/Ambience/Music during foreground windows; GameplaySfx gunshot peaks are not bounded by that mechanism. World low-pass is not a limiter.

The corrected negative-offset ceiling is `max_db = volume_db`, after applying the layer offset; ordinary voices reset to 3 dB. Godot 4.6.1 adds volume before its ceiling clamp, so this preserves nominal weighted voices below unit_size 4 m. Equal-power coefficients do not constrain correlated transient peaks or other simultaneous voices. Independent source math and 12 producer rows at rifle/pistol/shotgun x 1/6/20/40 m pass. [Official engine attenuation implementation](https://github.com/godotengine/godot/blob/4.6.1-stable/scene/3d/audio_stream_player_3d.cpp#L213-L239) supports the clamp interpretation; [engine panning implementation](https://github.com/godotengine/godot/blob/4.6.1-stable/scene/3d/audio_stream_player_3d.cpp#L408-L438) supplies subsequent gain handling.

CFR30 holds/drops timestamped native frames without generated interpolation. Gaps and missed intervals preclude continuous native 1x-motion certification. Controlled clips warm the production opener at 1x, then use timescale .05 and production audio calls; actual NPC fire is also present. Natural clips use actual NPC 1x combat with prior debug preparation/invincibility and no injected capture-time sounds. No actual listening capability is available. No audible-quality, distance-readability, clipping/improvement or by-ear sync claim.

All 25 published final raw URLs were downloaded once and independently hash-verified against originals. Native receipt/PNG pixels, MP4/WAV/PCM/mux metadata pass. [Frame-70 copy proof](final/final-still-copy-verification.json), [remote hashes](final/remote-hashes.json), [numeric/decode proof](final/verification.json), [source binding](final/source-binding.json) and [coverage ledger](final-vision-ledger.json) preserve attribution. Three historical 5f test/smoke URLs also matched independently; [historical proof](final/current-proof-verification.json). 1e and 5f producer tests/smoke remain historical, with the existing ShaderCompiler condition and producer forced stop disclosed. Latest 7568 root/smoke remain pending. Auditor ran no engine or root test.
