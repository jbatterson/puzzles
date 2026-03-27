# All Ten Regression Checklist (Migration Gate)

Run this checklist before and after each migration step. A step is complete only if every required check passes.

## Operational rhythm (each All Ten–related milestone)

From repo root, run the full automated gate:

- `npm run check:migration` — runs `check:allten-boundary`, `check:header-parity`, `AppState` Jest tests in `src/allten/runtime`, and `vite build`.

When changing anything that can affect **profile, streak, or storage keys**, also run manual sections **B–D** below; when changing **solve/counter semantics**, include section **C**.

CI should stay green: `.github/workflows/migration_safety.yml` runs `npm run check:migration` on pushes and PRs.

## A. Automated Checks

From repo root (same as `check:migration` build + tests):

- `npm run check:migration`

Or run the pieces separately:

- `npm --prefix src/allten/runtime run test -- AppState.test.ts`
- `npm run build` (Vite; All Ten is built from [`src/allten/main.jsx`](../../src/allten/main.jsx) and runtime sources under [`src/allten/runtime/src`](../../src/allten/runtime/src))

Expected:

- Tests pass (especially storage cleanup and profile-preservation tests).
- Root Vite build succeeds; `dist/puzzlegames/allten/` contains the built All Ten page and hashed assets (no dependency on a pre-copied Webpack `bundle_allten.js`).

## B. Manual Storage Continuity Checks

Use a browser profile with existing All Ten history if available.

1. Open `/puzzlegames/allten/`.
2. Confirm game loads with no initialization error.
3. In DevTools Application tab, verify key exists:
   - `allten-profile`
4. Record baseline values:
   - `numPlays`, `numStreak`, `numAllTens`, `mostRecentPlayDate`, `mostRecentAllTen`.
5. Reload page and confirm values are unchanged unless a play action occurred.

Pass condition: values persist across reload and match pre-step baseline.

## C. Daily Play Flow Checks

1. Solve one valid target for today.
2. Confirm:
   - target state persists after reload
   - `numPlays` increments once for first solve of the day
   - `numStreak` increments once for first solve of the day
3. Complete all ten targets for the day.
4. Confirm:
   - results flow appears
   - `numAllTens` increments exactly once for the day
   - `mostRecentAllTen` updates to today

Pass condition: all counters and dates update exactly once per day where expected.

## D. Header/Modal Behavior Checks

For All Ten:

- Left menu/home control does not crash.
- Cube/links modal opens and closes correctly.
- Stats opens and closes correctly.
- Help opens and closes correctly.

For non-All Ten games:

- Shared top bar remains full width.
- Home button routes to hub.
- Cube opens All Ten-style links modal.
- Help opens game-specific instructions content.
- Stats control is hidden.

Pass condition: behavior matches current product expectations with no console errors.

## E. Date Boundary Sanity Check

At least once during migration, test around date rollover logic:

- Simulate/verify behavior when `mostRecentPlayDate` is before yesterday.
- Confirm streak resets to `0` when expected and does not reset incorrectly.

Pass condition: streak logic follows current `updateProfileStatsToToday()` semantics.

## F. Release Gate Template

Use this short gate in PR notes:

- [ ] `npm run check:migration` passes (or CI migration workflow green)
- [ ] Storage continuity validated (`allten-profile` unchanged unless expected)
- [ ] Daily play counters validated (section C when relevant)
- [ ] Stats/help/links/header interactions validated
- [ ] No React runtime mismatch errors
