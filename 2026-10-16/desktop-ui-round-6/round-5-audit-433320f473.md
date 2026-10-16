# Desktop UI audit - round 5

Branch `codex/desktop-progressive-ui` at `fce672e9c`. I read the focused list first, then all 134 captures at 2560x1440, using the full-resolution left and right halves wherever text, colour or edges mattered. Coordinates below are in 2560x1440 pixels.

**Verdict: NOT APPROVED. 2 medium findings plus 10 low ones; there are no high findings.**

All four round-4 mediums are fixed, and the BUY-hover evidence is now real. Two new medium problems came up in this round. Both are on screens every player sees and both are one-line fixes:

- a tooltip on CHEATS cards that covers the card's own title;
- a focus box that replaced the underline on the LOADOUT tab on the first screen after login.

Fix those two and I would approve; the lows do not block.

## Focused review

| Item | Result | Evidence |
| --- | --- | --- |
| R4-1: no 1% items in expanded groups | FIXED | `mid-upgrades-combat`, `-page-2`: Faster Regen, three picture cards and one requirement card, with no bar tile. VIEW ALL 5 matches. `mid-upgrades-killstreaks`: 8 picture cards, no bar tile. VIEW ALL 8 matches. |
| R4-2: the unnamed tail is separated | FIXED | `mid-upgrades-page-4`: a full-width rule at about y748 and a larger gap separate the seven bars from STREAK RULES. No heading or category is shown. |
| R4-3: no stray receipt in the scripted purchase | FIXED | `fresh-install-confirmed`: wallet $0, -$50, Rank 1/3 and Need $75, with no clipped text. The COMFORT & UTILITY heading is indented to the card. |
| R4-4: picker selection matches the detail | FIXED | `fresh-killstreak-picker`: Predator Missile has the purple outline and the detail shows Predator. Empty slot uses grey dashes. `fresh-killstreak-empty`: a selected Empty slot is solid purple. |
| BUY hover evidence | VERIFIED | `mid-upgrades-buy-rest` and `-buy-hover` are different files. I cropped the button in both: it goes from #944AD1 to #B45AFF and the white "BUY $100" label stays legible. Nothing else changes. |
| Staged reveal | CORRECT | 1% shows a bar only, can't be selected and sits in the unnamed tail. 40% adds the requirement, 50% the picture and 80% the name and description, and detail panels show no more than their card. Nothing below 1% shows. |
| Required changes | MET | BattleDuty is in front after login. UPGRADES appears during the install and CHEATS after the purchase. CHEATS shows owned items only, with no prices. START GAME is in Loadout. There is no Go Live, no Change on the gun and no armour picker. |

## Round 4 lows and pushback

- **Fixed:**
  - 5 (reset copy);
  - 7 (picker divider and Empty slot copy);
  - 8 (heading indented);
  - 10 (Settings headings);
  - 11 (Advanced tools label and footer);
  - 12 (buyable items first; the three-column grid holds in every late group);
  - 13 (no zero-followers line).
- **PUSHBACK OK:**
  - 6 (reuse existing shop art; price alignment is fixed);
  - 9 (sparse but aligned Loadout panels);
  - 14 (picture-stage requirements stay per card; modest title themes in the opening).
- **Partly fixed, with a regression (medium finding 2):** 15. The focus ring is gone from START GAME after a restore, but a focus box now sits on the LOADOUT tab.
- **Partly fixed (low finding 6):** 14. The decorative Content divider is gone, but a scroll sliver remains.

## Findings, most important first

### Medium

1. **A hover tooltip on CHEATS cards covers the card's own title** (`mid-cheats-comfort`, `late-cheats-comfort`, `late-cheats-combat`, `late-cheats-killstreak`; about y840-945).
   - Hovering a card opens a native tooltip in a larger, different type style. The tooltip repeats the card's name and description word for word.
   - It is drawn over the card's title, so "Lag Switch" reads as "La~ Switch", and Stealth Bomber and Attack Helicopter are covered too.
   - Round 3 removed these popups from UPGRADES cards for the same reason. CHEATS was missed.
   - **Fix:** remove the tooltip from CHEATS cards. The detail panel already shows the full copy.

2. **On the first screen after login, the LOADOUT tab sits in a purple focus box** (`fresh-loadout`, `mid-loadout`, `late-loadout`, the `*-loadout-maximized` captures and the picker captures; about x410-596, y176-250).
   - The tab's underline is replaced by an outlined box, so the active tab looks different from every other tab and from `*-messages`, where it is a plain underline.
   - This is the round-4 START GAME ring moved to the tab, not removed. Every player sees it on every boot.
   - **Fix:** draw focus rectangles only after keyboard navigation. If the initial keyboard focus must land somewhere, keep it invisible until a key is pressed.

### Low (do not block)

3. **The gated price looks like the OWNED and MAX footers** (`late-upgrades-streakrules-page-2`: $3,000, $15,000 and $6,000; `late-upgrades-comfort-utility-page-2`: $5,000). Dim the box, or show the price as muted text with no border.

4. **Advanced tools section headers mix weights** (`*-advanced`). TOOLS is semibold, while AUDIO, KILLSTREAKS, KILLSTREAK RIDES, STORY and TESTING are regular weight. Use the semibold Settings style for all of them.

5. **The LiveTube shop's 1% tail has no separator** (`mid-livetube-shop-page-2`). Four bar tiles follow the "Next" cards directly. "Next" is generic, so no category leaks, but UPGRADES now uses a rule and a gap.

6. **A scroll sliver shows at the top of Content page 2** (`late-livetube-content-page-2`, about x1445-1790, y460-470). About 10 px of the previous row shows under "Past broadcasts". Add the trainer's top fade.

7. **The backdated opening history breaks the game's own rules** (`fresh-livetube-content*`, `fresh-livetube-overview`).
   - Streams of 11-27 minutes show 0 peak viewers and 0 kills, which contradicts the 10-viewer minimum and the 15-second zero-viewer stream end in GAME.md.
   - The latest stream's chart is a flat line.
   - Seed 1-3 peak viewers and a few kills instead.

8. **The killstreak shop sorts by availability, then arbitrarily** (`late-upgrades-killstreaks*`). Buyable items appear as 12, 15, 16, 17, 25 and 30 kills, then the owned 6, 9, 11 and 13. Sort by kill cost within each state.

9. **The fixture's best peak contradicts the stream list** (`mid-livetube-channel` says "Best peak viewers 1,000", while no stream in Content exceeds 800). This is fixture data only.

10. **The late reset says "13 bought cheats" while CHEATS shows "All 16".** This is explained by the base kit and ranks, and the "Your starting kit stays" line makes it understandable. Noted only.

11. **Picture-stage killstreak cards keep about 60 px of empty space under the requirement line** (`mid-upgrades-killstreaks`). This is cosmetic.

12. **Evidence nit:** `fresh-onboarding-overview` was captured mid-animation. The chart stops at about Day 12 and the Streams counter reads 27. Recapture after the chart finishes.
