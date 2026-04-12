/**
 * localStorage persistence for Honeycombs game state and completion tracking.
 * All functions are pure (no DOM, no React) and match the storage schema used
 * by the previous honeycombsEngine.js so existing saved progress is preserved.
 */

const GAME_STATE_VERSION = 1

function cellKey(r, c) {
  return `${r},${c}`
}

export function puzzleFingerprint(puzzle) {
  if (!puzzle) return null
  return JSON.stringify({ size: puzzle.size, clues: puzzle.clues })
}

/** Key for the per-puzzle completion flag ('1' = completed with undo/reset, '2' = perfect). */
export function completionKey(idx, dateKey, trackCompletion) {
  if (!trackCompletion) return null
  return `honeycombs:${dateKey}:${idx}`
}

/** Key for the full serialised game state. */
export function gameStateKey(idx, dateKey) {
  return `honeycombs:${dateKey}:${idx}:gameState`
}

/**
 * Persist the full game state to localStorage.
 * Cells are stored as {row, col, value, isClue} — cx/cy are reconstructed on load.
 */
export function saveGameState({
  idx,
  puzzle,
  cells,
  solved,
  activeDigit,
  moveHistory,
  usedUndoOrReset,
  dateKey,
}) {
  try {
    const payload = {
      version: GAME_STATE_VERSION,
      fingerprint: puzzleFingerprint(puzzle),
      solved: !!solved,
      activeDigit,
      usedUndoOrReset: !!usedUndoOrReset,
      cells: cells.map((c) => ({ row: c.row, col: c.col, value: c.value, isClue: !!c.isClue })),
      moveHistory: moveHistory.map((snap) => (Array.isArray(snap) ? [...snap] : snap)),
    }
    localStorage.setItem(gameStateKey(idx, dateKey), JSON.stringify(payload))
  } catch {
    // ignore storage failures
  }
}

/**
 * Load and validate previously saved state.
 * Returns hydrated state object on success, or null if missing / incompatible.
 * cx/cy in the returned cells come from baselineCells (authoritative geometry).
 */
export function loadGameState(idx, puzzle, baselineCells, dateKey) {
  try {
    const raw = localStorage.getItem(gameStateKey(idx, dateKey))
    if (!raw) return null
    const data = JSON.parse(raw)
    if (!data || data.version !== GAME_STATE_VERSION) return null
    if (data.fingerprint !== puzzleFingerprint(puzzle)) return null
    if (!Array.isArray(data.cells) || data.cells.length !== baselineCells.length) return null
    if (!Array.isArray(data.moveHistory)) return null

    const baselineByPos = new Map(baselineCells.map((c) => [cellKey(c.row, c.col), c]))
    const loadedByPos = new Map(data.cells.map((c) => [cellKey(c.row, c.col), c]))
    if (loadedByPos.size !== baselineByPos.size) return null

    const hydratedCells = baselineCells.map((base) => {
      const loaded = loadedByPos.get(cellKey(base.row, base.col))
      if (!loaded) return null
      if (loaded.row !== base.row || loaded.col !== base.col) return null
      if (!!loaded.isClue !== !!base.isClue) return null
      if (base.isClue && loaded.value !== base.value) return null
      return { ...base, value: loaded.value }
    })
    if (hydratedCells.some((c) => !c)) return null

    const cellCount = hydratedCells.length
    for (const snap of data.moveHistory) {
      if (!Array.isArray(snap) || snap.length !== cellCount) return null
    }

    return {
      solved: !!data.solved,
      activeDigit: data.activeDigit == null ? null : data.activeDigit,
      usedUndoOrReset: !!data.usedUndoOrReset,
      cells: hydratedCells,
      moveHistory: data.moveHistory.map((snap) => [...snap]),
    }
  } catch {
    return null
  }
}

/** Remove any stale saved state for this puzzle slot. */
export function clearGameState(idx, dateKey) {
  try {
    localStorage.removeItem(gameStateKey(idx, dateKey))
  } catch {
    // ignore
  }
}

/**
 * Record that the player completed a puzzle.
 * '2' = perfect (no undo/reset), '1' = completed but used undo/reset.
 * Never downgrades an existing '2'.
 */
export function markSolved(idx, usedUndoOrReset, dateKey, trackCompletion, onCompletionsUpdated) {
  const k = completionKey(idx, dateKey, trackCompletion)
  if (!k) return
  const existing = localStorage.getItem(k)
  if (existing === '2') return
  if (existing === '1' && usedUndoOrReset) return
  localStorage.setItem(k, usedUndoOrReset ? '1' : '2')
  onCompletionsUpdated?.()
}
