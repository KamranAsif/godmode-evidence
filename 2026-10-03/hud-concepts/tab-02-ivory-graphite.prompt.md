# tab-02-ivory-graphite

Tool: built-in image_gen.imagegen

## Generation prompt

Use case: compositing / polished game HUD concept art.
Output: ONE finished landscape image, 1920x1080 if possible, otherwise the closest native 16:9 size. No contact sheet, surrounding page, captions, frame or watermark.
Game: BattleDuty-aimbot, a fictional single-player FPS. Use the real game screenshot as the fixed scene. Preserve its exact framing, street or waterfront geometry, lighting, buildings, parked vehicles, visible enemies, hands and first-person gun. Keep the scene and gun immediately recognisable; do not repaint the scene into a different game. Change only the interface over the scene.
Input roles: Image 1 is the HUD-less real-game SCENE / edit target. Image 2 is Kamran's SKETCH / layout reference only. Image 3 is the prior hand-built OVERLAY / content specification only. Its old positioning and streak tiles are superseded by the sketch and the explicit corrected instructions below. Image 4 is our OWN real MAIN-MENU SCREENSHOT / authoritative desktop window chrome reference.
Originality: the sketch includes third-party reference crops. Never copy their pixels, artwork, icons, usernames, platform branding, logos or names. Create every weapon and killstreak icon yourself, with original shapes. No CoD / Call of Duty / Twitch branding or iconography.
Typography: strong condensed display letters like the game's Anton, and crisp carefully spaced monospaced small text like JetBrains Mono. High readability, refined hierarchy and balanced margins. The UI must feel art-directed and polished, not a developer wireframe.
Required Tab layout: one substantial in-game scoreboard panel in the centre, with the player "Kamran / YOU" as its highlighted first row; random ORIGINAL fake player names below; a SEPARATE FLOATING CHEAT ENGINE desktop app window ON TOP OF the scoreboard; LiveTube.tv chat placeholder on the right OVERLAPPING the scoreboard's outer right edge like the sketch. Keep gameplay and first-person gun recognisable around and behind the translucent panel. No minimap, killstreak ladder or bottom combat HUD on this Tab screen.
Scoreboard title "BATTLEDUTY". Small control hint "HOLD [TAB]". Columns "PLAYER", "KILLS", "SCORE". Rows: "Kamran / YOU" 147 18,420; "NeonQuarry" 132 16,800; "FrostPacket" 118 14,920; "GlassComet" 95 12,350. No timer column.
Floating cheat engine heading "CHEAT MENU / ALL ENABLED"; columns "MODULE", "LEVEL", "CURRENT STATS". Show ALL seven enabled modules, evenly spaced, readable verbatim:
"Drone" | "3 / 5" | "2 drones, 0.50 shots, 5.0/s"
"RPG" | "2 / 5" | "Every 3.6 s, 7.0 shots, 3.3 m blast"
"Lag Bullets" | "4 / 5" | "65% slow for 2.6 s, +21% damage taken"
"Armor" | "3 / 5" | "Take 18% less damage"
"Magazine" | "2 / 5" | "Magazine +100%, reloads 36% faster"
"Shield" | "2 / 5" | "A 40 shield that refills after 5 s unhit"
"Map hack" | "—" | "See enemies through walls within 45 m, with their health"
Small footer "AIMBOT / ADS LOCK ON • ENABLED". Cheat descriptions are text, never health/armour/progress bars.
Chat title "LiveTube.tv", caption "CHAT PLACEHOLDER". A few short sample messages with original colourful fake names. It overlaps only the outer right margin, never hides the cheat level/stat text.
No CoD or Twitch branding, copied reference names or reference icons. No health or armour meters, no boss health bar, no run timers, no progress meters, no supply timers, no additional widgets. New original small module symbols may be used but must not replace the text.

CRITICAL FLOATING WINDOW LAYERING: the scoreboard is a background game panel, NOT the cheat engine's parent frame. The Cheat Engine has its OWN full desktop application title bar, app icon, minimize/maximize/close controls, border and drop shadow, matching Image 4 EXACTLY. It floats in front of the scoreboard's lower-middle portion and overlaps its edges. Scoreboard title and upper player rows remain visible BEHIND it. Visually distinguish this foreground window from the background scoreboard. Example at 1920x1080: scoreboard x220,y120,w1300,h820; cheat engine x350,y470,w1170,h510; chat x1460,y260,w410,h420, in front of the right edge of both. Keep all seven module rows and their full level/stat text readable. Chat may overlap the outer blank right margin of the cheat window but never its data.
Use a title bar label "BattleDuty-aimbot.exe // cheat engine" on the floating cheat window and "LiveTube.tv" on the floating chat. Both must share the precise main-menu desktop app window styling from Image 4, regardless of the treatment of the background scoreboard.
MAIN MENU WINDOW CHROME IS FIXED IN BOTH VARIANTS. Image 4 is an actual main-menu screenshot, authoritative for both the CHAT WINDOW and CHEAT ENGINE WINDOW. Match its desktop application window design exactly: charcoal fill #111415, inner cards #090c0d, 1px slate frame #2b3338, subtly rounded 3px corners, muted white #e6edf7 and muted grey #8796a3 text, lime #a6f040 accent, JetBrains Mono regular typography, flat dark title bar about 45px tall with original small lime app icon at left, title text, and standard original-drawn minimize, maximize and close glyphs at the right. Thin slate rule below title bar. No cyan glass glow or cream paper chrome on these two windows. Copy only our OWN main-menu window styling, never its desktop wallpaper, taskbar, launcher tabs, launch button or unrelated content.
Visual treatment for HUD panels / background scoreboard ONLY: distinct polished ivory / graphite, off-white lightly translucent surfaces, deep ink headings and restrained thin rules. This treatment applies to the kill feed, ammo panel, minimap frame and background scoreboard ONLY. Keep CHAT and CHEAT ENGINE unchanged in the exact CHARCOAL / LIME main-menu chrome specified above. Killstreak cards remain as the sketch: ready cards DARK with GOLD lit icons and GREEN top number tabs, disabled cards plain GREY with only numbers, staggered in height.

## Generation references (ordered)

1. D:/work/godmode-roguelite-worktrees/hud-poc-20261003/artifacts/hud-poc/base-fight.png
2. D:/work/godmode-roguelite-worktrees/hud-poc-20261003/refs/tab-screen-sketch.png
3. D:/work/godmode-roguelite-worktrees/hud-poc-20261003/artifacts/hud-poc/B-tab.png
4. D:/work/godmode-roguelite-worktrees/hud-poc-20261003/artifacts/hud-poc/evidence/2026-10-01/10-trainer-maximized-cbd0b508ec.png

## Final revision prompt

Use case: precise-object-edit. Edit Image 1 concept with ONE layout change: enlarge the BACKGROUND scoreboard frame and backing panel so the two foreground desktop app windows visibly OVERLAP it. Keep scoreboard top-left and all four player rows/columns/title in place. Extend scoreboard right edge to about 86% of image width so it passes BEHIND the chat window (chat starts around 78%). Extend scoreboard bottom to about 88% of image height so it passes BEHIND the separate cheat engine window. Preserve the scoreboard's ivory graphite treatment. Keep foreground cheat engine and LiveTube.tv chat windows exactly as shown: same positions, dimensions, charcoal desktop titlebars, lime app icons, JetBrains Mono, slate frames, controls, text, cheat levels and stats. These remain opaque floating windows ON TOP of scoreboard, not inset panels. Preserve real game fight screenshot and gun, all text and original icons. Do not add UI or invented bars/timers. 1920x1080 or closest16:9. The only change is extend scoreboard background bounds behind both windows.

## Revision references (ordered)

1. C:\Users\Kam\.codex\generated_images\01a10457-e6f7-7880-af5f-696166e43cfa\exec-040e6ff1-3426-43af-9e0b-927620b30bc1.png

