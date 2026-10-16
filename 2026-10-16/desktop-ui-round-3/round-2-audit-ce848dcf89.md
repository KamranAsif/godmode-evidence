# Desktop UI audit - round 2

Branch `codex/desktop-progressive-ui`. Captures were rendered at `dfa37d196`; the index names `75d532d91` as head. All 114 captures were downloaded and viewed at 2560x1440. Coordinates below are in 2560x1440 pixels.

**Verdict: NOT APPROVED. 24 findings.**

Round 2 is a big step up. The overwhelming feel of round 1 is mostly gone:

- the persistent toast, LIVE/READY chrome, patch strip, hero banner, budget counter and duplicate Back buttons have been removed;
- the DEBUG tab has moved behind Settings;
- CHEATS is a clean owned-only grid.

What remains is a set of visible bugs (a phantom tab underline, a short LiveTube window, the scripted purchase shown under CHEATS) plus a layer of copy and consistency polish.

## Required changes

| Requirement | Status |
| --- | --- |
| BattleDuty in front after login | MET (`*-loadout` at login time; LiveTube first only during the story opening, as the spec requires). |
| Cheats hidden until unlocked | MET at rest: CHEATS is owned-only with no prices in all three profiles. NOT MET in the scripted first purchase (finding 3). |
| Achievement staged reveal | MET. 1% is a compact bar-only row placed after the real cards and is not selectable. 40% shows the requirement, 50% adds the picture, 80% adds name, rank and description. Nothing leaks, and nothing under 1% is shown. |
| START GAME in Loadout | MET: white bold label, focus ring only on focus. One stray style remains (finding 13). |
| No Go Live in tab bar | MET: only the wallet, right-aligned. |
| No Change on gun / no armour picker | MET. The leftover READY/EQUIPPED badges are gone. |

## Round 1 findings

| R1 | Status |
| --- | --- |
| 1 toast over window | FIXED. Messages is now a taskbar button, and nothing shows on the lock screen. |
| 2 LIVE/READY chrome | FIXED. |
| 3 bar-only tiles | FIXED. PUSHBACK OK on the lock glyph, since Kamran asked for a bar only. |
| 4 UPGRADES/CHEATS overlap | FIXED at rest: names and section labels agree. PUSHBACK OK on owned vs shop counts (the base-kit pair). Not fixed during the scripted purchase (finding 3). |
| 5 done-but-locked cards | NOT FIXED. The wording now contradicts itself (finding 4). |
| 6 Loadout hierarchy | MOSTLY FIXED. Leftovers in finding 12. |
| 7 Settings | MOSTLY FIXED. Leftovers in finding 9. |
| 8 "Your channel" heading cut | FIXED. |
| 9 LiveTube purchase bars | FIXED for buyable items. Gated items: finding 4. |
| 10 picker noise | MOSTLY FIXED. Leftovers in finding 15. |
| 11 patch strip | FIXED. |
| 12 hero art / fades | Banner FIXED. Fades are too weak (finding 17). |
| 13 detail panel | MOSTLY FIXED. Leftovers in finding 14. |
| 14 two Back buttons | FIXED. |
| 15 placeholder icons | FIXED in BattleDuty. In the LiveTube shop, four items still share one list glyph (finding 22). |
| 16 truncation / ladder names | FIXED. |
| 17 locked killstreaks | PUSHBACK OK on staged identity. NOT FIXED on commas (finding 7). |
| 18 maximized | PARTLY FIXED (finding 19). |
| 19 vocabulary | FIXED, but OWNED is now redundant (finding 5). |
| 20 title styles | MOSTLY FIXED. Reset and Performance titles differ (findings 10, 11). |
| 21 VIEW ALL | MOSTLY FIXED. Late VIEW ALL buttons sit flush on the next card row (finding 17). |
| 22 DEBUG | FIXED, but introduced the phantom underline (finding 1). |
| 23 chat | PUSHBACK OK for a chat the player opens. The scripted story chat is a different case (finding 6). |
| 24 LiveTube data | MOSTLY FIXED. Contradictions remain (finding 8). |
| 25 Controls | FIXED. |
| 26 login/desktop | PARTLY FIXED (finding 20). |
| 27 LiveTube window/nav | REGRESSED (finding 2). |
| 28 copy | MOSTLY FIXED. Keeping ASCII "->" is acceptable. Leftovers in findings 10 and 23. |

## Findings, most important first

### High

1. **The active-tab underline points at an invisible tab** (`*-advanced`, `*-advanced-page-2`, `*-advanced-performance*`, all profiles). The purple underline sits at about x1175-1328, y248, under empty space where DEBUG used to be, and no tab is highlighted. It looks like a hidden fifth tab. **Fix:** keep SETTINGS active and underlined while in Advanced tools, Performance and Controls.

2. **The LiveTube window is shorter than the BattleDuty window, which peeks out underneath** (all `*-livetube-*`, all profiles). LiveTube's body ends at about y1160 with no bottom frame. Below it, the trainer's "Operator" title, panel borders and a CHANGE button show from y1160 to y1330. It reads as a rendering bug. This is a regression from the round 1 inset fix. **Fix:** give LiveTube the same height as the trainer (bottom at about y1330) with a closed frame and shadow.

3. **The scripted first purchase happens in a shop under the CHEATS tab** (`fresh-install-confirmation`, `fresh-install-purchase`). The tab bar reads LOADOUT / CHEATS / SETTINGS with CHEATS active, but the page is "Permanent upgrades" with BUY $50 and Rank 0/3. There is no UPGRADES tab. This is the player's first look at the app, and it teaches the opposite of the rule that CHEATS is owned-only and UPGRADES is the shop. **Fix:** show the UPGRADES tab from install (even with one item) and run the dealer's purchase there, with CHEATS appearing once something is owned.

4. **Completed-but-gated cards contradict themselves** (`late-upgrades-streakrules-page-2`: Streak Slot 4, Streak Slot 5, Double Earn; `late-upgrades-comfort-utility-page-2`: Fifth Card; `late-livetube-shop-page-2`: Increase Ad Time II). "Requires Streak Slot 3." sits directly above a full bar labelled "100% - Requirement met", with no price. The two lines refer to different gates (achievement vs prior purchase), but the player reads them as "met" and "not met" at once. **Fix:** once the achievement is complete, drop the bar and the "Requirement met" text. Show one state line, "Buy Streak Slot 3 first", and a disabled price footer. Use the same pattern in the LiveTube shop.

5. **Every CHEATS card has the same filled OWNED pill** (all `*-cheats*`; 16 pills on late). The tab is owned-only and titled "Your cheats", so the pill carries no information. It is now the loudest element on the page and the main clutter left in late. **Fix:** remove it. If a state is needed, show only what varies, such as "Rank 3/3".

6. **The scripted story chat is clipped mid-word by the BattleDuty window** (`fresh-install-confirmation`, `fresh-install-purchase`). The trainer window covers the dealer's bubbles at about x372: "hope you dont m", "your stream incor", "let me take the m", "every one of ther". This is the beat where the player needs to read why the money is being spent. In the LiveTube installer steps the chat is drawn on top, so the stacking order flips between steps. **Fix:** keep the scripted chat above the trainer for the whole opening, or place the trainer so the two don't overlap.

7. **STAT BOOSTS in UPGRADES is a 22-item catch-all** (`late-upgrades`, VIEW ALL 22; `late-upgrades-statboosts` pages 1-5). It mixes four kinds of item:
   - channel: Viewer Growth, Starting Audience, Stream Boost;
   - combat: Tougher, Kevlar, Faster Regen, Long Barrel;
   - loot-box tools: Reroll, Banish, Better Boxes, Supply Line;
   - the Ban Evasion trio.

   It takes five screens of scrolling, while Landing has 3 items. **Fix:** split it into Combat, Channel and Run tools, give Ban Evasion its own "Ban wave" group, and keep each group to about 6-8 items.

### Medium

8. **LiveTube numbers contradict each other or repeat.**
   - The next-stream viewer count appears three times on Overview: Returning viewers tile, "Your channel" card and sidebar NEXT STREAM. In `mid-livetube-overview` that is "59" three times; in late it is "4,445" three times on Overview plus a fourth on My channel. Keep the sidebar figure and give the "Your channel" card other content or remove it.
   - `fresh` onboarding Overview shows "Returning viewers 0 - Nobody came back" beside "10 viewers next stream - Your regulars will be back."
   - `mid-livetube-channel` says "6 streams, 2 completed", while Content lists #2-#6 all at 30:00 with PAYOUT BANKED.
   - Repeated titles: #2 and #6 in mid, #20 and #24 in late. All five fresh broadcasts are titled "another day. maybe tomorrow."
   - The mid chart is labelled "Peak 800", but its curve tops out around 620.
   - The "Clipped by chat" and last-broadcast thumbnails say "CHANNEL OFFLINE"; use "No clip yet" / "No preview".

9. **Settings leftovers** (`*-settings`).
   - FULLSCREEN still uses a gold outline and gold text as its selected state (about x429-576, y423-472). CANCEL on the reset dialog and "YOU WILL LOSE" use the same gold, which appears nowhere else.
   - ADVANCED TOOLS floats alone at the bottom of the STREAM column, with about 480 px of nothing above it, and its ON button is wider than and misaligned with the left column's controls.
   - SAVE/BACK on a top-level tab, where BACK has nowhere to go.
   - SCREEN SHAKE cycles through one button while volume uses -/+.
   - Stream toggles look the same whether ON or OFF.

   **Fix:**
   - Use the house inverse (purple) selection.
   - Put Advanced tools as a labelled row under DATA, and keep the single left column.
   - Autosave, or keep SAVE and drop BACK.
   - Use -/+ for shake.
   - Give ON and OFF distinct fills.

10. **The reset confirmation has wrong numbers and developer copy** (`*-reset-confirm`).
    - "21 cheats already bought" in late, while CHEATS shows 16.
    - "100000" / "1000 peak viewers" without commas.
    - "Your controls, which are already the shipped ones." is still there.
    - HOLD TO ERASE is a near-black maroon slab with no hold-progress fill.
    - The "RESET ALL DATA" title uses red caps, unlike every other page title.

    **Fix:** one count ("16 cheats and 5 channel upgrades"), formatted numbers, drop the controls line when the controls are the defaults (otherwise "Your custom controls"), a visible hold fill, and the standard title style.

11. **Advanced tools doesn't match Settings** (`*-advanced*`).
    - It uses a narrow centred column (x815-1745), while Settings uses x429-2115.
    - Button labels use two sizes: "Sound set: Classic" and "Unlock all killstreaks" are small, "Reset story" and "Skip story" are large.
    - PERFORMANCE floats beside the title and overhangs the column.
    - Reset/Skip story have no section label.
    - "KILLSTREAK RIDES" is sliced in half at the top of the scroll area (`*-advanced-page-2`, y382).
    - The Performance panel is a darker box flush against the tab bar (y253), and its title "PERFORMANCE - PLAYTEST TUNING" uses a different title style.

    **Fix:** use Settings' grid and margins, one button text size, a labelled Story section, PERFORMANCE as a row, a top fade, and pad the panel.

12. **Loadout cards are stretched and mostly empty** (`*-loadout`).
    - Each streak card has about 150 px of blank space between its description and CHANGE.
    - The gun panel has about 90 px between "Assault Rifle" and its single stat line, and about 150 px empty below it.
    - "2 / 2 equipped" sits about 15 px below the KILLSTREAKS header baseline.
    - A slice of purple art shows behind the OPERATOR header band (about x804-916, y400-460), while the other two headers are plain.
    - The Operator art ends in a hard seam near the feet.

    **Fix:** size the streak cards to their content with CHANGE beside the name, tighten the gun panel, align the counter to the header baseline, and start the art below the header.

13. **START GAME has a second style again** (`fresh-install-purchase`): a white outline with white text and no fill. **Fix:** keep the filled purple; a focus ring goes on top of the fill, never in place of it.

14. **The detail panel is uneven** (`*-upgrades*`, `*-killstreak-picker`).
    - "NEXT RANK" heads single-purchase items with no ranks, such as Streak Slot 3 and Throwing Knives.
    - Upgrade detail titles are light weight, while CHEATS detail titles are bold.
    - For an unnamed (pre-75%) item, about 120 px of blank space sits where the name would be.
    - "Unlocks at stream end." follows an unmet requirement on locked killstreaks (1000/2000).

    **Fix:** label it "EFFECT" when the item has no ranks, make titles bold, collapse the gap for hidden names, and show "Unlocks at stream end" only once the milestone is met.

15. **Picker leftovers** (`*-killstreak-picker`, `*-killstreak-empty`).
    - In late, Precision Airstrike is in slot 2 but has no marker, so choosing it for slot 1 is a silent swap. Add "IN SLOT 2".
    - The dashed Empty slot card is cut at the bottom of the grid with no fade (about y1202-1278).
    - Selecting Empty slot leaves about 220 px of blank hero area in the detail panel.
    - About 60% of the grid area is empty in fresh and mid.

16. **The same killstreak has different descriptions on different screens.**
    - Predator Missile: "Steer a missile into the crowd" on Loadout (no full stop), "5 kills. Steer a missile into the crowd" in CHEATS, and the same with a full stop in the picker.
    - In UPGRADES and CHEATS, Attack Helicopter, Attack Dogs, AC-130, Napalm Strike, EMP and Juggernaut say only "New killstreak at N kills.", while the picker gives real effects ("Man the door gun for 40 s.").

    **Fix:** one source, "N kills. <effect>.", used everywhere.

17. **Wasted space, weak fades and flush buttons in UPGRADES and CHEATS.**
    - The upgrade scroll area ends at about y1185. Below it are about 90 px of empty panel and then an empty lighter footer band (about y1273-1328), left over from the removed counter. This also shows in `fresh-install-confirmation`.
    - The scroll fades are only about 20 px, so text is still sliced mid-line at the edges (`late-upgrades-page-2` y412, `late-cheats-comfort` y1278).
    - The CHEATS detail panel ends at y1193 while the grid runs to y1285.
    - Late VIEW ALL buttons sit flush on the next card row (about y924/925).

    **Fix:** extend the scroll area and delete the band, use 40-60 px fades or snap scrolling to rows, align panel bottoms, and add 16 px under VIEW ALL.

18. **Requirement-only and picture-stage cards are full height and mostly empty** (`mid-upgrades-page-3`, `mid-upgrades-statboosts-page-2`). Examples:
    - "Get killed by your own killstreak 5 times" is a 380 px card holding one line.
    - One such card leaves a two-cell hole beside it.

    **Fix:** group same-stage cards on the same row, or size cards to their content while keeping the reveal rules unchanged.

19. **Maximized loadout** (`*-loadout-maximized`).
    - The side gutters (x0-270 and x2290-2560) are a lighter grey than the content band.
    - Tab labels start at x64 while the content column starts at x311.
    - The title bar's right end behind the window buttons is a different-coloured block.

    **Fix:** use one background colour and align the tabs to the content column.

### Low

20. **Login.**
    - The status icons end at about x2425 while the notice card ends at about x2535; use one right margin.
    - "1 viewers last stream" in fresh needs the singular.
    - "90000 viewers last stream" in late needs a comma.

21. **Fresh CHEATS layout** (`fresh-cheats`).
    - In the All view, the two-column grid ends at about x1167, leaving about 435 px of dead band before the detail panel.
    - Card art is about 135 px tall in All but about 180 px in the filtered views, so the Aimbot helmet and crate are cropped differently.

    **Fix:** one card height, and fill the width.

22. **LiveTube shop and chrome.**
    - Increase Ad Time, Merch Store, Recurring tips and Display Ads share one list glyph.
    - "Recurring tips" is sentence case among Title Case names.
    - The wallet is green in LiveTube but white in BattleDuty.
    - The owned Promote Channel I card still shows its $2,000 price.
    - The "Creator dashboard" button is still on My channel, Content and Channel shop.
    - The Returning viewers card ends at x2107 while the panels below end at x2125.

23. **Copy nits.**
    - "Rank 0/unlimited" should be "Rank 0".
    - "Protect 1 extra cheats" should be "1 extra cheat".
    - "1 reroll a run (Z)." should be "One reroll per run (Z)."; the same applies to banish.
    - "1 peak viewers" pills should be singular.
    - "1:49 PM" in the chat sits beside "13:49" in the taskbar.
    - The late chat opens on "my favourite 4-viewer streamer" on a 100,000-peak save; scroll to the newest message.
    - The fresh first-loadout line "Increased Ammo Pickup installed. Your equipped kit is updated." sits loose at the window floor.
    - In the mid chat, "cushion" repeats as the sender name under the header.

24. **Desktop chrome.**
    - The taskbar "Messages" button is a 300 px boxed label in large purple type, unlike the small white tray icons; use a tray-height icon plus label with an unread dot.
    - The "??????? is controlling the mouse" banner is bare purple text on the wallpaper; give it a centred pill background.
    - `fresh-onboarding-overview` shows a faint ghost of the login screen (date, name, avatar ring, clock top) over the desktop. That is a crossfade frame or a lock screen that was never removed; finish the fade and recapture.
