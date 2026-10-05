# Fresh-import ADS audit after #949

Source: KamranAsif/Godmode.exe-roguelite main 58ef817b4 (includes #949 and #951). No source changes applied.

The fresh machine-gun capture has both sight sockets at normalized screen (0.5, 0.5) and the physical front post tip at screen centre. All four capture receipts report ADS blend 1. Windows are 1920x1080, windowed at (-10000, -10000). These captures use the production Game/WeaponView path on a temporary weapons-review floor; the review script is not committed. Sniper ADS uses its production scope overlay.

The shipped machine-gun rear peep is a filled mesh, with a shallow open notch above it. The measurement config correctly calls it a notch. A socket-only correction cannot produce a view through a physical aperture. Mesh-correction scope was asked in chat and remains pending; no socket-only fix PR was opened. The old 40 px front-post displacement did not reproduce after importing the current asset. Stale imports are a possible explanation, not established from the old capture alone.

Validation:
- pnpm format: run; tracked tree remains clean.
- pnpm build: PASS, including generated arena. Client and server saved scenes match their builders.
- pnpm test: PASS, 13/13 root steps; test:unit 568/568, godot-cli 112/112.
- node --test tests/unit/external-models.test.mjs: PASS, 5/5.
- node tools/assets/place-weapon-sights.mjs --check: PASS; all measured sockets already placed.
- Headless roguelite smoke: connected peer 2, one player, 0 GODMODE_FRAME_ERROR and 0 SCRIPT ERROR; owned instance stopped.

Task status: the literal aperture requirement is unresolved pending mesh scope. Captures and measurements are evidence of the current imported assets, not a claimed aperture fix.
