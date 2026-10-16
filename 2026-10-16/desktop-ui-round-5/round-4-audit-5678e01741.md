# Desktop UI audit - round 4

Branch `codex/desktop-progressive-ui` at `baca948ee`. I downloaded all 134 captures and viewed each one at 2560x1440, with full-resolution left and right halves wherever text, colour or edges mattered. Coordinates below are in 2560x1440 pixels.

**Verdict: NOT APPROVED. 15 findings: 0 high, 4 medium, 11 low.**

This is very close. All 20 round-3 findings are fixed or reasonably pushed back on. The late profile has no medium or high findings. What still blocks shipping is four medium problems a player sees on first look:

- in two places, 1% achievements still sit under a category;
- the first scripted purchase shows clipped stray text;
- the killstreak picker appears to have the wrong card selected.

Each is a small change. With those four fixed and nothing new introduced, I would approve; the lows below do not block.

## Required changes

| Requirement | Status |
| --- | --- |
| BattleDuty in front after login | MET (`fresh-loadout`, `fresh-first-loadout`). |
| Cheats hidden until unlocked | MET. UPGRADES appears during the install and CHEATS after the purchase. CHEATS shows owned items only, as compact cards with rank in the detail panel. |
| Purchase takes effect | MET. `fresh-install-confirmed` shows wallet $0, -$50, Rank 1/3 and Need $75 for the next rank. |
| Achievement staged reveal | MET on the cards and in the detail panels: 1% shows a bar only and cannot be selected, 40% adds the requirement, 50% the picture, 80% the name and description, and nothing below 1% shows. Category placement of 1% items in two places is findings 1 and 2. |
| START GAME in Loadout | MET. |
| No Go Live / no Change on gun / no armour picker | MET. |

## Round 3 findings

| R3 | Status |
| --- | --- |
| 1 gold hover / grey wash | FIXED. Hover and focus are purple everywhere with no grey wash. The desktop icon selection is purple too. The BUY-hover evidence is a duplicate (see the evidence note). |
| 2 grid reflow | FIXED. Every stage uses a fixed three-column grid, and compact stages are shorter, not wider. |
| 3 Loadout bottoms | FIXED. All three panels end together (`mid-loadout`). |
| 4 bar-only section names | FIXED on the main UPGRADES list. NOT FIXED in the expanded group views (finding 1), and the main-list tail reads as part of the previous group (finding 2). |
| 5 shop letter icons | FIXED. The icons are existing illustrations. Reuse of the same art across different items is low finding 6. |
| 6 Settings | FIXED. One control column, wrapped resolutions, matching steppers, compact toggles, DATA last, red reset edge. |
| 7 scripted purchase | MOSTLY FIXED. The card sits beside the chat, Confirm is filled and the confirmed state is shown. The receipt is hidden (finding 3). |
| 8 empty fresh UPGRADES | FIXED. Rank 1/3 with Need $75 (`fresh-upgrades`). |
| 9 straight chart | FIXED. Realistic rises and dips; step chart at low peaks. |
| 10 CHEATS card size | FIXED. Four fresh cards fit without scrolling. |
| 11 failed streams | FIXED. STREAM FAILED, $0 earned. |
| 12 Settings body / footer band | FIXED. One near-black body to the window bottom. |
| 13 disabled BUY | FIXED. A price with no BUY verb, and the group heading reads "Next". |
| 14 installer / chat | FIXED. PUSHBACK OK on keeping continuous chat scrolling. |
| 15 Advanced / Tuning | FIXED. PUSHBACK OK on per-page footers and full tester ranges. |
| 16 picker badges | MOSTLY FIXED. The quiet slot labels are good. The selection state is finding 4, and an orphan divider is low finding 7. |
| 17 detail leftovers | FIXED in CHEATS. EFFECT is used consistently. |
| 18 maximized rule | FIXED. |
| 19 copy / order | FIXED. Reset copy is low finding 8. |
| 20 small layouts | FIXED. PUSHBACK OK on keeping the offline and No preview media shells. |

## Findings, most important first

### Medium

1. **1% achievements still sit under a category heading in the expanded group views.** Under Kamran's rule, 1% shows a progress bar only. Being placed in a named group still tells the player what kind of item it is.
   - `mid-upgrades-killstreaks-page-2` shows two bar-only tiles inside the expanded KILLSTREAKS group (about x430-1190, y1112-1218).
   - `mid-upgrades-combat-page-2` shows one bar-only tile inside COMBAT (about x430-800, y1112-1218).
   - The group's VIEW ALL count leaves these out, so "VIEW ALL 8" opens a view with 10 items.
   - **Fix:** the expanded group views must use the same rule as the main list, so bar-only items never appear inside a named group. They live only in the unnamed tail at the end of the main UPGRADES list.

2. **The unnamed bar-only tail reads as part of Streak Rules** (`mid-upgrades-page-4`). Seven bar-only tiles start about 65 px under the last STREAK RULES card (y835 to y1218). There is no separator or heading, and the gap is the same as the gaps inside a group. A player reads them as seven more Streak Rules, which is the category hint the round-3 fix was meant to remove.
   - **Fix:** separate the tail clearly from the last group. Use a full-width rule plus a larger gap (about 100 px), or a neutral heading such as "Undiscovered" that names no category.

3. **The scripted-purchase receipt is clipped behind the story chat** (`fresh-install-confirmed`). After Confirm, a receipt ("...kup I" / "...nes for your primary weapon.") is drawn at about x860-1125, y1195-1240. Its left part sits under the chat window, so only the tails of the lines show, at about 40% opacity. On the beat where the player watches their money get spent, this looks like stray broken text.
   - **Fix:** drop the receipt here, since -$50 and Rank 1/3 already show the result. Otherwise centre it under the card (x998-1370), clear of the chat.

4. **The killstreak picker appears to have Empty slot selected** (`fresh-killstreak-picker`, `mid-killstreak-picker`).
   - The detail panel shows Predator Missile (the equipped item), but the Predator card has no clear selection outline.
   - The only purple-bordered card is the dashed Empty slot (about x1180-1546, y415-765), so at a glance the player thinks Empty slot is selected.
   - When Empty slot really is selected (`fresh-killstreak-empty`), it becomes solid purple, so the two states differ only by dash.
   - **Fix:** give the card being shown in the detail panel the standard purple selection outline. Draw an unselected Empty slot's dashed border in neutral grey.

### Low (do not block)

5. **The reset dialog copy contradicts its heading.**
   - `fresh-reset-confirm` lists "Your starting kit stays." under "YOU WILL LOSE".
   - `mid-reset-confirm` says "6 cheats and 1 channel upgrade return to the starting kit", but four of those six are the starting kit.
   - **Fix:** move "Your starting kit stays" below the list as a reassurance line. Count only bought items: "2 bought cheats and 1 channel upgrade".

6. **The LiveTube shop reuses BattleDuty art for different items** (`late-livetube-shop`): the Viewer Growth dish appears as Promote Channel. The icons are small (about 50 px), and the price line is indented while the description is not. The same price also appears twice on a card ("$40,000" and "Need $22,000" is fine, but fresh prints "$2,000" and "Need $2,000").

7. **The picker detail has an orphan divider** (`*-killstreak-picker`, about y826) with about 360 px of empty space before EQUIPPED. The Empty slot detail repeats itself: "Leave this killstreak slot empty." followed by "Clears this slot only."

8. **The scripted purchase layout.** The single card sits in the middle column (x998) under a left-aligned COMFORT & UTILITY header, which leaves the first column empty. This is acceptable for the chat-clearance pushback, but indenting the header to match would look intentional.

9. **The Loadout panels are aligned but sparse.** There is a lot of empty space inside the weapon and killstreak panels below their content (`mid-loadout`, about y980-1250). This is acceptable; it could optionally be closed up with a larger weapon image.

10. **Settings section headers look like row labels.** DISPLAY, AUDIO, CONTROLS, STREAM and DATA use almost the same size and weight as SCREEN and SHOW FPS. Use the bold UPGRADES section-header style.

11. **Advanced tools.** It has no group label above TUNING, its footer doesn't line up with Settings, and the loose "F8: bug report / F5: photo mode" line remains.

12. **UPGRADES opens on owned and maxed items in late** (`late-upgrades`). Sort buyable items first within each group.

13. **The login notice** shows "0 new followers" beside "800" or "90,000 viewers last stream" (`mid-login`, `late-login`). Hide the followers line when it is 0.

14. **Fixture and text repetition.**
    - "Reach 2,000 peak viewers." appears on all eight killstreak picture cards (within the reveal rules).
    - LiveTube history titles repeat in fresh.
    - There is a stray divider fragment on `late-livetube-content-page-2`.

15. **START GAME shows a white focus outline at rest** on Loadout open (`fresh-loadout`, `-first-loadout`). Show it only for keyboard focus.

## Evidence note

`mid-upgrades-buy-hover` is byte-identical to `mid-upgrades` (same MD5), so the claim that filled BUY labels stay white on hover has no capture behind it. Recapture with the pointer over a filled BUY button. This is an evidence gap, not a UI finding.
