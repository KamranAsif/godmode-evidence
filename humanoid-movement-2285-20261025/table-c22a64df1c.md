| Kind | Spikes/body-min | Darts/body-min | >12 m/s discontinuities | Open / contact snaps per strafe-min | Turn p95 / max deg/s |
| --- | --- | --- | --- | --- | --- |
| rifle | 4.82 -> 7.11 | 1.35 -> 1.28 | 1 -> 0 | 0.22 / 2.33 -> 0 / 3.96 | 22.92 / 599.31 -> 26.36 / 584.42 |
| pistol | 7.6 -> 12.16 | 0.84 -> 1.03 | 0 -> 1 | 0 / 1.33 -> 0.89 / 2.63 | 33.23 / 450.34 -> 44.69 / 450.34 |
| shotgun | 13.18 -> 16.44 | 1.1 -> 2.14 | 0 -> 0 | 1.25 / 9.1 -> 3.04 / 6.89 | 48.13 / 600.46 -> 58.44 / 450.34 |
| smg | 21.71 -> 16.35 | 1.69 -> 3.85 | 2 -> 1 | 4.73 / 14.3 -> 1.16 / 4.66 | 100.84 / 3575.26 -> 59.59 / 450.34 |
| marksman | 22.9 -> 4.88 | 3.63 -> 0.34 | 0 -> 0 | 1.94 / 7.48 -> 0.24 / 0.96 | 388.47 / 3599.53 -> 18.33 / 450.34 |
| grenadier | 15.46 -> 5.31 | 1.01 -> 0.26 | 0 -> 1 | 4.21 / 4.74 -> 0.24 / 0.8 | 32.09 / 3448.06 -> 25.21 / 600.46 |
| rpg | 22.64 -> 5.74 | 1.52 -> 0.26 | 0 -> 0 | 2.42 / 10.95 -> 0.44 / 5.02 | 150.11 / 3574.32 -> 21.77 / 450.34 |
| medic | 14.45 -> 11.31 | 2.7 -> 2.74 | 0 -> 1 | 3.45 / 12.65 -> 0 / 2.11 | 143.24 / 3572.03 -> 29.79 / 450.34 |
| shield | 22.31 -> 17.3 | 6.42 -> 5.4 | 1 -> 1 | 6.66 / 18.11 -> 1.53 / 1.23 | 58.44 / 3385.03 -> 36.67 / 450.34 |
| heavy | 8.03 -> 4.2 | 2.79 -> 2.31 | 0 -> 0 | 0 / 1.43 -> 0 / 0 | 179.91 / 3588.07 -> 14.9 / 450.34 |
| minigun | 6.84 -> 4.37 | 1.1 -> 1.8 | 0 -> 0 | 1.27 / 0.86 -> 0.51 / 0.57 | 67.61 / 3516.81 -> 25.21 / 450.34 |
| officer | 6.42 -> 7.54 | 0.42 -> 3.08 | 0 -> 0 | 2.73 / 3.76 -> 0.75 / 1.07 | 150.11 / 3581.2 -> 28.65 / 450.34 |
| cloaker | 97.88 -> 103.67 | 2.03 -> 2.66 | 3 -> 9 | 10.11 / 23.28 -> 11.83 / 33.83 | 110.01 / 3326.59 -> 108.86 / 3527.13 |

Every cell is before -> after. Spikes use the existing analyzer threshold of 20 m/s^2 and its body-minute denominator. Darts count episodes of three-tick displacement greater than 1.4 times a velocity envelope: the maximum reported horizontal speed over six ticks, multiplied by 50 ms, with expected travel at least 3 cm. The six-tick history allows the intentional two-tick snapshot delay while stopping. Contiguous windows are one episode. The earlier integrated-current-velocity proxy is retained separately in darts.json because it can misclassify delayed stopping motion. Discontinuities above 12 m/s are retained separately because the existing analyzer excludes them from speed statistics. Strike-associated dart episodes are counted separately in darts.json; association does not establish whether a dart is intentional. Open/contact snap rates use strafe-minutes. Headless fights do not measure client pose quality.
Final partial JSONL records omitted after engine shutdown: 6. Interior invalid records are rejected.
