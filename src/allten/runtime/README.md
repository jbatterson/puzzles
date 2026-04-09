# All Ten — Runtime Subpackage

This directory is the TypeScript/Webpack/Jest subpackage for the All Ten game. It lives inside the larger [puzzle suite](../../../README.md) and is being incrementally migrated to the suite's Vite build.

> **Architecture note:** The primary integration path for this game in the puzzle suite is the Vite module entry at `src/allten/main.jsx`. The legacy `AllTenClient.render` bundle described below still works but is not the active deployment path. See [`docs/allten-migration/`](../../../docs/allten-migration/) for the full migration context before making changes that cross the suite/runtime boundary.

## Install

The canonical lockfile is **`package-lock.json`**. Always use `npm ci`:

```bash
npm ci --prefix src/allten/runtime
```

Do not use `yarn` or `npm install` — they will generate a new lockfile and overwrite the pinned dependency tree. Named lockfile variants (`*-AoPS-*`) that may appear in your working tree are personal environment snapshots and are not committed to the repo.

## Development

All source code lives in `src/`. The stack is React 17, MobX, Stitches, TypeScript, Webpack, Jest, and Storybook 6.

```bash
npm run check       # lint + type-check + tests (full gate)
npm run lint        # ESLint only
npm run ts-check    # TypeScript type check only
npm test            # Jest only
npm run storybook   # Launch Storybook dev server
```

> CI runs only `AppState.test.ts` as part of the suite migration gate (`npm run check:migration` at the repo root). Run `npm test` here to execute the full Jest suite including `Expressions.test.ts` and `Storyshots.test.ts`.

> **Jest + shared-contracts:** `babel.config.js` in this directory is a Babel project-wide config (as opposed to the `"babel"` key in `package.json`, which is file-relative). This lets `babel-jest` transform ESM modules in `shared-contracts/` even though they live outside this subpackage. If you add new `shared-contracts` imports to tested code, they will work automatically.

The Storybook **static build** (`storybook-static/`) is gitignored — it is a generated artifact and should not be committed. Run `npm run build-storybook` to regenerate it locally if needed.

## Legacy bundle build

The Webpack build produces `public/dist/bundle_allten.js`, which exposes an `AllTenClient` global for embedding the game directly on a page:

```js
AllTenClient.render(containerElement, props)
```

This path is kept for reference during migration. The puzzle suite uses the Vite module entry instead. See [`stats-and-toolchain-criteria.md`](../../../docs/allten-migration/stats-and-toolchain-criteria.md) for the criteria that will trigger retiring the Webpack build.

```bash
npm run build       # development bundle → public/dist/bundle_allten.js
npm run build-prod  # production bundle
```

## Source overview

See [`src/README.md`](src/README.md) for a walkthrough of the source tree.
