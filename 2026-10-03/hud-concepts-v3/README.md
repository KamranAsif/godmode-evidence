# HUD concepts v3 — three separate layers

Four generated morning FPS concept frames. No game HUD code changed. Built-in image_gen used; exact prompts and final revision prompts are adjacent. Frames are native1672×941; the actual-font sheet is1920×1080.

- [Calm in-run](01-calm.png)
- [Fight with ready/active streaks](02-fight.png)
- [Loot box / cheat engine](03-loot-cheat.png)
- [Tab / cheat engine over scoreboard](04-tab-cheat.png)
- [Actual three-font specimen](three-fonts.png)

## Build-lane direction

1. Game HUD: original military-shooter treatment; Rajdhani only. Minimap/ammo/feed/scoreboard are game HUD, not desktop app windows. Five vertical capsule streak slots sit at screen bottom. Disabled pill bodies are below screen, leaving numbered tops. Ready pill slides up and reveals original icon below number; green ready, amber active. Power names follow packages/game-rules/src/killstreaks.ts. These five-slot concepts follow Kamran's sketch, not the code's six-rung inventory.
2. LiveTube.tv: Inter only, low-opacity grey box at upper-right over the kill feed. No desktop titlebar or app controls. Feed is deliberately faint beneath chat. Chat content is a placeholder.
3. Cheat engine: JetBrains Mono only, solid opaque main-menu app window on top of the game. Open for loot and Tab; only this window receives interaction when open. Gameplay remains visible around it. Foreground cheat window overlaps military scoreboard on Tab. Do not make game HUD or chat inherit this chrome.

Main menu inspected in scripts/client/desktop_trainer.ts and scripts/client/run_type.ts, plus saved trainer screenshot2026-10-01/10-trainer-maximized-cbd0b508ec.png. Colours:fill#111415,inner#090c0d,border#2b3338,white#e6edf7,muted#8796a3,lime#a6f040;1px frame,3pxradius,45px titlebar,original app icon and three window controls.

Generated frames approximate typography; use the actual supplied font binaries for implementation. Font sheet is rendered deterministically using the binaries, not generated lettering. Cheat rows are a readable sample enabled loadout with abbreviated stats, not a replacement for runtime data. Fight shows green Predator ready and amber Helicopter active. No health/armour bars,timers,progress or cheat chips.

## Fonts and licences

OFL fallback chosen for three suitable families; none is represented as CC0. All are SIL Open Font License1.1. Keep the included copyright/licence files when redistributing. Sources, exact download URLs and SHA256 hashes are in font-sources.json.

| Layer | Font | Files | Source / licence |
|---|---|---|---|
| Game HUD | Rajdhani | fonts/hud/Rajdhani-Regular.ttf, Rajdhani-SemiBold.ttf, Rajdhani-Bold.ttf | [Google Fonts source](https://github.com/google/fonts/tree/main/ofl/rajdhani), [OFL](https://github.com/google/fonts/blob/main/ofl/rajdhani/OFL.txt) |
| Stream chat | Inter | fonts/chat/Inter-Variable.ttf | [Google Fonts source](https://github.com/google/fonts/tree/main/ofl/inter), [OFL](https://github.com/google/fonts/blob/main/ofl/inter/OFL.txt) |
| Cheat engine | JetBrains Mono | fonts/cheat/JetBrainsMono-Regular.ttf, JetBrainsMono-Bold.ttf | [Official source](https://www.jetbrains.com/lp/mono/), [OFL](https://github.com/JetBrains/JetBrainsMono/blob/master/OFL.txt) |

Reference images for initial generation: approved seven-view morning concept sheet2026-10-02/visual-audit-main-5ae4aac2/concepts-2e1019a57a.png (art direction only), saved main-menu trainer screenshot (window chrome only), actual-font specimen. No runtime screenshot served as scene base. Original weapon/killstreak art; no third-party branding/assets copied.

