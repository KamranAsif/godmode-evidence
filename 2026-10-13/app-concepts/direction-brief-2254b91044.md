# BattleDuty (patched) app concept brief - 2026-10-13

Status: research and generation brief. No concept images have been generated. The built-in image generation tool is unavailable in this session. No implementation or PR is authorized by this brief. Kamran must approve a direction before implementation.

## Design contract

- Nine individual images at 2560x1440: LOADOUT, UPGRADES and CHEATS for each of A, B and C.
- Show the fictional desktop around an app window; keep one window geometry across every screen and direction for useful comparison.
- Keep the existing LiveTube title bar geometry and controls: 45 logical pixels high, app title at left, minimize/maximize/close at right. Chrome uses the approved warm graphite OS styling; app content uses Inter and the LiveTube palette. Do not duplicate a second decorative title bar inside the app.
- Content palette: base #0E0E10, panel #18181B, alternate #26262C, input #1F1F23, text #EFEFF1, muted #ADADB8, accent #9146FF, selected links #BF94FF. Purple means selection or purchase. Owned, locked, equipped and unaffordable states also use words and icons.
- All directions keep Inter and the purple content palette. Layout, density and presentation distinguish them. None changes the type system.
- App navigation: LOADOUT / UPGRADES / CHEATS, with SETTINGS in a smaller utility position. DEBUG remains a developer utility, not a promoted player action.
- LOADOUT clearly separates starting equipment from permanent purchases. Include a starting gun, armour, a character skin that adds viewers, and three killstreak slots. Show the character large. Present skin viewer benefit next to the skin selection, not as an unexplained rarity label.
- UPGRADES presents permanent ownership with grouped effects, explicit next prices, current/next rank comparisons and clear unlock requirements. Every visible item says what it does without hovering. One selected item and one clear purchase button, with wallet and post-purchase balance.
- CHEATS is an installed patch manifest: bought cheats are always on. Do not add misleading on/off switches. Use installed labels, plain effects and control hints. Keep fictional trainer flavor in patch signature, dealer note and status strings, not in simulated real cheat instructions.
- No copied game logos, character art, gun models or icon assets from reference games. Original fictional operator and equipment imagery only.
- Use ASCII hyphens in all authored copy. Prices and loadout benefits in concepts are proposals, not approved gameplay changes.

## References and design interpretations

These are proposed design interpretations drawn from the references, not claims that BattleDuty already supports every depicted feature.

1. Call of Duty Modern Warfare 2019 Gunsmith: dark object staging, an inspectable hero weapon, named equipment slots and compact performance comparisons. Borrow the focus and confidence of the display, while keeping only the decisions this prototype needs.
   - Official: https://blog.activision.com/call-of-duty/2019-07/Call-of-Duty-Modern-Warfare-Gunsmith-Teaser-is-Here
   - Visual example: https://mein-mmo.de/cod-mw-gunsmith-details/
2. Valorant agents and collection: strong character identity, visually separated weapon families, simple selection frames and distinct cosmetic unlock progress. Borrow the large hero and quick collection scanning.
   - Official progression: https://playvalorant.com/en-gb/news/game-updates/progression-update-explainer-faq/
   - Agent select screenshot: https://www.mobygames.com/game/146290/valorant/screenshots/windows/1013260/
   - Collection visual examples inspected via web image search; no account marketplace assets are copied or included in deliverables.
3. Apex Legends legends and loadout: full-body cosmetic preview beside a usable item list, explicit owned/locked states and separate character/weapon customization. Borrow the immediate feedback between selection and character appearance.
   - Official: https://help.ea.com/en/articles/apex-legends/how-to-customize-legends-and-weapons/
   - Visual example: https://www.alza.cz/apex-legends-recenze
4. Destiny 2 inventory/loadouts: character centered between equipment slots, a complete build visible at once and a focused detail view for decisions. Borrow the whole-build overview and the association between gear and body.
   - Official: https://www.bungie.net/7/en/News/article/buildcrafting
   - Visual example: https://clickpressplay.com/page/8/
5. Hades Mirror of Night: permanent investment becomes readable rows with visible ranks, costs and MAX states. Borrow the price/effect/rank rhythm and progression clarity, without mythological ornament.
   - Official talent context: https://www.supergiantgames.com/blog/6/
   - Mirror visual: https://www.neoseeker.com/hades-2020/Mirror_of_Night
6. Fictional desktop software: Hypnospace Outlaw's authored desktop identity and Hacknet's module/status presentation. Borrow only the narrative plausibility of software with a personality. BattleDuty's own cushion contact, patch label and installed manifest supply the trainer fiction.
   - Hypnospace official developer: https://www.thatwhichismedia.com/games/hypnospaceoutlaw/
   - Hacknet official publisher: https://www.fellowtraveller.games/hacknet/

## A - Arsenal Studio

A premium arsenal with a large operator, a spotlighted starting weapon and a clean equipment rail.
Permanent upgrades read like focused purchase decisions; the patched fiction stays quiet and believable.

Composition: wide stage in the center/right, a compact equipment rail at left, dark cinematic lighting with a restrained purple rim. Clean rectangular framing and generous spacing. Inspiration: Modern Warfare object staging plus Destiny's whole-build overview.

LOADOUT: operator occupies about 45% of content width, rifle preview at lower center. Left rail contains Starting gun: Assault Rifle, Armour: Kevlar, Skin: Violet Circuit (+10% viewers - proposed). Three killstreak cards sit along the lower right: UAV, RC-XD and Stealth Bomber, each labeled Equipped or Locked. Bottom footer summarizes the starting kit and has GO LIVE.

UPGRADES: left group list Combat / Audience / Killstreaks / Loot boxes. Center has large but concise upgrade cards. Right has the selected item's current/next comparison. Example wallet $250: Tougher Rank 1/5, +5% max health -> +10%, next rank $80; Harder Hitting Rank 0/5, +4% gun damage, $40; Unlimited Ammo OWNED, reserve refills itself; Stealth Bomber LOCKED, unlock progress and exact requirement in words. Rows never depend on tooltip copy.

CHEATS: a large Installed patches panel with Aimbot and Unlimited Ammo visible, control hints next to the relevant effect and INSTALLED / ALWAYS ON labels. Right panel shows a stylized fictional operator outline with purple patch markers and a small patch status card. No toggle controls. Dealer line: 'keep the app off-screen. chair talk only.'

## B - Spotlight Collection

A bold character-led collection makes skins, viewer gains and the next run's identity the hero.
Big cards and clear unlock tracks make the app feel like a premium game launcher with a questionable patch.

Composition: editorial scale and asymmetry, a character taking center-left with a huge faint operator label behind them, a selection panel at right and a horizontal cosmetic strip below. Flat clean purple graphics rather than realistic tactical overlays. Inspiration: Valorant character identity plus Apex cosmetic preview.

LOADOUT: original operator standing large, visible skin swatches with names and viewer bonuses, one selected violet skin. Right panel presents Starting gun and Armour choices as two-card pickers. A three-slot Killstreak setup runs below those pickers with clear slot numbers and unlock copy. GO LIVE sits at bottom right, with a compact readout 'Viewers from skin +10% - proposed'.

UPGRADES: grouped shelves of readable landscape cards under Combat / Grow your channel / Killstreaks / Loot boxes, three cards per row. Selected card gets a purple frame and a larger explanation beside it. Wallet, rank pips and price are always visible. Include BUY $80, OWNED and LOCKED card examples. One progressive audience card reads Viewer Growth Rank 1/4, +25% -> +50% viewers from stream moments, next rank $300, with a clear '$50 more needed' state for wallet $250.

CHEATS: a bold two-column installed collection; Aimbot uses an original target illustration, Unlimited Ammo an original magazine illustration, Enemy Radar a locked radar tile. Each says the effect and ownership in plain words. Installed cards carry a quiet patch stamp. A selected cheat explains its controls and applies to the run automatically. No toggles or real software instructions.

## C - Patch Ledger

A polished underground utility puts effects, ranks, prices and unlock progress directly in the player's path.
The character still anchors the loadout, while the upgrade ledger makes permanent progress easy to compare.

Composition: precise rows, strong column alignment, minimal icon noise and a narrow status strip. Inter at every scale; no terminal monospace. Purple selection, restrained amber for patch warnings and discrete green status dots. Inspiration: Hades progression rhythm plus believable fictional utility software.

LOADOUT: full-height original operator at right taking about 40% of the content. Left has four clearly numbered modules: 01 Starting gun, 02 Armour, 03 Skin (+10% viewers - proposed), 04 Killstreak setup. Gun and armour choices are compact horizontal cards; skins use portrait swatches; streaks use three outlined slots. Footer shows PATCH READY, kit summary and GO LIVE.

UPGRADES: groups Combat / Audience / Killstreaks / Loot boxes divide an aligned ledger. Columns: Upgrade / What it does / Rank / Next price / State. Tougher Rank 1/5 shows +5% health -> +10%, $80, AVAILABLE. Unlimited Ammo shows reserve refills itself, OWNED, with no misleading purchase price. Viewer Growth Rank 1/4 shows +25% -> +50% viewers, $300, NEED $50. Stealth Bomber shows unlock requirement, progress 3/5 and LOCKED. A selected row gets a detail strip with current/next numbers and BUY NEXT RANK $80.

CHEATS: installed patch ledger: name, effect, controls and state. Aimbot / Hold right mouse to lock; left mouse to fire / INSTALLED. Unlimited Ammo / Reserve refills itself / ALWAYS ON. Enemy Radar / Minimap shows every enemy / LOCKED. Header reads 'Bought cheats are always on.' Small status strip reads 'BattleDuty patch active' and the dealer note. The presentation is shady through authorship and patch identity, not through unreadable code.

## Generation and sheets plan

Use one built-in image generation call per screen, preserving the exact same chrome, window dimensions, operator and equipment within each direction. Request 2560x1440 individual PNGs. Inspect every image for text, states, prices, clipping and consistency. Correct artifacts before compiling sheets.

Each direction sheet: 2x2 layout, BEFORE / LOADOUT / UPGRADES / CHEATS, matched image sizes and margins. The BEFORE tile uses the real captured CHEATS window with the desktop around it. Add an unobtrusive proposal label. Overview: directions as rows and the three proposed screens as columns, plus a before reference strip. Include full-resolution individual screens separately.

Upload through tools/pr-image with --prefix 2026-10-13/app-concepts/. Publish only completed work; never label a written brief or missing-image placeholder as a generated concept.
