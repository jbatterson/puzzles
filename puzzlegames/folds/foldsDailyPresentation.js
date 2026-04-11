/**
 * Deterministic per-day presentation for daily Folds: palette permutation + cell relabeling
 * (vertical reflection and/or 180° rotation about hex center). Curate/tutorial use raw puzzles.
 */
import { FOLDS_PALETTE_TOKEN_KEYS } from './palette.js'
import { ALL_TRIANGLES, HEX_BOUNDS, cent, isInsideHex, snap } from './foldsGeometry.js'
import { mulberry32, hashStr } from '@shared-contracts/prng.js'

function shuffleInPlace(arr, rand) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

/** @returns {Record<string, string>} maps each canonical token to a display token (bijection on palette). */
function buildColorPermutation(rand) {
  const order = shuffleInPlace([...FOLDS_PALETTE_TOKEN_KEYS], rand)
  const map = {}
  for (let i = 0; i < FOLDS_PALETTE_TOKEN_KEYS.length; i++) {
    map[FOLDS_PALETTE_TOKEN_KEYS[i]] = order[i]
  }
  return map
}

function transformCentroid(x, y, reflectVertical, rot180, cx, cy) {
  let px = x
  let py = y
  if (reflectVertical) px = 2 * cx - px
  if (rot180) {
    px = 2 * cx - px
    py = 2 * cy - py
  }
  return { x: px, y: py }
}

/**
 * @returns {Map<string, string>} canonical key → display key, or null if invalid
 */
function buildCellKeyMap(reflectVertical, rot180) {
  const cx = HEX_BOUNDS.minX + HEX_BOUNDS.width / 2
  const cy = HEX_BOUNDS.minY + HEX_BOUNDS.height / 2
  const map = new Map()
  for (const { key } of ALL_TRIANGLES) {
    const [r, c] = key.split(',').map(Number)
    const p = cent(r, c)
    const q = transformCentroid(p.x, p.y, reflectVertical, rot180, cx, cy)
    const [nr, nc] = snap(q.x, q.y)
    if (!isInsideHex(nr, nc)) return null
    const nk = `${nr},${nc}`
    map.set(key, nk)
  }
  if (map.size !== ALL_TRIANGLES.length) return null
  const images = new Set(map.values())
  if (images.size !== ALL_TRIANGLES.length) return null
  return map
}

function buildIdentityCellKeyMap() {
  const map = new Map()
  for (const { key } of ALL_TRIANGLES) map.set(key, key)
  return map
}

const CELL_KEY_MAP_CACHE = new Map()

function cellMapKey(reflectVertical, rot180) {
  return `${reflectVertical ? 1 : 0},${rot180 ? 1 : 0}`
}

function getCellKeyMap(reflectVertical, rot180) {
  const k = cellMapKey(reflectVertical, rot180)
  if (CELL_KEY_MAP_CACHE.has(k)) return CELL_KEY_MAP_CACHE.get(k)
  const built =
    !reflectVertical && !rot180
      ? buildIdentityCellKeyMap()
      : buildCellKeyMap(reflectVertical, rot180)
  const map = built ?? buildIdentityCellKeyMap()
  CELL_KEY_MAP_CACHE.set(k, map)
  return map
}

function remapBoardKeys(board, cellKeyMap) {
  const next = {}
  for (const [k, v] of Object.entries(board)) {
    const nk = cellKeyMap.get(k)
    if (nk != null) next[nk] = v
  }
  return next
}

function remapBoardColors(board, colorPerm) {
  const next = {}
  for (const [k, v] of Object.entries(board)) {
    if (typeof v !== 'string') {
      next[k] = v
      continue
    }
    if (v.startsWith('#')) {
      next[k] = v
      continue
    }
    next[k] = colorPerm[v] ?? v
  }
  return next
}

/**
 * @param {{ start: Record<string, string>, target: Record<string, string>, folds: number }} rawPuzzle
 * @param {string} dateKey YYYY-MM-DD (same as `getDailyKey()`)
 * @param {number} dailyIdx 0 | 1 | 2
 */
export function applyFoldsDailyPresentation(rawPuzzle, dateKey, dailyIdx) {
  if (!rawPuzzle) return rawPuzzle
  const seed = hashStr(`folds|dailyPresentation|v1|${dateKey}|${dailyIdx}`)
  const rand = mulberry32(seed)
  const colorPerm = buildColorPermutation(rand)
  const reflectVertical = rand() < 0.5
  const rot180 = rand() < 0.5
  const cellKeyMap = getCellKeyMap(reflectVertical, rot180)

  const start = remapBoardColors(remapBoardKeys(rawPuzzle.start, cellKeyMap), colorPerm)
  const target = remapBoardColors(remapBoardKeys(rawPuzzle.target, cellKeyMap), colorPerm)
  return {
    folds: rawPuzzle.folds,
    start,
    target,
  }
}
