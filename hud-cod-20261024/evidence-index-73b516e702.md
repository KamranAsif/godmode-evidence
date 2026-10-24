# BattleDuty CoD HUD - Windows Playtest evidence

Replace the panelled on-foot HUD with a restrained military-shooter treatment: floating Barlow Condensed type, original line icons, tabular ammo, own-kill feed, confirmed +100 score receipts and multikill medals. `HUD_STYLE` defaults to `cod`; `hud cod` / `hud legacy` redraw the same frozen fight for A/B. [Conventions and tokens](https://github.com/KamranAsif/Godmode.exe-roguelite/blob/5bf96e8429676e06814a9d1e89c5b8e89951d9c4/docs/hud-cod-conventions.md).

CoD mode follows the fixed visibility list, including the edge-only health vignette and radial care-drone hold prompt. `hudoverlay off/on` is capture-only and refuses release builds at registration, handler and rendering boundaries. The OBS program remains a separate lane.

Validation: `pnpm test` ran all 11 tiers after integration: 10 passed; a Windows process-identity assertion failed in the CLI tier. Its isolated retry and the complete CLI tier passed (289 passed, 6 skipped). The earlier root run passed 11/11. TypeScript, 20 focused HUD/stream/character-detail tests and a headless engine smoke passed: 30/90 ammo, all five slots ready, native CanvasLayer hide/restore, and Tab with the CoD HUD visible. Lint: zero errors, 12 existing max-lines warnings. `kamran-reviewer`: no blocking findings.

Proof uses the Windows debug Playtest export of `0f01a6a69`. The final branch includes main through `d1b3f75f9`; the later stream-layer integration was checked headlessly and main's character-detail update passed focused tests. Combat HUD geometry, styling and cues match the export. Kills, score, shots and reloads are server-owned gameplay; the review loadout uses invincibility/radar and rank-5 damage/crit/projectiles.

| Native evidence | Legacy | CoD |
| --- | --- | --- |
| 1920x1080, same frozen fight | [Still](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/legacy-1080-a96cd64a38.png) | [Still](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/cod-1080-2c1453d887.png) |
| 2560x1440, same frozen fight | [Still](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/legacy-1440-e4b7beb049.png) | [Still](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/cod-1440-e46d2087bf.png) |
| 10-second fight, game-only audio | [Clip](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/legacy-fight-10s-6c2687227c.mp4) | [Clip](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/cod-fight-10s-bddfc07aa4.mp4) |

Legacy, 1080p:
<img width="640" src="https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/legacy-1080-a96cd64a38.png" />

CoD, 1080p:
<img width="640" src="https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/cod-1080-2c1453d887.png" />

<details><summary>1440p and overlay coexistence</summary>

Legacy, 1440p:
<img width="640" src="https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/legacy-1440-e4b7beb049.png" />

CoD, 1440p:
<img width="640" src="https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/cod-1440-e46d2087bf.png" />

CoD with the existing stream layer enabled:
<img width="640" src="https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/cod-overlay-on-1440-1d45b840f8.png" />

</details>

| 200% native-pixel crop | Legacy | CoD |
| --- | --- | --- |
| Ammo | [Crop](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/legacy-ammo-200pct-ab1504f5cf.png) | [Crop](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/cod-ammo-200pct-893ee197c2.png) |
| Kill feed | [Crop](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/legacy-kill-feed-200pct-68f371d321.png) | [Crop](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/cod-kill-feed-200pct-f2cb61566b.png) |
| Streak slots | [Crop](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/legacy-streaks-200pct-76f8a99813.png) | [Crop](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/cod-streaks-200pct-d56fadcc0e.png) |
| Minimap | [Crop](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/legacy-minimap-200pct-ddd2714606.png) | [Crop](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/cod-minimap-200pct-99294becb6.png) |

[Low-health vignette](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/cod-low-health-1080-38945517f6.png) - the 15-health debug check, with no health bar. [Evidence folder](https://github.com/KamranAsif/godmode-evidence/tree/main/hud-cod-20261024).
