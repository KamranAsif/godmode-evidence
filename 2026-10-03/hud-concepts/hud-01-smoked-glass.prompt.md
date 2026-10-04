# hud-01-smoked-glass

Tool: built-in image_gen.imagegen

## Generation prompt

Use case: compositing / polished game HUD concept art.
Output: ONE finished landscape image, 1920x1080 if possible, otherwise the closest native 16:9 size. No contact sheet, surrounding page, captions, frame or watermark.
Game: BattleDuty-aimbot, a fictional single-player FPS. Use the real game screenshot as the fixed scene. Preserve its exact framing, street or waterfront geometry, lighting, buildings, parked vehicles, visible enemies, hands and first-person gun. Keep the scene and gun immediately recognisable; do not repaint the scene into a different game. Change only the interface over the scene.
Input roles: Image 1 is the HUD-less real-game SCENE / edit target. Image 2 is Kamran's SKETCH / layout reference only. Image 3 is the prior hand-built OVERLAY / content specification only. Its old positioning and streak tiles are superseded by the sketch and the explicit corrected instructions below. Image 4 is our OWN real MAIN-MENU SCREENSHOT / authoritative desktop window chrome reference.
Originality: the sketch includes third-party reference crops. Never copy their pixels, artwork, icons, usernames, platform branding, logos or names. Create every weapon and killstreak icon yourself, with original shapes. No CoD / Call of Duty / Twitch branding or iconography.
Typography: strong condensed display letters like the game's Anton, and crisp carefully spaced monospaced small text like JetBrains Mono. High readability, refined hierarchy and balanced margins. The UI must feel art-directed and polished, not a developer wireframe.
Required in-run layout: circular minimap top-left, a large player-only kill-feed box top-right, ammunition bottom-right, and five tall narrow rounded killstreak CARDS in a horizontal row bottom-left, all numbered 1 to 5. Keep broad clear space for the game.
CRITICAL KILLSTREAK SHAPE AND HEIGHTS: follow Image 2's hand sketch, not Image 3's old horizontal tile design. Each card is much taller than wide (about 95px wide by 180px tall at 1920x1080), with a rounded NUMBER TAB ON TOP. Slots 1 and 4 are raised upward by about 70px, visibly poking above the grey cards. Their tabs are green; their bodies are dark black with a luminous GOLD original icon, gold illumination confined to the icon. Slot 1 is an original guided-missile pictogram with the label "Predator Missile"; slot 4 is an original helicopter pictogram with the label "Attack Helicopter". Slots 2, 3, 5 sit LOWER, are plain grey rounded cards, and display ONLY their number on the top tab: NO icon, NO name, NO OFF or READY words, NO extra text on disabled cards. They represent Precision Airstrike, Stealth Bomber and AC-130 but their names are not visible in these disabled states. Five separated tall cards, not a single wide tray. Keep all cards inside the image.
CRITICAL CHAT OVERLAP: the LiveTube.tv chat is a SEPARATE main-menu-style desktop window floating ON TOP OF THE LOWER PART OF THE KILL-FEED BOX, not stacked beneath it with a gap. Example geometry at 1920x1080: feed near x1390,y40,w470,h280; chat near x1460,y235,w412,h410. Their rectangles intersect over an 85px-high strip. The chat title bar visibly occludes the lower-right part of the kill-feed panel; three kill-feed rows remain legible in the upper part. Chat extends downward from the overlap. This layering must be immediately obvious.
Kill feed rows: all killer names "Kamran", each followed by an ORIGINAL small weapon silhouette and one victim name: "AshCircuit", "HarborGhost", "StaticRook". No other killers, no third-party names.
Chat window title "LiveTube.tv"; caption "CHAT PLACEHOLDER". A few short sample messages with original colourful fake usernames. No viewer count or streaming platform logos.
Ammo box: "MACHINE GUN", "08 / ∞".
Combat graphics are the ones already present in Image 3: preserve the game's white four-arm crosshair and dot at scene centre, small four warm-red diagonal rectangular kill-marker arms and thin dark outlines, and the curved red polygonal damage wedge above-left of centre. Do not invent a new reticle or arrow. Compact prompt "LOW AMMO / [R] RELOAD", clear of gun and enemies.
ABSOLUTE EXCLUSIONS: no health, armour or shield bars/numbers, no run state, wave, timer or enemies count, no killstreak progress or progress meters, no supply timer, no boss bar, no active-cheat chips or cooldown chips. No sixth streak card. Preserve the real screenshot's scene and recognisable first-person weapon.
MAIN MENU WINDOW CHROME IS FIXED IN BOTH VARIANTS. Image 4 is an actual main-menu screenshot, authoritative for both the CHAT WINDOW and CHEAT ENGINE WINDOW. Match its desktop application window design exactly: charcoal fill #111415, inner cards #090c0d, 1px slate frame #2b3338, subtly rounded 3px corners, muted white #e6edf7 and muted grey #8796a3 text, lime #a6f040 accent, JetBrains Mono regular typography, flat dark title bar about 45px tall with original small lime app icon at left, title text, and standard original-drawn minimize, maximize and close glyphs at the right. Thin slate rule below title bar. No cyan glass glow or cream paper chrome on these two windows. Copy only our OWN main-menu window styling, never its desktop wallpaper, taskbar, launcher tabs, launch button or unrelated content.
Visual treatment for HUD panels / background scoreboard ONLY: restrained polished smoked slate glass with thin cyan hairline accents and clear condensed headings. Very fine luminous edges, nuanced surface shading, crisp type and excellent spacing. Keep CHAT and CHEAT ENGINE unchanged in the exact CHARCOAL / LIME main-menu chrome specified above. Keep streak ready icons GOLD with GREEN number tabs, as in the sketch.

## Generation references (ordered)

1. D:/work/godmode-roguelite-worktrees/hud-poc-20261003/artifacts/hud-poc/base-calm.png
2. D:/work/godmode-roguelite-worktrees/hud-poc-20261003/refs/hud-sketch.webp
3. D:/work/godmode-roguelite-worktrees/hud-poc-20261003/artifacts/hud-poc/A2-fight.png
4. D:/work/godmode-roguelite-worktrees/hud-poc-20261003/artifacts/hud-poc/evidence/2026-10-01/10-trainer-maximized-cbd0b508ec.png

## Final revision prompt

Use case: compositing. Edit Image 2 HUD concept. Replace ONLY its game scene and gun backdrop with Image 1, the authoritative REAL calm waterfront screenshot. Preserve Image 1's bridge, park, trees, waterfront, first-person gun, viewpoint, geometry, colors; do not use the fight street or enemies from Image 2. Preserve every HUD element from Image 2 in identical position and design, including tall rounded raised ready cards 1 and 4 with green tabs and original gold icons, lower grey disabled cards 2/3/5 numbers only, circle minimap, kill feed, charcoal LiveTube.tv placeholder desktop window overlapping lower kill feed, ammo, center game-style crosshair/hit marker, red direction indicator, low ammo/reload prompt. No health/armor/timers/progress/cheat chips. Target 1920x1080 or closest 16:9. Scene replacement only, no UI redesign.

## Revision references (ordered)

1. D:/work/godmode-roguelite-worktrees/hud-poc-20261003/artifacts/hud-poc/base-calm.png
2. C:\Users\Kam\.codex\generated_images\01a10457-e6f7-7880-af5f-696166e43cfa\exec-ef816928-8249-46ca-979d-7fe1e6a7ab34.png

