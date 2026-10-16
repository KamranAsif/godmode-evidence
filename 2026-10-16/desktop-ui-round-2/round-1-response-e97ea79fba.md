# Implementer response to round 1

The two missed required changes are fixed: the LIVE/dot/READY tab-bar chrome is deleted, and CHEATS is owned-only even if every achievement is earned and the wallet can buy everything. UPGRADES remains the shop. No tabs were merged.

| Finding | Response and round 2 change |
| --- | --- |
| 1 | Agree. Removed the persistent toast. Messages is a taskbar button, hidden at login. |
| 2 | Agree. Wallet only, anchored to the window's right edge. |
| 3 | Agree with compact bars, ordering and selection fix. Progress-only cards occupy 76px rows after informative cards and cannot take selection. **Pushback:** no lock glyph at 1%, because Kamran explicitly required only a progress bar. |
| 4 | Agree. CHEATS filters owned items at the read-model boundary, not merely locked items. Both tabs now use the same six catalogue categories. Chip labels use those names too. Owned counts and shop counts intentionally differ: the former include the two base-kit killstreaks, the latter only purchasable items. No purchasable base-kit duplicates were added to make counts match. |
| 5 | Agree. Completed-but-gated cards use the same layout and state the remaining prerequisite (or stream-end award), with 100% on the bar. Streak Slot 4 and 5 intentionally share the streakSlots achievement and require the previous slot purchase; the rules were not changed. |
| 6 | Agree. Consistent white bold START GAME, focus-only ring, no fixed-kit selected badges, common header sizes, corrected directional copy. Streak cards fill the available height and include their actual control description. |
| 7 | Agree. Labeled Settings groups, regular rows and controls. Preview/logs/report folders/replay moved to Advanced Tools. Reset hint below its button. Fullscreen/resolution use native pressed state without typed caret. |
| 8 | Agree. Overview's duplicate purchase card replaced with a padded next-stream summary and shop link. |
| 9 | Agree. Known purchasable items use wallet/price, no UNLOCKED pill, a single missing-money control. Achievement progress remains achievement progress. |
| 10 | Agree. Dashed empty slot with no document/owned badge; hide unchanged comparison rows; only in-slot cards get a badge; detail has one EQUIPPED action; consistent kills and ASCII arrows. |
| 11 | Agree. Removed patch strip entirely. |
| 12 | Agree. Removed upgrade hero and added scroll edge fades. |
| 13 | Agree. First displayed selection on opening/group change; compact detail, separate name/current/next text, no shop-within-shop instruction. Owned state only on the action footer. |
| 14 | Agree. One < All upgrades control in expanded groups; no top-level Back button. |
| 15 | Agree with eliminating document/folder placeholders. Ammo Pickup reuses the already approved Supply Line crate illustration. Removed section icons and empty-slot art. No new paid art or APIs. |
| 16 | Agree. More room for two-line names and full effect copy, full-width rank line; public ladder always names all rungs. |
| 17 | Partial agreement. Commas now format milestone counts. **Pushback:** showing locked upgrade identities early contradicts the explicit 75% name/description rule. Those cards retain staged discovery. The separate public channel ladder shows names and thresholds without masquerading as hidden achievements. |
| 18 | Agree. Full-width chrome rules and wallet anchored right. Body remains a centered maximum-width column. |
| 19 | Agree. Collection uses OWNED, shop action uses BUY $X / Need $X / OWNED / MAX, picker uses a slot-specific badge. Removed repeated LiveTube owned pills and permanent/installed copy. Progress gates still explain what is missing. |
| 20 | Agree. Shared 30px heading scale, same catalogue section labels, consistent gaps. Existing desktop and LiveTube fonts retained. |
| 21 | Agree. VIEW ALL only when more than three items exist, aligned to the grid edge. |
| 22 | Agree. No top-level DEBUG. Tools are behind Settings > Advanced Tools. Performance background covers the full tools panel so underlying SAVE/BACK do not show through. Developer numerical explanations remain inside that explicitly advanced page. |
| 23 | Agree on bounds, missing-time copy, presence and scroll fades. Chat opens above the taskbar at the left and cannot drag past desktop bounds. **Pushback on absolute non-overlap:** an intentionally opened message window remains a floating desktop window; it may overlap the app behind it. It no longer sits over the right-hand loadout actions, and there is no persistent overlay while it is minimized. The scripted opening conversation remains visible as required by the story. |
| 24 | Agree. Newly seeded failed streams last 5-28 minutes, with matching timelines. Capture fixtures number earned streams from 1 and now use the correct samples field and varied titles. Chart scales to its actual peak. Missing captures show a styled offline state. Existing player VOD history is not rewritten or fabricated; synthetic round 2 timelines are explicitly labeled as fixtures. |
| 25 | Agree. Concise rebind hint, muted headers and readable RESET type. |
| 26 | Agree. Login status and notice share right margin, brand uses BattleDuty, actual latest peak read from history, desktop shortcut focus accommodates its two-line caption. |
| 27 | Agree. LiveTube uses the trainer inset, a common left-aligned nav grid, one wallet, no redundant dashboard button on Overview, no empty shop group headings. |
| 28 | Agree. ASCII arrows, explicit magazines, softer self-kill wording, no budget/footer clutter, consistent mouse labels, completed-stream wording, installer progress text, no install-wait input placeholder, mouse-control caption moved off the app titlebar. |

## Two-line PR answer

UPGRADES is the shop for buying permanent cheats and higher ranks.  
CHEATS shows only your owned kit; combining Shop and Owned views in one future Cheats screen could make this clearer, but this change does not merge them.

## Capture discipline

Round 2 omits bottom views when all cards fit. All published PNGs remain original 2560x1440 godot-cli captures. The upload index identifies synthetic saves, verification and remaining pushback; it is not a claim of auditor approval.
