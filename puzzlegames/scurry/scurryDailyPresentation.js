/**
 * Deterministic per-day orientation for daily Scurry: horizontal mirror (optional) then
 * 0/90/180/270° clockwise on the 5×5 index grid (cells 1–25). Curate/tutorial use raw levels.
 */

import { mulberry32, hashStr } from '@shared-contracts/prng.js'

const GRID = 5

/** Left–right mirror within the row. */
function reflectHorizontal(r, c) {
  return [r, GRID - 1 - c]
}

/** One quarter-turn clockwise (row grows down, col grows right). */
function rotate90CW(r, c) {
  return [c, GRID - 1 - r]
}

function applyOrientation(r, c, reflectH, rotQuarters) {
  let rr = r
  let cc = c
  if (reflectH) {
    ;[rr, cc] = reflectHorizontal(rr, cc)
  }
  for (let i = 0; i < rotQuarters; i++) {
    ;[rr, cc] = rotate90CW(rr, cc)
  }
  return [rr, cc]
}

export function scurryTransformCellIndex(sq, reflectH, rotQuarters) {
  if (sq == null || typeof sq !== 'number' || sq < 1 || sq > GRID * GRID) return sq
  const r = Math.floor((sq - 1) / GRID)
  const c = (sq - 1) % GRID
  const [rr, cc] = applyOrientation(r, c, reflectH, rotQuarters)
  return rr * GRID + cc + 1
}

function remapCellArray(arr, reflectH, rotQuarters) {
  if (!Array.isArray(arr)) return arr
  return arr.map((sq) => scurryTransformCellIndex(sq, reflectH, rotQuarters))
}

/**
 * @param {{ targets: number[], prePlaced: number[], maxBugs: number }} rawLevel
 * @param {string} dateKey YYYY-MM-DD (same as `getDailyKey()`)
 * @param {number} dailyIdx 0 | 1 | 2
 */
export function applyScurryDailyPresentation(rawLevel, dateKey, dailyIdx) {
  if (!rawLevel) return rawLevel
  const seed = hashStr(`scurry|dailyOrientation|v1|${dateKey}|${dailyIdx}`)
  const rand = mulberry32(seed)
  const rotQuarters = Math.floor(rand() * 4)
  const reflectH = rand() < 0.5
  return {
    maxBugs: rawLevel.maxBugs,
    targets: remapCellArray(rawLevel.targets, reflectH, rotQuarters),
    prePlaced: remapCellArray(rawLevel.prePlaced, reflectH, rotQuarters),
  }
}

function assertBijections() {
  for (let reflectH = 0; reflectH <= 1; reflectH++) {
    for (let rot = 0; rot < 4; rot++) {
      const seen = new Set()
      for (let i = 1; i <= GRID * GRID; i++) {
        seen.add(scurryTransformCellIndex(i, Boolean(reflectH), rot))
      }
      if (seen.size !== GRID * GRID) {
        throw new Error(`Scurry orientation not bijective: reflect=${reflectH} rot=${rot}`)
      }
    }
  }
}

assertBijections()
