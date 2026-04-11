/**
 * Single source of truth for reading per-day game progress from localStorage.
 * Shared by hub display (home.jsx), share plaintext, completion timer, and stats.
 */

/** Safe localStorage accessor — returns null if storage is blocked or unavailable. */
export function lsGet(key) {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

/** Tier completions for a three-puzzle game ([easy, med, hard]). */
export function loadCompletions(gameKey, dateKey) {
  return [0, 1, 2].map((i) => ['1', '2'].includes(lsGet(`${gameKey}:${dateKey}:${i}`)))
}

/** Tier perfects (first-try) for a three-puzzle game. */
export function loadPerfects(gameKey, dateKey) {
  return [0, 1, 2].map((i) => lsGet(`${gameKey}:${dateKey}:${i}`) === '2')
}

/** Move counts for a tile game; null per slot if not yet recorded. */
export function loadMoveCounts(gameKey, dateKey) {
  return [0, 1, 2].map((i) => {
    const v = lsGet(`${gameKey}:${dateKey}:${i}:moves`)
    return v != null ? parseInt(v, 10) : null
  })
}

export const CLUELESS_DIFFS = ['easy', 'medium', 'hard']

/**
 * Best-attempt count for one Clueless difficulty (1 = first try, 2–99 = number of CHECKs used).
 * Returns null if no completion is recorded for this slot.
 *
 * Handles three generations of Clueless storage:
 *   1. Current — per-difficulty key:  `clueless:dateKey:diff:bestAttempts`
 *   2. Pre-difficulty (medium only):  `clueless:dateKey:bestAttempts`
 *   3. Oldest format:                 `clueless:dateKey`  ('2' = solved, '1' = solved with hints)
 */
export function loadCluelessAttempt(dateKey, diff) {
  const v = lsGet(`clueless:${dateKey}:${diff}:bestAttempts`)
  if (v != null) {
    const n = parseInt(v, 10)
    if (n >= 1 && n <= 99) return n
  }
  if (diff === 'medium') {
    const legacy = lsGet(`clueless:${dateKey}:bestAttempts`)
    if (legacy != null) {
      const n = parseInt(legacy, 10)
      if (n >= 1 && n <= 99) return n
    }
  }
  const oldest = lsGet(`clueless:${dateKey}`)
  if (oldest === '2') return 1
  if (oldest === '1') return 2
  return null
}

/** All three Clueless difficulty attempts for the given date. */
export function loadCluelessAttempts(dateKey) {
  return CLUELESS_DIFFS.map((diff) => loadCluelessAttempt(dateKey, diff))
}
