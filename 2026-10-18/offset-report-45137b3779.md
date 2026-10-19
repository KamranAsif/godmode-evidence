# PR #2121: non-destructive lead-in correction

The loader applies a minimum start position only after resolving the physical recording. It skips 1.000 s for `assets/audio/swaps/restored-sfx-casing-01.ogg` and 0.403 s for `assets/audio/sfx/machine-fire-01.ogg`. Other takes, including the restored rifle replacement, start normally. Explicit later seeks stay absolute. Receipts retain the caller's requested seek so a newly selected replay take cannot inherit an old file's trim. Replay duration and waveform positions use the effective start.

| Native case | Resolved source | Native playback position immediately after start | PCM peak |
| --- | --- | ---: | ---: |
| Active casing | restored-sfx-casing-01.ogg | 1.002667 s | -33.31 dBFS |
| Legacy rifle fallback | sfx/machine-fire-01.ogg | 0.405646 s | -23.99 dBFS |
| Restored rifle replacement | restored-sfx-machine-fire-01.ogg | 0.002667 s | -19.60 dBFS |
| Casing replay with absolute 1 s seek | restored-sfx-casing-01.ogg | 1.002667 s | -19.30 dBFS |

Warmed casing replay PCM crosses -60 dBFS after 1.5 ms; warmed legacy rifle and replacement cross within 10 ms. The first recorder start includes startup pre-roll and is unsuitable for onset latency, so its raw timestamp is retained with that caveat rather than treated as playback delay. Native source positions prove the actual seek.

All three recording SHA-256 hashes match the original 716-file audit; no audio bytes or import sidecars changed. The temporary native fixture was restored byte-for-byte and its session ended. All 113 targeted audio tests pass.

Issue #2120 was read and confirmed to include 23 numbered byte-identical variation groups with exact filenames (plus 13 intentional mirrors). Its playback-timing note now links the loader fix. Real variation production stays with the sound owner.
