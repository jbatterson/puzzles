/**
 * Validates each `puzzlegames/<game>/puzzles.js` default export: expected tier keys exist,
 * each tier is a non-empty array, and every puzzle has required object keys.
 *
 * Run: npm run check:puzzle-schemas
 */
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const repoRoot = path.resolve(import.meta.dirname, '..')

/** @typedef {{ id: string, rel: string, tiers: string[], keys: string[] }} GameSpec */

/** @type {GameSpec[]} */
const GAMES = [
  {
    id: 'scurry',
    rel: 'puzzlegames/scurry/puzzles.js',
    tiers: ['tutorial', 'easy', 'medium', 'hard'],
    keys: ['targets', 'maxBugs', 'prePlaced'],
  },
  {
    id: 'clueless',
    rel: 'puzzlegames/clueless/puzzles.js',
    tiers: ['easy', 'medium', 'hard'],
    keys: ['h1', 'h2', 'h3', 'v1', 'v2', 'v3'],
  },
  {
    id: 'folds',
    rel: 'puzzlegames/folds/puzzles.js',
    tiers: ['tutorial', 'easy', 'medium', 'hard'],
    keys: ['start', 'target', 'folds'],
  },
  {
    id: 'honeycombs',
    rel: 'puzzlegames/honeycombs/puzzles.js',
    tiers: ['tutorial', 'easy', 'medium', 'hard'],
    keys: ['size', 'clues'],
  },
  {
    id: 'sumtiles',
    rel: 'puzzlegames/sumtiles/puzzles.js',
    tiers: ['tutorial', 'easy', 'medium', 'hard'],
    keys: ['s', 't', 'b'],
  },
  {
    id: 'productiles',
    rel: 'puzzlegames/productiles/puzzles.js',
    tiers: ['tutorial', 'easy', 'medium', 'hard'],
    keys: ['s', 't', 'b'],
  },
]

const HONEYCOMB_SIZES = new Set(['small', 'medium', 'large'])

let cacheNonce = 0

/**
 * @param {boolean} ok
 * @param {string} msg
 * @param {string[]} errors
 */
function assert(ok, msg, errors) {
  if (!ok) errors.push(msg)
}

/**
 * @param {GameSpec} game
 * @param {unknown} data
 * @param {string[]} errors
 */
function validateGame(game, data, errors) {
  assert(
    data !== null && typeof data === 'object',
    `${game.id}: default export must be an object`,
    errors
  )
  if (!data || typeof data !== 'object') return

  for (const tier of game.tiers) {
    const list = data[tier]
    assert(Array.isArray(list), `${game.id}: tier "${tier}" must be an array`, errors)
    if (!Array.isArray(list)) continue
    assert(list.length > 0, `${game.id}: tier "${tier}" must be non-empty`, errors)
    list.forEach((puzzle, i) => {
      assert(
        puzzle !== null && typeof puzzle === 'object',
        `${game.id}: tier "${tier}" puzzle[${i}] must be an object`,
        errors
      )
      if (!puzzle || typeof puzzle !== 'object') return
      for (const key of game.keys) {
        assert(
          key in puzzle,
          `${game.id}: tier "${tier}" puzzle[${i}] missing key "${key}"`,
          errors
        )
      }
      if (game.id === 'honeycombs') {
        const p = /** @type {Record<string, unknown>} */ (puzzle)
        assert(
          typeof p.size === 'string' && HONEYCOMB_SIZES.has(p.size),
          `${game.id}: tier "${tier}" puzzle[${i}].size must be small|medium|large`,
          errors
        )
        assert(
          Array.isArray(p.clues),
          `${game.id}: tier "${tier}" puzzle[${i}].clues must be an array`,
          errors
        )
      }
      if (game.id === 'clueless') {
        const p = /** @type {Record<string, unknown>} */ (puzzle)
        for (const key of game.keys) {
          assert(
            typeof p[key] === 'string',
            `${game.id}: tier "${tier}" puzzle[${i}].${key} must be a string`,
            errors
          )
        }
      }
    })
  }
}

async function main() {
  const errors = []

  for (const game of GAMES) {
    const abs = path.join(repoRoot, game.rel)
    const url = pathToFileURL(abs).href + `?v=${++cacheNonce}`
    let mod
    try {
      mod = await import(url)
    } catch (e) {
      errors.push(
        `${game.id}: failed to import ${game.rel}: ${e instanceof Error ? e.message : String(e)}`
      )
      continue
    }
    const data = mod.default
    validateGame(game, data, errors)
  }

  if (errors.length) {
    console.error('Puzzle schema check failed:')
    for (const line of errors) console.error(`- ${line}`)
    process.exit(1)
  }

  console.log('Puzzle schema check passed.')
}

await main()
