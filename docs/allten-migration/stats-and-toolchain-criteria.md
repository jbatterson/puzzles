# Stats Stability And Toolchain Convergence Criteria

This defines the required stability bar for All Ten stats and for retiring the legacy Webpack UMD bundle path.

## Stats Runtime Stability Rule

All Ten game state and profile logic remain in [`src/allten/runtime/src/state/AppState.ts`](../../src/allten/runtime/src/state/AppState.ts); the suite builds that code via [`src/allten/main.jsx`](../../src/allten/main.jsx). **Do not change storage behavior** without an explicit migration.

Do not change:

- Profile key names/shape (`allten-profile`)
- Increment semantics for `numPlays`, `numStreak`, `numAllTens`
- Date semantics for `mostRecentPlayDate` and `mostRecentAllTen`

## Stats Migration Entry Criteria

Only begin stats surface migration when all are true:

- Header parity slice is deployed and stable.
- Help and links modal slices are deployed and stable.
- `npm run check:migration` passes on at least 2 consecutive release candidates.
- Manual regression checklist section C and D pass on real profile data.

## Toolchain Convergence Entry Criteria

Only begin wrapper decommission when all are true:

- No cross-runtime import violations (`check:allten-boundary`) for at least 2 release candidates.
- Header parity checks pass (`check:header-parity`) for at least 2 release candidates.
- All Ten storage tests pass consistently in CI.
- No production reports of streak/history regressions after prior slices.

## Wrapper Decommission Exit Criteria

Before treating the Webpack bundle path as fully retired (no root scripts, no copy steps):

- One pipeline builds all games with no wrapper page dependency.
- `puzzlegames/allten/index.html` does not load a prebuilt `bundle_allten.js`; it uses the Vite module entry.
- Storage continuity checks pass unchanged.
- Rollback plan exists and is documented for one release cycle (see below).

## Release candidate record (for “2 consecutive RCs”)

Use this table when satisfying “2 consecutive release candidates” in Stats Migration Entry Criteria and Toolchain Convergence Entry Criteria:

| RC tag / date | `check:migration` | Manual C + D (real profile) | Notes |
| ------------- | ----------------- | --------------------------- | ----- |
|               | pass / fail       | pass / fail                 |       |
|               | pass / fail       | pass / fail                 |       |

## Rollback (one release cycle)

If a deploy shows streak or profile regressions:

- Revert the offending PR or redeploy the last known-good build.
- Confirm `allten-profile` and dated `-problem` / `-targets` keys on the **same origin** as before (see [storage-compatibility-contract.md](storage-compatibility-contract.md)).
- Do not rename storage keys or change `loadFromStorage` order in a hotfix without a dual-read plan.
