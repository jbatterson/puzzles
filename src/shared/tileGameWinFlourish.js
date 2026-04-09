/**
 * Sum Tiles / Productiles win flourish: matches progress dice green (#6b9b3b) and
 * Folds `.folds-win-flourish-pop` timing / peak scale (see `src/shared/style.css`).
 */

export const TILE_WIN_HIGHLIGHT_FILL = 'rgba(107, 155, 59, 0.25)'

export const TILES_FLOURISH_STAGGER_MS = 52
export const TILES_FLOURISH_POP_MS = 420
export const TILES_FLOURISH_WAVE_CAP = 14
/** Same formula as `FOLDS_WIN_FLOURISH_TOTAL_MS` in folds.jsx */
export const TILES_WIN_FLOURISH_TOTAL_MS =
  TILES_FLOURISH_WAVE_CAP * TILES_FLOURISH_STAGGER_MS + TILES_FLOURISH_POP_MS + 120

const FLOURISH_PEAK = 1.7

function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : 1 - (2 - 2 * t) ** 2 / 2
}

/**
 * Scale for one grid number during the flourish phase (canvas); `elapsed` = ms since flourish started.
 */
export function tileWinFlourishScale(
  elapsedMs,
  waveIndex,
  staggerMs = TILES_FLOURISH_STAGGER_MS,
  popMs = TILES_FLOURISH_POP_MS
) {
  const t0 = waveIndex * staggerMs
  const t = elapsedMs - t0
  if (t <= 0 || t >= popMs) return 1
  const u = t / popMs
  if (u < 0.4) {
    const e = easeInOut(u / 0.4)
    return 1 + (FLOURISH_PEAK - 1) * e
  }
  const e = easeInOut((u - 0.4) / 0.6)
  return FLOURISH_PEAK + (1 - FLOURISH_PEAK) * e
}

export function tilesWinFlourishWaveForCell(r, c, cap = TILES_FLOURISH_WAVE_CAP) {
  return Math.min(cap, r + c)
}

/** Row clue on the right: align with diagonal through cell (row, size-1). */
export function tilesWinFlourishWaveForRowLabel(rowIndex, size, cap = TILES_FLOURISH_WAVE_CAP) {
  return Math.min(cap, rowIndex + (size - 1))
}

/** Column clue on top: same as cell (0, col). */
export function tilesWinFlourishWaveForColLabel(colIndex, cap = TILES_FLOURISH_WAVE_CAP) {
  return Math.min(cap, colIndex)
}

const FLOURISH_CLASS = 'folds-win-flourish-pop'

export function applyTilesTargetFlourishDom(size) {
  for (let i = 0; i < size; i++) {
    const rowEl = document.getElementById(`row-t-${i}`)
    const colEl = document.getElementById(`col-t-${i}`)
    const rowWave = tilesWinFlourishWaveForRowLabel(i, size)
    const colWave = tilesWinFlourishWaveForColLabel(i)
    if (rowEl) {
      rowEl.style.transform = ''
      rowEl.classList.add(FLOURISH_CLASS)
      rowEl.style.setProperty('--folds-flourish-wave', String(rowWave))
      rowEl.style.setProperty('--folds-flourish-stagger', `${TILES_FLOURISH_STAGGER_MS}ms`)
      rowEl.style.setProperty('--folds-flourish-pop-duration', `${TILES_FLOURISH_POP_MS}ms`)
    }
    if (colEl) {
      colEl.style.transform = ''
      colEl.classList.add(FLOURISH_CLASS)
      colEl.style.setProperty('--folds-flourish-wave', String(colWave))
      colEl.style.setProperty('--folds-flourish-stagger', `${TILES_FLOURISH_STAGGER_MS}ms`)
      colEl.style.setProperty('--folds-flourish-pop-duration', `${TILES_FLOURISH_POP_MS}ms`)
    }
  }
}

export function clearTilesTargetFlourishDom(size) {
  for (let i = 0; i < size; i++) {
    const rowEl = document.getElementById(`row-t-${i}`)
    const colEl = document.getElementById(`col-t-${i}`)
    for (const el of [rowEl, colEl]) {
      if (!el) continue
      el.classList.remove(FLOURISH_CLASS)
      el.style.transform = ''
      el.style.removeProperty('--folds-flourish-wave')
      el.style.removeProperty('--folds-flourish-stagger')
      el.style.removeProperty('--folds-flourish-pop-duration')
    }
  }
}
