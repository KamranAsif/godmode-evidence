import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
const instance = process.argv[2];
if (!/^juice-audio-main-integration[0-9]+$/.test(instance ?? '')) throw Error('Exact owned integration instance required');
const env = { ...process.env, GODMODE_SESSION_ID: 'juice-147' };
delete env.GODMODE_PREBUILT_GENERATING;
execFileSync(process.execPath, ['tools/maps/prebuilt/build.mjs', '--check'], { env, windowsHide: true, encoding: 'utf8' });
const cli = (...args) => JSON.parse(execFileSync(process.execPath, ['tools/godot-cli/dist/src/index.js', ...args, '--project', process.cwd(), '--json'], { env, windowsHide: true, encoding: 'utf8', maxBuffer: 40e6 }));
const act = (name, payload) => cli('runtime', 'action', '--instance', instance, '--name', name, '--payload', JSON.stringify(payload));
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
const head = execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
const reports = [];
let started, stop, store, lastObserved, passed = false;
try {
    started = cli('game', 'run', '--headless', '--fixture', 'roguelite', '--inspect', '--allow-actions', '--scene', 'res://artifacts/juice/audio_review.tscn', '--instance', instance, '--settings-path', process.cwd() + '/artifacts/juice/settings.cfg');
    if (!started.ok) throw Error(started.message);
    const began = Date.now();
    while (Date.now() - began < 45000) {
        try { store = cli('runtime', 'inspect', '--instance', instance, '--store-only').data?.store; } catch {}
        if (store?.roguelite?.survivalPlayer?.health > 0 && store?.roguelite?.enemies?.some(e => e.health > 0)) break;
        await wait(1000);
    }
    if (!(store?.roguelite?.survivalPlayer?.health > 0)) throw Error('No live player');
    if (!store.roguelite.enemies?.some(e => e.health > 0)) throw Error('No live enemy before fixture isolation');
    act('debug_console', { run: 'invincible on', open: false });
    act('input', { release: true });
    // Keep enemies alive: killall drops XP that the merged pickup magnet can collect and open a paused level-up.
    act('debug_console', { run: 'timescale 0.001', open: false });
    await wait(1500);
    const observed = lastObserved = act('juice_lifecycle_observe', {}).data?.result;
    if (observed?.paused) throw Error('Fixture world paused before reports');
    for (const bus of ['GameplaySfx', 'GameplayUI', 'GameplayPriority', 'GameplayStream']) {
        if (!observed?.audio?.buses?.includes(bus)) throw Error('Missing merged audio bus: ' + bus);
    }
    for (const family of ['rifle', 'pistol', 'shotgun']) {
        for (const distanceMeters of [1, 6, 20, 40]) {
            await wait(1100);
            const before = lastObserved = act('juice_lifecycle_observe', {}).data?.result;
            if (before?.paused) throw Error('Fixture world paused before report');
            const result = act('juice_report_fixture', { cue: `combat-enemy-${family}`, distanceMeters, variant: 'after' }).data?.result;
            if (!result?.accepted) throw Error('Production report refused');
            // Both pool snapshots belong to this one synchronous production call, excluding intervening unrelated cues.
            const previouslyIdle = new Set(result.beforeVoices.filter(v => !v.playing).map(v => v.index));
            const newVoices = result.voices.filter(v => v.playing && previouslyIdle.has(v.index));
            reports.push({ family, distanceMeters, previouslyIdle: previouslyIdle.size, newVoices, before, result });
            if (result.paused) throw Error('Fixture world paused during report');
            if (previouslyIdle.size >= 2) {
                const expected = distanceMeters < 32 ? 2 : 1;
                if (newVoices.length !== expected) throw Error(`Unexpected ${family}/${distanceMeters} voice count: ${newVoices.length}`);
                if (distanceMeters < 32 && !newVoices.every(v => Math.abs(v.volumeDb - v.ceilingDb) < .0001)) throw Error('Layer trim ceiling differs from nominal gain');
                if (distanceMeters === 40 && newVoices[0].ceilingDb !== 3) throw Error('Ordinary pool ceiling did not reset');
            }
        }
    }
    const log = readFileSync(started.data.logPath, 'utf8');
    const scriptErrors = log.split(/\r?\n/).filter(s => /SCRIPT ERROR|Unhandled|TypeError|ReferenceError|FATAL:/.test(s));
    if (scriptErrors.length) throw Error(scriptErrors.join('\n'));
    if (reports.some(row => row.previouslyIdle < 2)) throw Error('Busy pool prevented exhaustive 12-source layer integration; defer instead of claiming coverage');
    passed = true;
    writeFileSync(`artifacts/juice/${instance}-observed.json`, JSON.stringify({ head, passed, buses: observed.audio.buses, reports,
        health: store.roguelite.survivalPlayer.health, scriptErrors, otherErrors: log.split(/\r?\n/).filter(s => s.includes('ERROR:')),
        simulationScale: .001, setup: 'Testing invincibility and slow simulation isolate bounded report sources with enemies alive; no killall/XP drops or pause bypass.',
        scope: 'Current-head headless production audio API and pool/bus integration. No rendered, audible quality, continuous motion or natural enemy attack claim.', testBypass: false }, null, 2));
} finally {
    if (started?.ok) stop = cli('game', 'stop', '--instance', instance);
    writeFileSync(`artifacts/juice/${instance}-diagnostics.json`, JSON.stringify({ head, passed, lastObserved, reports }, null, 2));
    writeFileSync(`artifacts/juice/${instance}-proof.json`, JSON.stringify({ head, passed, started, stop, testBypass: false }, null, 2));
}
console.log(JSON.stringify({ head, passed, reports: reports.length, stop }));
