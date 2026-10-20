# Drone validation scope

- PR source: 0f50b8afe (base f653eb0e3).
- Exported Windows Playtest: 55d120b17, SHA256 09cbf7a47631d03e272c8fe8e9b5229d67ad3119f6be54a157cc9e07e02d3776, 2,283,727,576 bytes. Standard shader-baked export receipt retained.
- Exact byte equivalence at current source: care_drone_model.ts, supply_drop_view.ts, killstreak_view.ts, care_delivery.ts, rules supply_drops.ts, and care-package-drone.glb.bin. See exported-visual-source-equivalence.json.
- Native capture PASS in the quiet slot: package launched 04:14:48Z, reached 04:16:14Z, touched automatically 04:16:21Z and applied Martyrdom 1 through the real picker 04:16:33Z. Screen and picker show Martyrdom 1, Magazine 1, Damage 1. Captures validate the approved model, live nose UI, rotating fans, friendly presentation, automatic contact, and a real upgrade pick. They do not claim to execute the later server eligibility refresh.
- Current-source care-delivery integration separately verifies an inbound NEW WEAPON card is refreshed after other upgrades fill all weapon slots, preserving the package identity. It also verifies moving contact, exact preview/picker payload, applied upgrade, death/respawn reroute, and FIFO delivery. Result: artifacts/care-delivery-e2e/result.json.
- Current-source six care-delivery rules tests, build, lint, and formatting pass. Full pnpm test ran once; the Windows process-query/EBUSY CLI tier passed its isolated rerun (289 pass, 6 skip, 0 fail).
- Existing before captures are from merged PR2124, Windows Playtest f11b03a37. They precede its hover-offset follow-up and show the old contact-arm geometry. They are not a pixel-matched camera baseline.
- Main's intervening change updates arena export memory phases and generated horizon data. This drone PR changes no canonical arena inputs. The visual evidence does not represent a regenerated arena from f653eb0e3.
- Final visual auditor and implementation reviewer verdicts remain pending until actual new native captures are inspected.
