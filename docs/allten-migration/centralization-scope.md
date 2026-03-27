# Centralization Scope Rule

Use this rule during migration to avoid low-value churn.

## Centralize

- Cross-game behavior contracts and adapter APIs.
- Shared chrome behavior (header actions, modal intents, interaction semantics).
- Safety and regression tooling (`check:migration`, CI checks, boundary checks).

## Keep Local

- Puzzle-specific instructional text and narrative copy.
- Puzzle-specific goal wording and content presentation details.
- Per-game content that does not affect shared behavior contracts.

## Decision Heuristic

If a change reduces cross-runtime break risk or enforces consistency of behavior, centralize it.
If a change only relocates game-specific copy/content, keep it in the game file.
