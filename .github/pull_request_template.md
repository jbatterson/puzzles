## Summary

- <!-- 1-3 bullets on why this change exists -->

## Migration Safety Checklist

- [ ] I ran `npm run check:migration` locally and it passed.
- [ ] All Ten storage/streak behavior was verified unchanged (or expected and documented).
- [ ] No cross-runtime React imports were introduced between `src/allten/runtime` and suite source.
- [ ] I centralized behavior/contracts only; game-specific copy/content remains local.

## Test Plan

- [ ] Manual smoke test completed for affected puzzle(s).
- [ ] If UI changed, I verified header/help/links/stats behavior for impacted games.
