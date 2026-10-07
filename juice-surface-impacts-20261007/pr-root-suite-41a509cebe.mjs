import { GATE_STEPS, runRootSuite } from '../../tools/test/run-root-suite.mjs';
// Explicit Kamran PR policy (2026-10-07): compile scripts, never generate the arena.
const build = GATE_STEPS.find(step => step.name === 'build');
if (!build || build.run !== 'pnpm build') throw Error('Root suite changed; review the PR build substitution');
build.run = 'pnpm build:scripts';
console.log('PR POLICY: root build step uses pnpm build:scripts. Arena freshness/fingerprint failures are accepted only; every other failure blocks merge.');
process.exitCode = await runRootSuite();
