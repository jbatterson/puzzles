/**
 * Persists tutorial mode and puzzle index in sessionStorage so a full page reload
 * keeps the player in the tutorial on the same step. Cleared when mode is daily.
 */

const STORAGE_PREFIX = 'puzzle:tutorialResume:'

function sessionAvailable() {
  return typeof sessionStorage !== 'undefined'
}

/**
 * @param {string} gameKey — from GAME_KEYS
 * @param {number} tutorialLength
 * @returns {{ tutorialIdx: number } | null}
 */
export function readTutorialResumeState(gameKey, tutorialLength) {
  if (!sessionAvailable() || tutorialLength < 1) return null
  try {
    const raw = sessionStorage.getItem(STORAGE_PREFIX + gameKey)
    if (!raw) return null
    const d = JSON.parse(raw)
    if (!d || d.v !== 1 || typeof d.tutorialIdx !== 'number' || !Number.isFinite(d.tutorialIdx)) {
      return null
    }
    const idx = Math.max(0, Math.min(tutorialLength - 1, Math.floor(d.tutorialIdx)))
    return { tutorialIdx: idx }
  } catch {
    return null
  }
}

/**
 * @param {string} gameKey
 * @param {unknown} tutorialArray — puzzleData.tutorial (or [])
 * @returns {{ mode: 'daily' | 'tutorial', tutorialIdx: number }}
 */
export function getInitialTutorialNav(gameKey, tutorialArray) {
  const len = Array.isArray(tutorialArray) ? tutorialArray.length : 0
  const r = len > 0 ? readTutorialResumeState(gameKey, len) : null
  return {
    mode: r ? 'tutorial' : 'daily',
    tutorialIdx: r ? r.tutorialIdx : 0,
  }
}

/**
 * @param {string} gameKey
 * @param {'daily' | 'tutorial'} mode
 * @param {number} tutorialIdx
 */
export function persistTutorialResumeState(gameKey, mode, tutorialIdx) {
  if (!sessionAvailable()) return
  try {
    if (mode === 'tutorial') {
      sessionStorage.setItem(STORAGE_PREFIX + gameKey, JSON.stringify({ v: 1, tutorialIdx }))
    } else {
      sessionStorage.removeItem(STORAGE_PREFIX + gameKey)
    }
  } catch {
    // ignore quota / private mode
  }
}
