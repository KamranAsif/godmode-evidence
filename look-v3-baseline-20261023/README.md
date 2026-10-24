# BattleDuty selected V3 baseline

[Native six-view V2 | V3 sheet](sheet.png) | [Fast preview](preview.jpg) | [Native and pixel QA](pixel-and-native-qa.json) | [Timing data and per-repeat measurements](timing.json)

All twelve raw PNGs are native 1920x1080, named view-V2.png and view-V3.png. Panini High (.7) is held constant. V3 is the default High preset, including SMAA + 4x MSAA and High screen effects (SSAO full resolution, SSIL half resolution). Ultra screen effects are available separately. Native camera and settings readbacks accompany each cell; labels sit outside the native pixels.

Timing: 2560x1440, VSync off, uncapped, TAA off, 100% bilinear scale. Three interleaved repeats in separate exclusive holds of at most ten minutes, released between repeats. Fight:65 riflemen; street/bridge:16. Values are medians across three repeats.

| Scene | V2 p50 / p95 / p99 ms | V3 p50 / p95 / p99 ms | p50 increase |
| --- | ---: | ---: | ---: |
| firefight-65 | 15.79 / 20.10 / 21.64 | 20.32 / 25.45 / 27.80 | +4.53 |
| shopping-street | 11.04 / 14.40 / 15.15 | 15.00 / 17.75 / 18.94 | +3.96 |
| under-bridge | 18.47 / 20.85 / 29.09 | 22.68 / 26.89 / 37.95 | +4.21 |

Stills use the capture-only Safe thread model (1) to work around the pinned inspected-source startup assertion tracked in [#2226](https://github.com/KamranAsif/Godmode.exe-roguelite/issues/2226#issuecomment-6382275197). Every cell records its native thread-model readback. The shipped Windows build and all exclusive timing measurements use production Separate (2); no capture override ships.

The separate fight AA sweep measured SMAA17.695ms, SMAA+2x18.418ms, and SMAA+4x19.615ms. The aggregate 4x increment is1.920ms; individual increments were1.710,2.290,1.835ms, so one repeat exceeded2ms. High/Ultra retainC. High screen effects add0.338ms over the old Medium quality; Ultra adds1.991ms over High at4xMSAA (at2x:0.507ms and1.820ms).

The timing source commit and shared measurement/arena receipt hashes are in timing.json. Raw engine logs are private.
