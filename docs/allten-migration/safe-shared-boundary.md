# Safe Shared Boundary (Before Runtime Convergence)

This boundary defines what can be shared now versus what must stay isolated until All Ten and the suite run under one compatible React/runtime/toolchain setup.

## Share Now (Safe)

These are runtime-agnostic or low-risk items:

- Documentation contracts/checklists under `docs/allten-migration/`.
- Static assets (icons/images/svg) by URL or copied asset files.
- Pure data contracts and constants that do not import React, MobX view bindings, Stitches, or browser globals.
- Pure utility functions with no side effects and no framework imports (for example, formatting helpers copied into a neutral utility package).

Rule: if a module can run in a plain Node/TS context without DOM/framework globals, it is a candidate for sharing.

## Scope Guardrail

Centralize behavior/contracts; keep game-specific copy/content local.
See `docs/allten-migration/centralization-scope.md`.

## Do Not Share Yet (Must Stay Isolated)

These areas are currently tied to All Ten's React 17 + Webpack + Stitches runtime:

- `src/allten/main.jsx` and `src/allten/runtime/src/main.ts` (entrypoint/render lifecycle)
- `src/allten/runtime/src/view/*` (React components and layout system)
- `src/allten/runtime/src/stitches.config.ts` and all Stitches style bindings
- Any direct import of `src/shared/*.jsx` from `src/allten/runtime` internals (cross-runtime React element risk)
- Any component-level interop where one runtime renders elements created by the other runtime

## Conditional Sharing (Later, With Adapter)

Possible after explicit adapter contracts and tests:

- Expression engine modules under `src/allten/runtime/src/expr/*` if consumed as pure logic only.
- Date/math/string helpers under `src/allten/runtime/src/util/*` after verifying no hidden browser or framework coupling.
- Storage key helpers if exposed as typed constants/functions while keeping key names unchanged.

## Required Adapter Pattern

Until convergence, integration points must use one of:

- Serialized data boundary (JSON in/out)
- Function-call boundary where each side owns its own React tree
- Asset boundary (CSS/images) without component imports

Not allowed:

- Passing React elements/components across project boundary.
- Importing JSX components from one runtime directly into the other runtime bundle.

## Enforcement Checklist

- [ ] Shared module has no `react`, `react-dom`, `mobx-react-lite`, or `@stitches/react` imports.
- [ ] Shared module has no DOM or `window/localStorage` side effects at import time.
- [ ] Shared module is covered by unit tests in its owning package.
- [ ] All Ten storage key contract remains unchanged.
