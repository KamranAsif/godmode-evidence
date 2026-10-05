"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tabletHandMotion = tabletHandMotion;
/** Continuous hold/reach/press/recovery weights, driven by the server's tap clock. */
function tabletHandMotion(sinceMs, tapAtMs) {
    const smooth = (value) => {
        const t = Math.max(0, Math.min(1, value));
        return t * t * (3 - 2 * t);
    };
    const reach = smooth((sinceMs - (tapAtMs - 250)) / 250);
    const back = smooth((sinceMs - (tapAtMs + 120)) / 300);
    const press = smooth((sinceMs - (tapAtMs - 90)) / 90) * (1 - smooth((sinceMs - tapAtMs) / 220));
    return { approach: reach * (1 - back), press };
}
//# sourceMappingURL=tablet_hand_motion.js.map