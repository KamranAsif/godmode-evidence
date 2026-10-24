# BattleDuty HUD visual follow-up

Replace the on-foot HUD with floating condensed type, original icons and restrained combat feedback. `HUD_STYLE` defaults to `cod`; `hud cod` / `hud legacy` provide A/B comparison. [Conventions and shared tokens](https://github.com/KamranAsif/Godmode.exe-roguelite/blob/b6b6e48a54dcefc79929b132808e2d06b5d857bf/docs/hud-cod-conventions.md).

The visual follow-up darkens the minimap using an 85% charcoal backplate independent of its clipping mask, sharpens its 1 px border, gives ready streaks full-white icons and a 3 px accent underline with dark shadows, removes the rifle's detached muzzle dot, and moves score receipts 92 px right and 20 px up with an upward stack and shorter 900 ms lifetime. The drone device now says READY, leaving one [E] HOLD radial prompt in the HUD. Shared corner insets, full-contrast prompts and readable game names follow the UI inventory. The streamer overlay remains independent.

Checked in a fresh Windows debug Playtest export of `b6b6e48a5`: same frozen fight at 1920x1080 for both styles, normal authoritative kills and ammunition, stream layer hidden. The post-rebase pnpm test passed all 11 steps, including lint, formatting, build, unit suites and CLI tests (289 passed, 6 skipped). The 74 focused HUD/layout/stream tests also passed. Initial `kamran-reviewer`: no blocking findings; no additional review round for this requested visual follow-up.

| Current 1080p evidence | Legacy | CoD |
| --- | --- | --- |
| Matched frozen fight | [Still](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/legacy-1080-r2-a40bac7ca0.png) | [Still](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/cod-1080-r2-06be5fad2e.png) |
| Minimap, 200% | [Crop](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/legacy-minimap-200pct-r2-ccf5eac630.png) | [Crop](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/cod-minimap-200pct-r2-10a33fd4dc.png) |
| Streaks, 200% | [Crop](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/legacy-streaks-200pct-r2-95bc21958d.png) | [Crop](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/cod-streaks-200pct-r2-4838588449.png) |
| Kill feed, 200% | [Crop](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/legacy-kill-feed-200pct-r2-f19b931be1.png) | [Crop](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/cod-kill-feed-200pct-r2-865f975aeb.png) |

CoD, revised 1080p:
<img width="800" src="https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/cod-1080-r2-06be5fad2e.png" />

Legacy, matched frame:
<img width="800" src="https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/legacy-1080-r2-a40bac7ca0.png" />

Ready/idle contrast reference (identical visual tokens, earlier e2b2a81e1 export):
<img width="696" src="https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/hud-cod-20261024/cod-ready-idle-streaks-200pct-r2-f35491a4f1.png" />

<details><summary>First-pass 1440p/motion evidence</summary>

[First-pass evidence index](https://github.com/KamranAsif/godmode-evidence/blob/main/hud-cod-20261024/evidence-index-73b516e702.md) includes the 2560x1440 check, overlay-on coexistence still, low-health vignette, ammo crops and both 10-second fight clips. These precede the four visual adjustments above.

</details>
