import assert from "node:assert/strict";
import { createRequire } from "node:module";
import test from "node:test";
const { tabletHandMotion } = createRequire(import.meta.url)("../../.godot/GodotJS/scripts/tablet_hand_motion.js");

test("tablet release, press and return stay continuous at tap boundaries", () => {
    for (const t of [900, 1060, 1150, 1270, 1370, 1570]) {
        const before = tabletHandMotion(t - 0.001, 1150);
        const after = tabletHandMotion(t + 0.001, 1150);
        for (const key of ["approach", "press"]) assert.ok(Math.abs(before[key] - after[key]) < 0.0001);
    }
    assert.equal(tabletHandMotion(1150, 1150).press, 1);
    assert.equal(tabletHandMotion(900, 1150).approach, 0);
    assert.equal(tabletHandMotion(1570, 1150).approach, 0);
});

test("tablet 60Hz samples and the 3.33ms return boundary cannot switch grip weights abruptly", () => {
    for (let t = 850; t <= 1600; t += 1000 / 60) {
        const before = tabletHandMotion(t, 1150),
            after = tabletHandMotion(t + 1000 / 60, 1150);
        assert.ok(Math.abs(before.approach - after.approach) < 0.11);
        assert.ok(Math.abs(before.press - after.press) < 0.28);
    }
    assert.ok(Math.abs(tabletHandMotion(1566.6667, 1150).approach - tabletHandMotion(1570, 1150).approach) < 0.001);
});
