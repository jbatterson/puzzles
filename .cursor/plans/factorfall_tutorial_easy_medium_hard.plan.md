# Factorfall: Tutorial / Easy / Medium / Hard Puzzle Split

## Goal

Split Factorfall daily puzzles into **tutorial**, **easy**, **medium**, and **hard** (like Folds, Scurry, Sumtiles, Productiles). You will split the puzzle file; this plan covers only the **factorfall.jsx** code changes so daily selection uses one random puzzle per difficulty.

## Expected puzzle file shape

After you split [puzzlegames/factorfall/puzzles.js](puzzlegames/factorfall/puzzles.js), the export should be:

```js
export default {
  tutorial: [ /* existing tutorial puzzles, same shape */ ],
  easy:   [ /* { target, board, queue } ... */ ],
  medium: [ /* same shape */ ],
  hard:   [ /* same shape */ ],
}
```

- **Remove** the `all` array (daily will be built from easy + medium + hard).
- Each puzzle object stays `{ target, board, queue }` as it is today.
- Empty arrays are fine only if you add the optional guards below; otherwise ensure each of `easy`, `medium`, `hard` has at least one puzzle.

## Code changes in factorfall.jsx

### 1. Replace `getDailyPuzzles()` (lines 52–64)

**Current behavior:** Builds daily from a single `all` pool with three RNGs and deduplication.

**New behavior:** One RNG per difficulty; pick one puzzle from each of easy, medium, hard (same pattern as Sumtiles, Scurry, Productiles, Folds).

Replace the function with:

```js
function getDailyPuzzles() {
    const key = getDailyKey()
    const rngEasy   = seededRandom(key + ':easy')
    const rngMedium = seededRandom(key + ':medium')
    const rngHard   = seededRandom(key + ':hard')
    const easy   = puzzleData.easy   || []
    const medium = puzzleData.medium || []
    const hard   = puzzleData.hard   || []
    return {
        puzzles: [
            easy[Math.floor(rngEasy()   * easy.length)],
            medium[Math.floor(rngMedium() * medium.length)],
            hard[Math.floor(rngHard()   * hard.length)],
        ],
        key,
    }
}
```

- **Order:** Slot 0 = easy, slot 1 = medium, slot 2 = hard (matches the “1, 2, 3” puzzle boxes and completions).
- **Optional guards:** If a tier might be empty, you can guard before indexing, e.g. use `easy.length ? easy[Math.floor(rngEasy() * easy.length)] : null` and then in `getPuzzle()` skip or fallback when `daily.puzzles[i]` is null. Not required if every tier has at least one puzzle.

### 2. No other changes

- **getPuzzle()** already returns `daily.puzzles[dailyIdx]` for daily mode; it will now receive the easy/medium/hard triple.
- **Tutorial** still uses `puzzleData.tutorial[tutorialIdx]` — no change.
- **PuzzleBoxes**, **loadCompletions**, **markComplete**, and all UI that uses `dailyIdx` (0, 1, 2) and `daily.puzzles` stay as they are.
- **Free play** is independent (no change).

## Reference: same pattern elsewhere

- [puzzlegames/sumtiles/sumtiles.jsx](puzzlegames/sumtiles/sumtiles.jsx) lines 34–45: `getDailyPuzzles()` with `rngEasy` / `rngMedium` / `rngHard` and `puzzleData.easy` / `.medium` / `.hard`.
- [puzzlegames/scurry/scurry.jsx](puzzlegames/scurry/scurry.jsx) lines 30–37: same.
- [puzzlegames/productiles/productiles.jsx](puzzlegames/productiles/productiles.jsx) lines 34–41: same.
- [puzzlegames/folds/folds.jsx](puzzlegames/folds/folds.jsx) lines 117–124: same.

## Summary

| Location | Change |
|----------|--------|
| `getDailyPuzzles()` in factorfall.jsx | Use `puzzleData.easy`, `.medium`, `.hard` with three seeds (`key + ':easy'` etc.) and pick one puzzle per tier. Return `{ puzzles: [easyPuzzle, mediumPuzzle, hardPuzzle], key }`. Remove use of `puzzleData.all`. |
| puzzles.js (you) | Export `tutorial`, `easy`, `medium`, `hard`; remove `all`. |
| Rest of factorfall.jsx | No changes. |
