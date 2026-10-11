# Item 9: all city road markings

PR: https://github.com/KamranAsif/Godmode.exe-roguelite/pull/1741

Original paint audit and native before images use 3e339201c. The yellow coverage report compares the previously reviewed fragmented generator at 9851aa275 with final ribbons on identical current geometry. Each native image is a separate 2560 x 1440 capture.

## Audit

| Issue type | Before | After |
|---|---:|---:|
| paint_on_sidewalk | 209 | 0 |
| overlapping_markings | 2829 | 0 |
| paint_over_ground_detail | 1 | 0 |
| missing_curb_ramp_pair | 115 | 0 |
| partial_crosswalk | 106 | 0 |
| crosswalk_over_ground_detail | 37 | 0 |
| centre_coverage_below_90 | 93 | 0 |
| centre_gap_over_1m | 94 | 0 |

Total issue incidences: 3484 -> 0. Several incidences can belong to one location.

## Whole city and all areas

| Area | Before | After |
|---|---|---|
| whole-city | [before](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-11/whole-city-before-bf618c97df.png) | [after](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-11/whole-city-after-406b4d1cfd.png) |
| water-washington | [before](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-11/water-washington-before-299eb4ca44.png) | [after](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-11/water-washington-after-0c7bd712d3.png) |
| empire-fulton | [before](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-11/empire-fulton-before-4623b71069.png) | [after](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-11/empire-fulton-after-b38d5699e0.png) |
| dock-old-fulton | [before](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-11/dock-old-fulton-before-b888ab4102.png) | [after](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-11/dock-old-fulton-after-c238d90bf8.png) |
| old-fulton-inland | [before](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-11/old-fulton-inland-before-d522233a5e.png) | [after](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-11/old-fulton-inland-after-fae4e3852e.png) |
| pier-1 | [before](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-11/pier-1-before-3e546cef12.png) | [after](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-11/pier-1-after-757abab3b8.png) |
| sands-pearl | [before](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-11/sands-pearl-before-5631eb151e.png) | [after](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-11/sands-pearl-after-7623863edf.png) |

Native whole city: [before](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-11/native-whole-city-before-c351322dbd.png) / [after](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-11/native-whole-city-after-c88389b37a.png)

## Four worst spots, native full resolution

| Spot | Before | After |
|---|---|---|
| 01-diagonal-sidewalk | [before](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-11/01-diagonal-sidewalk-before-4ef43afba6.png) | [after](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-11/01-diagonal-sidewalk-after-728afad04c.png) |
| 02-stray-stop-line | [before](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-11/02-stray-stop-line-before-dbfb82a756.png) | [after](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-11/02-stray-stop-line-after-deebc75c52.png) |
| 03-overlapping-ladders | [before](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-11/03-overlapping-ladders-before-4369d50971.png) | [after](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-11/03-overlapping-ladders-after-a9301871f0.png) |
| 04-manhole-crosswalk | [before](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-11/04-manhole-crosswalk-before-4e8e8bfc9b.png) | [after](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-11/04-manhole-crosswalk-after-e579e6b5c0.png) |

## Three previously gappy streets

| Street | Original before | Final after |
|---|---|---|
| 05-long-avenue | [before](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-11/05-long-avenue-before-244d6b70ee.png) | [after](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-11/05-long-avenue-after-10d154badf.png) |
| 06-eastern-avenue | [before](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-11/06-eastern-avenue-before-6d5e8d4ba1.png) | [after](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-11/06-eastern-avenue-after-530c4d5d82.png) |
| 07-curved-street | [before](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-11/07-curved-street-before-6f2890f8b6.png) | [after](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-11/07-curved-street-after-18703acec0.png) |

Per-street coverage: [table](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-11/centre-coverage-628e01616b.md) / [CSV](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-11/centre-coverage-822c942311.csv)

Native final paint audit: {"centre": 14225, "crosswalk": 210, "lane": 25, "stop": 25}. Every native street segment meets 90% coverage and a maximum unexplained gap of 1 m.

Validation: pnpm format, pnpm build, pnpm lint (8 existing warnings), 46 focused unit tests; 39,157 native placements / 0 violations / 5,731 physical probes / 1,493 reachable enemy origins. Native surface audit: 169 straight runs, zero folds, zero paint violations.

Native final AO: {"channel": "CUSTOM0.r occlusion", "enabled": true, "extraVertexBytes": 18077140, "installMs": 0, "instances": 2557, "lodLevels": 0, "meshes": 410, "missing": 0, "receivers": 1979, "vertices": 4519285}.

AO append: 282 existing receipts preserved and byte/hash verified; 2 new native geometry receipts. AO and asset-budget unit tests pass.

[Full native source-validation report](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-11/native-source-validation-ec341f5102.json)

Native rendered coverage: 94/94 street segments at 100%, zero unexplained gaps. Conservative compressed-face source coverage: 99.97% overall, minimum 97.02%. Reviewed fragmented source generator: 37.54% overall; 91 segments below 90%.

[Per-street before/conservative-after/native-after CSV](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-11/native-centre-coverage-47877e7024.csv) / [Native marking, surface and AO audit](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-11/native-marking-audit-4faaa6f27c.json)

The generator retains 28 complete crossings (210 stripes). The four worst original sites contained unsupported, overlapping or obstructed crossing plans; those plans are rejected by the rules.
