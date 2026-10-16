# Desktop UI audit - round 3

Branch `codex/desktop-progressive-ui` at `897d02e49`. I downloaded all 131 captures and viewed each at 2560x1440, using left and right half crops at full resolution wherever text or edges mattered. Coordinates below are in 2560x1440 pixels.

**Verdict: NOT APPROVED. 20 findings (2 high, 9 medium, 9 low).**

Round 3 is close. Every required change is met. The staged reveal is correct. All seven high findings from round 2 are fixed. The late profile no longer feels overwhelming: CHEATS is a calm owned grid, UPGRADES groups hold 3-10 items, and LiveTube shows each number once.

What stops me shipping it is a small set of things a player sees on first look:

- a gold-and-grey hover state that looks like a rendering glitch;
- grid rows in UPGRADES that change column count from row to row;
- ragged Loadout panel bottoms;
- letter placeholder icons in the LiveTube shop;
- a straight-line viewer chart;
- an empty UPGRADES tab right after the scripted purchase.

## Required changes

| Requirement | Status |
| --- | --- |
| BattleDuty in front after login | MET (`fresh-loadout` opens at login time). |
| Cheats hidden until unlocked | MET. CHEATS is owned-only in all profiles, with no prices or OWNED pills. UPGRADES appears at install and CHEATS after the scripted purchase (`fresh-install-confirmation`, `fresh-first-loadout`). |
| Achievement staged reveal | MET. Stream Boost at 1% is a bar only and can't be selected. Friendly Fire Off at 40% adds the requirement. Kevlar at 50% adds the picture, and its detail shows "7 / 10" with no name. Faster Regen at 80% adds name, rank and description. Nothing under 1% shows. One section-header hint is in finding 4. |
| START GAME in Loadout | MET. It is filled purple everywhere. |
| No Go Live / no gun Change / no armour picker | MET. |

## Round 2 findings

| R2 | Status |
| --- | --- |
| 1 phantom tab underline | FIXED. SETTINGS stays underlined on Controls, Advanced and Performance. |
| 2 short LiveTube window | FIXED. It now fills the trainer's full frame with nothing showing beneath. |
| 3 scripted purchase under CHEATS | FIXED. It now happens under UPGRADES. New issues with the purchase beat are in finding 7. |
| 4 contradictory gated cards | FIXED. One "Buy X first" line and a disabled price. The disabled footer is too weak (finding 13). |
| 5 OWNED pills | FIXED. |
| 6 story chat clipped | FIXED. The chat now covers the card being bought (finding 7). |
| 7 22-item Stat Boosts | FIXED. Combat 8, Channel 4, Run tools 7 and Ban wave 3 are named the same in both tabs. |
| 8 LiveTube numbers | FIXED. The new problem is the chart shape (finding 9). |
| 9 Settings | MOSTLY FIXED. Leftovers are in finding 6. |
| 10 reset dialog | FIXED. "16 cheats and 6 channel upgrades", grouped numbers and a visible hold fill. |
| 11 Advanced tools | MOSTLY FIXED. Leftovers are in finding 15. |
| 12 Loadout cards | MOSTLY FIXED. The new problem is ragged column bottoms (finding 3). |
| 13 START GAME style | FIXED. |
| 14 detail panel | MOSTLY FIXED. Leftovers are in finding 17. |
| 15 picker | FIXED. PUSHBACK OK on the fresh grid holding only owned cards. Gold remains (finding 1). |
| 16 killstreak copy | FIXED. "N kills. Effect." is used everywhere. |
| 17 footer band / fades | MOSTLY FIXED. UPGRADES and CHEATS are clean. The Settings pages keep the band (finding 12). |
| 18 partial-stage card heights | FIXED in height. The new problem is row widths (finding 2). |
| 19 maximized | MOSTLY FIXED. The rule is broken (finding 18). |
| 20 login | FIXED. |
| 21 fresh CHEATS layout | FIXED in geometry. A new problem is in finding 10. |
| 22 LiveTube shop/chrome | MOSTLY FIXED. The icons are placeholders (finding 5). |
| 23 copy nits | MOSTLY FIXED. "1 peak viewers" remains (finding 19). |
| 24 desktop chrome | FIXED. The tray icon reads as a window (finding 20). |

## Findings, most important first

### High

1. **Hover and "current" states use an off-palette gold outline and a grey wash that looks like a glitch.**
   - The card under the pointer gets an amber outline (sampled #F0B86E) and a light grey fill (about #454354), which drops its text contrast.
   - At the top of a scroll area, the top fade turns that card into a milky translucent block with its rank line ghosted. Examples:
     - `mid-upgrades-combat-page-2`, Faster Regen at about x430-800, y410-645;
     - `late-upgrades-streakrules-page-2`, Streak Head Start.
   - The same treatment appears in:
     - every scrolled `late-upgrades-*-page-N`;
     - both pickers, on the IN THIS SLOT card (x410-775, y413-783), where it reads as a third selection state;
     - the focused W cell in Controls (x680-893, y425-463);
     - the desktop icon selection box.
   - Gold has been gone from every other surface since round 2.
   - **Fix:** hover is a purple (or light-neutral) 1 px outline at about 40% opacity on the normal card fill, with no grey fill. Mark "in this slot" with the badge only. The scroll fade should blend to the page colour, never lighten the card under it. Focus outlines use purple everywhere.

2. **UPGRADES grids reflow between 1, 2 and 3 columns from row to row.**
   - `mid-upgrades-combat`: Faster Regen sits alone at one-third width with about 780 px empty beside it. The next row has three cards, then "Damage yourself with your own explosions 25 times" spans the full grid width (x430-1584) for one line of text, then a full-width bar tile.
   - `mid-upgrades-killstreaks`: two rows of three, then a row of two wider cards, then two half-width bar tiles.
   - `mid-upgrades-page-3`: Friendly Fire Off's requirement-only card spans the full width.
   - Bar-only tiles come in three widths: one-third under Ban wave, half under Killstreaks, full width under Channel and Combat.
   - The page reads as randomly laid out.
   - **Fix:** keep one fixed three-column grid for every stage. Compact stages make a card shorter, never wider.

### Medium

3. **Loadout columns end at three different heights** (`*-loadout`, `*-loadout-maximized`, `*-messages`, all profiles).
   - Operator ends at about y1250, Primary Weapon at about y1055 and Killstreaks at about y993.
   - That leaves a stepped bottom edge with 200-260 px voids under the two right columns.
   - **Fix:** one bottom edge for all three. Either stretch the weapon and killstreak panels to the Operator's bottom (content top-aligned), or crop the Operator art to the tallest content panel.

4. **A section made only of bar-only tiles still shows its name** (`mid-upgrades-page-2`, `-page-3`). "BAN WAVE" heads three empty bars. That tells the player what kind of items they are, which goes beyond "progress bar only" at 1%, and the section looks unfinished.
   - **Fix:** hide a section header until one of its items reaches 25%. Collect pure-1% items into one unlabelled row at the end of UPGRADES.

5. **The LiveTube shop icons are placeholder letters** (`*-livetube-shop*`).
   - Tiles show "^", "2x", "S", "BAG", "3x", "M", "$", "4K" and "AD" as text in a 50 px square.
   - Promote Channel I, II and III all use a bare "^", which reads as a missing glyph.
   - "BAG" (Merch Store, x675-725, y781-830) fills its tile edge to edge.
   - Next to BattleDuty's illustrated cards they look unfinished.
   - **Fix:** use one simple line-icon set (megaphone, coin, bag, screen and so on), or reuse existing upgrade illustrations at small size, or drop the icon tile entirely.

6. **Settings alignment and weight** (`*-settings`, `*-settings-page-2`).
   - The SCREEN row's five resolution buttons start at about x1210, about 200 px left of every other control (x1408-2005), and end short of the right edge.
   - SCREEN SHAKE shows "100%" in a box, while GAMEPLAY VOLUME shows a larger unboxed "100%".
   - STREAM is six full-width solid purple ON bars (late, x1408-2005, y752-1113). They are the loudest block on the page, for the least important settings.
   - DATA, which holds RESET ALL DATA, sits above STREAM. The RESET ALL DATA button looks exactly like OPEN, and its row label repeats the button text.
   - SAVE (x1712-2121) overhangs the control column.
   - **Fix:**
     - One control column; make the resolution choices a dropdown or wrap them into it.
     - One stepper style.
     - Compact toggles or a lighter ON fill.
     - Move DATA last, with a red-outlined destructive button.
     - Right-align SAVE to the control edge.

7. **Scripted purchase beat** (`fresh-install-confirmation`, `fresh-install-purchase`).
   - The story chat (top at about y578) now covers the lower two-thirds of the Increased Ammo Pickup card (x430-800), so the item being bought is reduced to its title.
   - Confirm is an outline button with purple text, while every BUY is filled; the primary action looks secondary.
   - In the post-Confirm frame the wallet still reads $50 and the detail panel still shows BUY $50. The spec beat (wallet $50 to $0) isn't visible.
   - **Fix:** lay out the trainer so the card sits clear of the chat (x >= 870, or in the middle column), make Confirm a filled primary, and show the wallet at $0 with the card at Rank 1/3 once confirmed.

8. **After the scripted purchase, UPGRADES is an empty window** (`fresh-upgrades`). It shows only "New upgrades arrive after your first stream." with about 1,800x900 px of blank space below. Increased Ammo Pickup is Rank 1/3, yet its next rank isn't listed, although the player just watched this tab hold a buyable card.
   - **Fix:** list the next rank with its price ("Need $X"), so the tab shows what comes next. If ranks are deliberately held until the first stream, put that line on the card, not on an empty page.

9. **The viewer chart is a perfectly straight ramp** (`mid-livetube-overview` 0 to 800, `late-livetube-overview` 0 to 90,000; chart at about x655-1635, y680-1025). It is the biggest element on the page and looks fabricated beside "Recorded peak". The fresh chart, at 0-4 viewers, is a jagged zig-zag that looks glitchy.
   - **Fix:** give the fixtures realistic curves (the round-2 mid fixture had one), or show a "No viewer samples" state. Draw a step or bar chart when the peak is 5 or less.

10. **Fresh CHEATS cuts row 2 with only 4 items** (`fresh-cheats`). The Killstreaks row is cut by the bottom fade at about y1285, so the player has to scroll to see four cards. Each card is about 560x350 px with 130-170 px empty under its text. `late-cheats-channel` stretches the single Viewer Growth card across the whole row (x409-1555).
    - **Fix:** size cards to their content (about 230 px tall) and keep the normal card width for single-item groups.

11. **Failed streams are unclear in LiveTube Content** (`mid-livetube-content`). Streams #1-#4 ran 12:00-21:00 but each shows "$75", the same as the completed #5 and #6. They are tagged "NOT RECORDED", which reads as "no VOD", not "stream failed".
    - **Fix:** tag them "ENDED EARLY" or "STREAM FAILED", and show what was actually earned or banked.

### Low

12. **Settings-family pages use a different body colour and still end in a dark footer band** (`*-settings*`, `*-controls`, `*-advanced*`, `*-advanced-performance*`, `*-reset-*`). Their body is lighter slate where Loadout, Upgrades and Cheats are near-black, and a darker strip runs from y1273 to y1330. **Fix:** one body colour to the window edge.

13. **The disabled BUY footer looks like OWNED and MAX** (`late-upgrades-streakrules-page-2`, `late-upgrades-comfort-utility-page-2`). "BUY $3,000" uses the same dark outline as OWNED, with the text only slightly dimmer, and the "BUY" verb invites a click. **Fix:** show "$3,000" as dimmed text, or dim the button to about 40% and add a lock glyph. The LiveTube shop's "In progress" heading over a locked item should read "Locked" or "Next".

14. **Fresh scripted-opening polish.**
    - `fresh-installer-preparing` shows an active "Next >" at 0%.
    - The installer overlaps the chat's close X (x785-845, y595-645).
    - `fresh-installer-complete` leaves the BattleDuty desktop icon dimmed with a progress underline.
    - The chat input is a box inside a box (x60-830, y1235-1310).
    - A cut bubble sliver shows at the top of the message list (y765).

15. **Advanced tools and Performance.**
    - The PERFORMANCE row is a label plus a half-width button that repeats "PERFORMANCE", while every other row is a full-width button.
    - The footers use four different layouts across the Settings family (SAVE / SAVE+BACK / SAVE+RESTORE+BACK / RESET+COPY+BACK).
    - The "Performance" page holds economy and audience tuning; call it "Tuning".
    - Many slider thumbs sit at the far left for non-zero values because the ranges are far too wide.

16. **Picker badges** (`*-killstreak-picker`, `*-killstreak-empty`).
    - "IN THIS SLOT" is a filled grey pill, while "IN SLOT 2" is plain text.
    - "Currently in this slot." plus the EQUIPPED button repeat the same fact.
    - In late, the selected Empty slot card is almost entirely below the fold (y1193-1275) while its detail shows; scroll it into view.

17. **Detail panel leftovers.**
    - Owned single items say "CURRENT" while unowned ones say "EFFECT"; use EFFECT for every non-ranked item.
    - The CHEATS detail panel draws a divider at about y980 with about 300 px of nothing under it for every item except Aimbot.
    - The Aimbot card body is its control hint, while every other card states its effect.
    - The CHEATS detail omits the rank shown on the card (Viewer Growth Rank 2/4).

18. **The maximized tab-bar rule is broken** (`*-loadout-maximized`). The bottom rule shows only in the outer gutters (x0-270 and x2290-2560, y161). The left gutter header segment is a different shade. **Fix:** draw one continuous rule and one header fill.

19. **Copy nits.**
    - "1 peak viewers" in `fresh-livetube-content-page-3` (Day 14) and `-page-6` (Day 5).
    - "lunge 1 / m longer" breaks between number and unit; use non-breaking spaces.
    - "40 shield" needs a unit: "40 armour".
    - "Lag Bullets: Adds Lag Bullets..." repeats its own name.
    - LiveTube titles end "- Stream 23" and the next line repeats "Stream #23".
    - Controls says "MOUSE LEFT" while Aimbot says "LEFT MOUSE".
    - Milestone wording differs: "Reach Partner: 2,000 best peak viewers." vs "Reach 2,000 peak viewers".
    - Sort order differs between CHEATS, UPGRADES and the picker.
    - The fresh reset dialog says "4 cheats and 0 channel upgrades return to the starting kit"; drop zero clauses, and say "Your starting kit stays" when nothing else is owned.

20. **Smaller layout leftovers.**
    - The tray Messages icon is a plain rounded rectangle that reads as a window; use a speech-bubble glyph.
    - "Your channel" on Overview has about 230 px empty between its text and "Visit channel shop".
    - LiveTube Content cuts its first and last rows with no fade (`late-livetube-content` y1068, `-page-2` y458).
    - The large "No preview" (about 740x530) and "Channel offline" (about 920x190) boxes are still big blank areas on fresh.
    - Six late killstreak cards scroll by about 6 px only to fade the header; trim the card height so they fit.
