# Final validation

Revision: 7b8d03749a2c0d97ac71a6f5c25bff8ec13ea118, based on origin/main 9aedfd8b8.

- pnpm test: PASS, all 11 steps, 152.3 seconds. This includes build, lint, formatting, unit tests, game rules, tools and map checks.
- All 286 affected desktop/persistence fixture tests: PASS. Five stale fixtures were updated without removing or weakening assertions; the same kamran-reviewer round cleared the updates.
- Exact discovery threshold and preceding-value rules tests: PASS as part of the game-rules tier.
- Native captures and real hover checks, plus headless keyboard/pointer, UPGRADES and Controls smoke: PASS in audit round 6.
- project import after rebase: PASS. No generated sidecars left untracked.
- pnpm test:first-run-playability, seed 1871: FAIL at tests/integration/first-run-playability.mjs:386, audience must be at least 5 at two minutes. Idle failure timing passed. The scenario reached 62 viewers and 53 kills at 90 seconds, then 2 viewers and 54 kills at 110 seconds. Cause unresolved; combat/audience reducers and the integration scenario are unchanged from main, but the main baseline has not been run.
- Two earlier playability attempts stopped before the game started because cold cheap-arena preparation exceeded its 60-second limit. A local artifact-only setup wrapper allowed five minutes for the unchanged generator; its round-trip receipt verified 327,088 physics nodes, 321,727 proxies, unchanged physics and zero external dependencies. The subsequent actual test used that verified cache. No setup timeout changes are included in the branch.
- git diff --check: PASS. Worktree clean. All owned engines and import sessions ended; peer export instance left untouched.

The PR discloses the failed opening check for Mac verification. External visual audit round 6 is APPROVED, and the implementer agrees with the UI approval.
