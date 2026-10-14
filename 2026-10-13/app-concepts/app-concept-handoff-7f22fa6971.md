# BattleDuty (patched) - Mac image generation handoff

2026-10-13. Windows phase complete: captures, research, direction briefs and nine image prompts. No concept images, source changes or PR. Kamran must approve a direction before implementation.

## Before captures

Real game at 2560x1440, origin/main fb22bde1a, GodotJS 4.6.1, D3D12 on AMD Radeon RX 9070 XT. Captured with godot-cli game run --full --offscreen --offscreen-size 2560x1440 under a two-minute command-scoped GPU capture hold. Renderer stopped and session ended. All six PNG dimensions checked and the contact sheet visually reviewed. No script errors in the capture log.

Isolated capture save: onboarding skipped, one synthetic completed stream, $250 wallet. This makes the actual UPGRADES tab visible. The screenshots are real game renders, not mockups. The current app uses the approved warm graphite OS palette and Selawik; LiveTube content uses Inter and purple. The proposals use Inter/purple inside the app while preserving the shared OS chrome.

- [Before contact sheet](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-13/app-concepts/before-contact-sheet-bf58ecac18.png)
- [CHEATS](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-13/app-concepts/before-cheats-2b0f0a5ac3.png)
- [UPGRADES](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-13/app-concepts/before-upgrades-0fe330ff9a.png)
- [SETTINGS](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-13/app-concepts/before-settings-2708e0a7df.png)
- [DEBUG](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-13/app-concepts/before-debug-41f6324978.png)
- [Desktop](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-13/app-concepts/before-desktop-db806a2f8f.png)
- [LiveTube shared chrome](https://raw.githubusercontent.com/KamranAsif/godmode-evidence/main/2026-10-13/app-concepts/before-livetube-chrome-41b8734627.png)

## Research and proposed takeaways

These are design interpretations, not proposals to recreate the reference games' interfaces.

- [Modern Warfare 2019 Gunsmith](https://blog.activision.com/call-of-duty/2019-07/Call-of-Duty-Modern-Warfare-Gunsmith-Teaser-is-Here): dark object staging, prominent equipment previews and named slots. A's cinematic arsenal takes this confidence, with fewer decisions and plainly labeled effects.
- [Valorant agents and progression](https://playvalorant.com/en-gb/news/game-updates/progression-update-explainer-faq/), [agent selection screenshot](https://www.mobygames.com/game/146290/valorant/screenshots/windows/1013260/): large character identity, readable selection frames and cosmetic progression. Collection screenshots also informed B's category-based equipment browsing.
- [Apex character and weapon customization](https://help.ea.com/en/articles/apex-legends/how-to-customize-legends-and-weapons/): selecting a cosmetic should immediately relate to the character preview; owned and locked items remain distinguishable. B makes skins and their viewer gain part of the run identity.
- [Destiny 2 inventory and buildcrafting](https://www.bungie.net/7/en/News/article/buildcrafting): make the whole equipped build visible with a character anchor and a focused detail view. A borrows the association between equipment slots and the body.
- [Hades talent context](https://www.supergiantgames.com/blog/6/), [Mirror of Night visual reference](https://www.neoseeker.com/hades-2020/Mirror_of_Night): legible rows align effect, rank, price and completion. C borrows the progression rhythm without fantasy ornament.
- [Hypnospace Outlaw](https://www.thatwhichismedia.com/games/hypnospaceoutlaw/) and [Hacknet](https://www.fellowtraveller.games/hacknet/): fictional software can carry character through windows, status and authorship. Use BattleDuty's patch label and cushion's dealer note as the shady trainer fiction. Avoid real cheat product references or functional hacking instructions.

Visual screenshot research covered all five game families through web image search. No reference-game logos, artwork, weapon models or icon assets are included in this handoff or to be copied into concepts.

## Direction briefs

### A - Arsenal Studio

A premium arsenal with a large operator, a spotlighted starting weapon and a clean equipment rail.
Focused upgrade comparisons make purchases feel deliberate; the patched fiction stays quiet and believable.

Cinematic, mostly rectangular, spacious. Modern Warfare staging plus Destiny's whole-build overview. A hero stage and a short equipment rail replace the current trainer's empty blocks. Upgrades use selected-item comparisons; cheats use an installed patch manifest. Keeps Inter, purple content and existing OS chrome.

### B - Spotlight Collection

A bold character-led collection makes skins, viewer gains and the next run's identity the hero.
Big cards and visible unlock tracks make it feel like a premium launcher carrying a questionable patch.

Editorial scale, asymmetry and flat purple graphic panels. Valorant identity plus Apex cosmetic preview. Large character left, clear selections right, browsable collections below. Upgrades are grouped card shelves; cheats become a readable installed collection. Keeps Inter, purple content and existing OS chrome.

### C - Patch Ledger

A polished underground utility puts effects, ranks, prices and unlock progress directly in the player's path.
The character anchors the loadout; an aligned upgrade ledger makes permanent progress easy to compare.

Precise rows, aligned columns and restrained status details. Hades progression rhythm plus authored fictional utility software. Numbered loadout modules sit beside a large character. Upgrades and cheats prioritize complete plain-language rows. Keeps Inter, purple content and existing OS chrome; no terminal monospace.

## Shared prompt - prepend to each screen prompt

Use case: ui-mockup. Create one polished game-app concept screenshot at 2560x1440, a single screen rather than a collage. Show the fictional desktop around the BattleDuty (patched) app. Use the before CHEATS image for desktop, window position and size; use the LiveTube image for exact unified title bar and minimize/maximize/close geometry. Keep that existing warm graphite OS chrome and desktop unchanged. Do not introduce another title bar. Title: "BattleDuty (patched)".

Inside the app use Inter, with #0E0E10 base, #18181B panels, #26262C alternate surfaces, #1F1F23 inputs, #EFEFF1 text, #ADADB8 muted text, #9146FF accent and #BF94FF selected links. Purple indicates selection or purchase; state words and icons also distinguish ownership. Give all important text comfortable contrast and readable scale. Navigation: "LOADOUT", "UPGRADES", "CHEATS"; SETTINGS is a quiet utility. Highlight the requested page. Wallet: "$250".

Original fictional operator, firearms and icons only. No reference-game logos, characters or copied art. No illegible filler, excessive bloom, real cheat instructions or programming code. Bought cheats are always on, so never add on/off toggles. Use ASCII hyphens only. Exact copy below must be legible. Loadout choices, skin benefits and example unlock thresholds are proposals, not existing approved mechanics.

Continuity: generate LOADOUT first for each direction. Use that generated image as a visual reference for its UPGRADES and CHEATS pages, preserving operator identity, equipment, spacing, chrome, palette and type. The three directions must differ through layout and presentation, not just accent color.

## Nine screen prompts

### A1 - Arsenal Studio / LOADOUT

Use the shared prompt. Cinematic premium arsenal, clean rectangular panels, restrained purple rim light and a spacious dark stage. A large full-body original tactical operator occupies the center/right, with a well-lit rifle preview beneath. The operator is the visual hero without covering controls. A compact left equipment rail shows "Starting gun" with Assault Rifle selected, Pistol available and Shotgun locked; "Armour" with Kevlar selected and Light Vest available; "Skin" with Violet Circuit selected, "Adds 10% more viewers", and three named swatches. A bottom-right "Killstreak setup" strip has "Predator - 5 kills - EQUIPPED", "Airstrike - 7 kills - EQUIPPED", and "Slot 3 - LOCKED - Unlock $40". Bottom footer summarizes the selected kit and offers one purple "GO LIVE" button. Small status: "PATCH READY". No gunsmith attachment maze.

### A2 - Arsenal Studio / UPGRADES

Use the shared prompt and A1 as continuity reference. Preserve its cinematic surfaces, strong rectangular spacing and quiet operator silhouette, but prioritize purchasing. Left categories: "Combat", "Audience", "Killstreaks", "Loot boxes". Center cards show "Tougher - Rank 1/5 - +5% max health - Next $80", "Harder Hitting - Rank 0/5 - +4% gun damage - $40", and "Unlimited Ammo - OWNED - Your reserve refills itself". A locked card reads "Stealth Bomber - $60 - LOCKED", "A bomber carpets the line you aim down", "Finish 5 streams - 3/5", with visible progress. Tougher is selected. A right detail pane reads "CURRENT +5% max health", "NEXT +10% max health", "After purchase: $170" and "BUY NEXT RANK $80". Header: "Permanent upgrades" and "Bought upgrades carry into every run". Clearly separate price, ownership and unlock requirement.

### A3 - Arsenal Studio / CHEATS

Use the shared prompt and A1/A2 references. Preserve the arsenal identity and chrome. A large "Installed patches" panel occupies the left two-thirds. Subtitle: "Bought cheats are always on." Rows: "Aimbot - INSTALLED", "Hold right mouse to lock; left mouse to fire"; "Unlimited Ammo - ALWAYS ON", "Your reserve refills itself. No more picking up ammo"; "Enemy Radar - NOT INSTALLED - $100", "Your minimap shows every enemy", with "VIEW UPGRADE". Use concise original icons and clear state labels. Right side shows a subdued original operator outline with three violet patch markers and a compact "BattleDuty patch active" status card. Dealer note: "cushion: keep the app off-screen. chair talk only." Make it feel like a premium loadout app containing questionable patches. No toggles, fake command console or real cheat software branding.

### B1 - Spotlight Collection / LOADOUT

Use the shared prompt. Bold editorial collection with clean flat graphics and a confident purple geometric backdrop. A large full-body original operator occupies the left half; faint oversized "VIOLET CIRCUIT" lettering sits behind the character. Below, a horizontal skin carousel shows "Standard", "Violet Circuit - +10% viewers - EQUIPPED", and "Signal Gold - LOCKED" with original portraits. Right-side choice panels present "Starting gun": Assault Rifle selected, Pistol available, Shotgun locked; "Armour": Kevlar selected, Light Vest available. Below is "Killstreak setup": Predator, 5 kills, EQUIPPED; Airstrike, 7 kills, EQUIPPED; Slot 3, LOCKED, Unlock $40. A concise readout states "Skin bonus: 10% more viewers" next to a purple "GO LIVE" button. Generous spacing and large readable card names. Character preview and selection feel immediately connected.

### B2 - Spotlight Collection / UPGRADES

Use the shared prompt and B1 continuity reference. Replace the hero stage with grouped landscape card shelves while retaining its bold graphic identity. Groups: "Combat", "Grow your channel", "Killstreaks", "Loot boxes". Each card has a plain effect, rank pips, next price and a worded state. Show Tougher, Rank 1/5, +5% max health -> +10%, Next $80, AVAILABLE; Harder Hitting, Rank 0/5, +4% gun damage, $40, AVAILABLE; Unlimited Ammo, reserve refills itself, OWNED. Select Viewer Growth in a purple frame: "Rank 1/4", "+25% -> +50% viewers from stream moments", "Next rank $300", "$50 more needed". Its expanded right detail card explains current and next effects. Show a locked Stealth Bomber card: $60, a bomber carpets the line you aim down, Finish 5 streams, 3/5 progress. Header: "Permanent upgrades". Never hide effects behind hover.

### B3 - Spotlight Collection / CHEATS

Use the shared prompt and B1/B2 references. A graphic installed collection with two broad columns of large tiles, lively original illustrations and disciplined spacing. Header: "Installed cheats". Subtitle: "Bought cheats are always on." Selected Aimbot tile has an original purple target illustration, "INSTALLED", and "Hold right mouse to lock; left mouse to fire". Unlimited Ammo has an original magazine illustration, "ALWAYS ON", and "Your reserve refills itself. No more picking up ammo". An outlined Enemy Radar tile says "NOT INSTALLED - $100", "Your minimap shows every enemy", and "VIEW UPGRADE". A selected-patch detail panel makes control hints larger, not more technical. Small patch stamps and a footer "cushion: keep the app off-screen. chair talk only." supply the shady fiction. Keep playful collector confidence without turning the page into a storefront ad.

### C1 - Patch Ledger / LOADOUT

Use the shared prompt. A polished underground utility, precise rows, generous alignment and restrained status accents. Use Inter throughout, never terminal monospace. Full-height original tactical operator at right occupies about 40% of the content. Left contains four numbered modules: "01 Starting gun" with Assault Rifle selected, Pistol available, Shotgun locked; "02 Armour" with Kevlar selected and Light Vest available; "03 Skin" with Violet Circuit selected, named swatches, "Adds 10% more viewers"; "04 Killstreak setup" with Predator, 5 kills, EQUIPPED; Airstrike, 7 kills, EQUIPPED; Slot 3, LOCKED, Unlock $40. Selected modules use thin purple rules rather than glowing boxes. Footer: "PATCH READY", a readable kit summary and "GO LIVE". Small software status details reinforce patch authorship while leaving equipment choices dominant.

### C2 - Patch Ledger / UPGRADES

Use the shared prompt and C1 continuity reference. A carefully aligned ledger with clear group dividers: "Combat", "Audience", "Killstreaks", "Loot boxes". Columns: "Upgrade", "What it does", "Rank", "Next price", "State". Rows: Tougher, +5% max health -> +10%, 1/5, $80, AVAILABLE; Harder Hitting, +4% gun damage, 0/5, $40, AVAILABLE; Unlimited Ammo, reserve refills itself, OWNED with no next purchase price; Viewer Growth, +25% -> +50% viewers from stream moments, 1/4, $300, NEED $50. Stealth Bomber row: a bomber carpets the line you aim down, $60, LOCKED, Finish 5 streams, 3/5 progress. Tougher is selected with a restrained purple rule. Detail strip: "CURRENT +5%", "NEXT +10%", "After purchase $170", "BUY NEXT RANK $80". Header: "Permanent upgrades". Readable progression beats decorative imagery.

### C3 - Patch Ledger / CHEATS

Use the shared prompt and C1/C2 references. A premium patch manifest with clean rows and clear column headings: "Patch", "What it does", "Controls", "State". Header: "Installed patches". Subtitle: "Bought cheats are always on." Aimbot row: "Locks your aim onto enemies", "Right mouse: lock. Left mouse: fire", "INSTALLED". Unlimited Ammo row: "Your reserve refills itself. No more picking up ammo", no extra controls, "ALWAYS ON". Enemy Radar row: "Your minimap shows every enemy", "NOT INSTALLED - $100", "VIEW UPGRADE". A selected row expands into a short, readable effect explanation. Use a narrow "BattleDuty patch active" strip and discreet violet state markers. Footer: "cushion: keep the app off-screen. chair talk only." The fiction comes from the patch manifest and dealer authorship, not technical jargon or real bypass instructions.

## Mac lane delivery and QA

Use the built-in image generation tool, one call per screen. Load the actual before and LiveTube captures as references. Produce nine individual 2560x1440 images; inspect legibility, exact copy, prices, state labels, selected navigation and consistent chrome. Verify large character, starting gun, armour, viewer-producing skins and streak setup on all three LOADOUT screens. Verify effect, ownership, next price and progress on every UPGRADES screen. No misleading cheat toggles.

Make one 2x2 sheet per direction: BEFORE / LOADOUT / UPGRADES / CHEATS. The BEFORE tile is the real CHEATS capture, including desktop. Make one overview with directions as rows and proposed screens as columns, plus a before reference strip. Add "Concept proposal - approval required" outside the app images. Upload individual images and all four sheets with tools/pr-image --prefix 2026-10-13/app-concepts/. Return URLs and each direction's two-line pitch. Stop before implementation.
