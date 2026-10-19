# Native Windows Playtest verification

Candidate: f58a1d8bcb2ebd7c6fc74cc3d6774f65e6f6e2c4, branch fix/unified-cheats-debug-20261018.
Baseline: official published Windows Playtest v0.50, source 66a7918558ed469b9ac0063b2a317ffd4467cd8b. Its desktop_trainer.ts and menu_ui.ts exactly match the pre-change main implementation.

Both sets of images are actual exported Windows executable native window captures at 1280x720, with the same $1000 / Ammo Pickup rank I / four installed items profile. No runtime inspection bridge or fixture UI was used. PCK inspection confirms playtest=true and inspectionBridge=false for both executables. The final candidate pack contains all five changed compiled JS files with hashes matching the worktree.

The local QA release export used runtime shader compilation (shader baking disabled only while packaging). All official build, strict arena, import and D3D12 checks passed. The production export preset was restored byte-for-byte; there is no shipping preset change. Its build-info dirty suffix reflects that temporary local QA preset. The exported candidate successfully booted headless to GODMODE_DESKTOP_BOOT_READY with loadingMs=18224 and no script errors.

Native checks completed:
- Shop: CHEATS selected, Shop/Owned views, permanent upgrades/ranks, progressive locked rows, details and prices retained.
- Owned: category filters/counts, four installed items, artwork, descriptions and instructions retained.
- Bought Ammo Pickup rank II for $75 using the actual Shop button. Wallet became $925 and Owned showed rank 2/3 and the updated three-magazine description.
- DEBUG: visible top-level tab, TUNING, sound set, unlock-all killstreaks, always-ready killstreaks, ride style, reset story, Save and Back retained.
- TUNING: native numeric fields/sliders, defaults/copy/back controls present.
- Changed all four DEBUG testing settings and clicked SAVE. Stopped the executable and relaunched the same isolated profile. after-debug-persist.png shows Sound New, Unlock ON, Ready ON and Phone overlay, with $925 retained. The saved configuration also confirms all four testing flags true.
- Stopped both owned native instances and released the capture session; no owned native window remains.

Independent visual auditor: PASS, no blocking findings (visual-audit.md). It reviewed full native before/after Shop, Owned and DEBUG plus Loadout, Tuning and purchase captures.

Validation: pnpm install; imports:seed; godot-cli project import; pnpm format; pnpm build; pnpm lint (0 errors, existing max-lines warnings); final targeted tests 48/48 passed.
pnpm test ran once: 10/11 steps passed. The sole failure was a cached-texture CLI test timing out in PowerShell Get-CimInstance Win32_Process under machine contention; its exact focused retry passed 1/1. The full command is not claimed green.

History: #2084 / 7d134b58c separated UPGRADES permanent purchases/ranks from CHEATS owned items and proposed future Shop/Owned views. The same change hid DEBUG, mapped it to SETTINGS and renamed the panel Advanced tools, reachable via Settings > Data > Advanced Tools > OPEN. This change restores the top-level DEBUG entry and retains AdvancedToolsRows for TUNING injection. Auto Cover had already been removed separately in #1035 and is not revived.
