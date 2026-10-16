# Response to desktop UI audit - round 2

All 24 findings were considered. The changes below retain the existing fonts, illustrations, reveal thresholds, purchase rules and desktop fiction. Round 3 is ready for audit, not a claim of approval.

| R2 | Decision and change |
| --- | --- |
| 1 | Agree. Advanced tools, Controls and Performance keep SETTINGS highlighted; hidden tab underlines cannot appear. |
| 2 | Agree. LiveTube uses the trainer's full frame and adapts the page, sidebar, chart and scrolling regions to its height. |
| 3 | Agree. UPGRADES appears from installation and owns the scripted purchase. CHEATS appears after the Ammo Pickup purchase. |
| 4 | Agree. A completed achievement with a purchase prerequisite shows "Buy [upgrade] first" and a disabled price footer. No completed progress bar or "Requirement met" line remains. Both shops follow this pattern. |
| 5 | Agree. Owned-only CHEATS cards have no repeated OWNED pills. Ranked items keep their rank. |
| 6 | Agree. Scripted chat stays above the trainer throughout the opening. The installer and purchase confirmation remain above the chat. |
| 7 | Agree. The shared catalogue now uses Combat (8), Channel (4), Run tools (7) and Ban wave (3), instead of one 22-item Stat Boosts group. Both tabs use that mapping. |
| 8 | Agree. Only the sidebar shows starting viewers. Overview uses Result instead of a duplicate audience tile, and the channel panel shows the current public milestone. Intro starting viewers are zero. Missing media says No preview or No clip yet. Synthetic histories now have unique titles, consistent completion counts/durations and curves that reach their declared peaks. Production recordings remain observations; existing histories are not rewritten to fabricate a matching curve. |
| 9 | Agree. Settings uses one scrolling column with Advanced tools under Data, a single SAVE footer, purple selected fills, distinct ON/OFF states and -/+ for shake. |
| 10 | Agree on distinct owned entries, grouped numbers, custom-controls copy and a visible hold track/fill. The reset uses the standard title. Clarification: the late fixture owns 16 cheats and 6 channel upgrades, not 5. The UI reads the actual save. A hold fill starts at zero until held; the round includes a holding capture rather than faking progress at rest. |
| 11 | Agree. Advanced tools and Performance use Settings' margins and title style. Buttons have one text size, Story is labelled, Performance is a row, and scrolling has stronger fades. |
| 12 | Agree. Streak cards and the gun panel are shorter; CHANGE sits beside the streak name, the counter aligns with the header, operator art starts below its header and its lower shade fades smoothly. |
| 13 | Agree. Disabled START GAME retains its purple fill. Focus adds an outline over the fill. |
| 14 | Agree. Single purchases use EFFECT, detail titles are bold, hidden names reserve no gap, and stream-end wording appears only after the achievement is met. |
| 15 | Agree on IN SLOT N, picker fades and the compact Empty slot detail. Partial pushback on filling the fresh picker: it has only the owned starting streaks and Empty slot, so the scroll region fits those cards. It does not expose unowned cards to fill space. |
| 16 | Agree. All surfaces use the roster's effect and the format "N kills. Effect." The loadout passes the effective kill cost when Hardline applies; the catalogue retains the base cost. That meaningful cost difference is intentional. |
| 17 | Agree. Upgrade scrolling extends down, the obsolete footer band is gone, fades are about 50 native pixels, CHEATS panel bottoms align, and group headers have space below VIEW ALL. Redundant upgrade-card hover popups are removed; the detail panel already holds their complete copy. |
| 18 | Agree. Reveal stages get separate rows. Requirement-only and picture-stage cards are compact and share the available row width, preserving every reveal threshold. |
| 19 | Agree. A uniform trainer body fills maximized gutters, tabs align with the centred content column and titlebar hover no longer leaves a different block. |
| 20 | Agree. Login status and notice share the right margin. Actual last-stream viewers use commas and singular grammar. |
| 21 | Agree. CHEATS fills a small group's row width and uses the same art/header geometry in All and filtered views. |
| 22 | Agree. Channel upgrades use distinct native glyphs, Recurring Tips is Title Case, the wallet is white, owned prices are hidden, redundant Creator dashboard buttons are removed, and metric panels share the right edge. |
| 23 | Agree. Unlimited rank labels, singular cheat/viewer copy, reroll/banish text, 24-hour chat time, latest-message scrolling, redundant sender labels and the loose first-loadout receipt are corrected. |
| 24 | Agree. Messages uses a tray-height icon and label with an unread dot. Mouse control uses a centred pill. The opening capture waits for login's transition to finish. |

## Two-line PR answer

UPGRADES is the shop for buying permanent cheats and higher ranks.  
CHEATS shows your owned kit; a future Cheats screen with Shop and Owned views could make this clearer, but these tabs remain separate in this change.

## Verification

`pnpm build`, `pnpm format`, `pnpm lint` (zero errors; existing max-lines warnings), 54 targeted rules/desktop tests and a headless desktop smoke passed. Native round 3 captures use isolated synthetic save files at 2560x1440. No game run was started from START GAME, no paid services were used and no new art was generated. Full final tests, opening playability verification and the requested kamran-reviewer round remain for the auditor-approved result before the PR.
