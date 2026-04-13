/**
 * Solve Scurry puzzles from puzzlegames/scurry/puzzles.js.
 *
 * Usage:
 *   node tools/solveScurryPuzzles.mjs
 *   node tools/solveScurryPuzzles.mjs --tier=easy
 *   node tools/solveScurryPuzzles.mjs --format=json
 */
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const GRID = 5
const CELL_COUNT = GRID * GRID
const ALL_TIERS = ['tutorial', 'easy', 'medium', 'hard']
const DIRECTIONS = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
]

const ROWS = Array.from({ length: CELL_COUNT + 1 }, (_, sq) => Math.floor((sq - 1) / GRID))
const COLS = Array.from({ length: CELL_COUNT + 1 }, (_, sq) => (sq - 1) % GRID)

/** @type {number[][][]} */
const RAYS_BY_CLICK = Array.from({ length: CELL_COUNT + 1 }, () => [])

for (let click = 1; click <= CELL_COUNT; click++) {
  const r0 = ROWS[click]
  const c0 = COLS[click]
  for (const [dr, dc] of DIRECTIONS) {
    const ray = []
    let r = r0 + dr
    let c = c0 + dc
    while (r >= 0 && r < GRID && c >= 0 && c < GRID) {
      ray.push(r * GRID + c + 1)
      r += dr
      c += dc
    }
    if (ray.length > 0) RAYS_BY_CLICK[click].push(ray)
  }
}

function bitForSquare(sq) {
  return 1 << (sq - 1)
}

function toMask(squares) {
  let mask = 0
  for (const sq of squares) {
    mask |= bitForSquare(sq)
  }
  return mask
}

function isSolved(mask, targetsMask) {
  return (mask & targetsMask) === targetsMask
}

function applyMove(mask, clickSq) {
  let nextMask = mask
  const clickBit = bitForSquare(clickSq)
  if (nextMask & clickBit) return null

  for (const ray of RAYS_BY_CLICK[clickSq]) {
    const firstBit = bitForSquare(ray[0])
    if ((nextMask & firstBit) === 0) continue

    let chainLen = 1
    while (chainLen < ray.length) {
      const bit = bitForSquare(ray[chainLen])
      if ((nextMask & bit) === 0) break
      chainLen += 1
    }

    for (let i = chainLen - 1; i >= 0; i--) {
      const fromSq = ray[i]
      nextMask &= ~bitForSquare(fromSq)
      if (i + 1 < ray.length) {
        nextMask |= bitForSquare(ray[i + 1])
      }
    }
  }

  nextMask |= clickBit
  return nextMask
}

function solvePuzzle(puzzle) {
  const initialMask = toMask(puzzle.prePlaced)
  const targetsMask = toMask(puzzle.targets)
  const maxDepth = puzzle.maxBugs

  if (isSolved(initialMask, targetsMask)) return []

  /** @type {Set<number>} */
  const visited = new Set([initialMask])
  /** @type {{ mask: number, path: number[] }[]} */
  const queue = [{ mask: initialMask, path: [] }]

  for (let qi = 0; qi < queue.length; qi++) {
    const { mask, path } = queue[qi]
    if (path.length >= maxDepth) continue

    for (let sq = 1; sq <= CELL_COUNT; sq++) {
      if (mask & bitForSquare(sq)) continue
      const nextMask = applyMove(mask, sq)
      if (nextMask == null || visited.has(nextMask)) continue

      const nextPath = [...path, sq]
      if (isSolved(nextMask, targetsMask)) return nextPath

      visited.add(nextMask)
      queue.push({ mask: nextMask, path: nextPath })
    }
  }

  return null
}

function parseArgs(argv) {
  let tier = null
  let format = 'text'

  for (const arg of argv) {
    if (arg.startsWith('--tier=')) {
      tier = arg.slice('--tier='.length)
      if (!ALL_TIERS.includes(tier)) {
        throw new Error(`Invalid --tier "${tier}". Use one of: ${ALL_TIERS.join(', ')}`)
      }
      continue
    }
    if (arg.startsWith('--format=')) {
      format = arg.slice('--format='.length)
      if (!['text', 'json'].includes(format)) {
        throw new Error('Invalid --format. Use "text" or "json".')
      }
      continue
    }
    if (arg === '--json') {
      format = 'json'
      continue
    }
    throw new Error(`Unknown argument: ${arg}`)
  }

  return { tier, format }
}

async function loadPuzzles() {
  const puzzlesPath = path.resolve(import.meta.dirname, '../puzzlegames/scurry/puzzles.js')
  const puzzlesUrl = pathToFileURL(puzzlesPath).href
  const mod = await import(puzzlesUrl)
  return mod.default
}

function buildTierResults(tierName, list) {
  const solved = []
  const unsolved = []

  for (let i = 0; i < list.length; i++) {
    const puzzle = list[i]
    const moves = solvePuzzle(puzzle)
    const row = {
      tier: tierName,
      index: i + 1,
      maxBugs: puzzle.maxBugs,
      targets: puzzle.targets,
      prePlaced: puzzle.prePlaced,
      moves,
    }
    if (moves) solved.push(row)
    else unsolved.push(row)
  }

  return { solved, unsolved }
}

function printText(results, elapsedMs) {
  let totalSolved = 0
  let totalUnsolved = 0
  for (const { tier, solved, unsolved } of results) {
    totalSolved += solved.length
    totalUnsolved += unsolved.length
    console.log(`\n## ${tier}`)
    console.log(`Solved: ${solved.length}`)
    console.log(`Unsolved: ${unsolved.length}`)
    if (unsolved.length > 0) {
      for (const row of unsolved) {
        console.log(
          `  - #${row.index}: targets=[${row.targets.join(', ')}], maxBugs=${row.maxBugs}, prePlaced=[${row.prePlaced.join(', ')}]`,
        )
      }
    }
  }
  console.log('\n## Total')
  console.log(`Solved: ${totalSolved}`)
  console.log(`Unsolved: ${totalUnsolved}`)
  console.log(`Elapsed: ${(elapsedMs / 1000).toFixed(2)}s`)
}

function printJson(results, elapsedMs) {
  const out = {
    elapsedMs,
    tiers: Object.fromEntries(
      results.map(({ tier, solved, unsolved }) => [
        tier,
        {
          solved,
          unsolved,
        },
      ]),
    ),
  }
  console.log(JSON.stringify(out, null, 2))
}

async function main() {
  const { tier, format } = parseArgs(process.argv.slice(2))
  const puzzles = await loadPuzzles()
  const tiers = tier ? [tier] : ALL_TIERS
  const start = Date.now()

  const results = tiers.map((tierName) => {
    const list = puzzles[tierName]
    if (!Array.isArray(list)) throw new Error(`Expected puzzles.${tierName} to be an array`)
    const { solved, unsolved } = buildTierResults(tierName, list)
    return { tier: tierName, solved, unsolved }
  })
  const elapsedMs = Date.now() - start

  if (format === 'json') printJson(results, elapsedMs)
  else printText(results, elapsedMs)

  const hasUnsolved = results.some((r) => r.unsolved.length > 0)
  process.exitCode = hasUnsolved ? 1 : 0
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
