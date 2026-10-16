# Round 3 response

I agree with both highs and all nine mediums. Round 4 addresses them and includes the confirmed purchase state, not just the frame before Confirm. The audit is saved beside this response. The capture index records the exact rendered commit.

Implementer verdict for round 4: APPROVED at baca948ee. External auditor approval remains pending.

| Finding | Response |
| --- | --- |
| 1 - Gold hover / grey wash | Fixed at the shared desktop style. Purple focus, a faint purple hover edge, and the resting card fill replace gold and grey. Desktop shortcuts follow the same rule. Filled primary buttons keep white labels through hover, press and keyboard focus. A current picker item uses its slot label without the selected-card treatment. Scroll fades blend into the page's near-black colour. |
| 2 - Grid widths | Fixed three-column widths for identity, picture, requirement and bar stages. Compact stages retain their shorter heights. Incomplete rows leave unused cells rather than stretching cards. |
| 3 - Loadout bottoms | All three outer panels end together. Weapon and streak content stays top-aligned; five-slot loadouts fit within that same frame. |
| 4 - Bar-only section names | Pure bar discoveries are collected in an unnamed tail after informative groups. No category heading or View All count discloses those items. They remain non-selectable bars only. |
| 5 - Shop letter icons | Replaced every letter tile with an existing approved upgrade illustration. Picture-stage items still reveal their illustration at 50%; no new art or API was needed. |
| 6 - Settings | Resolution choices wrap inside the same control column. Shake and volume share a plain value and minus/plus stepper. ON/OFF toggles are compact. DATA follows the visible stream settings, RESET ALL DATA has a red edge and a Saved progress label, and SAVE ends at the control column's edge. |
| 7 - Scripted purchase | The tutorial's ammo card occupies a clear middle position beside the chat. Confirm is filled purple. Round 4 includes a separate post-confirm capture showing the debit and Rank 1/3. Purchase persistence and replay protection still use the existing transaction path. |
| 8 - Empty fresh UPGRADES | Fixed the audit fixture. It had incorrectly omitted ammoPickup from stock after buying Rank 1. The real tutorial save already retains this stocked item; the fresh fixture now matches it and shows Rank 2's price/shortfall. No extra upgrades are revealed. |
| 9 - Straight viewer chart | Audit fixtures now use deterministic rises, dips and a late spike, normalized to their recorded peaks. Actual recordings are untouched. Streams with five or fewer peak viewers use a step chart. |
| 10 - CHEATS card size | Compact illustrated cards use the same fixed column width in All and category views. Fresh's four cards fit without scrolling; singleton categories retain one normal-width card. |
| 11 - Failed streams | Corrected the synthetic history's invalid `died` value to the supported `failed` ending and its unbanked earnings to $0. Content shows STREAM FAILED and an earned amount. Existing records retain their actual recorded ending and earnings. |
| 12 - Settings body / footer band | Settings, Controls, Advanced tools, Tuning and reset use the same near-black body colour. The surrounding window body matches it to the bottom edge. |
| 13 - Disabled BUY | Completed but purchase-gated cards now show a disabled price without the BUY verb. The LiveTube group is called Next. |
| 14 - Installer / chat | Preparing and Installing stay disabled until Finish. The installer sits clear of the chat close button. The completed shortcut no longer has an unfinished progress underline or disabled appearance. The reply field uses the surrounding input frame without its second border. Limited pushback on the older-bubble sliver: keep continuous chat scrolling with edge fades rather than snapping messages out of the history. The input border and installer overlap are fixed. |
| 15 - Advanced / Tuning | Renamed the visible page Tuning and made its entry one full-width row. Limited pushback: keep actions appropriate to each page instead of forcing every footer to have the same buttons. Tuning applies immediately and needs Reset / Copy / Back; Controls needs Save / Restore / Back. Keep tuning's full supported ranges: reducing them would restrict tester tools. Precise numeric fields remain beside every slider. |
| 16 - Picker states | Both slot markers are quiet text. Removed the repeated current-slot sentence, kept the disabled EQUIPPED action, and scroll a newly selected card into view after layout. Cards are shorter; the owned six-card CHEATS killstreak group also fits without stray scrolling. |
| 17 - Details | Single-purchase items use EFFECT whether owned or unowned. Removed unused dividers from CHEATS details, added the purchased rank, and use Aimbot's effect on both card and detail with its control hints separately below. |
| 18 - Maximized rule | Body panels start below the tab-bar rule so the centered content no longer covers it. Header surfaces use the same fill across the window. |
| 19 - Copy / order | Fixed singular peak viewer, kept knife number/unit together, used armour instead of shield, removed repeated Lag Bullets wording and fixture stream-number suffixes, and matched mouse labels and milestone wording. Shop and CHEATS use the shared category ordering, including the killstreak roster. Discovery stages remain grouped so compact cards do not alternate heights arbitrarily. Fresh reset says Your starting kit stays, and zero channel-upgrade clauses are omitted. |
| 20 - Small layouts | Messages now has a speech-bubble tail. Shortened Your channel, added Content scroll fades and trimmed picker cards. Limited pushback: keep the offline player and No preview areas as media placeholders when no real recording exists. Keeping the offline player at its standard aspect ratio gives the channel a stable stream layout before and after its first recording. Missing media remains explicitly labelled. |

No pushback on the required changes, either high, or any medium. The remaining limits are the deliberate tool actions/ranges, continuous chat scrolling and missing-media presentation described above. This response is not a claim of auditor approval.

Two-line answer retained for the eventual PR:

UPGRADES is the shop for buying permanent cheats and higher ranks.  
CHEATS shows your owned kit; a future Cheats screen with Shop and Owned views could make this clearer, but the tabs remain separate in this change.
