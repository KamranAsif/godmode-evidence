# BattleDuty-aimbot HUD concept preview

Concept composites for Kamran's approval, 2026-10-03. No game HUD code changed.
Every image is exactly 1920 × 1080, composited over this lane's real first-person
Godot screenshot with the gun visible and photo mode active.

| Preview | Calm waterfront / bridge | Street fight |
| --- | --- | --- |
| A — sketch layout | [A-calm.png](A-calm.png) | [A-fight.png](A-fight.png) |
| A2 — sketch plus retained combat feedback | [A2-calm.png](A2-calm.png) | [A2-fight.png](A2-fight.png) |
| B — Tab scoreboard and enabled-cheat panel | | [B-tab.png](B-tab.png) |

A has the circular minimap, player-only kill feed, LiveTube.tv chat placeholder,
ammo, and five number-key streak slots. Slots 1 and 4 illustrate ready states.
The first five actual streak names are used, through AC-130. The game's sixth
streak, Juggernaut, is outside this requested five-slot concept.

A2 adds only the existing crosshair, hit marker and damage-direction geometry,
plus reload / low-ammo prompts. The calm image illustrates the reload state; the
fight image illustrates a kill hit marker, a mature damage wedge, and low ammo.
Crosshair coordinates, outlines, hit-marker size/colour and the 18-point damage
wedge come from `scripts/game_ui.ts`, `scripts/hud_layout.ts`,
`scripts/client/hud_controller.ts` and `scripts/client/admin_hit_indicator.ts`.
Their 1280 × 720 game viewport coordinates are scaled 1.5× to the screenshot.
They are code-derived composites rather than new live HUD captures. The low-ammo
prompt is a concept addition; the current reload wording is retained.

The chat is explicitly a placeholder. Names, chat messages, minimap cartography,
ammo, leaderboard values and HUD states are illustrative. The Tab panel shows
every enabled module in its sample build: Drone L3, RPG L2, Lag Bullets L4,
Armor L3, Magazine L2, Shield L2, and Map hack. Levels and descriptions are
generated from the real `crowd_builds.ts` rules; the permanent ADS aimbot is also
shown. The fake scoreboard does not imply multiplayer implementation.

Anton and JetBrains Mono are the game's own fonts. Panel accents follow
`RUN_COLORS`. All killstreak and weapon icons are original geometric drawings.
Private sketch crops were consulted only for layout and feel; none of their
artwork, icons, names or pixels are included.

Base game revision: `5d5a0b57d` (`origin/main` when this worktree was created).
Capture instance: `hud-poc-20261003`; photo-mode action returned active=true.
The street fight uses actual live soldiers repositioned with supported runtime
actions. Magenta enemy attack tells and muzzle effects belong to the raw game
capture, not the proposed HUD.

Godot launched only after the clear signal. The owned run was stopped when lane C
announced its rebake; all subsequent work was image compositing.
