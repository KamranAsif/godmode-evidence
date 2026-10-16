# Desktop UI audit - round 1

Claude auditor. Branch `codex/desktop-progressive-ui` at `1a96bcd44`.
All 96 captures downloaded and viewed at 2560x1440, including half-crops.
Verdict: NOT APPROVED. 28 findings.

Required-change check: BattleDuty in front after login met. Cheats hidden until unlocked partly met: late lists NOT INSTALLED cheats with prices. Achievement staged reveal met at every tested stage. START GAME in Loadout met but weak. No Go Live in tab bar not cleanly met: BattleDuty / LIVE and READY remain. No Change on gun or armour picker met; Operator READY remains.

## High

1. Persistent Offline - Messages toast covers the bottom-right of every app and login (x2055-2535, y1210-1335). Clips picker EQUIPPED, UPGRADES BACK, patch slot 03 and Front Page rung. Dock in taskbar as unread badge or briefly show on new message; never over a window.
2. Tab bar still has BattleDuty / LIVE plus orange dot and READY. Delete all; right side holds only right-aligned wallet.
3. Bar-only achievement cards are full-size empty tiles. Mid upgrades, more combat, killstreaks, LiveTube shop and ladder look broken. Selecting Stream Boost leaves a 515x770 blank detail panel. Compact half-height tile, centered bar and faint lock glyph; prevent selection or show bar in detail; place after informative cards.
4. UPGRADES and CHEATS overlap. Late CHEATS lists unbought Landing 3/3, Loot Pool 6/6, Streak Rules 5/5, Fourth Card, Adrenaline, Starting Audience with prices. CHEATS must be owned-only, UPGRADES prices-only. Inconsistent names: Increased Ammo Pickup / Increased Ammo, Loot Pool / LOOT BOXES, Utility / COMFORT & UTILITY, Stats / STAT BOOSTS / MORE COMBAT UPGRADES, Predator Missile / Predator. Ban Evasion category inconsistent. Killstreak counts 12 vs VIEW ALL 10. Use one catalogue name/category.
5. Done-but-locked Streak Slot 4/5, Double Earn, Fifth Card have 100% bars and no explanation/button, different art/title/font/footer layout. State Unlocks at stream end or Ready to buy - $X, number on bar, standard layout. Check shared Streak Slot 4/5 requirement.
6. Loadout hierarchy: START GAME gold on purple low contrast, maximized white without ring. Make single strong white bold primary, ring only keyboard focus. Remove Operator READY, gun EQUIPPED, two streak EQUIPPED badges. Keep CHANGE only on streaks. Consistent column headers. Copy Pick your killstreaks, then start. Tighten 300px unused streak space and gun lower third.
7. Settings clutter: TESTING preview, log/report folders and F8/F5 hint belong in DEBUG. Ragged unlabeled stream toggles. Reset hint overlaps log buttons. Show FPS case inconsistent. Fullscreen typed caret plus gold box wrong. Labeled Display / Audio / Stream / Controls / Data groups, label/control rows, consistent heights.
8. LiveTube Overview Your channel heading clipped by overlapping shop card (x1795,y860). Own padded row or remove duplicate panel.
9. LiveTube purchase bars full with $0 and Need $2,000 more; UNLOCKED on unaffordable items, missing money repeated in button. Wallet/price bar, no UNLOCKED, one Need $X line.
10. Picker: Empty slot OWNED/document icon; self-comparisons EQUIPPED -> SELECTED, Kill chain 5 -> 5, Control ride -> ride; EQUIPPED thrice; every late card OWNED bar; 5 base kills vs 5 kills. Dashed empty tile, hide unchanged comparisons, EQUIPPED once, badges only in-slot, consistent wording and ASCII arrows.
11. Remove clipped redundant PATCH SLOTS - N INSTALLED - NO SLOT LIMIT strip. Bottom scrollbar, only 2.5-3 slots, name baseline wrong, repeats badges.

## Medium

12. Upgrade hero collides with grid/detail, hard edge. Scrolled half-cards under subtitle. Remove/confine banner, fade scroll edges.
13. Detail defaults offscreen Lag Switch OWNED. Status as second title, flat hierarchy, self-referential Buy in UPGRADES, mostly empty, OWNED duplicated. First visible selection, label/body hierarchy, one status, compact content.
14. Two Back buttons in group, wrong Collection wording, top-level BACK no destination. One < All upgrades top-left of group; none top-level.
15. Document icon used for ammo, patch strip, empty slot and section icons; Loot Boxes folder. Reuse real item art, remove sections' placeholder icons or consistent set.
16. Late Ban Evasion titles cut, descriptions ellipsized (Adrenaline, Loyal, Long Barrel), Stream Boost Rank 0/, Front Page rung unnamed. Two-line titles, full rank/description, public rung names.
17. Locked milestone killstreak cards: eight picture-only nameless cards repeating Reach Partner: 2000 best peak viewers. Rungs are not feats. Show common Unlocks at Partner (2,000 best peak viewers) once, names on cards, no individual requirement/bar.
18. Maximized loadout off-center: 210px gutter, odd right strip, tab rule stops early, wallet mid-window. Equal gutters, centered max-width body, full-width rules, right wallet.
19. Inconsistent state vocabulary: INSTALLED, ALWAYS ON, BASE KIT, OWNED, AVAILABLE, UNLOCKED, Installed - Permanent, v Owned, READY, EQUIPPED, MAX RANK. LiveTube owned state four times. One owned word, one footer: price and BUY $150 / OWNED / MAX.
20. Different H1 styles/sizes and headers; CHEATS counts and tight chip gap vs UPGRADES. One H1, section pattern, spacing.
21. VIEW ALL appears for 1/2 already-visible cards, floats right or touches next row. Only hidden-card groups, grid-edge aligned with standard spacing.
22. DEBUG top-level on fresh save; overlay shows SAVE/BACK under it, player copy (0.25 = 25%). Hide DEBUG behind console/setting; overlay replaces page.
23. Chat covers killstreak column, late beyond right edge. Time unavailable and Offline after contact message; cut first/last bubbles. Anchor to taskbar, fiction time or omit, fade edges.
24. Stream #30 is 71:00 onboarding vs 42:00 overview/content. Failed durations 47-80m despite 30m completion. List starts #0. Repeated empty-media boxes including 900px hero and empty 960x320 chart. Fresh chart scale0-100 vs peak3. Repeated title The crowd stayed for the last push. Durations below30 and consistent, start#1, collapse missing media, auto-scale chart, varied titles.

## Low

25. Controls developer hint includes fixed keys; off-palette column headers, small reset fonts, inconsistent margins. Use Click a key to rebind - Backspace clears - Esc cancels, house palette and Settings margins.
26. Login status/card right margins differ, AFTER HOURS meaningless, hardcoded 2 viewers last stream even late. Desktop focus clips (patched). Align, real history, fix focus bounds.
27. LiveTube window clips desktop labels/wallpaper text, nav glyphs not aligned, duplicate wallet, dashboard button redundant on dashboard, empty In progress header. Same inset as BattleDuty, nav grid, no redundant header/button.
28. Copy: ASCII arrows everywhere; Ammo packs give 3 -> 4 magazines; Get killed by your own killstreak 5 times; remove budget counter and PERMANENT PATCHES - BATTLE DUTY footer; consistent RIGHT MOUSE; 0 completed; label installer progress; remove install-wait chat placeholder; controlling-mouse banner must not collide with LiveTube titlebar.

## Capture-set notes

Byte-identical pairs: fresh-livetube-shop/bottom, mid-upgrades-growyourchannel/bottom, late-upgrades-growyourchannel/bottom, late-upgrades-lootpool/bottom. Late comfort-utility/bottom differs only clock. Drop bottom views when group fits.
